---
title: Delta ASDA-B2
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

# Delta ASDA-B2

ASDA-B2 nhận xung lệnh vi sai qua `PULSE/PULSE` và `SIGN/SIGN`, có thêm cặp `HPULSE/HSIGN` cho nguồn xung 5 V vi sai tốc độ cao. Driver đạt 500 kpps với line driver và 200 kpps với open collector. Trước khi đấu phải chốt ba điểm: dùng ngõ vi sai hay opto 24 V, kiểu sink hay source của PLC, và chỉ dùng một nguồn 24 V — không cấp đồng thời `VDD` nội với nguồn ngoài.

## 1. Bảng chân

| Chân | Tín hiệu | Ghi chú | Nguồn |
| --- | --- | --- | --- |
| 43 | PULSE (+) | Xung lệnh, cặp với 41 | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 41 | /PULSE (−) | Xung lệnh, cặp với 43 | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 39 | SIGN (+) | Chiều, cặp với 37 | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 37 | /SIGN (−) | Chiều, cặp với 39 | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 38 | HPULSE | Ngõ xung 5 V vi sai tốc độ cao | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 36 | /HPULSE | Cặp với 38, chỉ 5 V vi sai | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 42 | HSIGN | Chiều 5 V vi sai tốc độ cao | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 40 | /HSIGN | Cặp với 42, chỉ 5 V vi sai | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 35 | PULL HI | Kéo lên `VDD` khi dùng ngõ open-collector | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 7 | DO1+ | Ngõ ra `SRDY` mặc định, cặp với 6 | <SourceRef doc="asda-b2" page="3-18" /> <SourceRef doc="asda-b2" page="3-26" /> <em>[secondary]</em> |
| 6 | DO1− | Cặp với 7, cực âm của ngõ ra `SRDY` | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 9 | SON (DI1) | Servo-ON, do PLC điều khiển | <SourceRef doc="asda-b2" page="3-22" /> <em>[secondary]</em> |
| 28 | ALRM (+) | Ngõ ra báo lỗi, cặp với 27 | <SourceRef doc="asda-b2" page="3-21" /> <em>[secondary]</em> |
| 27 | ALRM (−) | Cặp với 28 | <SourceRef doc="asda-b2" page="3-21" /> <em>[secondary]</em> |
| 11 | COM+ | Điểm chung nhóm ngõ vào | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 14 | COM− | Điểm chung nhóm ngõ vào | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 17 | VDD | 24 V nội, tối đa 500 mA | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |

<WiringDiagram variant="delta-b2" />

## 2. Đấu với QD75D4

- READY: `READY` 1A11 lấy từ `DO1+` 7 (`SRDY`), `RDYCOM` 1A12 lên `+24 V` ở `COM+` 11, `DO1−` 6 và `COM−` 14 về 0 V. Vòng: +24 V → RDYCOM (1A12) → photocoupler READY → 1A11 → DO1+ (7) → transistor ngõ ra → DO1− (6) → 0 V. QD75D4 chỉ định nghĩa RDYCOM là "chung cho tín hiệu READY" (SH-080058 §3.4.3) và READY là ngõ photocoupler 24 VDC/4,7 kΩ (§3.4.1); manual không ấn định RDYCOM ở +24 V hay 0 V, nên cực tính do ngõ ra của drive quyết định — `DO1` của ASDA-B2 là ngõ ra kiểu sink nên RDYCOM phải ở +24 V.

- Cặp `PULSE F+/F−` của QD75D4 đi vào 43/41; cặp `PULSE R+/R−` đi vào 39/37. Không đảo cặp và không nối một dây của cặp xuống 0 V.
- Nếu dùng ngõ open-collector thay vì line driver, phải nối `PULL HI` 35 tới `VDD` 17 theo manual; đây là chế độ khác, không phải chế độ vi sai.
- Không cấp `VDD` 17 từ nguồn ngoài đồng thời với nguồn 12–24 V bên ngoài; chọn một nguồn cho mỗi nhóm.
- Ngõ vào số quang cách: ON 15–24 V, dòng > 3 mA; OFF < 5 V, dòng < 0,5 mA; trở khoảng 4,7 kΩ. Driver hỗ trợ cả sink và source.
- ALRM là ngõ ra dạng cặp 28/27, đưa về PLC để liên động; SON (DI1, chân 9) lấy từ ngõ ra transistor của PLC, không lấy từ QD75D4.

## 3. Kiểm tra trước khi cấp điện

- Đã chọn đúng chế độ xung của driver và khớp với QD75D4 `Pr.5`.
- Đã đo thông mạch từng cặp 43/41 và 39/37.
- Đã xác nhận chỉ có một nguồn 24 V cho nhóm ngõ vào.
- Đã kiểm tra chiều quay bằng chạy thử không tải.

## Đọc tiếp

- [Tổng quan đấu dây driver](/q/drivers/)
- [Thông số & tỉ số truyền](/q/drivers/parameters-gear)
