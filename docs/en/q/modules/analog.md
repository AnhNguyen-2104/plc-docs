---
title: MELSEC Q analog modules — module list
family: q
module: q-series
status: draft
source: SH-080055, SH-080054
---

# MELSEC Q analog modules — module list

<ModulePhoto id="q64ad" />

<ModulePhoto id="q62da" />

[Q64AD](/en/q/modules/m/q64ad) is a four-channel analog-to-digital module; [Q62DA](/en/q/modules/m/q62da) is a two-channel digital-to-analog module. Both occupy 16 I/O points, terminate on an 18-point terminal block, and exchange data with the CPU through buffer memory (`Un\G…`) using `FROM`/`TO` or the `U\G` device. Voltage and current are single-ended signals referenced to `AG`/`SLD`, so signal wiring must be shielded twisted pair. The terminals and specifications of each model are on its own model page.

## Module list

| Model | Role |
| --- | --- |
| [Q64AD](/en/q/modules/m/q64ad) | Converts four analog channels to 16-bit digital values |
| [Q62DA](/en/q/modules/m/q62da) | Converts two 16-bit digital channels to analog outputs |

## 1. Wiring

- Use shielded twisted pair per channel; `V+`/`V−` (or `I+`/`COM`) travel in the same pair.
- Terminate the shield on `SLD` (Q64AD) or `FG` (Q62DA) at the module end and leave the other end open or grounded at one point near the sensor — never both ends.
- `A.G.` on Q64AD is the analog reference; do not use it as the negative of the 24 V supply.
- Keep signal cables at least 150 mm from power wiring and cross at right angles when they must meet.

## 2. Example program (FROM/TO)

Q64AD sits in the first slot (I/O number 0000 → `U0`) and Q62DA in the next (`U1`). The module's `Y` address shifts with the slot; here Q64AD uses `Y0009` and Q62DA uses `Y0019` for Operating condition setting request.

```il
; --- Q64AD: enable A/D on CH1..CH4, continuous sampling ---
|--[SM400]-----[TO  U0\G0  K000F  K1]--|  ; b0..b3 = 1: enable A/D on CH1..CH4 (Un\G0)
|--[SM400]-----[TO  U0\G9  K0000  K1]--|  ; 0: sampling, no averaging (Un\G9)
|--[SM400]-----[SET Y0009]-------------|  ; Operating condition setting request
|--[X0009]-----[RST Y0009]-------------|  ; X9 = setting completed
|--[SM400]-----[FROM U0\G11 D100  K4]--|  ; D100..D103 = CH1..CH4 (Un\G11..G14)

; --- Q62DA: write digital values for CH1, CH2 ---
|--[SM400]-----[TO  U1\G0  K0003  K1]--|  ; b0, b1 = 1: enable D/A on CH1, CH2 (default 3H)
|--[SM400]-----[TO  U1\G1  D200   K2]--|  ; D200 → CH1, D201 → CH2 (Un\G1, Un\G2)
```

Buffer addresses used above: `Un\G0` = A/D conversion enable/disable (b0–b3 valid on Q64AD, b4–b7 ignored), `Un\G9` = averaging process setting, `Un\G11…G14` = CH1…CH4 digital output value (SH-080055 §3.4.1 p.3-18); `Un\G0` = D/A conversion enable/disable and `Un\G1`/`Un\G2` = CH1/CH2 digital value on Q62DA (SH-080054 §3.4.1 p.3-20). The ladder is a structural example and has not been run on a real PLC: confirm the `Y`/`X` addresses against the actual slot layout before downloading.

## 3. Sources

- Per-model sources: see the "Sources" section on the Q64AD and Q62DA pages.
- Range codes: SH-080055 §3.4.10 p.3-30.

