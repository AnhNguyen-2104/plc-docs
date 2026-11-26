---
title: Module assembly & rack configuration
family: q
module: q-series
status: draft
source: SH-080483, SH-080807
---

# Module assembly & rack configuration

<ModuleSectionNav />

Assembling modules means choosing the CPU, base and power supply, then placing modules into slots so that three limits are not exceeded: the CPU's I/O points, the base's slot count and the power supply's total 5 V current. The tool below computes X/Y addresses, total points and total 5 V current, and warns when a rating is exceeded; the detailed rules are in section 1. Per-model guidance lives under [Module guides](/en/q/modules/guides).

<RackBuilder />

## 1. The three limits to check

| Limit | Where to check | Source |
| --- | --- | --- |
| Maximum I/O points of the CPU | `maxIoPoints` in the configuration table; Q00UJCPU 256, Q03UDV/Q06UDH 4096 | SH-080483 §1.1 p.26 |
| Number of base slots | Q33B 3, Q35B 5, Q38B 8, Q312B 12; extension base Q63B/Q65B/Q68B/Q612B follow the same layout | SH-080483 §8.3 p.249 |
| Total 5 V current | Add base + CPU + each module current, compare with the Q61P 6 A / Q62P 3 A / Q63P 6 A / Q64P 8.5 A rating | SH-080483 §7.2.1 p.213–215 |

- An empty slot still occupies 16 points by default; set it to 0 points only when it is correctly declared in the I/O Assignment (SH-080807 §2.3.1 p.56).
- An intelligent module occupies 16 or 32 points depending on the model; check the "Points" column in the results table.
- A module with no 5 V current figure shows "—"; it must not be added to the total and is flagged with its own warning.

## 2. Reading the results and taking them to GX Works2

- **X range / Y range**: the address span the module actually uses; an input module has only X, an output module only Y, and an intelligent/combined module has both.
- **Empty slot = 0 points**: shifts the addresses of later slots up; use only when 0 points is already declared in the I/O Assignment.
- **Copy for GX Works2**: a 5-column TSV table `Slot / Type / Model Name / Points / Start XY`, pasted directly into the I/O Assignment.
- **Point override and cross-check**: each slot has a *Points* field (blank = automatic); changing it recomputes `Start XY` for every later slot. Paste the GX Works2 I/O Assignment into the cross-check box to compare the computed `Start XY` with the real value, because the physical slot number and the X/Y address do not necessarily match.
- The workflow for creating a project and writing it to the CPU: [Creating a GX Works2 project](/en/q/start/project).

## 3. Links

- [Power supply and base unit](/en/q/system/power-and-base)
- [I/O wiring](/en/q/system/io-wiring)
- [Module guides](/en/q/modules/guides)
- [Catalogue overview](/en/q/modules/)
