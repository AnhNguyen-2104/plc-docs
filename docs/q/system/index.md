---
title: Hệ thống Q hoàn chỉnh — sơ đồ tổng thể
family: q
module: q-series
status: draft
source: SH-080483
---

# Hệ thống Q hoàn chỉnh — sơ đồ tổng thể

Một hệ MELSEC Q không chỉ là CPU: nguồn, base, module I/O, module chuyển động và thiết bị ngoài liên kết với nhau bằng ba loại đường — điện áp một chiều, tín hiệu số và xung vi sai. Sơ đồ dưới đây vẽ toàn bộ rack như nó được đấu dây, trên một base `Q38B` tám vị trí.

<SystemDiagram />

## 1. Vị trí module trên base

Cấu hình dưới đây là một ví dụ tham chiếu, không phải cấu hình bắt buộc. Thứ tự thực tế do dự án quyết định; con số 5 V của từng module dùng để tính lại nguồn.

| Vị trí | Model | Vai trò | Thông số chính | Nguồn |
| --- | --- | --- | --- | --- |
| 0 | Q61P | Module nguồn, cấp 5 V nội bộ cho base và các module | Vào 100–240 VAC; ra 5 VDC 6 A; không có ngõ ra 24 V | SH-080483 §7.2.1 p.212 |
| 1 | Q03UDV | CPU điều khiển, chạy chương trình quét và Ethernet tích hợp | Tiêu thụ 5 V: 0,58 A | SH-080483 §6.2.5 p.190 |
| 2 | QX40 | 16 ngõ vào số, common dương | 24 VDC, khoảng 4 mA/điểm, 5,6 kΩ | SH-080042 §2.4 p.2-4 |
| 3 | QY40P | 16 ngõ ra transistor kiểu sink | 12–24 VDC, 0,1 A/điểm, 1,6 A/common | SH-080042 §3.5 p.3-7 |
| 4 | QD75D4 | Điều khiển vị trí 4 trục, phát xung vi sai | 5 V: 0,82 A; tối đa 1 Mpps/trục | SH-080058 §3.1 p.3-5 |
| 5 | QD62 | Đếm xung tốc độ cao 2 kênh | 5 V: 0,30 A; tối đa 200 kPPS | SH-080036 §3.1 p.3-2 |
| 6 | Q64AD | Chuyển đổi tương tự → số, 4 kênh | 5 V: 0,63 A; 16 điểm chiếm chỗ | SH-080055 §3.1.1 p.3-1 |
| 7 | QJ71E71-100 | Module Ethernet 100BASE-TX | 5 V: 0,50 A; 32 điểm chiếm chỗ | SH-080009 §3.2 p.29 |

Cột "Nguồn" chỉ rõ tài liệu và trang của từng con số; không có giá trị nào được suy ra từ catalog khác.

Sơ đồ đánh số 0–7 cho tám vị trí đang dùng của cấu hình tham chiếu (nguồn, CPU và sáu module I/O). Manual ghi Q38B có 8 vị trí I/O, chưa kể vị trí nguồn và CPU, nên một rack thực còn 2 vị trí I/O trống (SH-080483 §8.3 p.249).

Danh pháp base chính Q38B theo hãng: khe cắm module (1), nắp base (2), connector module (3), lỗ vít cố định module (4), lỗ lắp đặt (5), lỗ adapter DIN (6), cùng thứ tự khe I/O0–I/O11.

<ManualFigure
  src="/img/manual/qsb-base.webp"
  alt="Hình dạng base chính Q38B: các khe I/O0 đến I/O11, CPU, POWER và các lỗ lắp đặt"
  caption="Base chính Q38B: thứ tự khe I/O0–I/O11 và các vị trí lắp đặt"
  doc="SH-080483"
  section="§8.1"
  page="239"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080483/sh080483bc.pdf"
/>

## 2. Đường tín hiệu

- **AC → Q61P → 5 V nội bộ.** Điện áp 100–240 VAC vào cực L/N của Q61P; module tạo ra 5 VDC cấp cho bus của base và mọi module gắn trên đó. Dòng 5 V của cả rack phải nằm dưới định mức 6 A (SH-080483 §7.2.1 p.212, §7.2.3 p.231).
- **24 V ngoài cho I/O.** Q61P loại tiêu chuẩn không có ngõ ra 24 V, nên nhóm I/O dùng nguồn 24 VDC riêng; dây 24 V đi riêng với dây 100/200 VAC (SH-080483 §4.8.2 p.111; SH-080042 §1.2.6 p.1-17).
- **X vào.** Cảm biến và nút nhấn đưa tín hiệu về QX40; ngõ vào là photocoupler, dòng khoảng 4 mA ở 24 VDC (SH-080042 §2.4 p.2-4).
- **Y ra.** QY40P kéo cực âm của tải về 0 V (kiểu sink), mỗi điểm 0,1 A và mỗi common 1,6 A; tải cảm cần diode song song (SH-080042 §3.5 p.3-7, §1.2.2 p.1-5).
- **Xung ra amplifier.** QD75D4 phát các cặp xung vi sai F+/F− và R+/R− tới MR-J4-A; khoảng cách tối đa 10 m với kiểu vi sai (SH-080058 §3.1 p.3-5, §3.4.3 p.3-26).
- **Ethernet tới HMI/PC.** QJ71E71-100 nối 100BASE-TX, tối đa 100 m mỗi đoạn cáp (SH-080009 §3.2 p.29).

## 3. Thay module

Thêm hoặc đổi một module chỉ cần hai bước: thêm một mục vào bảng đăng ký module của site, và thêm một trang mô tả module đó. Sơ đồ tổng thể không cần vẽ lại — mỗi vị trí trên base là một ô độc lập, tên module lấy từ dữ liệu chứ không viết cứng trong hình.

Khi thay module thật trên rack, luôn tính lại dòng 5 V (xem [Nguồn và base unit](./power-and-base)) và kiểm tra lại kiểu common của ngõ vào trước khi đấu dây (xem [Đấu dây vào/ra](./io-wiring)).
