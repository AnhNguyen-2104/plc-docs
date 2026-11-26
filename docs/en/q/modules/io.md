---
title: MELSEC Q combined I/O modules — module list
family: q
module: q-series
status: draft
source: SH-080042
---

# MELSEC Q combined I/O modules — module list

<ModulePhoto id="qh42p" />

This page collects the three combined I/O modules of the MELSEC Q series documented in SH-080042. Each module places a fixed input group and a fixed output group in the same housing, so it occupies one slot and one head address while carrying both point types. Pure input modules are on [Digital input modules](/en/q/modules/input); pure output modules are on [Digital output modules](/en/q/modules/output).

## Module list

| Model | Input points | Output points | Note | Source |
| --- | --- | --- | --- | --- |
| [QH42P](/en/q/modules/m/qh42p) | 32-point 24 VDC input | 32-point sink transistor output | 32 in + 32 out on one module | SH-080042 §4.1 p.4-1 |
| [QX41Y41P](/en/q/modules/m/qx41y41p) | 32-point 24 VDC input | 32-point sink transistor output | Same 32 + 32 ratio with a different terminal arrangement than QH42P | SH-080042 §4.4 p.4-4 |
| [QX48Y57](/en/q/modules/m/qx48y57) | 8-point 24 VDC input | 7-point sink transistor output | Small module, 8 in + 7 out for a compact I/O cluster | SH-080042 §4.7 p.4-7 |

Each model keeps a fixed number of input and output points; it cannot be reconfigured into 64 inputs or 64 outputs. When you need all inputs or all outputs, use the pure modules on the two pages above instead of combining several mixed modules.

## 1. Sources

- All three models: <SourceRef doc="sh080042" page="4" />, section 4 has the terminal layout and specifications for each module.
- Slot position, system current budget and base limits: <SourceRef doc="sh080483" page="8.3" />.

The actual wiring circuits are on the [I/O wiring](/en/q/system/io-wiring) page.
