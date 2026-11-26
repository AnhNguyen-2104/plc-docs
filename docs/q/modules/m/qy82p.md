---
title: "QY82P — Module ra số"
family: q
module: module-qy82p
status: draft
source: SH-080042
---

<ModulePage id="qy82p" />

## 1. Nhóm tín hiệu cần đấu

QY82P là module 64 điểm transistor source 12–24 VDC. Transistor source đẩy dòng ra tải về 0 V. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Ngõ ra | Y0…Y3F | module → tải | 64 điểm transistor source, 12–24 VDC, 0,1 A/điểm, 2 A/common; bảng đầu cực ở SH-080042 §3-24 |
| Cực chung | COM | — | COM về +V; tải nối giữa Y và 0 V |
| Nguồn tải | 12–24 VDC | nguồn ngoài → tải | Nguồn tải riêng, có cầu chì |
| Bảo vệ ngoài | diode dập xung và cầu chì ngoài | — | Lắp ngoài module, theo loại tải |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** đầu nối 40 chân (A20/B20) — hai hàng chân A20/B20, 32 điểm mỗi đầu nối (SH-080042 §3.17, p. 3-24).
- Tải nối giữa Y và 0 V; COM về +V; transistor đẩy Y lên +V.
- Dây tải đi cách dây tín hiệu và dây động lực còn lại; không bó chung dây tải AC với dây tín hiệu DC.
- Lắp cầu chì ngoài cho đường tải; module không thay thế cầu chì bảo vệ tải.
- Không nhồi nhiều dây vào một điểm đấu; giữ một dây cho mỗi điểm Y.

## 3. Sơ đồ tham chiếu

Sơ đồ gần nhất là [QY80](/q/modules/m/qy80) — transistor source. Áp dụng phần COM về +V và tải nối giữa Y và 0 V. Không dùng sơ đồ sink của [QY40P](/q/modules/m/qy40p) cho QY82P; bảng đầu cực riêng ở SH-080042 §3-24.

## 4. Sơ đồ mạch vào/ra của hãng

Hình dưới trích sơ đồ chân của hãng cho QY82P tại SH-080042 §3.17 (tr. 3-24): <SourceRef doc="sh080042" page="3-24" />.

<ManualFigure
  src="/img/manual/qy82p-terminals.webp"
  alt="Sơ đồ chân QY82P: số chân 1B20–2A01 và tên tín hiệu Y00–Y3F"
  caption="Sơ đồ chân của hãng cho QY82P — đầu nối 40 chân (A20/B20)"
  doc="SH-080042"
  section="§3.17"
  page="3-24"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. Đấu nối thiết bị ngoài

- Tải DC nối giữa Y và 0 V; lắp diode dập xung song song tải.
- Lắp cầu chì ngoài; kiểm tra dòng từng điểm và tổng dòng mỗi common.
- Với tải nhỏ, kiểm tra dòng rò khi OFF có thể giữ tải ở trạng thái ON.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] COM về +V đấu đúng.
- [ ] Nguồn tải đúng 12–24 VDC.
- [ ] Đã lắp diode dập xung và cầu chì cho tải.
- [ ] Dòng từng điểm và tổng dòng mỗi common nằm trong định mức 0,1 A/điểm, 2 A/common.
- [ ] Đã thử từng điểm bằng tay trước khi chạy tự động.
- [ ] Dây tải đi cách dây tín hiệu và dây động lực còn lại.
- [ ] Không nhồi nhiều dây vào một điểm đấu.
