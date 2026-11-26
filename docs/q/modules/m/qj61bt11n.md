---
title: "QJ61BT11N — Module truyền thông"
family: q
module: module-qj61bt11n
status: draft
source: SH-080016
---

<script setup>
const ccInputs = [
  { signal: 'DA', pin: 'DA', device: 'Cáp CC-Link — dây tín hiệu A (xanh dương)' },
  { signal: 'DB', pin: 'DB', device: 'Cáp CC-Link — dây tín hiệu B (trắng)' },
  { signal: 'DG', pin: 'DG', device: 'Đất tín hiệu (vàng)' },
  { signal: 'SLD', pin: 'SLD', device: 'Vỏ chống nhiễu — nối trong module với FG' }
]
const ccOutputs = [
  { signal: 'FG', pin: '(FG)', device: 'Đất khung, nối đất kiểu D hai đầu tuyến' },
  { signal: '110 Ω', pin: 'DA–DB', device: 'Điện trở kết thúc tại hai trạm đầu tuyến' }
]
</script>

<ModulePage id="qj61bt11n" />

## 1. Nhóm tín hiệu cần đấu

QJ61BT11N là module master/local CC-Link trên bus RS-485. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Cáp bus | DA, DB | hai chiều | Cáp CC-Link chuyên dụng; DA xanh dương, DB trắng (SH-080016 §7.3 p.7-6) |
| Đất tín hiệu | DG | — | Dây vàng (SH-080016 §7.3 p.7-6) |
| Che | SLD | — | Vỏ chống nhiễu, nối FG trong module (SH-080016 §7.3 p.7-6) |
| Đất khung | (FG) | — | Nối đất kiểu D hai đầu tuyến (SH-080016 §7.5 p.7-9) |
| Điện trở kết thúc | 110 Ω / 130 Ω | — | Giữa DA và DB ở hai đầu tuyến (SH-080016 §7.5 p.7-9) |

### Thông số

| Hạng mục | Giá trị | Nguồn |
| --- | --- | --- |
| Tốc độ truyền | 156 k / 625 k / 2,5 M / 5 M / 10 Mbps | SH-080016 §3.1 p.3-1 |
| Số trạm tối đa (master) | 64 | SH-080016 §3.1 p.3-1 |
| Số trạm chiếm dụng (local) | 1–4 | SH-080016 §3.1 p.3-1 |
| Điểm link tối đa/hệ thống | RX 2048, RY 2048, RWw 256, RWr 256 | SH-080016 §3.1 p.3-1 |
| Điểm link mỗi trạm | RX 32, RY 32 (local 30), RWw 4, RWr 4 | SH-080016 §3.1 p.3-1 |
| Phương thức truyền | Bus (RS-485), đồng bộ cờ | SH-080016 §3.1 p.3-1 |
| Mã hoá | NRZI, khung HDLC | SH-080016 §3.1 p.3-1 |
| Cáp | CC-Link dedicated / dedicated high performance / Ver.1.10 | SH-080016 §3.1 p.3-1 |

### Chiều dài tuyến

| Tốc độ | Chiều dài tổng tối đa | Chiều dài giữa hai trạm |
| --- | --- | --- |
| 156 kbps | 1200 m | — |
| 625 kbps | 900 m | — |
| 2,5 Mbps | 400 m | — |
| 5 Mbps | 160 m | — |
| 10 Mbps | 100 m | ≥ 20 cm |

### Đầu cực

| Đầu cực | Chức năng |
| --- | --- |
| `NC` | Không dùng |
| `DA` | Dây tín hiệu A của cáp CC-Link (xanh dương) |
| `DB` | Dây tín hiệu B của cáp CC-Link (trắng) |
| `NC` | Không dùng |
| `SLD` | Vỏ chống nhiễu (vàng) |
| `DG` | Đất tín hiệu |
| `(FG)` | Đất khung |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** khối đấu dây CC-Link — DA/DB/SLD/DG/FG cho tuyến CC-Link (SH-080016 §7.3, p. 7-4).
- Nối dây daisy-chain qua từng trạm; không đấu hình sao (SH-080016 §7.5 (5) p.7-9).
- Điện trở kết thúc đặt ở cả hai đầu tuyến, giữa DA và DB (SH-080016 §7.5 (2) p.7-9).
- Trị số theo cáp: 110 Ω cho CC-Link dedicated/Ver.1.10, 130 Ω cho dedicated high-performance (SH-080016 §7.5 (3) p.7-9).
- Không trộn hai loại cáp trên cùng tuyến; nối vỏ vào SLD từng module và nối đất hai đầu bằng FG kiểu D.
- Nhánh T chỉ dùng cho 156/625 kbps (SH-080016 §7.6.2 p.7-12).

### Công tắc cài đặt

| Công tắc | Nội dung | Giá trị |
| --- | --- | --- |
| `STATION NO. ×10` | Hàng chục của số trạm | 0–6 |
| `STATION NO. ×1` | Hàng đơn vị của số trạm | 0–9 |
| `MODE` | Tốc độ + chế độ hoạt động | `0`–`F` |

| Mã | Tốc độ | Chế độ |
| --- | --- | --- |
| `0` | 156 kbps | Online |
| `1` | 625 kbps | Online |
| `2` | 2,5 Mbps | Online |
| `3` | 5 Mbps | Online |
| `4` | 10 Mbps | Online |
| `5` | 156 kbps | Line test |
| `6` | 625 kbps | Line test |
| `7` | 2,5 Mbps | Line test |
| `8` | 5 Mbps | Line test |
| `9` | 10 Mbps | Line test |
| `A` | 156 kbps | Hardware test |
| `B` | 625 kbps | Hardware test |
| `C` | 2,5 Mbps | Hardware test |
| `D` | 5 Mbps | Hardware test |
| `E` | 10 Mbps | Hardware test |
| `F` | — | Không cho phép |

## 3. Sơ đồ tham chiếu

- QJ61BT11N là trang mẫu CC-Link. [QJ71C24N](/q/modules/m/qj71c24n) là nối tiếp RS-232/422; không áp dụng đầu cực DA/DB hay điện trở kết thúc CC-Link.
- [QJ71E71-100](/q/modules/m/qj71e71-100) là Ethernet; không áp dụng cho bus RS-485.
- Cùng một tuyến chỉ dùng một master; master được phép nằm giữa tuyến.

## 4. Sơ đồ mạch vào/ra của hãng

Hình mặt module, khối đầu cực và sơ đồ nối tuyến của hãng:

<ManualFigure
  src="/img/manual/cclink-module.webp"
  alt="Mặt module QJ61BT11: đèn LED, công tắc số trạm, công tắc MODE và khối đầu cực"
  caption="Mặt module QJ61BT11: LED, công tắc số trạm, MODE và khối đầu cực — khối đấu dây CC-Link"
  doc="SH-080016"
  section="§7.3"
  page="7-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080016/sh080016e.pdf"
/>

<ManualFigure
  src="/img/manual/cclink-terminal.webp"
  alt="Khối đầu cực CC-Link: NC, DA, DB, NC, SLD, DG, FG"
  caption="Khối đầu cực CC-Link: NC–DA–DB–NC–SLD–DG–FG — khối đấu dây CC-Link"
  doc="SH-080016"
  section="§7.3"
  page="7-6"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080016/sh080016e.pdf"
/>

<ManualFigure
  src="/img/manual/cclink-wiring.webp"
  alt="Sơ đồ nối CC-Link: master ở giữa, hai trạm remote hai đầu, điện trở kết thúc"
  caption="Nối tuyến CC-Link: master ở giữa, điện trở kết thúc hai đầu — khối đấu dây CC-Link"
  doc="SH-080016"
  section="§7.5"
  page="7-9"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080016/sh080016e.pdf"
/>

Nguồn: <SourceRef doc="sh080016" page="7.3" />.

## 5. Đấu nối thiết bị ngoài

- Thiết bị ngoài là các trạm remote I/O, remote device hoặc local trên cùng tuyến CC-Link.
- Dùng cáp CC-Link chuyên dụng; không dùng cáp thường hoặc trộn loại cáp.
- Điện trở kết thúc 110 Ω hoặc 130 Ω tại hai trạm đầu tuyến; không lắp ở trạm giữa.
- Tốc độ phải khớp chiều dài tuyến thực tế và mọi trạm cùng tốc độ.

### Chẩn đoán bằng LED

| Hiện tượng | Nguyên nhân thường gặp | Nguồn |
| --- | --- | --- |
| `ERR.` sáng | Cài đặt công tắc sai, nhiều master trên tuyến, tham số sai, đứt cáp | SH-080016 §7.3 p.7-5 |
| `ERR.` nhấp nháy | Có một trạm lỗi truyền thông | SH-080016 §7.3 p.7-5 |
| `L ERR.` nhấp nháy không đều | Thiếu điện trở kết thúc hoặc nhiễu trên cáp | SH-080016 §7.3 p.7-5 |
| `L RUN` tắt | Data link chưa chạy | SH-080016 §7.3 p.7-5 |

## 6. Checklist trước khi cấp điện

- [ ] Điện trở kết thúc ở cả hai đầu tuyến, giữa DA và DB.
- [ ] Trị số điện trở đúng loại cáp: 110 Ω hoặc 130 Ω.
- [ ] Không trộn hai loại cáp trên cùng tuyến.
- [ ] SLD nối vỏ chống nhiễu từng module; FG nối đất hai đầu.
- [ ] Không đấu hình sao; chỉ daisy-chain hoặc T nhánh ở 156/625 kbps.
- [ ] Số trạm duy nhất, master đặt 00.
- [ ] Tốc độ khớp chiều dài tuyến thực tế.
- [ ] Đã chạy hardware test từng module trước khi ghép tuyến.
