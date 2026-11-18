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
| Xung lệnh | PULSE F+, F− | QD75 → driver | F = tiến, R = lùi; cặp vi sai, phải đi cùng cặp (SH-080058 §3.4.3 p.3-26) |
| Xung lệnh | PULSE R+, R− | QD75 → driver | F = tiến, R = lùi; cặp vi sai, đảo chiều (SH-080058 §3.4.3 p.3-26) |
| READY / điểm chung | 1A11 READY, 1A12 RDYCOM | driver → QD75 | Cần cho vòng READY (SH-080058 §3.4.3 p.3-27) |
| Tín hiệu zero | 1A9 PG05, 1A10 PG0COM | driver → QD75 | Chỉ dùng cho tín hiệu zero khi OPR (§3.4.3 p.3-26) |
| Cho phép/trạng thái | Tín hiệu trao đổi với driver | hai chiều | Tuỳ driver; tra bảng chân của cả hai thiết bị |

Với QD75D4, mỗi trục có bộ đầu cực riêng. Mỗi cặp F+/F− và R+/R− là cặp vi sai và phải đi cùng cặp.

## 2. Nguyên tắc đi dây

- Tối đa **2 dây trên một điểm đầu cực** của khối đầu cực. Không nhồi thêm dây trung gian.
- Dây xung đi riêng khỏi dây động lực; không bó chung với dây cấp servo.
- Dây tín hiệu dùng loại có vỏ bọc; vỏ bọc nối đất **một đầu** để tránh vòng đất.
- Nguồn 24 V cho tín hiệu và nguồn động lực nên tách nhánh, tách cầu chì.
- Chiều dài cáp xung nên giữ ngắn trong phạm vi cho phép; manual SH-080058 nêu giới hạn cụ thể — đối chiếu trước khi chọn cáp dài.
- Đánh số dây hai đầu và ghi rõ trục để tránh lẫn giữa các trục khi bảo trì.

## 3. Sơ đồ tham chiếu

<WiringDiagram variant="generic" />

<PinMapDiagram variant="generic" />

Sơ đồ nguyên lý: xung vi sai, READY, SON từ PLC, ALM về PLC.

## 4. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trong suốt quá trình đấu dây.
- [ ] Đúng cặp F+/F−, R+/R−, không đảo giữa các trục.
- [ ] READY (1A11) và RDYCOM (1A12) nối đúng driver tương ứng từng trục.
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
