---
title: Commissioning the QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

# Commissioning the QD75D4

This procedure takes an axis from the fully wired state to loaded operation. Do not skip any step and do not merge steps.

## 1. Prerequisites

- The emergency stop button is wired and has been tested, independently of the PLC.
- Hard limit switches work at both ends of the stroke.
- The axis is **unloaded**, or has a light load of known mass.
- The test speed is set low; soft limits are within the safe stroke range.
- Axis parameters have been prepared and the units reviewed.
- A second person is present to observe during the first test run.

## 2. Commissioning steps

1. **Power up and check READY**
   - Observe: power LED, RUN LED, X0 status after turning Y0 on.
   - Record: power-up time, time to READY, any abnormal indication.

2. **Download parameters**
   - Observe: no errors after writing; the read-back values match the written values.
   - Record: the parameter set used, the write time, any errors.

3. **OPR**
   - Observe: origin search direction, when the dog is encountered, the stop point, the completion flag.
   - Record: origin position, number of revolutions/time, any errors.

4. **JOG**
   - Observe: direction of travel, low speed, mechanical noise, direction of the coordinate display.
   - Record: JOG speed, direction, mechanical remarks.

5. **Single block positioning**
   - Observe: arrival point versus target, acceleration/deceleration profile, completion signal.
   - Record: target position, measured position, error.

6. **Loaded operation**
   - Observe: repeatability error, vibration, driver temperature, noise.
   - Record: load, speed, error over several runs.

## 3. Real measurement table

| Date | Axis | Command | Target value | Measured value | Error | Speed | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| — | — | — | — | — | — | — | — |

Leave the table empty until real measurements are available; do not fill in fake numbers. Each row must be tied to a traceable run: date, axis, command, measuring instrument.

## 4. Conditions for moving to status: verified

This page keeps `status: draft`. Only switch to `verified` when:

- There is at least one real run on hardware matching the model stated in the title.
- The measurement table contains real data, with measuring instruments and the person who performed it.
- The error is within the pre-defined tolerance and has been recorded.
- The steps above have been fully performed, with no safety step skipped.

## Further reading

- [About OPR](/en/q/qd75/opr)
- [QD75D4 parameters](/en/q/qd75/parameters)
- [Troubleshooting](/en/q/qd75/troubleshooting)
