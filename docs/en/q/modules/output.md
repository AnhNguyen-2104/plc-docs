---
title: MELSEC Q digital output modules — module list
family: q
module: q-series
status: draft
source: SH-080042
---

# MELSEC Q digital output modules — module list

<ModulePhoto id="qy40p" />

<ModulePhoto id="qy41h" />

This page lists the 17 digital output modules of the MELSEC Q series documented in SH-080042, covering the QY… models. Each model has its own page in the list below for summary facts and wiring rules; [QY40P](/en/q/modules/m/qy40p) and [QY10](/en/q/modules/m/qy10) add the full pin layout, output circuit and specifications. How to choose a sink or source output for the load is covered on the [I/O wiring](/en/q/system/io-wiring) page.

## Module list

| Model | Points | Role | Manual |
| --- | --- | --- | --- |
| [QY40P](/en/q/modules/m/qy40p) | 16 | 16-point transistor output, sink type | SH-080042 §3.5 |
| [QY10](/en/q/modules/m/qy10) | 16 | 16-point relay contact output, 8 A/common | SH-080042 §3-1 |
| [QY10-TS](/en/q/modules/m/qy10ts) | 16 | 16-point relay contact output, spring clamp terminal block (-TS) | SH-080042 §3-2 |
| [QY18A](/en/q/modules/m/qy18a) | 8 | 8-point relay contact output, all points independent | SH-080042 §3-4 |
| [QY22](/en/q/modules/m/qy22) | 16 | 16-point 100–240 VAC TRIAC output | SH-080042 §3-5 |
| [QY40P-TS](/en/q/modules/m/qy40pts) | 16 | 16-point sink transistor output, spring clamp terminal block (-TS) | SH-080042 §3-8 |
| [QY41H](/en/q/modules/m/qy41h) | 32 | 32-point sink transistor output, high-speed (H) | SH-080042 §3-10 |
| [QY41P](/en/q/modules/m/qy41p) | 32 | 32-point sink transistor output | SH-080042 §3-11 |
| [QY42P](/en/q/modules/m/qy42p) | 64 | 64-point sink transistor output | SH-080042 §3-12 |
| [QY50](/en/q/modules/m/qy50) | 16 | 16-point sink transistor output, 0.5 A/point | SH-080042 §3-13 |
| [QY68A](/en/q/modules/m/qy68a) | 8 | 8-point sink/source transistor output, all points independent | SH-080042 §3-15 |
| [QY70](/en/q/modules/m/qy70) | 16 | 16-point sink transistor output, 5/12 VDC | SH-080042 §3-16 |
| [QY71](/en/q/modules/m/qy71) | 32 | 32-point sink transistor output, 5/12 VDC | SH-080042 §3-18 |
| [QY80](/en/q/modules/m/qy80) | 16 | 16-point source transistor output | SH-080042 §3-19 |
| [QY80-TS](/en/q/modules/m/qy80ts) | 16 | 16-point source transistor output, spring clamp terminal block (-TS) | SH-080042 §3-21 |
| [QY81P](/en/q/modules/m/qy81p) | 32 | 32-point source transistor output | SH-080042 §3-23 |
| [QY82P](/en/q/modules/m/qy82p) | 64 | 64-point source transistor output | SH-080042 §3-24 |

## 1. Manufacturer output circuits

The QY10 relay output circuit and the QY40P transistor output circuit are on the [QY10 page](/en/q/modules/m/qy10) and the [QY40P page](/en/q/modules/m/qy40p). Choose the output type for the load: a relay contact for isolated AC/DC loads, a sink/source transistor for fast DC switching, a TRIAC for AC loads.

## 2. Sources

- Slot position, system current budget and base limits: <SourceRef doc="sh080483" page="8.3" />.
- Per-model sources: see the "Sources" section on each model page.

The actual wiring circuits (loads, flyback diodes, load supply) are on the [I/O wiring](/en/q/system/io-wiring) page.

