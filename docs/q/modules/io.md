---
title: Module kết hợp vào/ra MELSEC Q — danh sách module
family: q
module: q-series
status: draft
source: SH-080042
---

# Module kết hợp vào/ra MELSEC Q — danh sách module

<ModulePhoto id="qh42p" />

Trang này gộp ba module kết hợp vào/ra của dòng MELSEC Q được tài liệu hoá trong SH-080042. Mỗi module đặt một nhóm vào cố định và một nhóm ra cố định trên cùng một vỏ, nên chỉ chiếm một khe và một địa chỉ đầu nhưng mang cả hai loại điểm. Module thuần vào nằm ở [Module vào số](/q/modules/input), module thuần ra nằm ở [Module ra số](/q/modules/output).

## Danh sách module

| Model | Điểm vào | Điểm ra | Ghi chú | Nguồn |
| --- | --- | --- | --- | --- |
| [QH42P](/q/modules/m/qh42p) | 32 vào 24 VDC | 32 ra transistor sink | Kết hợp 32 vào + 32 ra trên một module | SH-080042 §4.1 p.4-1 |
| [QX41Y41P](/q/modules/m/qx41y41p) | 32 vào 24 VDC | 32 ra transistor sink | Cùng tỉ lệ 32 + 32 nhưng bố trí đầu cực khác QH42P | SH-080042 §4.4 p.4-4 |
| [QX48Y57](/q/modules/m/qx48y57) | 8 vào 24 VDC | 7 ra transistor sink | Module nhỏ, 8 vào + 7 ra cho cụm I/O gọn | SH-080042 §4.7 p.4-7 |

Mỗi model giữ cố định số điểm vào và số điểm ra; không thể cấu hình lại thành 64 vào hay 64 ra. Khi cần toàn vào hoặc toàn ra, dùng module thuần ở hai trang tương ứng thay vì ghép nhiều module kết hợp.

## 1. Nguồn

- Cả ba model: <SourceRef doc="sh080042" page="4" />, mục 4 trình bày sơ đồ chân và thông số từng module.
- Vị trí khe, dòng tiêu thụ hệ thống và giới hạn base: <SourceRef doc="sh080483" page="8.3" />.

Sơ đồ mạch đấu dây thực tế nằm ở [Đấu dây vào/ra](/q/system/io-wiring).
