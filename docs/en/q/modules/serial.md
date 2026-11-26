---
title: MELSEC Q serial communication modules — module list
family: q
module: q-series
status: draft
source: SH-080007
---

# MELSEC Q serial communication modules — module list

<ModulePhoto id="qj71c24n" />

The [QJ71C24N](/en/q/modules/m/qj71c24n) is a serial communication module mounted on the MELSEC Q base, exchanging data with external devices over two independent channels. The module keeps transmit/receive buffers in its buffer memory; the CPU accesses them with `FROM`/`TO`, with the `OUTPUT`/`INPUT` dedicated instructions, or lets the module handle the MC protocol itself. This page lists the serial models and helps pick a variant; the QJ71C24N signal pins, switch settings, buffer memory and wiring checklist are on its model page.

## Module list

| Model | Role |
| --- | --- |
| [QJ71C24N](/en/q/modules/m/qj71c24n) | Two serial channels: RS-232 and RS-422/485 |
| [QJ71C24N-R4](/en/q/modules/m/qj71c24n-r4) | Two RS-422/485 serial channels |

## 1. Model variants

| Model | CH1 | CH2 | Notes |
| --- | --- | --- | --- |
| QJ71C24N | RS-232 (9-pin D-sub) | RS-422/485 (2-piece terminal block) | Base model, one channel of each type |
| QJ71C24N-R2 | RS-232 (9-pin D-sub) | RS-232 (9-pin D-sub) | Two RS-232 channels |
| QJ71C24N-R4 | RS-422/485 (2-piece plug-in block) | RS-422/485 (2-piece plug-in block) | Two RS-422/485 channels |

Channel assignment and interface types per SH-080006 §3.1 p.3-1. Maximum transmission distance: RS-232 **15 m**, RS-422/485 **1200 m** (overall cable length) — SH-080006 §3.1 p.3-2.

The plug-in block of the [R4 version](/en/q/modules/m/qj71c24n-r4) requires 7 mm of stripped insulation and the supplied plate terminals for the braided shield; the [QJ71C24N](/en/q/modules/m/qj71c24n) uses an M3 screw terminal block — SH-080006 §4.4 (3) p.4-5.

## 2. Other communication modules

| Model | Role |
| --- | --- |
| [QJ71E71-100](/en/q/modules/m/qj71e71-100) | 100BASE-TX/10BASE-T Ethernet module |
| [QJ61BT11N](/en/q/modules/m/qj61bt11n) | CC-Link master/local module |
| [QJ71LP21-25](/en/q/modules/m/qj71lp21-25) | MELSECNET/H optical loop network module |

## 3. Read next

- MC protocol, frame formats and commands: SH-080007 (Application manual).
- Bit-level settings and error codes: SH-080006 (Basic manual).
- Other modules in the Q family: [MELSEC Q](/en/q/).

