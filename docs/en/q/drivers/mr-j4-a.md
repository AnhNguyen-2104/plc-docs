---
title: Mitsubishi MR-J4-A
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

<script setup>
const tabs = [
  {
    label: 'IL — axis 1 parameters',
    code: `(* QD75D4 axis 1. Buffer memory addresses in decimal:
  Pr.1 = G0, Pr.2 = G1, Pr.3 = G2, Pr.4 = G3, Pr.5 = G4.
  Source: SH-080058 §7.1.2 p.7-5; Appendix 13 p. Appendix-150.
  Pr.3 is written in 0.1 µm: 5 mm = 50000 (SH-080058 §5.2.1 p.5-19). *)
LD   M8000
TO   U0\\G0  K0      K1   (* Pr.1: unit mm *)
TO   U0\\G1  K500    K1   (* Pr.2: 500 pulse/rev *)
TO   U0\\G2  K50000  K1   (* Pr.3: 5 mm, written in 0.1 µm *)
TO   U0\\G3  K1      K1   (* Pr.4: factor 1 *)
TO   U0\\G4  K0      K1   (* Pr.5: PULSE/SIGN, latched on the first Y0 ON *)

(* Read back for confirmation. *)
LD   M8000
FROM U0\\G2  D200  K1`
  },
  {
    label: 'IL — servo-ON',
    code: `(* Servo-ON is NOT a QD75D4 output; SON is CN1-15
   (SH-030143-C §2.2 p.2-17). The X/Y addresses below are examples only. *)
LD   M100        (* enable condition defined by the program *)
OUT  Y10         (* → DICOM 20/21 and SON 15 of the MR-J4-A *)`
  }
]
</script>

# Mitsubishi MR-J4-A

Manual used on this page: `SH(NA)030143ENG-C` (revision C), cover titled `MR-J4-_A_-RJ` / `MR-J4-03A6-RJ` — "SERVO AMPLIFIER INSTRUCTION MANUAL (POSITIONING MODE)". The cover does not say plain `MR-J4-_A_`, so if the machine uses a standard MR-J4-A the CN1 table must be cross-checked again. QD75D4 terminal numbers come from SH-080058.

## 1. QD75D4 → CN1 pulse pair

| QD75D4 | QD75D4 signal | CN1 | MR-J4-A signal | Source |
| --- | --- | --- | --- | --- |
| 1A15 | PULSE F+ | 10 | PP | §3.4.1 <SourceRef doc="sh080058" page="3-24" />; §2.2 <SourceRef doc="sh030143" page="2-17" /> |
| 1A16 | PULSE F− | 11 | PG | §3.4.1 <SourceRef doc="sh080058" page="3-24" />; §2.2 <SourceRef doc="sh030143" page="2-17" /> |
| 1A17 | PULSE R+ | 35 | NP | §3.4.1 <SourceRef doc="sh080058" page="3-24" />; §2.2 <SourceRef doc="sh030143" page="2-17" /> |
| 1A18 | PULSE R− | 36 | NG | §3.4.1 <SourceRef doc="sh080058" page="3-24" />; §2.2 <SourceRef doc="sh030143" page="2-17" /> |

Four mandatory notes:

- `PP` on CN1-10 and `NP` on CN1-35 are pins shared with `DI2`/`DI3`. To use them as pulse outputs they must be reassigned with `Pr.PD44` and `Pr.PD46` (value `0 0 _ _`), per SH-030143-C §2.2 p.2-14 notes 15–16 and §7.2.4 p.7-67. The alternative `PP2/NP2` pins are at CN1-37/38.
- When CN1-10/35 are still used as digital inputs, the manual requires +24 V on `OPC` (CN1-12); this pin is not used for the differential pair.
- The pulse form must match: QD75D4 `Pr.5` (PULSE/SIGN, CW/CCW, A/B) and `Pr.23` bit 0 against `Pr.PA13` of the MR-J4-A (SH-030143-C §7.2.1 p.7-23). The manual prints the row verbatim: `Pr.23 Output signal logic selection / b0 Command pulse signal / 0: Negative logic / 1: Positive logic` (SH-080058 §5.2.3 p.5-31); the axis 1 address of Pr.23 is 32 (Appendix 13 p. Appendix-150). A wrong logic level can make the motor turn backwards or not turn at all.
- Pair polarity: the CN1 table names `PP/PG` and `NP/NG`; when wiring per the SH-080058 example (F+ → PP, F− → PG, R+ → NP, R− → NG) an unloaded test run is required to confirm the direction of rotation — reversing the polarity makes the motor turn backwards.

The wiring example in SH-080058 §3.4.1 p.3-24 is drawn for the MR-J3-A (`PULSE F+/F−` → `PP/PG`, `PULSE R+/R−` → `NP/NG`). The MR-J4-A manual at hand does **not** state that the MR-J3-A and MR-J4-A are pin-compatible; this page therefore uses only the MR-J4-A CN1 table and does not infer from the MR-J3-A.

<WiringDiagram variant="mr-j4-a" />

<PinMapDiagram variant="mr-j4-a" />

## 2. Servo-ON from the PLC

Servo-ON is the `SON` input at **CN1-15** (SH-030143-C §2.2 p.2-17, §2.3 p.2-22). It must be driven by a transistor output of the PLC and must not be connected to the QD75D4.

- The driver can enable servo-ON itself with `Pr.PD01` set to `_ _ _ 4` (SH-030143-C §2.3 p.2-22), but this loses the ability to stop the servo independently — use it only when the design accounts for it.
- `SON` is not a safety signal; emergency stop must still cut the power supply independently.

## 3. READY, alarm and in-position

| Signal | CN1 | Meaning | Source |
| --- | --- | --- | --- |
| RD (Ready) | 49 | ON when servo-ON and the driver is ready | SH-030143-C §2.3 <SourceRef doc="sh030143" page="2-31" /> |
| ALM (Malfunction) | 48 | ON when normal, OFF when there is an alarm | SH-030143-C §2.3 <SourceRef doc="sh030143" page="2-31" /> |
| INP (In-position) | 24 | ON when the pulse deviation is within the in-position range | SH-030143-C §2.3 <SourceRef doc="sh030143" page="2-31" /> |
| DOCOM | 46, 47 | Common point of the output group | SH-030143-C §2.2 <SourceRef doc="sh030143" page="2-17" /> |

Wiring for the MR-J4 sinking output: `RD` (CN1-49) → `READY` 1A11, `RDYCOM` 1A12 → **+24 V**, `DOCOM` 46/47 → 0 V; loop +24 V → RDYCOM → READY photocoupler → RD 49 → DOCOM → 0 V. `ALM` (CN1-48) → a PLC input for interlocking and fault display. The MR-J4-A CN1 table reserves `DICOM` 20/21 for the input group and `DOCOM` 46/47 for the output group (§2.2 p.2-17; the internal connection diagram §2.5 p.2-40–2-41 draws `RD` 49 in the `DOCOM` group), so this page keeps `DOCOM`.

## 4. 24 V supply

- The input group uses `DICOM` CN1-20/21; the output group uses `DOCOM` CN1-46/47 (SH-030143-C §2.2 p.2-17).
- One fused 24 V supply per group; do not share the supply with the brake.
- `OPC` CN1-12 is supplied with +24 V only when CN1-10/35 are used as open-collector digital inputs (SH-030143-C §2.2 p.2-18 note 8).
- Do not connect the QD75D4 differential pair to `DICOM`/`DOCOM` or to any 24 V opto input.

## 5. MR Configurator2

These parameters are usually set in `MR Configurator2 → Parameter`: `Pr.PA06`/`Pr.PA07` (electronic gear), `Pr.PA13` (pulse output mode) and `Pr.PD44`/`Pr.PD46` (pin assignment). The manual requires MR Configurator2 version SW1DNC-MRC2-_ 1.34L or later for positioning mode (SH-030143-C §1.1(1) p.1-1). After changing `PA06`/`PA07`, a power cycle is required before the new values take effect (SH-030143-C §7.1.1 p.7-19).

## 6. Commissioning test

<CodeTabs :tabs="tabs" />

The IL tab only illustrates how to write buffer memory and how to enable servo-ON; the `U0` address is base 0 and must be changed to match the actual module position.

## Read next

- [Driver wiring overview](/en/q/drivers/)
- [Parameters & gear ratio](/en/q/drivers/parameters-gear)
- [QD75D4 wiring](/en/q/qd75/wiring)
