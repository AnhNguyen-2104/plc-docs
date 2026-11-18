---
title: Quick configuration reference — QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { prRows, daRows, xySignals } from '../../../.vitepress/data/modules/qd75d4.ts'

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')
const t = (value) => (typeof value === 'string' ? value : (value?.[isVi.value ? 'vi' : 'en'] ?? value?.vi ?? ''))
const address = (row) => [row.x, row.y].filter((value) => value && value !== '—').join(' / ')
const direction = (row) => (row.x && row.x !== '—' ? 'QD75 → CPU (X)' : 'CPU → QD75 (Y)')
</script>

# Quick configuration reference — QD75D4

This page gathers everything that must be set for one QD75D4 axis onto a single screen. Type a `Pr.` or `Da.` code into the table filter box to find a parameter quickly. Click a **Source** cell to open the exact PDF page of the manual in place. Every value here is for reference only; before loading a real machine you must still cross-check the original manual and run an unloaded test.

## 1. Pr. — axis parameters

<ParamTable :rows="prRows" title="Pr.1–Pr.56" />

The table has a filter box right in the column header: type `Pr.5`, `pulse` or `unit` to narrow it down. The **Source** column opens the corresponding PDF page of SH-080058 directly.

## 2. Da. — position data

<ParamTable :rows="daRows" title="Da.1–Da.10" />

Each Da. row is one field of one positioning point; it uses the same formula set and the same filter box as the Pr. table above.

## 3. X/Y signals

The table below is taken from the shared module data, source SH-080058 §3.3.1 (p.3-16). An X address is a CPU input (QD75 → CPU), a Y address is a CPU output (CPU → QD75).

<table>
  <thead>
    <tr>
      <th>Address</th>
      <th>Signal</th>
      <th>Direction</th>
      <th>Meaning</th>
      <th>Source</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in xySignals" :key="`${row.x}-${row.y}-${t(row.name)}`">
      <td>{{ address(row) }}</td>
      <td>{{ t(row.name) }} <span class="ref-axis">({{ t(row.axis) }})</span></td>
      <td>{{ direction(row) }}</td>
      <td>{{ t(row.desc) }}</td>
      <td>
        <SourceRef v-if="row.srcDoc" :doc="row.srcDoc" :page="row.srcPage" :text="row.src" />
        <SourceRef v-else doc="sh080058" page="3-16" :text="row.src" />
      </td>
    </tr>
  </tbody>
</table>

## 4. Driver-side parameters

Set the ratio on **one side** only: either QD75D4 `Pr.2`–`Pr.4`, or the driver electronic gear. Setting both doubles the error.

| Driver | Parameter to set | Source |
| --- | --- | --- |
| Mitsubishi MR-J4-A | `PA13` — selects the command pulse form (PULSE/SIGN, CW/CCW, A/B), must match QD75D4 `Pr.5` | SH-030143-C §2.2 p.2-17; logic cross-check §7.2.1 p.7-23 |
| Mitsubishi MR-J4-A | `PA06` (CMX) / `PA07` (CDV) — electronic gear | SH-030143-C §7.1.1 p.7-19 |
| Delta ASDA-B2 | Input pulse form: per the ASDA-B2 User Manual, parameter chapter — this page does not record the parameter number for this item | ASDA-B2 User Manual p.3-18…3-22 `[secondary]` |
| Delta ASDA-B2 | Electronic gear pair `P1-44` / `P1-45` (catalogue requirement; page not cross-checked) | ASDA-B2 User Manual, ch. 3 (p.3-18…3-22) — parameter page not cross-checked |
| Yaskawa Sigma-7 SGD7S | Reference pulse form: per SIEP S800001 26O, parameter chapter — this page does not record the parameter number for this item | SIEP S800001 26O p.4-35…4-38 |
| Yaskawa Sigma-7 SGD7S | `Pn20E` / `Pn210` — drive-side electronic gear | SIEP S800001 26O p.4-35…4-38 `[secondary]` — parameter page not cross-checked |
| Panasonic MINAS A6 | Command pulse input mode: per SX-DSV03031, `Pr0.0x` chapter — this page does not record the parameter number for this item | SX-DSV03031 |
| Panasonic MINAS A6 | `Pr0.08` — command pulses per revolution (catalogue requirement; page not cross-checked) | SX-DSV03031 ch. Pr0.0x — parameter page not cross-checked |
| Leadshine DM542 | Microstep DIP switch group — page not cross-checked | DM542 Rev 3.0, DIP switch section — page not cross-checked |

`[secondary]` means the figures come from a redistributed PDF and have not been cross-checked with the manufacturer's original release.

## 5. Configuration checklist in order

1. `Parameter` — in GX Works2 declare the QD75D4 module: slot position, number of axes, module type; this is the basis for every following step to have the correct `U<base>\G<addr>` address.
2. `Switch Setting` — set the module switches/axis declaration to match the actual machine configuration before loading the program.
3. `Online → Write to PLC` — load the PLC parameters to the CPU, then reset or power-cycle so the module picks up the new configuration.
4. `Pr.1` — choose the axis unit (mm/inch/degree/pulse) before entering any address.
5. `Pr.2`, `Pr.3`, `Pr.4` — pulses per revolution, distance per revolution, unit factor; hold the ratio on the QD75D4 side and leave the driver at 1:1 if possible.
6. `Pr.5` — pulse form (PULSE/SIGN, CW/CCW, A/B) must match the driver's pulse-form parameter; also check `Pr.23` bit 0 (logic level).
7. Write Pr. while Y0 is still OFF → turn Y0 ON so the module latches the values → read back with `FROM`/`U<base>\G<addr>` to confirm.
8. `Da.` table — enter the positioning points: `Da.1` operation pattern, `Da.2` control system, `Da.6` address/travel distance, `Da.8` speed; read back after writing.
9. OPR — configure the origin parameter group and run origin point return (OPR), confirming the origin before running real points.
10. Servo-ON — enable `SON`/`S-ON`/`SRV-ON` with a PLC transistor output (not a QD75D4 output), and wait for `READY`/`RD` from the driver.
11. Test — low-speed JOG, confirm the direction of rotation, check `BUSY`/`Positioning complete`, and measure the actual distance against the setting.
12. Record — save the QD75D4 and driver values used, together with the date and the person who performed the work.

## Read next

- [QD75D4 parameters (Pr.)](/en/q/qd75/parameters)
- [QD75D4 position data (Da.)](/en/q/qd75/position-data)
- [QD75D4 X/Y signals](/en/q/qd75/io-signals)
- [Driver wiring overview](/en/q/drivers/)
