---
title: "QD77MS4 — Motion module"
family: q
module: module-qd77ms4
status: draft
source: IB-0300185
---

<ModulePage id="qd77ms4" />

## 1. Signal groups to wire

QD77MS4 is a four-axis Simple Motion module using SSCNET III/H. The signal groups to wire are:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| SSCNET III/H cable | SSCNET optical cable | module ↔ servo amplifier | One fibre in and one out per amplifier (IB-0300185 §4.1.2 p.4-3) |
| External signals | 40-pin A6CON connector | driver/switch ↔ module | A6CON1/A6CON2/A6CON4 sold separately (IB-0300185 §3.1 p.3-3) |
| Module supply | 5 VDC from base | base → module | Taken from the base 5 V rail |
| Ground | FG through base | — | Per panel rules |

## 2. Wiring principles

- **Connection type:** SSCNET connector — SSCNET III/H optical cable to the servo amplifier (IB-0300185 §3.1, p. 3-3).
- SSCNET III/H cable is 0.15–50 m; keep the bend radius and do not stretch the fibre (IB-0300185 §3.1 p.3-3).
- Switch power off before removing or inserting optical connectors; never look into a cable end while powered.
- Keep the connector cover on until insertion and refit it after removal.
- Connect module → amplifier 1 → amplifier 2 → … in axis order; no star wiring.
- External signals go through the 40-pin connector; pin table per IB-0300185 §3.1 and §4.1.2.

## 3. Reference diagram

- Use [QD75M1](/en/q/modules/m/qd75m1) for a single-axis SSCNET line; QD77MS4 extends the same daisy-chain principle to four axes.
- Use [QD75D4](/en/q/modules/m/qd75d4) for the 40-pin external connector layout and DOG/FLS/RLS/STOP group; its differential pulse pairs do not apply.
- Do not use QD75D4/QD75P4 with an SSCNET-only amplifier.

## 4. Manufacturer input/output circuits

The manufacturer SSCNET signal path between QD77MS and the servo amplifier:

<ManualFigure
  src="/img/manual/qd77ms-sscnet.webp"
  alt="QD77MS signals over SSCNET to the servo amplifier, with encoder and external inputs"
  caption="QD77MS signal path over SSCNET — SSCNET connector"
  doc="IB-0300185"
  section="§1.1.6"
  page="1-20"
/>

Source: <SourceRef doc="ib0300185" page="1.1.6" />.

## 5. External device connections

- Servo amplifier: MR-J4-B, MR-J5-B or a compatible SSCNET III/H type; daisy-chain in axis order.
- Use the correct SSCNET III/H cable; total length and bend radius per IB-0300185 §3.1 p.3-3.
- Encoder feedback travels in the SSCNET frame; do not wire an encoder back to the module.
- The 40-pin A6CON1/A6CON2/A6CON4 connector carries external signals; pin table per §3.1.

### Start sequence

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

## 6. Checklist before power-up

- [ ] Power was switched off before handling optical cable.
- [ ] Correct SSCNET III/H cable and optical connectors.
- [ ] Daisy chain module → amplifier 1 → … in axis order.
- [ ] Optical connectors are clean and covers are fitted when removed.
- [ ] Bend radius and cable length are within the manual limits.
- [ ] External signals match the 40-pin table.
- [ ] Module is in the correct slot and takes 5 V through the base.
- [ ] The Y0 → X0 → Y1 → X1 sequence was checked before issuing a start.
