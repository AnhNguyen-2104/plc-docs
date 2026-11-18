---
title: Positioning basics
family: common
status: draft
---

# Positioning basics

This page is not tied to any vendor or specific model. The goal is to agree on vocabulary and calculations before reading the documentation for a real module.

## 1. Two ways to command motion

| Command method | Nature of the signal | Position control | Speed control |
| --- | --- | --- | --- |
| Pulse (pulse train) | A digital pulse train; each pulse corresponds to an amount of travel | Determined by the number of pulses | Determined by the pulse frequency |
| Analog | ±10 V voltage (or 4–20 mA current) | Not directly; requires a closed loop and feedback encoder | Determined by the voltage magnitude |

With pulse control, the controller does not need to know the actual position in order to issue a command; it only counts pulses. Position error therefore depends on mechanical calibration and on whether feedback is processed.

## 2. Units and how to convert them to pulses

An axis is usually described in mechanical quantities (mm, degrees, inches), while the module works in pulses. A clear conversion factor is needed.

Input quantities:

- Pulses per revolution of the motor/encoder.
- Mechanical travel per revolution (lead screw pitch, pulley circumference, gearbox ratio).
- Unit magnification factor, if the module allows it to be declared.

Formula:

```text
pulse/mm = ( pulses per revolution × unit magnification ) / travel per revolution
```

### Illustration only, not module data

Assume (the numbers below only illustrate the calculation, they are not the parameters of any module):

- 4096 pulses per revolution.
- Unit magnification = 1.
- Lead screw pitch 8 mm per revolution.

```text
pulse/mm = (4096 × 1) / 8 = 512 pulse/mm
```

That means travelling 100 mm requires 51 200 pulses. If you switch to degrees with a 360°/revolution rotary table, the same pulse count gives 4096/360 ≈ 11.38 pulse/degree.

## 3. Absolute and relative positioning

| Type | Meaning of the coordinate | When to use |
| --- | --- | --- |
| Absolute | Coordinate measured from an established reference origin | Machines with a fixed origin that must return to the exact point regardless of where they are |
| Relative (incremental) | Distance measured from the current position | Uniform stepping, repeated part feeding, independent of the origin |

Absolute positioning requires a valid origin. If the origin is wrong, every absolute point is wrong with it, whereas relative commands still travel the correct distance but drift over time due to accumulated error.

## 4. Acceleration, deceleration and the velocity profile

An axis cannot jump instantly from 0 to run speed. The acceleration and deceleration times determine the velocity profile. The common shape is a trapezoid: linear acceleration, constant run, linear deceleration.

```mermaid
flowchart LR
  A[Start command] --> B[Accelerate]
  B --> C[Constant run]
  C --> D[Decelerate]
  D --> E[In positioning range]
  E --> F[Positioning complete]
```

Quantities that must be declared:

- Acceleration time: how long it takes from 0 to run speed.
- Deceleration time: how long it takes from run speed back to 0.
- Speed limit: the ceiling the module allows, independent of the command.
- Startup speed / lower limit if the mechanism requires it.

The minimum distance to reach run speed in a trapezoidal profile is approximately:

```text
S_min ≈ v × (t_accel + t_decel) / 2
```

With v = 200 mm/s, t_accel = 100 ms, t_decel = 100 ms, S_min ≈ 20 mm. A shorter command becomes a triangular profile (it does not reach the set speed). This is an illustration of the calculation.

## 5. Dwell time

Dwell is the interval held at the target point before the next step is executed. Use it when the mechanism needs to settle, a clamp needs to close, or machining needs to finish. Too short a dwell causes vibration and error; too long reduces throughput. Dwell is a per-step parameter, not an axis parameter.

## 6. The M code concept

An M code (miscellaneous code) is a number attached to a run step to coordinate with external equipment. The module does not interpret the M code itself; it only outputs the code and waits for acknowledgement. Typical sequence:

1. The run step starts and outputs the M code.
2. The PLC program reads the code and performs the corresponding action (clamp, weld, dispense glue).
3. The PLC confirms that processing is complete.
4. The run step continues or ends.

This way the custom logic lives in the PLC, while the module handles pulse output and position management.

## 7. In-position and positioning complete

Two concepts that are easily confused:

- **In-position:** the axis has entered a tolerance window around the target point. This signal turns on earlier and is used to start secondary actions.
- **Positioning complete:** the run step has fully ended; no pulses are being output and no dwell or M code is pending.

Only use "positioning complete" to advance to the next step if that step depends on an exact position. Using "in-position" for tolerance-insensitive actions reduces cycle time.

## 8. Effect of the PLC scan cycle

A run command is issued only when the PLC program has finished processing the logic. The scan time therefore creates a delay between the physical event and the executed command.

Illustration: a 10 ms scan cycle versus 2 ms. If an input signal appears right after the PLC has read its inputs, it must wait almost a full cycle to be processed. The average delay difference between the two configurations is about (10 − 2)/2 = 4 ms, not counting the module's pulse output delay and mechanical delay. At an axis speed of 200 mm/s, 4 ms corresponds to 0.8 mm — large enough to affect the stop point if stopping is done in software.

Ways to reduce the effect:

- Use interrupt inputs or the module's hardware stop signal instead of stopping via scan logic.
- Keep the scan program short and avoid heavy loops.
- Set tolerances and stop positions accounting for the delay.

## 9. Safety

⚠️ Software is not the final protective layer.

- Hard limit switches must cut power or cut the run enable, independently of the program.
- The emergency stop button must act directly on the power/servo circuit, not through the PLC.
- The module's soft limits are only an additional layer, not a replacement for hard limits.
- During testing, run unloaded, at low speed, with a person watching.

## Further reading

- [MELSEC Q — documentation hub](/en/q/)
- [QD75D4 — 4-axis positioning module](/en/q/qd75/)
