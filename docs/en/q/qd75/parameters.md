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
    code: `(* Write unit parameters while Y0 is still OFF.
   For address <Pr.x> consult SH-080058, parameters chapter. *)
LD   M8000
TO   U0\\G<Pr1>  K<Pr.1 value>  K1
TO   U0\\G<Pr2>  K<Pr.2 value>  K1
TO   U0\\G<Pr3>  K<Pr.3 value>  K1
TO   U0\\G<Pr4>  K<Pr.4 value>  K1

(* Read back to confirm. *)
LD   M8000
FROM U0\\G<Pr2>  D200  K1
FROM U0\\G<Pr3>  D201  K1`
  },
  {
    label: 'IL — direct access',
    lang: 'il',
    code: `(* Same content, using U<base>\\G<addr> directly. *)
LD   M8000
MOV  K<Pr.2 value>  U0\\G<Pr2>
MOV  K<Pr.3 value>  U0\\G<Pr3>
MOV  K<Pr.4 value>  U0\\G<Pr4>`
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
- **Pr.3 — travel per revolution:** the mechanical travel per revolution, expressed in Pr.1 units, before multiplying by Pr.4 (SH-080058 §5.2.1 p.5-18).
- **Pr.4 — unit magnification:** multiplied into Pr.3 when one revolution exceeds the Pr.3 limit; accepts 1 / 10 / 100 / 1000 (SH-080058 §5.2.1 p.5-18).
- **Pr.5 — pulse output mode:** `0` PULSE/SIGN, `1` CW/CCW, `2` A/B phase ×4, `3` A/B phase ×1. The value is latched at the first Y0 OFF → ON transition after power-up or a CPU reset (SH-080058 §5.2.1 p.5-20).
- **Pr.8 — speed limit:** the speed ceiling for the axis; the commanded speed is clamped to this value. The mm range is 0.01…20000000.00 mm/min, the pulse range is 1…1000000 for the QD75D; default 200000 (SH-080058 §5.2.2 p.5-24).
- **Pr.9 / Pr.10 — default acceleration / deceleration time:** used when the data point selects time set number 0; range 1…8388608 ms, default 1000 (SH-080058 §5.2.2 p.5-24).

## 3. Converting pulses to units

```text
pulse/unit = (Pr.2 × Pr.4) / Pr.3
```

With the mm unit the result is pulse/mm; with degrees it is pulse/degree.

### Illustration using the sample unit table

The row "mm, 100 pulse/mm": Pr.2 = 10000, Pr.3 = 100, Pr.4 = 1.

```text
pulse/mm = (10000 × 1) / 100 = 100
```

That means travelling 250 mm requires 25 000 pulses. The remaining rows in the table below use the same formula, only the value set differs.

## 4. Sample unit table

| Label | Pr.2 | Pr.3 | Pr.4 | Formula | pulse/unit | Source |
| --- | --- | --- | --- | --- | --- | --- |
| mm, 100 pulse/mm | 10000 | 100 | 1 | pulses/mm = (Pr.2 x Pr.4) / Pr.3 = (10000 x 1) / 100 | 100 | SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4 |
| mm, 10000 pulse/mm | 10000 | 10 | 10 | pulses/mm = (Pr.2 x Pr.4) / Pr.3 = (10000 x 10) / 10 | 10000 | SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4 |
| degree (Pr.1 = 2), 27.78 pulse/degree | 10000 | 360 | 1 | pulses/degree = (Pr.2 x Pr.4) / Pr.3 = (10000 x 1) / 360 | 27.78 | SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4 |

The numbers in the table above are taken verbatim from the site data, source SH-080058. When communicating with operators, always state which unit is in use.

## 5. Two parameter write paths

### (a) Main path — ladder writing buffer memory

Use `TO` or direct access `U<base>\G<addr>`. For the buffer address of each Pr., consult the tables in SH-080058; in the example, `<Pr1>`…`<Pr4>` are placeholders for those addresses.

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
