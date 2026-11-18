---
title: Về gốc toạ độ (OPR) — QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

# Về gốc toạ độ (OPR) — QD75D4

OPR (origin point return) là bước xác lập gốc toạ độ cho trục. Chỉ sau khi OPR thành công, chế độ định vị tuyệt đối mới có nghĩa. Định vị tương đối vẫn chạy được nhưng sẽ trôi nếu gốc sai.

Phương pháp OPR do **Pr.43** quyết định (SH-080058 §5.2.5 p.5-45). Hai thông số đi kèm:

- Pr.54 — giới hạn mô-men khi OPR, 1…300 %, mặc định 300 (SH-080058 §5.2.6 p.5-54).
- Pr.56 — tốc độ khi dịch chuyển trong OPR: `0` dùng tốc độ OPR (Pr.46), `1` dùng tốc độ bò (Pr.47) (SH-080058 §5.2.6 p.5-54).

## 1. Các phương pháp OPR (Pr.43)

| Mã | Phương pháp | Nguyên lý |
| --- | --- | --- |
| 0 | Near-point dog | Trục chạy tìm tín hiệu dog, giảm tốc, rồi dò điểm zero của động cơ/driver |
| 1 | Stopper 1 | Chạy ép vào chặn cứng, phát hiện bằng mô-men giới hạn, rồi đặt gốc |
| 2 | Stopper 2 | Chi tiết tra SH-080058 §5.2.5 (p.5-45) |
| 3 | Stopper 3 | Chi tiết tra SH-080058 §5.2.5 (p.5-45) |
| 4 | Count method 1 | Đếm xung tích luỹ để xác định điểm gốc theo cấu hình |
| 5 | Count method 2 | Chi tiết tra SH-080058 §5.2.5 (p.5-45) |

Mã phương pháp và điều kiện áp dụng của từng mã tra SH-080058 §5.2.5 (p.5-45).

**Data set không phải là phương pháp Pr.43.** Đặt lại giá trị hiện tại (current value change) là một chức năng riêng, không nằm trong danh sách 0–5 ở trên; dùng khi cần gán toạ độ mà không chạy trục.

## 2. Trình tự OPR dùng near-point dog

1. Nhận lệnh OPR, kiểm tra trục không bận và không có lỗi.
2. Chạy theo chiều tìm gốc với tốc độ OPR.
3. Gặp tín hiệu dog, giảm tốc và chuyển sang vận tốc bò (creep).
4. Rời dog hoặc chạm điểm zero, ghi nhận vị trí gốc.
5. Dừng trục, cập nhật cờ hoàn tất OPR.

Trong bước 3–4, giới hạn mô-men (Pr.54) bảo vệ cơ cấu nếu trục chạm vật cản trước khi gặp điểm gốc. Tốc độ ở bước dịch chuyển cuối dùng Pr.56.

## 3. Ưu và nhược điểm

| Phương pháp | Ưu | Nhược |
| --- | --- | --- |
| Near-point dog | Độ lặp lại cao, chuẩn cho máy có hành trình dài | Cần lắp thêm dog và cảm biến, tốn thời gian chạy tìm |
| Count method 1 / 2 | Không cần thêm cơ cấu trên hành trình | Phụ thuộc tính liên tục của bộ đếm; mất xung là mất gốc |
| Stopper 1 / 2 / 3 | Đơn giản, dùng cho hành trình ngắn | Tạo lực ép cơ khí, mài mòn, không phù hợp trục nhạy |

## 4. Điều kiện để OPR thành công

- Thông số trục đã ghi và có hiệu lực.
- Chiều tìm gốc, tốc độ OPR, tốc độ bò đã khai báo đúng.
- Tín hiệu dog ổn định, không nhiễu.
- Trục ở trạng thái READY, không có lỗi chưa xoá.
- Giới hạn mô-men (Pr.54) đặt phù hợp để không ép quá mức.

## Đọc tiếp

- [Thông số QD75D4](/q/qd75/parameters)
- [Chạy thử QD75D4](/q/qd75/commissioning)
- [Xử lý sự cố](/q/qd75/troubleshooting)
