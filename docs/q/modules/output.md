---
title: Module ra số MELSEC Q (17 model)
family: q
module: q-series
status: draft
source: SH-080042
---

# Module ra số MELSEC Q (17 model)

Trang này tách riêng 17 module ngõ ra số của dòng MELSEC Q được tài liệu hoá trong SH-080042, gồm các model QY…. QY40P được giữ làm module tham chiếu để đi sâu sơ đồ chân và thông số đầy đủ; các model còn lại dùng bảng danh mục phía dưới. Cách chọn kiểu ra sink/source theo tải nằm ở [Đấu dây vào/ra](/q/system/io-wiring).

## 1. Sơ đồ chân QY40P

Bảng khối đấu dây TB1–TB18 của QY40P:

<ManualFigure
  src="/img/manual/qy40p-terminals.jpg"
  alt="Bảng khối đấu dây QY40P: TB1 đến TB18, Y0 đến YF, TB17 12/24 VDC và TB18 COM"
  caption="Khối đấu dây QY40P: TB1–TB16 cho Y0–YF, TB17 12/24 VDC, TB18 COM"
  doc="SH-080042"
  section="§3.5"
  page="3-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

| Chân | Tín hiệu | Chức năng | Nguồn |
| --- | --- | --- | --- |
| TB1–TB16 | Y0–YF | 16 điểm ra transistor | SH-080042 §3.5 p.3-7 |
| TB17 | 12/24 VDC | Cấp nguồn cho tầng ra | SH-080042 §3.5 p.3-7 |
| TB18 | COM | Cực chung (0 V) cho 16 điểm | SH-080042 §3.5 p.3-7 |

QY40P gom 16 điểm vào một cực `COM` duy nhất (TB18); module không có `COM0`/`COM1` chia nhóm như một số module 32/64 điểm. Với kiểu sink, tải đấu giữa `+12/24 V` (TB17) và từng điểm Y, còn `COM` về 0 V.

## 2. Danh mục 17 module ra số

<IoCatalog kind="output" />

Mọi dòng trong danh mục đều mang số trang manual; một model chỉ bị đánh dấu "dự kiến" nếu không trích được một thông số đơn lẻ kiểm chứng được (hiện tại không có).

## 3. Mạch ra của hãng

Sơ đồ chính thức của hãng cho mạch ra rơ-le QY10: tiếp điểm, tải và bộ triệt xung ngoài.

<ManualFigure
  src="/img/manual/qy10-output-circuit.jpg"
  alt="Mạch ra rơ-le QY10: tiếp điểm, tải xoay chiều và bộ triệt xung"
  caption="Mạch ra QY10: tiếp điểm rơ-le, tải"
  doc="SH-080042"
  section="§3.1"
  page="3-1"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

Sơ đồ chính thức của hãng cho mạch ra transistor QY40P: transistor sink, diode zener và cầu chì ngoài.

<ManualFigure
  src="/img/manual/qy40p-output-circuit.jpg"
  alt="Mạch ra transistor QY40P kiểu sink: zener, tải và cầu chì"
  caption="Mạch ra QY40P: transistor sink, zener"
  doc="SH-080042"
  section="§3.5"
  page="3-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 4. Thông số QY40P

| Hạng mục | Giá trị | Nguồn |
| --- | --- | --- |
| Số điểm ra | 16 điểm | SH-080042 §3.5 p.3-7 |
| Điện áp tải định mức | 12–24 VDC (+20/−15 %) | SH-080042 §3.5 p.3-7 |
| Dòng tải tối đa | 0,1 A/điểm, 1,6 A/common | SH-080042 §3.5 p.3-7 |
| Dòng xung tối đa | 0,7 A trong 10 ms | SH-080042 §3.5 p.3-7 |
| Dòng rò khi OFF | ≤ 0,1 mA | SH-080042 §3.5 p.3-7 |
| Sụt áp khi ON | 0,1 V (TYP.) tại 0,1 A; 0,2 V (MAX.) tại 0,1 A | SH-080042 §3.5 p.3-7 |
| Thời gian đáp ứng | ≤ 1 ms (OFF→ON và ON→OFF, tải trở) | SH-080042 §3.5 p.3-7 |
| Bảo vệ | Quá tải và quá nhiệt | SH-080042 §3.5 p.3-7 |
| Số điểm chiếm dụng | 16 điểm (khai báo 16-point output) | SH-080042 §3.5 p.3-7 |
| Dòng tiêu thụ 5 VDC | 65 mA (TYP., toàn bộ điểm ON) | SH-080042 §3.5 p.3-7 |

Dòng rò 0,1 mA là con số cần nhớ khi đóng tải nhỏ: nó đủ để giữ rơ le 24 V công suất bé ở trạng thái nhả chậm hoặc không nhả, nên với tải nhạy phải kiểm tra cùng nhà sản xuất tải.

> **Lưu ý về định mức 0,5 A/điểm.** Manual QY40P trên đĩa ghi 0,1 A/điểm và 1,6 A/common, không có định mức 0,5 A/điểm cho QY40P. Con số 0,5 A/điểm thuộc ngõ ra coincidence của QD62 (12/24 VDC, 0,5 A/điểm, 2 A/common — SH-080036 §3.1 p.3-2), không phải module ngõ ra transistor.

## 5. Nguồn

- QY40P: <SourceRef doc="sh080042" page="3.5" />, terminal block và thông số trong cùng mục.
- QY10: <SourceRef doc="sh080042" page="3.1" />.
- Vị trí khe, dòng tiêu thụ hệ thống và giới hạn base: <SourceRef doc="sh080483" page="8.3" />.

Sơ đồ mạch đấu dây thực tế (tải, diode dập xung, nguồn tải) nằm ở [Đấu dây vào/ra](/q/system/io-wiring).
