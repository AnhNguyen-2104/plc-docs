---
title: X/Y signals — QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

# X/Y signals — QD75D4

The table below follows the I/O table in SH-080058 §3.3.1 (p.3-16); the device layout is the same for the entire QD75 family. X0, X1 and Y0 are module-wide signals; the remaining groups repeat per axis.

The QD75D4 does not use the `ParamTable` component for the signal table because the signal structure differs from the component's row type; the markdown table below preserves the source values exactly.

| Axis | X | Y | Name | Description | Source |
| --- | --- | --- | --- | --- | --- |
| - | X0 | Y0 | QD75 READY / PLC READY | X0 is ON when the module is ready; Y0 is the CPU-side PLC READY command to the QD75. | SH-080058 §3.3.1 p.3-16 |
| - | X1 | - | Synchronization flag | ON when the QD75 buffer memory is accessible (interlock for sequence program access). | SH-080058 §3.3.1 p.3-16 |
| 1 to 4 | X4 to X7 | - | M code ON | Axis 1 to 4 M code output signal. | SH-080058 §3.3.1 p.3-16 |
| 1 to 4 | X8 to XB | - | Error detection | Axis 1 to 4 error detection signal. | SH-080058 §3.3.1 p.3-16 |
| 1 to 4 | XC to XF | - | BUSY | Axis 1 to 4 BUSY (operating) signal. | SH-080058 §3.3.1 p.3-16 |
| 1 to 4 | X10 to X13 | - | Start complete | Axis 1 to 4 start complete signal. | SH-080058 §3.3.1 p.3-16 |
| 1 to 4 | X14 to X17 | - | Positioning complete | Axis 1 to 4 positioning complete signal. | SH-080058 §3.3.1 p.3-16 |
| 1 to 4 | - | Y4 to Y7 | Axis stop | Axis 1 to 4 stop command from the CPU module. | SH-080058 §3.3.1 p.3-16 |
| 1 to 4 | - | Y8 / YA / YC / YE | Forward run JOG start | Forward run JOG start command, axis 1 to 4. | SH-080058 §3.3.1 p.3-16 |
| 1 to 4 | - | Y9 / YB / YD / YF | Reverse run JOG start | Reverse run JOG start command, axis 1 to 4. | SH-080058 §3.3.1 p.3-16 |
| 1 to 4 | - | Y10 to Y13 | Positioning start | Axis 1 to 4 positioning start command. | SH-080058 §3.3.1 p.3-16 |
| 1 to 4 | - | Y14 to Y17 | Execution prohibition flag | Axis 1 to 4 execution prohibition flag. | SH-080058 §3.3.1 p.3-16 |

Addresses come from the I/O table in SH-080058 §3.3.1 (p.3-16); when wiring, still cross-check against the manual edition for the correct model (QD75D4 vs QD75D4N).

## 1. PLC READY and QD75 READY handshake

Two foundational signals:

- **Y0 — PLC READY:** the CPU tells the QD75 that the program is ready to work with the module. This signal is controlled by the CPU.
- **X0 — QD75 READY:** the QD75 reports back that the module is ready. Run commands may only be issued when X0 is on.

Mandatory order: turn on Y0 first, wait for X0, then read/write operating data. Doing it in reverse will have no effect or will be ignored by the module.

## 2. Synchronization flag and refresh timing

- **X1 — Synchronization flag:** turns on when the QD75 buffer memory is accessible. Use X1 as a condition for every buffer memory read/write in the sequence program, to avoid accessing the module when it is not ready.
- Some parameters only take effect after Y0 goes from OFF to ON following power-up or a CPU reset (for example Pr.5, §5.2.1 p.5-20). The standard sequence is therefore: write parameters while Y0 is OFF, then turn Y0 on so the module latches the values.
- After writing parameters with `TO`, read them back to confirm before issuing a run command.

## 3. Sample startup sequence

1. Check that the axis is not BUSY (XC…XF).
2. Write the required parameters while Y0 is still OFF.
3. Turn on Y0 (PLC READY).
4. Wait for X0 to turn on (QD75 READY) and X1 to turn on (synchronised).
5. Check that each axis error flag is OFF (X8…XB).
6. Issue the axis start command (Y10…Y13) or write position data and then start.
7. Wait for the positioning complete flag (X14…X17) or the M code ON flag (X4…X7), depending on the step.

For exact signal names, meanings and refresh timing, consult SH-080058 §3.3.1 (p.3-16) and the relevant chapter.

## Further reading

- [Ladder and startup](/en/q/qd75/ladder)
- [QD75D4 parameters](/en/q/qd75/parameters)
- [Troubleshooting](/en/q/qd75/troubleshooting)
