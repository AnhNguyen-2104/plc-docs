---
title: Panasonic MINAS A6
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

# Panasonic MINAS A6

MINAS A6 nhận xung lệnh vi sai qua `PULSH1/PULSH2` và `SIGNH1/SIGNH2` (line driver, 8 Mpps), đồng thời có nhánh opto `PULS1/PULS2` và `SIGN1/SIGN2`. Hai nhóm này không dùng thay thế tùy tiện: nhóm H là ngõ vi sai tốc độ cao, nhóm còn lại là opto. Trước khi đấu phải xác nhận đúng biến thể máy: bản A6 dùng DC24/48 V mặc định gán `SRV-ON` cho `SI1` (SX-DSV03283), khác với bảng chân ở đây.

## 1. Bảng chân

| Chân | Tín hiệu | Ghi chú | Nguồn |
| --- | --- | --- | --- |
| 44 | PULSH1 | Xung lệnh vi sai (+), cặp với 45 | SX-DSV03025 p.45 |
| 45 | PULSH2 | Xung lệnh vi sai (−), cặp với 44 | SX-DSV03025 p.45 |
| 46 | SIGNH1 | Chiều vi sai (+), cặp với 47 | SX-DSV03025 p.45 |
| 47 | SIGNH2 | Chiều vi sai (−), cặp với 46 | SX-DSV03025 p.45 |
| 3 | PULS1 | Xung lệnh nhánh opto | SX-DSV03025 p.45 |
| 4 | PULS2 | Xung lệnh nhánh opto | SX-DSV03025 p.45 |
| 1 | OPC1 | Nguồn chung nhánh opto 1 | SX-DSV03025 p.45 |
| 5 | SIGN1 | Chiều nhánh opto | SX-DSV03025 p.45 |
| 6 | SIGN2 | Chiều nhánh opto | SX-DSV03025 p.45 |
| 2 | OPC2 | Nguồn chung nhánh opto 2 | SX-DSV03025 p.45 |
| 29 | SRV-ON (SI6) | Servo-ON, do PLC điều khiển | SX-DSV03031 p.16 `[secondary]` |
| 36 / 37 | ALM (SO3) | Báo lỗi: 36 (−), 37 (+) | SX-DSV03031 p.19 `[secondary]` |
| 38 / 39 | INP (SO4) | Hoàn tất định vị | SX-DSV03031 `[secondary]` |
| 31 | A-CLR (SI8) | Reset lỗi | SX-DSV03031 `[secondary]` |
| 7 | SI-COM | Điểm chung nhóm ngõ vào số | SX-DSV03025 p.45 |
| 41 | SO-COM | Điểm chung nhóm ngõ ra số | SX-DSV03025 p.45 |

Nguồn cung cấp ghi điểm `GND` là chân 1, nhưng chân 1 cũng được ghi cho `OPC1`; trang này không in hàng `GND` để tránh khẳng định sai. Đọc lại bảng chân gốc của đúng model trước khi đấu điểm chung.

## 2. Đấu với QD75D4

- `PULSE F+/F−` của QD75D4 vào 44/45; `PULSE R+/R−` vào 46/47. Chỉ dùng nhóm H khi cần line driver; nhóm opto 1/3/5/6 là chế độ khác và cần nguồn `OPC` đúng.
- `SRV-ON` chân 29 lấy từ ngõ ra transistor của PLC, không lấy từ QD75D4.
- `ALM` 36/37 và `INP` 38/39 là ngõ ra số, đưa về PLC qua `SO-COM` 41.
- `SI-COM` 7 phải được cấp từ nguồn cách ly 12–24 V, **không** lấy từ nguồn phanh.
- Đặc tính xung: line driver 8 Mpps; nhánh opto 500 kpps (line driver) / 200 kpps (open collector) theo bảng nguồn.

## 3. Kiểm tra trước khi cấp điện

- Đã xác nhận biến thể DC24/48 V hay 200 V và đúng số hiệu manual.
- Đã chốt dùng nhóm H (vi sai) hay nhóm opto, và khớp với QD75D4 `Pr.5`.
- Đã kiểm tra nguồn `SI-COM` cách ly, không chung nguồn phanh.
- Đã đo thông mạch từng cặp 44/45 và 46/47.

## Đọc tiếp

- [Tổng quan đấu dây driver](/q/drivers/)
- [Thông số & tỉ số truyền](/q/drivers/parameters-gear)
