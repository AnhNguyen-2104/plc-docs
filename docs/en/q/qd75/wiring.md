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
| Command pulse | PULSE F+, F− | QD75 → driver | F = forward, R = reverse; differential pair, must be routed as a pair (SH-080058 §3.4.3 p.3-26) |
| Command pulse | PULSE R+, R− | QD75 → driver | F = forward, R = reverse; differential pair, reverse direction (SH-080058 §3.4.3 p.3-26) |
| READY / common | 1A11 READY, 1A12 RDYCOM | driver → QD75 | Required for the READY loop (SH-080058 §3.4.3 p.3-27) |
| Zero signal | 1A9 PG05, 1A10 PG0COM | driver → QD75 | Used only for the zero signal during OPR (§3.4.3 p.3-26) |
| Enable/status | Signals exchanged with the driver | bidirectional | Depends on the driver; consult the pin tables of both devices |

With the QD75D4, each axis has its own terminal block. Each F+/F− and R+/R− pair is a differential pair and must be routed together.

## 2. Wiring principles

- A maximum of **2 wires per terminal point** on the terminal block. Do not stuff in extra intermediate wires.
- Route pulse cables separately from power cables; do not bundle them with the servo supply cable.
- Use shielded cable for signal wires; connect the shield to ground at **one end** to avoid ground loops.
- The 24 V supply for signals and the power supply should be on separate branches with separate fuses.
- Keep pulse cable length short within the permitted range; manual SH-080058 states the specific limit — check it before choosing a long cable.
- Label both ends of each wire and mark the axis clearly to avoid confusion between axes during maintenance.

## 3. Reference diagram

<WiringDiagram variant="generic" />

<PinMapDiagram variant="generic" />

Schematic: differential pulses, READY, SON from the PLC, ALM back to the PLC.

## 4. Checklist before power-up

- [ ] Power was cut throughout the wiring process.
- [ ] Correct F+/F−, R+/R− pairing, with no swapping between axes.
- [ ] READY (1A11) and RDYCOM (1A12) wired to the correct driver for each axis.
- [ ] No more than 2 wires per terminal point.
- [ ] Pulse wires separated from power wires.
- [ ] Shield grounded at one end, per cabinet regulations.
- [ ] Pin numbers cross-checked against the tables in SH-080058 — wiring chapter.
- [ ] Hard limit switches and emergency stop button wired independently of the PLC.
- [ ] Continuity and insulation measured before power-up.

## Further reading

- [QD75D4 X/Y signals](/en/q/qd75/io-signals)
- [Commissioning the QD75D4](/en/q/qd75/commissioning)
