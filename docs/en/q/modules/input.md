---
title: MELSEC Q digital input modules (26 models)
family: q
module: q-series
status: draft
source: SH-080042
---

# MELSEC Q digital input modules (26 models)

This page separates the 26 digital input modules of the MELSEC Q series documented in SH-080042, covering the QX… models and QI60. QX40 is kept as the reference module for the pin-layout and full-spec deep dive; the other models are covered by the catalogue table below. The positive-common versus negative-common decision belongs to wiring, see [I/O wiring](/en/q/system/io-wiring).

## 1. QX40 pin layout

The manufacturer's terminal block table TB1–TB18:

<ManualFigure
  src="/img/manual/qx40-terminals.jpg"
  alt="QX40 terminal block table: TB1 to TB18, X0 to XF and COM"
  caption="QX40 terminal block: TB1–TB16 for X0–XF, TB17 is COM"
  doc="SH-080042"
  section="§2.4"
  page="2-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

The QX40 terminal block runs TB1–TB16 for X0–XF, TB17 is `COM` shared by all 16 points, and TB18 is vacant. MELSEC Q numbers X/Y devices in hexadecimal, so XA follows X9 and the last point of a 16-point module is XF.

| Terminal | Signal | Function | Source |
| --- | --- | --- | --- |
| TB1–TB8 | X0–X7 | First eight input points | SH-080042 §2.4 p.2-4 |
| TB9–TB16 | X8–XF | Remaining eight input points | SH-080042 §2.4 p.2-4 |
| TB17 | COM | Common for all 16 points (positive side) | SH-080042 §2.4 p.2-4 |
| TB18 | — | Vacant | SH-080042 §2.4 p.2-4 |

Because it is a positive common module, `COM` is tied to **+24 V** and each switch connects its X point to **0 V**; reversing the polarity will not turn the input on. How to choose positive or negative common for the sensor type is covered on the [I/O wiring](/en/q/system/io-wiring) page.

## 2. Catalogue of 26 digital input modules

<IoCatalog kind="input" />

Every row in the catalogue carries its manual page; a model would only be marked "planned" if a single verifiable spec could not be extracted (currently none).

## 3. Manufacturer input circuits

The manufacturer's figure for the QX40 input circuit (positive common):

<ManualFigure
  src="/img/manual/qx40-input-circuit.jpg"
  alt="QX40 positive-common input circuit: photocoupler, 4.7 kΩ resistor"
  caption="QX40 input circuit: photocoupler, positive common"
  doc="SH-080042"
  section="§2.4"
  page="2-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

The manufacturer's figure for the QX80 input circuit (negative common):

<ManualFigure
  src="/img/manual/qx80-input-circuit.jpg"
  alt="QX80 negative-common input circuit: photocoupler with COM at 0 V"
  caption="QX80 input circuit: photocoupler, negative common"
  doc="SH-080042"
  section="§2.18"
  page="2-24"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

The two circuits differ only in the `COM` polarity; the photocoupler and current-limiting resistor are the same. Choose QX40 when an NPN sensor pulls to 0 V, and QX80 when a PNP sensor sources from +24 V.

## 4. QX40 specifications

| Item | Value | Source |
| --- | --- | --- |
| Number of input points | 16 points | SH-080042 §2.4 p.2-4 |
| Rated input voltage | 24 VDC (+20/−15 %, ripple ≤ 5 %) | SH-080042 §2.4 p.2-4 |
| Rated input current | approx. 4 mA | SH-080042 §2.4 p.2-4 |
| ON voltage / current | ≥ 19 V / ≥ 3 mA | SH-080042 §2.4 p.2-4 |
| OFF voltage / current | ≤ 11 V / ≤ 1.7 mA | SH-080042 §2.4 p.2-4 |
| Input impedance | approx. 5.6 kΩ | SH-080042 §2.4 p.2-4 |
| Response time | 1/5/10/20/70 ms, set in PLC parameters (default 10 ms) | SH-080042 §2.4 p.2-4 |
| Isolation | Photocoupler | SH-080042 §2.4 p.2-4 |
| Occupied I/O points | 16 points (16-point input assignment) | SH-080042 §2.4 p.2-4 |
| 5 VDC current consumption | 50 mA (TYP., all points ON) | SH-080042 §2.4 p.2-4 |

## 5. Sources

- QX40: <SourceRef doc="sh080042" page="2.4" />, which also contains the terminal block table.
- QX80: <SourceRef doc="sh080042" page="2.18" />.
- Slot position, system current budget and base limits: <SourceRef doc="sh080483" page="8.3" />.

The actual wiring circuits (switches, sensors, 24 V supply) are on the [I/O wiring](/en/q/system/io-wiring) page.
