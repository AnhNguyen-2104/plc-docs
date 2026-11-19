---
title: QD62 and QD62E high-speed counter modules
family: q
module: q-series
status: draft
source: SH-080036
---

# QD62 and QD62E high-speed counter modules

QD62 and QD62E are two-channel pulse counter modules for encoders and pulse sensors, mounted on a MELSEC Q base and occupying 16 I/O points. They differ only in the output stage: QD62 is **sink**, QD62E is **source**; counting, buffer memory and programming are identical.

## 1. Counting methods

| Mode | Description | Source |
| --- | --- | --- |
| 1-phase ×1 | Counts rising edges of phase A; direction is set by phase B or the down-count command | SH-080036 §5.1.1 p.5-1 |
| 1-phase ×2 | Counts both edges of phase A | SH-080036 §5.1.1 p.5-1 |
| CW/CCW | CW pulses on phase A count up, CCW pulses on phase B count down | SH-080036 §5.1.1 p.5-1 |
| 2-phase ×1 | One edge per A/B cycle | SH-080036 §5.1.1 p.5-1 |
| 2-phase ×2 | Two edges per A/B cycle | SH-080036 §5.1.1 p.5-1 |
| 2-phase ×4 | Four edges per A/B cycle | SH-080036 §5.1.1 p.5-1 |

The mode is chosen by switch 1 of the intelligent function module in GX Works2: values `0`…`5` are 1-phase ×1, 1-phase ×2, CW/CCW, 2-phase ×1, 2-phase ×2, 2-phase ×4 (SH-080036 §4.5).

QD62/QD62E have **no dedicated Z input**. The module exposes phase A, phase B, a preset input and a function-start input; an encoder's Z pulse must go to an ordinary digital input or through external logic into the preset input, not to a Z pin.

## 2. Terminal table (QD62/QD62E)

| CH1 terminal | CH2 terminal | Signal | Source |
| --- | --- | --- | --- |
| A20 | A13 | Phase A pulse input 24 V | SH-080036 §3.5 p.3-12 |
| B20 | B13 | Phase A pulse input 12 V | SH-080036 §3.5 p.3-12 |
| A19 | A12 | Phase A pulse input 5 V | SH-080036 §3.5 p.3-12 |
| B19 | B12 | ABCOM | SH-080036 §3.5 p.3-12 |
| A18 | A11 | Phase B pulse input 24 V | SH-080036 §3.5 p.3-12 |
| B18 | B11 | Phase B pulse input 12 V | SH-080036 §3.5 p.3-12 |
| A17 | A10 | Phase B pulse input 5 V | SH-080036 §3.5 p.3-12 |
| B17 | B10 | Preset input 24 V | SH-080036 §3.5 p.3-12 |
| A16 | A09 | Preset input 12 V | SH-080036 §3.5 p.3-12 |
| B16 | B09 | Preset input 5 V | SH-080036 §3.5 p.3-12 |
| B15 | B08 | Function start input 24 V | SH-080036 §3.5 p.3-12 |
| A14 | A07 | Function start input 12 V | SH-080036 §3.5 p.3-12 |
| B14 | B07 | Function start input 5 V | SH-080036 §3.5 p.3-12 |
| A06 / A05 | | EQU1 — coincidence output No. 1 | SH-080036 §3.5 p.3-12 |
| B06 / B05 | | EQU2 — coincidence output No. 2 | SH-080036 §3.5 p.3-12 |
| B02, B01 | | 12/24 V (external supply) | SH-080036 §3.5 p.3-12 |
| A02, A01 | | 0 V (common) | SH-080036 §3.5 p.3-12 |

Each channel has **three separate input pairs for 24 V, 12 V and 5 V**. Wire exactly one pair to match the encoder's pulse level; the wrong pair loses pulses or damages the input. The QD62D replaces these three pairs with RS-422-A differential inputs (5 V line driver) and does not share this pinout.

The manufacturer's 24 V open-collector encoder wiring (`+24 V`, `0 V`, phases A/B, `ABCOM`):

<ManualFigure
  src="/img/manual/qd62-wiring.jpg"
  alt="24 V open-collector encoder wired to QD62: 24 V supply, phase A, phase B, ABCOM"
  caption="24 V open-collector encoder to QD62"
  doc="SH-080036"
  section="§4.4.2"
  page="4-6"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080036/sh080036q.pdf"
/>

The line-driver encoder wiring (AM26LS31 equivalent) through the differential pairs:

<ManualFigure
  src="/img/manual/qd62-line-driver.jpg"
  alt="Line-driver encoder wired to QD62 through the A+/A− and B+/B− differential pairs"
  caption="Line-driver encoder to QD62"
  doc="SH-080036"
  section="§4.4.2"
  page="4-8"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080036/sh080036q.pdf"
/>

## 3. QD62/QD62E specifications

| Item | Value | Source |
| --- | --- | --- |
| Channels | 2 channels | SH-080036 §3.1 p.3-1 |
| Occupied I/O points | 16 points (intelligent 16 points) | SH-080036 §3.1 p.3-1 |
| Counting speed | 200 k / 100 k / 10 k PPS by switch (200 kPPS is the QD62/E maximum) | SH-080036 §3.1 p.3-1 |
| Input signal level | 5/12/24 VDC, 2–5 mA | SH-080036 §3.1 p.3-1 |
| Counting range | 32-bit signed, −2,147,483,648…2,147,483,647 | SH-080036 §3.1 p.3-1 |
| Counter format | Linear counter or ring counter | SH-080036 §5.2 p.5-4 |
| EQU1/EQU2 comparator output | 0.5 A/point, 2 A/common; 10.2–30 V; response ≤ 0.1 ms | SH-080036 §3.5 p.3-12 |
| External output supply | 12/24 V (10.2–30 V), 8 mA (TYP. 24 VDC) | SH-080036 §3.5 p.3-12 |

QD62 and QD62E differ in output-stage current direction: QD62 sinks (load returns to the positive supply), QD62E sources (load returns to 0 V). Both share the 32-bit range and the 200 kPPS ceiling; only QD62D reaches 500 kPPS.

## 4. Buffer memory access

| Address | Content | Width | Source |
| --- | --- | --- | --- |
| `Un\G0`, `Un\G1` | CH1 preset value | 32-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G2`, `Un\G3` | CH1 present value | 32-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G4`, `Un\G5` | CH1 coincidence point No. 1 | 32-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G6`, `Un\G7` | CH1 coincidence point No. 2 | 32-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G8` | CH1 overflow detection flag | 16-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G9` | CH1 counter function selection | 16-bit | SH-080036 §6.1 p.6-1 |
| `Un\G20`, `Un\G21` | CH1 ring counter minimum | 32-bit | SH-080036 §5.2.2 p.5-5 |
| `Un\G22`, `Un\G23` | CH1 ring counter maximum | 32-bit | SH-080036 §5.2.2 p.5-5 |
| `Un\G32`, `Un\G33` | CH2 preset value | 32-bit | SH-080036 §5.1.3 p.5-3 |
| `Un\G34`, `Un\G35` | CH2 present value | 32-bit | SH-080036 §5.1.3 p.5-3 |

32-bit values occupy two consecutive words, low word first. Use `DMOV`/`DFRO`/`DTO` or `FROM`/`TO` with `K2` words; never read a single word.

```il
; Write preset 2500 to CH1 (32-bit: Un\G0, Un\G1)
|--[SM400]-----[DMOV K2500 D200]-------|
|--[SM400]-----[TO   U0\G0  D200  K2]--|

; Read CH1 present value (Un\G2, Un\G3) and CH2 (Un\G34, Un\G35)
|--[SM400]-----[FROM U0\G2  D100  K2]--|
|--[SM400]-----[FROM U0\G34 D102  K2]--|
```

`U0` assumes the module is in the first slot; substitute the actual slot I/O number. The ladder is structural and has not been run on a real PLC; confirm the slot address and speed switch before downloading.

## 5. Encoder wiring

- Use shielded twisted pair for A, B and ground the shield at one point on the encoder side.
- For a 24 V open-collector encoder, wire `Phase A 24 V` (A20) and `Phase B 24 V` (A18); for a 5 V line-driver encoder, use the `5 V` pair (A19/A17) or choose QD62D for differential.
- Keep pulse wiring at least 150 mm from power cables; noise on the pulse lines causes miscounts.
- `ABCOM` is the common of the A/B pair, not the 0 V supply for the external load.

Sources: <SourceRef doc="sh080036" page="3.1" />, terminal table at <SourceRef doc="sh080036" page="3.5" />, buffer memory at <SourceRef doc="sh080036" page="5.1.3" />.
