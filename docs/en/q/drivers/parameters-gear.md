---
title: Parameters & gear ratio
family: q
module: qd75-drivers
status: draft
source: SH-080058
---

<script setup>
import { prRows } from '../../../.vitepress/data/modules/qd75d4.ts'
const qdRows = prRows.filter((row) => ['Pr.1', 'Pr.2', 'Pr.3', 'Pr.4'].includes(row.no))
</script>

# Parameters & gear ratio

The gear ratio (electronic gear) determines how far the machine moves per command pulse. There are two places where the ratio can be applied: the QD75D4 (`Pr.2`–`Pr.4`) and the driver. The safe rule is to **set the ratio on one side only**; setting it on both doubles the error and makes diagnosis very difficult.

## 1. QD75D4 side — Pr.1 to Pr.4

<ParamTable :rows="qdRows" title="The four basic parameters of the QD75D4" />

The buffer memory addresses of these four parameters are 0, 1, 2, 3 on axis 1; axis 2 adds 150, axis 3 adds 300, axis 4 adds 450. The basic parameter area is 0–15 (axis 1), 150–165 (axis 2)… per SH-080058 §7.1.2 p.7-5 and Appendix 13 p. Appendix-150. `Pr.5` (output pulse form) is at address 4 for axis 1 (SH-080058 §5.2.1 p.5-21). The area 1500–1550 is control data (`Cd.`), not parameters (SH-080058 §7.1.2 p.7-5).

The manual defines `Movement amount per pulse = Al / Ap`, where `Al` is Pr.3 counted in Pr.1 LSBs and `AL = Al × Pr.4` (SH-080058 §5.2.1 p.5-19). Inverting it gives pulses per unit:

```text
pulse/mm = Pr.2 × 10000 / (Pr.3 × Pr.4)
```

- `Pr.2` is the number of pulses per motor revolution and must match the number of pulses the driver accepts per revolution (SH-080058 §5.2.1 p.5-19).
- `Pr.3` is the mechanical distance per revolution. When `Pr.1 = 0` (mm), the manual allows 0.1…6553.5 µm when entered with a peripheral device, or 1…65535 in 0.1 µm units when written by a program (SH-080058 §5.2.1 p.5-19). Hence 5 mm corresponds to 5000.0 µm or 50000 (×0.1 µm).
- `Pr.4` accepts only 1 / 10 / 100 / 1000 to bring `Pr.3` into the permitted range (SH-080058 §5.2.1 p.5-20).

## 2. Example: 5 mm ball screw, 1 pulse = 10 µm

Target 100 pulse/mm, i.e. 500 pulses per 5 mm revolution.

| Side | Parameter | Value | Calculation / source |
| --- | --- | --- | --- |
| QD75D4 | Pr.1 | 0 | Unit mm (SH-080058 §5.2.1 p.5-18) |
| QD75D4 | Pr.2 | 500 | Command pulses per revolution |
| QD75D4 | Pr.3 | 50000 | 5 mm written in 0.1 µm (5000.0 µm when entered from a peripheral) (SH-080058 §5.2.1 p.5-19) |
| QD75D4 | Pr.4 | 1 | Factor 1 |
| QD75D4 | Result | 100 pulse/mm | 500 × 10000 / (50000 × 1) = 100 |

The MR-J4-A side must accept 500 command pulses per revolution. The MR-J4-A encoder is 4194304 pulse/rev (SH-030143-C §7.3.1 p.7-93), so the electronic gear ratio is:

```text
CMX/CDV = 4194304 / 500 = 1048576 / 125 ≈ 8388.6
```

This ratio is within the permitted range `1/865 < CMX/CDV < 271471` and both values are ≤ 16777215 (SH-030143-C §7.1.1 p.7-19). The formula `CMX/CDV = Pt/ΔS` and `Pt = 4194304` come from SH-030143-C §7.3.1 p.7-93.

## 3. Electronic gear on the driver side

| Driver | Parameter / item | Function | Cross-check status |
| --- | --- | --- | --- |
| Mitsubishi MR-J4-A | `PA06` (CMX), `PA07` (CDV); `PA21` selects the mode | Electronic gear numerator/denominator | Cross-checked with SH-030143-C §7.1.1 <SourceRef doc="sh030143" page="7-19" />, §7.3.1 <SourceRef doc="sh030143" page="7-93" /> |
| Delta ASDA-B2 | Electronic gear parameter pair (the catalogue requires P1-44/P1-45 to be noted) | Gear ratio numerator/denominator | Page not cross-checked; <SourceRef doc="asda-b2" page="ASDA-B2 User Manual" text="ASDA-B2 User Manual" /> |
| Yaskawa Sigma-7 SGD7S | `Pn20E` / `Pn210` `[secondary]` | Drive-side electronic gear | Numbers from the source article; open the parameter chapter of <SourceRef doc="sgd7s" page="SIEP S800001 26O" text="SIEP S800001 26O" /> to confirm, including `Pn211` if present |
| Panasonic MINAS A6 | `Pr0.08` / `Pr0.09` / `Pr0.10` (per the catalogue requirement) | Command pulses per revolution and numerator/denominator | Page not cross-checked; open the `Pr0.0x` parameter chapter of <SourceRef doc="minas-a6" page="SX-DSV03031" text="SX-DSV03031" /> |
| Leadshine DM542 | Microstep DIP switch group | Select the number of microsteps per revolution | Page not cross-checked; open the DIP switch section of <SourceRef doc="dm542" page="DM542 Rev 3.0" text="DM542 Rev 3.0" /> |

With the MR-J4-A, set `MR Configurator2 → Parameter → Pr.PA06` (CMX) and `MR Configurator2 → Parameter → Pr.PA07` (CDV); `Pr.PA21` selects the electronic gear mode.

`[secondary]` means the figures come from the source article and have not been cross-checked with the original manual in this session.

Check the arithmetic of the source article: 16777216 / 500 = 33554.432, corresponding to 500 command pulses per revolution of a 24-bit motor. This figure agrees with the 5 mm / 100 pulse-mm example above, but the interpretation of the `Pn20E`/`Pn210` pair must be confirmed in the SGD7S parameter table before loading.

## 4. Check order

1. Settle the mechanics: screw pitch, gearbox ratio, how far one pulse should travel.
2. Choose one side to hold the ratio — usually QD75D4 `Pr.2`–`Pr.4` — and leave the driver at 1:1 if it allows it.
3. If the driver electronic gear must be used, set the QD75D4 to 1:1 and calculate from the driver encoder.
4. Run a short test move, measure the actual distance, then correct; never correct both sides at once.
5. Record the full set of QD75D4 and driver values in the machine record.

## Read next

- [Driver wiring overview](/en/q/drivers/)
- [Mitsubishi MR-J4-A](/en/q/drivers/mr-j4-a)
- [QD75D4 parameters (Pr.)](/en/q/qd75/parameters)
