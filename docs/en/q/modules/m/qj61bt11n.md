---
title: "QJ61BT11N — Network module"
family: q
module: module-qj61bt11n
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
  { signal: '110 ohm', pin: 'DA–DB', device: 'Terminating resistor at the two end stations' }
]
</script>

<ModulePage id="qj61bt11n" />

## 1. Signal groups to wire

QJ61BT11N is a CC-Link master/local module on an RS-485 bus. The signal groups to wire are:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Bus cable | DA, DB | bidirectional | Dedicated CC-Link cable; DA blue, DB white (SH-080016 §7.3 p.7-6) |
| Signal ground | DG | — | Yellow wire (SH-080016 §7.3 p.7-6) |
| Shield | SLD | — | Cable shield, tied to FG inside the module (SH-080016 §7.3 p.7-6) |
| Frame ground | (FG) | — | D-class grounding at both line ends (SH-080016 §7.5 p.7-9) |
| Terminating resistor | 110 ohm / 130 ohm | — | Between DA and DB at both ends (SH-080016 §7.5 p.7-9) |

### Specifications

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

### Line length

| Speed | Maximum overall length | Station-to-station length |
| --- | --- | --- |
| 156 kbps | 1200 m | — |
| 625 kbps | 900 m | — |
| 2.5 Mbps | 400 m | — |
| 5 Mbps | 160 m | — |
| 10 Mbps | 100 m | ≥ 20 cm |

### Terminals

| Terminal | Function |
| --- | --- |
| `NC` | Not used |
| `DA` | CC-Link signal wire A (blue) |
| `DB` | CC-Link signal wire B (white) |
| `NC` | Not used |
| `SLD` | Shield (yellow) |
| `DG` | Signal ground |
| `(FG)` | Frame ground |

## 2. Wiring principles

- **Connection type:** CC-Link terminal block — DA/DB/SLD/DG/FG for the CC-Link line (SH-080016 §7.3, p. 7-4).
- Wire daisy-chain through every station; star wiring is not allowed (SH-080016 §7.5 (5) p.7-9).
- Fit terminating resistors at both ends of the line, between DA and DB (SH-080016 §7.5 (2) p.7-9).
- Value depends on cable: 110 ohm for CC-Link dedicated/Ver.1.10, 130 ohm for dedicated high-performance (SH-080016 §7.5 (3) p.7-9).
- Do not mix cable types on one line; connect the shield to SLD at every module and ground both ends through FG with D-class grounding.
- T-branching is allowed only at 156/625 kbps (SH-080016 §7.6.2 p.7-12).

### Switch settings

| Switch | Content | Value |
| --- | --- | --- |
| `STATION NO. x10` | Tens digit of the station number | 0–6 |
| `STATION NO. x1` | Units digit of the station number | 0–9 |
| `MODE` | Rate + operating mode | `0`–`F` |

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

## 3. Reference diagram

- QJ61BT11N is the CC-Link reference. [QJ71C24N](/en/q/modules/m/qj71c24n) is RS-232/422 serial; its DA/DB terminals and CC-Link termination do not apply.
- [QJ71E71-100](/en/q/modules/m/qj71e71-100) is Ethernet and does not apply to the RS-485 bus.
- Only one master is allowed per line; the master may sit in the middle of the line.

## 4. Manufacturer input/output circuits

The manufacturer module face, terminal block and bus wiring figures:

<ManualFigure
  src="/img/manual/cclink-module.webp"
  alt="QJ61BT11 module front: LEDs, station number switches, MODE switch and terminal block"
  caption="QJ61BT11 module front: LEDs, station switches, MODE and terminal block — CC-Link terminal block"
  doc="SH-080016"
  section="§7.3"
  page="7-4"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080016/sh080016e.pdf"
/>

<ManualFigure
  src="/img/manual/cclink-terminal.webp"
  alt="CC-Link terminal block: NC, DA, DB, NC, SLD, DG, FG"
  caption="CC-Link terminal block: NC–DA–DB–NC–SLD–DG–FG — CC-Link terminal block"
  doc="SH-080016"
  section="§7.3"
  page="7-6"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080016/sh080016e.pdf"
/>

<ManualFigure
  src="/img/manual/cclink-wiring.webp"
  alt="CC-Link bus wiring: master in the middle, remote stations at both ends, terminating resistors"
  caption="CC-Link bus wiring: master in the middle, resistors at both ends — CC-Link terminal block"
  doc="SH-080016"
  section="§7.5"
  page="7-9"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080016/sh080016e.pdf"
/>

Source: <SourceRef doc="sh080016" page="7.3" />.

## 5. External device connections

- External devices are remote I/O, remote device or local stations on the same CC-Link line.
- Use dedicated CC-Link cable; do not use ordinary cable or mix cable types.
- Fit 110 ohm or 130 ohm terminating resistors at the two end stations, never in the middle.
- The rate must match the actual line length, and every station must use the same rate.

### LED diagnosis

| Symptom | Usual cause | Source |
| --- | --- | --- |
| `ERR.` on | Wrong switch setting, more than one master, bad parameters, broken cable | SH-080016 §7.3 p.7-5 |
| `ERR.` flashing | A station has a communication error | SH-080016 §7.3 p.7-5 |
| `L ERR.` flashing at inconsistent intervals | Missing terminating resistor or cable noise | SH-080016 §7.3 p.7-5 |
| `L RUN` off | Data link not running | SH-080016 §7.3 p.7-5 |

## 6. Checklist before power-up

- [ ] Terminating resistors at both ends, between DA and DB.
- [ ] Resistor value matches the cable: 110 ohm or 130 ohm.
- [ ] The two cable types are not mixed on one line.
- [ ] SLD connected to the shield at every module; FG grounded at both ends.
- [ ] No star wiring; daisy-chain only, or T-branch at 156/625 kbps.
- [ ] Station numbers are unique; master set to 00.
- [ ] Rate matches the actual line length.
- [ ] Hardware test run on each module before assembling the line.
