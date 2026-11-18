---
title: DM542 stepper driver
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

# DM542 stepper driver

The DM542 is a stepper driver that accepts pulse + direction pulses through the `P1` terminal block, not a CN1 connector. The inputs are optically isolated and accept 4.5–5 V or 24 V; the driver always runs in pulse + direction mode and has no CW/CCW or A/B mode to select. Therefore, when paired with the QD75D4, `Pr.5` must be set to PULSE/SIGN and the electrical interface between the QD75D4 differential output and the DM542 opto input must be checked again.

## 1. Pin table

| Terminal | Signal | Note | Source |
| --- | --- | --- | --- |
| P1 | PUL+ | Step pulse (+), paired with PUL− | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P1 | PUL− | Step pulse (−), paired with PUL+ | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P1 | DIR+ | Direction (+), paired with DIR− | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P1 | DIR− | Direction (−), paired with DIR+ | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P1 | ENA+ | Enable (+), paired with ENA− | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P1 | ENA− | Enable (−), paired with ENA+ | <SourceRef doc="dm542" page="3" /> <em>[secondary]</em> |
| P2 | ALM | Fault output | <SourceRef doc="dm542" page="4" /> <em>[secondary]</em> |
| P2 | BR | Brake control | <SourceRef doc="dm542" page="4" /> <em>[secondary]</em> |

<WiringDiagram variant="stepper-dm542" />

<DriverPhoto
  src="/img/drivers/stepper-dm542.jpg"
  alt="QD75D4 to DM542 stepper driver wiring diagram (P1)"
  caption="QD75D4 to DM542 stepper driver: PUL+/PUL−, DIR+/DIR− and ENA+/ENA− on terminal block P1; a stepper motor is pictured."
  source="plc247.com"
  sourceUrl="https://plc247.com/mitsubishi-qd75d4-step-motor-control-tutorial"
/>

## 2. Wiring to the QD75D4

- The QD75D4 outputs the differential pairs `PULSE F+/F−` and `PULSE R+/R−`; the DM542, however, accepts an opto input. Do **not** wire the differential pair straight into `PUL+/PUL−` while skipping the interface: follow the input diagram in the DM542 manual (suitable current-limiting resistor/supply) and the output characteristics of the QD75D4 (SH-080058 §3.4.1 p.3-19).
- `DIR` must lead `PUL` by at least 5 µs; getting this timing wrong causes lost steps or a reversed direction.
- Leaving `ENA` open means the driver is enabled; connect it only when the driver must be disabled in hardware.
- The input accepts 4.5–5 V or 24 V; choose the level and resistor per the table in the manual, do not guess.
- `ALM` on `P2` is brought back to the PLC for interlocking; never use it as an emergency-stop signal.

## 3. Checks before applying power

- It has been confirmed that QD75D4 `Pr.5 = 0` (PULSE/SIGN) and the logic level `Pr.23` bit 0 match the DM542.
- The interface between the QD75D4 differential output and the DM542 opto input has been checked against both manuals.
- Continuity has been measured on `PUL+/PUL−`, `DIR+/DIR−`.
- Current and microstep have been set with the DIP switches for the actual mechanism.

## Read next

- [Driver wiring overview](/en/q/drivers/)
- [Parameters & gear ratio](/en/q/drivers/parameters-gear)
