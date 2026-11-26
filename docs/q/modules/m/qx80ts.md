---
title: "QX80-TS — Module vào số"
family: q
module: module-qx80ts
status: draft
source: SH-080042
---

<ModulePage id="qx80ts" />

## 1. Nhóm tín hiệu cần đấu

QX80-TS là module 16 điểm vào 24 VDC. Module dùng common âm: COM nối 0 V và cảm biến PNP đẩy từng điểm X lên +24 V. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Ngõ vào | X0…XF | cảm biến/công tắc → module | 16 điểm, 24 VDC; bảng đầu cực ở SH-080042 §2-25 |
| Cực chung | COM | — | COM về 0 V; PNP đẩy X lên +24 V |
| Nguồn module | 5 VDC từ base | base → module | Lấy từ nguồn 5 V của base; không đấu nguồn 24 V vào đường này |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** khối đấu dây lò xo (-TS) — 18 điểm đấu lò xo, một dây mỗi điểm (SH-080042 §2.19, p. 2-25).
- COM phải về 0 V; đấu ngược cực sẽ không bật được điểm vào.
- Dây tín hiệu đi cách dây động lực ≥100 mm; khi buộc phải bó chung, dùng cáp có vỏ bọc và nối đất vỏ ở phía PLC (SH-080483 §4.8.2 p.111).
- Nguồn 24 VDC cho cảm biến tách nhánh và tách cầu chì khỏi nguồn động lực; không lấy nguồn từ nguồn 5 V của base.
- Không nhồi nhiều dây vào một điểm đấu; giữ một dây cho mỗi điểm X.

## 3. Sơ đồ tham chiếu

Sơ đồ gần nhất là [QX80](/q/modules/m/qx80) — common âm. Áp dụng phần COM nối 0 V, photocoupler và cảm biến PNP đẩy điểm X lên +24 V. Không áp dụng bảng đầu cực và mức 24 VDC của QX80 cho QX80-TS; bảng đầu cực riêng ở SH-080042 §2-25.

## 4. Sơ đồ mạch vào/ra của hãng

Sơ đồ đầu cực của hãng cho QX80-TS nằm trong SH-080042 §2.19: <SourceRef doc="sh080042" page="2-25" />. Hình dưới trích bảng đầu cực tại đúng mục này; sơ đồ mạch vào common dương đã trích nằm ở [QX40](/q/modules/m/qx40), common âm ở [QX80](/q/modules/m/qx80).

<ManualFigure
  src="/img/manual/qx80ts-terminals.webp"
  alt="Sơ đồ đầu cực QX80-TS: khối TB1–TB18 và tên tín hiệu"
  caption="Sơ đồ đầu cực của hãng cho QX80-TS: khối TB1–TB18 và tên tín hiệu — khối đấu dây lò xo (-TS)"
  doc="SH-080042"
  section="§2.19"
  page="2-25"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. Đấu nối thiết bị ngoài

- Cảm biến PNP hở collector hoặc công tắc khô nối giữa +24 V và điểm X; COM về 0 V.
- Kiểm tra điện áp nguồn cảm biến sau khi trừ sụt áp dây, nằm trong dải danh định của module.
- Dùng cặp dây có vỏ bọc cho cảm biến xa; nối vỏ bọc một đầu phía tủ PLC.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] COM về 0 V đấu đúng.
- [ ] Cảm biến đúng loại: PNP.
- [ ] Điện áp nguồn nằm trong dải danh định 24 VDC của module.
- [ ] Đã thử từng điểm bằng tay trước khi chạy tự động.
- [ ] Dây tín hiệu cách dây động lực ≥100 mm.
- [ ] Vỏ bọc nối đất một đầu, đúng quy định tủ.
- [ ] Không nhồi nhiều dây vào một điểm đấu.
