---
title: "QY80-TS — Digital output module"
family: q
module: module-qy80ts
status: draft
source: SH-080042
---

<ModulePage id="qy80ts" />

## 1. Signal groups to wire

QY80-TS is a 16-point source transistor module, 12–24 VDC. The source transistor drives current from the load to 0 V. The signal groups to wire are:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Output | Y0…YF | module → load | 16 source transistor points, 12–24 VDC, 0.5 A/point, 4 A/common; terminal table in SH-080042 §3-21 |
| Common | COM | — | COM to +V; load between Y and 0 V |
| Load supply | 12–24 VDC | external supply → load | Separate load supply with a fuse |
| External protection | flyback diode and external fuse | — | Fitted outside the module, per load type |

## 2. Wiring principles

- **Connection type:** spring-clamp terminal block (-TS) — 18 spring-clamp points, one wire per point (SH-080042 §3.15, p. 3-22).
- Load between Y and 0 V; COM to +V; the transistor drives Y to +V.
- Route load wiring away from signal and other power wiring; do not bundle AC load wires with DC signal wires.
- Fit an external fuse in the load circuit; the module does not replace load protection.
- Do not stuff multiple wires into one terminal; keep one wire per Y point.

## 3. Reference diagram

The nearest documented diagram is [QY80](/en/q/modules/m/qy80) — source transistor. The COM-to-+V connection and load between Y and 0 V apply. Do not use the sink circuit of [QY40P](/en/q/modules/m/qy40p) for QY80-TS; its terminal table is in SH-080042 §3-21.

## 4. Manufacturer input/output circuits

The figure below is the manufacturer terminal-block assignment for QY80-TS in SH-080042 §3.15 (p. 3-22): <SourceRef doc="sh080042" page="3-22" />.

<ManualFigure
  src="/img/manual/qy80ts-terminals.webp"
  alt="QY80-TS terminal-block assignment: TB1–TB18 and signal names"
  caption="Manufacturer terminal-block assignment for QY80-TS — spring-clamp terminal block (-TS)"
  doc="SH-080042"
  section="§3.15"
  page="3-22"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. External device connections

- Connect the DC load between Y and 0 V; fit a flyback diode across the load.
- Fit an external fuse; check the per-point current and the total per common.
- With small loads, check the OFF-state leakage current that can hold the load ON.

## 6. Checklist before power-up

- [ ] Power was switched off before wiring.
- [ ] COM to +V is correct.
- [ ] Load supply is correct: 12–24 VDC.
- [ ] Flyback diode and fuse fitted for the load.
- [ ] Per-point and per-common currents are within 0.5 A/point, 4 A/common.
- [ ] Every point was tested by hand before automatic operation.
- [ ] Load wiring is separated from signal and other power wiring.
- [ ] No multiple wires stuffed into one terminal.
