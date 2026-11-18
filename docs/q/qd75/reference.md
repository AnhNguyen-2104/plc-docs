---
title: Tra cứu cấu hình nhanh — QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { prRows, daRows, xySignals } from '../../.vitepress/data/modules/qd75d4.ts'

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')
const t = (value) => (typeof value === 'string' ? value : (value?.[isVi.value ? 'vi' : 'en'] ?? value?.vi ?? ''))
const address = (row) => [row.x, row.y].filter((value) => value && value !== '—').join(' / ')
const direction = (row) => (row.x && row.x !== '—' ? 'QD75 → CPU (X)' : 'CPU → QD75 (Y)')
</script>

# Tra cứu cấu hình nhanh — QD75D4

Trang này gom mọi thứ cần đặt cho một trục QD75D4 vào một màn hình. Gõ mã `Pr.` hoặc `Da.` vào ô lọc của bảng để tìm nhanh một thông số. Bấm ô **Nguồn** để mở đúng trang PDF của manual ngay tại chỗ. Mọi giá trị ở đây chỉ để tra cứu; trước khi nạp máy thật vẫn phải đối chiếu manual gốc và chạy thử không tải.

## 1. Pr. — thông số trục

<ParamTable :rows="prRows" title="Pr.1–Pr.56" />

Bảng có ô lọc ngay trên tiêu đề cột: gõ `Pr.5`, `pulse` hoặc `đơn vị` để thu hẹp. Cột **Nguồn** mở thẳng trang PDF tương ứng của SH-080058.

## 2. Da. — dữ liệu vị trí

<ParamTable :rows="daRows" title="Da.1–Da.10" />

Mỗi dòng Da. là một trường của một điểm chạy; cùng một bộ công thức và cùng ô lọc với bảng Pr. ở trên.

## 3. Tín hiệu X/Y

Bảng dưới lấy từ dữ liệu dùng chung của module, nguồn SH-080058 §3.3.1 (p.3-16). Địa chỉ X là ngõ vào của CPU (QD75 → CPU), địa chỉ Y là ngõ ra của CPU (CPU → QD75).

<table>
  <thead>
    <tr>
      <th>Địa chỉ</th>
      <th>Tín hiệu</th>
      <th>Hướng</th>
      <th>Nghĩa</th>
      <th>Nguồn</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in xySignals" :key="`${row.x}-${row.y}-${t(row.name)}`">
      <td>{{ address(row) }}</td>
      <td>{{ t(row.name) }} <span class="ref-axis">({{ t(row.axis) }})</span></td>
      <td>{{ direction(row) }}</td>
      <td>{{ t(row.desc) }}</td>
      <td>
        <SourceRef v-if="row.srcDoc" :doc="row.srcDoc" :page="row.srcPage" :text="row.src" />
        <SourceRef v-else doc="sh080058" page="3-16" :text="row.src" />
      </td>
    </tr>
  </tbody>
</table>

## 4. Thông số phía driver

Chỉ đặt tỉ lệ ở **một phía**: hoặc QD75D4 `Pr.2`–`Pr.4`, hoặc bánh răng điện tử của driver. Đặt cả hai sẽ nhân đôi sai số.

| Driver | Thông số phải đặt | Nguồn |
| --- | --- | --- |
| Mitsubishi MR-J4-A | `PA13` — chọn dạng xung lệnh (PULSE/SIGN, CW/CCW, A/B), phải khớp `Pr.5` của QD75D4 | SH-030143-C §2.2 p.2-17; đối chiếu logic §7.2.1 p.7-23 |
| Mitsubishi MR-J4-A | `PA06` (CMX) / `PA07` (CDV) — bánh răng điện tử (electronic gear) | SH-030143-C §7.1.1 p.7-19 |
| Delta ASDA-B2 | Dạng xung ngõ vào: theo ASDA-B2 User Manual, chương thông số — trang nội bộ chưa ghi số tham số cho mục này | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| Delta ASDA-B2 | Cặp bánh răng điện tử `P1-44` / `P1-45` (danh mục yêu cầu; chưa đối chiếu trang) | ASDA-B2 User Manual, ch. 3 (p.3-18…3-22) — chưa đối chiếu trang tham số |
| Yaskawa Sigma-7 SGD7S | Dạng xung tham chiếu: theo SIEP S800001 26O, chương thông số — trang nội bộ chưa ghi số tham số cho mục này | SIEP S800001 26O p.4-35…4-38 |
| Yaskawa Sigma-7 SGD7S | `Pn20E` / `Pn210` — bánh răng điện tử phía drive | SIEP S800001 26O p.4-35…4-38 `[secondary]` — chưa đối chiếu trang tham số |
| Panasonic MINAS A6 | Chế độ ngõ vào xung lệnh: theo SX-DSV03031, chương `Pr0.0x` — trang nội bộ chưa ghi số tham số cho mục này | SX-DSV03031 |
| Panasonic MINAS A6 | `Pr0.08` — xung lệnh mỗi vòng (danh mục yêu cầu; chưa đối chiếu trang) | SX-DSV03031 ch. Pr0.0x — chưa đối chiếu trang tham số |
| Leadshine DM542 | Nhóm DIP switch vi bước (microstep) — chưa đối chiếu trang | DM542 Rev 3.0, mục DIP switch — chưa đối chiếu trang |

`[secondary]` nghĩa là số liệu lấy từ bản PDF lưu hành lại, chưa đối chiếu bản phát hành gốc của hãng.

## 5. Checklist cấu hình theo thứ tự

1. `Parameter` — trong GX Works2 khai báo module QD75D4: vị trí slot, số trục, kiểu module; đây là nền để mọi bước sau có địa chỉ `U<base>\G<addr>` đúng.
2. `Switch Setting` — đặt công tắc/khai báo trục của module cho khớp cấu hình máy thực tế trước khi nạp chương trình.
3. `Online → Write to PLC` — nạp PLC parameter xuống CPU, sau đó reset hoặc chu kỳ nguồn để module nhận cấu hình mới.
4. `Pr.1` — chọn đơn vị trục (mm/inch/độ/xung) trước khi nhập bất kỳ địa chỉ nào.
5. `Pr.2`, `Pr.3`, `Pr.4` — số xung mỗi vòng, quãng đường mỗi vòng, hệ số đơn vị; chốt tỉ lệ ở phía QD75D4 và để driver 1:1 nếu được.
6. `Pr.5` — dạng xung (PULSE/SIGN, CW/CCW, A/B) phải trùng với tham số dạng xung của driver; kiểm tra thêm `Pr.23` bit 0 (mức logic).
7. Ghi Pr. khi Y0 còn OFF → bật Y0 để module chốt giá trị → đọc lại bằng `FROM`/`U<base>\G<addr>` để xác nhận.
8. Bảng `Da.` — nhập điểm chạy: `Da.1` mẫu vận hành, `Da.2` hệ điều khiển, `Da.6` địa chỉ/lượng di chuyển, `Da.8` tốc độ; đọc lại sau khi ghi.
9. OPR — cấu hình nhóm thông số về gốc và chạy OPR, xác nhận gốc trước khi chạy điểm thật.
10. Servo-ON — bật `SON`/`S-ON`/`SRV-ON` bằng ngõ ra transistor của PLC (không phải ngõ ra QD75D4), chờ `READY`/`RD` của driver.
11. Test — JOG tốc độ thấp, xác nhận chiều quay, kiểm tra `BUSY`/`Positioning complete`, đo quãng đường thực so với đặt.
12. Ghi hồ sơ — lưu bộ giá trị QD75D4 và driver đã dùng, kèm ngày và người thực hiện.

## Đọc tiếp

- [Thông số (Pr.) — QD75D4](/q/qd75/parameters)
- [Dữ liệu vị trí (Da.) — QD75D4](/q/qd75/position-data)
- [Tín hiệu X/Y — QD75D4](/q/qd75/io-signals)
- [Tổng quan đấu dây driver](/q/drivers/)
