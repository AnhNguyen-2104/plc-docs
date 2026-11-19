---
title: QD77MS4 / QD75M1 — motion control modules
family: q
module: q-series
status: draft
source: IB-0300185
---

<script setup>
const mvInputs = [
  { signal: 'Y0', pin: 'Y0', device: 'PLC READY — CPU enables the module' },
  { signal: 'Y1', pin: 'Y1', device: 'All axis servo ON' },
  { signal: 'Y10', pin: 'Y10', device: 'Positioning start — axis 1' }
]
const mvOutputs = [
  { signal: 'X0', pin: 'X0', device: 'READY — module ready' },
  { signal: 'X1', pin: 'X1', device: 'Synchronization flag — buffer memory accessible' },
  { signal: 'X10', pin: 'X10', device: 'Start complete — axis 1' },
  { signal: 'XC', pin: 'XC', device: 'BUSY — axis 1 moving' }
]
</script>

# QD77MS4 / QD75M1 — motion control modules

The three MELSEC Q positioning families differ mainly in **how commands reach the driver**, not in the number of axes. The QD75D4 outputs pulses; the QD75M1 and QD77MS4 send digital commands over the SSCNET fibre-optic servo network.

This page compares the three families and covers wiring, connectors and buffer memory access. QD75D4 detail lives at [/q/qd75/](/q/qd75/) and is not duplicated here.

## 1. Three families in one table

| Family | Driver interface | Maximum axes | Position data points per axis | Source |
| --- | --- | --- | --- | --- |
| QD75D4 | Differential pulse output | 4 | 600 | SH-080058 |
| QD75M1 | SSCNET (fibre-optic cable) | 1 (M2: 2, M4: 4) | 600 | IB-0300062 §3.1 p.3-2 |
| QD77MS4 | SSCNET III/H (fibre-optic cable) | 4 (MS2: 2, MS16: 16) | 600 | IB-0300185 §3.1 p.3-2 |

## 2. Specification comparison

| Item | QD75D4 | QD75M1 | QD77MS4 |
| --- | --- | --- | --- |
| Number of axes | 4 | 1 | 4 |
| Operation cycle | — (pulse-driven) | — | 0.88 ms / 1.77 ms |
| Starting time | — | 2 ms | 0.88 ms |
| Position data | 600 points/axis | 600 points/axis | 600 points/axis |
| Control units | mm, inch, degree, PLS | mm, inch, degree, PLS | mm, inch, degree, PLS |
| Maximum command speed | — | 10,000,000 PLS/s | 1,000,000,000 PLS/s |
| External connector | 40-pin (QD75D4: **not verified** in this pass) | 40-pin | 40-pin |
| Driver cable | Differential pulse cable | SSCNET, overall length ≤ 30 m | SSCNET III/H, 0.15–50 m |

Sources: QD77MS4 — IB-0300185 §3.1 p.3-2 and p.3-3; QD75M1 — IB-0300062 §3.1 p.3-2 and §2.2 p.2-5 (SSCNET overall length ≤ 30 m note); QD75D4 — SH-080058 §3.1 p.3-2 and the [position data page](/en/q/qd75/position-data).

## 3. Block diagram

The manufacturer's SSCNET signal path between the QD77MS and the servo amplifier:

<ManualFigure
  src="/img/manual/qd77ms-sscnet.jpg"
  alt="QD77MS signals over SSCNET to the servo amplifier, with encoder and external inputs"
  caption="QD77MS signal path over SSCNET — official figure IB-0300185 §1.1.6"
  doc="IB-0300185"
  section="§1.1.6"
  page="1-20"
/>

Daisy-chaining SSCNET cables from the QD75M to MR-H-BN/MR-J2-B amplifiers, with the termination connector:

<ManualFigure
  src="/img/manual/qd75m-sscnet.jpg"
  alt="SSCNET cable daisy-chain from QD75M to MR-H-BN and MR-J2-B servo amplifiers with termination connector"
  caption="QD75M → servo amplifier SSCNET cable — official figure IB-0300062 Appendix 3"
  doc="IB-0300062"
  section="Appendix 3"
  page="App-29"
/>

## 4. What changes in the wiring

| Item | QD75D4 (pulse) | QD75M1 / QD77MS4 (SSCNET) |
| --- | --- | --- |
| Command cable to driver | Multi-pair differential pulse cable | SSCNET fibre-optic cable, one fibre in and one out per amplifier |
| Pulse counting / division | Yes, configured on the module | No; position is transmitted digitally over SSCNET |
| Encoder feedback | To the driver, not the module | Carried in the SSCNET frame, read directly by the module |
| Electromagnetic noise | Pulse cable must be shielded carefully | Optically isolated, immune to EMI on the link |
| Minimum bend radius | Copper cable rules | 25 mm (MR-J3BUS_M); 50 mm jacket / 25 mm core (MR-J3BUS_M-A) |
| Pre-run check | Continuity of each pulse pair | Clean optical connector ends, correct CN1A/CN1B |

Sources: bend radius and the CN1A/CN1B misconnection warning — IB-0300185 §4.3 p.4-15 and Appendix 2 p.App.-29; MR-J3BUS cable list — IB-0300185 §3.1 p.3-3.

There is no longer a `PULSE F+/F−`, `R+/R−` pair, nor the `PG05/PG0COM` zero signal used by the QD75D4 — compare [QD75D4 wiring](/en/q/qd75/wiring). Instead one optical link runs module → amplifier 1 → amplifier 2 → … in axis order.

## 5. Connectors

| Module | Connector | Verified fact |
| --- | --- | --- |
| QD77MS4 | SSCNET cable connector (bottom of the module) | `CN4`/`CN5` designations: **not verified** — IB-0300185 calls it only "SSCNET cable connector" (§4.1.2 p.4-3) |
| QD75M1 | SSCNET cable connector | Same naming; specific pinout: **not verified** (IB-0300062 §4.1.2 p.4-3) |
| QD77MS4 | 40-pin external input connector | A6CON1, A6CON2, A6CON4 (sold separately) — IB-0300185 §3.1 p.3-3 |
| QD75M1 | 40-pin external input connector | A6CON1, A6CON2, A6CON3, A6CON4 — IB-0300062 §2.2 p.2-5 |

What is certain: the module has **one** SSCNET connector carrying bidirectional optical fibre (one transmit, one receive strand); keep the protective cap on until just before mating and refit it when the cable is removed; never look into the cable end or connector while powered — IB-0300185 §4.3 p.4-9.

## 6. Buffer memory access

Access model is the same as the QD75D4: `U0\G<address>` or `FROM`/`TO` — see [buffer memory access](/en/q/qd75/ladder).

| Data | QD77MS4 | QD75M1 | Source |
| --- | --- | --- | --- |
| `Cd.3` Positioning start No., axis 1 | `1500+100n` (axis 1 = 1500) | `1500` (axis 1), 1600/1700/1800 for axes 2–4 | IB-0300185 §6.5.2 p.6-54; IB-0300062 §6.5.2 p.6-54 |
| `Cd.4` Positioning starting point No. | `1501+100n` | `1501` | same sections |
| `Cd.5` Axis error reset | `1502+100n` | — | IB-0300185 §6.5.2 p.6-54 |

`n` = axis number − 1, so `n` = 0 for axis 1. On the QD77MS16 the base address is `4300+100n` — IB-0300185 §6.5.2 p.6-54.

Important: position data (Da.) and parameters (Pr.) are **still written with `TO`** into buffer memory; the module stores them in flash ROM and runs autonomously. `TO` into the parameter area takes effect on execution, while some parameters only become valid when PLC READY `Y0` is on — IB-0300062 §7.2 p.7-8 (data transmission diagram: "Valid upon execution of the TO instruction"; `Pr.10`, `Pr.8`–`Pr.25` become valid when `Y0` turns on).

## 7. Start-command ladder

Example for a QD77MS4, axis 1, writing the start number with `TO` and then turning on `Y10`:

```il
(* Write the positioning data number into Cd.3 of axis 1 (1500) *)
LD   M8000
TO   U0\G1500  K100  K1    (* 1500 = Cd.3; K100 = run positioning data No. 100 *)

(* Start only when ready, synchronised, not busy, no error *)
LD   X0                    (* READY *)
AND  X1                    (* Synchronization flag *)
ANDI XC                    (* BUSY axis 1 OFF *)
ANI  X8                    (* Error detection axis 1 OFF *)
AND  M100                  (* run permission, illustrative *)
PLS  M110

(* Turn on Positioning start axis 1 for one scan *)
LD   M110
SET  Y10

(* Release Y10 once the start is accepted *)
LD   X10                   (* Start complete axis 1 *)
RST  Y10

(* Wait for positioning complete *)
LD   X14                   (* Positioning complete axis 1 *)
OUT  M120
```

Signal sources: `Y0` PLC READY, `Y1` All axis servo ON, `Y10`–`Y13` Positioning start axes 1–4, `X0` READY, `X1` Synchronization flag, `X4`–`X7` M code ON, `X8`–`XB` Error detection, `XC`–`XF` BUSY, `X10`–`X13` Start complete, `X14`–`X17` Positioning complete — IB-0300185 §3.3.1 p.3-17.

Mandatory order before issuing a start: `Y0` ON → wait for `X0` ON → `Y1` ON when driving servos → wait for `X1` ON → write `Cd.3` → pulse `Y10` — IB-0300185 §10.6.2 p.10-27 (start-condition table).

On the QD75M1 the structure is identical, but `Y10` is the only axis start and the starting time is 2 ms — IB-0300062 §1.1.6 p.1-19.

## 8. Module selection table

| Situation | Choose | Reason |
| --- | --- | --- |
| Stepper or pulse-input servo (MR-J4-A, ASDA-B2, DM542) | QD75D4 | Only the D/P family outputs pulses; see [/q/qd75/](/en/q/qd75/) |
| SSCNET servo amplifier (MR-J2-B, MR-J3-B) | QD75M1/M2/M4 | SSCNET interface, 1/2/4 axes |
| SSCNET III/H servo amplifier (MR-J4-B, MR-J5-B) | QD77MS4 | SSCNET III/H, 4 axes, 0.88 ms |
| Multi-axis synchronisation, electronic cam, virtual axes | QD77MS | Synchronous control exists; QD75 does not have it |
| 8 or more axes | QD77MS16 | 16 axes, buffer base address `4300+100n` |
| One axis, tight budget, legacy SSCNET servo | QD75M1 | 1 axis, 600 points |

Do not choose a QD75D4 for an amplifier that only has an SSCNET port: the module has no optical interface and cannot drive such an amplifier.

## 9. Read next

- Full QD75D4 coverage: [overview](/en/q/qd75/), [wiring](/en/q/qd75/wiring), [parameters](/en/q/qd75/parameters), [ladder](/en/q/qd75/ladder).
- QD77MS: IB-0300185 chapter 5 (data), chapter 9 (positioning control), chapter 13 (synchronisation).
- QD75M: IB-0300062 chapter 6 (program), chapter 7 (memory).
- Other modules in the Q family: [MELSEC Q](/en/q/).
