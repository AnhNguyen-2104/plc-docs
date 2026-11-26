---
title: "QX70H — Module vào số"
family: q
module: module-qx70h
status: draft
source: SH-080042
---

<ModulePage id="qx70h" />

## 1. Nhóm tín hiệu cần đấu

QX70H là module 16 điểm vào 5 VDC. Module dùng common dương: COM nối +5 V và cảm biến NPN kéo từng điểm X về 0 V. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Ngõ vào | X0…XF | cảm biến/công tắc → module | 16 điểm, 5 VDC; bảng đầu cực ở SH-080042 §2-19 |
| Cực chung | COM | — | COM về +5 V; NPN kéo X về 0 V |
| Nguồn module | 5 VDC từ base | base → module | Lấy từ nguồn 5 V của base; không đấu nguồn ngoài vào đường này |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** khối đấu dây kiểu vít — 18 điểm đấu vít M3, một dây mỗi điểm (SH-080042 §2.15, p. 2-20).
- COM phải về +5 V; đấu ngược cực sẽ không bật được điểm vào.
- Dây tín hiệu đi cách dây động lực ≥100 mm; khi buộc phải bó chung, dùng cáp có vỏ bọc và nối đất vỏ ở phía PLC (SH-080483 §4.8.2 p.111).
- Nguồn cảm biến/công tắc phải nằm trong dải 5 VDC của module, tách nhánh và tách cầu chì khỏi nguồn động lực; không lấy nguồn từ nguồn 5 V của base.
- Không nhồi nhiều dây vào một điểm đấu; giữ một dây cho mỗi điểm X.

## 3. Sơ đồ tham chiếu

Sơ đồ gần nhất là [QX40](/q/modules/m/qx40) — common dương. Áp dụng phần COM nối +5 V, photocoupler và cảm biến NPN kéo điểm X về 0 V. Không áp dụng bảng đầu cực TB1–TB18 của QX40 cho QX70H; bảng đầu cực riêng ở SH-080042 §2-19.

## 4. Sơ đồ mạch vào/ra của hãng

Sơ đồ đầu cực của hãng cho QX70H nằm trong SH-080042 §2.15: <SourceRef doc="sh080042" page="2-19" />. Hình dưới trích bảng đầu cực tại đúng mục này; sơ đồ mạch vào common dương đã trích nằm ở [QX40](/q/modules/m/qx40), common âm ở [QX80](/q/modules/m/qx80).

<ManualFigure
  src="/img/manual/qx70h-terminals.webp"
  alt="Sơ đồ đầu cực QX70H: khối TB1–TB18 và tên tín hiệu"
  caption="Sơ đồ đầu cực của hãng cho QX70H: khối TB1–TB18 và tên tín hiệu — khối đấu dây kiểu vít"
  doc="SH-080042"
  section="§2.15"
  page="2-20"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. Đấu nối thiết bị ngoài

- Cảm biến NPN hở collector hoặc công tắc khô nối giữa điểm X và 0 V; COM về +5 V.
- Kiểm tra điện áp nguồn cảm biến sau khi trừ sụt áp dây, nằm trong dải danh định của module.
- Dùng cặp dây có vỏ bọc cho cảm biến xa; nối vỏ bọc một đầu phía tủ PLC.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] COM về +5 V đấu đúng.
- [ ] Cảm biến đúng loại: NPN.
- [ ] Điện áp nguồn nằm trong dải danh định 5 VDC của module.
- [ ] Đã thử từng điểm bằng tay trước khi chạy tự động.
- [ ] Dây tín hiệu cách dây động lực ≥100 mm.
- [ ] Vỏ bọc nối đất một đầu, đúng quy định tủ.
- [ ] Không nhồi nhiều dây vào một điểm đấu.
