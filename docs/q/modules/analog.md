---
title: Module tương tự MELSEC Q — danh sách module
family: q
module: q-series
status: draft
source: SH-080055, SH-080054
---

# Module tương tự MELSEC Q — danh sách module

<ModulePhoto id="q64ad" />

<ModulePhoto id="q62da" />

[Q64AD](/q/modules/m/q64ad) là module chuyển tương tự → số 4 kênh, [Q62DA](/q/modules/m/q62da) là module chuyển số → tương tự 2 kênh. Cả hai chiếm 16 điểm I/O, nối ra bằng khối đấu dây 18 điểm và trao đổi dữ liệu với CPU qua buffer memory (`Un\G…`) bằng `FROM`/`TO` hoặc qua thiết bị `U\G`. Điện áp và dòng đều là tín hiệu vi sai một đầu, nên dây tín hiệu phải là cặp xoắn có vỏ bọc và `AG`/`SLD` là điểm tham chiếu. Bảng chân và thông số của từng model nằm ở trang model tương ứng.

## Danh sách module

| Model | Vai trò |
| --- | --- |
| [Q64AD](/q/modules/m/q64ad) | Chuyển 4 kênh tương tự sang số 16-bit |
| [Q62DA](/q/modules/m/q62da) | Chuyển 2 kênh số 16-bit sang tương tự |

## 1. Đấu dây

- Dùng cặp xoắn có vỏ bọc cho từng kênh; `V+`/`V−` (hoặc `I+`/`COM`) đi cùng một cặp.
- Nối vỏ bọc vào `SLD` (Q64AD) hoặc `FG` (Q62DA) ở phía module, đầu còn lại để hở hoặc nối đất một điểm phía cảm biến — không nối đất cả hai đầu.
- `A.G.` của Q64AD là mốc của đầu vào tương tự; không dùng `A.G.` làm cực âm nguồn 24 V.
- Giữ dây tín hiệu cách dây động lực ≥ 150 mm và bắt chéo vuông góc khi buộc phải gặp.

## 2. Chương trình mẫu (FROM/TO)

Q64AD ở khe đầu (I/O số 0000 → `U0`), Q62DA ở khe kế (`U1`). Địa chỉ `Y` của mỗi module dịch theo khe; ở đây Q64AD dùng `Y0009`, Q62DA dùng `Y0019` cho tín hiệu Operating condition setting request.

```il
; --- Q64AD: bật A/D cho CH1..CH4, lấy mẫu liên tục ---
|--[SM400]-----[TO  U0\G0  K000F  K1]--|  ; b0..b3 = 1: bật A/D CH1..CH4 (Un\G0)
|--[SM400]-----[TO  U0\G9  K0000  K1]--|  ; 0: sampling, không lấy trung bình (Un\G9)
|--[SM400]-----[SET Y0009]-------------|  ; Operating condition setting request
|--[X0009]-----[RST Y0009]-------------|  ; X9 = cài đặt đã hoàn tất
|--[SM400]-----[FROM U0\G11 D100  K4]--|  ; D100..D103 = CH1..CH4 (Un\G11..G14)

; --- Q62DA: ghi giá trị số cho CH1, CH2 ---
|--[SM400]-----[TO  U1\G0  K0003  K1]--|  ; b0, b1 = 1: bật D/A CH1, CH2 (mặc định 3H)
|--[SM400]-----[TO  U1\G1  D200   K2]--|  ; D200 → CH1, D201 → CH2 (Un\G1, Un\G2)
```

Địa chỉ buffer dùng ở đây: `Un\G0` = A/D conversion enable/disable (b0–b3 hợp lệ trên Q64AD, b4–b7 bỏ qua), `Un\G9` = averaging process setting, `Un\G11…G14` = CH1…CH4 digital output value (SH-080055 §3.4.1 p.3-18); `Un\G0` = D/A conversion enable/disable và `Un\G1`/`Un\G2` = CH1/CH2 digital value trên Q62DA (SH-080054 §3.4.1 p.3-20). Đoạn ladder này là ví dụ cấu trúc, chưa chạy trên PLC thật: cần đối chiếu địa chỉ `Y`/`X` theo sơ đồ khe thực tế trước khi nạp.

## 3. Nguồn

- Nguồn của từng model: xem mục "Nguồn" trên trang Q64AD và Q62DA.
- Mã dải tín hiệu: SH-080055 §3.4.10 p.3-30.

