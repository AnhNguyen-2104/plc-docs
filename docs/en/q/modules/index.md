---
title: MELSEC Q module catalogue
family: q
module: q-series
status: draft
source: SH-080483, SH-080042, SH-080055, SH-080054, SH-080036
---

# MELSEC Q module catalogue

<ModuleSectionNav />

This catalogue collects the Q-series modules this handbook can describe directly from the manufacturer manuals stored on disk. Start with [Module assembly](/en/q/modules/assembly) to lay out the CPU, base, power supply and modules across slots; open [Module guides](/en/q/modules/guides) to look up a model; read [How to use](/en/q/modules/usage) on a first visit. The product photos below lead to each model's page. A row tagged "planned" is a module whose values could not be verified from the on-disk manuals, so only its qualitative role is kept.

## Product photos

Product photos are copyright Mitsubishi Electric and used for educational purposes; the source (the Mitsubishi FASpec page) is credited on each model's detail page. Models without a manufacturer photo are listed at the end of the grid.

<ModuleGallery />

## Adding a module

1. Add an entry to `docs/.vitepress/data/modules/qseries.ts` with `id`, `model`, `kind`, `role`, `keySpec`, `manual` and `page`.
2. Create the detail page (or add a section to an existing page) and point the `page` field at it.
3. Run `npm run check` and `BASE=/plc-docs/ npx vitepress build docs` to catch dead links before pushing.

`manual.doc` must be a key that already exists in `docs/.vitepress/data/pdfDocs.ts`; when no manual is available, declare the entry with `status: 'planned'` instead of guessing values.
