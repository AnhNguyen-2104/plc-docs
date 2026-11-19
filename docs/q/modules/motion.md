---
title: QD77MS4 / QD75M1 — module điều khiển chuyển động
family: q
module: q-series
status: draft
source: IB-0300185
---

<script setup>
const mvInputs = [
  { signal: 'Y0', pin: 'Y0', device: 'PLC READY — CPU cho phép module làm việc' },
  { signal: 'Y1', pin: 'Y1', device: 'All axis servo ON' },
  { signal: 'Y10', pin: 'Y10', device: 'Positioning start — trục 1' }
]
const mvOutputs = [
  { signal: 'X0', pin: 'X0', device: 'READY — module đã sẵn sàng' },
  { signal: 'X1', pin: 'X1', device: 'Synchronization flag — truy cập buffer được' },
  { signal: 'X10', pin: 'X10', device: 'Start complete — trục 1' },
  { signal: 'XC', pin: 'XC', device: 'BUSY — trục 1 đang chạy' }
]
</script>

# QD77MS4 / QD75M1 — module điều khiển chuyển động

Ba họ module định vị của MELSEC Q khác nhau chủ yếu ở **cách truyền lệnh tới driver**, không phải ở số trục. QD75D4 phát xung; QD75M1 và QD77MS4 gửi lệnh số qua cáp quang SSCNET tới servo amplifier.

Trang này so sánh ba họ và chỉ rõ phần đấu dây, đầu nối, truy cập buffer memory. Chi tiết QD75D4 nằm ở [/q/qd75/](/q/qd75/) và không lặp lại ở đây.

## 1. Ba họ trong một bảng

| Họ | Giao diện tới driver | Số trục tối đa | Điểm dữ liệu/trục | Nguồn |
| --- | --- | --- | --- | --- |
| QD75D4 | Xung vi sai (pulse) | 4 | 600 | SH-080058 |
| QD75M1 | SSCNET (cáp quang) | 1 (M2: 2, M4: 4) | 600 | IB-0300062 §3.1 p.3-2 |
| QD77MS4 | SSCNET III/H (cáp quang) | 4 (MS2: 2, MS16: 16) | 600 | IB-0300185 §3.1 p.3-2 |

## 2. Thông số so sánh

| Hạng mục | QD75D4 | QD75M1 | QD77MS4 |
| --- | --- | --- | --- |
| Số trục | 4 | 1 | 4 |
| Chu kỳ hoạt động | — (theo xung) | — | 0,88 ms / 1,77 ms |
| Thời gian khởi động | — | 2 ms | 0,88 ms |
| Dữ liệu vị trí | 600 điểm/trục | 600 điểm/trục | 600 điểm/trục |
| Đơn vị điều khiển | mm, inch, độ, PLS | mm, inch, độ, PLS | mm, inch, độ, PLS |
| Tốc độ lệnh tối đa | — | 10 000 000 PLS/s | 1 000 000 000 PLS/s |
| Đầu nối ngoài | 40 chân (QD75D4: **chưa xác minh** trong phiên này) | 40 chân | 40 chân |
| Cáp driver | Cáp xung vi sai | SSCNET, tổng chiều dài ≤ 30 m | SSCNET III/H, 0,15–50 m |

Nguồn: QD77MS4 — IB-0300185 §3.1 p.3-2 và p.3-3; QD75M1 — IB-0300062 §3.1 p.3-2 và §2.2 p.2-5 (ghi chú tổng chiều dài SSCNET ≤ 30 m); QD75D4 — SH-080058 §3.1 p.3-2 và trang [dữ liệu vị trí](/q/qd75/position-data).

## 3. Sơ đồ khối

Sơ đồ truyền tín hiệu qua SSCNET giữa QD77MS và servo amplifier theo hãng:

<ManualFigure
  src="/img/manual/qd77ms-sscnet.jpg"
  alt="Truyền tín hiệu QD77MS qua SSCNET tới servo amplifier, kèm encoder và tín hiệu ngoài"
  caption="Truyền tín hiệu QD77MS qua SSCNET"
  doc="IB-0300185"
  section="§1.1.6"
  page="1-20"
/>

Cách nối cáp SSCNET nối tiếp QD75M với các amplifier MR-H-BN/MR-J2-B và connector kết thúc:

<ManualFigure
  src="/img/manual/qd75m-sscnet.jpg"
  alt="Nối cáp SSCNET QD75M với các servo amplifier MR-H-BN, MR-J2-B và connector kết thúc"
  caption="Nối cáp SSCNET QD75M → servo amplifier"
  doc="IB-0300062"
  section="Phụ lục 3"
  page="App-29"
/>

## 4. Điều gì đổi ở phần đấu dây

| Hạng mục | QD75D4 (xung) | QD75M1 / QD77MS4 (SSCNET) |
| --- | --- | --- |
| Cáp lệnh tới driver | Cáp xung vi sai nhiều đôi dây | Cáp quang SSCNET, một sợi vào và một sợi ra mỗi amplifier |
| Đếm xung / chia xung | Có, đặt trên module | Không; vị trí truyền số qua SSCNET |
| Phản hồi encoder | Về driver, không về module | Đi kèm trong khung SSCNET, module đọc trực tiếp |
| Nhiễu điện từ | Phải chống nhiễu cáp xung | Cách ly quang, không bị ảnh hưởng EMI trên đường truyền |
| Kiểm tra trước khi chạy | Đo thông mạch từng cặp xung | Kiểm tra đầu nối quang sạch, đúng CN1A/CN1B |

Nguồn: bán kính uốn và cảnh báo lắp nhầm CN1A/CN1B — IB-0300185 §4.3 p.4-15 và Phụ lục 2 p.App.-29; danh sách cáp MR-J3BUS — IB-0300185 §3.1 p.3-3.

Không còn cặp xung `PULSE F+/F−`, `R+/R−`, không còn tín hiệu zero `PG05/PG0COM` như QD75D4 — đối chiếu [đấu dây QD75D4](/q/qd75/wiring). Thay vào đó là một tuyến quang nối module → amplifier 1 → amplifier 2 → … theo thứ tự trục.

## 5. Đầu nối

| Module | Đầu nối | Sự kiện đã xác minh |
| --- | --- | --- |
| QD77MS4 | Đầu nối cáp SSCNET (mặt dưới module) | Tên đầu nối `CN4`/`CN5`: **chưa xác minh** — IB-0300185 chỉ gọi là "SSCNET cable connector" (§4.1.2 p.4-3) |
| QD75M1 | Đầu nối cáp SSCNET | Cùng cách gọi; số chân cụ thể: **chưa xác minh** (IB-0300062 §4.1.2 p.4-3) |
| QD77MS4 | Đầu nối vào tín hiệu ngoài 40 chân | A6CON1, A6CON2, A6CON4 (bán riêng) — IB-0300185 §3.1 p.3-3 |
| QD75M1 | Đầu nối vào tín hiệu ngoài 40 chân | A6CON1, A6CON2, A6CON3, A6CON4 — IB-0300062 §2.2 p.2-5 |

Có thể khẳng định chắc chắn: module có **một** đầu nối SSCNET dùng cáp quang hai chiều (một sợi phát, một sợi thu), nắp bảo vệ phải giữ cho tới sát lúc cắm và đậy lại khi tháo cáp; không nhìn trực tiếp vào đầu cáp và đầu nối khi đang cấp điện — IB-0300185 §4.3 p.4-9.

## 6. Truy cập buffer memory

Mô hình truy cập giống QD75D4: `U0\G<địa chỉ>` hoặc `FROM`/`TO` — xem [truy cập buffer memory](/q/qd75/ladder).

| Dữ liệu | QD77MS4 | QD75M1 | Nguồn |
| --- | --- | --- | --- |
| `Cd.3` Positioning start No. trục 1 | `1500+100n` (trục 1 = 1500) | `1500` (trục 1), 1600/1700/1800 cho trục 2–4 | IB-0300185 §6.5.2 p.6-54; IB-0300062 §6.5.2 p.6-54 |
| `Cd.4` Positioning starting point No. | `1501+100n` | `1501` | cùng mục |
| `Cd.5` Axis error reset | `1502+100n` | — | IB-0300185 §6.5.2 p.6-54 |

`n` = số trục − 1, nên `n` = 0 với trục 1. Với QD77MS16 địa chỉ gốc là `4300+100n` — IB-0300185 §6.5.2 p.6-54.

Điểm quan trọng: dữ liệu vị trí (Da.) và thông số (Pr.) **vẫn ghi bằng `TO`** vào buffer memory; module lưu vào flash ROM và tự chạy. `TO` ghi vào vùng thông số có hiệu lực ngay, trong khi một số thông số chỉ có hiệu lực khi bật PLC READY `Y0` — IB-0300062 §7.2 p.7-8 (sơ đồ đường truyền dữ liệu: "Valid upon execution of the TO instruction", nhóm `Pr.10`, `Pr.8`–`Pr.25` chỉ có hiệu lực khi `Y0` ON).

## 7. Ladder lệnh khởi động

Ví dụ QD77MS4, trục 1, dùng `TO` ghi số lệnh khởi động rồi bật `Y10`:

```il
(* Ghi so hieu du lieu vi tri can chay vao Cd.3 truc 1 (1500) *)
LD   M8000
TO   U0\G1500  K100  K1    (* 1500 = Cd.3; K100 = chay positioning data so 100 *)

(* Chi khoi dong khi module READY, dong bo xong, khong BUSY, khong loi *)
LD   X0                    (* READY *)
AND  X1                    (* Synchronization flag *)
ANDI XC                    (* BUSY truc 1 OFF *)
ANI  X8                    (* Error detection truc 1 OFF *)
AND  M100                  (* cho phep chay, minh hoa *)
PLS  M110

(* Bat Positioning start truc 1 trong mot scan *)
LD   M110
SET  Y10

(* Bat dau chay thi nha Y10 *)
LD   X10                   (* Start complete truc 1 *)
RST  Y10

(* Cho hoan tat dinh vi *)
LD   X14                   (* Positioning complete truc 1 *)
OUT  M120
```

Nguồn tín hiệu: `Y0` PLC READY, `Y1` All axis servo ON, `Y10`–`Y13` Positioning start trục 1–4, `X0` READY, `X1` Synchronization flag, `X4`–`X7` M code ON, `X8`–`XB` Error detection, `XC`–`XF` BUSY, `X10`–`X13` Start complete, `X14`–`X17` Positioning complete — IB-0300185 §3.3.1 p.3-17.

Trình tự bắt buộc trước khi phát lệnh: `Y0` ON → chờ `X0` ON → `Y1` ON nếu điều khiển servo → chờ `X1` ON → ghi `Cd.3` → phát `Y10` — IB-0300185 §10.6.2 p.10-27 (bảng điều kiện khởi động).

Với QD75M1, cùng cấu trúc nhưng `Y10` là start trục 1 duy nhất và thời gian khởi động 2 ms — IB-0300062 §1.1.6 p.1-19.

## 8. Bảng chọn module

| Tình huống | Chọn | Lý do |
| --- | --- | --- |
| Driver step hoặc servo nhận xung (MR-J4-A, ASDA-B2, DM542) | QD75D4 | Chỉ họ D/P mới phát xung; xem [/q/qd75/](/q/qd75/) |
| Servo amplifier SSCNET (MR-J2-B, MR-J3-B) | QD75M1/M2/M4 | Giao diện SSCNET, 1/2/4 trục |
| Servo amplifier SSCNET III/H (MR-J4-B, MR-J5-B) | QD77MS4 | SSCNET III/H, 4 trục, 0,88 ms |
| Cần đồng bộ nhiều trục, cam điện tử, trục ảo | QD77MS | Có điều khiển đồng bộ; QD75 không có |
| Cần ≥ 8 trục | QD77MS16 | 16 trục, địa chỉ buffer gốc `4300+100n` |
| Chỉ 1 trục, ngân sách hạn chế, servo SSCNET cũ | QD75M1 | 1 trục, 600 điểm |

Không chọn QD75D4 khi driver là loại chỉ có cổng SSCNET: module không có giao diện quang và không thể điều khiển amplifier SSCNET.

## 9. Đọc tiếp

- QD75D4 đầy đủ: [tổng quan](/q/qd75/), [đấu dây](/q/qd75/wiring), [thông số](/q/qd75/parameters), [ladder](/q/qd75/ladder).
- QD77MS: IB-0300185 chương 5 (dữ liệu), chương 9 (điều khiển định vị), chương 13 (đồng bộ).
- QD75M: IB-0300062 chương 6 (chương trình), chương 7 (vùng nhớ).
- Các module khác của họ Q: [MELSEC Q](/q/).
