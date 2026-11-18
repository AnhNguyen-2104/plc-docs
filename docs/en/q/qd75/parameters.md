---
title: Parameters (Pr.) — QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

<script setup>
import { prRows, unitExamples } from '../../../.vitepress/data/modules/qd75d4.ts'
const tabs = [
  {
    label: 'IL — TO',
    lang: 'il',
    code: `(* QD75D4 axis 1. Buffer memory addresses in decimal:
   Pr.1 = G0, Pr.2 = G1, Pr.3 = G2, Pr.4 = G3, Pr.5 = G4.
   Source: SH-080058 §7.1.2 p.7-5; Appendix 13 p. Appendix-150.
   Pr.3 is written in 0.1 µm: 5 mm = 50000 (SH-080058 §5.2.1 p.5-19). *)
LD   M8000
TO   U0\\G0  K0      K1   (* Pr.1: mm unit *)
TO   U0\\G1  K500    K1   (* Pr.2: 500 pulses/rev *)
TO   U0\\G2  K50000  K1   (* Pr.3: 5 mm, written in 0.1 µm *)
TO   U0\\G3  K1      K1   (* Pr.4: factor 1 *)
TO   U0\\G4  K0      K1   (* Pr.5: PULSE/SIGN *)

(* Read back to confirm. *)
LD   M8000
FROM U0\\G2  D200  K1
FROM U0\\G3  D201  K1`
  },
  {
    label: 'IL — direct access',
    lang: 'il',
    code: `(* Same content, using U<base>\\G<addr> directly. *)
LD   M8000
MOV  K500    U0\\G1
MOV  K50000  U0\\G2
MOV  K1      U0\\G3`
  }
]
</script>

# Parameters (Pr.) — QD75D4

Axis parameters determine how the module interprets position and speed numbers. If the units are wrong, every run command is wrong, even if the position data is correct.

## 1. Parameter table

<ParamTable :rows="prRows" title="Parameters (Pr.)" />

## 2. Meaning of the basic parameters

- **Pr.1 — unit:** `0` mm, `1` inch, `2` degree, `3` pulse. This unit applies to the axis position and speed addresses (SH-080058 §5.2.1 p.5-18).
- **Pr.2 — pulses per revolution:** the number of pulses supplied for one motor revolution. It must match the driver and the mechanism (SH-080058 §5.2.1 p.5-18).
- **Pr.3 — travel per revolution:** the mechanical travel per revolution, before multiplying by Pr.4. The stored value is an integer counted in Pr.1 LSBs: 0.1 µm for mm, 0.00001 for inch and degree (SH-080058 §5.2.1 p.5-18–5-19, Table 1).
- **Pr.4 — unit magnification:** multiplied into Pr.3 when one revolution exceeds the Pr.3 limit; accepts 1 / 10 / 100 / 1000 (SH-080058 §5.2.1 p.5-18).
- **Pr.5 — pulse output mode:** `0` PULSE/SIGN, `1` CW/CCW, `2` A/B phase ×4, `3` A/B phase ×1. The value is latched at the first Y0 OFF → ON transition after power-up or a CPU reset (SH-080058 §5.2.1 p.5-20).
- **Pr.8 — speed limit:** the speed ceiling for the axis; the commanded speed is clamped to this value. The mm range is 0.01…20000000.00 mm/min, the pulse range is 1…1000000 for the QD75D; default 200000 (SH-080058 §5.2.2 p.5-24).
- **Pr.9 / Pr.10 — default acceleration / deceleration time:** used when the data point selects time set number 0; range 1…8388608 ms, default 1000 (SH-080058 §5.2.2 p.5-24).

## 3. Converting pulses to units

The manual defines `Movement amount per pulse = Movement amount per rotation (Al) / No. of pulses per rotation (Ap)`, with `Movement amount per rotation (AL) = Al × Pr.4` (SH-080058 §5.2.1 p.5-19). Inverting it gives pulses per unit; remember that Pr.3 is an integer counted in Pr.1 LSBs:

```text
pulse/unit = Pr.2 × 10^k / (Pr.3 × Pr.4)
```

`10^k` is the number of LSBs per real unit: 10000 for mm (1 LSB = 0.1 µm = 0.0001 mm), 100000 for inch and degree (1 LSB = 0.00001). With the pulse unit, Pr.3 is already a pulse count, so no LSB factor applies.

| Unit (Pr.1) | 1 LSB of Pr.3 | Pr.3 range in LSBs | Formula |
| --- | --- | --- | --- |
| mm (0) | 0.0001 mm (0.1 µm) | 1…65535 (max 6.5535 mm/rev) | pulses/mm = Pr.2 × 10000 / (Pr.3 × Pr.4) |
| inch (1) | 0.00001 in | 1…65535 (max 0.65535 in/rev) | pulses/inch = Pr.2 × 100000 / (Pr.3 × Pr.4) |
| degree (2) | 0.00001° | 1…65535 (max 0.65535°/rev) | pulses/degree = Pr.2 × 100000 / (Pr.3 × Pr.4) |

Source: SH-080058 §5.2.1 p.5-18–5-19, Table 1.

### Illustration using the sample unit table

The row "mm, 100 pulse/mm": Pr.2 = 500, Pr.3 = 50000 (5 mm, written in 0.1 µm), Pr.4 = 1.

```text
pulse/mm = 500 × 10000 / 50000 = 100
```

That means travelling 250 mm requires 25 000 pulses. The remaining rows in the table below use the same formula, only the value set differs.

## 4. Sample unit table

| Label | Pr.2 | Pr.3 | Pr.4 | Formula | pulse/unit | Source |
| --- | --- | --- | --- | --- | --- | --- |
| mm, 100 pulse/mm | 500 | 50000 | 1 | pulses/mm = Pr.2 × 10000 / (Pr.3 × Pr.4) = 500 × 10000 / 50000 = 100 | 100 | SH-080058 §5.2.1 p.5-18–5-19 |
| mm, 1000 pulse/mm | 10000 | 10000 | 10 | pulses/mm = Pr.2 × 10000 / (Pr.3 × Pr.4) = 10000 × 10000 / (10000 × 10) | 1000 | SH-080058 §5.2.1 p.5-18–5-19 |
| degree (Pr.1 = 2), 27.78 pulse/degree | 10000 | 36000 | 1000 | pulses/degree = Pr.2 × 100000 / (Pr.3 × Pr.4) = 10000 × 100000 / (36000 × 1000) | 27.78 | SH-080058 §5.2.1 p.5-18–5-19 |

All three sets sit inside Pr.2 1…65535, Pr.3 1…65535 and Pr.4 ∈ {1, 10, 100, 1000}. Recompute with the formula before loading. When communicating with operators, always state which unit is in use.

## 5. Two parameter write paths

### (a) Main path — ladder writing buffer memory

Use `TO` or direct access `U<base>\G<addr>`. The axis-1 basic parameter area is decimal address 0–15: Pr.1 = 0, Pr.2 = 1, Pr.3 = 2, Pr.4 = 3, Pr.5 = 4; axes 2, 3 and 4 add 150 per axis (SH-080058 §7.1.2 p.7-5; Appendix 13 p. Appendix-150).

<CodeTabs :tabs="tabs" />

`U0` assumes the module is in the first slot on the base; change it to match the actual configuration. Write while Y0 is OFF, then turn Y0 on so the module latches the values.

### (b) Tool path — GX Configurator-QP (optional)

If GX Configurator-QP is available, parameters can be declared in the interface and downloaded to the module. This is an optional path: the final content still resides in buffer memory and must still be verified by reading it back.

## 6. Warnings when writing parameters

- Do not write parameters while the axis is running; stop the axis and put it in a safe state first.
- Some parameters only take effect after Y0 goes OFF → ON following power-up or a CPU reset (for the Pr. number consult SH-080058).
- After writing, read the values back and compare before issuing a run command.
- Changing Pr.2/Pr.3/Pr.4 changes the meaning of all existing position data; review the Da. table after changing units.
- A power loss during writing may leave an inconsistent parameter set; check again after power-up.

## Further reading

- [Position data (Da.)](/en/q/qd75/position-data)
- [X/Y signals](/en/q/qd75/io-signals)
- [Ladder and startup](/en/q/qd75/ladder)
