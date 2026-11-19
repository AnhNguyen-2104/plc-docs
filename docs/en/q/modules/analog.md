---
title: Q64AD and Q62DA analog modules
family: q
module: q-series
status: draft
source: SH-080055, SH-080054
---

# Q64AD and Q62DA analog modules

Q64AD is a four-channel analog-to-digital module; Q62DA is a two-channel digital-to-analog module. Both occupy 16 I/O points, terminate on an 18-point terminal block, and exchange data with the CPU through buffer memory (`Un\G…`) using `FROM`/`TO` or the `U\G` device. Voltage and current are single-ended signals referenced to `AG`/`SLD`, so signal wiring must be shielded twisted pair.

## 1. Q64AD — terminals and channels

| Terminal | Signal (Q64AD) | Meaning | Source |
| --- | --- | --- | --- |
| 1 | CH1 `V+` | Channel 1 voltage input, positive | SH-080055 §4.3 p.4-4 |
| 2 | CH1 `V−` | Channel 1 voltage input, negative | SH-080055 §4.3 p.4-4 |
| 3 | CH1 `I+` | Channel 1 current input | SH-080055 §4.3 p.4-4 |
| 4 | `SLD` | Cable shield for channel 1 | SH-080055 §4.3 p.4-4 |
| 5–8 | CH2 `V+`/`V−`/`I+`/`SLD` | Channel 2, same order as channel 1 | SH-080055 §4.3 p.4-4 |
| 9–12 | CH3 `V+`/`V−`/`I+`/`SLD` | Channel 3, same order | SH-080055 §4.3 p.4-4 |
| 13–16 | CH4 `V+`/`V−`/`I+`/`SLD` | Channel 4, same order | SH-080055 §4.3 p.4-4 |
| 17 | `A.G.` | Analog ground | SH-080055 §4.3 p.4-4 |
| 18 | `FG` | Frame ground | SH-080055 §4.3 p.4-4 |

Each channel shares one pair of terminals for both voltage and current: `V+`/`V−` for voltage, `I+`/`V−` for current. `SLD` takes the twisted-pair shield at the module end, while the other end of the shield is grounded at a single point near the sensor. `A.G.` is the 0 V reference of all analog inputs and is not tied to `FG` inside the cabinet.

The manufacturer's Q64AD analog input wiring (`V+`/`V−`, `I+`, `A.G.`, shielded twisted pair):

<ManualFigure
  src="/img/manual/q64ad-wiring.jpg"
  alt="Q64AD wiring: V+, V−, I+, A.G., SLD and shielded twisted pair"
  caption="Q64AD analog input wiring"
  doc="SH-080055"
  section="§4.4.2"
  page="4-6"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080055/sh080055u.pdf"
/>

## 2. Q64AD — specifications

| Item | Value | Source |
| --- | --- | --- |
| Number of channels | 4 channels | SH-080055 §3.1 p.3-1 |
| Voltage input | −10…10 VDC, input resistance 1 MΩ | SH-080055 §3.1 p.3-1 |
| Current input | 0…20 mADC, input resistance 250 Ω | SH-080055 §3.1 p.3-1 |
| Digital output | 16-bit signed; −4096…4095 normal; −12288…12287 or −16384…16383 high resolution | SH-080055 §3.1 p.3-1 |
| Max. resolution (0–10 V) | 2.5 mV normal / 0.625 mV high resolution | SH-080055 §3.1 p.3-1 |
| Max. resolution (0–5 V) | 1.25 mV normal / 0.416 mV high resolution | SH-080055 §3.1 p.3-1 |
| Max. resolution (1–5 V) | 1.0 mV normal / 0.333 mV high resolution | SH-080055 §3.1 p.3-1 |
| Conversion speed | 80 µs/channel | SH-080055 §3.1 p.3-2 |
| Extra time for temperature-drift compensation | +160 µs for all channels | SH-080055 §3.1 p.3-2 |
| Absolute maximum input | ±15 V (voltage), ±30 mA (current) | SH-080055 §3.1 p.3-2 |
| Occupied I/O points | 16 points (intelligent 16 points) | SH-080055 §3.1 p.3-2 |
| 5 VDC current consumption | 0.63 A | SH-080055 §3.1 p.3-2 |

Accuracy is ±0.1 % at 25 ± 5 °C and ±0.3 % over 0–55 °C per section 1.1 and table 3.1 of the same manual.

## 3. Q62DA — terminals and channels

| Terminal | Signal (Q62DA) | Meaning | Source |
| --- | --- | --- | --- |
| 1 | CH1 `V+` | Channel 1 voltage output, positive | SH-080054 §4.3 p.4-5 |
| 2 | CH1 `COM` | Channel 1 common | SH-080054 §4.3 p.4-5 |
| 3 | CH1 `I+` | Channel 1 current output | SH-080054 §4.3 p.4-5 |
| 4 | — | Vacant | SH-080054 §4.3 p.4-5 |
| 5 | CH2 `V+` | Channel 2 voltage output, positive | SH-080054 §4.3 p.4-5 |
| 6 | CH2 `COM` | Channel 2 common | SH-080054 §4.3 p.4-5 |
| 7 | CH2 `I+` | Channel 2 current output | SH-080054 §4.3 p.4-5 |
| 8–15 | — | Vacant on Q62DA (used for CH3/CH4 on Q64DA) | SH-080054 §4.3 p.4-5 |
| 16 | `24V` | Auxiliary 24 VDC supply input | SH-080054 §4.3 p.4-5 |
| 17 | `24G` | Auxiliary supply 0 V | SH-080054 §4.3 p.4-5 |
| 18 | `FG` | Frame ground | SH-080054 §4.3 p.4-5 |

Unlike Q64AD, Q62DA has no `SLD`/`A.G.` terminals: the twisted-pair shield returns to `FG`, and the signal return goes to each channel's `COM`. The auxiliary 24 VDC supply (terminals 16/17) feeds the isolated output stage and must be present for the current output to reach 0–20 mA into a large load.

The manufacturer's Q62DA analog output wiring, covering both voltage and current outputs:

<ManualFigure
  src="/img/manual/q62da-wiring.jpg"
  alt="Q62DA wiring: voltage output V+/COM and current output I+/COM, load and FG"
  caption="Q62DA analog output wiring: voltage and current"
  doc="SH-080054"
  section="§4.4.2"
  page="4-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080054/sh080054v.pdf"
/>

## 4. Q62DA — specifications

| Item | Value | Source |
| --- | --- | --- |
| Number of channels | 2 channels | SH-080054 §3.1.2 p.3-2 |
| Voltage output | −10…10 VDC, load 1 kΩ…1 MΩ | SH-080054 §3.1.2 p.3-2 |
| Current output | 0…20 mADC, load 0…600 Ω | SH-080054 §3.1.2 p.3-2 |
| Digital input | 16-bit signed; −4096…4095 normal; −12288…12287 or −16384…16383 high resolution | SH-080054 §3.1.2 p.3-2 |
| Conversion speed | 80 µs/channel | SH-080054 §3.1.2 p.3-2 |
| Accuracy | ±0.1 % at 25 ± 5 °C; ±0.3 % at 0–55 °C | SH-080054 §3.1.2 p.3-2 |
| Absolute maximum output | ±12 V (voltage), 21 mA (current) | SH-080054 §3.1.2 p.3-2 |
| Occupied I/O points | 16 points (intelligent 16 points) | SH-080054 §3.1.2 p.3-2 |
| 5 VDC current consumption | 0.33 A | SH-080054 §3.1.2 p.3-2 |

## 5. Signal ranges and how to select them

| Range | Switch setting code | Typical use | Source |
| --- | --- | --- | --- |
| 4–20 mA | `0H` | 4–20 mA current sensors | SH-080055 §3.4.10 p.3-30 |
| 0–20 mA | `1H` | 0–20 mA current sensors | SH-080055 §3.4.10 p.3-30 |
| 1–5 V | `2H` | 1–5 V voltage transmission | SH-080055 §3.4.10 p.3-30 |
| 0–5 V | `3H` | 0–5 V voltage signals | SH-080055 §3.4.10 p.3-30 |
| −10…10 V | `4H` | Bipolar signals | SH-080055 §3.4.10 p.3-30 |
| 0–10 V | `5H` | 0–10 V voltage signals | SH-080055 §3.4.10 p.3-30 |
| User range | `FH` | Custom offset/gain | SH-080055 §3.4.10 p.3-30 |

The range code **cannot** be changed by writing to `Un\G20`/`Un\G21`: those addresses only read back the configured range. Changing the range requires the intelligent function module switch setting in GX Works2 (SH-080055 §4.5). This is the usual trap when writing buffer memory directly and seeing no change.

## 6. Wiring

- Use shielded twisted pair per channel; `V+`/`V−` (or `I+`/`COM`) travel in the same pair.
- Terminate the shield on `SLD` (Q64AD) or `FG` (Q62DA) at the module end and leave the other end open or grounded at one point near the sensor — never both ends.
- `A.G.` on Q64AD is the analog reference; do not use it as the negative of the 24 V supply.
- Keep signal cables at least 150 mm from power wiring and cross at right angles when they must meet.

## 7. Example program (FROM/TO)

Q64AD sits in the first slot (I/O number 0000 → `U0`) and Q62DA in the next (`U1`). The module's `Y` address shifts with the slot; here Q64AD uses `Y0009` and Q62DA uses `Y0019` for Operating condition setting request.

```il
; --- Q64AD: enable A/D on CH1..CH4, continuous sampling ---
|--[SM400]-----[TO  U0\G0  K000F  K1]--|  ; b0..b3 = 1: enable A/D on CH1..CH4 (Un\G0)
|--[SM400]-----[TO  U0\G9  K0000  K1]--|  ; 0: sampling, no averaging (Un\G9)
|--[SM400]-----[SET Y0009]-------------|  ; Operating condition setting request
|--[X0009]-----[RST Y0009]-------------|  ; X9 = setting completed
|--[SM400]-----[FROM U0\G11 D100  K4]--|  ; D100..D103 = CH1..CH4 (Un\G11..G14)

; --- Q62DA: write digital values for CH1, CH2 ---
|--[SM400]-----[TO  U1\G0  K0003  K1]--|  ; b0, b1 = 1: enable D/A on CH1, CH2 (default 3H)
|--[SM400]-----[TO  U1\G1  D200   K2]--|  ; D200 → CH1, D201 → CH2 (Un\G1, Un\G2)
```

Buffer addresses used above: `Un\G0` = A/D conversion enable/disable (b0–b3 valid on Q64AD, b4–b7 ignored), `Un\G9` = averaging process setting, `Un\G11…G14` = CH1…CH4 digital output value (SH-080055 §3.4.1 p.3-18); `Un\G0` = D/A conversion enable/disable and `Un\G1`/`Un\G2` = CH1/CH2 digital value on Q62DA (SH-080054 §3.4.1 p.3-20). The ladder is a structural example and has not been run on a real PLC: confirm the `Y`/`X` addresses against the actual slot layout before downloading.

## 8. Sources

- Q64AD: <SourceRef doc="sh080055" page="3.1" />, terminal table at <SourceRef doc="sh080055" page="4.3" />, buffer memory at <SourceRef doc="sh080055" page="3.4.1" />.
- Q62DA: <SourceRef doc="sh080054" page="3.1.2" />, terminal table at <SourceRef doc="sh080054" page="4.3" />, buffer memory at <SourceRef doc="sh080054" page="3.4.1" />.
- Range codes: SH-080055 §3.4.10 p.3-30.
