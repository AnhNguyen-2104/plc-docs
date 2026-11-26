---
title: Create a GX Works2 project
family: q
module: q-series
status: draft
source: SH-080807, SH-080483
---

# Create a GX Works2 project

A GX Works2 project must declare the correct CPU and rack from the start. With the wrong PLC Type, or with I/O Assignment left blank, the X/Y addresses assigned by the software differ from the real base, and the program reads or writes the wrong module.

## 1. Create a new project

1. `Project > New…`.
2. `Project Type`: **Simple Project**.
3. Clear `Use Label` when the program does not use labels.
4. `PLC Series`: **QCPU (Q mode)**.
5. `PLC Type`: the exact CPU on the rack — for example `Q03UDVCPU`, `Q06UDHCPU`, `Q00UJCPU`.
6. `Language`: **Ladder**.

The dialog structure and these options follow SH-080807 §1.2 p.27.

## 2. Declare I/O Assignment

Open `PLC Parameter > I/O Assignment`.

- **Base Mode = Auto** for a simple rack: GX Works2 assigns addresses by module order.
- **Base Mode = Detail** when you need to declare slot count, reserve empty slots or set 0 points for unused slots. Enter `Base Model Name`, `Power Model Name`, `Extension Cable` and `Slots` to match the physical rack (SH-080807 §2.2.2 p.54).

The slot table has four columns that must match reality:

| Column | Meaning |
| --- | --- |
| Type | Module type: digital I/O, intelligent, or empty |
| Model Name | Model name printed on the module |
| Points | I/O points the module occupies on the base |
| Start XY | Starting address assigned by GX Works2 |

Take `Points` and `Start XY` from the [rack configuration page](/en/q/start/configuration); the tool there produces the table in slot order.

## 3. Write to the CPU

1. Connect the programming cable and power the rack.
2. `Online > Write to PLC`.
3. Select `PLC Parameter` together with the program to download.
4. After writing, reopen `PLC Parameter > I/O Assignment` and confirm no field is flagged.

If GX Works2 reports an I/O Assignment error, compare `Points` and `Start XY` with the configuration table; most errors come from declaring too many slots or the wrong point count for an intelligent module.

## 4. Intelligent modules

GX Works2 does not configure the operating parameters of an intelligent module. After I/O Assignment:

- **QD75D4** — configure with GX Configurator-QP, or write the buffer memory from ladder (`TO`/`FROM`, `U\G` device): [QD75 control program](/en/q/qd75/ladder).
- **QJ71E71-100, QJ61BT11N** — declare them in the project's `Intelligent Function Module Parameter`, not only in I/O Assignment.
- **Q64AD, Q62DA, QD62** — initial parameters also live in `Intelligent Function Module Parameter` or are written to buffer memory.

## 5. Checks before running

- The CPU name in the project matches the name on the CPU cover.
- Total I/O points stay within the CPU limit (Q03UDV/Q06UDH: 4096; Q00UJCPU: 256).
- Total rack 5 V current stays below the power supply rating: [Power supply and base unit](/en/q/system/power-and-base).
- Empty slots are declared as 16 points or 0 points according to the design.
