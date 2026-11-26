---
title: "Q64AD — Module tương tự"
family: q
module: module-q64ad
status: draft
source: SH-080055
---

<ModulePage id="q64ad" />

## 1. Nhóm tín hiệu cần đấu

Q64AD là module vào tương tự 4 kênh. Mỗi kênh dùng một cặp dây tín hiệu và một cực che:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Tín hiệu vào | CH1…CH4 V+/V−/I+ | cảm biến → module | Áp hoặc dòng, chọn theo dải (SH-080055 §4.3 p.4-4) |
| Che | SLD từng kênh | — | Nối vỏ bọc cặp xoắn phía module (SH-080055 §4.3 p.4-4) |
| Mốc | A.G. | — | Mốc 0 V đầu vào tương tự; không dùng làm 0 V nguồn 24 V (SH-080055 §4.3 p.4-4) |
| Đất khung | FG | — | Nối đất tủ (SH-080055 §4.3 p.4-4) |

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

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** khối đấu dây kiểu vít — 18 điểm đấu vít, một dây mỗi điểm (SH-080055 §3.1, p. 3-2).
- Dùng cặp xoắn có vỏ bọc cho từng kênh; V+/V− hoặc I+/V− đi cùng một cặp.
- Nối vỏ bọc vào SLD phía module; đầu còn lại để hở hoặc nối đất một điểm phía cảm biến — không nối đất hai đầu.
- A.G. là mốc của đầu vào tương tự, không nối chung với FG trong tủ và không dùng làm cực âm nguồn 24 V.
- Giữ dây tín hiệu cách dây động lực ≥150 mm; bắt chéo vuông góc khi buộc phải gặp.
- Kênh không dùng phải nối tắt V+ với V− để tránh giá trị số nhảy (SH-080055 §4.4.1 p.4-5).

## 3. Sơ đồ tham chiếu

- Q64AD là trang mẫu cho đầu vào tương tự. [Q62DA](/q/modules/m/q62da) là đầu ra tương tự; chỉ đối chiếu cấu trúc khối 18 điểm và cách che, không áp dụng chiều tín hiệu.
- Áp dụng bảng chân, dải tín hiệu và cách đấu V+/V−/I+/SLD của chính Q64AD ở các mục dưới.
- Không áp dụng sơ đồ đầu ra Q62DA cho Q64AD.

## 4. Sơ đồ mạch vào/ra của hãng

Sơ đồ đấu dây vào tương tự chính thức của Q64AD:

<ManualFigure
  src="/img/manual/q64ad-wiring.webp"
  alt="Đấu dây Q64AD: V+, V−, I+, A.G., SLD, cặp xoắn có vỏ bọc"
  caption="Đấu dây vào tương tự Q64AD — khối đấu dây kiểu vít"
  doc="SH-080055"
  section="§4.4.2"
  page="4-6"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080055/sh080055u.pdf"
/>

<ManualFigure
  src="/img/manual/q64ad-terminals.webp"
  alt="Bảng số chân và tên tín hiệu khối đấu dây 18 điểm Q64AD"
  caption="Khối đấu dây Q64AD: số chân 1–18 và tên tín hiệu — khối đấu dây kiểu vít"
  doc="SH-080055"
  section="§4.2"
  page="4-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080055/sh080055u.pdf"
/>

### Thông số

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

### Dải tín hiệu

| Dải | Mã cài đặt (switch) | Dùng cho | Nguồn |
| --- | --- | --- | --- |
| 4–20 mA | `0H` | Cảm biến dòng 4–20 mA | SH-080055 §3.4.10 p.3-30 |
| 0–20 mA | `1H` | Cảm biến dòng 0–20 mA | SH-080055 §3.4.10 p.3-30 |
| 1–5 V | `2H` | Truyền tín hiệu áp 1–5 V | SH-080055 §3.4.10 p.3-30 |
| 0–5 V | `3H` | Tín hiệu áp 0–5 V | SH-080055 §3.4.10 p.3-30 |
| −10…10 V | `4H` | Tín hiệu lưỡng cực | SH-080055 §3.4.10 p.3-30 |
| 0–10 V | `5H` | Tín hiệu áp 0–10 V | SH-080055 §3.4.10 p.3-30 |
| Dải người dùng | `FH` | Offset/gain tự đặt | SH-080055 §3.4.10 p.3-30 |

## 5. Đấu nối thiết bị ngoài

- Cảm biến dòng 4–20 mA hoặc 0–20 mA đấu vào I+/V−; cảm biến áp đấu vào V+/V−.
- Dùng cặp xoắn có vỏ bọc, vỏ nối SLD một đầu phía module.
- A.G. là mốc chung của mọi kênh; không nối đất lần thứ hai.
- Kiểm tra dải đặt trong GX Works2 khớp tín hiệu cảm biến trước khi nạp (SH-080055 §4.5).

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] Đúng cặp V+/V− hoặc I+/V− cho từng kênh.
- [ ] Vỏ bọc nối SLD một đầu phía module.
- [ ] A.G. không nối chung với FG hoặc 0 V nguồn 24 V.
- [ ] Dây tín hiệu cách dây động lực ≥150 mm.
- [ ] Kênh không dùng đã nối tắt V+ với V−.
- [ ] Dải tín hiệu trong GX Works2 khớp cảm biến.
- [ ] Đã đo thông mạch và cách điện trước khi cấp điện.
