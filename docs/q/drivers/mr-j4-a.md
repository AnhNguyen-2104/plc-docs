---
title: Mitsubishi MR-J4-A
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

<script setup>
const tabs = [
  {
    label: 'IL — thông số trục 1',
    code: `(* QD75D4 trục 1. Địa chỉ buffer memory ở dạng thập phân:
   Pr.1 = G0, Pr.2 = G1, Pr.3 = G2, Pr.4 = G3, Pr.5 = G4.
   Nguồn: SH-080058 §7.1.2 p.7-5; Appendix 13 p. Appendix-150.
   Pr.3 ghi bằng 0,1 µm: 5 mm = 50000 (SH-080058 §5.2.1 p.5-19). *)
LD   M8000
TO   U0\\G0  K0      K1   (* Pr.1: đơn vị mm *)
TO   U0\\G1  K500    K1   (* Pr.2: 500 pulse/vòng *)
TO   U0\\G2  K50000  K1   (* Pr.3: 5 mm, ghi bằng 0,1 µm *)
TO   U0\\G3  K1      K1   (* Pr.4: hệ số 1 *)
TO   U0\\G4  K0      K1   (* Pr.5: PULSE/SIGN, chốt ở lần Y0 ON đầu tiên *)

(* Đọc lại để xác nhận. *)
LD   M8000
FROM U0\\G2  D200  K1`
  },
  {
    label: 'IL — servo-ON',
    code: `(* Servo-ON KHÔNG phải ngõ ra của QD75D4; SON là CN1-15
   (SH-030143-C §2.2 p.2-17). Địa chỉ X/Y dưới đây chỉ là ví dụ. *)
LD   M100        (* điều kiện cho phép do chương trình định nghĩa *)
OUT  Y10         (* → DICOM 20/21 và SON 15 của MR-J4-A *)`
  }
]
</script>

# Mitsubishi MR-J4-A

Manual dùng trong trang: `SH(NA)030143ENG-C` (bản C), bìa đề `MR-J4-_A_-RJ` / `MR-J4-03A6-RJ` — "SERVO AMPLIFIER INSTRUCTION MANUAL (POSITIONING MODE)". Bìa không ghi `MR-J4-_A_` trơn, nên nếu máy dùng bản MR-J4-A thường phải đối chiếu lại bảng CN1. Số đầu cực phía QD75D4 lấy từ SH-080058.

## 1. Cặp xung QD75D4 → CN1

| QD75D4 | Tín hiệu QD75D4 | CN1 | Tín hiệu MR-J4-A | Nguồn |
| --- | --- | --- | --- | --- |
| 1A15 | PULSE F+ | 10 | PP | §3.4.1 <SourceRef doc="sh080058" page="3-24" />; §2.2 <SourceRef doc="sh030143" page="2-17" /> |
| 1A16 | PULSE F− | 11 | PG | §3.4.1 <SourceRef doc="sh080058" page="3-24" />; §2.2 <SourceRef doc="sh030143" page="2-17" /> |
| 1A17 | PULSE R+ | 35 | NP | §3.4.1 <SourceRef doc="sh080058" page="3-24" />; §2.2 <SourceRef doc="sh030143" page="2-17" /> |
| 1A18 | PULSE R− | 36 | NG | §3.4.1 <SourceRef doc="sh080058" page="3-24" />; §2.2 <SourceRef doc="sh030143" page="2-17" /> |

Bốn lưu ý bắt buộc:

- `PP` ở CN1-10 và `NP` ở CN1-35 là chân dùng chung với `DI2`/`DI3`. Muốn dùng làm ngõ xung phải gán lại bằng `Pr.PD44` và `Pr.PD46` (giá trị `0 0 _ _`), theo SH-030143-C §2.2 p.2-14 ghi chú 15–16 và §7.2.4 p.7-67. Bản thay thế `PP2/NP2` nằm ở CN1-37/38.
- Khi CN1-10/35 còn dùng làm ngõ vào số, manual yêu cầu cấp +24 V vào `OPC` (CN1-12); chân này không dùng cho cặp vi sai.
- Dạng xung phải khớp: QD75D4 `Pr.5` (PULSE/SIGN, CW/CCW, A/B) và `Pr.23` bit 0 so với `Pr.PA13` của MR-J4-A (SH-030143-C §7.2.1 p.7-23). Manual ghi nguyên hàng: `Pr.23 Output signal logic selection / b0 Command pulse signal / 0: Negative logic / 1: Positive logic` (SH-080058 §5.2.3 p.5-31); địa chỉ trục 1 của Pr.23 là 32 (Appendix 13 p. Appendix-150). Sai mức logic thì động cơ có thể quay ngược hoặc không quay.
- Chiều +/− của cặp: bảng CN1 đặt tên `PP/PG` và `NP/NG`; khi nối theo ví dụ của SH-080058 (F+ → PP, F− → PG, R+ → NP, R− → NG) phải chạy thử không tải để xác nhận chiều quay — đảo cực sẽ làm động cơ quay ngược.

Ví dụ nối trong SH-080058 §3.4.1 p.3-24 vẽ theo MR-J3-A (`PULSE F+/F−` → `PP/PG`, `PULSE R+/R−` → `NP/NG`). Manual MR-J4-A trong tay **không** nêu rằng MR-J3-A và MR-J4-A giống nhau về chân; vì vậy trang này chỉ dùng bảng CN1 của MR-J4-A, không suy ra từ MR-J3-A.

<WiringDiagram variant="mr-j4-a" />

<DriverPhoto
  src="/img/drivers/mr-j4-a.jpg"
  alt="Sơ đồ đấu dây QD75D4 với Mitsubishi MR-J4-A (CN1)"
  caption="QD75D4 nối Mitsubishi MR-J4-A qua CN1 (50P): xung vi sai 1A15/1A16 vào PP 10/PG 11, 1A17/1A18 vào NP 35/NG 36."
  source="plc247.com"
  sourceUrl="https://plc247.com/mitsubishi-qd75d4-servo-control-mr-j4-a-tutorial"
/>

## 2. Servo-ON từ PLC

Servo-ON là ngõ vào `SON` tại **CN1-15** (SH-030143-C §2.2 p.2-17, §2.3 p.2-22). Nó phải do một ngõ ra transistor của PLC điều khiển, không nối vào QD75D4.

- Có thể để driver tự bật servo-ON bằng `Pr.PD01` đặt `_ _ _ 4` (SH-030143-C §2.3 p.2-22), nhưng khi đó mất khả năng dừng servo độc lập — chỉ dùng khi thiết kế đã tính.
- `SON` không phải tín hiệu an toàn; dừng khẩn cấp vẫn phải cắt nguồn động lực độc lập.

## 3. READY, alarm và in-position

| Tín hiệu | CN1 | Ý nghĩa | Nguồn |
| --- | --- | --- | --- |
| RD (Ready) | 49 | Bật khi servo-ON và driver sẵn sàng | §2.3 <SourceRef doc="sh030143" page="2-31" /> |
| ALM (Malfunction) | 48 | ON khi bình thường, OFF khi có alarm | §2.3 <SourceRef doc="sh030143" page="2-31" /> |
| INP (In-position) | 24 | ON khi số xung lệch nằm trong dải in-position | §2.3 <SourceRef doc="sh030143" page="2-31" /> |
| DOCOM | 46, 47 | Điểm chung của nhóm ngõ ra | §2.2 <SourceRef doc="sh030143" page="2-17" /> |

Cách đấu theo ngõ ra kiểu sink của MR-J4: `RD` (CN1-49) → `READY` 1A11, `RDYCOM` 1A12 → **+24 V**, `DOCOM` 46/47 → 0 V; vòng +24 V → RDYCOM → photocoupler READY → RD 49 → DOCOM → 0 V. `ALM` (CN1-48) → một ngõ vào PLC để liên động và hiển thị lỗi. Bản vẽ plc247 nối `RDYCOM` vào `DICOM` 20/21; bảng CN1 của MR-J4-A dành `DICOM` 20/21 cho nhóm ngõ vào và `DOCOM` 46/47 cho nhóm ngõ ra (§2.2 p.2-17; sơ đồ đấu nối nội bộ §2.5 p.2-40–2-41 vẽ `RD` 49 trong nhóm `DOCOM`), nên trang này giữ `DOCOM` và không theo bản vẽ.

## 4. Nguồn 24 V

- Nhóm ngõ vào dùng `DICOM` CN1-20/21; nhóm ngõ ra dùng `DOCOM` CN1-46/47 (SH-030143-C §2.2 p.2-17).
- Một nguồn 24 V cho mỗi nhóm, có cầu chì; không dùng chung nguồn với phanh.
- `OPC` CN1-12 chỉ cấp +24 V khi CN1-10/35 được dùng làm ngõ vào số kiểu open-collector (SH-030143-C §2.2 p.2-18 ghi chú 8).
- Không đấu cặp vi sai của QD75D4 vào `DICOM`/`DOCOM` hoặc bất kỳ ngõ opto 24 V nào.

## 5. MR Configurator2

Các tham số này thường được đặt trong `MR Configurator2 → Parameter`: `Pr.PA06`/`Pr.PA07` (bánh răng điện tử / electronic gear), `Pr.PA13` (dạng xung / pulse output mode) và `Pr.PD44`/`Pr.PD46` (gán chân / pin assignment). Manual yêu cầu MR Configurator2 phiên bản SW1DNC-MRC2-_ 1.34L trở lên cho chế độ positioning (SH-030143-C §1.1(1) p.1-1). Sau khi đổi `PA06`/`PA07` cần chu kỳ nguồn lại thì giá trị mới có hiệu lực (SH-030143-C §7.1.1 p.7-19).

## 6. Khởi động thử

<CodeTabs :tabs="tabs" />

Tab IL chỉ minh họa cách ghi buffer memory và cách bật servo-ON; địa chỉ `U0` là base 0, phải đổi theo vị trí module thực tế.

## Đọc tiếp

- [Tổng quan đấu dây driver](/q/drivers/)
- [Thông số & tỉ số truyền](/q/drivers/parameters-gear)
- [Đấu dây QD75D4](/q/qd75/wiring)
