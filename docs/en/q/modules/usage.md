---
title: How to use
family: q
module: q-series
status: draft
source: SH-080483
---

# How to use

<ModuleSectionNav />

This page shows a newcomer how to look things up in the handbook: go from a module group to the right model, read the specification table, then take the configuration to GX Works2.

## 1. First visit

Follow [Getting started — from box to run](/en/q/start/) for a five-step path from choosing modules to a test run. Once you have a real rack, use [Module assembly](/en/q/modules/assembly) to check slots, points and 5 V current before fitting.

## 2. Look up a model

1. Open [Module guides](/en/q/modules/guides).
2. Find the function group (CPU, Digital inputs, Digital outputs, Analog, Counter, Network, Motion) and select the model name.
3. The model page opens at `/en/q/modules/m/<id>`: read "Summary specifications", open the PDF on the Manual row, then read the "Wiring" section.
4. For a detailed pin table, follow the "Group page" link at the end of the model page.

## 3. Reading labels on a model page

- **planned**: the module's values could not be fully verified from the on-disk manuals; use the qualitative description only and do not infer numbers.
- **—**: no figure is available for that item; do not fill it in yourself.
- **Manual / Open PDF**: the source document and page numbers to check against.
- **Group page**: the category page with the group's pin tables and shared wiring rules.

## 4. Fitting modules into the rack

1. Choose the CPU, main base and power supply module.
2. Assign modules to each slot; an empty slot occupies 16 points by default.
3. Read the warnings for exceeding the 5 V current or the I/O point ceiling.
4. Select "Copy for GX Works2" to get the TSV table for pasting into the I/O Assignment.

## 5. Links

- [I/O wiring](/en/q/system/io-wiring)
- [Power supply and base unit](/en/q/system/power-and-base)
- [Creating a GX Works2 project](/en/q/start/project)
- [Catalogue overview](/en/q/modules/)
