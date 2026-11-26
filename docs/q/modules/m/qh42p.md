---
title: "QH42P — Module kết hợp vào/ra"
family: q
module: module-qh42p
status: draft
source: SH-080042
---

<ModulePage id="qh42p" />

## 1. Nhóm tín hiệu cần đấu

QH42P là module kết hợp 32 điểm vào 24 VDC và 32 điểm ra transistor sink. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Ngõ vào | X0…X1F | cảm biến/công tắc → module | 32 điểm, 24 VDC; cực chung theo SH-080042 §4-1 |
| Ngõ ra | Y0…Y1F | module → tải | 32 điểm transistor sink, 12–24 VDC (SH-080042 §4-1) |
| Cực chung vào/ra | COM vào, COM ra | — | Hai nhóm chung riêng; không nối chung vào/ra |
| Nguồn module | 5 VDC từ base | base → module | Lấy từ rail 5 V của base |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** đầu nối 40 chân (A20/B20) — hai hàng chân A20/B20, 32 điểm mỗi đầu nối (SH-080042 §4.1, p. 4-3).
- Cực chung ngõ vào theo SH-080042 §4-1; đối chiếu common dương hay âm trước khi đấu cảm biến.
- Ngõ ra là transistor sink: tải nối giữa +V và Y, COM ra về 0 V.
- Không nối chung cực COM vào với COM ra; giữ hai nhóm tách biệt.
- Lắp cầu chì ngoài và diode dập xung cho tải DC; dây tải đi cách dây tín hiệu.
- Không nhồi nhiều dây vào một điểm đấu; giữ một dây cho mỗi điểm X/Y.

## 3. Sơ đồ tham chiếu

- Phần vào: dùng [QX40](/q/modules/m/qx40) nếu cực chung là dương, hoặc [QX80](/q/modules/m/qx80) nếu là âm. Chỉ áp dụng mạch photocoupler và cách chọn cảm biến; không áp dụng bảng đầu cực của hai trang đó.
- Phần ra: dùng [QY40P](/q/modules/m/qy40p) cho transistor sink. Áp dụng COM về 0 V và tải nối giữa +V và Y; không áp dụng định mức dòng của QY40P.
- Bảng đầu cực riêng của QH42P ở SH-080042 §4-1.

## 4. Sơ đồ mạch vào/ra của hãng

Sơ đồ chân của hãng cho QH42P nằm trong SH-080042 §4.1 (tr. 4-3): <SourceRef doc="sh080042" page="4-3" />.

<ManualFigure
  src="/img/manual/qh42p-terminals.webp"
  alt="Sơ đồ chân QH42P: 1B20–2A01, X00–X1F, Y00–Y1F, COM1 và COM2"
  caption="Sơ đồ chân của hãng cho QH42P — đầu nối 40 chân (A20/B20)"
  doc="SH-080042"
  section="§4.1"
  page="4-3"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

Mạch vào mẫu ở [QX40](/q/modules/m/qx40), mạch ra sink ở [QY40P](/q/modules/m/qy40p).

## 5. Đấu nối thiết bị ngoài

- Cảm biến NPN đấu với common dương; cảm biến PNP đấu với common âm — theo đúng cực chung ghi ở §4-1.
- Tải DC nối giữa +V và Y; lắp diode dập xung song song tải, cathode về +V.
- Lắp cầu chì ngoài cho đường tải; kiểm tra dòng từng điểm và tổng dòng mỗi common.
- Dùng cặp dây có vỏ bọc cho cảm biến xa; nối vỏ bọc một đầu phía tủ PLC.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] Cực chung ngõ vào đúng kiểu common của module.
- [ ] Cảm biến đúng loại NPN/PNP theo cực chung.
- [ ] COM vào và COM ra không nối chung.
- [ ] Đã lắp diode dập xung và cầu chì cho tải.
- [ ] Dòng từng điểm và mỗi common nằm trong định mức.
- [ ] Đã thử từng điểm vào và ra bằng tay.
- [ ] Dây tín hiệu cách dây động lực ≥100 mm.
