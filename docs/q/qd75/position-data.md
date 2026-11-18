---
title: Dữ liệu vị trí (Da.) — QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

<script setup>
import { daRows } from '../../.vitepress/data/modules/qd75d4.ts'
</script>

# Dữ liệu vị trí (Da.) — QD75D4

Mỗi điểm chạy là một bộ dữ liệu vị trí. QD75D4 lưu tối đa 600 điểm cho mỗi trục; số điểm này độc lập với số trục.

## 1. Các trường dữ liệu

<ParamTable :rows="daRows" title="Dữ liệu vị trí (Da.)" />

Mười trường (Da.1–Da.10), thứ tự và dải giá trị lấy theo SH-080058 §5.3 (p.5-59…5-71). Ý nghĩa:

- **Mẫu hoạt động:** chạy xong một điểm rồi dừng, nối tiếp điểm kế, hay nối tiếp theo đường liên tục.
- **Hệ điều khiển:** mã kiểu điều khiển của điểm — tuyến tính ABS/INC, cấp phôi cố định, cung tròn, xoắn, điều khiển tốc độ, tốc độ–vị trí, vị trí–tốc độ, NOP, POS, JUMP, LOOP, LEND.
- **Số thời gian gia tốc:** chọn bộ thời gian gia tốc trong bảng thông số; bộ số 0 dùng Pr.9 (SH-080058 §5.2.2 p.5-24).
- **Số thời gian giảm tốc:** chọn bộ thời gian giảm tốc trong bảng thông số; bộ số 0 dùng Pr.10 (SH-080058 §5.2.2 p.5-24).
- **Trục nội suy:** trục phối hợp khi nội suy; đặt trùng trục hiện tại gây lỗi.
- **Toạ độ / độ dịch:** giá trị 32 bit — toạ độ đích với ABS, quãng đường với INC và cấp phôi cố định.
- **Địa chỉ cung:** điểm phụ hoặc tâm cho nội suy cung tròn/xoắn.
- **Tốc độ lệnh:** tốc độ của điểm; giá trị -1 nghĩa là giữ tốc độ hiện tại.
- **Thời gian dừng (dwell):** giữ tại đích; khi kiểu điều khiển là JUMP thì trường này là số hiệu điểm đích nhảy tới.
- **Mã M:** số hiệu phối hợp thiết bị ngoài; với một số kiểu điều khiển, trường này mang nghĩa số hiệu dữ liệu điều kiện hoặc số lần lặp LOOP.

## 2. Ba hệ điều khiển

1. **Một tốc độ:** chạy tới đích với một tốc độ, tăng tốc đầu và giảm tốc cuối theo thời gian đã chọn. Dùng cho di chuyển điểm–điểm thông thường.
2. **Hai tốc độ:** chạy tốc độ cao tới điểm trung gian, sau đó chuyển sang tốc độ thấp tới đích. Dùng khi cần tiếp cận chậm để tránh va đập hoặc chờ tín hiệu.
3. **Tốc độ–vị trí:** chạy theo tốc độ trong một khoảng, sau đó chuyển sang định vị tới đích. Dùng cho cấp phôi dài hoặc khi điểm bắt đầu thay đổi.

Ba kiểu chỉ khác nhau ở cách chia đoạn tăng tốc – chạy đều – giảm tốc; cơ chế phát xung và bắt tay hoàn tất giống nhau.

## 3. Giới hạn 600 điểm và quan hệ với Pr.

- 600 điểm/trục là giới hạn lưu trữ, không phải giới hạn số lần chạy.
- Khi vượt giới hạn, không thể thêm điểm mới; phải xoá hoặc ghi đè điểm cũ. Ghi ngoài vùng bị module báo lỗi — mã lỗi tra SH-080058.
- Tốc độ trong Da. bị chặn trên bởi tốc độ giới hạn của trục (Pr.8, SH-080058 §5.2.2 p.5-24); đặt vượt sẽ bị từ chối hoặc bị chặn tuỳ cấu hình.
- Thời gian gia tốc/giảm tốc của Da. chọn theo bộ số hiệu; bộ thời gian mặc định lấy từ Pr.9/Pr.10 (SH-080058 §5.2.2 p.5-24).

## 4. Trình tự ghi dữ liệu vị trí

1. Trục ở trạng thái READY, không chạy.
2. Ghi từng trường Da. qua buffer memory (dùng `TO`/`U<base>\G<addr>`).
3. Đọc lại để xác nhận.
4. Chạy thử từng điểm ở tốc độ thấp.

Chi tiết địa chỉ buffer memory cho từng trường tra SH-080058 — chương dữ liệu vị trí.

## Đọc tiếp

- [Thông số QD75D4](/q/qd75/parameters)
- [Ladder và khởi động](/q/qd75/ladder)
- [Chạy thử](/q/qd75/commissioning)
- [Tra cứu cấu hình nhanh](/q/qd75/reference)
