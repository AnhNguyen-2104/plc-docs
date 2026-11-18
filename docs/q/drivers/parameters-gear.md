---
title: Thông số & tỉ số truyền
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

<script setup>
import { prRows } from '../../.vitepress/data/modules/qd75d4.ts'
const qdRows = prRows.filter((row) => ['Pr.1', 'Pr.2', 'Pr.3', 'Pr.4'].includes(row.no))
</script>

# Thông số & tỉ số truyền

Tỉ số truyền (bánh răng điện tử) quyết định một xung lệnh làm việc dịch chuyển bao xa. Có hai nơi có thể chia tỉ lệ: QD75D4 (`Pr.2`–`Pr.4`) và driver. Nguyên tắc an toàn là **chỉ đặt tỉ lệ ở một phía**; đặt cả hai sẽ nhân đôi sai số và rất khó chẩn đoán.

## 1. Phía QD75D4 — Pr.1 đến Pr.4

<ParamTable :rows="qdRows" title="Bốn thông số nền của QD75D4" />

Địa chỉ buffer memory của bốn thông số này ở trục 1 là 0, 1, 2, 3; trục 2 cộng 150, trục 3 cộng 300, trục 4 cộng 450. Vùng thông số cơ bản là 0–15 (trục 1), 150–165 (trục 2)… theo SH-080058 §7.1.2 p.7-5 và Appendix 13 p. Appendix-150. `Pr.5` (kiểu xung ra) nằm ở địa chỉ 4 với trục 1 (SH-080058 §5.2.1 p.5-21). Vùng 1500–1550 là control data (`Cd.`), không phải thông số (SH-080058 §7.1.2 p.7-5).

Manual định nghĩa `Movement amount per pulse = Al / Ap`, trong đó `Al` là Pr.3 đếm theo LSB của Pr.1 và `AL = Al × Pr.4` (SH-080058 §5.2.1 p.5-19). Đảo lại để ra số xung trên một đơn vị:

```text
pulse/mm = Pr.2 × 10000 / (Pr.3 × Pr.4)
```

- `Pr.2` là số xung cấp cho một vòng động cơ, phải khớp với số xung mà driver nhận trong một vòng (SH-080058 §5.2.1 p.5-19).
- `Pr.3` là quãng đường cơ khí mỗi vòng. Khi `Pr.1 = 0` (mm), manual giới hạn 0,1…6553,5 µm nếu nhập bằng thiết bị ngoại vi, hoặc 1…65535 theo đơn vị 0,1 µm nếu ghi bằng chương trình (SH-080058 §5.2.1 p.5-19). Vì vậy 5 mm tương ứng 5000,0 µm hoặc 50000 (×0,1 µm).
- `Pr.4` chỉ nhận 1 / 10 / 100 / 1000 để hạ `Pr.3` vào dải cho phép (SH-080058 §5.2.1 p.5-20).

## 2. Ví dụ: trục vít me 5 mm, 1 xung = 10 µm

Mục tiêu 100 xung/mm, tức 500 xung cho một vòng 5 mm.

| Phía | Thông số | Giá trị | Cách tính / nguồn |
| --- | --- | --- | --- |
| QD75D4 | Pr.1 | 0 | Đơn vị mm (SH-080058 §5.2.1 p.5-18) |
| QD75D4 | Pr.2 | 500 | Số xung lệnh mỗi vòng |
| QD75D4 | Pr.3 | 50000 | 5 mm ghi theo 0,1 µm (5000,0 µm nếu nhập ngoại vi) (SH-080058 §5.2.1 p.5-19) |
| QD75D4 | Pr.4 | 1 | Hệ số 1 |
| QD75D4 | Kết quả | 100 pulse/mm | 500 × 10000 / (50000 × 1) = 100 |

Phía MR-J4-A phải nhận 500 xung lệnh cho một vòng. Encoder của MR-J4-A là 4194304 xung/vòng (SH-030143-C §7.3.1 p.7-93), nên tỉ số bánh răng điện tử:

```text
CMX/CDV = 4194304 / 500 = 1048576 / 125 ≈ 8388,6
```

Tỉ số này nằm trong dải cho phép `1/865 < CMX/CDV < 271471` và hai giá trị đều ≤ 16777215 (SH-030143-C §7.1.1 p.7-19). Công thức `CMX/CDV = Pt/ΔS` và `Pt = 4194304` lấy từ SH-030143-C §7.3.1 p.7-93.

## 3. Bánh răng điện tử phía driver

| Driver | Tham số / hiện vật | Chức năng | Trạng thái đối chiếu |
| --- | --- | --- | --- |
| Mitsubishi MR-J4-A | `PA06` (CMX), `PA07` (CDV); `PA21` chọn chế độ | Tử/mẫu bánh răng điện tử | Đã đối chiếu SH-030143-C §7.1.1 <SourceRef doc="sh030143" page="7-19" />, §7.3.1 <SourceRef doc="sh030143" page="7-93" /> |
| Delta ASDA-B2 | Cặp tham số bánh răng điện tử (danh mục yêu cầu ghi P1-44/P1-45) | Tử/mẫu tỉ số truyền | Chưa đối chiếu trang; <SourceRef doc="asda-b2" page="ASDA-B2 User Manual" text="ASDA-B2 User Manual" /> |
| Yaskawa Sigma-7 SGD7S | `Pn20E` / `Pn210` `[secondary]` | Bánh răng điện tử phía drive | Số theo bài viết nguồn; mở chương thông số của <SourceRef doc="sgd7s" page="SIEP S800001 26O" text="SIEP S800001 26O" /> để xác nhận, kể cả `Pn211` nếu có |
| Panasonic MINAS A6 | `Pr0.08` / `Pr0.09` / `Pr0.10` (theo danh mục yêu cầu) | Xung lệnh mỗi vòng và tử/mẫu | Chưa đối chiếu trang; mở chương tham số `Pr0.0x` của <SourceRef doc="minas-a6" page="SX-DSV03031" text="SX-DSV03031" /> |
| Leadshine DM542 | Nhóm DIP switch vi bước | Chọn số vi bước mỗi vòng | Chưa đối chiếu trang; mở mục DIP switch trong <SourceRef doc="dm542" page="DM542 Rev 3.0" text="DM542 Rev 3.0" /> |

Với MR-J4-A, đặt `MR Configurator2 → Parameter → Pr.PA06` (CMX) và `MR Configurator2 → Parameter → Pr.PA07` (CDV); `Pr.PA21` chọn chế độ bánh răng điện tử.

`[secondary]` nghĩa là số liệu lấy từ bài viết nguồn, chưa đối chiếu manual gốc trong phiên này.

Kiểm tra số học của bài viết nguồn: 16777216 / 500 = 33554,432, tương ứng 500 xung lệnh cho một vòng động cơ 24 bit. Con số này khớp với ví dụ 5 mm / 100 xung-mm ở trên, nhưng cách hiểu cặp `Pn20E`/`Pn210` phải được xác nhận trong bảng thông số SGD7S trước khi nạp.

## 4. Thứ tự kiểm tra

1. Chốt cơ khí: bước vít me, tỉ số hộp giảm tốc, một xung mong muốn dài bao nhiêu.
2. Chọn một phía giữ tỉ lệ — thường là QD75D4 `Pr.2`–`Pr.4` — và để driver ở tỉ số 1:1 nếu driver cho phép.
3. Nếu buộc phải dùng bánh răng điện tử của driver, đặt QD75D4 về tỉ số 1:1 và tính theo encoder của driver.
4. Chạy thử một đoạn ngắn, đo quãng đường thực, rồi hiệu chỉnh; không hiệu chỉnh đồng thời hai phía.
5. Ghi lại cả bộ giá trị QD75D4 và driver vào hồ sơ máy.

## Đọc tiếp

- [Tổng quan đấu dây driver](/q/drivers/)
- [Mitsubishi MR-J4-A](/q/drivers/mr-j4-a)
- [Thông số (Pr.) QD75D4](/q/qd75/parameters)
