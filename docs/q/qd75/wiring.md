---
title: Đấu dây QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

# Đấu dây QD75D4

⚠️ Cắt nguồn toàn bộ tủ điện, xả điện dung, và kiểm tra không còn điện áp trước khi chạm vào đầu cực. Không đấu dây khi module hoặc driver còn cấp điện.

Trang này mô tả nguyên tắc đấu dây; **số chân cụ thể tra bảng trong manual** — manual chính thức SH-080058 (Mitsubishi), chương đấu dây. Không suy đoán số đầu cực từ tên tín hiệu.

## 1. Nhóm tín hiệu cần đấu

QD75D4 dùng ngõ ra vi sai (differential) cho xung điều khiển. Mỗi trục cần tối thiểu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Xung lệnh | PULSE A+, A− | QD75 → driver | Cặp vi sai, phải đi cùng cặp |
| Xung lệnh | PULSE B+, B− | QD75 → driver | Cặp vi sai, lệch pha so với A |
| Tham chiếu | COM (theo trục) | QD75 → driver | Điểm chung của cặp vi sai |
| Cho phép/trạng thái | Tín hiệu trao đổi với driver | hai chiều | Tuỳ driver; tra bảng chân của cả hai thiết bị |

Với QD75D4, mỗi trục có bộ đầu cực riêng. Việc ghép A+/A− và B+/B− thành cặp là bắt buộc để driver nhận đúng xung vi sai.

## 2. Nguyên tắc đi dây

- Tối đa **2 dây trên một điểm đầu cực** của khối đầu cực. Không nhồi thêm dây trung gian.
- Dây xung đi riêng khỏi dây động lực; không bó chung với dây cấp servo.
- Dây tín hiệu dùng loại có vỏ bọc; vỏ bọc nối đất **một đầu** để tránh vòng đất.
- Nguồn 24 V cho tín hiệu và nguồn động lực nên tách nhánh, tách cầu chì.
- Chiều dài cáp xung nên giữ ngắn trong phạm vi cho phép; manual SH-080058 nêu giới hạn cụ thể — đối chiếu trước khi chọn cáp dài.
- Đánh số dây hai đầu và ghi rõ trục để tránh lẫn giữa các trục khi bảo trì.

## 3. Sơ đồ tham chiếu

<img :src="$withBase('/img/qd75/wiring.svg')" width="720" alt="Sơ đồ đấu dây QD75D4 — chờ ảnh">

Hình minh hoạ cách ghép cặp vi sai và điểm chung; chưa thay thế bảng chân trong manual.

## 4. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trong suốt quá trình đấu dây.
- [ ] Đúng cặp A+/A−, B+/B−, không đảo giữa các trục.
- [ ] COM nối đúng driver tương ứng từng trục.
- [ ] Không quá 2 dây trên một điểm đầu cực.
- [ ] Dây xung tách khỏi dây động lực.
- [ ] Vỏ bọc nối đất một đầu, đúng quy định tủ.
- [ ] Đã đối chiếu số chân với bảng trong SH-080058 — chương đấu dây.
- [ ] Công tắc hành trình cứng và nút dừng khẩn đã đấu độc lập với PLC.
- [ ] Đo thông mạch và đo cách điện trước khi cấp điện.

## Đọc tiếp

- [Tín hiệu X/Y của QD75D4](/q/qd75/io-signals)
- [Chạy thử QD75D4](/q/qd75/commissioning)
- [Đấu dây driver servo/step (MR-J4-A, ASDA-B2, Sigma-7, MINAS A6, DM542)](/q/drivers/)
