---
title: "QY41H — Module ra số"
family: q
module: module-qy41h
status: draft
source: SH-080042
---

<ModulePage id="qy41h" />

## 1. Nhóm tín hiệu cần đấu

QY41H là module 32 điểm transistor sink 5–24 VDC. Transistor sink kéo dòng từ tải về 0 V. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Ngõ ra | Y0…Y1F | module → tải | 32 điểm transistor sink, 5–24 VDC, 0,2 A/điểm, 2 A/common; bảng đầu cực ở SH-080042 §3-10 |
| Cực chung | COM | — | COM về 0 V; tải nối giữa +V và Y |
| Nguồn tải | 5–24 VDC | nguồn ngoài → tải | Nguồn tải riêng, có cầu chì |
| Bảo vệ ngoài | diode dập xung và cầu chì ngoài | — | Lắp ngoài module, theo loại tải |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** đầu nối 40 chân (A20/B20) — hai hàng chân A20/B20, 32 điểm mỗi đầu nối (SH-080042 §3.7, p. 3-10).
- Tải nối giữa +V và Y; COM về 0 V; transistor kéo Y về 0 V.
- Dây tải đi cách dây tín hiệu và dây động lực còn lại; không bó chung dây tải AC với dây tín hiệu DC.
- Lắp cầu chì ngoài cho đường tải; module không thay thế cầu chì bảo vệ tải.
- Không nhồi nhiều dây vào một điểm đấu; giữ một dây cho mỗi điểm Y.

## 3. Sơ đồ tham chiếu

Sơ đồ gần nhất là [QY40P](/q/modules/m/qy40p) — transistor sink. Áp dụng phần COM về 0 V và tải nối giữa +V và Y; không áp dụng bảng đầu cực TB1–TB18 và định mức dòng của QY40P cho QY41H; bảng đầu cực riêng ở SH-080042 §3-10.

## 4. Sơ đồ mạch vào/ra của hãng

Hình dưới trích sơ đồ chân của hãng cho QY41H tại SH-080042 §3.7 (tr. 3-10): <SourceRef doc="sh080042" page="3-10" />.

<ManualFigure
  src="/img/manual/qy41h-terminals.webp"
  alt="Sơ đồ chân QY41H: số chân B20–A01 và tên tín hiệu Y00–Y1F"
  caption="Sơ đồ chân của hãng cho QY41H — đầu nối 40 chân (A20/B20)"
  doc="SH-080042"
  section="§3.7"
  page="3-10"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. Đấu nối thiết bị ngoài

- Tải DC nối giữa +V và Y; lắp diode dập xung song song tải, cathode về +V.
- Lắp cầu chì ngoài; kiểm tra dòng từng điểm và tổng dòng mỗi common.
- Với tải nhỏ, kiểm tra dòng rò khi OFF có thể giữ tải ở trạng thái ON.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] COM về 0 V đấu đúng.
- [ ] Nguồn tải đúng 5–24 VDC.
- [ ] Đã lắp diode dập xung và cầu chì cho tải.
- [ ] Dòng từng điểm và tổng dòng mỗi common nằm trong định mức 0,2 A/điểm, 2 A/common.
- [ ] Đã thử từng điểm bằng tay trước khi chạy tự động.
- [ ] Dây tải đi cách dây tín hiệu và dây động lực còn lại.
- [ ] Không nhồi nhiều dây vào một điểm đấu.
