---
title: "QX90H — Digital input module"
family: q
module: module-qx90h
status: draft
source: SH-080042
---

<ModulePage id="qx90h" />

## 1. Signal groups to wire

QX90H is a 16-point 5 VDC input module. The module uses a negative common: COM is tied to 0 V and a PNP sensor or line driver drives each X point to +5 V. The signal groups to wire are:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Input | X0…XF | sensor/switch → module | 16 points, 5 VDC; terminal table in SH-080042 §2-34 |
| Common | COM | — | COM to 0 V; PNP/line driver drives X to +5 V |
| Module supply | 5 VDC from base | base → module | Taken from the base 5 V rail; never connect an external supply to this rail |

## 2. Wiring principles

- **Connection type:** screw terminal block — 18 M3 screw points, one wire per point (SH-080042 §2.25, p. 2-35).
- COM must go to 0 V; reversed polarity will never turn an input on.
- Route signal wiring at least 100 mm from power wiring; if they must share a bundle, use shielded cable and ground the shield on the PLC side (SH-080483 §4.8.2 p.111).
- Feed the sensor/switch from a supply within the module's 5 VDC rated range, on a separate branch and fuse; do not draw it from the base 5 V rail.
- Do not stuff multiple wires into one terminal; keep one wire per X point.

## 3. Reference diagram

The nearest documented diagram is [QX80](/en/q/modules/m/qx80) — negative common. The COM-to-0 V connection, photocoupler and PNP/line driver driving X to +5 V apply. The terminal table of QX80 does not apply to QX90H; its terminal table is in SH-080042 §2-34.

## 4. Manufacturer input/output circuits

The manufacturer terminal diagram for QX90H is in SH-080042 §2.25: <SourceRef doc="sh080042" page="2-34" />. The figure below reproduces the terminal block from that section; the extracted positive-common input circuit is on [QX40](/en/q/modules/m/qx40), the negative-common one on [QX80](/en/q/modules/m/qx80).

<ManualFigure
  src="/img/manual/qx90h-terminals.webp"
  alt="QX90H terminal diagram: TB1–TB18 block and signal names"
  caption="Manufacturer terminal diagram for QX90H: TB1–TB18 terminal block and signal names — screw terminal block"
  doc="SH-080042"
  section="§2.25"
  page="2-35"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 5. External device connections

- Wire a PNP sensor or line driver to drive +5 V into the X point, or a dry contact between +5 V and the X point; COM goes to 0 V.
- Check the sensor supply voltage at the terminal, after cable drop, against the module rated range.
- Use shielded twisted pair for remote sensors; ground the shield at one end in the PLC panel.

## 6. Checklist before power-up

- [ ] Power was switched off before wiring.
- [ ] COM wired to 0 V is correct.
- [ ] Sensor type is correct: PNP or line driver.
- [ ] Supply voltage is within the module rated range of 5 VDC.
- [ ] Every point was tested by hand before automatic operation.
- [ ] Signal wiring is at least 100 mm from power wiring.
- [ ] Shield grounded at one end, per panel rules.
- [ ] No multiple wires stuffed into one terminal.
