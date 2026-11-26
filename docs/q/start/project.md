---
title: Tạo dự án GX Works2
family: q
module: q-series
status: draft
source: SH-080807, SH-080483
---

# Tạo dự án GX Works2

Một dự án GX Works2 phải khai đúng CPU và đúng rack ngay từ đầu. Chọn sai PLC Type hoặc bỏ trống I/O Assignment thì địa chỉ X/Y do phần mềm cấp sẽ khác địa chỉ thực trên base, và chương trình sẽ đọc/ghi nhầm module.

## 1. Tạo dự án mới

1. `Project > New…`.
2. `Project Type`: **Simple Project**.
3. Bỏ chọn `Use Label` nếu chương trình không dùng label.
4. `PLC Series`: **QCPU (Q mode)**.
5. `PLC Type`: đúng model CPU trên rack — ví dụ `Q03UDVCPU`, `Q06UDHCPU`, `Q00UJCPU`.
6. `Language`: **Ladder**.

Cấu trúc hộp thoại và các lựa chọn này theo SH-080807 §1.2 p.27.

## 2. Khai I/O Assignment

Mở `PLC Parameter > I/O Assignment`.

- **Base Mode = Auto** cho rack đơn giản: GX Works2 tự cấp địa chỉ theo thứ tự module.
- **Base Mode = Detail** khi cần khai số khe, giữ khe trống hoặc đặt 0 điểm cho khe không dùng. Khai `Base Model Name`, `Power Model Name`, `Extension Cable` và `Slots` đúng như rack thực tế (SH-080807 §2.2.2 p.54).

Bảng slot có bốn cột cần khớp với thực tế:

| Cột | Ý nghĩa |
| --- | --- |
| Type | Loại module: I/O số, intelligent, hoặc để trống |
| Model Name | Tên model trên vỏ module |
| Points | Số điểm I/O module chiếm trên base |
| Start XY | Địa chỉ bắt đầu do GX Works2 cấp |

Giá trị `Points` và `Start XY` lấy từ [trang cấu hình rack](/q/start/configuration); công cụ ở đó sinh đúng bảng theo thứ tự slot.

## 3. Ghi xuống CPU

1. Nối cáp lập trình, bật nguồn rack.
2. `Online > Write to PLC`.
3. Chọn `PLC Parameter` cùng chương trình cần nạp.
4. Sau khi ghi, mở lại `PLC Parameter > I/O Assignment` và kiểm tra không có ô báo lỗi.

Nếu GX Works2 báo lỗi I/O Assignment, đối chiếu lại `Points` và `Start XY` với bảng cấu hình; phần lớn lỗi là khai thừa khe hoặc đặt sai số điểm cho module thông minh.

## 4. Module thông minh

GX Works2 không tự cấu hình thông số làm việc của module thông minh. Sau khi khai I/O Assignment:

- **QD75D4** — cấu hình bằng GX Configurator-QP, hoặc ghi buffer memory bằng ladder (`TO`/`FROM`, thiết bị `U\G`): [Chương trình điều khiển QD75](/q/qd75/ladder).
- **QJ71E71-100, QJ61BT11N** — khai trong `Intelligent Function Module Parameter` của dự án, không chỉ trong I/O Assignment.
- **Q64AD, Q62DA, QD62** — thông số ban đầu cũng nằm trong `Intelligent Function Module Parameter` hoặc ghi buffer memory.

## 5. Kiểm tra trước khi chạy

- Tên CPU trong dự án khớp tên trên vỏ CPU.
- Tổng số điểm I/O không vượt trần CPU (Q03UDV/Q06UDH: 4096; Q00UJCPU: 256).
- Tổng dòng 5 V của rack nằm dưới định mức module nguồn: [Nguồn và base unit](/q/system/power-and-base).
- Khe trống đã được khai đúng 16 điểm hoặc 0 điểm theo thiết kế.
