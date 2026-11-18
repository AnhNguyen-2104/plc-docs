---
title: Driver wiring overview
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

<script setup>
import { axisRow, qd75PinoutSrc } from '../../../.vitepress/data/modules/qd75-wiring.ts'
</script>

# Driver wiring overview

The QD75D4 does not drive the motor by itself: the module emits differential command pulses, the driver receives the pulses, amplifies them and turns the motor by exactly the number of pulses received. This page is the entry point of the driver-wiring group: it covers the common part every driver needs, a comparison table of the five documented drivers, and the hard rules before applying power.

## 1. What a pulse driver needs from the QD75D4

- **Differential F and R pulse pairs.** The QD75D4 outputs `PULSE F+/F−` and `PULSE R+/R−`; each pair must travel together to one differential input pair of the driver (SH-080058 §3.4.3 p.3-26).
- **Common point of the pulse pair.** Depending on the driver this is the common pin of the pulse input or the 0 V pin of the input group; wire it exactly as the driver pin table specifies.
- **Servo-ON input.** This is **not** a QD75D4 output. Servo-ON comes from a transistor output of the PLC and goes to the SON/S-ON/SRV-ON input of the driver.
- **Driver status outputs.** READY (or RD) reports that the driver is ready, ALM reports a fault; these two signals go back to the PLC and/or to the `READY` 1A11 pin of the QD75D4.

Most important: **never wire a QD75D4 differential pair straight into a 24 V opto input**. A differential pair only goes into a differential input (line receiver). If an opto input must be used, that is open-collector mode and the current-limiting resistor / pull-up resistor specified in the driver manual must be followed exactly.

## 2. Axis 1 terminal block of the QD75D4

The table below is taken directly from the shared data file, not copied from the manual. Source: {{ qd75PinoutSrc }}.

<table>
  <thead>
    <tr>
      <th>Terminal</th>
      <th>Signal (manual name)</th>
      <th>Direction</th>
      <th>Note</th>
      <th>Source</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in axisRow" :key="row.qd75Terminal">
      <td>{{ row.qd75Terminal }}</td>
      <td>{{ row.qd75Signal }}</td>
      <td>{{ row.direction }}</td>
      <td>{{ row.note ?? '' }}</td>
      <td>{{ row.src }}</td>
    </tr>
  </tbody>
</table>

Three points to remember when reading the table:

- The third drawing names `PGO5` and `PGOCOM`; the manual prints **`PG05`** and **`PG0COM`** with a zero. This page uses the manual names.
- `READY` 1A11 has its own common point `RDYCOM` 1A12 (SH-080058 §3.4.3 p.3-27); the table above lists only the seven terminals requested and does not replace the full pin table in the manual.
- Axes 2–4 use the same structure with the prefixes `2A`, `2B`, `3A`, `3B`, `4A`, `4B` (SH-080058 §3.4.2 p.3-25).

## 3. Comparison of the five documented drivers

| Maker | Series | Pulse input | Control connector | Pin table source |
| --- | --- | --- | --- | --- |
| Mitsubishi Electric | MR-J4-A | Differential (line driver); pulse form selected by PA13: PULSE/SIGN, CW/CCW, A/B | CN1 | SH-030143-C §2.2 p.2-17 |
| Delta Electronics | ASDA-B2 | Line driver 500 kpps; open collector 200 kpps | CN1 | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| Yaskawa | Sigma-7 SGD7S (analog/pulse, 200 V) | Line driver 4 Mpps (sign+pulse, CW+CCW); 1 Mpps (2-phase); open collector 200 kpps | CN1 | SIEP S800001 26O p.4-35…4-38 |
| Panasonic | MINAS A6 | Line driver 8 Mpps; opto branch 500 kpps (line driver) / 200 kpps (open collector) | Control connector — connector name: see SX-DSV03025 p.45 | SX-DSV03025 p.45; SX-DSV03031 (functional) |
| Leadshine | DM542 | Optically isolated, accepts 4.5–5 V or 24 V; always pulse + direction | P1 terminal block (not CN1) | DM542 Rev 3.0 p.3 `[secondary]` |

`[secondary]` means the pin table comes from a redistributed PDF, not the manufacturer's original release; cross-check it before wiring a real machine.

The pulse form of the MR-J4-A is declared in `MR Configurator2 → Parameter → Pr.PA13`; the other drivers use the corresponding menu labels in their own vendor software (consult the version in use).

## 4. Hard rules

- A maximum of **2 wires per terminal point**; do not stuff in intermediate wires.
- Ground the signal cable shield at **one end** to avoid ground loops.
- Route pulse cables separately from power and brake cables; do not bundle them together.
- Emergency stop must cut the power/driver supply **independently of the PLC**, never through software.
- Use a separate fused 24 V supply for each signal group; do not connect the driver's internal supply in common with an external supply (ASDA-B2: VDD 17 is used only when no external supply is provided).
- The pulse mode and logic level must match on both sides: QD75D4 `Pr.5` and `Pr.23` bit 0 (SH-080058 §5.2.1 p.5-21, §5.2.3 p.5-31) against the pulse-form parameter of the driver.
- Before applying power: check continuity, check insulation, and compare every pin against the pin tables of both manuals.

## 5. Driver pages

- [Mitsubishi MR-J4-A](/en/q/drivers/mr-j4-a) — CN1 table cross-checked with the manual, servo-ON, READY/alarm, 24 V.
- [Delta ASDA-B2](/en/q/drivers/delta-b2) — PULSE/SIGN, HPULSE/HSIGN, DI/DO, VDD.
- [Yaskawa Sigma-7](/en/q/drivers/yaskawa-sigma7) — PULS/SIGN, /S-ON, ALM, /COIN.
- [Panasonic MINAS A6](/en/q/drivers/panasonic-minas-a6) — PULSH/SIGNH, opto, SRV-ON, ALM.
- [DM542 stepper driver](/en/q/drivers/stepper-dm542) — P1 terminal block, DIR timing, opto mode.
- [Parameters & gear ratio](/en/q/drivers/parameters-gear) — Pr.1–Pr.4 of the QD75D4 and the electronic gear on the driver side.

## Read next

- [QD75D4 wiring](/en/q/qd75/wiring)
- [QD75D4 parameters (Pr.)](/en/q/qd75/parameters)
- [Quick configuration reference](/en/q/qd75/reference)
