---
title: "QD62E — High-speed counter module"
family: q
module: module-qd62e
status: draft
source: SH-080036
---

<ModulePage id="qd62e" />

## 1. Signal groups to wire

QD62E is a two-channel pulse counter with source outputs. It shares the QD62 pin table:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Count pulses | Phase A, Phase B | encoder → module | Each channel has three 24/12/5 V pairs; wire one pair only (SH-080036 §3.5 p.3-12) |
| Control | Preset, Function start | switch/PLC → module | Same three 24/12/5 V levels (SH-080036 §3.5 p.3-12) |
| Comparator output | EQU1, EQU2 | module → load | 0.5 A/point, 2 A/common; source type (SH-080036 §3.5 p.3-12) |
| External supply | 12/24 V, 0 V | supply → module | Feeds the output stage (SH-080036 §3.5 p.3-12) |

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

## 2. Wiring principles

- **Connection type:** 40-pin connector (A20/B20) — two rows A20/B20, 32 points per connector (SH-080036 §3.5, p. 3-13).
- Each channel has three 24 V, 12 V and 5 V pin pairs; wire exactly one pair to match the encoder level.
- ABCOM is the common of the A/B pair, not the 0 V supply for the external load.
- Use shielded twisted pair for A and B; ground the shield at one point on the encoder side.
- Keep pulse wiring at least 150 mm from power wiring.
- QD62E has a source output stage: the load returns to 0 V, unlike the QD62 sink stage.

## 3. Reference diagram

- Use [QD62](/en/q/modules/m/qd62) for the counting methods, pin table, ratings and encoder wiring. The counting text and pin table apply verbatim.
- Do not apply the QD62 sink output direction; QD62E is source, with the load returning to 0 V.
- QD62D uses RS-422-A differential inputs and does not share this pinout.

## 4. Manufacturer input/output circuits

The manufacturer external-interface table and internal circuit for QD62E are in SH-080036 §3.5 (p. 3-13): <SourceRef doc="sh080036" page="3-13" />.

<ManualFigure
  src="/img/manual/qd62e-terminals.webp"
  alt="QD62E interface table: terminals A20–B01, signal names and internal circuit"
  caption="Manufacturer terminal table and internal circuit for QD62E — 40-pin connector (A20/B20)"
  doc="SH-080036"
  section="§3.5"
  page="3-13"
  pdf-url="https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080036/sh080036q.pdf"
/>

## 5. External device connections

- 24 V open-collector encoder: wire Phase A 24 V (A20) and Phase B 24 V (A18); ABCOM per the diagram.
- 5 V line-driver encoder: use the 5 V pair (A19/A17) or QD62D for differential.
- Keep pulse wiring at least 150 mm from power wiring; noise causes miscounts.
- Ground the shield at one point on the encoder side, not at both ends.

## 6. Checklist before power-up

- [ ] Power was switched off before wiring.
- [ ] Only one 24/12/5 V pulse pair is wired per channel.
- [ ] ABCOM is not used as the load 0 V.
- [ ] Encoder type is correct: open collector or line driver.
- [ ] Pulse wiring is at least 150 mm from power wiring.
- [ ] Shield grounded at one end on the encoder side.
- [ ] Pulses were checked by turning the encoder shaft slowly.
- [ ] Source output load returns to 0 V, not wired as a QD62 sink.
