---
title: Module tương tự Q64AD và Q62DA
family: q
module: q-series
status: draft
source: SH-080055, SH-080054
---

# Module tương tự Q64AD và Q62DA

Q64AD là module chuyển tương tự → số 4 kênh, Q62DA là module chuyển số → tương tự 2 kênh. Cả hai chiếm 16 điểm I/O, nối ra bằng khối đấu dây 18 điểm và trao đổi dữ liệu với CPU qua buffer memory (`Un\G…`) bằng `FROM`/`TO` hoặc qua thiết bị `U\G`. Điện áp và dòng đều là tín hiệu vi sai một đầu, nên dây tín hiệu phải là cặp xoắn có vỏ bọc và `AG`/`SLD` là điểm tham chiếu.

## 1. Q64AD — bảng chân và kênh

| Chân | Tín hiệu (Q64AD) | Ý nghĩa | Nguồn |
| --- | --- | --- | --- |
| 1 | CH1 `V+` | Đầu vào áp dương kênh 1 | SH-080055 §4.3 p.4-4 |
| 2 | CH1 `V−` | Đầu vào áp âm kênh 1 | SH-080055 §4.3 p.4-4 |
| 3 | CH1 `I+` | Đầu vào dòng kênh 1 | SH-080055 §4.3 p.4-4 |
| 4 | `SLD` | Vỏ bọc che của cặp dây kênh 1 | SH-080055 §4.3 p.4-4 |
| 5–8 | CH2 `V+`/`V−`/`I+`/`SLD` | Kênh 2, cùng thứ tự như kênh 1 | SH-080055 §4.3 p.4-4 |
| 9–12 | CH3 `V+`/`V−`/`I+`/`SLD` | Kênh 3, cùng thứ tự | SH-080055 §4.3 p.4-4 |
| 13–16 | CH4 `V+`/`V−`/`I+`/`SLD` | Kênh 4, cùng thứ tự | SH-080055 §4.3 p.4-4 |
| 17 | `A.G.` | Đất tương tự (analog ground) | SH-080055 §4.3 p.4-4 |
| 18 | `FG` | Đất khung | SH-080055 §4.3 p.4-4 |

Mỗi kênh dùng chung một cặp chân cho cả áp và dòng: `V+`/`V−` khi đo áp, `I+`/`V−` khi đo dòng. `SLD` nối vào vỏ bọc cặp xoắn phía module, còn đầu kia của vỏ bọc nối đất một điểm phía cảm biến. `A.G.` là mốc 0 V của toàn bộ đầu vào tương tự, không nối chung với `FG` trong tủ.

Sơ đồ đấu dây vào tương tự chính thức của Q64AD (`V+`/`V−`, `I+`, `A.G.`, cặp dây có vỏ bọc):

<ManualFigure
  src="/img/manual/q64ad-wiring.jpg"
  alt="Đấu dây Q64AD: V+, V−, I+, A.G., SLD, cặp xoắn có vỏ bọc"
  caption="Đấu dây vào tương tự Q64AD — hình chính thức SH-080055 §4.4.2"
  doc="SH-080055"
  section="§4.4.2"
  page="4-6"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080055/sh080055u.pdf"
/>

## 2. Q64AD — thông số

| Hạng mục | Giá trị | Nguồn |
| --- | --- | --- |
| Số kênh | 4 kênh | SH-080055 §3.1 p.3-1 |
| Ngõ vào áp | −10…10 VDC, trở kháng vào 1 MΩ | SH-080055 §3.1 p.3-1 |
| Ngõ vào dòng | 0…20 mADC, trở kháng vào 250 Ω | SH-080055 §3.1 p.3-1 |
| Dữ liệu số | 16-bit có dấu; thường −4096…4095; phân giải cao −12288…12287 hoặc −16384…16383 | SH-080055 §3.1 p.3-1 |
| Độ phân giải lớn nhất (0–10 V) | 2,5 mV (thường) / 0,625 mV (phân giải cao) | SH-080055 §3.1 p.3-1 |
| Độ phân giải lớn nhất (0–5 V) | 1,25 mV (thường) / 0,416 mV (phân giải cao) | SH-080055 §3.1 p.3-1 |
| Độ phân giải lớn nhất (1–5 V) | 1,0 mV (thường) / 0,333 mV (phân giải cao) | SH-080055 §3.1 p.3-1 |
| Tốc độ chuyển đổi | 80 µs/kênh | SH-080055 §3.1 p.3-2 |
| Thời gian thêm khi bù trôi nhiệt | +160 µs cho toàn bộ kênh | SH-080055 §3.1 p.3-2 |
| Giới hạn đầu vào tuyệt đối | ±15 V (áp), ±30 mA (dòng) | SH-080055 §3.1 p.3-2 |
| Số điểm chiếm dụng | 16 điểm (Intelligent 16 points) | SH-080055 §3.1 p.3-2 |
| Dòng tiêu thụ 5 VDC | 0,63 A | SH-080055 §3.1 p.3-2 |

Độ chính xác ±0,1 % ở 25 ± 5 °C, và ±0,3 % trong dải 0–55 °C theo mục 1.1 và bảng 3.1 cùng manual.

## 3. Q62DA — bảng chân và kênh

| Chân | Tín hiệu (Q62DA) | Ý nghĩa | Nguồn |
| --- | --- | --- | --- |
| 1 | CH1 `V+` | Đầu ra áp dương kênh 1 | SH-080054 §4.3 p.4-5 |
| 2 | CH1 `COM` | Cực chung kênh 1 | SH-080054 §4.3 p.4-5 |
| 3 | CH1 `I+` | Đầu ra dòng kênh 1 | SH-080054 §4.3 p.4-5 |
| 4 | — | Vacant | SH-080054 §4.3 p.4-5 |
| 5 | CH2 `V+` | Đầu ra áp dương kênh 2 | SH-080054 §4.3 p.4-5 |
| 6 | CH2 `COM` | Cực chung kênh 2 | SH-080054 §4.3 p.4-5 |
| 7 | CH2 `I+` | Đầu ra dòng kênh 2 | SH-080054 §4.3 p.4-5 |
| 8–15 | — | Vacant trên Q62DA (được dùng cho CH3/CH4 trên Q64DA) | SH-080054 §4.3 p.4-5 |
| 16 | `24V` | Ngõ vào nguồn phụ 24 VDC | SH-080054 §4.3 p.4-5 |
| 17 | `24G` | Cực 0 V của nguồn phụ | SH-080054 §4.3 p.4-5 |
| 18 | `FG` | Đất khung | SH-080054 §4.3 p.4-5 |

Khác với Q64AD, Q62DA không có chân `SLD`/`A.G.` riêng: vỏ bọc cặp xoắn nối về `FG`, và dây trả tín hiệu nối vào `COM` của từng kênh. Nguồn phụ 24 VDC (chân 16/17) là nguồn cách ly cho tầng ra, phải có mặt thì tín hiệu dòng mới đạt được dải 0–20 mA ở tải lớn.

Sơ đồ đấu dây ra tương tự chính thức của Q62DA, cho cả ngõ ra áp và ngõ ra dòng:

<ManualFigure
  src="/img/manual/q62da-wiring.jpg"
  alt="Đấu dây Q62DA: ngõ ra áp V+/COM và ngõ ra dòng I+/COM, tải và FG"
  caption="Đấu dây ra tương tự Q62DA: áp và dòng — hình chính thức SH-080054 §4.4.2"
  doc="SH-080054"
  section="§4.4.2"
  page="4-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080054/sh080054v.pdf"
/>

## 4. Q62DA — thông số

| Hạng mục | Giá trị | Nguồn |
| --- | --- | --- |
| Số kênh | 2 kênh | SH-080054 §3.1.2 p.3-2 |
| Ngõ ra áp | −10…10 VDC, tải 1 kΩ…1 MΩ | SH-080054 §3.1.2 p.3-2 |
| Ngõ ra dòng | 0…20 mADC, tải 0…600 Ω | SH-080054 §3.1.2 p.3-2 |
| Dữ liệu số | 16-bit có dấu; thường −4096…4095; phân giải cao −12288…12287 hoặc −16384…16383 | SH-080054 §3.1.2 p.3-2 |
| Tốc độ chuyển đổi | 80 µs/kênh | SH-080054 §3.1.2 p.3-2 |
| Độ chính xác | ±0,1 % ở 25 ± 5 °C; ±0,3 % ở 0–55 °C | SH-080054 §3.1.2 p.3-2 |
| Giới hạn đầu ra tuyệt đối | ±12 V (áp), 21 mA (dòng) | SH-080054 §3.1.2 p.3-2 |
| Số điểm chiếm dụng | 16 điểm (Intelligent 16 points) | SH-080054 §3.1.2 p.3-2 |
| Dòng tiêu thụ 5 VDC | 0,33 A | SH-080054 §3.1.2 p.3-2 |

## 5. Dải tín hiệu và cách chọn

| Dải | Mã cài đặt (switch) | Dùng cho | Nguồn |
| --- | --- | --- | --- |
| 4–20 mA | `0H` | Cảm biến dòng 4–20 mA | SH-080055 §3.4.10 p.3-30 |
| 0–20 mA | `1H` | Cảm biến dòng 0–20 mA | SH-080055 §3.4.10 p.3-30 |
| 1–5 V | `2H` | Truyền tín hiệu áp 1–5 V | SH-080055 §3.4.10 p.3-30 |
| 0–5 V | `3H` | Tín hiệu áp 0–5 V | SH-080055 §3.4.10 p.3-30 |
| −10…10 V | `4H` | Tín hiệu lưỡng cực | SH-080055 §3.4.10 p.3-30 |
| 0–10 V | `5H` | Tín hiệu áp 0–10 V | SH-080055 §3.4.10 p.3-30 |
| Dải người dùng | `FH` | Offset/gain tự đặt | SH-080055 §3.4.10 p.3-30 |

Mã dải **không** đổi được bằng cách ghi vào `Un\G20`/`Un\G21`: hai địa chỉ đó chỉ để đọc lại dải đang đặt. Muốn đổi dải phải vào switch setting của intelligent function module trong GX Works2 (SH-080055 §4.5). Đây là lỗi thường gặp khi thử ghi thẳng buffer memory rồi thấy giá trị không đổi.

## 6. Đấu dây

- Dùng cặp xoắn có vỏ bọc cho từng kênh; `V+`/`V−` (hoặc `I+`/`COM`) đi cùng một cặp.
- Nối vỏ bọc vào `SLD` (Q64AD) hoặc `FG` (Q62DA) ở phía module, đầu còn lại để hở hoặc nối đất một điểm phía cảm biến — không nối đất cả hai đầu.
- `A.G.` của Q64AD là mốc của đầu vào tương tự; không dùng `A.G.` làm cực âm nguồn 24 V.
- Giữ dây tín hiệu cách dây động lực ≥ 150 mm và bắt chéo vuông góc khi buộc phải gặp.

## 7. Chương trình mẫu (FROM/TO)

Q64AD ở khe đầu (I/O số 0000 → `U0`), Q62DA ở khe kế (`U1`). Địa chỉ `Y` của mỗi module dịch theo khe; ở đây Q64AD dùng `Y0009`, Q62DA dùng `Y0019` cho tín hiệu Operating condition setting request.

```il
; --- Q64AD: bật A/D cho CH1..CH4, lấy mẫu liên tục ---
|--[SM400]-----[TO  U0\G0  K000F  K1]--|  ; b0..b3 = 1: bật A/D CH1..CH4 (Un\G0)
|--[SM400]-----[TO  U0\G9  K0000  K1]--|  ; 0: sampling, không lấy trung bình (Un\G9)
|--[SM400]-----[SET Y0009]-------------|  ; Operating condition setting request
|--[X0009]-----[RST Y0009]-------------|  ; X9 = cài đặt đã hoàn tất
|--[SM400]-----[FROM U0\G11 D100  K4]--|  ; D100..D103 = CH1..CH4 (Un\G11..G14)

; --- Q62DA: ghi giá trị số cho CH1, CH2 ---
|--[SM400]-----[TO  U1\G0  K0003  K1]--|  ; b0, b1 = 1: bật D/A CH1, CH2 (mặc định 3H)
|--[SM400]-----[TO  U1\G1  D200   K2]--|  ; D200 → CH1, D201 → CH2 (Un\G1, Un\G2)
```

Địa chỉ buffer dùng ở đây: `Un\G0` = A/D conversion enable/disable (b0–b3 hợp lệ trên Q64AD, b4–b7 bỏ qua), `Un\G9` = averaging process setting, `Un\G11…G14` = CH1…CH4 digital output value (SH-080055 §3.4.1 p.3-18); `Un\G0` = D/A conversion enable/disable và `Un\G1`/`Un\G2` = CH1/CH2 digital value trên Q62DA (SH-080054 §3.4.1 p.3-20). Đoạn ladder này là ví dụ cấu trúc, chưa chạy trên PLC thật: cần đối chiếu địa chỉ `Y`/`X` theo sơ đồ khe thực tế trước khi nạp.

## 8. Nguồn

- Q64AD: <SourceRef doc="sh080055" page="3.1" />, bảng chân tại <SourceRef doc="sh080055" page="4.3" />, buffer memory tại <SourceRef doc="sh080055" page="3.4.1" />.
- Q62DA: <SourceRef doc="sh080054" page="3.1.2" />, bảng chân tại <SourceRef doc="sh080054" page="4.3" />, buffer memory tại <SourceRef doc="sh080054" page="3.4.1" />.
- Mã dải tín hiệu: SH-080055 §3.4.10 p.3-30.
