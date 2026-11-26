---
title: "Q62DA — Module tương tự"
family: q
module: module-q62da
status: draft
source: SH-080054
---

<ModulePage id="q62da" />

## 1. Nhóm tín hiệu cần đấu

Q62DA là module ra tương tự 2 kênh. Mỗi kênh dùng một cặp đầu ra và cực chung:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Tín hiệu ra | CH1, CH2 V+/COM/I+ | module → tải | Áp hoặc dòng, chọn theo dải (SH-080054 §4.3 p.4-5) |
| Nguồn phụ | 24V, 24G | nguồn → module | Nguồn cách ly cho tầng ra (SH-080054 §4.3 p.4-5) |
| Đất khung | FG | — | Nối đất tủ (SH-080054 §4.3 p.4-5) |

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

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** khối đấu dây kiểu vít — 18 điểm đấu vít, một dây mỗi điểm (SH-080054 §3.1, p. 3-2).
- Dùng cặp xoắn có vỏ bọc cho từng kênh; vỏ bọc nối FG phía module, đầu kia để hở hoặc nối đất một điểm.
- Q62DA không có SLD/A.G. riêng; dây trả tín hiệu nối vào COM của từng kênh.
- Nguồn phụ 24 VDC (chân 16/17) là nguồn cách ly cho tầng ra; phải có mặt thì tín hiệu dòng mới đạt 0–20 mA ở tải lớn.
- Giữ dây tín hiệu cách dây động lực ≥150 mm.
- Không nối tắt đầu ra áp hoặc dòng vào nguồn.

## 3. Sơ đồ tham chiếu

- Q62DA là trang mẫu cho đầu ra tương tự. [Q64AD](/q/modules/m/q64ad) là đầu vào tương tự; chỉ đối chiếu cấu trúc khối 18 điểm và cách che, không áp dụng chiều tín hiệu.
- Áp dụng bảng chân, sơ đồ đấu dây và thông số của chính Q62DA ở các mục dưới.
- Không áp dụng sơ đồ đầu vào Q64AD cho Q62DA.

## 4. Sơ đồ mạch vào/ra của hãng

Sơ đồ đấu dây ra tương tự chính thức của Q62DA, cho cả ngõ ra áp và ngõ ra dòng:

<ManualFigure
  src="/img/manual/q62da-wiring.webp"
  alt="Đấu dây Q62DA: ngõ ra áp V+/COM và ngõ ra dòng I+/COM, tải và FG"
  caption="Đấu dây ra tương tự Q62DA: áp và dòng — khối đấu dây kiểu vít"
  doc="SH-080054"
  section="§4.4.2"
  page="4-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080054/sh080054v.pdf"
/>

<ManualFigure
  src="/img/manual/q62da-terminals.webp"
  alt="Bảng số chân và tên tín hiệu khối đấu dây 18 điểm Q62DA"
  caption="Khối đấu dây Q62DA: số chân 1–18 và tên tín hiệu — khối đấu dây kiểu vít"
  doc="SH-080054"
  section="§4.2"
  page="4-5"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080054/sh080054v.pdf"
/>

### Thông số

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

## 5. Đấu nối thiết bị ngoài

- Tải áp nối giữa V+ và COM; tải dòng nối giữa I+ và COM.
- Dùng cặp xoắn có vỏ bọc; vỏ nối FG một đầu phía module.
- Cấp nguồn phụ 24 VDC vào chân 16/17 khi cần dải dòng 0–20 mA ở tải lớn.
- Kiểm tra dải đặt trong GX Works2 khớp tải trước khi nạp.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] Đúng cặp V+/COM hoặc I+/COM cho từng kênh.
- [ ] Nguồn phụ 24 VDC đúng cực tính ở chân 16/17.
- [ ] Vỏ bọc nối FG một đầu phía module.
- [ ] Dây tín hiệu cách dây động lực ≥150 mm.
- [ ] Tải nằm trong dải áp/dòng cho phép.
- [ ] Dải tín hiệu trong GX Works2 khớp tải.
- [ ] Đã đo thông mạch và cách điện trước khi cấp điện.
