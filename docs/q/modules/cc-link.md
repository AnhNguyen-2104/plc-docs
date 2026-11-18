---
title: QJ61BT11N — module CC-Link master/local
family: q
module: q-series
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

# QJ61BT11N — module CC-Link master/local

Phạm vi nguồn: tài liệu có trên đĩa (SH-080016e) là manual của **QJ61BT11**. Các giá trị trong trang này lấy từ manual đó; khác biệt riêng của QJ61BT11N: **chưa xác minh**.

QJ61BT11N là module master/local của CC-Link gắn trên base MELSEC Q, trao đổi dữ liệu cyclic với tối đa 64 trạm trên một tuyến bus RS-485. Module đóng vai trò master khi số trạm bằng 0, hoặc local khi có số trạm 1–64.

Trang này mô tả thông số, đầu cực, công tắc và checklist đấu tuyến. Nội dung lập trình tham số nằm trong SH-080016.

## 1. Thông số

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

Ràng buộc số trạm: `{(1×a) + (2×b) + (3×c) + (4×d)} ≤ 64`, với a/b/c/d là số module chiếm 1/2/3/4 trạm; và `{(16×A) + (54×B) + (88×C)} ≤ 2304`, với A ≤ 64 trạm remote I/O, B ≤ 42 trạm remote device, C ≤ 26 trạm local/standby master/intelligent — SH-080016 §3.1 p.3-1.

Chiều dài tuyến tối đa theo tốc độ (toàn hệ thống dùng module và cáp Ver.1.10) — SH-080016 §3.1.2 p.3-4:

| Tốc độ | Chiều dài tổng tối đa | Chiều dài giữa hai trạm |
| --- | --- | --- |
| 156 kbps | 1200 m | — |
| 625 kbps | 900 m | — |
| 2,5 Mbps | 400 m | — |
| 5 Mbps | 160 m | — |
| 10 Mbps | 100 m | ≥ 20 cm |

Với hệ thống chỉ dùng module Ver.1.00, chiều dài tổng ngắn hơn: 625 kbps còn 600 m, 2,5 Mbps còn 200 m, 5 Mbps còn 150 m — SH-080016 §3.1.1 p.3-2. Chọn tốc độ theo chiều dài thực tế, không chọn theo tốc độ mong muốn trước.

## 2. Sơ đồ khối

<ModuleBlockDiagram
  model="QJ61BT11N"
  connector="CC-Link terminal block"
  :inputs="ccInputs"
  :outputs="ccOutputs"
/>

Sơ đồ minh hoạ master ở giữa tuyến với hai trạm remote. Master **được phép** nằm ở giữa, không bắt buộc ở đầu tuyến; chỉ điện trở kết thúc mới bắt buộc ở hai đầu — SH-080016 §7.5 (4) p.7-9.

## 3. Đầu cực và quy tắc tuyến

Khối đầu cực 2 mảnh, thứ tự từ trái sang phải — SH-080016 §7.3 p.7-6:

| Đầu cực | Chức năng |
| --- | --- |
| `NC` | Không dùng |
| `DA` | Dây tín hiệu A của cáp CC-Link (xanh dương) |
| `DB` | Dây tín hiệu B của cáp CC-Link (trắng) |
| `NC` | Không dùng |
| `SLD` | Vỏ chống nhiễu (vàng) |
| `DG` | Đất tín hiệu |
| `(FG)` | Đất khung |

`SLD` và `FG` đã nối với nhau bên trong module — SH-080016 §7.3 p.7-6.

Quy tắc:

- Nối dây daisy-chain qua từng trạm. **Không** đấu hình sao — SH-080016 §7.5 (5) p.7-9.
- Điện trở kết thúc đặt **ở cả hai đầu tuyến**, nối giữa `DA` và `DB` — SH-080016 §7.5 (2) p.7-9.
- Trị số điện trở theo loại cáp: 110 Ω 1/2 W (nâu–nâu–nâu) cho CC-Link dedicated và Ver.1.10; 130 Ω 1/2 W (nâu–cam–nâu) cho dedicated high-performance — SH-080016 §7.5 (3) p.7-9.
- Không trộn cáp dedicated với dedicated high-performance trên cùng tuyến — SH-080016 §7.5 IMPORTANT p.7-9.
- Nối vỏ chống nhiễu vào `SLD` từng module và nối đất **hai đầu** bằng `FG` kiểu D — SH-080016 §7.5 POINT p.7-9.

Nhánh T chỉ dùng cho 156 kbps và 625 kbps; 10 M/5 M/2,5 Mbps không cho phép — SH-080016 §7.6.2 p.7-12.

## 4. Công tắc cài đặt

Hai nhóm công tắc quay trên mặt module — SH-080016 §7.3 p.7-5 và p.7-6:

| Công tắc | Nội dung | Giá trị |
| --- | --- | --- |
| `STATION NO. ×10` | Hàng chục của số trạm | 0–6 |
| `STATION NO. ×1` | Hàng đơn vị của số trạm | 0–9 |
| `MODE` | Tốc độ + chế độ hoạt động | `0`–`F` |

Số trạm: master = `00`; local/standby master = 1–64; giá trị ngoài 0–64 làm LED `ERR.` sáng — SH-080016 §7.3 p.7-5.

`MODE` — SH-080016 §7.3 p.7-6:

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

Cài đặt chỉ có hiệu lực sau khi chuyển nguồn module OFF→ON hoặc reset CPU — SH-080016 §7.3 POINT p.7-6.

LED: `RUN`, `ERR.`, `MST`, `S MST`, `L RUN`, `L ERR.`, `SD`, `RD` — SH-080016 §7.3 p.7-5. `L ERR.` nhấp nháy đều = công tắc bị đổi khi đang cấp điện; nhấp nháy không đều = thiếu điện trở kết thúc hoặc nhiễu.

## 5. Chẩn đoán nhanh bằng LED

| Hiện tượng | Nguyên nhân thường gặp | Nguồn |
| --- | --- | --- |
| `ERR.` sáng | Cài đặt công tắc sai, nhiều master trên tuyến, tham số sai, đứt cáp | SH-080016 §7.3 p.7-5 |
| `ERR.` nhấp nháy | Có một trạm lỗi truyền thông | SH-080016 §7.3 p.7-5 |
| `L ERR.` nhấp nháy không đều | Thiếu điện trở kết thúc hoặc nhiễu trên cáp | SH-080016 §7.3 p.7-5 |
| `L RUN` tắt | Data link chưa chạy | SH-080016 §7.3 p.7-5 |

## 6. Checklist

- [ ] Điện trở kết thúc ở **cả hai đầu** tuyến, giữa `DA` và `DB` — SH-080016 §7.5 (2) p.7-9.
- [ ] Trị số điện trở đúng loại cáp: 110 Ω hoặc 130 Ω — SH-080016 §7.5 (3) p.7-9.
- [ ] Không trộn hai loại cáp trên cùng tuyến — SH-080016 §7.5 IMPORTANT p.7-9.
- [ ] `SLD` nối vỏ chống nhiễu từng module; `FG` nối đất hai đầu — SH-080016 §7.5 POINT p.7-9.
- [ ] Không đấu hình sao; chỉ daisy-chain (hoặc T nhánh ở 156/625 kbps) — SH-080016 §7.5 (5) p.7-9.
- [ ] Số trạm duy nhất, master đặt `00` — SH-080016 §7.3 p.7-5.
- [ ] Tốc độ khớp chiều dài tuyến thực tế, mọi trạm cùng tốc độ — SH-080016 §3.1.2 p.3-4.
- [ ] Chạy hardware test từng module trước khi ghép tuyến — SH-080016 §7.4 p.7-7.

## 7. Đọc tiếp

- Tham số mạng, auto refresh và chương trình mẫu: SH-080016 chương 6 và 9–11.
- Tra mã lỗi và chẩn đoán CC-Link: SH-080016 chương 13.
- Các module khác của họ Q: [MELSEC Q](/q/).
