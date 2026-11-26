---
title: Chọn module & vị trí slot
family: q
module: q-series
status: draft
source: SH-080483, SH-080807
---

# Chọn module & vị trí slot

Địa chỉ X/Y không do người lập trình tự đặt: chúng do vị trí vật lý của module trên base quyết định. Hiểu quy tắc này trước khi mở GX Works2 sẽ tránh phải sửa chương trình về sau.

## 1. Quy tắc địa chỉ

- Địa chỉ I/O là số **hex**, bắt đầu từ `0H` tại module ngay bên phải CPU.
- Module **vào** dùng `X`, module **ra** dùng `Y`; module thông minh và module kết hợp dùng cả `X` và `Y` (SH-080807 §2.3.1 p.56).
- Mỗi slot chiếm đúng số điểm của module gắn trên đó. **Slot trống vẫn được tính là một slot** và mặc định chiếm 16 điểm, trừ khi khai 0 điểm trong I/O Assignment (SH-080483 §2.3 p.43; SH-080807 §2.3.1 p.56).
- Base mở rộng nối tiếp số địa chỉ cuối của base chính.

## 2. Ví dụ tính tay

Rack Q38B + Q61P + Q03UDV, khe 0 = QX40, khe 1 = QD75D4, khe 2 trống:

| Khe | Model | Điểm | Địa chỉ |
| --- | --- | --- | --- |
| 0 | QX40 | 16 | `X000–X00F` |
| 1 | QD75D4 | 32 | `X/Y010–X02F` |
| 2 | trống | 16 | `030–03F` dành chỗ |

Tổng dòng 5 V của cùng rack nhỏ hơn nhiều so với định mức Q61P:

`0,12 (base) + 0,58 (CPU) + 0,05 (QX40) + 0,82 (QD75D4) = 1,57 A`

trên nguồn 6 A — đã dùng khoảng **26,2 %**, còn dư 4,43 A. Đây là bảng kiểm tra cố định cho công cụ bên dưới: chọn đúng cấu hình này phải ra đúng các con số trên.

## 3. Công cụ cấu hình rack

Chọn CPU, base và nguồn, rồi gán module vào từng khe. Công cụ tự tính địa chỉ X/Y, tổng điểm và tổng dòng 5 V; cảnh báo khi vượt định mức hoặc khi gặp module chưa có số liệu.

<RackBuilder />

## 4. Đọc kết quả

- **Dải X / Dải Y** là khoảng địa chỉ module thực sự dùng; module vào chỉ có X, module ra chỉ có Y.
- **Khe trống = 0 điểm** dồn địa chỉ các khe sau lên, chỉ dùng khi đã khai 0 điểm tương ứng trong I/O Assignment. Để trống theo mặc định 16 điểm là lựa chọn an toàn.
- **Dòng 5 V** chỉ cộng các module đã có số; module hiện "—" được liệt kê riêng và không cộng vào tổng.
- Nút **Sao chép cho GX Works2** cho bảng TSV dán trực tiếp vào I/O Assignment; nút **Sao chép Markdown** cho bảng để dán vào tài liệu dự án.

## 5. Sau khi có bảng slot

Đưa bảng này sang [trang tạo dự án GX Works2](/q/start/project), khai đúng `Type`, `Model Name`, `Points`, `Start XY`, rồi ghi xuống CPU. Thêm hoặc đổi module sau này thì quay lại đây tính lại cả địa chỉ lẫn dòng 5 V.
