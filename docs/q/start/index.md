---
title: Bắt đầu — từ hộp đến chạy
family: q
module: q-series
status: draft
source: SH-080807, SH-080483
---

# Bắt đầu — từ hộp đến chạy

Trang này là lộ trình ngắn nhất từ một bộ MELSEC Q còn trong hộp tới lần chạy thử đầu tiên. Làm đúng thứ tự; mỗi bước chỉ cần một trang.

## Chuẩn bị

- GX Works2, bản hỗ trợ đúng CPU đang dùng.
- Cáp USB mini-B cho CPU Universal, hoặc cáp theo cổng lập trình thực tế.
- Danh sách model thực tế trên rack: CPU, module nguồn, base và từng module I/O.
- Đồng hồ vạn năng và sơ đồ đấu dây của thiết bị ngoài.

> Cắt điện trước khi đấu dây. Không cắm hoặc rút module khi rack đang được cấp điện.

## Lộ trình 5 bước

- [ ] **1. Hiểu khái niệm vị trí** — xung, đơn vị, gia tốc và quan hệ giữa PLC với driver: [Khái niệm cơ bản về điều khiển vị trí](/concepts/positioning-basics).
- [ ] **2. Chọn module và vị trí slot** — quy tắc địa chỉ X/Y, khe trống và dòng 5 V: [Chọn module & vị trí slot](/q/start/configuration).
- [ ] **3. Tạo dự án GX Works2** — đúng PLC Series, PLC Type và I/O Assignment: [Tạo dự án GX Works2](/q/start/project).
- [ ] **4. Đấu dây vào/ra** — common dương/âm, tải cảm và tách dây động lực: [Đấu dây vào/ra](/q/system/io-wiring).
- [ ] **5. Chạy thử** — trình tự cấp điện, kiểm tra tín hiệu và chạy có tải: [Chạy thử & dữ liệu thật](/q/qd75/commissioning).

## Sau bước 5

- [Danh mục module](/q/modules/) — tra model, số điểm và dòng tiêu thụ.
- [Nguồn và base unit](/q/system/power-and-base) — tính lại dòng 5 V khi thêm module.
- [Hệ thống Q hoàn chỉnh](/q/system/) — sơ đồ rack tham chiếu và đường tín hiệu.

## Nguyên tắc

Mọi con số trong mục này lấy từ manual hãng ghi ngay cạnh bảng hoặc câu. Không suy đoán số điểm I/O hay dòng tiêu thụ: module chưa xác minh được sẽ hiện "—" và được cảnh báo trong công cụ cấu hình rack.
