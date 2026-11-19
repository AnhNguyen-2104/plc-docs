---
title: QJ71E71-100 — Ethernet module
family: q
module: q-series
status: draft
source: SH-080009
---

<script setup>
const ethInputs = [
  { signal: 'RD', pin: 'RJ45 (receive pair)', device: 'Receive data' },
  { signal: 'SD', pin: 'RJ45 (transmit pair)', device: 'Transmit data' },
  { signal: '100M', pin: 'LED 100M', device: 'ON = 100 Mbps, OFF = 10 Mbps or no cable' }
]
const ethOutputs = [
  { signal: 'RUN', pin: 'LED', device: 'Module operating normally' },
  { signal: 'INIT.', pin: 'LED', device: 'Initial process completed' },
  { signal: 'OPEN', pin: 'LED', device: 'At least one connection open' },
  { signal: 'ERR.', pin: 'LED', device: 'Incorrect setting' },
  { signal: 'COM.ERR.', pin: 'LED', device: 'Communication error' }
]
</script>

# QJ71E71-100 — Ethernet module

The QJ71E71-100 is an Ethernet module mounted on the MELSEC Q base, communicating with PCs, HMIs, other Ethernet modules or external devices through an RJ45 port. The module holds 16 logical connections and fixed buffers in its buffer memory.

This page covers specifications, wiring, IP/port settings and the open/close/send/receive instructions. Frame-level MC protocol details are in SH-080008AB.

## 1. Specifications

| Item | Value | Source |
| --- | --- | --- |
| Transmission standard | 100BASE-TX / 10BASE-T | SH-080009 §3.2 p.29 |
| Speed | 100 Mbps (full/half duplex), 10 Mbps (full/half duplex) | SH-080009 §3.2 p.29 |
| Interface | RJ45, fixed MDI | SH-080009 §3.2 p.29 |
| Maximum segment length | 100 m (hub to node) | SH-080009 §3.2 p.29 |
| Simultaneous open connections | 16 (usable in a program) | SH-080009 §3.2 p.29 |
| Fixed buffer | 1K word × 16 | SH-080009 §3.2 p.29 |
| Random access buffer | 6K words × 1 | SH-080009 §3.2 p.29 |
| E-mail | Attachment 6K words × 1; main text 960 words × 1 | SH-080009 §3.2 p.32 |
| Occupied I/O points | 32 points (I/O assignment: Intelligent 32 points) | SH-080009 §3.2 p.29 |
| Internal 5 VDC current | 0.50 A | SH-080009 §3.2 p.29 |

Physical layer: straight-through cable to a hub/switch; connecting a PC directly to the module needs a crossover cable or an auto-MDI port, because the interface is fixed to MDI — SH-080009 §3.2 p.29.

The manufacturer's network configuration example: own station, another station, router and the Internet:

<ManualFigure
  src="/img/manual/ethernet-config.jpg"
  alt="Ethernet network configuration: QJ71E71-100 station, another station, router and Internet"
  caption="Ethernet network configuration with the E71 — official figure SH-080009 §1"
  doc="SH-080009"
  section="§1"
  page="20"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080009/sh080009y.pdf"
/>

## 2. Module appearance and LEDs

The manufacturer's module front, RJ45 port and LED locations:

<ManualFigure
  src="/img/manual/ethernet-module.jpg"
  alt="QJ71E71-100 module front: LEDs, RJ45 port, 10BASE5/10BASE2 ports and serial number plate"
  caption="QJ71E71-100 module front: LEDs and ports — official figure SH-080009 §2"
  doc="SH-080009"
  section="§2"
  page="27"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080009/sh080009y.pdf"
/>

LEDs on the module front — SH-080009 §2 p.27. There is no LED named `LINK`; the speed LED is `100M`.

| LED | Meaning |
| --- | --- |
| `RUN` | ON: normal operation; OFF: an error has occurred |
| `INIT.` | ON: initial process completed; OFF: not processed |
| `OPEN` | ON: at least one connection is open |
| `SD` | Flashing: data being sent |
| `ERR.` | ON: incorrect setting |
| `COM.ERR.` | ON: communication error; does not turn off when the cause is removed |
| `RD` | ON: data being received |
| `100M` | ON: 100 Mbps; OFF: 10 Mbps or no cable |

The `INIT.`, `OPEN`, `ERR.` and `COM.ERR.` states can be read from buffer memory `C8H` (bits b0, b1, b3, b4) — SH-080009 §3.5.2 p.43.

## 3. IP address and ports

Basic setting — SH-080009 §7.1.2 p.86:

| Item | Range |
| --- | --- |
| Network Type | Ethernet |
| Start I/O No. | within the CPU module's I/O points |
| Network No. | 1–239 |
| Group No. | 0–32 |
| Station No. | 1–64 |
| Mode | Online / Offline / Self-Loopback Test / H/W Test |

Operation setting — SH-080009 §7.1.3 p.87:

| Item | Value |
| --- | --- |
| Communication Data Code | Binary / ASCII |
| Initial Timing | Do not wait for OPEN / Always wait for OPEN |
| IP Address (own station) | `0H`–`FFFFFFFFH`, DEC or HEX input |
| Send Frame Setting | Ethernet (V2.0) / IEEE802.3 |
| Enable Online Change | Allow or block data writes over MC protocol while the CPU is in RUN |
| TCP Existence Confirmation | Use the KeepAlive / Use the Ping |

Open setting per connection — SH-080009 §7.1.4 p.89:

| Item | Value |
| --- | --- |
| Protocol | TCP / UDP |
| Open System | Active / Unpassive / Fullpassive / MELSOFT Connection |
| Fixed Buffer | Send / Receive |
| Fixed Buffer Communication | Procedure Exist / No Procedure / Predefined protocol |
| Pairing Open | Disable / Enable |
| Existence Confirmation | No Confirm / Confirm |
| Host Station Port No. | `401H`–`1387H`, `138BH`–`FFFEH` |
| Destination IP Address | `0H`–`FFFFFFFFH` |
| Destination Port No. | `1H`–`FFFFH` |

The station IP must share class and subnet with the connected device; for class B the default subnet mask is 255.255.0.0 — SH-080009 §7.1.3 (2) p.88.

## 4. Buffers and status registers

| Address | Content | Source |
| --- | --- | --- |
| `5000H` | Open completion signal, bits b0–b15 = connections 1–16 | SH-080009 §3.5.2 p.50 |
| `5005H` | Fixed buffer reception status signal, bits b0–b15 | SH-080009 §3.5.2 p.50 |
| `680H` | Fixed buffer No.1 — data length | SH-080009 §3.5.2 p.49 |
| `681H`–`A7FH` | Fixed buffer No.1 — data | SH-080009 §3.5.2 p.49 |
| `78H` | Connection No.1 — own station port | SH-080009 §3.5.2 p.42 |
| `79H`–`7AH` | Connection No.1 — destination IP | SH-080009 §3.5.2 p.42 |
| `7BH` | Connection No.1 — destination port | SH-080009 §3.5.2 p.42 |

Each following fixed buffer occupies 1024 words: No.2 starts at `A80H`, No.3 at `E80H`, … No.16 at `7C00H` — SH-080009 §3.5.2 p.49 and p.62.

## 5. Open/close/send/receive instructions

Dedicated instruction list for the QJ71E71-100 — SH-080009 §15.1 p.238:

| Instruction | Function | Page |
| --- | --- | --- |
| `OPEN` | Open a connection to the connected device | §15.5 p.243 |
| `CLOSE` | Close a connection | §15.6 p.247 |
| `BUFSND` | Send data through a fixed buffer | §15.8 p.261 |
| `BUFRCV` | Read received fixed-buffer data (main program) | §15.9 p.265 |
| `BUFRCVS` | Read received fixed-buffer data (interrupt program) | §15.10 p.269 |
| `ERRCLR` | Clear LEDs/error information | §15.11 p.272 |
| `ERRRD` | Read error information | §15.12 p.275 |
| `UINI` | Re-initialise the module | §15.13 p.279 |

`SEND`/`RECV` are **not** QJ71E71-100 instructions: they are data link instructions of network modules (MELSECNET/H, CC-Link IE). In SH-080009 they appear only in the redundant-system context — §14.7.4 p.234 — while Ethernet send/receive uses `BUFSND`/`BUFRCV`. `SEND`/`RECV` detail for network modules is **not verified** in this document.

`OPEN` control data — SH-080009 §15.5 (2) p.244:

| Position | Content |
| --- | --- |
| `(S2)+0` | `0000H` use programming-tool parameters; `8000H` use control data from `(S2)+2` |
| `(S2)+1` | Completion status (written by the system) |
| `(S2)+2` | Usage setting (fixed buffer send/receive, TCP/UDP, open system) |
| `(S2)+3` | Own station port |
| `(S2)+4`, `(S2)+5` | Destination IP |
| `(S2)+6` | Destination port |
| `(S2)+7`–`(S2)+9` | Destination MAC |

Operands: `Un` (start I/O number), `(S1)` connection number 1–16, `(S2)` control data, `(D1)` completion flag — SH-080009 §15.5 (1) p.243.

`BUFSND` takes `(S1)` = connection number 1–16, `(S2)` = control data, `(S3)` = send data; `(S3)+0` is the data length (1–1017 words for binary with procedure, 1–508 words for ASCII, 1–2046 bytes for no procedure) — SH-080009 §15.8 p.261–262.

`BUFRCV` takes `(S1)` connection number, `(S2)` control data, `(D1)` receive-data area, `(D2)` completion flag — SH-080009 §15.9 p.265.

Example sequence:

```il
(* Open connection 1 with the configured parameters: Un, connection, control data, completion flag *)
LD   M8000
ZP.OPEN "U0"  K1  D100  M200

(* Wait for initial and open completion *)
LD   X19                 (* Initial normal completion *)
AND  U0\G5000.0          (* Open completion, connection 1 *)
OUT  M210

(* Send data through the fixed buffer of connection 1 *)
LD   M210
BUFSND U0  K1  D300  D400  M220

(* Receive: wait for data, then read *)
LD   U0\G5005.0
BUFRCV U0  K1  D500  D600  M230
```

Devices M/D/X/Y in the example are illustrative. `X19` is the initial normal completion signal and `X18` the open abnormal detection signal — SH-080009 §12.4 p.146. Always check operand order against §15.5–§15.9 before use.

## 6. MC protocol note

The QJ71E71-100 is one of the modules supported by the MC protocol. Message formats for the Ethernet module are in SH-080008AB chapter 5 "Messages of Ethernet Interface Module" (§5.2 p.41): header, subheader, request/response data length and monitoring timer.

When an external device sends MC protocol commands to the module, match:

- Communication Data Code (Binary/ASCII) in operation setting — SH-080009 §7.1.3 p.87.
- Frame (1E/3E/4E) supported by the external device — SH-080008AB chapter 5.
- Write-during-RUN permission if data must change while the CPU is in RUN — SH-080009 §7.1.3 p.87.

## 7. Checklist

- [ ] No IP conflict on the same subnet; enable the IP address in use detection function — SH-080009 §14.6 p.214.
- [ ] Module IP shares class/subnet with the HMI/PC; subnet mask matches — SH-080009 §7.1.3 (2) p.88.
- [ ] Straight-through cable to a hub/switch; direct PC–module connection uses a crossover cable or auto-MDI port (fixed MDI interface) — SH-080009 §3.2 p.29.
- [ ] KeepAlive or Ping configured for the TCP connection — SH-080009 §7.1.3 p.87 and §14.8 p.236.
- [ ] Own port outside the reserved `1388H`–`138AH` range — SH-080009 §7.1.4 p.89.
- [ ] `INIT.` ON before opening; `OPEN` ON after opening — SH-080009 §2 p.27.
- [ ] `SD`/`RD` LEDs checked during send/receive — SH-080009 §16.4.3–§16.4.4 p.289.

## 8. Read next

- MC protocol frames and commands: `sh080008ab_MC-Protocol-Reference.pdf`, chapter 5.
- Extended settings, e-mail and router relay: the QJ71E71 Application manual.
- Other modules in the Q family: [MELSEC Q](/en/q/).
