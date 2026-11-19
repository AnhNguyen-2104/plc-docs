---
title: QJ71E71-100 — module Ethernet
family: q
module: q-series
status: draft
source: SH-080009
---

<script setup>
const ethInputs = [
  { signal: 'RD', pin: 'RJ45 (cặp nhận)', device: 'Dữ liệu thu' },
  { signal: 'SD', pin: 'RJ45 (cặp phát)', device: 'Dữ liệu phát' },
  { signal: '100M', pin: 'LED 100M', device: 'ON = 100 Mbps, OFF = 10 Mbps hoặc chưa nối cáp' }
]
const ethOutputs = [
  { signal: 'RUN', pin: 'LED', device: 'Module đang chạy bình thường' },
  { signal: 'INIT.', pin: 'LED', device: 'Khởi tạo xong' },
  { signal: 'OPEN', pin: 'LED', device: 'Có kết nối đã mở' },
  { signal: 'ERR.', pin: 'LED', device: 'Cài đặt sai' },
  { signal: 'COM.ERR.', pin: 'LED', device: 'Lỗi truyền thông' }
]
</script>

# QJ71E71-100 — module Ethernet

QJ71E71-100 là module Ethernet gắn trên base MELSEC Q, giao tiếp với PC, HMI, module Ethernet khác hoặc thiết bị ngoài qua cổng RJ45. Module giữ 16 kết nối logic và các vùng đệm cố định trong buffer memory.

Trang này mô tả thông số, đấu nối, cài đặt IP/cổng và các lệnh mở/đóng/gửi/nhận. Chi tiết khung MC protocol nằm trong SH-080008AB.

## 1. Thông số

| Hạng mục | Giá trị | Nguồn |
| --- | --- | --- |
| Chuẩn truyền | 100BASE-TX / 10BASE-T | SH-080009 §3.2 p.29 |
| Tốc độ | 100 Mbps (full/half duplex), 10 Mbps (full/half duplex) | SH-080009 §3.2 p.29 |
| Giao diện | RJ45, cố định MDI | SH-080009 §3.2 p.29 |
| Chiều dài segment tối đa | 100 m (giữa hub và node) | SH-080009 §3.2 p.29 |
| Số kết nối mở đồng thời | 16 (dùng được trong chương trình) | SH-080009 §3.2 p.29 |
| Fixed buffer | 1K word × 16 | SH-080009 §3.2 p.29 |
| Random access buffer | 6K word × 1 | SH-080009 §3.2 p.29 |
| E-mail | Tệp đính kèm 6K word × 1; nội dung 960 word × 1 | SH-080009 §3.2 p.32 |
| Điểm I/O chiếm dụng | 32 điểm (I/O assignment: Intelligent 32 points) | SH-080009 §3.2 p.29 |
| Dòng tiêu thụ nội bộ 5 VDC | 0,50 A | SH-080009 §3.2 p.29 |

Tầng vật lý: cáp thẳng tới hub/switch; nối trực tiếp PC–module cần cáp chéo hoặc cổng tự đảo cực, vì giao diện cố định MDI — SH-080009 §3.2 p.29.

Ví dụ cấu hình mạng của hãng: trạm của mình, trạm khác, router và Internet:

<ManualFigure
  src="/img/manual/ethernet-config.jpg"
  alt="Cấu hình mạng Ethernet: trạm QJ71E71-100, trạm khác, router và Internet"
  caption="Cấu hình mạng Ethernet với E71"
  doc="SH-080009"
  section="§1"
  page="20"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080009/sh080009y.pdf"
/>

## 2. Mặt module và LED

Mặt module, cổng RJ45 và vị trí LED theo hãng:

<ManualFigure
  src="/img/manual/ethernet-module.jpg"
  alt="Mặt module QJ71E71-100: LED, cổng RJ45, cổng 10BASE5/10BASE2 và tem số sê-ri"
  caption="Mặt module QJ71E71-100: LED và các cổng"
  doc="SH-080009"
  section="§2"
  page="27"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080009/sh080009y.pdf"
/>

LED thực tế trên mặt module — SH-080009 §2 p.27. Không có LED tên `LINK`; đèn tốc độ tên là `100M`.

| LED | Ý nghĩa |
| --- | --- |
| `RUN` | ON: hoạt động bình thường; OFF: có lỗi |
| `INIT.` | ON: khởi tạo xong; OFF: chưa xử lý |
| `OPEN` | ON: có ít nhất một kết nối đã mở |
| `SD` | Nhấp nháy: đang phát dữ liệu |
| `ERR.` | ON: cài đặt sai |
| `COM.ERR.` | ON: lỗi truyền thông; không tự tắt khi hết nguyên nhân |
| `RD` | ON: đang nhận dữ liệu |
| `100M` | ON: 100 Mbps; OFF: 10 Mbps hoặc chưa nối cáp |

Trạng thái `INIT.`, `OPEN`, `ERR.`, `COM.ERR.` đọc được ở buffer memory `C8H` (bit b0, b1, b3, b4) — SH-080009 §3.5.2 p.43.

## 3. Địa chỉ IP và cổng

Basic setting — SH-080009 §7.1.2 p.86:

| Hạng mục | Khoảng giá trị |
| --- | --- |
| Network Type | Ethernet |
| Start I/O No. | theo số điểm I/O của CPU |
| Network No. | 1–239 |
| Group No. | 0–32 |
| Station No. | 1–64 |
| Mode | Online / Offline / Self-Loopback Test / H/W Test |

Operation setting — SH-080009 §7.1.3 p.87:

| Hạng mục | Giá trị |
| --- | --- |
| Communication Data Code | Binary / ASCII |
| Initial Timing | Do not wait for OPEN / Always wait for OPEN |
| IP Address (own station) | `0H`–`FFFFFFFFH`, nhập DEC hoặc HEX |
| Send Frame Setting | Ethernet (V2.0) / IEEE802.3 |
| Enable Online Change | Bật/tắt ghi dữ liệu bằng MC protocol khi CPU ở RUN |
| TCP Existence Confirmation | Use the KeepAlive / Use the Ping |

Open setting cho từng kết nối — SH-080009 §7.1.4 p.89:

| Hạng mục | Giá trị |
| --- | --- |
| Protocol | TCP / UDP |
| Open System | Active / Unpassive / Fullpassive / MELSOFT Connection |
| Fixed Buffer | Send / Receive |
| Fixed Buffer Communication | Procedure Exist / No Procedure / Predefined protocol |
| Pairing Open | Disable / Enable |
| Existence Confirmation | No Confirm / Confirm |
| Host Station Port No. | `401H`–`1387H`, `138BH`–`FFFEH` |
| Destination IP Address | `0H`–`FFFFFFFFH` |
| Destination Port No. | `1H`–`FFFFH` |

IP của trạm phải cùng class và subnet với thiết bị kết nối; ví dụ class B dùng subnet mặc định 255.255.0.0 — SH-080009 §7.1.3 (2) p.88.

## 4. Vùng đệm và thanh ghi trạng thái

| Địa chỉ | Nội dung | Nguồn |
| --- | --- | --- |
| `5000H` | Open completion signal, bit b0–b15 = kết nối 1–16 | SH-080009 §3.5.2 p.50 |
| `5005H` | Fixed buffer reception status signal, bit b0–b15 | SH-080009 §3.5.2 p.50 |
| `680H` | Fixed buffer No.1 — data length | SH-080009 §3.5.2 p.49 |
| `681H`–`A7FH` | Fixed buffer No.1 — data | SH-080009 §3.5.2 p.49 |
| `78H` | Connection No.1 — port của trạm | SH-080009 §3.5.2 p.42 |
| `79H`–`7AH` | Connection No.1 — IP đích | SH-080009 §3.5.2 p.42 |
| `7BH` | Connection No.1 — port đích | SH-080009 §3.5.2 p.42 |

Mỗi fixed buffer kế tiếp chiếm 1024 word: No.2 bắt đầu `A80H`, No.3 `E80H`, … No.16 `7C00H` — SH-080009 §3.5.2 p.49 và p.62.

## 5. Lệnh mở/đóng/gửi/nhận

Danh sách lệnh chuyên dụng của QJ71E71-100 — SH-080009 §15.1 p.238:

| Lệnh | Chức năng | Trang |
| --- | --- | --- |
| `OPEN` | Mở kết nối tới thiết bị | §15.5 p.243 |
| `CLOSE` | Đóng kết nối | §15.6 p.247 |
| `BUFSND` | Gửi dữ liệu qua fixed buffer | §15.8 p.261 |
| `BUFRCV` | Đọc dữ liệu nhận qua fixed buffer (chương trình chính) | §15.9 p.265 |
| `BUFRCVS` | Đọc dữ liệu nhận trong chương trình ngắt | §15.10 p.269 |
| `ERRCLR` | Xoá LED/thông tin lỗi | §15.11 p.272 |
| `ERRRD` | Đọc thông tin lỗi | §15.12 p.275 |
| `UINI` | Khởi tạo lại module | §15.13 p.279 |

`SEND`/`RECV` **không** phải lệnh của QJ71E71-100: đây là lệnh data link của module mạng (MELSECNET/H, CC-Link IE). Trong SH-080009 chúng chỉ xuất hiện ở ngữ cảnh hệ thống dự phòng — §14.7.4 p.234 — còn truyền/nhận qua Ethernet dùng `BUFSND`/`BUFRCV`. Chi tiết `SEND`/`RECV` cho module mạng: **chưa xác minh** trong tài liệu này.

Control data của `OPEN` — SH-080009 §15.5 (2) p.244:

| Vị trí | Nội dung |
| --- | --- |
| `(S2)+0` | `0000H` dùng tham số của programming tool; `8000H` dùng control data từ `(S2)+2` |
| `(S2)+1` | Kết quả (do hệ thống ghi) |
| `(S2)+2` | Usage setting (fixed buffer send/receive, TCP/UDP, open system) |
| `(S2)+3` | Port trạm |
| `(S2)+4`, `(S2)+5` | IP đích |
| `(S2)+6` | Port đích |
| `(S2)+7`–`(S2)+9` | MAC đích |

Toán hạng: `Un` (số I/O đầu), `(S1)` số kết nối 1–16, `(S2)` control data, `(D1)` cờ hoàn tất — SH-080009 §15.5 (1) p.243.

`BUFSND` nhận `(S1)` = số kết nối 1–16, `(S2)` = control data, `(S3)` = dữ liệu gửi; `(S3)+0` là độ dài dữ liệu (1–1017 word khi binary có thủ tục, 1–508 word khi ASCII, 1–2046 byte khi no procedure) — SH-080009 §15.8 p.261–262.

`BUFRCV` nhận `(S1)` số kết nối, `(S2)` control data, `(D1)` nơi chứa dữ liệu nhận, `(D2)` cờ hoàn tất — SH-080009 §15.9 p.265.

Ví dụ trình tự:

```il
(* Mở kết nối số 1 theo tham số đã cài đặt: Un, số kết nối, control data, cờ hoàn tất *)
LD   M8000
ZP.OPEN "U0"  K1  D100  M200

(* Chờ khởi tạo và mở kết nối xong *)
LD   X19                 (* Initial normal completion *)
AND  U0\G5000.0          (* Open completion, connection 1 *)
OUT  M210

(* Gửi dữ liệu qua fixed buffer của kết nối 1 *)
LD   M210
BUFSND U0  K1  D300  D400  M220

(* Nhận: chờ có dữ liệu rồi đọc *)
LD   U0\G5005.0
BUFRCV U0  K1  D500  D600  M230
```

Thiết bị M/D/X/Y trong ví dụ là minh hoạ. `X19` = initial normal completion signal, `X18` = open abnormal detection — SH-080009 §12.4 p.146. Cú pháp và thứ tự toán hạng phải đối chiếu đúng mục §15.5–§15.9 trước khi dùng.

## 6. Ghi chú MC protocol

QJ71E71-100 là một trong các module được hỗ trợ bởi MC protocol. Định dạng thông điệp cho module Ethernet nằm ở SH-080008AB chương 5 "Messages of Ethernet Interface Module" (§5.2 p.41): header, subheader, độ dài dữ liệu yêu cầu/đáp ứng và bộ đếm giám sát.

Khi thiết bị ngoài gửi lệnh MC protocol tới module, cần khớp:

- Communication Data Code (Binary/ASCII) trong operation setting — SH-080009 §7.1.3 p.87.
- Frame (1E/3E/4E) mà thiết bị ngoài hỗ trợ — SH-080008AB chương 5.
- Cho phép ghi khi CPU ở RUN nếu cần thay đổi dữ liệu — SH-080009 §7.1.3 p.87.

## 7. Checklist

- [ ] Không trùng IP với bất kỳ thiết bị nào trên cùng subnet; bật chức năng phát hiện trùng IP — SH-080009 §14.6 p.214.
- [ ] IP module cùng class/subnet với HMI/PC; subnet mask khớp — SH-080009 §7.1.3 (2) p.88.
- [ ] Cáp thẳng tới hub/switch; nối trực tiếp PC–module dùng cáp chéo hoặc cổng tự đảo cực (giao diện cố định MDI) — SH-080009 §3.2 p.29.
- [ ] Đã đặt KeepAlive hoặc Ping cho kết nối TCP — SH-080009 §7.1.3 p.87 và §14.8 p.236.
- [ ] Port trạm không nằm trong dải cấm `1388H`–`138AH` — SH-080009 §7.1.4 p.89.
- [ ] `INIT.` ON trước khi mở kết nối; `OPEN` ON sau khi mở — SH-080009 §2 p.27.
- [ ] Đã kiểm tra LED `SD`/`RD` khi truyền/nhận — SH-080009 §16.4.3–§16.4.4 p.289.

## 8. Đọc tiếp

- Khung và lệnh MC protocol: `sh080008ab_MC-Protocol-Reference.pdf`, chương 5.
- Cài đặt mở rộng, e-mail, router relay: sổ tay Application của họ QJ71E71.
- Các module khác của họ Q: [MELSEC Q](/q/).
