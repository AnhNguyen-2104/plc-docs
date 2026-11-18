---
title: Tín hiệu X/Y — QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

# Tín hiệu X/Y — QD75D4

Bảng dưới đây lấy theo bảng I/O của SH-080058 §3.3.1 (p.3-16); bố cục thiết bị giống nhau cho toàn họ QD75. X0, X1 và Y0 là tín hiệu chung của module; các nhóm còn lại lặp theo từng trục.

QD75D4 không dùng component `ParamTable` cho bảng tín hiệu vì cấu trúc tín hiệu khác kiểu hàng của component; bảng markdown dưới đây giữ đúng giá trị nguồn.

| Trục | X | Y | Tên | Mô tả | Nguồn |
| --- | --- | --- | --- | --- | --- |
| - | X0 | Y0 | QD75 READY / PLC READY | X0 bật khi module sẵn sàng; Y0 là lệnh PLC READY từ phía CPU gửi tới QD75. | <SourceRef doc="sh080058" page="3-16" /> |
| - | X1 | - | Cờ đồng bộ (Synchronization flag) | Bật khi buffer memory của QD75 truy cập được (điều kiện liên động cho chương trình tuần tự). | <SourceRef doc="sh080058" page="3-16" /> |
| 1–4 | X4–X7 | - | Mã M ON (M code ON) | Tín hiệu xuất mã M theo từng trục 1–4. | <SourceRef doc="sh080058" page="3-16" /> |
| 1–4 | X8–XB | - | Phát hiện lỗi (Error detection) | Tín hiệu phát hiện lỗi theo từng trục 1–4. | <SourceRef doc="sh080058" page="3-16" /> |
| 1–4 | XC–XF | - | BUSY | Tín hiệu BUSY (đang vận hành) theo từng trục 1–4. | <SourceRef doc="sh080058" page="3-16" /> |
| 1–4 | X10–X13 | - | Khởi động hoàn tất (Start complete) | Tín hiệu khởi động hoàn tất theo từng trục 1–4. | <SourceRef doc="sh080058" page="3-16" /> |
| 1–4 | X14–X17 | - | Định vị hoàn tất (Positioning complete) | Tín hiệu định vị hoàn tất theo từng trục 1–4. | <SourceRef doc="sh080058" page="3-16" /> |
| 1–4 | - | Y4–Y7 | Dừng trục (Axis stop) | Lệnh dừng trục 1–4 từ CPU. | <SourceRef doc="sh080058" page="3-16" /> |
| 1–4 | - | Y8 / YA / YC / YE | Khởi động JOG chạy thuận (Forward run JOG start) | Lệnh khởi động JOG chạy thuận, trục 1–4. | <SourceRef doc="sh080058" page="3-16" /> |
| 1–4 | - | Y9 / YB / YD / YF | Khởi động JOG chạy ngược (Reverse run JOG start) | Lệnh khởi động JOG chạy ngược, trục 1–4. | <SourceRef doc="sh080058" page="3-16" /> |
| 1–4 | - | Y10–Y13 | Khởi động định vị (Positioning start) | Lệnh khởi động định vị trục 1–4. | <SourceRef doc="sh080058" page="3-16" /> |
| 1–4 | - | Y14–Y17 | Cờ cấm thực thi (Execution prohibition flag) | Cờ cấm thực thi trục 1–4. | <SourceRef doc="sh080058" page="3-16" /> |

Địa chỉ lấy từ bảng I/O của SH-080058 §3.3.1 (p.3-16); khi đấu dây vẫn đối chiếu bản manual đúng model (QD75D4 vs QD75D4N).

## 1. Bắt tay PLC READY và QD75 READY

Hai tín hiệu nền tảng:

- **Y0 — PLC READY:** CPU báo cho QD75 biết chương trình đã sẵn sàng làm việc với module. Đây là tín hiệu do CPU điều khiển.
- **X0 — QD75 READY:** QD75 báo lại rằng module đã sẵn sàng. Chỉ khi X0 bật mới được phát lệnh chạy.

Thứ tự bắt buộc: bật Y0 trước, chờ X0, rồi mới ghi/đọc dữ liệu vận hành. Làm ngược lại sẽ không có hiệu lực hoặc bị module bỏ qua.

## 2. Cờ đồng bộ và thời điểm làm mới

- **X1 — cờ đồng bộ (Synchronization flag):** bật khi buffer memory của QD75 truy cập được. Dùng X1 làm điều kiện cho mọi lệnh đọc/ghi buffer memory trong chương trình tuần tự, tránh truy cập khi module chưa sẵn sàng.
- Một số thông số chỉ có hiệu lực sau khi Y0 chuyển từ OFF sang ON sau khi cấp điện hoặc reset CPU (ví dụ Pr.5, §5.2.1 p.5-20). Vì vậy trình tự chuẩn là: ghi thông số khi Y0 đang OFF, sau đó bật Y0 để module chốt giá trị.
- Sau khi ghi thông số bằng `TO`, cần đọc lại để xác nhận trước khi phát lệnh chạy.

## 3. Trình tự khởi động mẫu

1. Kiểm tra trục không BUSY (XC…XF).
2. Ghi các thông số cần thiết khi Y0 còn OFF.
3. Bật Y0 (PLC READY).
4. Chờ X0 bật (QD75 READY) và X1 bật (đồng bộ).
5. Kiểm tra cờ lỗi từng trục đang OFF (X8…XB).
6. Phát lệnh khởi động trục (Y10…Y13) hoặc ghi dữ liệu vị trí rồi khởi động.
7. Chờ cờ hoàn tất định vị (X14…X17) hoặc mã M ON (X4…X7) tuỳ bước.

Tên tín hiệu, ý nghĩa và thời điểm làm mới chính xác tra SH-080058 §3.3.1 (p.3-16) và chương liên quan.

## Đọc tiếp

- [Ladder và khởi động](/q/qd75/ladder)
- [Thông số QD75D4](/q/qd75/parameters)
- [Xử lý sự cố](/q/qd75/troubleshooting)
- [Tra cứu cấu hình nhanh](/q/qd75/reference)
