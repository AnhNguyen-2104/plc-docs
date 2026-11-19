---
title: Module vào số MELSEC Q (26 model)
family: q
module: q-series
status: draft
source: SH-080042
---

# Module vào số MELSEC Q (26 model)

Trang này tách riêng 26 module ngõ vào số của dòng MELSEC Q được tài liệu hoá trong SH-080042, gồm các model QX… và QI60. QX40 được giữ làm module tham chiếu để đi sâu sơ đồ chân và thông số đầy đủ; các model còn lại dùng bảng danh mục phía dưới. Quyết định common dương hay common âm thuộc về cách đấu dây, xem [Đấu dây vào/ra](/q/system/io-wiring).

## 1. Sơ đồ chân QX40

Bảng khối đấu dây TB1–TB18 do hãng công bố:

<ManualFigure
  src="/img/manual/qx40-terminals.jpg"
  alt="Bảng khối đấu dây QX40: TB1 đến TB18, X0 đến XF và COM"
  caption="Khối đấu dây QX40: TB1–TB16 cho X0–XF, TB17 là COM"
  doc="SH-080042"
  section="§2.4"
  page="2-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

Khối đấu dây QX40 đi theo thứ tự TB1–TB16 cho X0–XF, TB17 là `COM` chung cho cả 16 điểm, TB18 để trống. Số hiệu X/Y của MELSEC Q dùng hệ hex, nên sau X9 là XA và điểm cuối của module 16 điểm là XF.

| Chân | Tín hiệu | Chức năng | Nguồn |
| --- | --- | --- | --- |
| TB1–TB8 | X0–X7 | 8 điểm vào đầu tiên | SH-080042 §2.4 p.2-4 |
| TB9–TB16 | X8–XF | 8 điểm vào còn lại | SH-080042 §2.4 p.2-4 |
| TB17 | COM | Cực chung cho 16 điểm (cực dương) | SH-080042 §2.4 p.2-4 |
| TB18 | — | Không dùng (Vacant) | SH-080042 §2.4 p.2-4 |

Vì là common dương, `COM` được nối về **+24 V** và công tắc nối từng điểm X về **0 V**; đấu ngược cực sẽ không bật được điểm vào. Cách chọn common dương/âm theo loại cảm biến nằm ở [Đấu dây vào/ra](/q/system/io-wiring).

## 2. Danh mục 26 module vào số

<IoCatalog kind="input" />

Mọi dòng trong danh mục đều mang số trang manual; một model chỉ bị đánh dấu "dự kiến" nếu không trích được một thông số đơn lẻ kiểm chứng được (hiện tại không có).

## 3. Mạch vào của hãng

Sơ đồ chính thức của hãng cho mạch vào QX40 (common dương):

<ManualFigure
  src="/img/manual/qx40-input-circuit.jpg"
  alt="Mạch vào QX40 common dương: photocoupler, điện trở 4,7 kΩ"
  caption="Mạch vào QX40: photocoupler, COM dương"
  doc="SH-080042"
  section="§2.4"
  page="2-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

Sơ đồ chính thức của hãng cho mạch vào QX80 (common âm):

<ManualFigure
  src="/img/manual/qx80-input-circuit.jpg"
  alt="Mạch vào QX80 common âm: photocoupler và COM nối 0 V"
  caption="Mạch vào QX80: photocoupler, COM âm"
  doc="SH-080042"
  section="§2.18"
  page="2-24"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

Hai sơ đồ chỉ khác nhau ở cực `COM`; photocoupler và trở hạn dòng giống nhau. Chọn QX40 khi cảm biến NPN kéo về 0 V, chọn QX80 khi cảm biến PNP đẩy từ +24 V.

## 4. Thông số QX40

| Hạng mục | Giá trị | Nguồn |
| --- | --- | --- |
| Số điểm vào | 16 điểm | SH-080042 §2.4 p.2-4 |
| Điện áp vào định mức | 24 VDC (+20/−15 %, ripple ≤ 5 %) | SH-080042 §2.4 p.2-4 |
| Dòng vào định mức | khoảng 4 mA | SH-080042 §2.4 p.2-4 |
| Ngưỡng ON | ≥ 19 V / ≥ 3 mA | SH-080042 §2.4 p.2-4 |
| Ngưỡng OFF | ≤ 11 V / ≤ 1,7 mA | SH-080042 §2.4 p.2-4 |
| Trở kháng vào | khoảng 5,6 kΩ | SH-080042 §2.4 p.2-4 |
| Thời gian đáp ứng | 1/5/10/20/70 ms, đặt trong PLC parameter (mặc định 10 ms) | SH-080042 §2.4 p.2-4 |
| Cách ly | Photocoupler | SH-080042 §2.4 p.2-4 |
| Số điểm chiếm dụng | 16 điểm (khai báo 16-point input) | SH-080042 §2.4 p.2-4 |
| Dòng tiêu thụ 5 VDC | 50 mA (TYP., toàn bộ điểm ON) | SH-080042 §2.4 p.2-4 |

## 5. Nguồn

- QX40: <SourceRef doc="sh080042" page="2.4" />, terminal block và thông số trong cùng mục.
- QX80: <SourceRef doc="sh080042" page="2.18" />.
- Vị trí khe, dòng tiêu thụ hệ thống và giới hạn base: <SourceRef doc="sh080483" page="8.3" />.

Sơ đồ mạch đấu dây thực tế (công tắc, cảm biến, nguồn 24 V) nằm ở [Đấu dây vào/ra](/q/system/io-wiring).
