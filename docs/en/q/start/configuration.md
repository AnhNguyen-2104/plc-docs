---
title: Modules & slot assignment
family: q
module: q-series
status: draft
source: SH-080483, SH-080807
---

# Modules & slot assignment

X/Y addresses are not chosen by the programmer: the physical position of a module on the base decides them. Understanding the rule before opening GX Works2 avoids program changes later.

## 1. Addressing rules

- I/O addresses are **hex**, starting at `0H` with the module immediately to the right of the CPU.
- **Input** modules use `X`, **output** modules use `Y`; intelligent and combined modules use both `X` and `Y` (SH-080807 §2.3.1 p.56).
- Each slot occupies exactly the point count of the module fitted to it. **An empty slot still counts as a slot** and defaults to 16 points unless 0 points is declared in I/O Assignment (SH-080483 §2.3 p.43; SH-080807 §2.3.1 p.56).
- An extension base continues from the last address of the main base.

## 2. Worked example

Q38B + Q61P + Q03UDV rack, slot 0 = QX40, slot 1 = QD75D4, slot 2 empty:

| Slot | Model | Points | Address |
| --- | --- | --- | --- |
| 0 | QX40 | 16 | `X000–X00F` |
| 1 | QD75D4 | 32 | `X/Y010–X02F` |
| 2 | empty | 16 | `030–03F` reserved |

The 5 V current of the same rack is far below the Q61P rating:

`0.12 (base) + 0.58 (CPU) + 0.05 (QX40) + 0.82 (QD75D4) = 1.57 A`

on a 6 A supply — about **26.2 %** used, 4.43 A spare. This is the fixed check for the tool below: selecting exactly this configuration must produce exactly these figures.

## 3. Rack builder

Choose the CPU, base and power supply, then assign modules to each slot. The tool computes X/Y addresses, total points and total 5 V current; it warns when the rating is exceeded or when a module lacks data.

<RackBuilder />

## 4. Reading the result

- **X range / Y range** is the address span the module actually uses; input modules have X only, output modules Y only.
- **Empty slots = 0 points** compacts the addresses of later slots; use it only when the matching 0 points is declared in I/O Assignment. Leaving the default 16 points is the safe choice.
- **5 V current** adds only modules with a known figure; modules showing "—" are listed separately and excluded from the total.
- **Copy for GX Works2** gives TSV for pasting into I/O Assignment; **Copy Markdown** gives a table for project documentation.

## 5. After the slot table

Carry this table to the [GX Works2 project page](/en/q/start/project), enter the correct `Type`, `Model Name`, `Points` and `Start XY`, then write it to the CPU. When modules are added or changed later, return here and recalculate both addresses and 5 V current.
