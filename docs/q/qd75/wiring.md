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
| Ngõ vào chức năng | DOG, FLS, RLS, STOP, CHG | driver/công tắc → QD75 | 1A3 DOG (gốc), 1A1 FLS, 1A2 RLS, 1A4 STOP, 1A5 CHG (SH-080058 §3.4.4 p.3-28) |
| Ngõ vào chức năng | COM (chung nhóm vào) | — | 1A6, 1A7 — chung cho cả nhóm ngõ vào chức năng (SH-080058 §3.4.4 p.3-28) |
| Ngõ vào chức năng | CLEAR, CLEAR COM | QD75 → driver | 1A13, 1A14 — chỉ đấu khi cần xoá lệch vị trí (SH-080058 §3.4.3 p.3-27) |
| Xung lệnh | PULSE COM (`*2`) | QD75 → driver | Chung của cặp vi sai, nối 0 V/đất; manual in ký hiệu `*2`, không phải số đầu cực (SH-080058 §3.4.3 p.3-26) |
| READY / điểm chung | 1A11 READY, 1A12 RDYCOM | driver → QD75 | Cần cho vòng READY (SH-080058 §3.4.3 p.3-27) |
| Tín hiệu zero | 1A9 PG05, 1A10 PG0COM | driver → QD75 | Chỉ dùng cho tín hiệu zero khi OPR (§3.4.3 p.3-26) |
| Cho phép/trạng thái | Tín hiệu trao đổi với driver | hai chiều | Tuỳ driver; tra bảng chân của cả hai thiết bị |

FLS/RLS là giới hạn phần mềm của QD75 — không đấu thì phải vô hiệu bằng thông số (Pr.13/Pr.14 và các tham số giới hạn liên quan), tuyệt đối không để hở dây rồi coi là đã an toàn. DOG chỉ cần khi OPR kiểu dùng dog; STOP và CHG dùng cho dừng khẩn/chuyển mạch tốc độ, đấu theo yêu cầu của máy.

Ký hiệu *2: số đầu cực đổi theo trục — trục 1 dùng 1Axx, trục 2 dùng 1Bxx, trục 3 dùng 2Axx, trục 4 dùng 2Bxx; các số trên bảng là của trục 1.

Với QD75D4, mỗi trục có bộ đầu cực riêng. Mỗi cặp F+/F− và R+/R− là cặp vi sai và phải đi cùng cặp. Các đầu cực 1A19/1B19/1A20/1B20 là ngõ vào PULSER (manual pulse generator), không phải chung của cặp xung lệnh.

## 2. Nguyên tắc đi dây

- Tối đa **2 dây trên một điểm đầu cực** của khối đầu cực. Không nhồi thêm dây trung gian.
- Dây xung đi riêng khỏi dây động lực; không bó chung với dây cấp servo.
- Dây tín hiệu dùng loại có vỏ bọc; vỏ bọc nối đất **một đầu** để tránh vòng đất.
- Nguồn 24 V cho tín hiệu và nguồn động lực nên tách nhánh, tách cầu chì.
- Chiều dài cáp xung nên giữ ngắn trong phạm vi cho phép; manual SH-080058 nêu giới hạn cụ thể — đối chiếu trước khi chọn cáp dài.
- Đánh số dây hai đầu và ghi rõ trục để tránh lẫn giữa các trục khi bảo trì.

## 3. Sơ đồ tham chiếu

<WiringDiagram variant="generic" />

Bố trí chân chính thức của hãng cho connector ngoại vi QD75D4 (bốn trục AX1–AX4, hai connector trái/phải) — đối chiếu số chân trước khi bấm dây:

<ManualFigure
  src="/img/manual/qd75-wiring.jpg"
  alt="Bố trí chân connector ngoại vi QD75D4, bốn trục AX1 đến AX4"
  caption="Bố trí chân connector ngoại vi QD75D4: bốn trục, connector trái và phải"
  doc="SH-080058"
  section="§3.4.2"
  page="3-25"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080058/sh080058v.pdf"
/>

## 4. Sơ đồ mạch vào/ra của hãng

Mạch vào và mạch ra vi sai bên trong module, vẽ theo đúng tài liệu gốc; dùng để kiểm tra chiều dòng và vị trí điện trở trước khi đấu dây ngoài:

<ManualFigure
  src="/img/manual/qd75-input-circuit.jpg"
  alt="Mạch vào QD75: photocoupler, điện trở và các tín hiệu DOG, FLS, RLS, STOP, CHG"
  caption="Mạch vào: photocoupler và trở hạn dòng cho DOG, FLS, RLS, STOP, CHG, PULSER"
  doc="SH-080058"
  section="§3.4.4"
  page="3-28"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080058/sh080058v.pdf"
/>

<ManualFigure
  src="/img/manual/qd75-output-circuit.jpg"
  alt="Mạch ra vi sai QD75D: PULSE F, PULSE R, CLEAR và các cặp dấu"
  caption="Mạch ra vi sai: PULSE F+/F−, PULSE R+/R−, CLEAR — bản QD75D"
  doc="SH-080058"
  section="§3.4.4"
  page="3-30"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080058/sh080058v.pdf"
/>

## 5. Checklist trước khi cấp điện

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
