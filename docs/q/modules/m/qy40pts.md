---
title: "QY40P-TS — Module ra số"
family: q
module: module-qy40pts
status: draft
source: SH-080042
---

<ModulePage id="qy40pts" />

## 1. Nhóm tín hiệu cần đấu

QY40P-TS là module 16 điểm transistor sink 12–24 VDC. Transistor sink kéo dòng từ tải về 0 V. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Ngõ ra | Y0…YF | module → tải | 16 điểm transistor sink, 12–24 VDC, 0,1 A/điểm, 1,6 A/common; bảng đầu cực ở SH-080042 §3-8 |
| Cực chung | COM | — | COM về 0 V; tải nối giữa +V và Y |
| Nguồn tải | 12–24 VDC | nguồn ngoài → tải | Nguồn tải riêng, có cầu chì |
| Bảo vệ ngoài | diode dập xung và cầu chì ngoài | — | Lắp ngoài module, theo loại tải |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** khối đấu dây lò xo (-TS) — 18 điểm đấu lò xo, một dây mỗi điểm (SH-080042 §3.6, p. 3-9).
- Tải nối giữa +V và Y; COM về 0 V; transistor kéo Y về 0 V.
- Dây tải đi cách dây tín hiệu và dây động lực còn lại; không bó chung dây tải AC với dây tín hiệu DC.
- Lắp cầu chì ngoài cho đường tải; module không thay thế cầu chì bảo vệ tải.
- Không nhồi nhiều dây vào một điểm đấu; giữ một dây cho mỗi điểm Y.

## 3. Sơ đồ tham chiếu

Sơ đồ gần nhất là [QY40P](/q/modules/m/qy40p) — transistor sink. Áp dụng phần COM về 0 V và tải nối giữa +V và Y; không áp dụng bảng đầu cực TB1–TB18 và định mức dòng của QY40P cho QY40P-TS; bảng đầu cực riêng ở SH-080042 §3-8.

## 4. Sơ đồ mạch vào/ra của hãng

Hình dưới trích bảng khối đấu dây của hãng cho QY40P-TS tại SH-080042 §3.6 (tr. 3-9): <SourceRef doc="sh080042" page="3-9" />.

<ManualFigure
  src="/img/manual/qy40pts-terminals.webp"
  alt="Bảng khối đấu dây QY40P-TS: TB1–TB18 và tên tín hiệu"
  caption="Bảng khối đấu dây của hãng cho QY40P-TS — khối đấu dây lò xo (-TS)"
  doc="SH-080042"
  section="§3.6"
  page="3-9"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. Đấu nối thiết bị ngoài

- Tải DC nối giữa +V và Y; lắp diode dập xung song song tải, cathode về +V.
- Lắp cầu chì ngoài; kiểm tra dòng từng điểm và tổng dòng mỗi common.
- Với tải nhỏ, kiểm tra dòng rò khi OFF có thể giữ tải ở trạng thái ON.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] COM về 0 V đấu đúng.
- [ ] Nguồn tải đúng 12–24 VDC.
- [ ] Đã lắp diode dập xung và cầu chì cho tải.
- [ ] Dòng từng điểm và tổng dòng mỗi common nằm trong định mức 0,1 A/điểm, 1,6 A/common.
- [ ] Đã thử từng điểm bằng tay trước khi chạy tự động.
- [ ] Dây tải đi cách dây tín hiệu và dây động lực còn lại.
- [ ] Không nhồi nhiều dây vào một điểm đấu.
