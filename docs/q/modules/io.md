---
title: Module vào/ra số MELSEC Q (46 model)
family: q
module: q-series
status: draft
source: SH-080042, SH-080483
---

# Module vào/ra số MELSEC Q (46 model)

Trang này lập danh mục 46 module vào/ra số được tài liệu hoá trong SH-080042, mỗi model một thông số kiểm chứng được kèm số trang manual tương ứng. QX40 và QY40P được giữ lại làm cặp module tham chiếu để đi sâu sơ đồ chân và thông số đầy đủ; các model còn lại dùng bảng danh mục phía dưới.

## 1. Sơ đồ chân QX40

Sơ đồ chính thức của hãng cho mạch vào QX40:

<ManualFigure
  src="/img/manual/qx40-input-circuit.jpg"
  alt="Mạch vào QX40 common dương: photocoupler, điện trở 4,7 kΩ"
  caption="Mạch vào QX40: photocoupler, COM dương"
  doc="SH-080042"
  section="§2.4"
  page="2-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

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

Vì là common dương, `COM` được nối về **+24 V** và công tắc nối từng điểm X về **0 V**; đấu ngược cực sẽ không bật được điểm vào. Sơ đồ mạch chi tiết nằm ở [Đấu dây vào/ra](/q/system/io-wiring).

## 2. Danh mục 46 module vào/ra

<IoCatalog />

Mọi dòng trong danh mục đều mang số trang manual; một model chỉ bị đánh dấu "dự kiến" nếu không trích được một thông số đơn lẻ kiểm chứng được (hiện tại không có).

## 3. Thông số QX40

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

## 4. Sơ đồ chân QY40P

Sơ đồ chính thức của hãng cho mạch ra transistor QY40P:

<ManualFigure
  src="/img/manual/qy40p-output-circuit.jpg"
  alt="Mạch ra transistor QY40P kiểu sink: diode zener, tải và cầu chì"
  caption="Mạch ra QY40P: transistor sink, zener"
  doc="SH-080042"
  section="§3.5"
  page="3-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

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

## 5. Thông số QY40P

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

## 6. Nguồn

- QX40: <SourceRef doc="sh080042" page="2.4" />, terminal block và thông số trong cùng mục.
- QY40P: <SourceRef doc="sh080042" page="3.5" />.
- Vị trí khe, dòng tiêu thụ hệ thống và giới hạn base: <SourceRef doc="sh080483" page="8.3" />.

Sơ đồ mạch đấu dây thực tế (công tắc, tải, diode dập xung) nằm ở [Đấu dây vào/ra](/q/system/io-wiring).
