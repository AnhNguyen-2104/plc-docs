---
title: "QY10-TS — Digital output module"
family: q
module: module-qy10ts
status: draft
source: SH-080042
---

<ModulePage id="qy10ts" />

## 1. Signal groups to wire

QY10-TS is a 16-point relay contact module, 24 VDC 2 A / 240 VAC 2 A. Dry contacts switch the load directly. The signal groups to wire are:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Output | Y0…YF | module → load | 16 relay contact points, 24 VDC 2 A / 240 VAC 2 A, 8 A/common; terminal table in SH-080042 §3-2 |
| Common | COM | — | contact-group COM; 8 A per common |
| Load supply | 24 VDC 2 A or 240 VAC 2 A | external supply → load | Separate load supply with a fuse |
| External protection | external fuse and surge suppressor | — | Fitted outside the module, per load type |

## 2. Wiring principles

- **Connection type:** spring-clamp terminal block (-TS) — 18 spring-clamp points, one wire per point (SH-080042 §3.2, p. 3-3).
- Dry contacts have no polarity; they switch AC or DC loads within rating.
- Route load wiring away from signal and other power wiring; do not bundle AC load wires with DC signal wires.
- Fit an external fuse in the load circuit; the module does not replace load protection.
- Do not stuff multiple wires into one terminal; keep one wire per Y point.

## 3. Reference diagram

QY10 is the reference page for a relay-contact output. [QY10-TS](/en/q/modules/m/qy10ts) uses the same output circuit with a spring-clamp terminal block. Do not apply it to TRIAC or transistor outputs.

## 4. Manufacturer input/output circuits

The figure below is the manufacturer terminal-block assignment for QY10-TS in SH-080042 §3.2 (p. 3-3): <SourceRef doc="sh080042" page="3-3" />.

<ManualFigure
  src="/img/manual/qy10ts-terminals.webp"
  alt="QY10-TS terminal-block assignment: TB1–TB18 and signal names"
  caption="Manufacturer terminal-block assignment for QY10-TS — spring-clamp terminal block (-TS)"
  doc="SH-080042"
  section="§3.2"
  page="3-3"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. External device connections

- For inductive AC or DC loads, fit an external surge suppressor (RC snubber or varistor) across the load, per the load manufacturer's recommendation.
- Fit an external fuse for the load current; check the 5 VDC 1 mA minimum load.

## 6. Checklist before power-up

- [ ] Power was switched off before wiring.
- [ ] contact-group COM is correct.
- [ ] Load supply is correct: 24 VDC 2 A / 240 VAC 2 A.
- [ ] Fuse and external surge suppressor fitted for the load.
- [ ] Per-point and per-common currents are within 8 A/common.
- [ ] Every point was tested by hand before automatic operation.
- [ ] Load wiring is separated from signal and other power wiring.
- [ ] No multiple wires stuffed into one terminal.
