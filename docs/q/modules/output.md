---
title: Module ra số MELSEC Q — danh sách module
family: q
module: q-series
status: draft
source: SH-080042
---

# Module ra số MELSEC Q — danh sách module

<ModulePhoto id="qy40p" />

<ModulePhoto id="qy41h" />

Trang này liệt kê 17 module ngõ ra số của dòng MELSEC Q được tài liệu hoá trong SH-080042, gồm các model QY…. Mỗi model có trang riêng trong danh sách dưới đây để tra thông số tóm tắt và quy tắc đấu dây; [QY40P](/q/modules/m/qy40p) và [QY10](/q/modules/m/qy10) có thêm sơ đồ chân, mạch ra và thông số đầy đủ. Cách chọn kiểu ra sink/source theo tải nằm ở [Đấu dây vào/ra](/q/system/io-wiring).

## Danh sách module

| Model | Điểm | Vai trò | Manual |
| --- | --- | --- | --- |
| [QY40P](/q/modules/m/qy40p) | 16 | 16 điểm ra transistor kiểu sink | SH-080042 §3.5 |
| [QY10](/q/modules/m/qy10) | 16 | 16 ngõ ra tiếp điểm rơ le, 8 A/common | SH-080042 §3-1 |
| [QY10-TS](/q/modules/m/qy10ts) | 16 | 16 ngõ ra tiếp điểm rơ le, khối đấu dây lò xo (-TS) | SH-080042 §3-2 |
| [QY18A](/q/modules/m/qy18a) | 8 | 8 ngõ ra tiếp điểm rơ le, độc lập từng điểm | SH-080042 §3-4 |
| [QY22](/q/modules/m/qy22) | 16 | 16 ngõ ra TRIAC 100–240 VAC | SH-080042 §3-5 |
| [QY40P-TS](/q/modules/m/qy40pts) | 16 | 16 ngõ ra transistor sink, khối đấu dây lò xo (-TS) | SH-080042 §3-8 |
| [QY41H](/q/modules/m/qy41h) | 32 | 32 ngõ ra transistor sink, đáp ứng nhanh (H) | SH-080042 §3-10 |
| [QY41P](/q/modules/m/qy41p) | 32 | 32 ngõ ra transistor sink | SH-080042 §3-11 |
| [QY42P](/q/modules/m/qy42p) | 64 | 64 ngõ ra transistor sink | SH-080042 §3-12 |
| [QY50](/q/modules/m/qy50) | 16 | 16 ngõ ra transistor sink 0,5 A/điểm | SH-080042 §3-13 |
| [QY68A](/q/modules/m/qy68a) | 8 | 8 ngõ ra transistor sink/source, độc lập từng điểm | SH-080042 §3-15 |
| [QY70](/q/modules/m/qy70) | 16 | 16 ngõ ra transistor sink, 5/12 VDC | SH-080042 §3-16 |
| [QY71](/q/modules/m/qy71) | 32 | 32 ngõ ra transistor sink, 5/12 VDC | SH-080042 §3-18 |
| [QY80](/q/modules/m/qy80) | 16 | 16 ngõ ra transistor source | SH-080042 §3-19 |
| [QY80-TS](/q/modules/m/qy80ts) | 16 | 16 ngõ ra transistor source, khối đấu dây lò xo (-TS) | SH-080042 §3-21 |
| [QY81P](/q/modules/m/qy81p) | 32 | 32 ngõ ra transistor source | SH-080042 §3-23 |
| [QY82P](/q/modules/m/qy82p) | 64 | 64 ngõ ra transistor source | SH-080042 §3-24 |

## 1. Mạch ra của hãng

Sơ đồ mạch ra rơ-le QY10 và mạch ra transistor QY40P nằm ở [trang QY10](/q/modules/m/qy10) và [trang QY40P](/q/modules/m/qy40p). Chọn kiểu ra theo tải: tiếp điểm rơ le cho tải AC/DC cách ly, transistor sink/source cho tải DC đóng cắt nhanh; TRIAC cho tải AC.

## 2. Nguồn

- Vị trí khe, dòng tiêu thụ hệ thống và giới hạn base: <SourceRef doc="sh080483" page="8.3" />.
- Nguồn của từng model: xem mục "Nguồn" trên trang model tương ứng.

Sơ đồ mạch đấu dây thực tế (tải, diode dập xung, nguồn tải) nằm ở [Đấu dây vào/ra](/q/system/io-wiring).

