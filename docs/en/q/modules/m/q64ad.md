---
title: "Q64AD — Analog module"
family: q
module: module-q64ad
status: draft
source: SH-080055
---

<ModulePage id="q64ad" />

## 1. Signal groups to wire

Q64AD is a four-channel analog input module. Each channel uses one signal pair and one shield terminal:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Analog input | CH1…CH4 V+/V−/I+ | sensor → module | Voltage or current, selected by range (SH-080055 §4.3 p.4-4) |
| Shield | SLD per channel | — | Twisted-pair shield at the module end (SH-080055 §4.3 p.4-4) |
| Reference | A.G. | — | Analog input 0 V reference; not the 24 V supply 0 V (SH-080055 §4.3 p.4-4) |
| Frame ground | FG | — | Panel ground (SH-080055 §4.3 p.4-4) |

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

## 2. Wiring principles

- **Connection type:** screw terminal block — 18 screw points, one wire per point (SH-080055 §3.1, p. 3-2).
- Use shielded twisted pair for each channel; V+/V− or I+/V− run in the same pair.
- Connect the shield to SLD at the module end; leave the other end open or ground it at one point near the sensor — never both ends.
- A.G. is the analog input reference, not tied to FG in the panel and not used as the 24 V supply negative.
- Keep signal wiring at least 150 mm from power wiring; cross at right angles when unavoidable.
- Short unused channels V+ to V− to stop the digital value from fluctuating (SH-080055 §4.4.1 p.4-5).

## 3. Reference diagram

- Q64AD is the analog-input reference page. [Q62DA](/en/q/modules/m/q62da) is an analog output; only the 18-point block structure and shielding principle can be compared, not the signal direction.
- The Q64AD pin table, signal ranges and V+/V−/I+/SLD wiring below apply.
- Do not apply the Q62DA output circuit to Q64AD.

## 4. Manufacturer input/output circuits

The manufacturer Q64AD analog input wiring:

<ManualFigure
  src="/img/manual/q64ad-wiring.webp"
  alt="Q64AD wiring: V+, V−, I+, A.G., SLD and shielded twisted pair"
  caption="Q64AD analog input wiring — screw terminal block"
  doc="SH-080055"
  section="§4.4.2"
  page="4-6"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080055/sh080055u.pdf"
/>

<ManualFigure
  src="/img/manual/q64ad-terminals.webp"
  alt="Q64AD 18-point terminal block: terminal numbers 1–18 and signal names"
  caption="Q64AD terminal block: terminals 1–18 and signal names — screw terminal block"
  doc="SH-080055"
  section="§4.2"
  page="4-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080055/sh080055u.pdf"
/>

### Specifications

| Item | Value | Source |
| --- | --- | --- |
| Number of channels | 4 channels | SH-080055 §3.1 p.3-1 |
| Voltage input | −10…10 VDC, input resistance 1 Mohm | SH-080055 §3.1 p.3-1 |
| Current input | 0…20 mADC, input resistance 250 ohm | SH-080055 §3.1 p.3-1 |
| Digital output | 16-bit signed; −4096…4095 normal; −12288…12287 or −16384…16383 high resolution | SH-080055 §3.1 p.3-1 |
| Max. resolution (0–10 V) | 2.5 mV normal / 0.625 mV high resolution | SH-080055 §3.1 p.3-1 |
| Max. resolution (0–5 V) | 1.25 mV normal / 0.416 mV high resolution | SH-080055 §3.1 p.3-1 |
| Max. resolution (1–5 V) | 1.0 mV normal / 0.333 mV high resolution | SH-080055 §3.1 p.3-1 |
| Conversion speed | 80 µs/channel | SH-080055 §3.1 p.3-2 |
| Extra time for temperature-drift compensation | +160 µs for all channels | SH-080055 §3.1 p.3-2 |
| Absolute maximum input | ±15 V (voltage), ±30 mA (current) | SH-080055 §3.1 p.3-2 |
| Occupied I/O points | 16 points (intelligent 16 points) | SH-080055 §3.1 p.3-2 |
| 5 VDC current consumption | 0.63 A | SH-080055 §3.1 p.3-2 |

### Signal ranges

| Range | Switch setting code | Typical use | Source |
| --- | --- | --- | --- |
| 4–20 mA | `0H` | 4–20 mA current sensors | SH-080055 §3.4.10 p.3-30 |
| 0–20 mA | `1H` | 0–20 mA current sensors | SH-080055 §3.4.10 p.3-30 |
| 1–5 V | `2H` | 1–5 V voltage transmission | SH-080055 §3.4.10 p.3-30 |
| 0–5 V | `3H` | 0–5 V voltage signals | SH-080055 §3.4.10 p.3-30 |
| −10…10 V | `4H` | Bipolar signals | SH-080055 §3.4.10 p.3-30 |
| 0–10 V | `5H` | 0–10 V voltage signals | SH-080055 §3.4.10 p.3-30 |
| User range | `FH` | Custom offset/gain | SH-080055 §3.4.10 p.3-30 |

## 5. External device connections

- A 4–20 mA or 0–20 mA sensor connects to I+/V−; a voltage sensor connects to V+/V−.
- Use shielded twisted pair and ground the shield at SLD, one end at the module.
- A.G. is the common reference for all channels; do not ground it a second time.
- Check the GX Works2 range setting against the sensor signal before downloading (SH-080055 §4.5).

## 6. Checklist before power-up

- [ ] Power was switched off before wiring.
- [ ] Correct V+/V− or I+/V− pair for each channel.
- [ ] Shield connected to SLD at one end, module side.
- [ ] A.G. is not tied to FG or the 24 V supply 0 V.
- [ ] Signal wiring is at least 150 mm from power wiring.
- [ ] Unused channels are shorted V+ to V−.
- [ ] GX Works2 signal range matches the sensor.
- [ ] Continuity and insulation were measured before power-up.
