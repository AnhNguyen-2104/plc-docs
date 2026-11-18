---
title: Thông số (Pr.) — QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

<script setup>
import { prRows, unitExamples } from '../../.vitepress/data/modules/qd75d4.ts'
const tabs = [
  {
    label: 'IL — TO',
    lang: 'il',
    code: `(* QD75D4 trục 1. Địa chỉ buffer memory ở dạng thập phân:
   Pr.1 = G0, Pr.2 = G1, Pr.3 = G2, Pr.4 = G3, Pr.5 = G4.
   Nguồn: SH-080058 §7.1.2 p.7-5; Appendix 13 p. Appendix-150.
   Pr.3 ghi bằng 0,1 µm: 5 mm = 50000 (SH-080058 §5.2.1 p.5-19). *)
LD   M8000
TO   U0\\G0  K0      K1   (* Pr.1: đơn vị mm *)
TO   U0\\G1  K500    K1   (* Pr.2: 500 pulse/vòng *)
TO   U0\\G2  K50000  K1   (* Pr.3: 5 mm, ghi bằng 0,1 µm *)
TO   U0\\G3  K1      K1   (* Pr.4: hệ số 1 *)

(* Đọc lại để xác nhận. *)
LD   M8000
FROM U0\\G2  D200  K1
FROM U0\\G3  D201  K1`
  },
  {
    label: 'IL — truy cập trực tiếp',
    lang: 'il',
    code: `(* Cùng nội dung, dùng U<base>\\G<addr> trực tiếp. *)
LD   M8000
MOV  K500    U0\\G1
MOV  K50000  U0\\G2
MOV  K1      U0\\G3`
  }
]
</script>

# Thông số (Pr.) — QD75D4

Thông số trục quyết định cách module hiểu con số vị trí và tốc độ. Sai đơn vị thì mọi lệnh chạy đều sai, dù dữ liệu vị trí đúng.

## 1. Bảng thông số

<ParamTable :rows="prRows" title="Thông số (Pr.)" />

## 2. Ý nghĩa các thông số nền

- **Pr.1 — đơn vị:** `0` mm, `1` inch, `2` độ, `3` pulse. Đơn vị này áp cho địa chỉ vị trí và tốc độ của trục (SH-080058 §5.2.1 p.5-18).
- **Pr.2 — số xung mỗi vòng:** số xung cấp cho một vòng động cơ. Phải khớp với driver và cơ cấu (SH-080058 §5.2.1 p.5-18).
- **Pr.3 — quãng đường mỗi vòng:** quãng đường cơ khí đi được trong một vòng, tính theo đơn vị Pr.1, trước khi nhân Pr.4 (SH-080058 §5.2.1 p.5-18).
- **Pr.4 — hệ số nhân đơn vị:** nhân vào Pr.3 khi một vòng vượt quá giới hạn của Pr.3; nhận 1 / 10 / 100 / 1000 (SH-080058 §5.2.1 p.5-18).
- **Pr.5 — pulse output mode:** `0` PULSE/SIGN, `1` CW/CCW, `2` A/B phase ×4, `3` A/B phase ×1. Giá trị được chốt tại lần Y0 chuyển OFF → ON đầu tiên sau khi cấp điện hoặc reset CPU (SH-080058 §5.2.1 p.5-20).
- **Pr.8 — tốc độ giới hạn:** trần tốc độ của trục; tốc độ lệnh bị chặn theo giá trị này. Dải theo mm là 0.01…20000000.00 mm/min, theo pulse là 1…1000000 cho QD75D; mặc định 200000 (SH-080058 §5.2.2 p.5-24).
- **Pr.9 / Pr.10 — thời gian gia tốc / giảm tốc mặc định:** dùng khi điểm dữ liệu chọn bộ thời gian số 0; dải 1…8388608 ms, mặc định 1000 (SH-080058 §5.2.2 p.5-24).

## 3. Quy đổi xung trên đơn vị

```text
pulse/đơn vị = (Pr.2 × Pr.4) / Pr.3
```

Với đơn vị mm, kết quả là pulse/mm; với độ, là pulse/độ.

### Ví dụ minh hoạ lấy từ bảng đơn vị mẫu

Dòng "mm, 100 pulse/mm": Pr.2 = 10000, Pr.3 = 100, Pr.4 = 1.

```text
pulse/mm = (10000 × 1) / 100 = 100
```

Nghĩa là đi 250 mm cần 25 000 xung. Các dòng còn lại trong bảng dưới đây dùng cùng công thức, chỉ khác bộ giá trị.

## 4. Bảng ví dụ đơn vị

| Nhãn | Pr.2 | Pr.3 | Pr.4 | Công thức | pulse/đơn vị | Nguồn |
| --- | --- | --- | --- | --- | --- | --- |
| mm, 100 pulse/mm | 10000 | 100 | 1 | pulses/mm = (Pr.2 x Pr.4) / Pr.3 = (10000 x 1) / 100 | 100 | SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4 |
| mm, 10000 pulse/mm | 10000 | 10 | 10 | pulses/mm = (Pr.2 x Pr.4) / Pr.3 = (10000 x 10) / 10 | 10000 | SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4 |
| degree (Pr.1 = 2), 27.78 pulse/degree | 10000 | 360 | 1 | pulses/degree = (Pr.2 x Pr.4) / Pr.3 = (10000 x 1) / 360 | 27.78 | SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4 |

Số trong bảng trên lấy nguyên từ dữ liệu của site, nguồn SH-080058. Khi trao đổi với người vận hành, luôn nói rõ đơn vị đang dùng.

## 5. Hai đường ghi thông số

### (a) Đường chính — ladder ghi buffer memory

Dùng `TO` hoặc truy cập trực tiếp `U<base>\G<addr>`. Vùng thông số cơ bản của trục 1 là địa chỉ thập phân 0–15: Pr.1 = 0, Pr.2 = 1, Pr.3 = 2, Pr.4 = 3, Pr.5 = 4; trục 2, 3, 4 cộng thêm 150 cho mỗi trục (SH-080058 §7.1.2 p.7-5; Appendix 13 p. Appendix-150). Trong GX Works2, nạp xuống CPU bằng `Online → Write to PLC` và theo dõi trực tiếp bằng `Monitor → Device/Buffer Memory Batch Monitor`.

<CodeTabs :tabs="tabs" />

`U0` giả định module ở vị trí đầu trên base; thay theo cấu hình thực tế. Ghi khi Y0 đang OFF, sau đó bật Y0 để module chốt giá trị.

### (b) Đường công cụ — GX Configurator-QP (tuỳ chọn)

Nếu có GX Configurator-QP, có thể khai báo thông số trong giao diện và tải xuống module. Mở GX Configurator-QP từ GX Works2 (nhãn menu: tra bản GX Works2 đang dùng), khai báo trong mục `Parameter` rồi tải xuống. Đây là đường tuỳ chọn: nội dung cuối cùng vẫn nằm ở buffer memory, và vẫn phải kiểm tra bằng cách đọc lại.

## 6. Cảnh báo khi ghi thông số

- Không ghi thông số khi trục đang chạy; dừng trục và đưa về trạng thái an toàn trước.
- Một số thông số chỉ có hiệu lực sau khi Y0 chuyển OFF → ON sau khi cấp điện hoặc reset CPU (số hiệu Pr. tra SH-080058).
- Sau khi ghi, đọc lại giá trị và so sánh trước khi phát lệnh chạy.
- Thay đổi Pr.2/Pr.3/Pr.4 làm thay đổi ý nghĩa của toàn bộ dữ liệu vị trí đã có; phải rà lại bảng Da. sau khi đổi đơn vị.
- Điện mất giữa lúc ghi có thể để lại bộ thông số không nhất quán; kiểm tra lại sau khi cấp điện.

## Đọc tiếp

- [Dữ liệu vị trí (Da.)](/q/qd75/position-data)
- [Tín hiệu X/Y](/q/qd75/io-signals)
- [Ladder và khởi động](/q/qd75/ladder)
- [Tra cứu cấu hình nhanh](/q/qd75/reference)
