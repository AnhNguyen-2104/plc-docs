---
title: "QD62E — Module đếm xung"
family: q
module: module-qd62e
status: draft
source: SH-080036
---

<ModulePage id="qd62e" />

## 1. Nhóm tín hiệu cần đấu

QD62E là module đếm xung 2 kênh, ngõ ra kiểu source. Bảng chân dùng chung với QD62:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Xung đếm | Phase A, Phase B | encoder → module | Mỗi kênh có ba cặp 24/12/5 V; chỉ đấu một cặp (SH-080036 §3.5 p.3-12) |
| Điều khiển | Preset, Function start | công tắc/PLC → module | Cùng ba mức 24/12/5 V (SH-080036 §3.5 p.3-12) |
| Ngõ ra so sánh | EQU1, EQU2 | module → tải | 0,5 A/điểm, 2 A/common; kiểu source (SH-080036 §3.5 p.3-12) |
| Nguồn ngoài | 12/24 V, 0 V | nguồn → module | Nuôi tầng ngõ ra (SH-080036 §3.5 p.3-12) |

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

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** đầu nối 40 chân (A20/B20) — hai hàng chân A20/B20, 32 điểm mỗi đầu nối (SH-080036 §3.5, p. 3-13).
- Mỗi kênh có ba cặp chân 24 V, 12 V và 5 V; chỉ đấu đúng một cặp theo mức xung của encoder.
- ABCOM là cực chung của cặp A/B, không phải 0 V nguồn ngoài cho tải.
- Dùng cặp xoắn có vỏ bọc cho A, B; nối vỏ bọc một điểm phía encoder.
- Dây xung cách dây động lực ≥150 mm.
- QD62E có tầng ngõ ra source: tải đấu về 0 V, khác QD62 sink.

## 3. Sơ đồ tham chiếu

- Dùng [QD62](/q/modules/m/qd62) cho toàn bộ phương pháp đếm, bảng chân, thông số và cách đấu encoder. Áp dụng nguyên văn phần đếm và bảng chân.
- Không áp dụng chiều tầng ngõ ra sink của QD62; QD62E là source, tải đấu về 0 V.
- QD62D dùng ngõ vi sai RS-422-A, không dùng chung sơ đồ chân với QD62/QD62E.

## 4. Sơ đồ mạch vào/ra của hãng

Bảng giao diện ngoài và mạch trong của hãng cho QD62E nằm trong SH-080036 §3.5 (tr. 3-13): <SourceRef doc="sh080036" page="3-13" />.

<ManualFigure
  src="/img/manual/qd62e-terminals.webp"
  alt="Bảng giao diện QD62E: số đầu cực A20–B01, tên tín hiệu và mạch trong"
  caption="Bảng đầu cực và mạch trong của hãng cho QD62E — đầu nối 40 chân (A20/B20)"
  doc="SH-080036"
  section="§3.5"
  page="3-13"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080036/sh080036q.pdf"
/>

## 5. Đấu nối thiết bị ngoài

- Encoder open collector 24 V: đấu Phase A 24 V (A20) và Phase B 24 V (A18); ABCOM theo sơ đồ.
- Encoder line driver 5 V: đấu cặp 5 V (A19/A17) hoặc dùng QD62D cho vi sai.
- Giữ dây xung cách dây động lực ≥150 mm; xung nhiễu làm module đếm sai.
- Nối vỏ bọc một điểm phía encoder, không nối đất hai đầu.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] Chỉ đấu một cặp mức xung 24/12/5 V cho mỗi kênh.
- [ ] ABCOM không dùng làm 0 V nguồn tải.
- [ ] Encoder đúng loại open collector hoặc line driver.
- [ ] Dây xung cách dây động lực ≥150 mm.
- [ ] Vỏ bọc nối đất một đầu phía encoder.
- [ ] Đã kiểm tra xung bằng cách quay chậm trục encoder.
- [ ] Ngõ ra source đấu tải về 0 V, không đấu như QD62 sink.
