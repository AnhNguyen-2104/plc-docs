---
title: MELSEC Q CPUs — module list
family: q
module: q-series
status: draft
source: SH-080483, SH-080807
---

# MELSEC Q CPUs — module list

<ModulePhoto id="q00ujcpu" />

<ModulePhoto id="q03udv" />

<ModulePhoto id="q06udh" />

The three CPUs below represent three tiers of the Universal model QCPU range: [Q00UJCPU](/en/q/modules/m/q00ujcpu) is the integrated power-supply-and-base unit for small systems, [Q03UDVCPU](/en/q/modules/m/q03udv) adds built-in Ethernet, and [Q06UDHCPU](/en/q/modules/m/q06udh) doubles the program capacity but has no built-in Ethernet. Choose on three numbers: program capacity (steps), maximum I/O points, and built-in programming ports.

## Module list

| Model | Role |
| --- | --- |
| [Q00UJCPU](/en/q/modules/m/q00ujcpu) | CPU with integrated power supply and base for small systems |
| [Q03UDV](/en/q/modules/m/q03udv) | Universal CPU with built-in Ethernet |
| [Q06UDH](/en/q/modules/m/q06udh) | High-performance Universal CPU without built-in Ethernet |

## 1. Quick comparison

| Item | Q00UJCPU | Q03UDVCPU | Q06UDHCPU | Source |
| --- | --- | --- | --- | --- |
| Program capacity | 10K steps | 30K steps | 60K steps | SH-080483 §1.1 p.27 |
| I/O points | 256 (X/Y0–FF) | 4096 (X/Y0–FFF) | 4096 (X/Y0–FFF) | SH-080483 §1.1 p.26 |
| LD instruction speed | 120 ns | 1.9 ns | 9.5 ns | SH-080483 §1.1 p.28 |
| Built-in Ethernet | No | Yes, RJ45 100/10 Mbps | No | SH-080483 §6.1.3 p.143 |
| Built-in USB | Not verified | Yes, miniB | Yes, miniB | SH-080483 §6.1.3 p.143 |
| Built-in RS-232 | No | No | Yes | SH-080483 §6.1.3 p.140 |
| Integrated power + base | Yes | No | No | SH-080483 §1.1 p.26 |
| Max. modules | 16 (16 slots) | 64 | 64 | SH-080483 §1.1 p.26 |

Q00UJCPU combines the power supply and main base in one unit, so no Q61P/Q62P or separate base is needed; in exchange, the I/O ceiling is 256 points and 16 slots. Q03UDV and Q06UDH are standalone CPUs that need their own supply and base, but reach 4096 I/O points and 64 modules.

## 2. Programming ports and Ethernet

| CPU | Programming ports | Notes | Source |
| --- | --- | --- | --- |
| Q00UJCPU | Not verified in the part-name table | The part-name table lists no USB/RS-232 port | SH-080483 §6.1.3 p.130 |
| Q03UDVCPU | USB miniB + Ethernet RJ45 | The 100M LED is on at 100 Mbps | SH-080483 §6.1.3 p.143 |
| Q06UDHCPU | USB miniB + RS-232 (D-sub 9) | No Ethernet port on the CPU | SH-080483 §6.1.3 p.140 |

On Q03UDV the 100/10 Mbps Ethernet port carries program transfer and monitoring without a USB cable; the CPU allows 16 simultaneous socket/MELSOFT/MC-protocol connections plus 1 FTP connection (SH-080483 §6.1.3 p.143). Q06UDH has no built-in Ethernet: networking needs a QJ71E71-100 or equivalent module.

The Universal model QCPU front (Q02U/Q03UD/Q04UDH…) showing the ports, pins, LEDs and battery cover:

<ManualFigure
  src="/img/manual/qcpu-module.webp"
  alt="Universal model Q CPU front: USB/RS-232 ports, RUN/ERR LEDs, battery cover and switches"
  caption="Universal model Q CPU front: ports, LEDs and battery cover"
  doc="SH-080483"
  section="§6.1.3"
  page="138"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080483/sh080483bc.pdf"
/>

## 3. Scan time

Scan time is the sum of four parts: initial processing, I/O refresh, program execution and END processing (SH-080807 §2.4 p.67). Initial processing runs once after power-up or reset and is not part of the repeating scan; the other three parts repeat every cycle.

For the same program, Q03UDV executes LD faster than Q06UDH (1.9 ns vs 9.5 ns), while Q06UDH has twice the step capacity. In practice scan time also depends on the number of intelligent modules, refresh volume and communication instructions; measure it with the GX Works2 scan-time function instead of deriving it from instruction speed alone.

## 4. CPU for a QD75D4 rack

QD75D4 occupies 32 intelligent I/O points on the base (SH-080058 §3.1 p.3-2), so a typical four-axis rack uses only 32 I/O points — tiny next to the 4096-point ceiling. Program capacity and the programming port are the deciding factors:

- **Default recommendation: Q03UDVCPU** — 30K steps, 4096 points, built-in Ethernet; enough for a Q312B (12-slot) rack with a QD75D4, digital I/O and one network module, with Ethernet program transfer and monitoring.
- **When the program exceeds 30K steps: Q06UDHCPU** — 60K steps, same 4096 points; add an Ethernet module if networking is required.
- **Do not use Q00UJCPU for a multi-module QD75D4 rack** — the 256-point and 16-slot limits are hard ceilings, too tight for four axes plus I/O and a network module.

This is a design recommendation, not a manual requirement: the manual only constrains maximum I/O points and module count. For new designs note that QD75D4 was discontinued in 09/2021 and QD75D4N is the replacement (see the [QD75 pages](/en/q/qd75/)).

How to total the rack's 5 VDC current and choose a Q61P/Q62P/Q63P/Q64P is on the [Power and base](/en/q/system/power-and-base) page.

## 5. Sources

- Program capacity: <SourceRef doc="sh080483" page="1.1.3" />.
- I/O points and maximum modules: <SourceRef doc="sh080483" page="1.1" />.
- Built-in ports: <SourceRef doc="sh080483" page="6.1.3-udv" /> (Q03UDV) and <SourceRef doc="sh080483" page="6.1.3-udh" /> (Q06UDH).
- Scan-time structure: <SourceRef doc="sh080807" page="2.4" />.
