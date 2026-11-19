---
title: QJ71C24N — module truyền thông nối tiếp
family: q
module: q-series
status: draft
source: SH-080007
---

<script setup>
const ch2Inputs = [
  { signal: 'SDA', pin: 'SDA', device: 'Dữ liệu phát A (4 dây) — cặp với SDB' },
  { signal: 'SDB', pin: 'SDB', device: 'Dữ liệu phát B (4 dây) — cặp với SDA' },
  { signal: 'RDA', pin: 'RDA', device: 'Dữ liệu thu A (4 dây) — cặp với RDB' },
  { signal: 'RDB', pin: 'RDB', device: 'Dữ liệu thu B (4 dây) — cặp với RDA' }
]
const ch2Outputs = [
  { signal: 'SG', pin: 'SG', device: 'Tín hiệu chung (signal ground)' },
  { signal: 'FG', pin: '(FG)', device: 'Vỏ/kẹp nối đất, nối trong module với SLD' }
]
</script>

# QJ71C24N — module truyền thông nối tiếp

QJ71C24N là module truyền thông nối tiếp gắn trên base MELSEC Q, trao đổi dữ liệu với thiết bị ngoài qua hai kênh độc lập. Module giữ vùng đệm phát/thu trong buffer memory; CPU đọc/ghi bằng `FROM`/`TO`, bằng lệnh chuyên dụng `OUTPUT`/`INPUT`, hoặc để module tự xử lý theo giao thức MC.

Trang này mô tả phần cứng: biến thể model, chân tín hiệu, công tắc cài đặt, truy cập buffer memory và checklist đấu dây. Nội dung giao thức chi tiết nằm trong SH-080007.

## 1. Các biến thể model

| Model | CH1 | CH2 | Ghi chú |
| --- | --- | --- | --- |
| QJ71C24N | RS-232 (D-sub 9 chân) | RS-422/485 (khối đầu cực 2 mảnh) | Bản cơ sở, một kênh mỗi loại |
| QJ71C24N-R2 | RS-232 (D-sub 9 chân) | RS-232 (D-sub 9 chân) | Hai kênh RS-232 |
| QJ71C24N-R4 | RS-422/485 (khối cắm 2 mảnh) | RS-422/485 (khối cắm 2 mảnh) | Hai kênh RS-422/485 |

Bảng gán kênh và kiểu giao diện theo SH-080006 §3.1 p.3-1. Khoảng cách truyền tối đa: RS-232 **15 m**, RS-422/485 **1200 m** (tổng chiều dài tuyến) — SH-080006 §3.1 p.3-2.

Khối cắm của bản -R4 cần tuốt vỏ 7 mm và dùng plate terminal đi kèm khi nối dây bện chống nhiễu; bản QJ71C24N dùng khối đầu cực bắt vít M3 — SH-080006 §4.4 (3) p.4-5.

## 2. Chân CH1 RS-232 (D-sub 9)

Sơ đồ chân D-sub 9 phía module do hãng công bố:

<ManualFigure
  src="/img/manual/serial-dsub9.jpg"
  alt="Sơ đồ chân D-sub 9 chân của QJ71C24N: CD, RD, SD, ER, SG, DR, RS, CS, CI"
  caption="Sơ đồ chân D-sub 9 (CH1 RS-232)"
  doc="SH-080006"
  section="§3.2.1"
  page="3-3"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080006/sh080006w.pdf"
/>

Đầu nối là D-sub 9 chân **cái**, kiểu bắt vít, ren M2.6 — SH-080006 §3.2.1 (3) p.3-4.

| Chân | Ký hiệu | Tên đầy đủ | Hướng (so với module) | Chức năng |
| --- | --- | --- | --- | --- |
| 1 | `CD` | CD(DCD) | vào | Phát hiện sóng mang; có thể bỏ qua bằng cài đặt CD terminal check |
| 2 | `RD` | RD(RXD) | vào | Nhận dữ liệu |
| 3 | `SD` | SD(TXD) | ra | Phát dữ liệu |
| 4 | `ER` | ER(DTR) | ra | Báo sẵn sàng nhận (khi dùng điều khiển DTR/DSR) |
| 5 | `SG` | SG | — | Tín hiệu chung |
| 6 | `DR` | DR(DSR) | vào | Thiết bị ngoài sẵn sàng; module không phát khi tín hiệu này OFF |
| 7 | `RS` | RS(RTS) | ra | Yêu cầu phát |
| 8 | `CS` | CS(CTS) | vào | Cho phép phát; module không phát khi tín hiệu này OFF |
| 9 | `CI` | CI(RI) | vào | Tín hiệu chuông modem, chỉ nối khi dùng modem |

Số chân và mô tả từng tín hiệu theo SH-080006 §3.2.1 (1) p.3-3 đến p.3-4. Trạng thái ON/OFF của `ER`, `DR`, `RS`, `CD` đọc được ở buffer memory địa chỉ `254H` (CH1) / `264H` (CH2) — SH-080006 §3.2.1 Remarks p.3-5.

Khi dùng chế độ bán song công, `RS` nối vào một trong `CS`/`DR`/`CD` của thiết bị ngoài và `CD` nối vào `RS`/`ER` của thiết bị ngoài — SH-080007 §8.4 p.218.

## 3. Khối đầu cực CH2 RS-422/485

| Đầu cực | Tín hiệu | 4 dây | 2 dây (RS-485) |
| --- | --- | --- | --- |
| `SDA` | Dữ liệu phát A | nối `RDA` thiết bị ngoài | nối chung với `RDA`, đi trên dây A |
| `SDB` | Dữ liệu phát B | nối `RDB` thiết bị ngoài | nối chung với `RDB`, đi trên dây B |
| `RDA` | Dữ liệu thu A | nối `SDA` thiết bị ngoài | nối chung với `SDA` |
| `RDB` | Dữ liệu thu B | nối `SDB` thiết bị ngoài | nối chung với `SDB` |
| `SG` | Tín hiệu chung | nối `SG` thiết bị ngoài | nối `SG` thiết bị ngoài |
| `(FG)` | Đất vỏ | theo quy định tủ điện | theo quy định tủ điện |

Bố trí đầu cực và nguyên tắc nối cặp `nnA`/`nnB` theo SH-080006 §4.4.2 (1) p.4-8. Với RS-485 2 dây, echo back của bản -R4 có thể bật/tắt để module không nhận lại dữ liệu chính nó vừa phát — SH-080006 §3.3.4 p.3-12. Cách gộp `SDA`+`RDA` và `SDB`+`RDB` là suy ra từ chức năng echo back và hình tương ứng đầu cực; hình nối 2 dây cụ thể trong manual là ảnh, chưa đọc được bằng text: **chưa xác minh**.

Hình nối 1:1 RS-422 bốn dây giữa module và thiết bị ngoài, kèm điện trở kết thúc:

<ManualFigure
  src="/img/manual/serial-rs485-4wire.jpg"
  alt="Nối RS-422/485 bốn dây: SDA, SDB, RDA, RDB, SG, FG và điện trở kết thúc R"
  caption="Nối 1:1 bốn dây RS-422/485"
  doc="SH-080006"
  section="§4.4.2"
  page="4-10"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080006/sh080006w.pdf"
/>

Điện trở kết thúc đi kèm module:

| Kiểu truyền | Điện trở | Công suất | Nối tại |
| --- | --- | --- | --- |
| RS-422 | 330 Ω | 1/4 W | Hai trạm ở hai đầu tuyến |
| RS-485 | 110 Ω | 1/2 W | Hai trạm ở hai đầu tuyến |

SH-080006 §4.4.2 (1)(c) p.4-9. Không lắp điện trở ở trạm giữa; nếu đầu kia là bộ chuyển RS-232/RS-422 thì điện trở phải đặt tại bộ chuyển — cùng mục, POINT p.4-10.

Cách phân biệt và lắp điện trở kết thúc 330 Ω / 110 Ω đúng chiều:

<ManualFigure
  src="/img/manual/serial-termination.jpg"
  alt="Điện trở kết thúc 330 Ω và 110 Ω với mã màu, cách cắm đúng chiều vào khối đầu cực"
  caption="Điện trở kết thúc 330 Ω/110 Ω và cách cắm"
  doc="SH-080006"
  section="§4.4.2"
  page="4-9"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080006/sh080006w.pdf"
/>

## 4. Công tắc cài đặt

Cài đặt qua PLC parameter (I/O assignment → Switch setting), gồm 5 switch — SH-080006 §4.5.2 p.4-14.

| Switch | Nội dung | Giá trị |
| --- | --- | --- |
| 1 | CH1: b8–b15 tốc độ, b0–b7 định dạng truyền | xem bảng dưới |
| 2 | CH1 giao thức | `0H`–`9H` |
| 3 | CH2: b8–b15 tốc độ, b0–b7 định dạng truyền | xem bảng dưới |
| 4 | CH2 giao thức | `0H`–`9H` |
| 5 | Số trạm | `0`–`31` (`0H`–`1FH`) |

Bit định dạng truyền (b0–b7) — SH-080006 §4.5.2 (1)(a) p.4-15:

| Bit | Ý nghĩa | OFF (0) | ON (1) |
| --- | --- | --- | --- |
| b0 | Chế độ hoạt động | Độc lập | Liên kết (chỉ CH2) |
| b1 | Số bit dữ liệu | 7 | 8 |
| b2 | Bit parity | Không | Có |
| b3 | Parity chẵn/lẻ | Lẻ | Chẵn |
| b4 | Bit stop | 1 | 2 |
| b5 | Mã sum check | Không | Có |
| b6 | Ghi khi RUN | Cấm | Cho phép |
| b7 | Sửa cài đặt | Cấm | Cho phép |

Mã tốc độ truyền (b8–b15) — SH-080006 §4.5.2 (1)(b) p.4-17:

| Mã | bps | Mã | bps |
| --- | --- | --- | --- |
| `00H` | 300 | `07H` | 19200 |
| `01H` | 600 | `08H` | 28800 |
| `02H` | 1200 | `09H` | 38400 |
| `03H` | 2400 | `0AH` | 57600 |
| `04H` | 4800 | `0BH` | 115200 |
| `05H` | 9600 | `0CH` | 230400 (chỉ CH1 của -N/-R2/-R4) |
| `06H` | 14400 | `0FH` | 50 |

Mã giao thức — SH-080006 §4.5.2 (1)(c) p.4-17:

| Mã | Giao thức |
| --- | --- |
| `0H` | Kết nối GX Developer |
| `1H`–`5H` | MC protocol format 1–5 |
| `6H` | Non procedure protocol |
| `7H` | Bidirectional protocol |
| `8H` | Liên kết CH1–CH2 |
| `9H` | Pre-defined protocol |
| `EH` | ROM/RAM/switch test |
| `FH` | Loopback test từng trạm |

Số trạm đặt ở switch 5 dùng cho MC protocol khi nhiều module cùng tuyến; đặt `0` khi cấu hình 1:1 — SH-080006 §4.5.2 (1)(d) p.4-18. Cài đặt chỉ có hiệu lực sau khi chuyển nguồn module OFF→ON hoặc reset CPU — SH-080006 §4.5.2 POINT p.4-14.

## 5. Truy cập buffer memory và ví dụ ladder

Vùng đệm mặc định — SH-080006 §6.1.2 p.6-6 và §6.2.2 p.6-25:

| Vùng | CH1 | CH2 | Word đầu | Ghi chú |
| --- | --- | --- | --- | --- |
| Vùng phát | `400H`–`5FFH` | `800H`–`9FFH` | `400H` / `800H` | Word đầu = số word gửi |
| Vùng thu | `600H`–`7FFH` | `A00H`–`BFFH` | `600H` / `A00H` | Word đầu = số word đã nhận |

Địa chỉ đầu và độ dài vùng phát/thu có thể đổi qua thanh ghi cài đặt: `A2H`/`142H` (địa chỉ đầu vùng phát), `A3H`/`143H` (độ dài vùng phát), `A6H`/`146H` (địa chỉ đầu vùng thu), `A7H`/`147H` (độ dài vùng thu) — SH-080006 §3.9 p.3-24. Không ghi trực tiếp vào vùng hệ thống.

Tín hiệu bắt tay phía CPU (module ở slot 0) — SH-080006 §3.8 p.3-20:

| Tín hiệu | Ý nghĩa |
| --- | --- |
| `X0` / `X1` | CH1 phát xong bình thường / phát lỗi |
| `X3` / `X4` | CH1 có yêu cầu đọc dữ liệu nhận / phát hiện nhận lỗi |
| `Y0` / `Y1` | CH1 yêu cầu phát / báo đã đọc xong dữ liệu nhận |
| `X1E` | Module sẵn sàng (truy cập được) |

Ví dụ dùng `TO`/`FROM` cho non procedure protocol, CH1:

```il
(* Ghi số word và dữ liệu vào vùng phát CH1: 400H = count, 401H... = data *)
LD   M8000
TO   U0\G1024  K4   K1     (* 1024 = 400H: số word gửi *)
TO   U0\G1025  D100 K4     (* 1025 = 401H: 4 word dữ liệu *)

(* Phát: bật yêu cầu phát CH1 rồi chờ phát xong *)
LD   M100
OUT  Y0
LD   X0
RST  Y0

(* Nhận: chờ yêu cầu đọc, đọc count rồi đọc dữ liệu *)
LD   X3
FROM U0\G1536  D200 K1     (* 1536 = 600H: số word đã nhận *)
FROM U0\G1537  D201 K10    (* 1537 = 601H: dữ liệu nhận *)
OUT  Y1                    (* báo đã đọc xong để module nhận tiếp *)
```

`U0` giả định module ở vị trí đầu trên base; thay theo slot thực tế. Chức năng từng tín hiệu theo SH-080006 §6.1–§6.2; số word ghi ở word đầu vùng phát theo §6.2.2 p.6-25.

Lệnh chuyên dụng thay cho `TO`/`FROM`:

- `OUTPUT` (hoặc `GP.OUTPUT`) gửi dữ liệu non procedure. Control data: `(S1)+0` kênh (1/2), `(S1)+1` kết quả, `(S1)+2` số word gửi — SH-080006 §10.3 p.10-7.
- `G.INPUT` nhận dữ liệu non procedure. Control data: `(S)+0` kênh, `(S)+1` kết quả, `(S)+2` số word nhận, `(S)+3` số word tối đa cho phép — SH-080006 §10.4 p.10-11; lệnh phải chạy khi `X3` đang ON.
- `G.BIDOUT`/`G.BIDIN` cho bidirectional protocol — SH-080006 §7.2.3 p.7-19 và §7.1.3 p.7-10.

Không dùng đồng thời `OUTPUT` với `ONDEMAND`/`BIDOUT`/`BIDIN`/`CPRTCL` trên cùng một kênh; lỗi cài đặt giao thức `7FF2H` — SH-080006 §10.3 (2) p.10-8.

## 6. Checklist đấu dây

- [ ] Điện trở kết thúc chỉ đặt ở **hai trạm đầu tuyến**, không đặt ở trạm giữa — SH-080006 §4.4.2 (1)(c) p.4-9.
- [ ] Trị số điện trở đúng kiểu truyền: 330 Ω cho RS-422, 110 Ω cho RS-485 — cùng mục p.4-9.
- [ ] Vỏ chống nhiễu nối đất **một đầu**; nếu vẫn nhiễu mới nối shield giữa hai trạm FG — SH-080006 §4.4 (1) p.4-5 và §4.4.2 (1)(b) p.4-8.
- [ ] `SDA`/`SDB` và `RDA`/`RDB` đi thành cặp, không tách rời — SH-080006 §4.4.2 (1)(b)3) p.4-8.
- [ ] 2 dây hay 4 dây khớp với cài đặt echo back và với thiết bị ngoài — SH-080006 §3.3.4 p.3-12.
- [ ] Số trạm duy nhất trên tuyến, `0` khi 1:1 — SH-080006 §4.5.2 (1)(d) p.4-18.
- [ ] Tốc độ, bit dữ liệu, parity, stop bit khớp hai đầu — SH-080006 §4.5.2 p.4-15 đến p.4-17.
- [ ] Cáp tín hiệu cách dây động lực tối thiểu 100 mm — SH-080006 §4.4 (6) p.4-5.
- [ ] Đã chạy loopback test trước khi ghép thiết bị thật — SH-080006 §4.8 p.4-31.

## 7. Đọc tiếp

- Giao thức MC, định dạng khung và lệnh: SH-080007 (sổ tay Application).
- Cài đặt chi tiết từng bit và mã lỗi: SH-080006 (sổ tay Basic).
- Các module khác của họ Q: [MELSEC Q](/q/).
