---
title: Complete Q system — whole-rack diagram
family: q
module: q-series
status: draft
source: SH-080483
---

# Complete Q system — whole-rack diagram

A MELSEC Q system is more than a CPU: supply, base, I/O modules, motion modules and field devices are tied together by three kinds of path — direct current, digital signals and differential pulses. The diagram below draws the whole rack as it is wired, on an eight-position `Q38B` base.

<SystemDiagram />

## 1. Module positions on the base

The layout below is a reference example, not a mandatory configuration. The real order is a project decision; each module's 5 V figure is there so the supply can be recomputed.

| Position | Model | Role | Key specification | Source |
| --- | --- | --- | --- | --- |
| 0 | Q61P | Power supply module, feeds 5 V to the base and modules | 100–240 VAC in; 5 VDC 6 A out; no 24 V output | SH-080483 §7.2.1 p.212 |
| 1 | Q03UDV | Controller CPU, runs the scan and has built-in Ethernet | 5 V current: 0.58 A | SH-080483 §6.2.5 p.190 |
| 2 | QX40 | 16 digital inputs, positive common | 24 VDC, approx. 4 mA/point, 5.6 kΩ | SH-080042 §2.4 p.2-4 |
| 3 | QY40P | 16 transistor outputs, sink type | 12–24 VDC, 0.1 A/point, 1.6 A/common | SH-080042 §3.5 p.3-7 |
| 4 | QD75D4 | 4-axis positioning, differential pulse output | 5 V: 0.82 A; up to 1 Mpps per axis | SH-080058 §3.1 p.3-5 |
| 5 | QD62 | 2-channel high-speed counter | 5 V: 0.30 A; up to 200 kPPS | SH-080036 §3.1 p.3-2 |
| 6 | Q64AD | Analog-to-digital converter, 4 channels | 5 V: 0.63 A; occupies 16 points | SH-080055 §3.1.1 p.3-1 |
| 7 | QJ71E71-100 | 100BASE-TX Ethernet module | 5 V: 0.50 A; occupies 32 points | SH-080009 §3.2 p.29 |

The "Source" column names the document and page for every figure; no value is inferred from another catalogue.

The diagram numbers 0–7 for the eight positions in use in the reference configuration (supply, CPU and six I/O modules). The manual states the Q38B has 8 I/O positions, not counting the supply and CPU positions, so a real rack still has 2 I/O positions free (SH-080483 §8.3 p.249).

The manufacturer's Q38B main base unit nomenclature: module connector (1), base cover (2), module connector (3), module fixing screw hole (4), installation hole (5), DIN rail adapter hole (6), and the I/O0–I/O11 slot order.

<ManualFigure
  src="/img/manual/qsb-base.webp"
  alt="Q38B main base unit: I/O0 to I/O11 slots, CPU, POWER and mounting holes"
  caption="Q38B main base unit: I/O0–I/O11 slot order and mounting points"
  doc="SH-080483"
  section="§8.1"
  page="239"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080483/sh080483bc.pdf"
/>

## 2. Signal paths

- **AC → Q61P → internal 5 V.** 100–240 VAC enters the L/N terminals of the Q61P; the module produces 5 VDC for the base bus and every module on it. The rack total on 5 V must stay below the 6 A rating (SH-080483 §7.2.1 p.212, §7.2.3 p.231).
- **External 24 V for I/O.** The standard Q61P has no 24 V output, so the I/O group uses a separate 24 VDC supply; the 24 V line is run apart from the 100/200 VAC lines (SH-080483 §4.8.2 p.111; SH-080042 §1.2.6 p.1-17).
- **X inputs.** Sensors and pushbuttons feed signals into the QX40; the input is a photocoupler drawing about 4 mA at 24 VDC (SH-080042 §2.4 p.2-4).
- **Y outputs.** The QY40P pulls the load negative side to 0 V (sink type), 0.1 A per point and 1.6 A per common; inductive loads need a diode across the coil (SH-080042 §3.5 p.3-7, §1.2.2 p.1-5).
- **Pulse output to the amplifier.** The QD75D4 sends the differential pairs F+/F− and R+/R− to the MR-J4-A; maximum distance is 10 m with differential output (SH-080058 §3.1 p.3-5, §3.4.3 p.3-26).
- **Ethernet to HMI/PC.** The QJ71E71-100 runs 100BASE-TX, up to 100 m per cable segment (SH-080009 §3.2 p.29).

## 3. Replacing a module

Adding or swapping a module takes two steps: add one entry to the site's module registry, and add one page describing that module. The whole-rack diagram does not need redrawing — each base position is an independent cell, and the module name comes from data rather than being hard-coded in the drawing.

When swapping a real module on the rack, always recompute the 5 V current (see [Power and base unit](./power-and-base)) and re-check the input common type before wiring (see [I/O wiring](./io-wiring)).
