---
title: Mẫu chương trình QD75
family: common
status: draft
---

# Mẫu chương trình QD75

Các tệp mẫu không được đưa vào kho mã nguồn dưới dạng nhị phân. Chúng được phát hành qua GitHub Releases của kho tài liệu và chỉ qua kênh đó.

Danh sách tệp dự kiến:

| Tệp | Nội dung | Trạng thái |
| --- | --- | --- |
| `qd75d4-init.il` | Khởi tạo: ghi thông số Pr. cần thiết trước khi bật READY | chưa phát hành |
| `qd75d4-position-table.csv` | Bảng dữ liệu vị trí Da. mẫu cho 4 trục | chưa phát hành |
| `qd75d4-startup.il` | Trình tự bật Y0, chờ X0, phát lệnh khởi động trục | chưa phát hành |

Ghi chú:

- Releases là kênh phân phối duy nhất được hỗ trợ; tệp tải từ nơi khác không được đảm bảo khớp với nội dung tài liệu.
- Các tệp mẫu dùng địa chỉ buffer dạng ký hiệu và số thiết bị minh hoạ; trước khi dùng phải đối chiếu với cấu hình thực tế của module.
- Xem thêm [QD75D4 — ladder và khởi động](/q/qd75/ladder) để hiểu trình tự mà các tệp này triển khai.
