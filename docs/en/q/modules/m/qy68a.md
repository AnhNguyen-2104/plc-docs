---
title: "QY68A — Digital output module"
family: q
module: module-qy68a
status: draft
source: SH-080042
---

<ModulePage id="qy68a" />

## 1. Signal groups to wire

QY68A is a 8-point independent sink/source transistor module, 5–24 VDC. Each point selects sink or source independently. The signal groups to wire are:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Output | Y0…Y7 | module → load | 8 independent sink/source transistor points, 5–24 VDC, 2 A/point, 8 A/unit; terminal table in SH-080042 §3-15 |
| Common | — | — | no common; each point selects sink or source |
| Load supply | 5–24 VDC | external supply → load | Separate load supply with a fuse |
| External protection | diode and fuse per point | — | Fitted outside the module, per load type |

## 2. Wiring principles

- **Connection type:** screw terminal block — 18 M3 screw points, one wire per point (SH-080042 §3.11, p. 3-15).
- Each point selects sink or source; keep the chosen direction for that point.
- Route load wiring away from signal and other power wiring; do not bundle AC load wires with DC signal wires.
- Fit an external fuse in the load circuit; the module does not replace load protection.
- Independent points: do not common terminals that use different load supplies.

## 3. Reference diagram

Use [QY40P](/en/q/modules/m/qy40p) for the sink scheme and [QY80](/en/q/modules/m/qy80) for the source scheme. Each QY68A point selects one of the two; the shared commons of those pages do not apply. Terminal table in SH-080042 §3-15.

## 4. Manufacturer input/output circuits

The figure below is the manufacturer terminal-block assignment for QY68A in SH-080042 §3.11 (p. 3-15): <SourceRef doc="sh080042" page="3-15" />.

<ManualFigure
  src="/img/manual/qy68a-terminals.webp"
  alt="QY68A terminal-block assignment: TB1–TB18, Y00–Y07 and spare points"
  caption="Manufacturer terminal-block assignment for QY68A — screw terminal block"
  doc="SH-080042"
  section="§3.11"
  page="3-15"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. External device connections

- Wire each point in the chosen sink or source direction; fit the flyback diode in the correct direction.
- Fit an external fuse per point or per load group.
- Do not common the terminals of points that use different load supplies.

## 6. Checklist before power-up

- [ ] Power was switched off before wiring.
- [ ] No common; each point set to sink/source is correct.
- [ ] Load supply is correct: 5–24 VDC.
- [ ] Flyback diode and fuse fitted for the load.
- [ ] Per-point and per-common currents are within 2 A/point, 8 A/unit.
- [ ] Every point was tested by hand before automatic operation.
- [ ] Load wiring is separated from signal and other power wiring.
- [ ] No multiple wires stuffed into one terminal.
