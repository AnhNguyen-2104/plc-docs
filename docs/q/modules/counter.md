---
title: Module đếm xung QD62 và QD62E
family: q
module: q-series
status: draft
source: SH-080036
---

# Module đếm xung QD62 và QD62E

QD62 và QD62E là module đếm xung 2 kênh cho encoder và cảm biến xung, gắn trên base MELSEC Q và chiếm 16 điểm I/O. Hai bản khác nhau ở kiểu tầng ra: QD62 là **sink**, QD62E là **source**; phần đếm, bộ đệm và cách lập trình giống nhau.

## 1. Phương pháp đếm

| Chế độ | Mô tả | Nguồn |
| --- | --- | --- |
| 1-phase ×1 | Đếm sườn lên của pha A; chiều đảo bằng pha B hoặc lệnh đếm xuống | SH-080036 §5.1.1 p.5-1 |
| 1-phase ×2 | Đếm cả sườn lên và sườn xuống của pha A | SH-080036 §5.1.1 p.5-1 |
| CW/CCW | Xung CW vào pha A đếm lên, xung CCW vào pha B đếm xuống | SH-080036 §5.1.1 p.5-1 |
| 2-phase ×1 | Đếm một sườn trên mỗi chu kỳ A/B | SH-080036 §5.1.1 p.5-1 |
| 2-phase ×2 | Đếm hai sườn trên mỗi chu kỳ A/B | SH-080036 §5.1.1 p.5-1 |
| 2-phase ×4 | Đếm bốn sườn trên mỗi chu kỳ A/B | SH-080036 §5.1.1 p.5-1 |

Chế độ được chọn bằng switch 1 của intelligent function module trong GX Works2: giá trị `0`…`5` lần lượt là 1-phase ×1, 1-phase ×2, CW/CCW, 2-phase ×1, 2-phase ×2, 2-phase ×4 (SH-080036 §4.5).

QD62/QD62E **không có ngõ Z riêng**. Module chỉ có pha A, pha B, ngõ preset và ngõ bắt đầu chức năng; nếu encoder có xung Z, phải đưa Z về một điểm vào số thường hoặc dùng ngõ preset với mạch ngoài, chứ không cắm được vào chân Z của module.

## 2. Sơ đồ khối

<ModuleBlockDiagram
  model="QD62 / QD62E"
  role="2 kênh đếm xung, ngõ ra EQU1/EQU2"
  connector="40-pin connector"
  :width-pins="40"
  :inputs="[
    { signal: 'Phase A', pin: 'A20 (CH1) / A13 (CH2)', device: 'Encoder A' },
    { signal: 'Phase B', pin: 'A18 (CH1) / A11 (CH2)', device: 'Encoder B' },
    { signal: 'ABCOM', pin: 'B19 (CH1) / B12 (CH2)', device: '0 V encoder' },
    { signal: 'Preset', pin: 'B17 (CH1) / B10 (CH2)', device: 'Công tắc preset' },
    { signal: 'Function start', pin: 'B15 (CH1) / B08 (CH2)', device: 'Công tắc chức năng' },
    { signal: '12/24 V', pin: 'B01, B02', device: 'Nguồn 12/24 VDC' },
    { signal: '0 V', pin: 'A01, A02', device: '0 V chung' }
  ]"
  :outputs="[
    { signal: 'EQU1', pin: 'A06 (CH1) / A05 (CH2)', device: 'Đèn / rơ le so sánh 1' },
    { signal: 'EQU2', pin: 'B06 (CH1) / B05 (CH2)', device: 'Đèn / rơ le so sánh 2' }
  ]"
/>

## 3. Bảng chân (QD62/QD62E)

| Chân CH1 | Chân CH2 | Tín hiệu | Nguồn |
| --- | --- | --- | --- |
| A20 | A13 | Phase A pulse input 24 V | SH-080036 §3.5 p.3-12 |
| B20 | B13 | Phase A pulse input 12 V | SH-080036 §3.5 p.3-12 |
| A19 | A12 | Phase A pulse input 5 V | SH-080036 §3.5 p.3-12 |
| B19 | B12 | ABCOM | SH-080036 §3.5 p.3-12 |
| A18 | A11 | Phase B pulse input 24 V | SH-080036 §3.5 p.3-12 |
| B18 | B11 | Phase B pulse input 12 V | SH-080036 §3.5 p.3-12 |
| A17 | A10 | Phase B pulse input 5 V | SH-080036 §3.5 p.3-12 |
| B17 | B10 | Preset input 24 V | SH-080036 §3.5 p.3-12 |
| A16 | A09 | Preset input 12 V | SH-080036 §3.5 p.3-12 |
| B16 | B09 | Preset input 5 V | SH-080036 §3.5 p.3-12 |
| B15 | B08 | Function start input 24 V | SH-080036 §3.5 p.3-12 |
| A14 | A07 | Function start input 12 V | SH-080036 §3.5 p.3-12 |
| B14 | B07 | Function start input 5 V | SH-080036 §3.5 p.3-12 |
| A06 / A05 | | EQU1 — coincidence output No. 1 | SH-080036 §3.5 p.3-12 |
| B06 / B05 | | EQU2 — coincidence output No. 2 | SH-080036 §3.5 p.3-12 |
| B02, B01 | | 12/24 V (nguồn ngoài) | SH-080036 §3.5 p.3-12 |
| A02, A01 | | 0 V (cực chung) | SH-080036 §3.5 p.3-12 |

Mỗi kênh có **ba cặp chân vào riêng cho 24 V, 12 V và 5 V**. Chỉ đấu đúng một cặp theo mức xung của encoder; đấu nhầm cặp sẽ làm mất xung hoặc hỏng ngõ vào. Bản QD62D thay ba cặp này bằng ngõ vi sai RS-422-A (5 V line driver), không dùng chung sơ đồ chân với QD62/QD62E.

Sơ đồ nối encoder hở collector 24 V chính thức của hãng (`+24 V`, `0 V`, pha A/B, `ABCOM`):

<ManualFigure
  src="/img/manual/qd62-wiring.jpg"
  alt="Nối encoder hở collector 24 V với QD62: nguồn 24 V, pha A, pha B, ABCOM"
  caption="Nối encoder hở collector 24 V với QD62 — hình chính thức SH-080036 §4.4.2"
  doc="SH-080036"
  section="§4.4.2"
  page="4-6"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080036/sh080036q.pdf"
/>

Sơ đồ nối encoder line driver (tương đương AM26LS31) qua cặp vi sai:

<ManualFigure
  src="/img/manual/qd62-line-driver.jpg"
  alt="Nối encoder line driver với QD62: các cặp vi sai A+/A−, B+/B−"
  caption="Nối encoder line driver với QD62 — hình chính thức SH-080036 §4.4.2"
  doc="SH-080036"
  section="§4.4.2"
  page="4-8"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080036/sh080036q.pdf"
/>

## 4. Thông số QD62/QD62E

| Hạng mục | Giá trị | Nguồn |
| --- | --- | --- |
| Số kênh | 2 kênh | SH-080036 §3.1 p.3-1 |
| Số điểm chiếm dụng | 16 điểm (Intelligent 16 points) | SH-080036 §3.1 p.3-1 |
| Tốc độ đếm | 200 k / 100 k / 10 k PPS theo switch (200 kPPS là mức cao nhất của QD62/E) | SH-080036 §3.1 p.3-1 |
| Mức tín hiệu vào | 5/12/24 VDC, 2–5 mA | SH-080036 §3.1 p.3-1 |
| Dải đếm | 32-bit có dấu, −2 147 483 648…2 147 483 647 | SH-080036 §3.1 p.3-1 |
| Kiểu đếm | Linear counter hoặc ring counter | SH-080036 §5.2 p.5-4 |
| Ngõ ra so sánh EQU1/EQU2 | 0,5 A/điểm, 2 A/common; 10,2–30 V; đáp ứng ≤ 0,1 ms | SH-080036 §3.5 p.3-12 |
| Nguồn ngoài cho ngõ ra | 12/24 V (10,2–30 V), tiêu thụ 8 mA (TYP. 24 VDC) | SH-080036 §3.5 p.3-12 |

QD62 và QD62E khác nhau ở chiều dòng của tầng ra: QD62 sink (tải đấu về dương nguồn), QD62E source (tải đấu về 0 V). Cả hai đều có chung dải đếm 32-bit và tốc độ tối đa 200 kPPS; QD62D mới lên 500 kPPS.

## 5. Truy cập buffer memory

| Địa chỉ | Nội dung | Độ rộng | Nguồn |
| --- | --- | --- | --- |
| `Un\G0`, `Un\G1` | CH1 preset value | 32-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G2`, `Un\G3` | CH1 present value | 32-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G4`, `Un\G5` | CH1 coincidence point No. 1 | 32-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G6`, `Un\G7` | CH1 coincidence point No. 2 | 32-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G8` | CH1 overflow detection flag | 16-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G9` | CH1 counter function selection | 16-bit | SH-080036 §6.1 p.6-1 |
| `Un\G20`, `Un\G21` | CH1 ring counter minimum | 32-bit | SH-080036 §5.2.2 p.5-5 |
| `Un\G22`, `Un\G23` | CH1 ring counter maximum | 32-bit | SH-080036 §5.2.2 p.5-5 |
| `Un\G32`, `Un\G33` | CH2 preset value | 32-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G34`, `Un\G35` | CH2 present value | 32-bit | SH-080036 §5.1.3 p.5-3 |

Giá trị 32-bit nằm trên hai từ liên tiếp, thứ tự thấp trước. Dùng `DMOV`/`DFRO`/`DTO` hoặc `FROM`/`TO` với số từ `K2`, đừng đọc lẻ một từ.

```il
; Ghi preset 2500 cho CH1 (32-bit: Un\G0, Un\G1)
|--[SM400]-----[DMOV K2500 D200]-------|
|--[SM400]-----[TO   U0\G0  D200  K2]--|

; Đọc present value CH1 (Un\G2, Un\G3) và CH2 (Un\G34, Un\G35)
|--[SM400]-----[FROM U0\G2  D100  K2]--|
|--[SM400]-----[FROM U0\G34 D102  K2]--|
```

`U0` giả định module ở khe đầu; thay bằng số I/O thực của khe. Đoạn ladder minh hoạ cấu trúc, chưa chạy trên PLC thật; cần đối chiếu địa chỉ khe và switch tốc độ trước khi nạp.

## 6. Đấu dây encoder

- Dùng cặp xoắn có vỏ bọc cho A, B và nối vỏ bọc một điểm phía encoder.
- Với encoder open collector 24 V, đấu `Phase A 24 V` (A20) và `Phase B 24 V` (A18); với encoder 5 V line driver, đấu `5 V` (A19/A17) hoặc dùng QD62D cho vi sai.
- Giữ dây xung cách dây động lực ≥ 150 mm; xung nhiễu có thể làm module đếm sai.
- `ABCOM` là cực chung của cặp A/B, không phải 0 V nguồn ngoài cho tải.

Nguồn: <SourceRef doc="sh080036" page="3.1" />, bảng chân tại <SourceRef doc="sh080036" page="3.5" />, buffer memory tại <SourceRef doc="sh080036" page="5.1.3" />.
