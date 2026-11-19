---
title: MELSEC Q digital output modules (17 models)
family: q
module: q-series
status: draft
source: SH-080042
---

# MELSEC Q digital output modules (17 models)

This page separates the 17 digital output modules of the MELSEC Q series documented in SH-080042, covering the QY… models. QY40P is kept as the reference module for the pin-layout and full-spec deep dive; the other models are covered by the catalogue table below. How to choose a sink or source output for the load is covered on the [I/O wiring](/en/q/system/io-wiring) page.

## 1. QY40P pin layout

The QY40P terminal block table TB1–TB18:

<ManualFigure
  src="/img/manual/qy40p-terminals.jpg"
  alt="QY40P terminal block table: TB1 to TB18, Y0 to YF, TB17 12/24 VDC and TB18 COM"
  caption="QY40P terminal block: TB1–TB16 for Y0–YF, TB17 12/24 VDC, TB18 COM"
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

QY40P groups all 16 points on a single `COM` (TB18); it has no `COM0`/`COM1` split like some 32/64-point modules. For a sink output, the load sits between `+12/24 V` (TB17) and the Y point, and `COM` returns to 0 V.

## 2. Catalogue of 17 digital output modules

<IoCatalog kind="output" />

Every row in the catalogue carries its manual page; a model would only be marked "planned" if a single verifiable spec could not be extracted (currently none).

## 3. Manufacturer output circuits

The manufacturer's figure for the QY10 relay output circuit: contact, load and the external surge suppressor.

<ManualFigure
  src="/img/manual/qy10-output-circuit.jpg"
  alt="QY10 relay output circuit: contact, AC load and surge suppressor"
  caption="QY10 output circuit: relay contact, load"
  doc="SH-080042"
  section="§3.1"
  page="3-1"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

The manufacturer's figure for the QY40P transistor output circuit: sink transistor, zener diode and external fuse.

<ManualFigure
  src="/img/manual/qy40p-output-circuit.jpg"
  alt="QY40P sink transistor output circuit: zener, load and fuse"
  caption="QY40P output circuit: sink transistor, zener"
  doc="SH-080042"
  section="§3.5"
  page="3-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

## 4. QY40P specifications

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

## 5. Sources

- QY40P: <SourceRef doc="sh080042" page="3.5" />, which also contains the terminal block table.
- QY10: <SourceRef doc="sh080042" page="3.1" />.
- Slot position, system current budget and base limits: <SourceRef doc="sh080483" page="8.3" />.

The actual wiring circuits (loads, flyback diodes, load supply) are on the [I/O wiring](/en/q/system/io-wiring) page.
