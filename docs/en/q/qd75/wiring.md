---
title: QD75D4 wiring
family: q
module: qd75d4
status: draft
source: SH-080058
---

# QD75D4 wiring

⚠️ Cut power to the entire electrical cabinet, discharge the capacitors, and verify that no voltage remains before touching any terminal. Do not wire while the module or driver is still powered.

This page describes the wiring principles; **for specific pin numbers consult the tables in the manual** — the official manual SH-080058 (Mitsubishi), wiring chapter. Do not infer terminal numbers from signal names.

## 1. Signal groups to wire

The QD75D4 uses differential outputs for the control pulses. Each axis requires at minimum:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Command pulse | PULSE A+, A− | QD75 → driver | Differential pair; must be routed as a pair |
| Command pulse | PULSE B+, B− | QD75 → driver | Differential pair, phase-shifted relative to A |
| Reference | COM (per axis) | QD75 → driver | Common point of the differential pair |
| Enable/status | Signals exchanged with the driver | bidirectional | Depends on the driver; consult the pin tables of both devices |

With the QD75D4, each axis has its own terminal block. Pairing A+/A− and B+/B− is mandatory so that the driver receives the differential pulses correctly.

## 2. Wiring principles

- A maximum of **2 wires per terminal point** on the terminal block. Do not stuff in extra intermediate wires.
- Route pulse cables separately from power cables; do not bundle them with the servo supply cable.
- Use shielded cable for signal wires; connect the shield to ground at **one end** to avoid ground loops.
- The 24 V supply for signals and the power supply should be on separate branches with separate fuses.
- Keep pulse cable length short within the permitted range; manual SH-080058 states the specific limit — check it before choosing a long cable.
- Label both ends of each wire and mark the axis clearly to avoid confusion between axes during maintenance.

## 3. Reference diagram

<WiringDiagram variant="generic" />

Schematic: differential pulses, READY, SON from the PLC, ALM back to the PLC.

## 4. Checklist before power-up

- [ ] Power was cut throughout the wiring process.
- [ ] Correct A+/A−, B+/B− pairing, with no swapping between axes.
- [ ] COM connected to the correct driver for each axis.
- [ ] No more than 2 wires per terminal point.
- [ ] Pulse wires separated from power wires.
- [ ] Shield grounded at one end, per cabinet regulations.
- [ ] Pin numbers cross-checked against the tables in SH-080058 — wiring chapter.
- [ ] Hard limit switches and emergency stop button wired independently of the PLC.
- [ ] Continuity and insulation measured before power-up.

## Further reading

- [QD75D4 X/Y signals](/en/q/qd75/io-signals)
- [Commissioning the QD75D4](/en/q/qd75/commissioning)
