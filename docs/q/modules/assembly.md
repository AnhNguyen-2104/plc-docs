---
title: Ghép module & cấu hình rack
family: q
module: q-series
status: draft
source: SH-080483, SH-080807
---

# Ghép module & cấu hình rack

<ModuleSectionNav />

Ghép module là chọn CPU, base, nguồn và xếp module vào khe sao cho không vượt ba giới hạn: số điểm I/O của CPU, số khe của base và tổng dòng 5 V của nguồn. Công cụ dưới đây tính địa chỉ X/Y, tổng điểm và tổng dòng 5 V, cảnh báo khi vượt định mức; quy tắc chi tiết ở mục 1. Hướng dẫn từng model nằm ở mục [Hướng dẫn các module](/q/modules/guides).

<RackBuilder />

## 1. Ba giới hạn phải kiểm

| Giới hạn | Kiểm ở đâu | Nguồn |
| --- | --- | --- |
| Điểm I/O tối đa của CPU | `maxIoPoints` trong bảng cấu hình; Q00UJCPU 256, Q03UDV/Q06UDH 4096 | SH-080483 §1.1 p.26 |
| Số khe của base | Q33B 3, Q35B 5, Q38B 8, Q312B 12; base mở rộng Q63B/Q65B/Q68B/Q612B cùng quy cách | SH-080483 §8.3 p.249 |
| Tổng dòng 5 V | Cộng dòng base + CPU + từng module, so với định mức Q61P 6 A / Q62P 3 A / Q63P 6 A / Q64P 8,5 A | SH-080483 §7.2.1 p.213–215 |

- Khe trống vẫn chiếm 16 điểm mặc định; chỉ đặt 0 điểm khi đã khai đúng trong I/O Assignment (SH-080807 §2.3.1 p.56).
- Module thông minh chiếm 16 hoặc 32 điểm tùy model; tra cột "Số điểm" ở bảng kết quả.
- Module chưa có số dòng 5 V hiện "—", không được cộng vào tổng và bị cảnh báo riêng.

## 2. Đọc kết quả và mang sang GX Works2

- **Dải X / Dải Y**: khoảng địa chỉ module thực dùng; module vào chỉ có X, module ra chỉ có Y, module thông minh/kết hợp có cả hai.
- **Khe trống = 0 điểm**: dồn địa chỉ các khe sau lên; chỉ dùng khi đã khai 0 điểm trong I/O Assignment.
- **Sao chép cho GX Works2**: bảng TSV 5 cột `Slot / Type / Model Name / Points / Start XY`, dán trực tiếp vào I/O Assignment.
- **Ghi đè số điểm và đối chiếu**: mỗi khe có ô *Điểm* (để trống = tự động); đổi số điểm sẽ tính lại `Start XY` của mọi khe phía sau. Dán bảng I/O Assignment từ GX Works2 vào ô đối chiếu để so `Start XY` đã tính với giá trị thực tế, vì số khe vật lý và địa chỉ X/Y có thể không trùng nhau.
- Quy trình tạo dự án và ghi xuống CPU: [Tạo dự án GX Works2](/q/start/project).

## 3. Liên kết

- [Nguồn và base unit](/q/system/power-and-base)
- [Đấu dây vào/ra](/q/system/io-wiring)
- [Hướng dẫn các module](/q/modules/guides)
- [Tổng quan danh mục](/q/modules/)
