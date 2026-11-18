---
title: Panasonic MINAS A6
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

# Panasonic MINAS A6

The MINAS A6 accepts differential command pulses via `PULSH1/PULSH2` and `SIGNH1/SIGNH2` (line driver, 8 Mpps), and also has an opto branch `PULS1/PULS2` and `SIGN1/SIGN2`. These two groups are not interchangeable at will: the H group is the high-speed differential input, the other group is opto. The exact machine variant must be confirmed before wiring: the A6 DC24/48 V version assigns `SRV-ON` to `SI1` by default (SX-DSV03283), unlike the pin table here.

## 1. Pin table

| Pin | Signal | Note | Source |
| --- | --- | --- | --- |
| 44 | PULSH1 | Differential command pulse (+), paired with 45 | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |
| 45 | PULSH2 | Differential command pulse (−), paired with 44 | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |
| 46 | SIGNH1 | Differential direction (+), paired with 47 | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |
| 47 | SIGNH2 | Differential direction (−), paired with 46 | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |
| 3 | PULS1 | Opto-branch command pulse | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |
| 4 | PULS2 | Opto-branch command pulse | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |
| 1 | OPC1 | Common supply of opto branch 1 | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |
| 5 | SIGN1 | Opto-branch direction | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |
| 6 | SIGN2 | Opto-branch direction | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |
| 2 | OPC2 | Common supply of opto branch 2 | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |
| 29 | SRV-ON (SI6) | Servo-ON, driven by the PLC | <SourceRef doc="minas-a6" page="SX-DSV03031 p.16" text="SX-DSV03031 p.16" /> <em>[secondary]</em> |
| 36 / 37 | ALM (SO3) | Fault output: 36 (−), 37 (+) | <SourceRef doc="minas-a6" page="SX-DSV03031 p.19" text="SX-DSV03031 p.19" /> <em>[secondary]</em> |
| 38 / 39 | INP (SO4) | Positioning complete | <SourceRef doc="minas-a6" page="SX-DSV03031" text="SX-DSV03031" /> <em>[secondary]</em> |
| 31 | A-CLR (SI8) | Fault reset | <SourceRef doc="minas-a6" page="SX-DSV03031" text="SX-DSV03031" /> <em>[secondary]</em> |
| 7 | SI-COM | Common point of the digital input group | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |
| 41 | SO-COM | Common point of the digital output group | <SourceRef doc="minas-a6" page="45" text="SX-DSV03025 p.45" /> |

The supply that lists `GND` uses pin 1, but pin 1 is also listed for `OPC1`; this page does not print the `GND` row in order to avoid an incorrect assertion. Re-read the original pin table for the exact model before wiring the common point.

## 2. Wiring to the QD75D4

- QD75D4 `PULSE F+/F−` goes to 44/45; `PULSE R+/R−` goes to 46/47. Use the H group only when a line driver is required; the opto group 1/3/5/6 is a different mode and needs the correct `OPC` supply.
- `SRV-ON` pin 29 comes from a PLC transistor output, not from the QD75D4.
- `ALM` 36/37 and `INP` 38/39 are digital outputs, returned to the PLC via `SO-COM` 41.
- `SI-COM` 7 must be supplied from an isolated 12–24 V source, **not** from the brake supply.
- Pulse characteristics: line driver 8 Mpps; opto branch 500 kpps (line driver) / 200 kpps (open collector) per the source table.

## 3. Checks before applying power

- The DC24/48 V or 200 V variant and the correct manual number have been confirmed.
- It has been settled whether the H (differential) group or the opto group is used, and it matches QD75D4 `Pr.5`.
- The isolated `SI-COM` supply has been checked, not shared with the brake supply.
- Continuity has been measured on each pair 44/45 and 46/47.

## Read next

- [Driver wiring overview](/en/q/drivers/)
- [Parameters & gear ratio](/en/q/drivers/parameters-gear)
