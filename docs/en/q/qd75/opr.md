---
title: Origin point return (OPR) — QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

# Origin point return (OPR) — QD75D4

OPR (origin point return) is the step that establishes the coordinate origin for the axis. Only after a successful OPR does absolute positioning mode become meaningful. Relative positioning still works but will drift if the origin is wrong.

The OPR method is determined by **Pr.43** (SH-080058 §5.2.5 p.5-45). Two accompanying parameters:

- Pr.54 — torque limit during OPR, 1…300 %, default 300 (SH-080058 §5.2.6 p.5-54).
- Pr.56 — speed during movement in OPR: `0` uses the OPR speed (Pr.46), `1` uses the creep speed (Pr.47) (SH-080058 §5.2.6 p.5-54).

## 1. OPR methods (Pr.43)

| Code | Method | Principle |
| --- | --- | --- |
| 0 | Near-point dog | The axis moves to find the dog signal, decelerates, then searches for the motor/driver zero point |
| 1 | Stopper 1 | Push against a hard stop, detect via the torque limit, then set the origin |
| 2 | Stopper 2 | For details consult SH-080058 §5.2.5 (p.5-45) |
| 3 | Stopper 3 | For details consult SH-080058 §5.2.5 (p.5-45) |
| 4 | Count method 1 | Count accumulated pulses to determine the origin point per the configuration |
| 5 | Count method 2 | For details consult SH-080058 §5.2.5 (p.5-45) |

For the method codes and the conditions under which each applies, consult SH-080058 §5.2.5 (p.5-45).

**Data set is not a Pr.43 method.** Resetting the current value (current value change) is a separate function and is not in the 0–5 list above; use it when a coordinate must be assigned without moving the axis.

## 2. OPR sequence using the near-point dog

1. Receive the OPR command; check that the axis is not busy and has no errors.
2. Move in the origin search direction at the OPR speed.
3. On encountering the dog signal, decelerate and switch to creep speed.
4. Leave the dog or reach the zero point, and record the origin position.
5. Stop the axis and update the OPR complete flag.

In steps 3–4, the torque limit (Pr.54) protects the mechanism if the axis hits an obstacle before reaching the origin point. The speed in the final movement step uses Pr.56.

## 3. Advantages and disadvantages

| Method | Advantages | Disadvantages |
| --- | --- | --- |
| Near-point dog | High repeatability, standard for machines with a long stroke | Requires an additional dog and sensor, and takes time to search |
| Count method 1 / 2 | No additional hardware along the stroke | Depends on the counter's continuity; a lost pulse means a lost origin |
| Stopper 1 / 2 / 3 | Simple, suitable for short strokes | Creates mechanical pressing force and wear, unsuitable for sensitive axes |

## 4. Conditions for a successful OPR

- Axis parameters have been written and are in effect.
- The origin search direction, OPR speed and creep speed have been declared correctly.
- The dog signal is stable and free of noise.
- The axis is in the READY state with no uncleared errors.
- The torque limit (Pr.54) is set appropriately so as not to press too hard.

## Further reading

- [QD75D4 parameters](/en/q/qd75/parameters)
- [Commissioning the QD75D4](/en/q/qd75/commissioning)
- [Troubleshooting](/en/q/qd75/troubleshooting)
