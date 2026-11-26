---
title: "QX90H — Module vào số"
family: q
module: module-qx90h
status: draft
source: SH-080042
---

<ModulePage id="qx90h" />

## 1. Nhóm tín hiệu cần đấu

QX90H là module 16 điểm vào 5 VDC. Module dùng common âm: COM nối 0 V và cảm biến PNP hoặc line driver đẩy từng điểm X lên +5 V. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Ngõ vào | X0…XF | cảm biến/công tắc → module | 16 điểm, 5 VDC; bảng đầu cực ở SH-080042 §2-34 |
| Cực chung | COM | — | COM về 0 V; PNP/line driver đẩy X lên +5 V |
| Nguồn module | 5 VDC từ base | base → module | Lấy từ nguồn 5 V của base; không đấu nguồn ngoài vào đường này |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** khối đấu dây kiểu vít — 18 điểm đấu vít M3, một dây mỗi điểm (SH-080042 §2.25, p. 2-35).
- COM phải về 0 V; đấu ngược cực sẽ không bật được điểm vào.
- Dây tín hiệu đi cách dây động lực ≥100 mm; khi buộc phải bó chung, dùng cáp có vỏ bọc và nối đất vỏ ở phía PLC (SH-080483 §4.8.2 p.111).
- Nguồn cảm biến/công tắc phải nằm trong dải 5 VDC của module, tách nhánh và tách cầu chì khỏi nguồn động lực; không lấy nguồn từ nguồn 5 V của base.
- Không nhồi nhiều dây vào một điểm đấu; giữ một dây cho mỗi điểm X.

## 3. Sơ đồ tham chiếu

Sơ đồ gần nhất là [QX80](/q/modules/m/qx80) — common âm. Áp dụng phần COM nối 0 V, photocoupler và cảm biến PNP/line driver đẩy điểm X lên +5 V. Không áp dụng bảng đầu cực của QX80 cho QX90H; bảng đầu cực riêng ở SH-080042 §2-34.

## 4. Sơ đồ mạch vào/ra của hãng

Sơ đồ đầu cực của hãng cho QX90H nằm trong SH-080042 §2.25: <SourceRef doc="sh080042" page="2-34" />. Hình dưới trích bảng đầu cực tại đúng mục này; sơ đồ mạch vào common dương đã trích nằm ở [QX40](/q/modules/m/qx40), common âm ở [QX80](/q/modules/m/qx80).

<ManualFigure
  src="/img/manual/qx90h-terminals.webp"
  alt="Sơ đồ đầu cực QX90H: khối TB1–TB18 và tên tín hiệu"
  caption="Sơ đồ đầu cực của hãng cho QX90H: khối TB1–TB18 và tên tín hiệu — khối đấu dây kiểu vít"
  doc="SH-080042"
  section="§2.25"
  page="2-35"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. Đấu nối thiết bị ngoài

- Cảm biến PNP hoặc line driver đẩy +5 V vào điểm X; công tắc khô nối giữa +5 V và điểm X; COM về 0 V.
- Kiểm tra điện áp nguồn cảm biến sau khi trừ sụt áp dây, nằm trong dải danh định của module.
- Dùng cặp dây có vỏ bọc cho cảm biến xa; nối vỏ bọc một đầu phía tủ PLC.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] COM về 0 V đấu đúng.
- [ ] Cảm biến đúng loại: PNP hoặc line driver.
- [ ] Điện áp nguồn nằm trong dải danh định 5 VDC của module.
- [ ] Đã thử từng điểm bằng tay trước khi chạy tự động.
- [ ] Dây tín hiệu cách dây động lực ≥100 mm.
- [ ] Vỏ bọc nối đất một đầu, đúng quy định tủ.
- [ ] Không nhồi nhiều dây vào một điểm đấu.
