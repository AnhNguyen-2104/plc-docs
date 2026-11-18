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
| 43 | PULSE (+) | Command pulse, paired with 41 | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 41 | /PULSE (−) | Command pulse, paired with 43 | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 39 | SIGN (+) | Direction, paired with 37 | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 37 | /SIGN (−) | Direction, paired with 39 | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 38 | HPULSE | High-speed 5 V differential pulse input | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 36 | /HPULSE | Paired with 38, 5 V differential only | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 42 | HSIGN | High-speed 5 V differential direction | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 40 | /HSIGN | Paired with 42, 5 V differential only | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 35 | PULL HI | Pull-up to `VDD` when using open-collector inputs | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 7 | DO1+ | Default `SRDY` output, paired with 6 | <SourceRef doc="asda-b2" page="3-18" /> <SourceRef doc="asda-b2" page="3-26" /> <em>[secondary]</em> |
| 6 | DO1− | Paired with 7, negative side of the `SRDY` output | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 9 | SON (DI1) | Servo-ON, driven by the PLC | <SourceRef doc="asda-b2" page="3-22" /> <em>[secondary]</em> |
| 28 | ALRM (+) | Fault output, paired with 27 | <SourceRef doc="asda-b2" page="3-21" /> <em>[secondary]</em> |
| 27 | ALRM (−) | Paired with 28 | <SourceRef doc="asda-b2" page="3-21" /> <em>[secondary]</em> |
| 11 | COM+ | Common point of the input group | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 14 | COM− | Common point of the input group | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |
| 17 | VDD | Internal 24 V, 500 mA maximum | <SourceRef doc="asda-b2" page="3-18" /> <em>[secondary]</em> |

<WiringDiagram variant="delta-b2" />

<DriverPhoto
  src="/img/drivers/delta-b2.jpg"
  alt="QD75D4 to Delta ASDA-B2 wiring diagram (CN1)"
  caption="QD75D4 to Delta ASDA-B2 via CN1 (44P): differential pulse pair into 43/41, direction pair into 39/37; READY 1A11 from DO1+ (7), RDYCOM 1A12 to COM+ (11), DO1− (6) to 0 V."
  source="plc247.com"
  sourceUrl="https://plc247.com/mitsubishi-qd75d4-servo-control-delta-b2-tutorial"
/>

## 2. Wiring to the QD75D4

- READY: `READY` 1A11 comes from `DO1+` 7 (`SRDY`), `RDYCOM` 1A12 goes to `+24 V` at `COM+` 11, `DO1−` 6 and `COM−` 14 go to 0 V. Loop: +24 V → RDYCOM (1A12) → READY photocoupler → 1A11 → DO1+ (7) → output transistor → DO1− (6) → 0 V. The QD75D4 manual only defines RDYCOM as "common for the drive READY signal" (SH-080058 §3.4.3) and READY as a 24 VDC/4.7 kΩ photocoupler input (§3.4.1); it does not fix RDYCOM at +24 V or 0 V, so the polarity is set by the drive output — `DO1` of the ASDA-B2 is a sinking output, hence RDYCOM sits at +24 V.

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
