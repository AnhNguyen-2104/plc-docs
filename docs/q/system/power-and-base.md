---
title: Nguồn và base unit
family: q
module: q-series
status: draft
source: SH-080483
---
# Nguồn và base unit

Module nguồn quyết định hệ có chạy được hay không, và base unit quyết định có gắn thêm được bao nhiêu module. Hai thứ này bị ràng buộc bởi một con số duy nhất: tổng dòng 5 V của mọi thứ trên rack phải nhỏ hơn định mức của module nguồn.

## 1. Module nguồn

| Model | Điện áp vào | Ra 5 VDC | Ra 24 VDC | Kích thước (H×W×D) | Khối lượng | Nguồn |
| --- | --- | --- | --- | --- | --- | --- |
| Q61P | 100–240 VAC (85–264 VAC) | 6 A | Không có | 98 × 55,2 × 90 mm | 0,40 kg | SH-080483 §7.2.1 p.213 |
| Q62P | 100–240 VAC (85–264 VAC) | 3 A | 0,6 A (24 VDC ±10%) | 98 × 55,2 × 90 mm | 0,39 kg | SH-080483 §7.2.1 p.213 |
| Q63P | 24 VDC (15,6–31,2 VDC) | 6 A | Không có | 98 × 55,2 × 90 mm | 0,33 kg | SH-080483 §7.2.1 p.214 |
| Q64P | 100–120 / 200–240 VAC | 8,5 A | Không có | 98 × 55,2 × 115 mm | 0,40 kg | SH-080483 §7.2.1 p.215 |

Hai biến thể điện áp vào cố định là Q61P-A1 (100–120 VAC) và Q61P-A2 (200–240 VAC), cùng 6 A trên rail 5 V; Q61P bản tiêu chuẩn nhận cả hai dải (SH-080483 §7.2.1 p.212–213). Q64PN là bản 8,5 A có thêm chức năng, khối lượng 0,47 kg (SH-080483 §7.2.1 p.215–216).

Q62P là lựa chọn khi cần một ít 24 V cho tải nhỏ ngay trên module nguồn, nhưng chỉ 0,6 A — không đủ cho một nhóm I/O lớn. Với rack trong sơ đồ tổng thể, nhóm I/O dùng nguồn 24 VDC ngoài.

## 2. Base unit

**Base chính** (gắn được module nguồn, CPU và các module):

| Model | Số vị trí I/O | Chiều rộng | Dòng 5 V nội bộ | Khối lượng | Nguồn |
| --- | --- | --- | --- | --- | --- |
| Q33B | 3 | 189 mm | 0,11 A | 0,21 kg | SH-080483 §8.3 p.249 |
| Q35B | 5 | 245 mm | 0,11 A | 0,27 kg | SH-080483 §8.3 p.249 |
| Q38B | 8 | 328 mm | 0,12 A | 0,36 kg | SH-080483 §8.3 p.249 |
| Q312B | 12 | 439 mm | 0,13 A | 0,47 kg | SH-080483 §8.3 p.249 |

**Base mở rộng** (cần module nguồn riêng):

| Model | Số vị trí I/O | Chiều rộng | Dòng 5 V nội bộ | Khối lượng | Nguồn |
| --- | --- | --- | --- | --- | --- |
| Q63B | 3 | 189 mm | 0,11 A | 0,23 kg | SH-080483 §8.3 p.249 |
| Q65B | 5 | 245 mm | 0,11 A | 0,28 kg | SH-080483 §8.3 p.249 |
| Q68B | 8 | 328 mm | 0,12 A | 0,38 kg | SH-080483 §8.3 p.249 |
| Q612B | 12 | 439 mm | 0,13 A | 0,51 kg | SH-080483 §8.3 p.249 |

Mọi base trong bảng đều cao 98 mm và sâu 44,1 mm; base cố định bằng vít M4 (SH-080483 §8.3 p.249). Cột "Số vị trí I/O" là số module I/O gắn được, chưa kể vị trí module nguồn và vị trí CPU trên base chính: Q38B có 8 vị trí I/O, trong khi sơ đồ tổng thể dùng 6 module I/O (vị trí 2–7) nên còn 2 vị trí trống.

## 3. Ví dụ tính dòng tiêu thụ (rack trong sơ đồ)

Lấy đúng rack tám vị trí ở [trang tổng thể](./index), cộng dòng 5 V của từng thành phần:

| Thành phần | Dòng 5 V | Nguồn |
| --- | --- | --- |
| Q61P | 0 A (nguồn cấp, không tự tiêu thụ trên rail) | SH-080483 §7.2.1 p.213 |
| Q38B (base) | 0,12 A | SH-080483 §8.3 p.249 |
| Q03UDV (CPU) | 0,58 A | SH-080483 §6.2.5 p.190 |
| QX40 | 0,05 A (50 mA, tất cả điểm ON) | SH-080042 §2.4 p.2-4 |
| QY40P | 0,065 A (65 mA, tất cả điểm ON) | SH-080042 §3.5 p.3-7 |
| QD75D4 | 0,82 A | SH-080058 §3.1 p.3-5 |
| QD62 | 0,30 A | SH-080036 §3.1 p.3-2 |
| Q64AD | 0,63 A | SH-080055 §3.1.1 p.3-1 |
| QJ71E71-100 | 0,50 A | SH-080009 §3.2 p.29 |

Phép cộng:

`0,12 + 0,58 + 0,05 + 0,065 + 0,82 + 0,30 + 0,63 + 0,50 = 3,065 A`

Q61P định mức 6 A, vậy còn dư:

`6,00 − 3,065 = 2,935 A` — còn khoảng **48,9 %** định mức.

Rack này chạy được với Q61P. Nếu đổi sang Q62P (3 A), tổng 3,065 A **vượt** định mức ngay cả khi chưa tính module thêm — Q62P không phù hợp cho cấu hình này.

> **Các con số trên chỉ đúng cho đúng danh sách module này.** Thay model, thêm module hoặc bật thêm điểm I/O là phải cộng lại. Dòng "tất cả điểm ON" là giá trị xấu nhất mà manual công bố cho QX40/QY40P; dùng giá trị này để tính là an toàn.

Với nguồn xoay chiều, công suất nguồn cấp nên **lớn hơn ít nhất hai lần** công suất tiêu thụ của module nguồn; với nguồn một chiều là **bốn lần** (SH-080483 §7.2.4 p.234). Đây là biên an toàn cho dòng khởi động, không phải định mức của module.

## 4. Nối đất và chống nhiễu

- Dùng dây nối đất riêng, điện trở đất **≤100 Ω**; nếu không có đất riêng thì dùng nối đất chung hình (2), **không** dùng nối đất chung hình (3) kiểu "common grounding" (SH-080483 §4.8.4 p.118).
- Dây đất to tối đa **2 mm²**, đưa điểm nối đất càng gần PLC càng tốt để rút ngắn dây (SH-080483 §4.8.4 p.118).
- Nối `LG` và `FG` rồi nối đất; nếu để hở, PLC dễ bị nhiễu. `LG` mang một nửa điện áp vào (SH-080483 §4.8.1 p.110).
- Dây I/O đi cách dây động lực **≥100 mm**; khi buộc phải bó chung, dùng cáp có vỏ bọc và nối đất vỏ ở phía PLC (SH-080483 p.2, §4.8.2 p.111).
- Dây 24 VDC đi riêng với dây 100/200 VAC; dây dài từ 200 m trở lên có thể gây sự cố do dòng rò điện dung đường dây (SH-080483 §4.8.2 p.111).
- Đi dây nguồn 100/200 VAC và 24 VDC bằng dây to nhất có thể (tối đa 2 mm²) và xoắn đôi từ đầu cọc đấu (SH-080483 §4.8.1 p.110).

> **Chưa xác minh trong manual trên đĩa:** dòng "0 A" của Q61P là suy luận thiết kế (module nguồn cấp cho rail chứ không tự tiêu thụ từ rail); SH-080483 §7.2.1 không in một dòng "internal 5 V current" cho Q61P. Nếu cần con số chính thức, tra bảng chọn nguồn của dự án.
