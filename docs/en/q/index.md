---
title: MELSEC Q — positioning modules
family: q
status: draft
source: SH-080058
---

# MELSEC Q — positioning modules

The QD75 family are positioning modules mounted on the MELSEC Q base, outputting pulses to a servo/stepper driver. This page is the entry point for all QD75 documentation in the handbook.

## 1. QD75 models

| Model | Output | Number of axes | Notes |
| --- | --- | --- | --- |
| QD75P1 | Open collector | 1 | Discontinued 09/2021, replaced by QD75P1N |
| QD75P2 | Open collector | 2 | Discontinued 09/2021, replaced by QD75P2N |
| QD75P4 | Open collector | 4 | Discontinued 09/2021, replaced by QD75P4N |
| QD75D1 | Differential driver | 1 | Discontinued 09/2021, replaced by QD75D1N |
| QD75D2 | Differential driver | 2 | Discontinued 09/2021, replaced by QD75D2N |
| QD75D4 | Differential driver | 4 | Discontinued 09/2021, replaced by QD75D4N |
| QD75P1N | Open collector | 1 | Current replacement (FA-A-0286) |
| QD75P2N | Open collector | 2 | Current replacement (FA-A-0286) |
| QD75P4N | Open collector | 4 | Current replacement (FA-A-0286) |
| QD75D1N | Differential driver | 1 | Current replacement (FA-A-0286) |
| QD75D2N | Differential driver | 2 | Current replacement (FA-A-0286) |
| QD75D4N | Differential driver | 4 | Current replacement (FA-A-0286) |

Reading a model name: **QD75P** uses an open collector output, **QD75D** uses a differential driver output. The suffix **N** (QD75P1N … QD75D4N) is the current replacement; the non-N family has been discontinued (FA-A-0286). The number at the end of the name is the number of axes.

Discontinuation dates per SH-080058 appendix A-19 (discontinued model list); the N versions are the replacement products (FA-A-0286, SH-080058 appendix 1.2). Open collector / differential output type per SH-080058 §3.1 p.3-2.

## 2. QD75 and QD77MS

- **QD75** is a positioning module: it receives commands from the CPU via buffer memory and outputs pulses to each driver itself, with each axis independent.
- **QD77MS** is a motion module: it controls multiple axes over a communication bus and has the concepts of virtual axes and inter-axis synchronisation.

The core difference lies in how commands are transmitted to the driver and in the ability to coordinate multiple axes, not in the number of axes. This handbook only covers the QD75; for specific QD77MS parameters, consult that family's own manual.

## 3. QD75D4 pages

- [QD75D4 overview](/en/q/qd75/) — core specifications, block diagram, documentation scope.
- [Wiring](/en/q/qd75/wiring) — differential pulse pairs, wiring principles, checklist before power-up.
- [X/Y signals](/en/q/qd75/io-signals) — PLC READY and QD75 READY handshake, axis flags.
- [Parameters (Pr.)](/en/q/qd75/parameters) — units, pulses/revolution, travel/revolution, two parameter write paths.
- [Position data (Da.)](/en/q/qd75/position-data) — ten fields, three control systems, 600-point limit.
- [Origin point return (OPR)](/en/q/qd75/opr) — the OPR methods (Pr.43 codes) and the sequence.
- [Ladder](/en/q/qd75/ladder) — buffer memory, startup sequence, safety interlocks.
- [Commissioning](/en/q/qd75/commissioning) — procedure from power-up to loaded operation.
- [Troubleshooting](/en/q/qd75/troubleshooting) — indicators, error groups, how to look up error codes.

## Further reading

- [Basic concepts of positioning control](/en/concepts/positioning-basics)
- [Comparison of PLC families](/en/compare/)
