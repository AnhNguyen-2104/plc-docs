---
title: QX40 and QY40P digital I/O modules
family: q
module: q-series
status: draft
source: SH-080042, SH-080483
---

# QX40 and QY40P digital I/O modules

QX40 and QY40P are a 16-point digital pair mounted on a MELSEC Q base. QX40 sinks 24 VDC inputs with positive common, while QY40P drives 12–24 VDC loads with sink-type transistors. Both occupy 16 I/O points on the base and terminate on an 18-point terminal block.

## 1. QX40 pin layout

<ModuleBlockDiagram
  model="QX40"
  role="16-point 24 VDC input, positive common"
  connector="18-point terminal block"
  :width-pins="18"
  :inputs="[
    { signal: 'X0', pin: 'TB1', device: 'Switch / sensor 1' },
    { signal: 'X1', pin: 'TB2', device: 'Switch / sensor 2' },
    { signal: 'X2', pin: 'TB3', device: 'Switch / sensor 3' },
    { signal: 'X3', pin: 'TB4', device: 'Switch / sensor 4' },
    { signal: 'X4', pin: 'TB5', device: 'Switch / sensor 5' },
    { signal: 'X5', pin: 'TB6', device: 'Switch / sensor 6' },
    { signal: 'X6', pin: 'TB7', device: 'Switch / sensor 7' },
    { signal: 'X7', pin: 'TB8', device: 'Switch / sensor 8' },
    { signal: 'X8', pin: 'TB9', device: 'Switch / sensor 9' },
    { signal: 'X9', pin: 'TB10', device: 'Switch / sensor 10' },
    { signal: 'XA', pin: 'TB11', device: 'Switch / sensor 11' },
    { signal: 'XB', pin: 'TB12', device: 'Switch / sensor 12' },
    { signal: 'XC', pin: 'TB13', device: 'Switch / sensor 13' },
    { signal: 'XD', pin: 'TB14', device: 'Switch / sensor 14' },
    { signal: 'XE', pin: 'TB15', device: 'Switch / sensor 15' },
    { signal: 'XF', pin: 'TB16', device: 'Switch / sensor 16' },
    { signal: 'COM', pin: 'TB17', device: '+24 V supply (common)' }
  ]"
  :outputs="[]"
/>

The QX40 terminal block runs TB1–TB16 for X0–XF, TB17 is `COM` shared by all 16 points, and TB18 is vacant. MELSEC Q numbers X/Y devices in hexadecimal, so XA follows X9 and the last point of a 16-point module is XF.

| Terminal | Signal | Function | Source |
| --- | --- | --- | --- |
| TB1–TB8 | X0–X7 | First eight input points | SH-080042 §2.4 p.2-4 |
| TB9–TB16 | X8–XF | Remaining eight input points | SH-080042 §2.4 p.2-4 |
| TB17 | COM | Common for all 16 points (positive side) | SH-080042 §2.4 p.2-4 |
| TB18 | — | Vacant | SH-080042 §2.4 p.2-4 |

Because it is a positive common module, `COM` is tied to **+24 V** and each switch connects its X point to **0 V**; reversing the polarity will not turn the input on. The circuit drawings are on the [I/O wiring](/en/q/system/io-wiring) page.

## 2. QX40 specifications

| Item | Value | Source |
| --- | --- | --- |
| Number of input points | 16 points | SH-080042 §2.4 p.2-4 |
| Rated input voltage | 24 VDC (+20/−15 %, ripple ≤ 5 %) | SH-080042 §2.4 p.2-4 |
| Rated input current | approx. 4 mA | SH-080042 §2.4 p.2-4 |
| ON voltage / current | ≥ 19 V / ≥ 3 mA | SH-080042 §2.4 p.2-4 |
| OFF voltage / current | ≤ 11 V / ≤ 1.7 mA | SH-080042 §2.4 p.2-4 |
| Input impedance | approx. 5.6 kΩ | SH-080042 §2.4 p.2-4 |
| Response time | 1/5/10/20/70 ms, set in PLC parameters (default 10 ms) | SH-080042 §2.4 p.2-4 |
| Isolation | Photocoupler | SH-080042 §2.4 p.2-4 |
| Occupied I/O points | 16 points (16-point input assignment) | SH-080042 §2.4 p.2-4 |
| 5 VDC current consumption | 50 mA (TYP., all points ON) | SH-080042 §2.4 p.2-4 |

## 3. QY40P pin layout

<ModuleBlockDiagram
  model="QY40P"
  role="16-point transistor output, sink type"
  connector="18-point terminal block"
  :width-pins="18"
  :inputs="[
    { signal: '12/24 VDC', pin: 'TB17', device: 'Load supply +' },
    { signal: 'COM', pin: 'TB18', device: 'Common 0 V' }
  ]"
  :outputs="[
    { signal: 'Y0', pin: 'TB1', device: 'Relay / valve / lamp 1' },
    { signal: 'Y1', pin: 'TB2', device: 'Relay / valve / lamp 2' },
    { signal: 'Y2', pin: 'TB3', device: 'Relay / valve / lamp 3' },
    { signal: 'Y3', pin: 'TB4', device: 'Relay / valve / lamp 4' },
    { signal: 'Y4', pin: 'TB5', device: 'Relay / valve / lamp 5' },
    { signal: 'Y5', pin: 'TB6', device: 'Relay / valve / lamp 6' },
    { signal: 'Y6', pin: 'TB7', device: 'Relay / valve / lamp 7' },
    { signal: 'Y7', pin: 'TB8', device: 'Relay / valve / lamp 8' },
    { signal: 'Y8', pin: 'TB9', device: 'Relay / valve / lamp 9' },
    { signal: 'Y9', pin: 'TB10', device: 'Relay / valve / lamp 10' },
    { signal: 'YA', pin: 'TB11', device: 'Relay / valve / lamp 11' },
    { signal: 'YB', pin: 'TB12', device: 'Relay / valve / lamp 12' },
    { signal: 'YC', pin: 'TB13', device: 'Relay / valve / lamp 13' },
    { signal: 'YD', pin: 'TB14', device: 'Relay / valve / lamp 14' },
    { signal: 'YE', pin: 'TB15', device: 'Relay / valve / lamp 15' },
    { signal: 'YF', pin: 'TB16', device: 'Relay / valve / lamp 16' }
  ]"
/>

| Terminal | Signal | Function | Source |
| --- | --- | --- | --- |
| TB1–TB16 | Y0–YF | 16 transistor output points | SH-080042 §3.5 p.3-7 |
| TB17 | 12/24 VDC | Output-stage supply | SH-080042 §3.5 p.3-7 |
| TB18 | COM | Common (0 V) for all 16 points | SH-080042 §3.5 p.3-7 |

QY40P groups all 16 points on a single `COM` (TB18); it has no `COM0`/`COM1` split like some 32/64-point modules. For a sink output, the load sits between `+12/24 V` (TB17) and the Y point, and `COM` returns to 0 V.

## 4. QY40P specifications

| Item | Value | Source |
| --- | --- | --- |
| Number of output points | 16 points | SH-080042 §3.5 p.3-7 |
| Rated load voltage | 12–24 VDC (+20/−15 %) | SH-080042 §3.5 p.3-7 |
| Maximum load current | 0.1 A/point, 1.6 A/common | SH-080042 §3.5 p.3-7 |
| Maximum inrush current | 0.7 A for 10 ms | SH-080042 §3.5 p.3-7 |
| Leakage current at OFF | ≤ 0.1 mA | SH-080042 §3.5 p.3-7 |
| Voltage drop at ON | 0.1 V (TYP.) at 0.1 A; 0.2 V (MAX.) at 0.1 A | SH-080042 §3.5 p.3-7 |
| Response time | ≤ 1 ms (OFF→ON and ON→OFF, resistive load) | SH-080042 §3.5 p.3-7 |
| Protection | Overload and overheat | SH-080042 §3.5 p.3-7 |
| Occupied I/O points | 16 points (16-point output assignment) | SH-080042 §3.5 p.3-7 |
| 5 VDC current consumption | 65 mA (TYP., all points ON) | SH-080042 §3.5 p.3-7 |

The 0.1 mA leakage figure matters with small loads: it can hold a low-power 24 V relay from releasing promptly or at all, so check it against the load manufacturer's release current.

## 5. Sources

- QX40: <SourceRef doc="sh080042" page="2.4" />, which also contains the terminal block table.
- QY40P: <SourceRef doc="sh080042" page="3.5" />.
- Slot position, system current budget and base limits: <SourceRef doc="sh080483" page="8.3" />.

The actual wiring circuits (switches, loads, flyback diodes) are on the [I/O wiring](/en/q/system/io-wiring) page.
