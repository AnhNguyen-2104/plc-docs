---
title: Chạy thử QD75D4 (commissioning)
family: q
module: qd75d4
status: draft
source: SH-080058
---

# Chạy thử QD75D4 (commissioning)

Quy trình này đưa một trục từ trạng thái đã đấu dây sang chạy có tải. Không bỏ qua bước nào, không gộp bước.

## 1. Điều kiện tiên quyết

- Nút dừng khẩn đã đấu và đã thử tác động, độc lập với PLC.
- Công tắc hành trình cứng hoạt động ở hai đầu hành trình.
- Trục **không tải**, hoặc tải nhẹ đã biết khối lượng.
- Tốc độ thử đặt thấp; giới hạn mềm trong phạm vi hành trình an toàn.
- Thông số trục đã chuẩn bị và đã rà soát đơn vị.
- Có người thứ hai quan sát khi chạy thử lần đầu.

## 2. Các bước chạy thử

1. **Cấp điện và kiểm tra READY**
   - Quan sát: LED nguồn, LED RUN, trạng thái X0 sau khi bật Y0.
   - Ghi: thời điểm cấp điện, thời gian tới READY, chỉ báo bất thường.

2. **Nạp thông số**
   - Quan sát: không lỗi sau khi ghi; giá trị đọc lại khớp giá trị ghi.
   - Ghi: bộ thông số dùng, thời điểm ghi, lỗi nếu có.

3. **OPR**
   - Quan sát: chiều tìm gốc, thời điểm gặp dog, điểm dừng, cờ hoàn tất.
   - Ghi: vị trí gốc, số vòng/thời gian, lỗi nếu có.

4. **JOG**
   - Quan sát: chiều chạy, tốc độ thấp, tiếng ồn cơ khí, chiều hiển thị toạ độ.
   - Ghi: tốc độ JOG, chiều, nhận xét cơ khí.

5. **Định vị một khối (single block)**
   - Quan sát: điểm đến so với đặt, biên dạng tăng/giảm tốc, tín hiệu hoàn tất.
   - Ghi: vị trí đặt, vị trí đo, sai số.

6. **Chạy có tải**
   - Quan sát: sai số lặp lại, rung, nhiệt driver, tiếng ồn.
   - Ghi: tải, tốc độ, sai số nhiều lần chạy.

## 3. Bảng đo dữ liệu thật

| Ngày | Trục | Lệnh | Giá trị đặt | Giá trị đo | Sai số | Tốc độ | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- | --- |
| — | — | — | — | — | — | — | — |

Bảng để trống cho tới khi có số đo thật; không điền số giả. Mỗi dòng phải gắn với một lần chạy có thể truy vết: ngày, trục, lệnh, dụng cụ đo.

## 4. Điều kiện để chuyển status: verified

Trang này giữ `status: draft`. Chỉ chuyển sang `verified` khi:

- Có ít nhất một lần chạy thật trên phần cứng tương ứng với model ghi trong tiêu đề.
- Bảng đo đã có dữ liệu thật, có dụng cụ đo và người thực hiện.
- Sai số nằm trong dung sai đã định trước và được ghi lại.
- Các bước ở trên được thực hiện đủ, không bỏ qua bước an toàn.

## Đọc tiếp

- [Về OPR](/q/qd75/opr)
- [Thông số QD75D4](/q/qd75/parameters)
- [Xử lý sự cố](/q/qd75/troubleshooting)
