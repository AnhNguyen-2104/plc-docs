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
| Functional input | DOG, FLS, RLS, STOP, CHG | driver/switch → QD75 | 1A3 DOG (home), 1A1 FLS, 1A2 RLS, 1A4 STOP, 1A5 CHG (SH-080058 §3.4.4 p.3-28) |
| Functional input | COM (input-group common) | — | 1A6, 1A7 — common for the whole functional-input group (SH-080058 §3.4.4 p.3-28) |
| Functional input | CLEAR, CLEAR COM | QD75 → driver | 1A13, 1A14 — wire only when position deviation must be cleared (SH-080058 §3.4.3 p.3-27) |
| Command pulse | PULSE COM (`*2`) | QD75 → driver | Common of the differential pair, tied to 0 V/earth; the manual prints a `*2` marker, not a terminal number (SH-080058 §3.4.3 p.3-26) |
| READY / common | 1A11 READY, 1A12 RDYCOM | driver → QD75 | Required for the READY loop (SH-080058 §3.4.3 p.3-27) |
| Zero signal | 1A9 PG05, 1A10 PG0COM | driver → QD75 | Used only for the zero signal during OPR (§3.4.3 p.3-26) |
| Enable/status | Signals exchanged with the driver | bidirectional | Depends on the driver; consult the pin tables of both devices |

FLS/RLS are the QD75 software limits — if they are not wired you must disable them in parameters (Pr.13/Pr.14 and the related limit parameters); leaving the wires open is not "safe". DOG is required only for dog-type OPR; STOP and CHG are for emergency stop / speed switching and are wired per machine requirements.

The *2 marker: terminal numbers change per axis — axis 1 uses 1Axx, axis 2 uses 1Bxx, axis 3 uses 2Axx, axis 4 uses 2Bxx; the numbers in this table are for axis 1.

With the QD75D4, each axis has its own terminal block. Each F+/F− and R+/R− pair is a differential pair and must be routed together. Terminals 1A19/1B19/1A20/1B20 are the PULSER (manual pulse generator) input, not the command-pulse common.

## 2. Wiring principles

- A maximum of **2 wires per terminal point** on the terminal block. Do not stuff in extra intermediate wires.
- Route pulse cables separately from power cables; do not bundle them with the servo supply cable.
- Use shielded cable for signal wires; connect the shield to ground at **one end** to avoid ground loops.
- The 24 V supply for signals and the power supply should be on separate branches with separate fuses.
- Keep pulse cable length short within the permitted range; manual SH-080058 states the specific limit — check it before choosing a long cable.
- Label both ends of each wire and mark the axis clearly to avoid confusion between axes during maintenance.

## 3. Reference diagram

<WiringDiagram variant="generic" />

The manufacturer's connector pin layout for the QD75D4 (four axes AX1–AX4, left and right connector) — cross-check pin numbers before crimping:

<ManualFigure
  src="/img/manual/qd75-wiring.jpg"
  alt="QD75D4 external device connector pin layout, axes AX1 to AX4"
  caption="QD75D4 external device connector pin layout: four axes, left and right connector"
  doc="SH-080058"
  section="§3.4.2"
  page="3-25"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080058/sh080058v.pdf"
/>

## 4. Manufacturer input/output circuits

The input and differential output circuits inside the module, as drawn in the original manual; use them to check current direction and resistor placement before wiring outside:

<ManualFigure
  src="/img/manual/qd75-input-circuit.jpg"
  alt="QD75 input circuit: photocoupler, resistor and the DOG, FLS, RLS, STOP, CHG signals"
  caption="Input circuit: photocoupler and series resistor for DOG, FLS, RLS, STOP, CHG, PULSER"
  doc="SH-080058"
  section="§3.4.4"
  page="3-28"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080058/sh080058v.pdf"
/>

<ManualFigure
  src="/img/manual/qd75-output-circuit.jpg"
  alt="QD75D differential output circuit: PULSE F, PULSE R, CLEAR and their pairs"
  caption="Differential output circuit: PULSE F+/F−, PULSE R+/R−, CLEAR — QD75D version"
  doc="SH-080058"
  section="§3.4.4"
  page="3-30"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080058/sh080058v.pdf"
/>

## 5. Checklist before power-up

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
