---
title: QD75D4 troubleshooting
family: q
module: qd75d4
status: draft
source: SH-080058
---

# QD75D4 troubleshooting

Principle: establish the state first, read the indicators, and only then change parameters or the program. Change only one variable at a time so the cause can still be attributed.

## 1. Module indicators

| Indicator | Common meaning | What to do |
| --- | --- | --- |
| RUN LED | The module is operating normally | If off: check the power supply, mounting position on the base, system errors |
| ERR LED | There is a module error or axis error | Read the error code via buffer memory/X inputs, consult the manual |
| MODE LED | Operating mode status | Compare with the currently selected mode |

The LED names and their exact meanings come from SH-080058 — troubleshooting chapter; the table above is only a general description.

## 2. Common error groups

| Symptom | Possible cause | Check | Remedy |
| --- | --- | --- | --- |
| Module not READY | Insufficient power, Y0 not on, parameter error | Power LED, Y0/X0 status | Supply adequate power, turn on Y0, fix the faulty parameter |
| Y0 turned on but X0 does not come on | Module error, wrong axis parameters, system error | ERR LED, buffer error code | Clear the error, rewrite parameters, check the base |
| Run command issued but the axis does not move | Run not enabled, driver not servo-on, wrong pulse wiring | Enable signal, driver status, A/B pair | Turn on servo, check the differential pair, check COM |
| Moves in the wrong direction | A/B pair reversed or coordinate sign reversed | Wiring, sign of the position data | Swap the wire pair or change the sign per the configuration |
| Wrong distance | Wrong pulse/mm, wrong Pr.2/Pr.3/Pr.4 | Recalculate pulse/mm, compare with reality | Fix the unit parameters, run a short verification move |
| OPR does not finish | Dog not found, wrong direction, torque limit | Dog signal, origin search direction, Pr.54 | Adjust the dog position, direction, torque level |
| Driver reports overcurrent | Mechanical jam, acceleration too fast, phase misalignment | Driver current, load, acceleration time | Reduce acceleration, check the mechanics, check the wiring |

## 3. Error codes

For error codes consult the tables in SH-080058 — troubleshooting chapter; record the code plus source once verified. Do not infer the meaning of a code from the number.

When recording an incident, keep at minimum:

- The error code and the reference source.
- The axis and the mode that was running.
- The relevant parameters at the time of the fault.
- The Y0/X0 status and the LED indications.

## 4. Quick check sequence

1. Power supply and LED indicators.
2. READY state of the module and of the axis.
3. Error code in buffer memory.
4. Unit parameters versus actual movement.
5. Pulse wiring and the driver enable signal.
6. Mechanics: jams, backlash, hard limits.

## Further reading

- [Commissioning the QD75D4](/en/q/qd75/commissioning)
- [QD75D4 parameters](/en/q/qd75/parameters)
- [X/Y signals](/en/q/qd75/io-signals)
