---
title: Xử lý sự cố QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

# Xử lý sự cố QD75D4

Nguyên tắc: xác định trạng thái trước, đọc chỉ báo, rồi mới thay đổi thông số hay chương trình. Mỗi lần chỉ thay một biến để còn quy được nguyên nhân.

## 1. Chỉ báo trên module

| Chỉ báo | Ý nghĩa thường gặp | Cần làm |
| --- | --- | --- |
| LED RUN | Module đang chạy bình thường | Nếu tắt: kiểm tra nguồn, vị trí gắn trên base, lỗi hệ thống |
| LED ERR | Có lỗi module hoặc lỗi trục | Đọc mã lỗi qua buffer memory/ngõ X, tra manual |
| LED MODE | Trạng thái chế độ hoạt động | Đối chiếu với chế độ đang chọn |

Tên LED và ý nghĩa chính xác lấy từ SH-080058 — chương troubleshooting; bảng trên chỉ là mô tả chung.

## 2. Nhóm lỗi thường gặp

| Hiện tượng | Nguyên nhân có thể | Kiểm tra | Khắc phục |
| --- | --- | --- | --- |
| Module không READY | Nguồn chưa đủ, chưa bật Y0, lỗi thông số | LED nguồn, trạng thái Y0/X0 | Cấp đủ nguồn, bật Y0, sửa thông số lỗi |
| Bật Y0 nhưng X0 không lên | Lỗi module, thông số trục sai, lỗi hệ thống | LED ERR, mã lỗi buffer | Xoá lỗi, ghi lại thông số, kiểm tra base |
| Có lệnh chạy nhưng trục không động | Chưa cho phép chạy, driver chưa servo-on, dây xung sai | Tín hiệu cho phép, trạng thái driver, cặp A/B | Bật servo, kiểm tra cặp vi sai, kiểm tra COM |
| Chạy sai hướng | Đảo cặp A/B hoặc đảo dấu toạ độ | Cách đấu, dấu dữ liệu vị trí | Đổi cặp dây hoặc đổi dấu theo cấu hình |
| Sai khoảng cách | Sai pulse/mm, sai Pr.2/Pr.3/Pr.4 | Tính lại pulse/mm, so với thực tế | Sửa thông số đơn vị, chạy lại kiểm tra ngắn |
| OPR không xong | Không thấy dog, sai chiều, mô-men giới hạn | Tín hiệu dog, chiều tìm gốc, Pr.54 | Chỉnh vị trí dog, chiều, mức mô-men |
| Driver báo quá dòng | Kẹt cơ khí, tăng tốc quá nhanh, lệch pha | Dòng driver, tải, thời gian gia tốc | Giảm gia tốc, kiểm tra cơ khí, kiểm tra đấu dây |

## 3. Mã lỗi

Mã lỗi tra bảng trong SH-080058 — chương troubleshooting; ghi mã + nguồn khi đã xác minh. Không suy đoán ý nghĩa mã từ con số.

Khi ghi nhận sự cố, lưu tối thiểu:

- Mã lỗi và nguồn tra cứu.
- Trục và chế độ đang chạy.
- Thông số liên quan tại thời điểm lỗi.
- Trạng thái Y0/X0 và chỉ báo LED.

## 4. Trình tự kiểm tra nhanh

1. Nguồn và chỉ báo LED.
2. Trạng thái READY của module và của trục.
3. Mã lỗi trong buffer memory.
4. Thông số đơn vị so với chuyển động thực.
5. Đấu dây xung và tín hiệu cho phép của driver.
6. Cơ khí: kẹt, rơ, giới hạn cứng.

## Đọc tiếp

- [Chạy thử QD75D4](/q/qd75/commissioning)
- [Thông số QD75D4](/q/qd75/parameters)
- [Tín hiệu X/Y](/q/qd75/io-signals)
