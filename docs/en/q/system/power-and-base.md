---
title: Power supply and base unit
family: q
module: q-series
status: draft
source: SH-080483
---

# Power supply and base unit

The power supply module decides whether the system runs at all, and the base unit decides how many modules fit. Both are bound by a single number: the total 5 V current of everything on the rack must stay below the power supply module's rating.

## 1. Power supply modules

| Model | Input voltage | 5 VDC output | 24 VDC output | Dimensions (H×W×D) | Weight | Source |
| --- | --- | --- | --- | --- | --- | --- |
| Q61P | 100–240 VAC (85–264 VAC) | 6 A | None | 98 × 55.2 × 90 mm | 0.40 kg | SH-080483 §7.2.1 p.213 |
| Q62P | 100–240 VAC (85–264 VAC) | 3 A | 0.6 A (24 VDC ±10%) | 98 × 55.2 × 90 mm | 0.39 kg | SH-080483 §7.2.1 p.213 |
| Q63P | 24 VDC (15.6–31.2 VDC) | 6 A | None | 98 × 55.2 × 90 mm | 0.33 kg | SH-080483 §7.2.1 p.214 |
| Q64P | 100–120 / 200–240 VAC | 8.5 A | None | 98 × 55.2 × 115 mm | 0.40 kg | SH-080483 §7.2.1 p.215 |

Two fixed-input variants are Q61P-A1 (100–120 VAC) and Q61P-A2 (200–240 VAC), both 6 A on the 5 V rail; the standard Q61P accepts either range (SH-080483 §7.2.1 p.212–213). The Q64PN is an 8.5 A version with extra functions, 0.47 kg (SH-080483 §7.2.1 p.215–216).

The Q62P is the choice when a little 24 V is needed for small loads on the supply module itself, but 0.6 A is not enough for a large I/O group. The rack in the whole-system diagram therefore uses an external 24 VDC supply for its I/O.

## 2. Base units

**Main base** (takes the power supply module, CPU and function modules):

| Model | I/O positions | Width | Internal 5 V current | Weight | Source |
| --- | --- | --- | --- | --- | --- |
| Q33B | 3 | 189 mm | 0.11 A | 0.21 kg | SH-080483 §8.3 p.249 |
| Q35B | 5 | 245 mm | 0.11 A | 0.27 kg | SH-080483 §8.3 p.249 |
| Q38B | 8 | 328 mm | 0.12 A | 0.36 kg | SH-080483 §8.3 p.249 |
| Q312B | 12 | 439 mm | 0.13 A | 0.47 kg | SH-080483 §8.3 p.249 |

**Extension base** (needs its own power supply module):

| Model | I/O positions | Width | Internal 5 V current | Weight | Source |
| --- | --- | --- | --- | --- | --- |
| Q63B | 3 | 189 mm | 0.11 A | 0.23 kg | SH-080483 §8.3 p.249 |
| Q65B | 5 | 245 mm | 0.11 A | 0.28 kg | SH-080483 §8.3 p.249 |
| Q68B | 8 | 328 mm | 0.12 A | 0.38 kg | SH-080483 §8.3 p.249 |
| Q612B | 12 | 439 mm | 0.13 A | 0.51 kg | SH-080483 §8.3 p.249 |

Every base in the table is 98 mm high and 44.1 mm deep and is fixed with M4 screws (SH-080483 §8.3 p.249). The "I/O positions" column counts I/O modules only, excluding the power supply position and the CPU position on the main base: the Q38B has 8 I/O positions, while the whole-system diagram uses 6 I/O modules (positions 2–7), leaving 2 positions free.

## 3. Worked current-consumption example (the rack in the diagram)

Take the exact eight-position rack from the [overview page](./index) and add the 5 V current of each item:

| Item | 5 V current | Source |
| --- | --- | --- |
| Q61P | 0 A (it supplies the rail, it does not draw from it) | SH-080483 §7.2.1 p.213 |
| Q38B (base) | 0.12 A | SH-080483 §8.3 p.249 |
| Q03UDV (CPU) | 0.58 A | SH-080483 §6.2.5 p.190 |
| QX40 | 0.05 A (50 mA, all points ON) | SH-080042 §2.4 p.2-4 |
| QY40P | 0.065 A (65 mA, all points ON) | SH-080042 §3.5 p.3-7 |
| QD75D4 | 0.82 A | SH-080058 §3.1 p.3-5 |
| QD62 | 0.30 A | SH-080036 §3.1 p.3-2 |
| Q64AD | 0.63 A | SH-080055 §3.1.1 p.3-1 |
| QJ71E71-100 | 0.50 A | SH-080009 §3.2 p.29 |

The sum:

`0.12 + 0.58 + 0.05 + 0.065 + 0.82 + 0.30 + 0.63 + 0.50 = 3.065 A`

The Q61P is rated 6 A, so the headroom is:

`6.00 − 3.065 = 2.935 A` — about **48.9 %** of the rating.

This rack runs on a Q61P. Switching to a Q62P (3 A) would put the total of 3.065 A **above** the rating even before any extra module is added — the Q62P does not suit this configuration.

> **These figures hold only for exactly this module list.** Change a model, add a module or enable more I/O points and the sum must be recomputed. The "all points ON" figure is the worst case the manual publishes for the QX40/QY40P; using it for the calculation is the safe choice.

For an AC supply, the supply capacity should be **at least twice** the power consumption of the supply module; for a DC supply it should be **four times** (SH-080483 §7.2.4 p.234). That is a safety margin for inrush current, not a module rating.

## 4. Grounding and noise

The manufacturer's single power supply wiring diagram: `L`/`N`, `FG`/`LG`, fuse and earth on the Q38B main base unit.

<ManualFigure
  src="/img/manual/qcpu-power-wiring.jpg"
  alt="Single power supply wiring: 100–240 VAC into L/N, FG/LG earthed, Q38B and extension base"
  caption="Single power supply wiring: L/N 100–240 VAC, FG/LG and earth — official figure SH-080483 §4.8.1"
  doc="SH-080483"
  section="§4.8.1"
  page="107"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080483/sh080483bc.pdf"
/>

- Use a dedicated earth wire with a ground resistance of **100 Ω or less**; when no dedicated earth is available use shared grounding pattern (2), **never** the common grounding pattern (3) (SH-080483 §4.8.4 p.118).
- Use an earth cable as thick as possible (up to **2 mm²**) and place the earth point as close to the PLC as possible to shorten the cable (SH-080483 §4.8.4 p.118).
- Connect `LG` and `FG` together and earth them; leaving them open makes the PLC susceptible to noise, and `LG` carries half the input voltage (SH-080483 §4.8.1 p.110).
- Run I/O wiring at least **100 mm** away from power lines; when they must share a duct, use a shielded cable and earth the screen on the PLC side (SH-080483 p.2, §4.8.2 p.111).
- Run 24 VDC wiring apart from the 100/200 VAC lines; wiring of 200 m or more can fail because of leakage current through the line capacitance (SH-080483 §4.8.2 p.111).
- Wire the 100/200 VAC and 24 VDC supplies with the thickest cable possible (up to 2 mm²) and twist the pair from the terminals (SH-080483 §4.8.1 p.110).

> **Not verified in the manual on disk:** the "0 A" for the Q61P is a design inference (a supply module feeds the rail rather than drawing from it); SH-080483 §7.2.1 does not print an "internal 5 V current" row for the Q61P. For an official figure, consult the project's supply-selection table.
