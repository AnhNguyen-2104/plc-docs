---
title: Khái niệm cơ bản về điều khiển vị trí
family: common
status: draft
---

# Khái niệm cơ bản về điều khiển vị trí

Trang này không gắn với hãng hay model cụ thể. Mục tiêu là thống nhất từ vựng và cách tính trước khi đọc tài liệu của một module thực tế.

## 1. Hai cách ra lệnh chuyển động

| Cách ra lệnh | Bản chất tín hiệu | Điều khiển vị trí | Điều khiển tốc độ |
| --- | --- | --- | --- |
| Xung (pulse train) | Chuỗi xung số, mỗi xung tương ứng một lượng dịch chuyển | Do số xung quyết định | Do tần số xung quyết định |
| Tương tự (analog) | Điện áp ±10 V (hoặc dòng 4–20 mA) | Không trực tiếp; cần vòng kín và encoder phản hồi | Do độ lớn điện áp quyết định |

Với điều khiển bằng xung, bộ điều khiển không cần biết vị trí thực tế để phát lệnh; nó chỉ đếm xung. Sai số vị trí vì thế phụ thuộc vào việc hiệu chuẩn cơ khí và vào việc có xử lý phản hồi hay không.

## 2. Đơn vị và cách quy đổi ra xung

Một trục thường được mô tả bằng các đại lượng cơ khí (mm, độ, inch), trong khi module lại làm việc bằng xung. Cần một hệ số quy đổi rõ ràng.

Các đại lượng đầu vào:

- Số xung mỗi vòng của động cơ/encoder.
- Độ dịch chuyển cơ khí trên mỗi vòng (bước vít me, chu vi puly, tỉ số hộp giảm tốc).
- Hệ số nhân đơn vị (unit magnification) nếu module cho phép khai báo.

Công thức:

```text
pulse/mm = ( số xung mỗi vòng × hệ số nhân đơn vị ) / quãng đường mỗi vòng
```

### Ví dụ minh hoạ, không phải số liệu module

Giả sử (các số dưới đây chỉ để minh hoạ phép tính, không phải thông số của bất kỳ module nào):

- 4096 xung mỗi vòng.
- Hệ số nhân đơn vị = 1.
- Bước vít me 8 mm mỗi vòng.

```text
pulse/mm = (4096 × 1) / 8 = 512 pulse/mm
```

Nghĩa là muốn đi 100 mm cần phát 51 200 xung. Nếu đổi sang đơn vị độ với bàn quay 360°/vòng, cùng số xung đó cho 4096/360 ≈ 11,38 pulse/độ.

## 3. Định vị tuyệt đối và tương đối

| Kiểu | Ý nghĩa toạ độ | Khi nào dùng |
| --- | --- | --- |
| Tuyệt đối (absolute) | Toạ độ tính từ một gốc chuẩn đã xác lập | Bàn máy có gốc cố định, cần quay lại đúng điểm bất kể đang ở đâu |
| Tương đối (relative/incremental) | Quãng đường tính từ vị trí hiện tại | Chạy bước đều, cấp phôi lặp lại, không phụ thuộc gốc |

Định vị tuyệt đối bắt buộc phải có gốc (origin) hợp lệ. Nếu gốc sai, mọi điểm tuyệt đối đều sai theo, trong khi lệnh tương đối vẫn chạy đúng quãng đường nhưng trôi dần theo sai số tích luỹ.

## 4. Gia tốc, giảm tốc và dạng xung vận tốc

Một trục không thể nhảy tức thời từ 0 lên tốc độ chạy. Thời gian gia tốc và giảm tốc quyết định biên dạng vận tốc. Dạng phổ biến là hình thang: tăng tốc tuyến tính, chạy đều, giảm tốc tuyến tính.

```mermaid
flowchart LR
  A[Lệnh khởi động] --> B[Tăng tốc]
  B --> C[Chạy đều]
  C --> D[Giảm tốc]
  D --> E[Trong vùng định vị]
  E --> F[Báo hoàn tất định vị]
```

Các đại lượng cần khai báo:

- Thời gian gia tốc: từ 0 đến tốc độ chạy mất bao lâu.
- Thời gian giảm tốc: từ tốc độ chạy về 0 mất bao lâu.
- Tốc độ giới hạn: trần tốc độ module cho phép, không phụ thuộc lệnh.
- Tốc độ khởi động/giới hạn dưới nếu cơ cấu cần.

Quãng đường tối thiểu để đạt tốc độ chạy trong biên dạng hình thang xấp xỉ:

```text
S_min ≈ v × (t_accel + t_decel) / 2
```

Với v = 200 mm/s, t_accel = 100 ms, t_decel = 100 ms thì S_min ≈ 20 mm. Lệnh ngắn hơn sẽ thành biên dạng tam giác (không đạt tốc độ đặt). Đây là ví dụ minh hoạ phép tính.

## 5. Thời gian dừng (dwell)

Dwell là khoảng giữ nguyên tại điểm đích trước khi thực hiện bước kế tiếp. Dùng khi cần chờ cơ cấu ổn định, chờ kẹp, chờ gia công. Dwell quá ngắn gây rung và sai số; quá dài làm giảm năng suất. Dwell là tham số theo từng bước chạy, không phải tham số trục.

## 6. Khái niệm mã M

Mã M (miscellaneous code) là số hiệu gắn vào một bước chạy để phối hợp với thiết bị ngoài. Module không tự hiểu mã M; nó chỉ xuất mã ra và chờ xác nhận. Trình tự điển hình:

1. Bước chạy bắt đầu và xuất mã M.
2. Chương trình PLC đọc mã, thực hiện hành động tương ứng (kẹp, hàn, phun keo).
3. PLC xác nhận đã xử lý xong.
4. Bước chạy tiếp tục hoặc kết thúc.

Nhờ vậy, logic tuỳ biến nằm ở PLC, còn module giữ vai trò phát xung và quản lý vị trí.

## 7. Bắt tay vị trí và hoàn tất định vị

Hai khái niệm dễ lẫn:

- **Trong vùng định vị (in-position):** trục đã vào một cửa sổ dung sai quanh điểm đích. Tín hiệu này bật sớm hơn, dùng để bắt đầu hành động phụ.
- **Hoàn tất định vị (positioning complete):** bước chạy kết thúc hẳn, không còn xung phát ra, không còn chờ dwell hay mã M.

Chỉ nên dùng "hoàn tất định vị" để chuyển bước tiếp theo nếu bước đó phụ thuộc vị trí chính xác. Dùng "trong vùng định vị" cho hành động không nhạy với dung sai giúp giảm thời gian chu kỳ.

## 8. Ảnh hưởng của chu kỳ quét PLC

Lệnh chạy chỉ được phát khi chương trình PLC xử lý xong logic. Vì thế thời gian quét tạo ra độ trễ giữa sự kiện vật lý và lệnh thực thi.

Ví dụ minh hoạ: chu kỳ quét 10 ms so với 2 ms. Nếu tín hiệu vào xuất hiện ngay sau khi PLC vừa đọc ngõ vào, phải chờ gần trọn một chu kỳ mới được xử lý. Chênh lệch trễ trung bình giữa hai cấu hình khoảng (10 − 2)/2 = 4 ms, chưa tính trễ phát xung của module và trễ cơ khí. Với trục chạy 200 mm/s, 4 ms tương ứng 0,8 mm — đủ lớn để ảnh hưởng điểm dừng nếu dừng bằng phần mềm.

Cách giảm ảnh hưởng:

- Dùng ngõ vào ngắt hoặc tín hiệu dừng phần cứng của module thay vì dừng bằng logic quét.
- Giữ chương trình quét ngắn, tránh vòng lặp nặng.
- Đặt dung sai và vị trí dừng có tính đến độ trễ.

## 9. An toàn

⚠️ Phần mềm không phải lớp bảo vệ cuối cùng.

- Công tắc hành trình cứng phải cắt nguồn hoặc cắt cho phép chạy, độc lập với chương trình.
- Nút dừng khẩn (E-stop) phải tác động trực tiếp lên mạch động lực/servo, không đi qua PLC.
- Giới hạn mềm của module chỉ là lớp bổ sung, không thay thế giới hạn cứng.
- Khi thử nghiệm, chạy không tải, tốc độ thấp, có người quan sát.

## Đọc tiếp

- [MELSEC Q — trung tâm tài liệu](/q/)
- [QD75D4 — module vị trí 4 trục](/q/qd75/)
