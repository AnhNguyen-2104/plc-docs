---
title: "QX10-TS — Module vào số"
family: q
module: module-qx10ts
status: draft
source: SH-080042
---

<ModulePage id="qx10ts" />

## 1. Nhóm tín hiệu cần đấu

QX10-TS là module 16 điểm vào 100–120 VAC. Module ngõ vào xoay chiều, không phân biệt cực tính nguồn; một cực COM dùng chung cho cả nhóm. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Ngõ vào | X0…XF | cảm biến/công tắc → module | 16 điểm, 100–120 VAC; bảng đầu cực ở SH-080042 §2-2 |
| Cực chung | COM | — | Một COM chung; đấu theo điện áp AC danh định |
| Nguồn module | 5 VDC từ base | base → module | Lấy từ nguồn 5 V của base; không đấu nguồn ngoài vào đường này |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** khối đấu dây lò xo (-TS) — 18 điểm đấu lò xo, một dây mỗi điểm (SH-080042 §2.2, p. 2-2).
- COM là cực chung của nhóm AC; không nối COM vào cực dương hay 0 V của nguồn DC.
- Dây tín hiệu đi cách dây động lực ≥100 mm; khi buộc phải bó chung, dùng cáp có vỏ bọc và nối đất vỏ ở phía PLC (SH-080483 §4.8.2 p.111).
- Cảm biến hoặc công tắc phải có định mức đúng điện áp AC của module; cấp từ cùng nhánh AC với cầu chì riêng; không đấu cảm biến DC vào ngõ vào AC.
- Không nhồi nhiều dây vào một điểm đấu; giữ một dây cho mỗi điểm X.

## 3. Sơ đồ tham chiếu

Không có sơ đồ DC tương ứng. [QX40](/q/modules/m/qx40) và [QX80](/q/modules/m/qx80) chỉ dùng để đối chiếu cách ly photocoupler; không áp dụng chiều cực hay bảng đầu cực DC. Mạch vào AC của QX10-TS ở SH-080042 §2-2.

## 4. Sơ đồ mạch vào/ra của hãng

Sơ đồ đầu cực của hãng cho QX10-TS nằm trong SH-080042 §2.2: <SourceRef doc="sh080042" page="2-2" />. Hình dưới trích bảng đầu cực tại đúng mục này; sơ đồ mạch vào common dương đã trích nằm ở [QX40](/q/modules/m/qx40), common âm ở [QX80](/q/modules/m/qx80).

<ManualFigure
  src="/img/manual/qx10ts-terminals.webp"
  alt="Sơ đồ đầu cực QX10-TS: khối TB1–TB18 và tên tín hiệu"
  caption="Sơ đồ đầu cực của hãng cho QX10-TS: khối TB1–TB18 và tên tín hiệu — khối đấu dây lò xo (-TS)"
  doc="SH-080042"
  section="§2.2"
  page="2-2"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. Đấu nối thiết bị ngoài

- Dùng công tắc khô hoặc cảm biến AC đúng điện áp danh định; không đấu cảm biến DC vào ngõ vào AC.
- Kiểm tra dòng rò của cảm biến hai dây để tránh giữ ngõ vào ở mức ON khi chưa tác động.
- Dây AC đi riêng khỏi dây tín hiệu DC và dây động lực khác.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] COM và điện áp AC đúng danh định đấu đúng.
- [ ] Cảm biến đúng loại: công tắc khô hoặc cảm biến AC.
- [ ] Điện áp nguồn nằm trong dải danh định 100–120 VAC của module.
- [ ] Đã thử từng điểm bằng tay trước khi chạy tự động.
- [ ] Dây tín hiệu cách dây động lực ≥100 mm.
- [ ] Vỏ bọc nối đất một đầu, đúng quy định tủ.
- [ ] Không nhồi nhiều dây vào một điểm đấu.
