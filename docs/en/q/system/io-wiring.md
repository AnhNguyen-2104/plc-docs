---
title: I/O wiring (X/Y)
family: q
module: q-series
status: draft
source: SH-080042
---

# I/O wiring (X/Y)

MELSEC Q inputs and outputs are both isolated — by a photocoupler or a relay contact — but the wiring differs in one decisive detail: **which supply rail the common connects to**. Pick the wrong common type and the input never turns on, even though the sensor indicator lights.

## 1. Four wiring variants

**Positive-common input (NPN).** `COM` goes to `+24 V`; the NPN sensor pulls input `X` down to `0 V`. Current flows from the supply into the module and out through the sensor.

The manufacturer's figure for the QX40 input circuit: photocoupler, series resistor, and a positive `COM` tied to `+24 V`.

<ManualFigure
  src="/img/manual/qx40-input-circuit.jpg"
  alt="QX40 positive-common input circuit: photocoupler, 4.7 kΩ resistor and 24 VDC"
  caption="QX40 input circuit: photocoupler, positive common — official figure SH-080042 §2.4"
  doc="SH-080042"
  section="§2.4"
  page="2-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

<IOWiringDiagram variant="input-sink" module="QX40" />

**Negative-common input (PNP).** `COM` goes to `0 V`; the PNP sensor sources current into `X`. The current direction is the reverse of the case above.

The manufacturer's figure for the QX80 input circuit: the same photocoupler, but `COM` ties to `0 V` (negative common).

<ManualFigure
  src="/img/manual/qx80-input-circuit.jpg"
  alt="QX80 negative-common input circuit: photocoupler with COM at 0 V"
  caption="QX80 input circuit: photocoupler, negative common — official figure SH-080042 §2.18"
  doc="SH-080042"
  section="§2.18"
  page="2-24"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

<IOWiringDiagram variant="input-source" module="QX80" />

**Relay output.** A dry contact switches the load; the fuse and surge suppressor are external parts.

The manufacturer's figure for the QY10 relay output circuit: contact, load and the external surge suppressor.

<ManualFigure
  src="/img/manual/qy10-output-circuit.jpg"
  alt="QY10 relay output circuit: contact, AC load and surge suppressor"
  caption="QY10 output circuit: relay contact, load — official figure SH-080042 §3.1"
  doc="SH-080042"
  section="§3.1"
  page="3-1"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

<IOWiringDiagram variant="output-relay" module="QY10" />

**Sink-type transistor output.** The load sits between `+24 V` and `Y`; the transistor pulls `Y` down to `COM` (0 V). Inductive loads need a diode across the coil.

The manufacturer's figure for the QY40P transistor output circuit: sink transistor, zener diode and external fuse.

<ManualFigure
  src="/img/manual/qy40p-output-circuit.jpg"
  alt="QY40P sink transistor output circuit: zener, load and fuse"
  caption="QY40P output circuit: sink transistor, zener — official figure SH-080042 §3.5"
  doc="SH-080042"
  section="§3.5"
  page="3-7"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf"
/>

<IOWiringDiagram variant="output-transistor" module="QY40P" />

## 2. Differential encoder

The QD62 is a 24 V DC-input counter module; the differential pairs A+/A−, B+/B− belong to the QD62D terminal table (RS-422-A line receiver, AM26C32), and the manual assigns no terminal to a Z phase. On a QD62 a 24 V open-collector encoder lands on the 24 V input terminals; a 5 V line-driver encoder uses the differential pairs and runs in a shielded twisted-pair cable.

<IOWiringDiagram variant="encoder-differential" module="QD62D" />

The QD62D has no Z terminal, so the Z+/Z− pair does not appear in the drawing. On a QD62 (24 V DC input) an open-collector encoder follows the positive-common input diagram in section 1. The manual requires 1-phase input to be wired on the phase A side; signal cable stays at least 150 mm from power lines and the screen is earthed at one point on the encoder side (SH-080036 §3.5 p.3-14, §3.6 p.3-15, §4.4.1 p.4-5, §4.4.2 p.4-6).

## 3. Analog input

Channel 1 of the Q64AD uses `V+` (terminal 1) and `V−` (terminal 2); for a current input `V+` is also tied to `I+` (terminal 3). The signal pair must be a shielded twisted-pair cable, and the screen is earthed at one point on the PLC side only.

<IOWiringDiagram variant="analog-shielded" module="Q64AD" />

`A.G.` (terminal 17) is a single terminal shared as the reference for every channel and normally needs no wiring, so it must never be earthed a second time; an unused channel must have `V+` shorted to `V−` to stop the digital value drifting (SH-080055 §4.3 p.4-4, §4.4.1 p.4-5, §4.4.2 p.4-6).

## 4. Sink or source

| Module | Common type | Matching sensor | `COM` connects to | Current path when ON | Source |
| --- | --- | --- | --- | --- | --- |
| QX40, QX41, QX42 | Positive common | NPN (open collector) | `+24 V` | +24 V → COM → module → X → sensor → 0 V | SH-080042 §2.4 p.2-4 |
| QX80, QX81, QX82 | Negative common | PNP (open emitter) | `0 V` | +24 V → sensor → X → module → COM → 0 V | SH-080042 §2.18 p.2-24 |
| QX50, QX70 | Shared, either type | NPN or PNP | According to the selected type | According to the selected type | SH-080042 §2.13 p.2-17 |

A practical rule: the module name states the common type. The QX40 is "positive common", so `COM` **must** be `+24 V`; the QX80 is "negative common", so `COM` **must** be `0 V`. Do not infer it from wire colour or from a sensor vendor's habit.

## 5. Input specifications

| Item | QX40 (positive common) | QX80 (negative common) | Source |
| --- | --- | --- | --- |
| Rated input voltage | 24 VDC (+20/−15%, ripple ≤5%) | 24 VDC (+20/−15%, ripple ≤5%) | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |
| Rated input current | Approx. 4 mA | Approx. 4 mA | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |
| ON threshold | ≥19 V and ≥3 mA | ≥19 V and ≥3 mA | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |
| OFF threshold | ≤11 V and ≤1.7 mA | ≤11 V and ≤1.7 mA | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |
| Input impedance | Approx. 5.6 kΩ | Approx. 5.6 kΩ | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |
| Response time | 1/5/10/20/70 ms, default 10 ms | 1/5/10/20/70 ms, default 10 ms | SH-080042 §2.4 p.2-4, §1.3.1 p.1-18 |
| Common arrangement | 16 points/common, `COM` = TB17, TB18 vacant | 16 points/common, `COM` = TB18, TB17 vacant | SH-080042 §2.4 p.2-4, §2.18 p.2-24 |

The 24 VDC in the table is the module's rated voltage; the actual supply must still stay within +20/−15% at the terminal, after cable drop.

## 6. Output specifications

| Item | QY10 (relay) | QY40P (sink transistor) | Source |
| --- | --- | --- | --- |
| Load voltage | 24 VDC 2 A or 240 VAC 2 A (cos φ = 1) | 12–24 VDC (+20/−15%) | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Current per point | 2 A | 0.1 A | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Current per common | 8 A | 1.6 A | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Leakage at OFF | Not applicable (contact) | ≤0.1 mA | SH-080042 §3.5 p.3-7 |
| Inrush current | Not applicable | 0.7 A for 10 ms | SH-080042 §3.5 p.3-7 |
| Minimum load | 5 VDC 1 mA | Not specified | SH-080042 §3.1 p.3-1 |
| Maximum switching voltage | 264 VAC or 125 VDC | Load voltage 12–24 VDC | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Response time | OFF→ON ≤10 ms, ON→OFF ≤12 ms | ≤1 ms both directions | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Built-in surge suppressor | None | Zener diode | SH-080042 §3.1 p.3-1, §3.5 p.3-7 |
| Contact life | ≥100 thousand operations at rated load | Not applicable | SH-080042 §3.1 p.3-1 |
| Fuse | None; an external fuse is recommended | None; an external fuse is recommended | SH-080042 §1.2.2 p.1-3 |

The QY18A is an 8-point variant with independent points, 2 A per point and 8 A for the whole module (SH-080042 §3.3 p.3-4) — use it when each contact must be separated.

> **Note on the 0.5 A/point rating.** The QY40P manual on disk states 0.1 A/point and 1.6 A/common; it gives no 0.5 A/point rating for the QY40P. The 0.5 A/point figure belongs to the QD62 coincidence output (12/24 VDC, 0.5 A/point, 2 A/common — SH-080036 §3.1 p.3-2), not to a transistor output module.

## 7. Wiring checklist

- [ ] Confirm the module's common type before wiring `COM`: QX40 → `+24 V`, QX80 → `0 V`.
- [ ] Measure the 24 VDC supply at the terminal; it must stay within +20/−15% of 24 V.
- [ ] Match the sensor type (NPN/PNP) to the common type; test each point by hand before running automatically.
- [ ] For inductive loads, fit a diode across the coil, reverse-biased to the supply; reverse voltage ≥10 times the circuit voltage and forward current ≥2 times the load current (SH-080042 §1.2.2 p.1-5).
- [ ] Check the per-point current and the total per common against the output table.
- [ ] Fit an external fuse in output load circuits where a short circuit is possible (SH-080042 §1.2.2 p.1-3).
- [ ] Check that the 0.1 mA leakage current cannot hold a small load (LED lamp, small relay) ON in the OFF state.
- [ ] Run I/O wiring at least 100 mm away from power lines; earth a shielded cable's screen on the PLC side (SH-080483 p.2, §4.8.2 p.111).
- [ ] Tighten M3 terminal screws to 0.42–0.58 N·m (SH-080042 §1.2.6 p.1-17).
- [ ] Earth FG/LG with a resistance of 100 Ω or less and a cable of up to 2 mm² (SH-080483 §4.8.4 p.118).
