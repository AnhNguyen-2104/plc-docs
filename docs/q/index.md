---
title: MELSEC Q — module vị trí
family: q
status: draft
source: SH-080058
---

# MELSEC Q — module vị trí

Họ QD75 là các module vị trí gắn trên base MELSEC Q, phát xung tới driver servo/step. Trang này là điểm vào cho toàn bộ tài liệu QD75 của cẩm nang.

## 1. Các model QD75

| Model | Ngõ ra | Số trục | Ghi chú |
| --- | --- | --- | --- |
| QD75P1 | Open collector | 1 | Ngừng sản xuất 09/2021, thay bằng QD75P1N |
| QD75P2 | Open collector | 2 | Ngừng sản xuất 09/2021, thay bằng QD75P2N |
| QD75P4 | Open collector | 4 | Ngừng sản xuất 09/2021, thay bằng QD75P4N |
| QD75D1 | Differential driver | 1 | Ngừng sản xuất 09/2021, thay bằng QD75D1N |
| QD75D2 | Differential driver | 2 | Ngừng sản xuất 09/2021, thay bằng QD75D2N |
| QD75D4 | Differential driver | 4 | Ngừng sản xuất 09/2021, thay bằng QD75D4N |
| QD75P1N | Open collector | 1 | Bản thay thế hiện hành (FA-A-0286) |
| QD75P2N | Open collector | 2 | Bản thay thế hiện hành (FA-A-0286) |
| QD75P4N | Open collector | 4 | Bản thay thế hiện hành (FA-A-0286) |
| QD75D1N | Differential driver | 1 | Bản thay thế hiện hành (FA-A-0286) |
| QD75D2N | Differential driver | 2 | Bản thay thế hiện hành (FA-A-0286) |
| QD75D4N | Differential driver | 4 | Bản thay thế hiện hành (FA-A-0286) |

Đọc tên model: **QD75P** dùng ngõ ra open collector, **QD75D** dùng ngõ ra vi sai (differential driver). Hậu tố **N** (QD75P1N … QD75D4N) là bản thay thế hiện hành; dòng không N đã ngừng sản xuất (FA-A-0286). Số ở cuối tên là số trục.

Ngày ngừng sản xuất theo SH-080058 phụ lục A-19 (danh mục model ngừng sản xuất); bản N là sản phẩm thay thế (FA-A-0286, SH-080058 phụ lục 1.2). Kiểu ngõ ra open collector / vi sai theo SH-080058 §3.1 p.3-2.

## 2. QD75 và QD77MS

- **QD75** là module vị trí: nhận lệnh từ CPU qua buffer memory, tự phát xung tới từng driver, mỗi trục độc lập.
- **QD77MS** là motion module: điều khiển nhiều trục qua bus truyền thông, có khái niệm trục ảo và đồng bộ giữa các trục.

Khác biệt cốt lõi nằm ở kiểu truyền lệnh tới driver và khả năng phối hợp nhiều trục, không phải ở số trục. Cẩm nang này chỉ đi vào QD75; thông số cụ thể của QD77MS tra manual riêng của họ đó.

## 3. Trang QD75D4

- [Tổng quan QD75D4](/q/qd75/) — thông số cốt lõi, sơ đồ khối, phạm vi tài liệu.
- [Đấu dây](/q/qd75/wiring) — cặp xung vi sai, nguyên tắc đi dây, checklist trước khi cấp điện.
- [Tín hiệu X/Y](/q/qd75/io-signals) — bắt tay PLC READY và QD75 READY, cờ trục.
- [Thông số (Pr.)](/q/qd75/parameters) — đơn vị, xung/vòng, quãng đường/vòng, hai đường ghi thông số.
- [Dữ liệu vị trí (Da.)](/q/qd75/position-data) — mười trường, ba hệ điều khiển, giới hạn 600 điểm.
- [Về gốc toạ độ (OPR)](/q/qd75/opr) — các phương pháp OPR (mã Pr.43) và trình tự.
- [Ladder](/q/qd75/ladder) — buffer memory, trình tự khởi động, liên động an toàn.
- [Chạy thử](/q/qd75/commissioning) — quy trình từ cấp điện tới chạy có tải.
- [Xử lý sự cố](/q/qd75/troubleshooting) — chỉ báo, nhóm lỗi, cách tra mã lỗi.

## Đọc tiếp

- [Khái niệm cơ bản về điều khiển vị trí](/concepts/positioning-basics)
- [So sánh dòng PLC](/compare/)
