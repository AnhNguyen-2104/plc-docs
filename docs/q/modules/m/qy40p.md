---
title: "QY40P — Module ra số"
family: q
module: module-qy40p
status: draft
source: SH-080042
---

<ModulePage id="qy40p" />

## 1. Nhóm tín hiệu cần đấu

QY40P là module 16 điểm transistor sink 12–24 VDC. Transistor sink kéo dòng từ tải về 0 V. Các nhóm tín hiệu cần đấu:

| Nhóm | Tín hiệu | Hướng | Ghi chú |
| --- | --- | --- | --- |
| Ngõ ra | Y0…YF | module → tải | 16 điểm transistor sink, 12–24 VDC, 0,1 A/điểm, 1,6 A/common; bảng đầu cực ở SH-080042 §3.5 |
| Cực chung | COM | — | COM về 0 V; tải nối giữa +V và Y |
| Nguồn tải | 12–24 VDC | nguồn ngoài → tải | Nguồn tải riêng, có cầu chì |
| Bảo vệ ngoài | diode dập xung và cầu chì ngoài | — | Lắp ngoài module, theo loại tải |

Bảng khối đấu dây TB1–TB18 của QY40P:

<ManualFigure
  src="/img/manual/qy40p-terminals.webp"
  alt="Bảng khối đấu dây QY40P: TB1 đến TB18, Y0 đến YF, TB17 12/24 VDC và TB18 COM"
  caption="Khối đấu dây QY40P: TB1–TB16 cho Y0–YF, TB17 12/24 VDC, TB18 COM — khối đấu dây kiểu vít"
  doc="SH-080042"
  section="§3.5"
  page="3-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

| Chân | Tín hiệu | Chức năng | Nguồn |
| --- | --- | --- | --- |
| TB1–TB16 | Y0–YF | 16 điểm ra transistor | SH-080042 §3.5 p.3-7 |
| TB17 | 12/24 VDC | Cấp nguồn cho tầng ra | SH-080042 §3.5 p.3-7 |
| TB18 | COM | Cực chung (0 V) cho 16 điểm | SH-080042 §3.5 p.3-7 |

QY40P gom 16 điểm vào một cực COM duy nhất (TB18); module không có COM0/COM1 chia nhóm như một số module 32/64 điểm. Với kiểu sink, tải đấu giữa +12/24 V (TB17) và từng điểm Y, còn COM về 0 V.

## 2. Nguyên tắc đi dây

- **Kiểu kết nối:** khối đấu dây kiểu vít — 18 điểm đấu vít M3, một dây mỗi điểm (SH-080042 §3.5, p. 3-7).
- Tải nối giữa +V và Y; COM về 0 V; transistor kéo Y về 0 V.
- Dây tải đi cách dây tín hiệu và dây động lực còn lại; không bó chung dây tải AC với dây tín hiệu DC.
- Lắp cầu chì ngoài cho đường tải; module không thay thế cầu chì bảo vệ tải.
- Không nhồi nhiều dây vào một điểm đấu; giữ một dây cho mỗi điểm Y.

## 3. Sơ đồ tham chiếu

Sơ đồ gần nhất là [QY40P](/q/modules/m/qy40p) — transistor sink. Áp dụng phần COM về 0 V và tải nối giữa +V và Y; không áp dụng bảng đầu cực TB1–TB18 và định mức dòng của QY40P cho QY40P; bảng đầu cực riêng ở SH-080042 §3.5.

## 4. Sơ đồ mạch vào/ra của hãng



Sơ đồ chính thức của hãng cho mạch ra transistor QY40P: transistor sink, diode zener và cầu chì ngoài.

<ManualFigure
  src="/img/manual/qy40p-output-circuit.webp"
  alt="Mạch ra transistor QY40P kiểu sink: zener, tải và cầu chì"
  caption="Mạch ra QY40P: transistor sink, zener — khối đấu dây kiểu vít"
  doc="SH-080042"
  section="§3.5"
  page="3-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

### Thông số ngõ ra

| Hạng mục | Giá trị | Nguồn |
| --- | --- | --- |
| Số điểm ra | 16 điểm | SH-080042 §3.5 p.3-7 |
| Điện áp tải định mức | 12–24 VDC (+20/−15 %) | SH-080042 §3.5 p.3-7 |
| Dòng tải tối đa | 0,1 A/điểm, 1,6 A/common | SH-080042 §3.5 p.3-7 |
| Dòng xung tối đa | 0,7 A trong 10 ms | SH-080042 §3.5 p.3-7 |
| Dòng rò khi OFF | ≤ 0,1 mA | SH-080042 §3.5 p.3-7 |
| Sụt áp khi ON | 0,1 V (TYP.) tại 0,1 A; 0,2 V (MAX.) tại 0,1 A | SH-080042 §3.5 p.3-7 |
| Thời gian đáp ứng | ≤ 1 ms (OFF→ON và ON→OFF, tải trở) | SH-080042 §3.5 p.3-7 |
| Bảo vệ | Quá tải và quá nhiệt | SH-080042 §3.5 p.3-7 |
| Số điểm chiếm dụng | 16 điểm (khai báo 16 điểm ra) | SH-080042 §3.5 p.3-7 |
| Dòng tiêu thụ 5 VDC | 65 mA (TYP., toàn bộ điểm ON) | SH-080042 §3.5 p.3-7 |

Dòng rò 0,1 mA là con số cần nhớ khi đóng tải nhỏ: nó đủ để giữ rơ le 24 V công suất bé ở trạng thái nhả chậm hoặc không nhả, nên với tải nhạy phải kiểm tra cùng nhà sản xuất tải.

> **Lưu ý về định mức 0,5 A/điểm.** Manual QY40P trên đĩa ghi 0,1 A/điểm và 1,6 A/common, không có định mức 0,5 A/điểm cho QY40P. Con số 0,5 A/điểm thuộc ngõ ra coincidence của QD62 (12/24 VDC, 0,5 A/điểm, 2 A/common — SH-080036 §3.1 p.3-2), không phải module ngõ ra transistor.

## 5. Đấu nối thiết bị ngoài

- Tải DC nối giữa +V và Y; lắp diode dập xung song song tải, cathode về +V.
- Lắp cầu chì ngoài; kiểm tra dòng từng điểm và tổng dòng mỗi common.
- Với tải nhỏ, kiểm tra dòng rò khi OFF có thể giữ tải ở trạng thái ON.

## 6. Checklist trước khi cấp điện

- [ ] Đã cắt nguồn trước khi đấu dây.
- [ ] COM về 0 V đấu đúng.
- [ ] Nguồn tải đúng 12–24 VDC.
- [ ] Đã lắp diode dập xung và cầu chì cho tải.
- [ ] Dòng từng điểm và tổng dòng mỗi common nằm trong định mức 0,1 A/điểm, 1,6 A/common.
- [ ] Đã thử từng điểm bằng tay trước khi chạy tự động.
- [ ] Dây tải đi cách dây tín hiệu và dây động lực còn lại.
- [ ] Không nhồi nhiều dây vào một điểm đấu.
