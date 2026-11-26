---
title: MELSEC Q digital input modules — module list
family: q
module: q-series
status: draft
source: SH-080042
---

# MELSEC Q digital input modules — module list

<ModulePhoto id="qx40" />

<ModulePhoto id="qx41" />

This page lists the 26 digital input modules of the MELSEC Q series documented in SH-080042, covering the QX… models and QI60. Each model has its own page in the list below for summary facts and wiring rules; [QX40](/en/q/modules/m/qx40) has the full pin layout, input circuit and specifications, while [QX80](/en/q/modules/m/qx80) has the negative-common input circuit. The positive-common versus negative-common decision belongs to wiring, see [I/O wiring](/en/q/system/io-wiring).

## Module list

| Model | Points | Role | Manual |
| --- | --- | --- | --- |
| [QX40](/en/q/modules/m/qx40) | 16 | 16-point 24 VDC input, positive common | SH-080042 §2.4 |
| [QX10](/en/q/modules/m/qx10) | 16 | 16-point 100–120 VAC AC input | SH-080042 §2-1 |
| [QX10-TS](/en/q/modules/m/qx10ts) | 16 | 16-point 100–120 VAC AC input, spring clamp terminal block (-TS) | SH-080042 §2-2 |
| [QX28](/en/q/modules/m/qx28) | 8 | 8-point 100–240 VAC AC input | SH-080042 §2-3 |
| [QX40-S1](/en/q/modules/m/qx40s1) | 16 | 16-point 24 VDC input, positive common, -S1 6 mA variant | SH-080042 §2-5 |
| [QX40-TS](/en/q/modules/m/qx40ts) | 16 | 16-point 24 VDC input, positive common, spring clamp terminal block (-TS) | SH-080042 §2-6 |
| [QX40H](/en/q/modules/m/qx40h) | 16 | 16-point 24 VDC input, positive common, high-speed (H) | SH-080042 §2-7 |
| [QX41](/en/q/modules/m/qx41) | 32 | 32-point 24 VDC input, positive common | SH-080042 §2-9 |
| [QX41-S1](/en/q/modules/m/qx41s1) | 32 | 32-point 24 VDC input, positive common, -S1 OFF threshold 9.5 V | SH-080042 §2-10 |
| [QX41-S2](/en/q/modules/m/qx41s2) | 32 | 32-point 24 VDC input, positive common, -S2 ON threshold 15 V, 6 mA | SH-080042 §2-12 |
| [QX42](/en/q/modules/m/qx42) | 64 | 64-point 24 VDC input, positive common | SH-080042 §2-13 |
| [QX42-S1](/en/q/modules/m/qx42s1) | 64 | 64-point 24 VDC input, positive common, -S1 OFF threshold 9.5 V | SH-080042 §2-15 |
| [QX50](/en/q/modules/m/qx50) | 16 | 16-point 48 VDC/48 VAC input, positive/negative shared common | SH-080042 §2-17 |
| [QX70](/en/q/modules/m/qx70) | 16 | 16-point 5/12 VDC input, positive/negative shared common | SH-080042 §2-18 |
| [QX70H](/en/q/modules/m/qx70h) | 16 | 16-point 5 VDC input, positive common, high-speed (H) | SH-080042 §2-19 |
| [QX71](/en/q/modules/m/qx71) | 32 | 32-point 5/12 VDC input, positive/negative shared common | SH-080042 §2-21 |
| [QX72](/en/q/modules/m/qx72) | 64 | 64-point 5/12 VDC input, positive/negative shared common | SH-080042 §2-22 |
| [QX80](/en/q/modules/m/qx80) | 16 | 16-point 24 VDC input, negative common | SH-080042 §2-24 |
| [QX80-TS](/en/q/modules/m/qx80ts) | 16 | 16-point 24 VDC input, negative common, spring clamp terminal block (-TS) | SH-080042 §2-25 |
| [QX80H](/en/q/modules/m/qx80h) | 16 | 16-point 24 VDC input, negative common, high-speed (H) | SH-080042 §2-26 |
| [QX81](/en/q/modules/m/qx81) | 32 | 32-point 24 VDC input, negative common | SH-080042 §2-28 |
| [QX81-S2](/en/q/modules/m/qx81s2) | 32 | 32-point 24 VDC input, negative common, -S2 ON threshold 15 V, 6 mA | SH-080042 §2-29 |
| [QX82](/en/q/modules/m/qx82) | 64 | 64-point 24 VDC input, negative common | SH-080042 §2-30 |
| [QX82-S1](/en/q/modules/m/qx82s1) | 64 | 64-point 24 VDC input, negative common, -S1 OFF threshold 9.5 V | SH-080042 §2-32 |
| [QX90H](/en/q/modules/m/qx90h) | 16 | 16-point 5 VDC input, negative common, high-speed (H) | SH-080042 §2-34 |
| [QI60](/en/q/modules/m/qi60) | 16 | 16-point 24 VDC interrupt input | SH-080042 §5-1 |

## 1. Manufacturer input circuits

The QX40 (positive common) and QX80 (negative common) input-circuit figures are on the [QX40 page](/en/q/modules/m/qx40) and the [QX80 page](/en/q/modules/m/qx80). The two circuits differ only in the `COM` polarity; the photocoupler and current-limiting resistor are the same. Choose QX40 when an NPN sensor pulls to 0 V, and QX80 when a PNP sensor sources from +24 V.

## 2. Sources

- Slot position, system current budget and base limits: <SourceRef doc="sh080483" page="8.3" />.
- Per-model sources: see the "Sources" section on each model page.

The actual wiring circuits (switches, sensors, 24 V supply) are on the [I/O wiring](/en/q/system/io-wiring) page.

