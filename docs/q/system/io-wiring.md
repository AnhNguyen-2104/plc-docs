---
title: Đấu dây vào/ra (X/Y)
family: q
module: q-series
status: draft
source: SH-080042
---

# Đấu dây vào/ra (X/Y)

Ngõ vào và ngõ ra của MELSEC Q đều cách ly bằng photocoupler hoặc tiếp điểm rơ-le, nhưng cách đấu dây khác nhau ở một điểm quyết định: **common nối vào cực nào của nguồn 24 V**. Chọn sai kiểu common thì ngõ vào không bao giờ bật, dù cảm biến vẫn sáng đèn.

## 1. Bốn kiểu đấu dây

**Ngõ vào common dương (NPN).** `COM` nối `+24 V`; cảm biến NPN kéo ngõ vào `X` về `0 V`. Dòng đi từ nguồn vào module rồi ra cảm biến.

<IOWiringDiagram variant="input-sink" module="QX40" />

**Ngõ vào common âm (PNP).** `COM` nối `0 V`; cảm biến PNP đẩy dòng vào `X`. Chiều dòng ngược lại trường hợp trên.

<IOWiringDiagram variant="input-source" module="QX80" />

**Ngõ ra rơ-le.** Tiếp điểm khô đóng cắt tải; cầu chì và bộ triệt xung là linh kiện ngoài module.

<IOWiringDiagram variant="output-relay" module="QY10" />

**Ngõ ra transistor kiểu sink.** Tải nối giữa `+24 V` và `Y`; transistor kéo `Y` về `COM` (0 V). Tải cảm cần diode song song.

<IOWiringDiagram variant="output-transistor" module="QY40P" />

## 2. Chọn sink hay source

| Module | Kiểu common | Cảm biến phù hợp | `COM` nối | Đường dòng khi ON | Nguồn |
| --- | --- | --- | --- | --- | --- |
| QX40, QX41, QX42 | Common dương | NPN (ngõ ra hở collector) | `+24 V` | +24 V → COM → module → X → cảm biến → 0 V | SH-080042 §2.4 p.2-4 |
| QX80, QX81, QX82 | Common âm | PNP (ngõ ra hở emitter) | `0 V` | +24 V → cảm biến → X → module → COM → 0 V | SH-080042 §2.18 p.2-24 |
| QX50, QX70 | Dùng chung hai kiểu | NPN hoặc PNP | Theo kiểu chọn | Theo kiểu chọn | SH-080042 §2.13 p.2-17 |

Quy tắc thực dụng: tên module đã ghi kiểu common. QX40 là "positive common", nên `COM` **phải** là `+24 V`; QX80 là "negative common", nên `COM` **phải** là `0 V`. Không suy ra từ màu dây hay thói quen của hãng cảm biến.

## 3. Thông số ngõ vào

| Thông số | QX40 (common dương) | QX80 (common âm) | Nguồn |
| --- | --- | --- | --- |
| Điện áp vào định mức | 24 VDC (+20/−15%, độ nhấp nhô ≤5%) | 24 VDC (+20/−15%, độ nhấp nhô ≤5%) | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |
| Dòng vào định mức | Khoảng 4 mA | Khoảng 4 mA | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |
| Ngưỡng ON | ≥19 V và ≥3 mA | ≥19 V và ≥3 mA | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |
| Ngưỡng OFF | ≤11 V và ≤1,7 mA | ≤11 V và ≤1,7 mA | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |
| Trở kháng vào | Khoảng 5,6 kΩ | Khoảng 5,6 kΩ | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |
| Thời gian đáp ứng | 1/5/10/20/70 ms, mặc định 10 ms | 1/5/10/20/70 ms, mặc định 10 ms | SH-080042 §2.4 p.2-4, §1.3.1 p.1-18 |
| Điểm chung | 16 điểm/common, `COM` = TB17, TB18 để trống | 16 điểm/common, `COM` = TB18, TB17 để trống | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |

Điện áp 24 VDC ghi trong bảng là điện áp định mức của module; nguồn thực tế vẫn phải nằm trong dải +20/−15% tại điểm đấu dây, sau khi trừ sụt áp trên dây.

## 4. Thông số ngõ ra

| Thông số | QY10 (rơ-le) | QY40P (transistor sink) | Nguồn |
| --- | --- | --- | --- |
| Điện áp tải | 24 VDC 2 A hoặc 240 VAC 2 A (cos φ = 1) | 12–24 VDC (+20/−15%) | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Dòng mỗi điểm | 2 A | 0,1 A | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Dòng mỗi common | 8 A | 1,6 A | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Dòng rò khi OFF | Không áp dụng (tiếp điểm) | ≤0,1 mA | SH-080042 §3.5 p.3-7 |
| Dòng inrush | Không áp dụng | 0,7 A trong 10 ms | SH-080042 §3.5 p.3-7 |
| Tải nhỏ nhất | 5 VDC 1 mA | Không quy định | SH-080042 §3.1 p.3-1 |
| Điện áp đóng cắt lớn nhất | 264 VAC hoặc 125 VDC | Điện áp tải 12–24 VDC | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Thời gian đáp ứng | OFF→ON ≤10 ms, ON→OFF ≤12 ms | ≤1 ms cho cả hai chiều | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Bộ triệt xung trong module | Không | Diode zener | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Tuổi thọ tiếp điểm | ≥100 nghìn lần ở tải định mức | Không áp dụng | SH-080042 §3.1 p.3-1 |
| Cầu chì | Không có; khuyến nghị gắn ngoài | Không có; khuyến nghị gắn ngoài | SH-080042 §1.2.2 p.1-3 |

QY18A là biến thể 8 điểm, các điểm độc lập, 2 A/điểm và 8 A cho cả module (SH-080042 §3.3 p.3-4) — dùng khi cần tách riêng từng tiếp điểm.

> **Lưu ý về định mức 0,5 A/điểm.** Manual QY40P trên đĩa ghi 0,1 A/điểm và 1,6 A/common, không có định mức 0,5 A/điểm cho QY40P. Con số 0,5 A/điểm thuộc ngõ ra coincidence của QD62 (12/24 VDC, 0,5 A/điểm, 2 A/common — SH-080036 §3.1 p.3-2), không phải module ngõ ra transistor.

## 5. Danh mục kiểm tra khi đấu dây

- [ ] Xác định đúng kiểu common của module trước khi đấu `COM`: QX40 → `+24 V`, QX80 → `0 V`.
- [ ] Đo điện áp nguồn 24 VDC tại điểm đấu dây, nằm trong dải +20/−15% của 24 V.
- [ ] Đối chiếu loại cảm biến (NPN/PNP) với kiểu common; thử từng điểm bằng tay trước khi chạy tự động.
- [ ] Với tải cảm: lắp diode song song, ngược cực nguồn; diode có điện áp ngược ≥10 lần điện áp mạch và dòng thuận ≥2 lần dòng tải (SH-080042 §1.2.2 p.1-5).
- [ ] Kiểm tra dòng từng điểm và tổng dòng mỗi common so với bảng thông số ngõ ra.
- [ ] Lắp cầu chì ngoài cho đường tải ngõ ra khi có nguy cơ ngắn mạch (SH-080042 §1.2.2 p.1-3).
- [ ] Kiểm tra dòng rò 0,1 mA không đủ giữ tải nhỏ (đèn LED, rơ-le nhỏ) ở trạng thái OFF.
- [ ] Đi dây I/O xa dây động lực ít nhất 100 mm; cáp có vỏ bọc thì nối đất vỏ ở phía PLC (SH-080483 p.2, §4.8.2 p.111).
- [ ] Siết cầu đấu M3 đúng lực 0,42–0,58 N·m (SH-080042 §1.2.6 p.1-17).
- [ ] Nối đất FG/LG với điện trở ≤100 Ω, dây tối đa 2 mm² (SH-080483 §4.8.4 p.118).
