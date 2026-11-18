---
title: Tổng quan đấu dây driver
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

<script setup>
import { axisRow, qd75PinoutSrc } from '../../.vitepress/data/modules/qd75-wiring.ts'
</script>

# Tổng quan đấu dây driver

QD75D4 không tự chạy động cơ: module phát ra xung lệnh vi sai, driver nhận xung, khuếch đại và quay động cơ theo đúng số xung nhận được. Trang này là điểm vào của nhóm trang đấu dây driver: nêu phần chung mà mọi driver cần, bảng so sánh năm driver đang có tài liệu, và các quy tắc cứng trước khi cấp điện.

## 1. Một driver xung cần gì từ QD75D4

- **Cặp xung vi sai F và R.** QD75D4 xuất `PULSE F+/F−` và `PULSE R+/R−`; mỗi cặp phải đi cùng nhau tới một cặp ngõ vào vi sai của driver (SH-080058 §3.4.3 p.3-26).
- **Điểm chung của cặp xung.** Tùy driver, đó là chân common của ngõ xung hoặc chân 0 V của nhóm ngõ vào; phải nối đúng theo bảng chân của driver.
- **Ngõ vào servo-ON.** Đây **không** phải ngõ ra của QD75D4. Servo-ON lấy từ một ngõ ra transistor của PLC, đi qua ngõ vào SON/S-ON/SRV-ON của driver.
- **Ngõ ra báo trạng thái của driver.** READY (hoặc RD) báo driver sẵn sàng, ALM báo lỗi; hai tín hiệu này đi về PLC và/hoặc về chân `READY` 1A11 của QD75D4.

Điều tối quan trọng: **không đấu thẳng một cặp vi sai của QD75D4 vào ngõ vào opto 24 V**. Cặp vi sai chỉ đi vào ngõ vào vi sai (line receiver). Nếu buộc phải dùng ngõ opto, đó là chế độ open-collector và phải theo đúng điện trở hạn dòng / điện trở kéo lên mà manual của driver quy định.

## 2. Đầu cực nhóm trục 1 của QD75D4

Bảng dưới lấy trực tiếp từ tệp dữ liệu dùng chung, không chép lại số tay. Nguồn: {{ qd75PinoutSrc }}.

<table>
  <thead>
    <tr>
      <th>Đầu cực</th>
      <th>Tín hiệu (tên manual)</th>
      <th>Hướng</th>
      <th>Ghi chú</th>
      <th>Nguồn</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in axisRow" :key="row.qd75Terminal">
      <td>{{ row.qd75Terminal }}</td>
      <td>{{ row.qd75Signal }}</td>
      <td>{{ row.direction }}</td>
      <td>{{ row.note ?? '' }}</td>
      <td>{{ row.src }}</td>
    </tr>
  </tbody>
</table>

Ba điểm cần nhớ khi đọc bảng:

- Bản vẽ thứ ba đặt tên `PGO5` và `PGOCOM`; manual in **`PG05`** và **`PG0COM`** bằng số 0. Trang này dùng tên của manual.
- `READY` 1A11 có điểm chung riêng là `RDYCOM` 1A12 (SH-080058 §3.4.3 p.3-27); bảng trên chỉ liệt kê bảy đầu cực theo yêu cầu, không thay thế bảng chân đầy đủ trong manual.
- Các trục 2–4 dùng cùng cấu trúc với tiền tố `2A`, `2B`, `3A`, `3B`, `4A`, `4B` (SH-080058 §3.4.2 p.3-25).

## 3. So sánh năm driver đang có tài liệu

| Hãng | Dòng | Ngõ vào xung | Đầu nối điều khiển | Nguồn bảng chân |
| --- | --- | --- | --- | --- |
| Mitsubishi Electric | MR-J4-A | Vi sai (line driver); chọn dạng xung bằng PA13: PULSE/SIGN, CW/CCW, A/B | CN1 | §2.2 <SourceRef doc="sh030143" page="2-17" /> |
| Delta Electronics | ASDA-B2 | Line driver 500 kpps; open collector 200 kpps | CN1 | <SourceRef doc="asda-b2" page="3-18…3-22" /> <em>[secondary]</em> |
| Yaskawa | Sigma-7 SGD7S (analog/pulse, 200 V) | Line driver 4 Mpps (sign+pulse, CW+CCW); 1 Mpps (2-phase); open collector 200 kpps | CN1 | <SourceRef doc="sgd7s" page="4-35…4-38" /> |
| Panasonic | MINAS A6 | Line driver 8 Mpps; nhánh opto 500 kpps (line driver) / 200 kpps (open collector) | Đầu nối điều khiển — tên đầu nối: tra SX-DSV03025 p.45 | SX-DSV03025 p.45; SX-DSV03031 (functional) |
| Leadshine | DM542 | Quang cách, nhận 4,5–5 V hoặc 24 V; luôn là pulse + direction | Khối đầu cực P1 (không phải CN1) | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |

`[secondary]` nghĩa là bảng chân lấy từ bản PDF lưu hành lại, không phải bản phát hành gốc của hãng; đối chiếu lại trước khi đấu máy thật.

Tham số dạng xung của MR-J4-A khai báo bằng `MR Configurator2 → Parameter → Pr.PA13`; các driver còn lại dùng nhãn menu tương ứng trong phần mềm của hãng (tra bản đang dùng).

## 4. Quy tắc cứng

- Tối đa **2 dây trên một điểm đầu cực**; không nhồi dây trung gian.
- Vỏ bọc cáp tín hiệu nối đất **một đầu** để tránh vòng đất.
- Cáp xung đi riêng khỏi cáp động lực và cáp phanh; không bó chung.
- Dừng khẩn cấp phải cắt nguồn động lực/driver **độc lập với PLC**, không đi qua phần mềm.
- Mỗi nhóm tín hiệu dùng một nguồn 24 V có cầu chì riêng; không đấu chung nguồn nội của driver với nguồn ngoài (ASDA-B2: VDD 17 chỉ dùng khi không cấp nguồn ngoài).
- Chế độ xung và mức logic phải khớp hai phía: QD75D4 `Pr.5` và `Pr.23` bit 0 (SH-080058 §5.2.1 p.5-21, §5.2.3 p.5-31) so với tham số dạng xung của driver.
- Trước khi cấp điện: đo thông mạch, đo cách điện, và đối chiếu từng chân với bảng chân của cả hai manual.

## 5. Các trang driver

- [Mitsubishi MR-J4-A](/q/drivers/mr-j4-a) — bảng CN1 đã đối chiếu manual, servo-ON, READY/alarm, 24 V.
- [Delta ASDA-B2](/q/drivers/delta-b2) — PULSE/SIGN, HPULSE/HSIGN, DI/DO, VDD.
- [Yaskawa Sigma-7](/q/drivers/yaskawa-sigma7) — PULS/SIGN, /S-ON, ALM, /COIN.
- [Panasonic MINAS A6](/q/drivers/panasonic-minas-a6) — PULSH/SIGNH, opto, SRV-ON, ALM.
- [Driver step DM542](/q/drivers/stepper-dm542) — đầu cực P1, thời gian DIR, chế độ opto.
- [Thông số & tỉ số truyền](/q/drivers/parameters-gear) — Pr.1–Pr.4 của QD75D4 và bánh răng điện tử phía driver.

## Đọc tiếp

- [Đấu dây QD75D4](/q/qd75/wiring)
- [Thông số (Pr.) QD75D4](/q/qd75/parameters)
- [Tra cứu cấu hình nhanh](/q/qd75/reference)
