---
title: Driver step DM542
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

# Driver step DM542

DM542 là driver step nhận xung kiểu pulse + direction qua khối đầu cực `P1`, không phải connector CN1. Ngõ vào được quang cách và nhận mức 4,5–5 V hoặc 24 V; driver luôn chạy ở chế độ pulse + direction, không có chế độ CW/CCW hay A/B để chọn. Vì vậy khi ghép với QD75D4 phải đặt `Pr.5` đúng kiểu PULSE/SIGN và kiểm tra lại giao diện điện giữa ngõ vi sai của QD75D4 với ngõ opto của DM542.

## 1. Bảng chân

| Đầu cực | Tín hiệu | Ghi chú | Nguồn |
| --- | --- | --- | --- |
| P1 | PUL+ | Xung bước (+), cặp với PUL− | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P1 | PUL− | Xung bước (−), cặp với PUL+ | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P1 | DIR+ | Chiều (+), cặp với DIR− | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P1 | DIR− | Chiều (−), cặp với DIR+ | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P1 | ENA+ | Cho phép (+), cặp với ENA− | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P1 | ENA− | Cho phép (−), cặp với ENA+ | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P2 | ALM | Báo lỗi | <SourceRef doc="dm542" page="4" /> <em>[secondary]</em> |
| P2 | BR | Điều khiển phanh | <SourceRef doc="dm542" page="4" /> <em>[secondary]</em> |

## Sơ đồ đấu dây

<DriverWiring driver="stepper-dm542" />

- Khối P1 là ngõ opto; cặp vi sai của QD75D4 phải qua hộp giao diện theo manual DM542, không đấu thẳng.
- `ENA+/ENA−` để hở nghĩa là driver luôn được cho phép; chỉ đấu khi cần ngắt bằng phần cứng.
- `DIR` phải đi trước `PUL` ít nhất 5 µs; `ALM` trên `P2` về PLC, không dùng làm dừng khẩn cấp.

## 2. Đấu với QD75D4

- QD75D4 xuất cặp vi sai `PULSE F+/F−` và `PULSE R+/R−`; DM542 lại nhận ngõ opto. **Không** đấu thẳng cặp vi sai vào `PUL+/PUL−` mà bỏ qua giao diện: phải theo đúng sơ đồ ngõ vào trong manual DM542 (trở hạn dòng/nguồn phù hợp) và đặc tính ngõ ra của QD75D4 (SH-080058 §3.4.1 p.3-19).
- `DIR` phải đi trước `PUL` ít nhất 5 µs; đặt sai thời gian này sẽ mất bước hoặc đảo chiều.
- `ENA` để hở nghĩa là driver được cho phép; chỉ nối khi cần ngắt driver bằng phần cứng.
- Ngõ vào nhận 4,5–5 V hoặc 24 V; chọn mức và điện trở theo bảng trong manual, không suy đoán.
- `ALM` trên `P2` đưa về PLC để liên động; không dùng làm tín hiệu dừng khẩn cấp.

## 3. Kiểm tra trước khi cấp điện

- Đã xác nhận QD75D4 `Pr.5 = 0` (PULSE/SIGN) và mức logic `Pr.23` bit 0 khớp với DM542.
- Đã kiểm tra giao diện giữa ngõ vi sai QD75D4 và ngõ opto DM542 theo manual hai phía.
- Đã đo thông mạch `PUL+/PUL−`, `DIR+/DIR−`.
- Đã đặt dòng và vi bước bằng DIP switch theo cơ cấu thực tế.

## Đọc tiếp

- [Tổng quan đấu dây driver](/q/drivers/)
- [Thông số & tỉ số truyền](/q/drivers/parameters-gear)
