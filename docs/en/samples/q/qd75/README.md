---
title: QD75 sample programs
family: common
status: draft
---

# QD75 sample programs

Sample files are not committed to the source repository as binaries. They are released through the documentation repository's GitHub Releases and only through that channel.

Planned file list:

| File | Content | Status |
| --- | --- | --- |
| `qd75d4-init.il` | Initialisation: write the required Pr. parameters before turning READY on | not yet released |
| `qd75d4-position-table.csv` | Sample Da. position data table for 4 axes | not yet released |
| `qd75d4-startup.il` | Sequence to turn on Y0, wait for X0, issue the axis start command | not yet released |

Notes:

- Releases is the only supported distribution channel; files downloaded elsewhere are not guaranteed to match the documentation content.
- The sample files use symbolic buffer addresses and illustrative device numbers; they must be cross-checked against the module's actual configuration before use.
- See also [QD75D4 — ladder and startup](/en/q/qd75/ladder) to understand the sequence these files implement.
