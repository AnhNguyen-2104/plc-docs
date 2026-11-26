---
title: Cách dùng
family: q
module: q-series
status: draft
source: SH-080483
---

# Cách dùng

<ModuleSectionNav />

Trang này chỉ cách tra cứu cẩm nang cho kỹ thuật viên mới làm quen: đi từ nhóm module tới đúng model, đọc bảng thông số, rồi mang cấu hình sang GX Works2.

## 1. Lần đầu vào cẩm nang

Đi theo [Bắt đầu — từ hộp đến chạy](/q/start/) để có lộ trình 5 bước từ chọn module tới chạy thử. Khi đã có rack thực tế, dùng [Ghép module](/q/modules/assembly) để kiểm số khe, số điểm và dòng 5 V trước khi lắp.

## 2. Tra một model

1. Mở [Hướng dẫn các module](/q/modules/guides).
2. Tìm nhóm chức năng (CPU, Vào số, Ra số, Tương tự, Đếm xung, Truyền thông, Chuyển động) rồi bấm tên model.
3. Trang model mở ở `/q/modules/m/<id>`: đọc "Thông số tóm tắt", mở PDF ở dòng Manual, rồi đọc mục "Đấu dây".
4. Cần bảng chân chi tiết, theo link "Trang nhóm" ở cuối trang model.

## 3. Đọc nhãn trên trang model

- **dự kiến**: module chưa xác minh đủ thông số từ manual trên đĩa; chỉ dùng mô tả định tính, không suy diễn số.
- **—**: chưa có số liệu cho mục đó; không tự điền.
- **Manual / Mở PDF**: tài liệu gốc và số trang để đối chiếu.
- **Trang nhóm**: trang phân loại có bảng chân và quy tắc đấu dây chung của nhóm.

## 4. Ghép module vào rack

1. Chọn CPU, base chính và module nguồn.
2. Gán module vào từng khe; khe trống mặc định chiếm 16 điểm.
3. Đọc cảnh báo vượt dòng 5 V hoặc vượt trần điểm I/O.
4. Bấm "Sao chép cho GX Works2" để lấy bảng TSV dán vào I/O Assignment.

## 5. Liên kết

- [Đấu dây vào/ra](/q/system/io-wiring)
- [Nguồn và base unit](/q/system/power-and-base)
- [Tạo dự án GX Works2](/q/start/project)
- [Tổng quan danh mục](/q/modules/)
