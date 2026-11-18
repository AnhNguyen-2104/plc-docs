---
title: Ladder và trình tự khởi động QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

<script setup>
const tabs = [
  {
    label: 'IL — khởi tạo',
    lang: 'il',
    code: `(* Ghi thông số trước khi bật READY.
   Địa chỉ <Pr.x> tra SH-080058, chương thông số. *)
LD   M8000
TO   U0\\G<Pr1>  K<giá trị Pr.1>  K1
TO   U0\\G<Pr2>  K<giá trị Pr.2>  K1
TO   U0\\G<Pr3>  K<giá trị Pr.3>  K1
TO   U0\\G<Pr4>  K<giá trị Pr.4>  K1

(* Bật PLC READY rồi chờ module READY. *)
LD   M500          (* cho phép khởi động, minh hoạ *)
OUT  Y0
LD   X0
OUT  M501          (* QD75 READY *)`
  },
  {
    label: 'IL — lệnh chạy',
    lang: 'il',
    code: `(* Chỉ chạy khi module READY và không có lỗi. *)
LD   M501
AND  X<không lỗi trục>
AND  X<cho phép chạy>
PLS  M600

LD   M600
TO   U0\\G<Cd. khởi động trục>  K<chỉ số trục>  K1

(* Chờ hoàn tất định vị trước khi chuyển bước. *)
LD   X<hoàn tất định vị trục>
OUT  M602`
  }
]
</script>

# Ladder và trình tự khởi động QD75D4

Số thiết bị M/D/X/Y trong ví dụ là lựa chọn minh hoạ, không phải quy ước bắt buộc. Địa chỉ buffer memory ghi dạng ký hiệu `<Pr.x>` / `<Cd.x>` — phải đối chiếu bảng trong SH-080058 trước khi dùng.

## 1. Truy cập buffer memory

Hai cách tương đương:

| Cách | Cú pháp | Đặc điểm |
| --- | --- | --- |
| Trực tiếp | `U<base>\G<addr>` | Ngắn, dùng ngay trong lệnh đọc/ghi; base 0 là module đầu tiên trên base |
| Gián tiếp qua lệnh | `FROM` / `TO` | Đọc/ghi nhiều word liên tiếp thuận tiện, dễ tham số hoá |

- `TO U0\G<addr> <giá trị> K1` ghi một word.
- `FROM U0\G<addr> D100 K4` đọc 4 word vào D100..D103.

Với QD75D4, `U0` giả định module ở vị trí đầu; thay base/slot theo cấu hình thực tế.

## 2. Trình tự khởi động

1. Ghi các thông số Pr. cần thiết.
2. Bật Y0 (PLC READY).
3. Chờ X0 (QD75 READY) bật.
4. Kiểm tra cờ đồng bộ trục và không có lỗi.
5. Phát lệnh khởi động trục qua buffer memory.
6. Chờ hoàn tất định vị hoặc mã M.

Không phát lệnh chạy trước khi X0 bật. Sau khi ghi thông số, cần chu kỳ làm mới/hiệu lực — xem [tín hiệu X/Y](/q/qd75/io-signals).

## 3. Ví dụ IL

<CodeTabs :tabs="tabs" />

<LadderDiagram />

Năm nhánh: ghi Pr.1–Pr.5, bật Y0/chờ X0, đọc lại và cho phép chạy.

## 4. Liên động an toàn

Ví dụ liên động tối thiểu, đặt trước mọi lệnh chạy:

```il
LD   X<dừng khẩn NC>      (* mất tín hiệu = dừng *)
AND  X<giới hạn +>
AND  X<giới hạn ->
AND  M<cho phép vận hành>
AND  M501                 (* module READY *)
OUT  M610                 (* điều kiện chạy chung *)
```

Nguyên tắc:

- Dừng khẩn dùng tiếp điểm thường đóng, mất tín hiệu là dừng.
- Giới hạn cứng cắt điều kiện chạy, không chỉ báo lỗi.
- Lệnh chạy phải qua điều kiện chung, không bỏ qua bằng cờ phụ.
- E-stop vẫn phải tác động trực tiếp mạch động lực, độc lập với ladder này.

## 5. Ghi xuống PLC và theo dõi

Sau khi viết chương trình trong GX Works2, nạp xuống CPU bằng `Online → Write to PLC`. Để theo dõi buffer memory và các ngõ X/Y, mở `Monitor → Device/Buffer Memory Batch Monitor`. Chỉ dùng `Tool → Initialize/Format PLC Memory` khi thực sự cần xoá bộ nhớ CPU và đã có bản sao lưu.

## Đọc tiếp

- [Tín hiệu X/Y](/q/qd75/io-signals)
- [Dữ liệu vị trí](/q/qd75/position-data)
- [Chạy thử](/q/qd75/commissioning)
