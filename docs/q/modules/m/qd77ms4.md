---
title: "QD77MS4 — Module chuyển động"
family: q
module: module-qd77ms4
status: draft
source: IB-0300185
---

<ModulePage id="qd77ms4" />

## 1. Nhóm tín hiệu cần đấu

QD77MS4 là Simple Motion module 4 trục, giao tiếp SSCNET III/H. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Cáp SSCNET III/H | Cáp quang SSCNET | module ↔ servo amplifier | Một sợi vào, một sợi ra mỗi amplifier (IB-0300185 §4.1.2 p.4-3) |
| Tín hiệu ngoài | Đầu nối 40 chân A6CON | driver/công tắc ↔ module | A6CON1/A6CON2/A6CON4 bán riêng (IB-0300185 §3.1 p.3-3) |
| Nguồn module | 5 VDC từ base | base → module | Lấy từ rail 5 V của base |
| Nối đất | FG qua base | — | Theo quy định tủ |

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** đầu nối SSCNET — cáp quang SSCNET III/H tới servo amplifier (IB-0300185 §3.1, p. 3-3).
- Cáp SSCNET III/H dài 0,15–50 m; giữ bán kính uốn và không kéo căng sợi (IB-0300185 §3.1 p.3-3).
- Cắt nguồn trước khi tháo/cắm đầu nối quang; không nhìn trực tiếp vào đầu cáp khi đang cấp điện.
- Giữ nắp bảo vệ đầu nối cho tới sát lúc cắm và đậy lại khi tháo.
- Nối module → amplifier 1 → amplifier 2 → … theo thứ tự trục; không đấu hình sao.
- Tín hiệu ngoài qua đầu nối 40 chân; bảng chân theo IB-0300185 §3.1 và §4.1.2.

## 3. Sơ đồ tham chiếu

- Dùng [QD75M1](/q/modules/m/qd75m1) cho tuyến SSCNET một trục; QD77MS4 mở rộng cùng nguyên lý nối tiếp cho 4 trục.
- Dùng [QD75D4](/q/modules/m/qd75d4) cho bố trí đầu nối ngoài 40 chân và nhóm tín hiệu DOG/FLS/RLS/STOP; không áp dụng cặp xung vi sai.
- Không áp dụng QD75D4/QD75P4 cho amplifier chỉ có cổng SSCNET.

## 4. Sơ đồ mạch vào/ra của hãng

Sơ đồ truyền tín hiệu qua SSCNET giữa QD77MS và servo amplifier theo hãng:

<ManualFigure
  src="/img/manual/qd77ms-sscnet.webp"
  alt="Truyền tín hiệu QD77MS qua SSCNET tới servo amplifier, kèm encoder và tín hiệu ngoài"
  caption="Truyền tín hiệu QD77MS qua SSCNET — đầu nối SSCNET"
  doc="IB-0300185"
  section="§1.1.6"
  page="1-20"
/>

Nguồn: <SourceRef doc="ib0300185" page="1.1.6" />.

## 5. Đấu nối thiết bị ngoài

- Servo amplifier: MR-J4-B, MR-J5-B hoặc loại SSCNET III/H tương thích; nối tiếp theo thứ tự trục.
- Dùng cáp SSCNET III/H đúng loại; tổng chiều dài và bán kính uốn theo IB-0300185 §3.1 p.3-3.
- Encoder phản hồi trong khung SSCNET, không đấu dây encoder về module.
- Đầu nối 40 chân A6CON1/A6CON2/A6CON4 cho tín hiệu ngoài; bảng chân theo §3.1.

### Trình tự khởi động

```il
(* Ghi so hieu du lieu vi tri can chay vao Cd.3 truc 1 (1500) *)
LD   M8000
TO   U0\G1500  K100  K1    (* 1500 = Cd.3; K100 = chay positioning data so 100 *)

(* Chi khoi dong khi module READY, dong bo xong, khong BUSY, khong loi *)
LD   X0                    (* READY *)
AND  X1                    (* Synchronization flag *)
ANDI XC                    (* BUSY truc 1 OFF *)
ANI  X8                    (* Error detection truc 1 OFF *)
AND  M100                  (* cho phep chay, minh hoa *)
PLS  M110

(* Bat Positioning start truc 1 trong mot scan *)
LD   M110
SET  Y10

(* Bat dau chay thi nha Y10 *)
LD   X10                   (* Start complete truc 1 *)
RST  Y10

(* Cho hoan tat dinh vi *)
LD   X14                   (* Positioning complete truc 1 *)
OUT  M120
```

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi thao tác cáp quang.
- [ ] Đúng cáp SSCNET III/H và đầu nối quang.
- [ ] Nối tiếp module → amplifier 1 → … đúng thứ tự trục.
- [ ] Đầu nối quang sạch, nắp bảo vệ được đậy khi tháo.
- [ ] Bán kính uốn và chiều dài cáp trong giới hạn manual.
- [ ] Tín hiệu ngoài đấu đúng bảng chân 40 chân.
- [ ] Module cắm đúng khe, nhận 5 V qua base.
- [ ] Đã kiểm tra thứ tự Y0 → X0 → Y1 → X1 trước khi phát lệnh chạy.
