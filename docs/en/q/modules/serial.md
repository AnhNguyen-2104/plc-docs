---
title: QJ71C24N — serial communication module
family: q
module: q-series
status: draft
source: SH-080007
---

<script setup>
const ch2Inputs = [
  { signal: 'SDA', pin: 'SDA', device: 'Transmit data A (4-wire) — pair with SDB' },
  { signal: 'SDB', pin: 'SDB', device: 'Transmit data B (4-wire) — pair with SDA' },
  { signal: 'RDA', pin: 'RDA', device: 'Receive data A (4-wire) — pair with RDB' },
  { signal: 'RDB', pin: 'RDB', device: 'Receive data B (4-wire) — pair with RDA' }
]
const ch2Outputs = [
  { signal: 'SG', pin: 'SG', device: 'Signal ground' },
  { signal: 'FG', pin: '(FG)', device: 'Frame ground; connected to SLD inside the module' }
]
</script>

# QJ71C24N — serial communication module

The QJ71C24N is a serial communication module mounted on the MELSEC Q base, exchanging data with external devices over two independent channels. The module keeps transmit/receive buffers in its buffer memory; the CPU accesses them with `FROM`/`TO`, with the `OUTPUT`/`INPUT` dedicated instructions, or lets the module handle the MC protocol itself.

This page covers the hardware side: model variants, signal pins, switch settings, buffer memory access and a wiring checklist. Detailed protocol content is in SH-080007.

## 1. Model variants

| Model | CH1 | CH2 | Notes |
| --- | --- | --- | --- |
| QJ71C24N | RS-232 (9-pin D-sub) | RS-422/485 (2-piece terminal block) | Base model, one channel of each type |
| QJ71C24N-R2 | RS-232 (9-pin D-sub) | RS-232 (9-pin D-sub) | Two RS-232 channels |
| QJ71C24N-R4 | RS-422/485 (2-piece plug-in block) | RS-422/485 (2-piece plug-in block) | Two RS-422/485 channels |

Channel assignment and interface types per SH-080006 §3.1 p.3-1. Maximum transmission distance: RS-232 **15 m**, RS-422/485 **1200 m** (overall cable length) — SH-080006 §3.1 p.3-2.

The plug-in block of the -R4 version requires 7 mm of stripped insulation and the supplied plate terminals for the braided shield; the QJ71C24N uses an M3 screw terminal block — SH-080006 §4.4 (3) p.4-5.

## 2. CH1 RS-232 pins (D-sub 9)

The manufacturer's D-sub 9 pin layout on the module side:

<ManualFigure
  src="/img/manual/serial-dsub9.jpg"
  alt="QJ71C24N D-sub 9 pin layout: CD, RD, SD, ER, SG, DR, RS, CS, CI"
  caption="D-sub 9 pin layout (CH1 RS-232) — official figure SH-080006 §3.2.1"
  doc="SH-080006"
  section="§3.2.1"
  page="3-3"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080006/sh080006w.pdf"
/>

The connector is a 9-pin D-sub **female**, screw type, M2.6 thread — SH-080006 §3.2.1 (3) p.3-4.

| Pin | Signal | Full name | Direction (module side) | Function |
| --- | --- | --- | --- | --- |
| 1 | `CD` | CD(DCD) | in | Carrier detect; can be ignored via the CD terminal check setting |
| 2 | `RD` | RD(RXD) | in | Receive data |
| 3 | `SD` | SD(TXD) | out | Transmit data |
| 4 | `ER` | ER(DTR) | out | Ready to receive (when DTR/DSR control is used) |
| 5 | `SG` | SG | — | Signal ground |
| 6 | `DR` | DR(DSR) | in | External device ready; the module does not transmit while this signal is OFF |
| 7 | `RS` | RS(RTS) | out | Request to send |
| 8 | `CS` | CS(CTS) | in | Clear to send; the module does not transmit while this signal is OFF |
| 9 | `CI` | CI(RI) | in | Modem ring indicator, connected only when a modem is used |

Pin numbers and signal descriptions per SH-080006 §3.2.1 (1) p.3-3 to p.3-4. The ON/OFF state of `ER`, `DR`, `RS` and `CD` can be read from buffer memory address `254H` (CH1) / `264H` (CH2) — SH-080006 §3.2.1 Remarks p.3-5.

For half-duplex operation, `RS` is connected to one of the external device's `CS`/`DR`/`CD` signals and `CD` to its `RS`/`ER` signal — SH-080007 §8.4 p.218.

## 3. CH2 RS-422/485 terminal block

| Terminal | Signal | 4-wire | 2-wire (RS-485) |
| --- | --- | --- | --- |
| `SDA` | Transmit data A | to external `RDA` | tied to `RDA`, runs on wire A |
| `SDB` | Transmit data B | to external `RDB` | tied to `RDB`, runs on wire B |
| `RDA` | Receive data A | to external `SDA` | tied to `SDA` |
| `RDB` | Receive data B | to external `SDB` | tied to `SDB` |
| `SG` | Signal ground | to external `SG` | to external `SG` |
| `(FG)` | Frame ground | per panel rules | per panel rules |

Terminal layout and the `nnA`/`nnB` pairing rule per SH-080006 §4.4.2 (1) p.4-8. With 2-wire RS-485, the -R4 echo-back function can be enabled or disabled so the module does not receive data it has just transmitted — SH-080006 §3.3.4 p.3-12. Tying `SDA`+`RDA` and `SDB`+`RDB` is inferred from the echo-back function and the terminal diagram; the 2-wire connection drawing itself is a raster figure in the manual and was not readable as text, so it is **not verified**.

The 1:1 four-wire RS-422 connection between the module and an external device, with the terminating resistor:

<ManualFigure
  src="/img/manual/serial-rs485-4wire.jpg"
  alt="Four-wire RS-422/485 connection: SDA, SDB, RDA, RDB, SG, FG and terminating resistor R"
  caption="1:1 four-wire RS-422/485 connection — official figure SH-080006 §4.4.2"
  doc="SH-080006"
  section="§4.4.2"
  page="4-10"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080006/sh080006w.pdf"
/>

Terminating resistors supplied with the module:

| Transmission type | Resistor | Rating | Fitted at |
| --- | --- | --- | --- |
| RS-422 | 330 Ω | 1/4 W | The two stations at both ends of the circuit |
| RS-485 | 110 Ω | 1/2 W | The two stations at both ends of the circuit |

SH-080006 §4.4.2 (1)(c) p.4-9. Do not fit resistors at intermediate stations; if the far end is an RS-232/RS-422 converter, the resistor must be fitted at the converter — same section, POINT p.4-10.

How to tell the 330 Ω / 110 Ω terminating resistors apart and insert them the right way:

<ManualFigure
  src="/img/manual/serial-termination.jpg"
  alt="330 Ω and 110 Ω terminating resistors with colour codes and correct insertion"
  caption="Terminating resistors 330 Ω/110 Ω and correct insertion — official figure SH-080006 §4.4.2"
  doc="SH-080006"
  section="§4.4.2"
  page="4-9"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080006/sh080006w.pdf"
/>

## 4. Switch settings

Configured through PLC parameters (I/O assignment → Switch setting), with 5 switches — SH-080006 §4.5.2 p.4-14.

| Switch | Content | Value |
| --- | --- | --- |
| 1 | CH1: b8–b15 rate, b0–b7 transmission format | see table below |
| 2 | CH1 protocol | `0H`–`9H` |
| 3 | CH2: b8–b15 rate, b0–b7 transmission format | see table below |
| 4 | CH2 protocol | `0H`–`9H` |
| 5 | Station number | `0`–`31` (`0H`–`1FH`) |

Transmission format bits (b0–b7) — SH-080006 §4.5.2 (1)(a) p.4-15:

| Bit | Meaning | OFF (0) | ON (1) |
| --- | --- | --- | --- |
| b0 | Operation setting | Independent | Linked (CH2 only) |
| b1 | Data bits | 7 | 8 |
| b2 | Parity bit | No | Yes |
| b3 | Even/odd parity | Odd | Even |
| b4 | Stop bit | 1 | 2 |
| b5 | Sum check code | No | Yes |
| b6 | Write during RUN | Prohibited | Allowed |
| b7 | Setting modifications | Prohibited | Allowed |

Transmission rate code (b8–b15) — SH-080006 §4.5.2 (1)(b) p.4-17:

| Code | bps | Code | bps |
| --- | --- | --- | --- |
| `00H` | 300 | `07H` | 19200 |
| `01H` | 600 | `08H` | 28800 |
| `02H` | 1200 | `09H` | 38400 |
| `03H` | 2400 | `0AH` | 57600 |
| `04H` | 4800 | `0BH` | 115200 |
| `05H` | 9600 | `0CH` | 230400 (CH1 of -N/-R2/-R4 only) |
| `06H` | 14400 | `0FH` | 50 |

Protocol code — SH-080006 §4.5.2 (1)(c) p.4-17:

| Code | Protocol |
| --- | --- |
| `0H` | GX Developer connection |
| `1H`–`5H` | MC protocol format 1–5 |
| `6H` | Non procedure protocol |
| `7H` | Bidirectional protocol |
| `8H` | CH1–CH2 linked operation |
| `9H` | Pre-defined protocol |
| `EH` | ROM/RAM/switch test |
| `FH` | Individual station loopback test |

The station number in switch 5 is used by the MC protocol when several modules share a line; set `0` for a 1:1 configuration — SH-080006 §4.5.2 (1)(d) p.4-18. Settings take effect only after the module power is cycled OFF→ON or the CPU is reset — SH-080006 §4.5.2 POINT p.4-14.

## 5. Buffer memory access and ladder example

Default buffer areas — SH-080006 §6.1.2 p.6-6 and §6.2.2 p.6-25:

| Area | CH1 | CH2 | First word | Notes |
| --- | --- | --- | --- | --- |
| Transmission area | `400H`–`5FFH` | `800H`–`9FFH` | `400H` / `800H` | First word = number of words to send |
| Receive area | `600H`–`7FFH` | `A00H`–`BFFH` | `600H` / `A00H` | First word = number of words received |

The start address and size of the transmit/receive areas can be changed through the setting registers: `A2H`/`142H` (transmission area head address), `A3H`/`143H` (transmission area size), `A6H`/`146H` (reception area head address), `A7H`/`147H` (reception area size) — SH-080006 §3.9 p.3-24. Never write into the system area.

CPU handshake signals (module in slot 0) — SH-080006 §3.8 p.3-20:

| Signal | Meaning |
| --- | --- |
| `X0` / `X1` | CH1 transmission completed normally / transmission error |
| `X3` / `X4` | CH1 reception data read request / reception error detected |
| `Y0` / `Y1` | CH1 transmission request / reception data read completed |
| `X1E` | Module ready (accessible) |

Example using `TO`/`FROM` for the non procedure protocol, CH1:

```il
(* Write word count and data to the CH1 transmission area: 400H = count, 401H... = data *)
LD   M8000
TO   U0\G1024  K4   K1     (* 1024 = 400H: number of words to send *)
TO   U0\G1025  D100 K4     (* 1025 = 401H: 4 data words *)

(* Transmit: turn on the CH1 transmission request, then wait for completion *)
LD   M100
OUT  Y0
LD   X0
RST  Y0

(* Receive: wait for the read request, read the count, then the data *)
LD   X3
FROM U0\G1536  D200 K1     (* 1536 = 600H: number of words received *)
FROM U0\G1537  D201 K10    (* 1537 = 601H: received data *)
OUT  Y1                    (* signal that reading is complete *)
```

`U0` assumes the module is the first on the base; change it to the actual slot. Signal functions per SH-080006 §6.1–§6.2; the word count in the first word of the transmission area per §6.2.2 p.6-25.

Dedicated instructions as an alternative to `TO`/`FROM`:

- `OUTPUT` (or `GP.OUTPUT`) sends non procedure data. Control data: `(S1)+0` channel (1/2), `(S1)+1` result, `(S1)+2` word count — SH-080006 §10.3 p.10-7.
- `G.INPUT` receives non procedure data. Control data: `(S)+0` channel, `(S)+1` result, `(S)+2` received word count, `(S)+3` allowable word count — SH-080006 §10.4 p.10-11; the instruction must run while `X3` is ON.
- `G.BIDOUT`/`G.BIDIN` for the bidirectional protocol — SH-080006 §7.2.3 p.7-19 and §7.1.3 p.7-10.

Do not use `OUTPUT` together with `ONDEMAND`/`BIDOUT`/`BIDIN`/`CPRTCL` on the same channel; this causes protocol setting error `7FF2H` — SH-080006 §10.3 (2) p.10-8.

## 6. Wiring checklist

- [ ] Terminating resistors fitted only at the **two end stations**, never at an intermediate station — SH-080006 §4.4.2 (1)(c) p.4-9.
- [ ] Resistor value matches the transmission type: 330 Ω for RS-422, 110 Ω for RS-485 — same section p.4-9.
- [ ] Shield grounded at **one end**; connect the shield between both FG terminals only if noise persists — SH-080006 §4.4 (1) p.4-5 and §4.4.2 (1)(b) p.4-8.
- [ ] `SDA`/`SDB` and `RDA`/`RDB` run as pairs, never split — SH-080006 §4.4.2 (1)(b)3) p.4-8.
- [ ] 2-wire or 4-wire matches the echo-back setting and the external device — SH-080006 §3.3.4 p.3-12.
- [ ] Station numbers are unique on the line; `0` for 1:1 — SH-080006 §4.5.2 (1)(d) p.4-18.
- [ ] Rate, data bits, parity and stop bits match at both ends — SH-080006 §4.5.2 p.4-15 to p.4-17.
- [ ] Signal cable kept at least 100 mm from power wiring — SH-080006 §4.4 (6) p.4-5.
- [ ] Loopback test run before connecting the real device — SH-080006 §4.8 p.4-31.

## 7. Read next

- MC protocol, frame formats and commands: SH-080007 (Application manual).
- Bit-level settings and error codes: SH-080006 (Basic manual).
- Other modules in the Q family: [MELSEC Q](/en/q/).
