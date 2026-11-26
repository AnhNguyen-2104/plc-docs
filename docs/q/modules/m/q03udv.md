---
title: "Q03UDV — CPU"
family: q
module: module-q03udv
status: draft
source: SH-080483
---

<ModulePage id="q03udv" />

## 1. Nhóm tín hiệu cần đấu

Q03UDVCPU là CPU Universal model Q. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Nguồn vào | L, N | nguồn → CPU | Chỉ Q00UJCPU có nguồn tích hợp; Q03UDV/Q06UDH nhận 5 V qua base (SH-080483 §1.1 p.26) |
| Nối đất | LG, FG | — | Nối đất ≤100 Ω; LG mang một nửa điện áp vào (SH-080483 §4.8.1 p.110) |
| Ngõ 24 VDC phụ | 24 VDC | module nguồn → tải nhỏ | Q62P cấp 0,6 A; Q61P/Q63P/Q64P không có ngõ 24 V (SH-080483 §7.2.1 p.213–215) |
| Pin | Pin giữ chương trình | — | Nắp pin mặt CPU; thay khi đã cắt nguồn (SH-080483 §6.1.3 p.138) |
| Công tắc | RUN/STOP | — | Công tắc mặt CPU, không đấu dây |
| Cổng lập trình | USB miniB + Ethernet RJ45 | hai chiều | Đèn 100M sáng khi nối 100 Mbps (SH-080483 §6.1.3 p.130/140/143) |
| Bus nội bộ | Đầu nối base | CPU ↔ base | Cắm vào khe CPU, không đấu dây tay |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** cổng USB + Ethernet RJ45 — cổng USB và cổng Ethernet RJ45 trên mặt CPU (SH-080483 §6.1.3, p. 141).
- Q00UJCPU cấp nguồn trực tiếp vào L/N; Q03UDV và Q06UDH không có cực nguồn trường, nhận nguồn 5 V qua base từ module nguồn.
- Nguồn 5 V là nguồn nội bộ của base, không đấu dây trường vào đường này.
- Công tắc RUN/STOP, nắp pin và cổng lập trình nằm trên mặt CPU; không đấu dây vào các vị trí này.
- Nối LG và FG rồi nối đất; điện trở đất ≤100 Ω, dây đất tối đa 2 mm² (SH-080483 §4.8.4 p.118).
- Cáp lập trình đi cách dây động lực; cố định cáp để tránh lực kéo lên cổng.

## 3. Sơ đồ tham chiếu

- Nguồn và nối đất: dùng [Q61P](/q/modules/m/q61p) và [Nguồn và base](/q/system/power-and-base). Áp dụng L/N, LG/FG và cầu chì; không áp dụng nguồn 5 V như dây trường.
- Khe cắm: dùng [Q312B](/q/modules/m/q312b). Áp dụng cách cắm CPU vào khe CPU; không đấu tín hiệu vào base.
- Ethernet: [QJ71E71-100](/q/modules/m/qj71e71-100) cho kiểu RJ45. Chỉ áp dụng kiểu cáp/đầu nối; không áp dụng bảng địa chỉ buffer của module Ethernet cho cổng tích hợp.
- RS-232: [QJ71C24N](/q/modules/m/qj71c24n) cho D-sub 9. Chỉ đối chiếu kiểu đầu nối; không áp dụng bảng chân của QJ71C24N cho cổng CPU.

## 4. Sơ đồ mạch vào/ra của hãng

Hình mặt CPU, vị trí cổng, LED và nắp pin của Q03UDVCPU nằm trong SH-080483 §6.1.3 (tr. 141): <SourceRef doc="sh080483" page="141" />.

<ManualFigure
  src="/img/manual/q03udv-parts.webp"
  alt="Mặt Q03UDVCPU: LED, cổng USB/RS-232/Ethernet, nắp pin và đầu nối"
  caption="Tên bộ phận và cổng của hãng cho Q03UDVCPU — cổng USB + Ethernet RJ45"
  doc="SH-080483"
  section="§6.1.3"
  page="141"
  pdf-url="https://www.mitsubishielectric.com/dl/fa/document/manual/plc/sh080483eng/sh080483engbc.pdf"
/>

Hình nhóm CPU cũng có ở [nhóm CPU](/q/modules/cpu).

## 5. Đấu nối thiết bị ngoài

- Nguồn xoay chiều cho Q00UJCPU: qua cầu dao/cầu chì riêng, đúng điện áp vào theo SH-080483 §1.1.
- Q03UDV/Q06UDH: kiểm tra tổng dòng 5 V của rack nằm dưới định mức module nguồn trước khi cắm CPU.
- Cáp USB miniB cho Q03UDV/Q06UDH; cáp Ethernet thẳng tới hub/switch cho Q03UDV; cáp D-sub 9 cho Q06UDH.
- Pin giữ chương trình lắp đúng chiều và đúng ngăn; thay pin khi cắt nguồn.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] CPU cắm đúng khe CPU trên base, chốt giữ đã khóa.
- [ ] Điện áp nguồn vào đúng dải của model.
- [ ] LG và FG đã nối đất, điện trở đất ≤100 Ω.
- [ ] Tổng dòng 5 V của rack nằm trong định mức module nguồn.
- [ ] Pin giữ chương trình đã lắp đúng.
- [ ] Công tắc RUN/STOP ở STOP trước khi nạp chương trình.
- [ ] Cáp lập trình cắm đúng cổng, không chịu lực kéo.
- [ ] Không có dây trường đấu vào nguồn 5 V.
