---
title: "QY68A — Module ra số"
family: q
module: module-qy68a
status: draft
source: SH-080042
---

<ModulePage id="qy68a" />

## 1. Nhóm tín hiệu cần đấu

QY68A là module 8 điểm transistor sink/source độc lập 5–24 VDC. Từng điểm tự chọn sink hoặc source. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Ngõ ra | Y0…Y7 | module → tải | 8 điểm transistor sink/source độc lập, 5–24 VDC, 2 A/điểm, 8 A/unit; bảng đầu cực ở SH-080042 §3-15 |
| Cực chung | — | — | không có COM chung; từng điểm chọn sink hoặc source |
| Nguồn tải | 5–24 VDC | nguồn ngoài → tải | Nguồn tải riêng, có cầu chì |
| Bảo vệ ngoài | diode và cầu chì theo từng điểm | — | Lắp ngoài module, theo loại tải |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** khối đấu dây kiểu vít — 18 điểm đấu vít M3, một dây mỗi điểm (SH-080042 §3.11, p. 3-15).
- Mỗi điểm tự chọn sink hoặc source; giữ đúng chiều đã chọn cho từng điểm.
- Dây tải đi cách dây tín hiệu và dây động lực còn lại; không bó chung dây tải AC với dây tín hiệu DC.
- Lắp cầu chì ngoài cho đường tải; module không thay thế cầu chì bảo vệ tải.
- Các điểm độc lập: không nối chung cực của các điểm dùng nguồn tải khác nhau.

## 3. Sơ đồ tham chiếu

Dùng [QY40P](/q/modules/m/qy40p) cho cách đấu sink và [QY80](/q/modules/m/qy80) cho cách đấu source. Mỗi điểm của QY68A chọn một trong hai chiều; không áp dụng cực chung của hai trang đó. Bảng đầu cực ở SH-080042 §3-15.

## 4. Sơ đồ mạch vào/ra của hãng

Hình dưới trích bảng khối đấu dây của hãng cho QY68A tại SH-080042 §3.11 (tr. 3-15): <SourceRef doc="sh080042" page="3-15" />.

<ManualFigure
  src="/img/manual/qy68a-terminals.webp"
  alt="Bảng khối đấu dây QY68A: TB1–TB18, Y00–Y07 và các điểm dự phòng"
  caption="Bảng khối đấu dây của hãng cho QY68A — khối đấu dây kiểu vít"
  doc="SH-080042"
  section="§3.11"
  page="3-15"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. Đấu nối thiết bị ngoài

- Mỗi điểm đấu theo chiều sink hoặc source đã chọn; lắp diode dập xung đúng chiều.
- Lắp cầu chì ngoài cho từng điểm hoặc từng nhóm tải.
- Không nối chung cực của các điểm dùng nguồn tải khác nhau.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] Không có COM chung; từng điểm đã chọn sink/source đấu đúng.
- [ ] Nguồn tải đúng 5–24 VDC.
- [ ] Đã lắp diode dập xung và cầu chì cho tải.
- [ ] Dòng từng điểm và tổng dòng mỗi common nằm trong định mức 2 A/điểm, 8 A/unit.
- [ ] Đã thử từng điểm bằng tay trước khi chạy tự động.
- [ ] Dây tải đi cách dây tín hiệu và dây động lực còn lại.
- [ ] Không nhồi nhiều dây vào một điểm đấu.
