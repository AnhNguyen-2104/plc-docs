---
title: QJ61BT11N — CC-Link master/local module
family: q
module: q-series
status: draft
source: SH-080016
---

<script setup>
const ccInputs = [
  { signal: 'DA', pin: 'DA', device: 'CC-Link cable — signal wire A (blue)' },
  { signal: 'DB', pin: 'DB', device: 'CC-Link cable — signal wire B (white)' },
  { signal: 'DG', pin: 'DG', device: 'Signal ground (yellow)' },
  { signal: 'SLD', pin: 'SLD', device: 'Shield — connected to FG inside the module' }
]
const ccOutputs = [
  { signal: 'FG', pin: '(FG)', device: 'Frame ground, D-class grounding at both ends' },
  { signal: '110 Ω', pin: 'DA–DB', device: 'Terminating resistor at the two end stations' }
]
</script>

# QJ61BT11N — CC-Link master/local module

The QJ61BT11N is a CC-Link master/local module mounted on the MELSEC Q base, exchanging cyclic data with up to 64 stations on one RS-485 bus. The module acts as master when its station number is 0, or as a local station with a station number of 1–64.

This page covers specifications, terminals, switches and cabling rules. Parameter programming is in SH-080016.

Scope note: the manual available on disk (SH-080016e) documents the **QJ61BT11**. Values on this page are taken from that manual; QJ61BT11N-specific differences are **not verified**.

## 1. Specifications

| Item | Value | Source |
| --- | --- | --- |
| Transmission rate | 156 k / 625 k / 2.5 M / 5 M / 10 Mbps | SH-080016 §3.1 p.3-1 |
| Maximum stations (master) | 64 | SH-080016 §3.1 p.3-1 |
| Occupied stations (local) | 1–4 | SH-080016 §3.1 p.3-1 |
| Maximum link points per system | RX 2048, RY 2048, RWw 256, RWr 256 | SH-080016 §3.1 p.3-1 |
| Link points per station | RX 32, RY 32 (local 30), RWw 4, RWr 4 | SH-080016 §3.1 p.3-1 |
| Transmission path | Bus (RS-485), flag synchronisation | SH-080016 §3.1 p.3-1 |
| Encoding / frame | NRZI, HDLC frame | SH-080016 §3.1 p.3-1 |
| Cable | CC-Link dedicated / dedicated high performance / Ver.1.10 | SH-080016 §3.1 p.3-1 |

Station-count constraint: `{(1×a) + (2×b) + (3×c) + (4×d)} ≤ 64`, where a/b/c/d are the numbers of modules occupying 1/2/3/4 stations; and `{(16×A) + (54×B) + (88×C)} ≤ 2304`, where A ≤ 64 remote I/O stations, B ≤ 42 remote device stations, C ≤ 26 local/standby master/intelligent device stations — SH-080016 §3.1 p.3-1.

Maximum overall cable length per speed (whole system using Ver.1.10 modules and cable) — SH-080016 §3.1.2 p.3-4:

| Speed | Maximum overall length | Station-to-station length |
| --- | --- | --- |
| 156 kbps | 1200 m | — |
| 625 kbps | 900 m | — |
| 2.5 Mbps | 400 m | — |
| 5 Mbps | 160 m | — |
| 10 Mbps | 100 m | ≥ 20 cm |

For a system using only Ver.1.00 modules the overall length is shorter: 600 m at 625 kbps, 200 m at 2.5 Mbps, 150 m at 5 Mbps — SH-080016 §3.1.1 p.3-2. Choose the speed from the actual cable length, not the other way round.

## 2. Block diagram

<ModuleBlockDiagram
  model="QJ61BT11N"
  connector="CC-Link terminal block"
  :inputs="ccInputs"
  :outputs="ccOutputs"
/>

The diagram shows a master in the middle of the line with two remote stations. The master **may** sit in the middle; it does not have to be at an end. Only the terminating resistors must be at both ends — SH-080016 §7.5 (4) p.7-9.

## 3. Terminals and bus rules

The terminal block is a two-piece type; order from left to right — SH-080016 §7.3 p.7-6:

| Terminal | Function |
| --- | --- |
| `NC` | Not used |
| `DA` | CC-Link signal wire A (blue) |
| `DB` | CC-Link signal wire B (white) |
| `NC` | Not used |
| `SLD` | Shield (yellow) |
| `DG` | Signal ground |
| `(FG)` | Frame ground |

`SLD` and `FG` are connected to each other inside the module — SH-080016 §7.3 p.7-6.

Rules:

- Wire daisy-chain through every station. Star wiring is **not** allowed — SH-080016 §7.5 (5) p.7-9.
- Fit terminating resistors at **both ends** of the line, between `DA` and `DB` — SH-080016 §7.5 (2) p.7-9.
- Resistor value depends on cable type: 110 Ω 1/2 W (brown–brown–brown) for CC-Link dedicated and Ver.1.10 cable; 130 Ω 1/2 W (brown–orange–brown) for dedicated high-performance cable — SH-080016 §7.5 (3) p.7-9.
- Do not mix dedicated cable with dedicated high-performance cable on one line — SH-080016 §7.5 IMPORTANT p.7-9.
- Connect the shield to `SLD` at every module and ground both ends through `FG` with D-class grounding — SH-080016 §7.5 POINT p.7-9.

T-branching is allowed only at 156 kbps and 625 kbps; 10 M/5 M/2.5 Mbps do not permit it — SH-080016 §7.6.2 p.7-12.

## 4. Switch settings

Two rotary switch groups on the module front — SH-080016 §7.3 p.7-5 and p.7-6:

| Switch | Content | Value |
| --- | --- | --- |
| `STATION NO. ×10` | Tens digit of the station number | 0–6 |
| `STATION NO. ×1` | Units digit of the station number | 0–9 |
| `MODE` | Rate + operating mode | `0`–`F` |

Station number: master = `00`; local/standby master = 1–64; a value outside 0–64 turns the `ERR.` LED on — SH-080016 §7.3 p.7-5.

`MODE` — SH-080016 §7.3 p.7-6:

| Code | Rate | Mode |
| --- | --- | --- |
| `0` | 156 kbps | Online |
| `1` | 625 kbps | Online |
| `2` | 2.5 Mbps | Online |
| `3` | 5 Mbps | Online |
| `4` | 10 Mbps | Online |
| `5` | 156 kbps | Line test |
| `6` | 625 kbps | Line test |
| `7` | 2.5 Mbps | Line test |
| `8` | 5 Mbps | Line test |
| `9` | 10 Mbps | Line test |
| `A` | 156 kbps | Hardware test |
| `B` | 625 kbps | Hardware test |
| `C` | 2.5 Mbps | Hardware test |
| `D` | 5 Mbps | Hardware test |
| `E` | 10 Mbps | Hardware test |
| `F` | — | Not allowed |

Settings take effect only after the module power is cycled OFF→ON or the CPU is reset — SH-080016 §7.3 POINT p.7-6.

LEDs: `RUN`, `ERR.`, `MST`, `S MST`, `L RUN`, `L ERR.`, `SD`, `RD` — SH-080016 §7.3 p.7-5. `L ERR.` flashing at fixed intervals = a switch was changed while powered; flashing at inconsistent intervals = missing terminating resistor or noise.

## 5. Quick LED diagnosis

| Symptom | Usual cause | Source |
| --- | --- | --- |
| `ERR.` on | Wrong switch setting, more than one master, bad parameters, broken cable | SH-080016 §7.3 p.7-5 |
| `ERR.` flashing | A station has a communication error | SH-080016 §7.3 p.7-5 |
| `L ERR.` flashing at inconsistent intervals | Missing terminating resistor or cable noise | SH-080016 §7.3 p.7-5 |
| `L RUN` off | Data link not running | SH-080016 §7.3 p.7-5 |

## 6. Checklist

- [ ] Terminating resistors at **both ends**, between `DA` and `DB` — SH-080016 §7.5 (2) p.7-9.
- [ ] Resistor value matches the cable: 110 Ω or 130 Ω — SH-080016 §7.5 (3) p.7-9.
- [ ] The two cable types are not mixed on one line — SH-080016 §7.5 IMPORTANT p.7-9.
- [ ] `SLD` connected to the shield at every module; `FG` grounded at both ends — SH-080016 §7.5 POINT p.7-9.
- [ ] No star wiring; daisy-chain only (T-branch at 156/625 kbps) — SH-080016 §7.5 (5) p.7-9.
- [ ] Unique station numbers, master set to `00` — SH-080016 §7.3 p.7-5.
- [ ] Rate matches the actual cable length, and every station uses the same rate — SH-080016 §3.1.2 p.3-4.
- [ ] Hardware test run on each module before assembling the line — SH-080016 §7.4 p.7-7.

## 7. Read next

- Network parameters, auto refresh and sample programs: SH-080016 chapters 6 and 9–11.
- Error codes and CC-Link diagnostics: SH-080016 chapter 13.
- Other modules in the Q family: [MELSEC Q](/en/q/).
