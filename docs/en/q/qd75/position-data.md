---
title: Position data (Da.) — QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

<script setup>
import { daRows } from '../../../.vitepress/data/modules/qd75d4.ts'
</script>

# Position data (Da.) — QD75D4

Each run point is one set of position data. The QD75D4 stores up to 600 points per axis; this point count is independent of the number of axes.

## 1. Data fields

<ParamTable :rows="daRows" title="Position data (Da.)" />

Ten fields (Da.1–Da.10); the order and value ranges follow SH-080058 §5.3 (p.5-59…5-71). Their meaning:

- **Operation pattern:** stop after one point, continue to the next point, or continue along a continuous path.
- **Control system:** the point's control type code — linear ABS/INC, fixed-pitch feed, circular interpolation, helical interpolation, speed control, speed–position, position–speed, NOP, POS, JUMP, LOOP, LEND.
- **Acceleration time number:** selects the acceleration time set in the parameter table; set number 0 uses Pr.9 (SH-080058 §5.2.2 p.5-24).
- **Deceleration time number:** selects the deceleration time set in the parameter table; set number 0 uses Pr.10 (SH-080058 §5.2.2 p.5-24).
- **Interpolation axis:** the axis coordinated during interpolation; setting it equal to the current axis causes an error.
- **Coordinate / displacement:** a 32-bit value — the target coordinate for ABS, the distance for INC and fixed-pitch feed.
- **Arc address:** the auxiliary point or centre for circular/helical interpolation.
- **Command speed:** the point's speed; a value of -1 means keep the current speed.
- **Dwell time:** hold at the target; when the control type is JUMP, this field is the target point number to jump to.
- **M code:** the number used to coordinate external equipment; with some control types this field carries the condition data number or the LOOP repetition count.

## 2. Three control systems

1. **Single speed:** travel to the target at one speed, accelerating at the start and decelerating at the end according to the selected times. Used for ordinary point-to-point moves.
2. **Two speeds:** travel at high speed to an intermediate point, then switch to low speed to the target. Used when a slow approach is needed to avoid impact or to wait for a signal.
3. **Speed–position:** travel at speed over a distance, then switch to positioning toward the target. Used for long part feeding or when the start point varies.

The three types differ only in how the acceleration – constant run – deceleration segments are divided; the pulse output mechanism and completion handshake are the same.

## 3. The 600-point limit and its relation to Pr.

- 600 points/axis is a storage limit, not a limit on the number of runs.
- Once the limit is exceeded, new points cannot be added; old points must be erased or overwritten. Writing outside the range is reported by the module as an error — for the error code consult SH-080058.
- Speeds in Da. are capped by the axis speed limit (Pr.8, SH-080058 §5.2.2 p.5-24); setting a higher value is rejected or clamped depending on the configuration.
- The Da. acceleration/deceleration times are selected by set number; the default time sets come from Pr.9/Pr.10 (SH-080058 §5.2.2 p.5-24).

## 4. Sequence for writing position data

1. The axis is in the READY state and not running.
2. Write each Da. field via buffer memory (using `TO`/`U<base>\G<addr>`).
3. Read back to confirm.
4. Test each point at low speed.

For the buffer memory address of each field, consult SH-080058 — position data chapter.

## Further reading

- [QD75D4 parameters](/en/q/qd75/parameters)
- [Ladder and startup](/en/q/qd75/ladder)
- [Commissioning](/en/q/qd75/commissioning)
