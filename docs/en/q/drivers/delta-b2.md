---
title: Delta ASDA-B2
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

# Delta ASDA-B2

The ASDA-B2 accepts differential command pulses via `PULSE/PULSE` and `SIGN/SIGN`, and has an additional `HPULSE/HSIGN` pair for a high-speed 5 V differential pulse source. The driver reaches 500 kpps with a line driver and 200 kpps with open collector. Three points must be settled before wiring: differential input or 24 V opto, sink or source PLC type, and a single 24 V supply — never feed the internal `VDD` and an external supply at the same time.

## 1. Pin table

| Pin | Signal | Note | Source |
| --- | --- | --- | --- |
| 43 | PULSE (+) | Command pulse, paired with 41 | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 41 | /PULSE (−) | Command pulse, paired with 43 | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 39 | SIGN (+) | Direction, paired with 37 | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 37 | /SIGN (−) | Direction, paired with 39 | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 38 | HPULSE | High-speed 5 V differential pulse input | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 36 | /HPULSE | Paired with 38, 5 V differential only | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 42 | HSIGN | High-speed 5 V differential direction | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 40 | /HSIGN | Paired with 42, 5 V differential only | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 35 | PULL HI | Pull-up to `VDD` when using open-collector inputs | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 9 | SON (DI1) | Servo-ON, driven by the PLC | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 28 | ALRM (+) | Fault output, paired with 27 | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 27 | ALRM (−) | Paired with 28 | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 11 | COM+ | Common point of the input group | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 14 | COM− | Common point of the input group | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| 17 | VDD | Internal 24 V, 500 mA maximum | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |

## 2. Wiring to the QD75D4

- The QD75D4 `PULSE F+/F−` pair goes to 43/41; the `PULSE R+/R−` pair goes to 39/37. Do not swap the pair and do not connect one wire of the pair to 0 V.
- If an open-collector input is used instead of the line driver, `PULL HI` 35 must be connected to `VDD` 17 per the manual; this is a different mode, not differential mode.
- Do not supply `VDD` 17 from an external source at the same time as an external 12–24 V supply; choose one supply per group.
- Optically isolated digital inputs: ON 15–24 V, current > 3 mA; OFF < 5 V, current < 0.5 mA; resistance about 4.7 kΩ. The driver supports both sink and source.
- ALRM is a paired output 28/27, brought back to the PLC for interlocking; SON (DI1, pin 9) comes from a PLC transistor output, not from the QD75D4.

## 3. Checks before applying power

- The driver pulse mode has been selected and matches QD75D4 `Pr.5`.
- Continuity has been measured on each pair 43/41 and 39/37.
- It has been confirmed that there is only one 24 V supply for the input group.
- The direction of rotation has been checked with an unloaded test run.

## Read next

- [Driver wiring overview](/en/q/drivers/)
- [Parameters & gear ratio](/en/q/drivers/parameters-gear)
