---
title: "Q62DA — Analog module"
family: q
module: module-q62da
status: draft
source: SH-080054
---

<ModulePage id="q62da" />

## 1. Signal groups to wire

Q62DA is a two-channel analog output module. Each channel uses one output pair and a common:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Analog output | CH1, CH2 V+/COM/I+ | module → load | Voltage or current, selected by range (SH-080054 §4.3 p.4-5) |
| Auxiliary supply | 24V, 24G | supply → module | Isolated supply for the output stage (SH-080054 §4.3 p.4-5) |
| Frame ground | FG | — | Panel ground (SH-080054 §4.3 p.4-5) |

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

## 2. Wiring principles

- **Connection type:** screw terminal block — 18 screw points, one wire per point (SH-080054 §3.1, p. 3-2).
- Use shielded twisted pair for each channel; connect the shield to FG at the module end, leaving the other end open or grounded at one point.
- Q62DA has no separate SLD/A.G.; the signal return goes to each channel COM.
- The auxiliary 24 VDC supply (terminals 16/17) feeds the isolated output stage and is required for 0–20 mA into a large load.
- Keep signal wiring at least 150 mm from power wiring.
- Never short a voltage or current output to the supply.

## 3. Reference diagram

- Q62DA is the analog-output reference page. [Q64AD](/en/q/modules/m/q64ad) is an analog input; only the 18-point block structure and shielding can be compared, not the signal direction.
- The Q62DA pin table, wiring diagram and ratings below apply.
- Do not apply the Q64AD input circuit to Q62DA.

## 4. Manufacturer input/output circuits

The manufacturer Q62DA analog output wiring, covering voltage and current outputs:

<ManualFigure
  src="/img/manual/q62da-wiring.webp"
  alt="Q62DA wiring: voltage output V+/COM and current output I+/COM, load and FG"
  caption="Q62DA analog output wiring: voltage and current — screw terminal block"
  doc="SH-080054"
  section="§4.4.2"
  page="4-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080054/sh080054v.pdf"
/>

<ManualFigure
  src="/img/manual/q62da-terminals.webp"
  alt="Q62DA 18-point terminal block: terminal numbers 1–18 and signal names"
  caption="Q62DA terminal block: terminals 1–18 and signal names — screw terminal block"
  doc="SH-080054"
  section="§4.2"
  page="4-5"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080054/sh080054v.pdf"
/>

### Specifications

| Item | Value | Source |
| --- | --- | --- |
| Number of channels | 2 channels | SH-080054 §3.1.2 p.3-2 |
| Voltage output | −10…10 VDC, load 1 kohm…1 Mohm | SH-080054 §3.1.2 p.3-2 |
| Current output | 0…20 mADC, load 0…600 ohm | SH-080054 §3.1.2 p.3-2 |
| Digital input | 16-bit signed; −4096…4095 normal; −12288…12287 or −16384…16383 high resolution | SH-080054 §3.1.2 p.3-2 |
| Conversion speed | 80 µs/channel | SH-080054 §3.1.2 p.3-2 |
| Accuracy | ±0.1 % at 25 ± 5 °C; ±0.3 % at 0–55 °C | SH-080054 §3.1.2 p.3-2 |
| Absolute maximum output | ±12 V (voltage), 21 mA (current) | SH-080054 §3.1.2 p.3-2 |
| Occupied I/O points | 16 points (intelligent 16 points) | SH-080054 §3.1.2 p.3-2 |
| 5 VDC current consumption | 0.33 A | SH-080054 §3.1.2 p.3-2 |

## 5. External device connections

- A voltage load connects between V+ and COM; a current load connects between I+ and COM.
- Use shielded twisted pair and ground the shield at FG, one end at the module.
- Feed the auxiliary 24 VDC supply into terminals 16/17 for 0–20 mA into a large load.
- Check the GX Works2 range setting against the load before downloading.

## 6. Checklist before power-up

- [ ] Power was switched off before wiring.
- [ ] Correct V+/COM or I+/COM pair for each channel.
- [ ] Auxiliary 24 VDC polarity is correct at terminals 16/17.
- [ ] Shield connected to FG at one end, module side.
- [ ] Signal wiring is at least 150 mm from power wiring.
- [ ] Load is within the voltage/current range.
- [ ] GX Works2 signal range matches the load.
- [ ] Continuity and insulation were measured before power-up.
