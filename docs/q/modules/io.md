---
title: Module vào/ra số QX40 và QY40P
family: q
module: q-series
status: draft
source: SH-080042, SH-080483
---

# Module vào/ra số QX40 và QY40P

QX40 và QY40P là cặp module số 16 điểm gắn trên base MELSEC Q. QX40 nhận 24 VDC kiểu common dương, còn QY40P xuất 12–24 VDC bằng transistor kiểu sink. Cả hai chiếm 16 điểm I/O trên base và nối ra bằng khối đấu dây 18 điểm.

## 1. Sơ đồ chân QX40

<ModuleBlockDiagram
  model="QX40"
  role="16 điểm vào 24 VDC, common dương"
  connector="Khối đấu dây 18 điểm"
  :width-pins="18"
  :inputs="[
    { signal: 'X0', pin: 'TB1', device: 'Công tắc / cảm biến 1' },
    { signal: 'X1', pin: 'TB2', device: 'Công tắc / cảm biến 2' },
    { signal: 'X2', pin: 'TB3', device: 'Công tắc / cảm biến 3' },
    { signal: 'X3', pin: 'TB4', device: 'Công tắc / cảm biến 4' },
    { signal: 'X4', pin: 'TB5', device: 'Công tắc / cảm biến 5' },
    { signal: 'X5', pin: 'TB6', device: 'Công tắc / cảm biến 6' },
    { signal: 'X6', pin: 'TB7', device: 'Công tắc / cảm biến 7' },
    { signal: 'X7', pin: 'TB8', device: 'Công tắc / cảm biến 8' },
    { signal: 'X8', pin: 'TB9', device: 'Công tắc / cảm biến 9' },
    { signal: 'X9', pin: 'TB10', device: 'Công tắc / cảm biến 10' },
    { signal: 'XA', pin: 'TB11', device: 'Công tắc / cảm biến 11' },
    { signal: 'XB', pin: 'TB12', device: 'Công tắc / cảm biến 12' },
    { signal: 'XC', pin: 'TB13', device: 'Công tắc / cảm biến 13' },
    { signal: 'XD', pin: 'TB14', device: 'Công tắc / cảm biến 14' },
    { signal: 'XE', pin: 'TB15', device: 'Công tắc / cảm biến 15' },
    { signal: 'XF', pin: 'TB16', device: 'Công tắc / cảm biến 16' },
    { signal: 'COM', pin: 'TB17', device: 'Nguồn +24 V (cực chung)' }
  ]"
  :outputs="[]"
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

Các model ghi "dự kiến" là model có trong manual nhưng chưa trích được một thông số đơn lẻ kiểm chứng được; mọi dòng còn lại đều mang số trang manual trong danh mục.

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

<ModuleBlockDiagram
  model="QY40P"
  role="16 điểm ra transistor kiểu sink"
  connector="Khối đấu dây 18 điểm"
  :width-pins="18"
  :inputs="[
    { signal: '12/24 VDC', pin: 'TB17', device: 'Nguồn phụ tải +' },
    { signal: 'COM', pin: 'TB18', device: '0 V chung' }
  ]"
  :outputs="[
    { signal: 'Y0', pin: 'TB1', device: 'Rơ le / van / đèn 1' },
    { signal: 'Y1', pin: 'TB2', device: 'Rơ le / van / đèn 2' },
    { signal: 'Y2', pin: 'TB3', device: 'Rơ le / van / đèn 3' },
    { signal: 'Y3', pin: 'TB4', device: 'Rơ le / van / đèn 4' },
    { signal: 'Y4', pin: 'TB5', device: 'Rơ le / van / đèn 5' },
    { signal: 'Y5', pin: 'TB6', device: 'Rơ le / van / đèn 6' },
    { signal: 'Y6', pin: 'TB7', device: 'Rơ le / van / đèn 7' },
    { signal: 'Y7', pin: 'TB8', device: 'Rơ le / van / đèn 8' },
    { signal: 'Y8', pin: 'TB9', device: 'Rơ le / van / đèn 9' },
    { signal: 'Y9', pin: 'TB10', device: 'Rơ le / van / đèn 10' },
    { signal: 'YA', pin: 'TB11', device: 'Rơ le / van / đèn 11' },
    { signal: 'YB', pin: 'TB12', device: 'Rơ le / van / đèn 12' },
    { signal: 'YC', pin: 'TB13', device: 'Rơ le / van / đèn 13' },
    { signal: 'YD', pin: 'TB14', device: 'Rơ le / van / đèn 14' },
    { signal: 'YE', pin: 'TB15', device: 'Rơ le / van / đèn 15' },
    { signal: 'YF', pin: 'TB16', device: 'Rơ le / van / đèn 16' }
  ]"
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
