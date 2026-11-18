---
title: Yaskawa Sigma-7
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

# Yaskawa Sigma-7

The Sigma-7 SGD7S analog/pulse version (200 V) accepts differential command pulses via `PULS//PULS` and `SIGN//SIGN`; the line driver reaches 4 Mpps in sign+pulse or CW+CCW mode, 1 Mpps with two-phase pulses, and 200 kpps with open collector. This is the 200 V version, document number SIEP S800001 26O. The number users commonly see, "SIEP S800001 3x", does not match this version; the 400 V version has not been checked, so the correct manual for the actual machine must be opened before wiring.

## 1. Pin table

| Pin | Signal | Note | Source |
| --- | --- | --- | --- |
| 7 | PULS | Command pulse (+), paired with 8 | <SourceRef doc="sgd7s" page="4-36" /> |
| 8 | /PULS | Command pulse (−), paired with 7 | <SourceRef doc="sgd7s" page="4-36" /> |
| 11 | SIGN | Direction (+), paired with 12 | <SourceRef doc="sgd7s" page="4-36" /> |
| 12 | /SIGN | Direction (−), paired with 11 | <SourceRef doc="sgd7s" page="4-36" /> |
| 15 | CLR | Clear position deviation (+), paired with 14 | <SourceRef doc="sgd7s" page="4-36" /> |
| 14 | /CLR | Clear position deviation (−), paired with 15 | <SourceRef doc="sgd7s" page="4-36" /> |
| 40 | /S-ON (/SI0) | Servo-ON, driven by the PLC | <SourceRef doc="sgd7s" page="4-35" /> |
| 31 | ALM+ | Fault output (+), OFF when there is a fault | <SourceRef doc="sgd7s" page="4-37" /> |
| 32 | ALM− | Fault output (−) | <SourceRef doc="sgd7s" page="4-37" /> |
| 25 | /COIN (/SO1+) | Positioning complete (+) | <SourceRef doc="sgd7s" page="4-37" /> |
| 26 | /COIN (−) | Positioning complete (−) | <SourceRef doc="sgd7s" page="4-37" /> |
| 44 | /ALM-RST (/SI4) | Fault reset | <SourceRef doc="sgd7s" page="4-35" /> |
| 29 / 30 | S-RDY+ / S-RDY− | Ready output pair, per the QD75D-to-Yaskawa connection example | <SourceRef doc="sh080058" page="Appendix-8.1" /> <em>[secondary — connection example, not cross-checked against the Sigma-7 CN1 table]</em> |
| 47 | +24VIN | 24 V supply for the input group | <SourceRef doc="sgd7s" page="4-35" /> |
| 1, 2, 6, 10 | SG | Signal common | <SourceRef doc="sgd7s" page="4-38" /> |
| 3, 13, 18 | PL1 / PL2 / PL3 | Internal 12 V for open collector | <SourceRef doc="sgd7s" page="4-37" /> |

<WiringDiagram variant="yaskawa-sigma7" />

<PinMapDiagram variant="yaskawa-sigma7" />

## 2. Wiring to the QD75D4

- `READY` 1A11 ← `S-RDY+` 29, `RDYCOM` 1A12 ← `S-RDY−` 30: an isolated output pair that feeds the READY photocoupler directly, **not** +24 V. Pins 29/30 come from the QD75D ↔ Yaskawa connection example in SH-080058 (Appendix 8.1); the SGD7S CN1 table has not been cross-checked, so treat this as unverified.

- QD75D4 `PULSE F+/F−` goes to 7/8; `PULSE R+/R−` goes to 11/12. This is a differential pair and must not be connected to a 24 V opto input.
- `/S-ON` pin 40 is the servo-ON input and comes from a PLC transistor output; the QD75D4 has no servo-ON output.
- `ALM` 31/32 is an optically isolated output and needs the resistor/supply shown in the output diagram of the manual; bring it back to the PLC for interlocking.
- The 24 V supply for the input group goes to `+24VIN` 47, with `SG` (1, 2, 6, 10) as the common point.
- `CLR` 15/14 is used only when the position deviation must be cleared; never wire it as an emergency stop.

## 3. Checks before applying power

- The 200 V version and the correct manual number for the machine have been confirmed.
- The pulse type (sign+pulse, CW+CCW or two-phase) has been settled and matches QD75D4 `Pr.5`.
- Pairs 7/8 and 11/12 have been checked, with no reversed polarity.
- A single 24 V supply for the input group has been confirmed.

## Read next

- [Driver wiring overview](/en/q/drivers/)
- [Parameters & gear ratio](/en/q/drivers/parameters-gear)
