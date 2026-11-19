---
title: MELSEC Q digital I/O modules (46 models)
family: q
module: q-series
status: draft
source: SH-080042, SH-080483
---

# MELSEC Q digital I/O modules (46 models)

This page catalogues the 46 digital I/O modules documented in SH-080042, one verified spec per model with its manual page. QX40 and QY40P are kept as the reference pair for the pin-layout and full-spec deep dives; the other models are covered by the catalogue table below.

## 1. QX40 pin layout

The manufacturer's figure for the QX40 input circuit:

<ManualFigure
  src="/img/manual/qx40-input-circuit.jpg"
  alt="QX40 positive-common input circuit: photocoupler, 4.7 kΩ resistor"
  caption="QX40 input circuit: photocoupler, positive common"
  doc="SH-080042"
  section="§2.4"
  page="2-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

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

Because it is a positive common module, `COM` is tied to **+24 V** and each switch connects its X point to **0 V**; reversing the polarity will not turn the input on. The circuit drawings are on the [I/O wiring](/en/q/system/io-wiring) page.

## 2. Catalogue of 46 digital I/O modules

<IoCatalog />

Every row in the catalogue carries its manual page; a model would only be marked "planned" if a single verifiable spec could not be extracted (currently none).

## 3. QX40 specifications

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

## 4. QY40P pin layout

The manufacturer's figure for the QY40P transistor output circuit:

<ManualFigure
  src="/img/manual/qy40p-output-circuit.jpg"
  alt="QY40P sink transistor output circuit: zener diode, load and fuse"
  caption="QY40P output circuit: sink transistor, zener"
  doc="SH-080042"
  section="§3.5"
  page="3-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

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

## 5. QY40P specifications

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

## 6. Sources

- QX40: <SourceRef doc="sh080042" page="2.4" />, which also contains the terminal block table.
- QY40P: <SourceRef doc="sh080042" page="3.5" />.
- Slot position, system current budget and base limits: <SourceRef doc="sh080483" page="8.3" />.

The actual wiring circuits (switches, loads, flyback diodes) are on the [I/O wiring](/en/q/system/io-wiring) page.
