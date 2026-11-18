---
title: MELSEC Q module catalogue
family: q
module: q-series
status: draft
source: SH-080483, SH-080042, SH-080055, SH-080054, SH-080036
---

# MELSEC Q module catalogue

<ModuleMatrix />

This catalogue collects the Q-series modules this handbook can describe directly from the manufacturer manuals stored on disk, grouped by function: CPU, power supply, base unit, digital I/O, analog, counter, network and motion. Each row gives one key fact worth memorising, with its unit; the model name links to the page that covers the module. A row tagged "planned" is a module whose values could not be verified from the on-disk manuals, so only its qualitative role is kept.

## Adding a module

1. Add an entry to `docs/.vitepress/data/modules/qseries.ts` with `id`, `model`, `kind`, `role`, `keySpec`, `manual` and `page`.
2. Create the detail page (or add a section to an existing page) and point the `page` field at it.
3. Run `npm run check` and `BASE=/plc-docs/ npx vitepress build docs` to catch dead links before pushing.

`manual.doc` must be a key that already exists in `docs/.vitepress/data/pdfDocs.ts`; when no manual is available, declare the entry with `status: 'planned'` instead of guessing values.
