---
title: "QY40P-TS — Digital output module"
family: q
module: module-qy40pts
status: draft
source: SH-080042
---

<ModulePage id="qy40pts" />

## 1. Signal groups to wire

QY40P-TS is a 16-point sink transistor module, 12–24 VDC. The sink transistor pulls load current to 0 V. The signal groups to wire are:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Output | Y0…YF | module → load | 16 sink transistor points, 12–24 VDC, 0.1 A/point, 1.6 A/common; terminal table in SH-080042 §3-8 |
| Common | COM | — | COM to 0 V; load between +V and Y |
| Load supply | 12–24 VDC | external supply → load | Separate load supply with a fuse |
| External protection | flyback diode and external fuse | — | Fitted outside the module, per load type |

## 2. Wiring principles

- **Connection type:** spring-clamp terminal block (-TS) — 18 spring-clamp points, one wire per point (SH-080042 §3.6, p. 3-9).
- Load between +V and Y; COM to 0 V; the transistor pulls Y to 0 V.
- Route load wiring away from signal and other power wiring; do not bundle AC load wires with DC signal wires.
- Fit an external fuse in the load circuit; the module does not replace load protection.
- Do not stuff multiple wires into one terminal; keep one wire per Y point.

## 3. Reference diagram

The nearest documented diagram is [QY40P](/en/q/modules/m/qy40p) — sink transistor. The COM-to-0 V connection and load between +V and Y apply; the TB1–TB18 terminal table and current ratings of QY40P do not apply to QY40P-TS; its terminal table is in SH-080042 §3-8.

## 4. Manufacturer input/output circuits

The figure below is the manufacturer terminal-block assignment for QY40P-TS in SH-080042 §3.6 (p. 3-9): <SourceRef doc="sh080042" page="3-9" />.

<ManualFigure
  src="/img/manual/qy40pts-terminals.webp"
  alt="QY40P-TS terminal-block assignment: TB1–TB18 and signal names"
  caption="Manufacturer terminal-block assignment for QY40P-TS — spring-clamp terminal block (-TS)"
  doc="SH-080042"
  section="§3.6"
  page="3-9"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

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
