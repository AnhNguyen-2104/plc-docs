---
title: "QY40P — Digital output module"
family: q
module: module-qy40p
status: draft
source: SH-080042
---

<ModulePage id="qy40p" />

## 1. Signal groups to wire

QY40P is a 16-point sink transistor module, 12–24 VDC. The sink transistor pulls load current to 0 V. The signal groups to wire are:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Output | Y0…YF | module → load | 16 sink transistor points, 12–24 VDC, 0.1 A/point, 1.6 A/common; terminal table in SH-080042 §3.5 |
| Common | COM | — | COM to 0 V; load between +V and Y |
| Load supply | 12–24 VDC | external supply → load | Separate load supply with a fuse |
| External protection | flyback diode and external fuse | — | Fitted outside the module, per load type |

The QY40P terminal block table TB1–TB18:

<ManualFigure
  src="/img/manual/qy40p-terminals.webp"
  alt="QY40P terminal block table: TB1 to TB18, Y0 to YF, TB17 12/24 VDC and TB18 COM"
  caption="QY40P terminal block: TB1–TB16 for Y0–YF, TB17 12/24 VDC, TB18 COM — screw terminal block"
  doc="SH-080042"
  section="§3.5"
  page="3-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

| Terminal | Signal | Function | Source |
| --- | --- | --- | --- |
| TB1–TB16 | Y0–YF | 16 transistor output points | SH-080042 §3.5 p.3-7 |
| TB17 | 12/24 VDC | Output-stage supply | SH-080042 §3.5 p.3-7 |
| TB18 | COM | Common (0 V) for all 16 points | SH-080042 §3.5 p.3-7 |

QY40P groups all 16 points on a single COM (TB18); it has no COM0/COM1 split like some 32/64-point modules. For a sink output, the load sits between +12/24 V (TB17) and the Y point, and COM returns to 0 V.

## 2. Wiring principles

- **Connection type:** screw terminal block — 18 M3 screw points, one wire per point (SH-080042 §3.5, p. 3-7).
- Load between +V and Y; COM to 0 V; the transistor pulls Y to 0 V.
- Route load wiring away from signal and other power wiring; do not bundle AC load wires with DC signal wires.
- Fit an external fuse in the load circuit; the module does not replace load protection.
- Do not stuff multiple wires into one terminal; keep one wire per Y point.

## 3. Reference diagram

The nearest documented diagram is [QY40P](/en/q/modules/m/qy40p) — sink transistor. The COM-to-0 V connection and load between +V and Y apply; the TB1–TB18 terminal table and current ratings of QY40P do not apply to QY40P; its terminal table is in SH-080042 §3.5.

## 4. Manufacturer input/output circuits



The manufacturer's figure for the QY40P transistor output circuit: sink transistor, zener diode and external fuse.

<ManualFigure
  src="/img/manual/qy40p-output-circuit.webp"
  alt="QY40P sink transistor output circuit: zener, load and fuse"
  caption="QY40P output circuit: sink transistor, zener — screw terminal block"
  doc="SH-080042"
  section="§3.5"
  page="3-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

### Output specifications

| Item | Value | Source |
| --- | --- | --- |
| Number of output points | 16 points | SH-080042 §3.5 p.3-7 |
| Rated load voltage | 12–24 VDC (+20/−15 %) | SH-080042 §3.5 p.3-7 |
| Maximum load current | 0.1 A/point, 1.6 A/common | SH-080042 §3.5 p.3-7 |
| Maximum inrush current | 0.7 A for 10 ms | SH-080042 §3.5 p.3-7 |
| Leakage current at OFF | ≤ 0.1 mA | SH-080042 §3.5 p.3-7 |
| Voltage drop at ON | 0.1 V (TYP.) at 0.1 A; 0.2 V (MAX.) at 0.1 A | SH-080042 §3.5 p.3-7 |
| Response time | ≤ 1 ms (OFF→ON and ON→OFF, resistive load) | SH-080042 §3.5 p.3-7 |
| Protection | Overload and overheat | SH-080042 §3.5 p.3-7 |
| Occupied I/O points | 16 points (16-point output assignment) | SH-080042 §3.5 p.3-7 |
| 5 VDC current consumption | 65 mA (TYP., all points ON) | SH-080042 §3.5 p.3-7 |

The 0.1 mA leakage figure matters with small loads: it can hold a low-power 24 V relay from releasing promptly or at all, so check it against the load manufacturer's release current.

> **Note on the 0.5 A/point rating.** The QY40P manual on disk states 0.1 A/point and 1.6 A/common; it gives no 0.5 A/point rating for the QY40P. The 0.5 A/point figure belongs to the QD62 coincidence output (12/24 VDC, 0.5 A/point, 2 A/common — SH-080036 §3.1 p.3-2), not to a transistor output module.

## 5. External device connections

- Connect the DC load between +V and Y; fit a flyback diode across the load, cathode to +V.
- Fit an external fuse; check the per-point current and the total per common.
- With small loads, check the OFF-state leakage current that can hold the load ON.

## 6. Checklist before power-up

- [ ] Power was switched off before wiring.
- [ ] COM to 0 V is correct.
- [ ] Load supply is correct: 12–24 VDC.
- [ ] Flyback diode and fuse fitted for the load.
- [ ] Per-point and per-common currents are within 0.1 A/point, 1.6 A/common.
- [ ] Every point was tested by hand before automatic operation.
- [ ] Load wiring is separated from signal and other power wiring.
- [ ] No multiple wires stuffed into one terminal.
