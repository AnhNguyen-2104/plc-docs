---
title: Module truyền thông nối tiếp MELSEC Q — danh sách module
family: q
module: q-series
status: draft
source: SH-080007
---

# Module truyền thông nối tiếp MELSEC Q — danh sách module

<ModulePhoto id="qj71c24n" />

[QJ71C24N](/q/modules/m/qj71c24n) là module truyền thông nối tiếp gắn trên base MELSEC Q, trao đổi dữ liệu với thiết bị ngoài qua hai kênh độc lập. Module giữ vùng đệm phát/thu trong buffer memory; CPU đọc/ghi bằng `FROM`/`TO`, bằng lệnh chuyên dụng `OUTPUT`/`INPUT`, hoặc để module tự xử lý theo giao thức MC. Trang này liệt kê các model nối tiếp và giúp chọn biến thể; chân tín hiệu, công tắc cài đặt, buffer memory và checklist đấu dây của QJ71C24N nằm ở trang model.

## Danh sách module

| Model | Vai trò |
| --- | --- |
| [QJ71C24N](/q/modules/m/qj71c24n) | Hai kênh nối tiếp: RS-232 và RS-422/485 |
| [QJ71C24N-R4](/q/modules/m/qj71c24n-r4) | Hai kênh nối tiếp RS-422/485 |

## 1. Các biến thể model

| Model | CH1 | CH2 | Ghi chú |
| --- | --- | --- | --- |
| QJ71C24N | RS-232 (D-sub 9 chân) | RS-422/485 (khối đầu cực 2 mảnh) | Bản cơ sở, một kênh mỗi loại |
| QJ71C24N-R2 | RS-232 (D-sub 9 chân) | RS-232 (D-sub 9 chân) | Hai kênh RS-232 |
| QJ71C24N-R4 | RS-422/485 (khối cắm 2 mảnh) | RS-422/485 (khối cắm 2 mảnh) | Hai kênh RS-422/485 |

Bảng gán kênh và kiểu giao diện theo SH-080006 §3.1 p.3-1. Khoảng cách truyền tối đa: RS-232 **15 m**, RS-422/485 **1200 m** (tổng chiều dài tuyến) — SH-080006 §3.1 p.3-2.

Khối cắm của [bản -R4](/q/modules/m/qj71c24n-r4) cần tuốt vỏ 7 mm và dùng plate terminal đi kèm khi nối dây bện chống nhiễu; [bản QJ71C24N](/q/modules/m/qj71c24n) dùng khối đầu cực bắt vít M3 — SH-080006 §4.4 (3) p.4-5.

## 2. Các module truyền thông khác

| Model | Vai trò |
| --- | --- |
| [QJ71E71-100](/q/modules/m/qj71e71-100) | Module Ethernet 100BASE-TX/10BASE-T |
| [QJ61BT11N](/q/modules/m/qj61bt11n) | Module master/local CC-Link |
| [QJ71LP21-25](/q/modules/m/qj71lp21-25) | Module mạng vòng quang MELSECNET/H |

## 3. Đọc tiếp

- Giao thức MC, định dạng khung và lệnh: SH-080007 (sổ tay Application).
- Cài đặt chi tiết từng bit và mã lỗi: SH-080006 (sổ tay Basic).
- Các module khác của họ Q: [MELSEC Q](/q/).

