---
title: Yaskawa Sigma-7
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

# Yaskawa Sigma-7

Sigma-7 SGD7S bản analog/pulse (200 V) nhận xung lệnh vi sai qua `PULS//PULS` và `SIGN//SIGN`; line driver đạt 4 Mpps với kiểu sign+pulse hoặc CW+CCW, 1 Mpps với xung hai pha, và 200 kpps với open collector. Đây là bản 200 V, số hiệu SIEP S800001 26O. Số hiệu người dùng thường thấy là "SIEP S800001 3x" không khớp với bản này; bản 400 V chưa được kiểm tra, nên phải mở đúng manual của bản máy trước khi đấu.

## 1. Bảng chân

| Chân | Tín hiệu | Ghi chú | Nguồn |
| --- | --- | --- | --- |
| 7 | PULS | Xung lệnh (+), cặp với 8 | <SourceRef doc="sgd7s" page="4-36" /> |
| 8 | /PULS | Xung lệnh (−), cặp với 7 | <SourceRef doc="sgd7s" page="4-36" /> |
| 11 | SIGN | Chiều (+), cặp với 12 | <SourceRef doc="sgd7s" page="4-36" /> |
| 12 | /SIGN | Chiều (−), cặp với 11 | <SourceRef doc="sgd7s" page="4-36" /> |
| 15 | CLR | Xóa lệch vị trí (+), cặp với 14 | <SourceRef doc="sgd7s" page="4-36" /> |
| 14 | /CLR | Xóa lệch vị trí (−), cặp với 15 | <SourceRef doc="sgd7s" page="4-36" /> |
| 40 | /S-ON (/SI0) | Servo-ON, do PLC điều khiển | <SourceRef doc="sgd7s" page="4-35" /> |
| 31 | ALM+ | Ngõ ra báo lỗi (+), OFF khi có lỗi | <SourceRef doc="sgd7s" page="4-37" /> |
| 32 | ALM− | Ngõ ra báo lỗi (−) | <SourceRef doc="sgd7s" page="4-37" /> |
| 25 | /COIN (/SO1+) | Hoàn tất định vị (+) | <SourceRef doc="sgd7s" page="4-37" /> |
| 26 | /COIN (−) | Hoàn tất định vị (−) | <SourceRef doc="sgd7s" page="4-37" /> |
| 44 | /ALM-RST (/SI4) | Reset lỗi | <SourceRef doc="sgd7s" page="4-35" /> |
| 47 | +24VIN | Nguồn 24 V cho nhóm ngõ vào | <SourceRef doc="sgd7s" page="4-35" /> |
| 1, 2, 6, 10 | SG | Điểm chung tín hiệu | <SourceRef doc="sgd7s" page="4-38" /> |
| 3, 13, 18 | PL1 / PL2 / PL3 | 12 V nội cho open collector | <SourceRef doc="sgd7s" page="4-37" /> |

<WiringDiagram variant="yaskawa-sigma7" />

<DriverPhoto
  src="/img/drivers/yaskawa-sigma7.jpg"
  alt="Sơ đồ đấu dây QD75D4 với Yaskawa SGD7S Sigma-7 (CN1)"
  caption="QD75D4 nối Yaskawa SGD7S Sigma-7 qua CN1 (50P): cặp xung vi sai vào PULS 7//PULS 8, cặp chiều vào SIGN 11//SIGN 12."
  source="plc247.com"
  sourceUrl="https://plc247.com/mitsubishi-qd75d4-servo-control-yaskawa-sigma-7-tutorial"
/>

## 2. Đấu với QD75D4

- `PULSE F+/F−` của QD75D4 vào 7/8; `PULSE R+/R−` vào 11/12. Đây là cặp vi sai, không đấu vào ngõ opto 24 V.
- `/S-ON` chân 40 là ngõ vào servo-ON, lấy từ ngõ ra transistor của PLC; QD75D4 không có ngõ ra servo-ON.
- `ALM` 31/32 là ngõ ra quang cách, cần điện trở/nguồn theo sơ đồ ngõ ra của manual; đưa về PLC để liên động.
- Nguồn 24 V cho nhóm ngõ vào đi vào `+24VIN` 47, điểm chung là `SG` (1, 2, 6, 10).
- `CLR` 15/14 chỉ dùng khi cần xóa lệch vị trí; không nối thay cho dừng khẩn cấp.

## 3. Kiểm tra trước khi cấp điện

- Đã xác nhận đúng bản 200 V và đúng số hiệu manual của máy.
- Đã chốt kiểu xung (sign+pulse, CW+CCW hay hai pha) và khớp với QD75D4 `Pr.5`.
- Đã kiểm tra cặp 7/8 và 11/12, không đảo cực.
- Đã xác nhận một nguồn 24 V duy nhất cho nhóm ngõ vào.

## Đọc tiếp

- [Tổng quan đấu dây driver](/q/drivers/)
- [Thông số & tỉ số truyền](/q/drivers/parameters-gear)
