---
title: CPU MELSEC Q — Q00UJCPU, Q03UDV, Q06UDH
family: q
module: q-series
status: draft
source: SH-080483, SH-080807
---

# CPU MELSEC Q — Q00UJCPU, Q03UDV, Q06UDH

Ba CPU dưới đây đại diện ba mức của dòng Universal model QCPU: Q00UJCPU là bản tích hợp nguồn và base cho hệ nhỏ, Q03UDVCPU thêm Ethernet tích hợp, còn Q06UDHCPU tăng gấp đôi dung lượng chương trình nhưng không có Ethernet tích hợp. Chọn CPU theo ba con số: dung lượng chương trình (bước), số điểm I/O tối đa và cổng lập trình có sẵn.

## 1. So sánh nhanh

| Hạng mục | Q00UJCPU | Q03UDVCPU | Q06UDHCPU | Nguồn |
| --- | --- | --- | --- | --- |
| Dung lượng chương trình | 10K bước | 30K bước | 60K bước | SH-080483 §1.1 p.27 |
| Số điểm I/O | 256 (X/Y0–FF) | 4096 (X/Y0–FFF) | 4096 (X/Y0–FFF) | SH-080483 §1.1 p.26 |
| Tốc độ xử lý lệnh LD | 120 ns | 1,9 ns | 9,5 ns | SH-080483 §1.1 p.28 |
| Ethernet tích hợp | Không | Có, RJ45 100/10 Mbps | Không | SH-080483 §6.1.3 p.143 |
| USB tích hợp | Chưa xác minh | Có, miniB | Có, miniB | SH-080483 §6.1.3 p.143 |
| RS-232 tích hợp | Không | Không | Có | SH-080483 §6.1.3 p.140 |
| Nguồn + base tích hợp | Có | Không | Không | SH-080483 §1.1 p.26 |
| Số module gắn tối đa | 16 (16 khe) | 64 | 64 | SH-080483 §1.1 p.26 |

Q00UJCPU là module liền nguồn và base chính, nên không cần Q61P/Q62P và base rời; đổi lại trần I/O chỉ 256 điểm và 16 khe. Q03UDV và Q06UDH là CPU rời, cần nguồn và base riêng, đổi lại lên tới 4096 điểm I/O và 64 module.

## 2. Cổng lập trình và Ethernet

| CPU | Cổng lập trình | Ghi chú | Nguồn |
| --- | --- | --- | --- |
| Q00UJCPU | Chưa xác minh trong bảng tên bộ phận | Bảng tên bộ phận không liệt kê cổng USB/RS-232 | SH-080483 §6.1.3 p.130 |
| Q03UDVCPU | USB miniB + Ethernet RJ45 | Đèn 100M sáng khi nối 100 Mbps | SH-080483 §6.1.3 p.143 |
| Q06UDHCPU | USB miniB + RS-232 (D-sub 9) | Không có cổng Ethernet trên CPU | SH-080483 §6.1.3 p.140 |

Với Q03UDV, cổng Ethernet 100/10 Mbps cho phép nạp chương trình và giám sát qua mạng mà không cần cáp USB; số kết nối đồng thời tối đa là 16 cho socket/MELSOFT/MC protocol và 1 cho FTP (SH-080483 §6.1.3 p.143). Q06UDH không có Ethernet tích hợp: muốn lên mạng phải gắn QJ71E71-100 hoặc module tương đương.

Hình CPU Universal model (Q02U/Q03UD/Q04UDH…) với vị trí cổng, pin pin, đèn LED và nắp pin:

<ManualFigure
  src="/img/manual/qcpu-module.jpg"
  alt="Mặt CPU Universal model Q: cổng USB/RS-232, đèn RUN/ERR, nắp pin và các công tắc"
  caption="Mặt CPU Universal model Q: cổng, LED và nắp pin"
  doc="SH-080483"
  section="§6.1.3"
  page="138"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080483/sh080483bc.pdf"
/>

## 3. Thời gian quét

Thời gian quét (scan time) là tổng của bốn phần: xử lý khởi tạo, refresh I/O, thực thi chương trình và xử lý END (SH-080807 §2.4 p.67). Xử lý khởi tạo chỉ chạy một lần sau khi cấp điện hoặc reset, nên không nằm trong chu kỳ quét lặp lại; ba phần còn lại lặp theo từng vòng.

Với cùng một chương trình, Q03UDV nhanh hơn Q06UDH ở lệnh LD (1,9 ns so với 9,5 ns) nhưng Q06UDH có gấp đôi dung lượng bước. Trong thực tế, thời gian quét còn phụ thuộc số module intelligent, khối lượng refresh và các lệnh truyền thông; hãy đo bằng chức năng đo scan time của GX Works2 thay vì suy từ tốc độ lệnh.

## 4. CPU cho một rack QD75D4

QD75D4 chiếm 32 điểm I/O kiểu intelligent trên base (SH-080058 §3.1 p.3-2), nên một rack 4 trục điển hình chỉ tốn 32 điểm I/O — rất nhỏ so với trần 4096 điểm. Yếu tố quyết định là dung lượng chương trình và cổng lập trình:

- **Đề xuất mặc định: Q03UDVCPU** — 30K bước, 4096 điểm, Ethernet tích hợp; đủ cho một rack Q312B (12 khe) với QD75D4, I/O số và một module mạng, đồng thời nạp/giám sát được qua Ethernet.
- **Khi chương trình vượt 30K bước: Q06UDHCPU** — 60K bước, cùng 4096 điểm; đổi lại phải thêm module Ethernet nếu cần lên mạng.
- **Không nên dùng Q00UJCPU cho rack QD75D4 nhiều module** — trần 256 điểm và 16 khe là giới hạn cứng, không đủ chỗ cho 4 trục cộng I/O vào/ra và module mạng.

Đây là khuyến nghị thiết kế, không phải yêu cầu của manual: manual chỉ ràng buộc số điểm I/O và số module tối đa. Với thiết kế mới, lưu ý QD75D4 đã ngừng sản xuất 09/2021 và bản thay thế là QD75D4N (xem [trang QD75](/q/qd75/)).

Cách tính dòng tiêu thụ 5 VDC của cả rack và chọn nguồn Q61P/Q62P/Q63P/Q64P nằm ở [Nguồn và base](/q/system/power-and-base).

## 5. Nguồn

- Dung lượng chương trình: <SourceRef doc="sh080483" page="1.1.3" />.
- Điểm I/O và số module tối đa: <SourceRef doc="sh080483" page="1.1" />.
- Cổng tích hợp: <SourceRef doc="sh080483" page="6.1.3-udv" /> (Q03UDV) và <SourceRef doc="sh080483" page="6.1.3-udh" /> (Q06UDH).
- Cấu trúc scan time: <SourceRef doc="sh080807" page="2.4" />.
