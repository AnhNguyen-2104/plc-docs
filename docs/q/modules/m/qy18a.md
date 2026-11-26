---
title: "QY18A — Module ra số"
family: q
module: module-qy18a
status: draft
source: SH-080042
---

<ModulePage id="qy18a" />

## 1. Nhóm tín hiệu cần đấu

QY18A là module 8 điểm tiếp điểm rơ le độc lập 24 VDC 2 A / 240 VAC 2 A. Tiếp điểm khô đóng cắt tải trực tiếp. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Ngõ ra | Y0…Y7 | module → tải | 8 điểm tiếp điểm rơ le độc lập, 24 VDC 2 A / 240 VAC 2 A, 8 A/unit; bảng đầu cực ở SH-080042 §3-4 |
| Cực chung | — | — | không có COM chung; 8 tiếp điểm độc lập, 8 A cho cả module |
| Nguồn tải | 24 VDC 2 A hoặc 240 VAC 2 A | nguồn ngoài → tải | Nguồn tải riêng, có cầu chì |
| Bảo vệ ngoài | cầu chì và bộ triệt xung ngoài | — | Lắp ngoài module, theo loại tải |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** khối đấu dây kiểu vít — 18 điểm đấu vít M3, một dây mỗi điểm (SH-080042 §3.3, p. 3-4).
- Mỗi tiếp điểm độc lập và không phân biệt cực tính; có thể đóng cắt các mạch khác nhau.
- Dây tải đi cách dây tín hiệu và dây động lực còn lại; không bó chung dây tải AC với dây tín hiệu DC.
- Lắp cầu chì ngoài cho đường tải; module không thay thế cầu chì bảo vệ tải.
- Các điểm độc lập: không nối chung cực của các điểm dùng nguồn tải khác nhau.

## 3. Sơ đồ tham chiếu

Dùng [QY10](/q/modules/m/qy10) cho mạch ra tiếp điểm rơ le. Áp dụng phần tiếp điểm khô và bộ triệt xung; không áp dụng cách gom chung 8 A/common vì QY18A có 8 tiếp điểm độc lập.

## 4. Sơ đồ mạch vào/ra của hãng

Hình dưới trích bảng khối đấu dây của hãng cho QY18A tại SH-080042 §3.3 (tr. 3-4): <SourceRef doc="sh080042" page="3-4" />.

<ManualFigure
  src="/img/manual/qy18a-terminals.webp"
  alt="Bảng khối đấu dây QY18A: TB1–TB18 và tên tín hiệu"
  caption="Bảng khối đấu dây của hãng cho QY18A — khối đấu dây kiểu vít"
  doc="SH-080042"
  section="§3.3"
  page="3-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. Đấu nối thiết bị ngoài

- Mỗi tiếp điểm đấu một mạch tải riêng; có thể khác điện áp trong định mức.
- Tải cảm AC hoặc DC: lắp bộ triệt xung ngoài phù hợp (snubber RC hoặc varistor) song song tải theo khuyến cáo nhà sản xuất tải.
- Lắp cầu chì ngoài cho từng mạch tải.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] Không có COM chung; từng tiếp điểm độc lập đấu đúng.
- [ ] Nguồn tải đúng 24 VDC 2 A / 240 VAC 2 A.
- [ ] Đã lắp cầu chì và bộ triệt xung ngoài cho tải.
- [ ] Dòng từng điểm và tổng dòng mỗi common nằm trong định mức 8 A/unit.
- [ ] Đã thử từng điểm bằng tay trước khi chạy tự động.
- [ ] Dây tải đi cách dây tín hiệu và dây động lực còn lại.
- [ ] Không nhồi nhiều dây vào một điểm đấu.
