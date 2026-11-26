---
title: Getting started — from box to run
family: q
module: q-series
status: draft
source: SH-080807, SH-080483
---

# Getting started — from box to run

This is the shortest path from a boxed MELSEC Q system to the first test run. Follow the order; each step needs only one page.

## Before you start

- GX Works2, in a version that supports the CPU you use.
- A USB mini-B cable for Universal CPUs, or the cable for the actual programming port.
- The real model list on the rack: CPU, power supply, base and every I/O module.
- A multimeter and the wiring diagram of the field devices.

> Switch the power off before wiring. Never insert or remove a module while the rack is powered.

## Five-step path

- [ ] **1. Learn the positioning basics** — pulses, units, acceleration and the PLC-to-driver relationship: [Positioning basics](/en/concepts/positioning-basics).
- [ ] **2. Choose modules and slots** — X/Y addressing, empty slots and 5 V current: [Modules & slot assignment](/en/q/start/configuration).
- [ ] **3. Create a GX Works2 project** — the correct PLC Series, PLC Type and I/O Assignment: [Create a GX Works2 project](/en/q/start/project).
- [ ] **4. Wire the I/O** — positive/negative common, inductive loads and separation from power wiring: [I/O wiring](/en/q/system/io-wiring).
- [ ] **5. Test run** — power-up sequence, signal checks and running under load: [Commissioning & real data](/en/q/qd75/commissioning).

## After step 5

- [Module catalogue](/en/q/modules/) — look up models, point counts and current draw.
- [Power supply and base unit](/en/q/system/power-and-base) — recalculate 5 V current when adding modules.
- [Complete Q system](/en/q/system/) — reference rack diagram and signal paths.

## Ground rule

Every figure in this section comes from the manufacturer manual cited next to the table or sentence. I/O points and current draw are never guessed: a module that could not be verified shows "—" and is flagged by the rack builder.
