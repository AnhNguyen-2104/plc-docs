---
title: "QY18A — Digital output module"
family: q
module: module-qy18a
status: draft
source: SH-080042
---

<ModulePage id="qy18a" />

## 1. Signal groups to wire

QY18A is a 8-point independent relay contact module, 24 VDC 2 A / 240 VAC 2 A. Dry contacts switch the load directly. The signal groups to wire are:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Output | Y0…Y7 | module → load | 8 independent relay contact points, 24 VDC 2 A / 240 VAC 2 A, 8 A/unit; terminal table in SH-080042 §3-4 |
| Common | — | — | no common; 8 independent contacts, 8 A per unit |
| Load supply | 24 VDC 2 A or 240 VAC 2 A | external supply → load | Separate load supply with a fuse |
| External protection | external fuse and surge suppressor | — | Fitted outside the module, per load type |

## 2. Wiring principles

- **Connection type:** screw terminal block — 18 M3 screw points, one wire per point (SH-080042 §3.3, p. 3-4).
- Each contact is independent and has no polarity; different circuits may be switched.
- Route load wiring away from signal and other power wiring; do not bundle AC load wires with DC signal wires.
- Fit an external fuse in the load circuit; the module does not replace load protection.
- Independent points: do not common terminals that use different load supplies.

## 3. Reference diagram

Use [QY10](/en/q/modules/m/qy10) for the relay-contact circuit. The dry contact and surge suppressor apply; the shared 8 A/common arrangement does not because QY18A has eight independent contacts.

## 4. Manufacturer input/output circuits

The figure below is the manufacturer terminal-block assignment for QY18A in SH-080042 §3.3 (p. 3-4): <SourceRef doc="sh080042" page="3-4" />.

<ManualFigure
  src="/img/manual/qy18a-terminals.webp"
  alt="QY18A terminal-block assignment: TB1–TB18 and signal names"
  caption="Manufacturer terminal-block assignment for QY18A — screw terminal block"
  doc="SH-080042"
  section="§3.3"
  page="3-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. External device connections

- Wire each contact to its own load circuit, within the contact rating.
- For inductive AC or DC loads, fit an external surge suppressor (RC snubber or varistor) across the load, per the load manufacturer's recommendation.
- Fit an external fuse in each load circuit.

## 6. Checklist before power-up

- [ ] Power was switched off before wiring.
- [ ] No common; each contact is independent is correct.
- [ ] Load supply is correct: 24 VDC 2 A / 240 VAC 2 A.
- [ ] Fuse and external surge suppressor fitted for the load.
- [ ] Per-point and per-common currents are within 8 A/unit.
- [ ] Every point was tested by hand before automatic operation.
- [ ] Load wiring is separated from signal and other power wiring.
- [ ] No multiple wires stuffed into one terminal.
