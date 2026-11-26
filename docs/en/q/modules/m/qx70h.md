---
title: "QX70H — Digital input module"
family: q
module: module-qx70h
status: draft
source: SH-080042
---

<ModulePage id="qx70h" />

## 1. Signal groups to wire

QX70H is a 16-point 5 VDC input module. The module uses a positive common: COM is tied to +5 V and an NPN sensor pulls each X point to 0 V. The signal groups to wire are:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Input | X0…XF | sensor/switch → module | 16 points, 5 VDC; terminal table in SH-080042 §2-19 |
| Common | COM | — | COM to +5 V; NPN pulls X to 0 V |
| Module supply | 5 VDC from base | base → module | Taken from the base 5 V rail; never connect an external supply to this rail |

## 2. Wiring principles

- **Connection type:** screw terminal block — 18 M3 screw points, one wire per point (SH-080042 §2.15, p. 2-20).
- COM must go to +5 V; reversed polarity will never turn an input on.
- Route signal wiring at least 100 mm from power wiring; if they must share a bundle, use shielded cable and ground the shield on the PLC side (SH-080483 §4.8.2 p.111).
- Feed the sensor/switch from a supply within the module's 5 VDC rated range, on a separate branch and fuse; do not draw it from the base 5 V rail.
- Do not stuff multiple wires into one terminal; keep one wire per X point.

## 3. Reference diagram

The nearest documented diagram is [QX40](/en/q/modules/m/qx40) — positive common. The COM-to-+5 V connection, photocoupler and NPN sensor pulling X to 0 V apply. The TB1–TB18 terminal table of QX40 does not apply to QX70H; its terminal table is in SH-080042 §2-19.

## 4. Manufacturer input/output circuits

The manufacturer terminal diagram for QX70H is in SH-080042 §2.15: <SourceRef doc="sh080042" page="2-19" />. The figure below reproduces the terminal block from that section; the extracted positive-common input circuit is on [QX40](/en/q/modules/m/qx40), the negative-common one on [QX80](/en/q/modules/m/qx80).

<ManualFigure
  src="/img/manual/qx70h-terminals.webp"
  alt="QX70H terminal diagram: TB1–TB18 block and signal names"
  caption="Manufacturer terminal diagram for QX70H: TB1–TB18 terminal block and signal names — screw terminal block"
  doc="SH-080042"
  section="§2.15"
  page="2-20"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. External device connections

- Wire an NPN open-collector sensor or dry contact between the X point and 0 V; COM goes to +5 V.
- Check the sensor supply voltage at the terminal, after cable drop, against the module rated range.
- Use shielded twisted pair for remote sensors; ground the shield at one end in the PLC panel.

## 6. Checklist before power-up

- [ ] Power was switched off before wiring.
- [ ] COM wired to +5 V is correct.
- [ ] Sensor type is correct: NPN.
- [ ] Supply voltage is within the module rated range of 5 VDC.
- [ ] Every point was tested by hand before automatic operation.
- [ ] Signal wiring is at least 100 mm from power wiring.
- [ ] Shield grounded at one end, per panel rules.
- [ ] No multiple wires stuffed into one terminal.
