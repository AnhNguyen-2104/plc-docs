---
title: Ladder and startup sequence for the QD75D4
family: q
module: qd75d4
status: draft
source: SH-080058
---

<script setup>
const tabs = [
  {
    label: 'IL — initialization',
    lang: 'il',
    code: `(* Write parameters before turning READY on.
   For address <Pr.x> consult SH-080058, parameters chapter. *)
LD   M8000
TO   U0\\G<Pr1>  K<Pr.1 value>  K1
TO   U0\\G<Pr2>  K<Pr.2 value>  K1
TO   U0\\G<Pr3>  K<Pr.3 value>  K1
TO   U0\\G<Pr4>  K<Pr.4 value>  K1

(* Turn PLC READY on, then wait for module READY. *)
LD   M500          (* start enable, illustration *)
OUT  Y0
LD   X0
OUT  M501          (* QD75 READY *)`
  },
  {
    label: 'IL — run command',
    lang: 'il',
    code: `(* Only run when the module is READY and there is no error. *)
LD   M501
AND  X<axis no error>
AND  X<run enable>
PLS  M600

LD   M600
TO   U0\\G<axis start Cd.>  K<axis number>  K1

(* Wait for positioning complete before advancing the step. *)
LD   X<axis positioning complete>
OUT  M602`
  }
]
</script>

# Ladder and startup sequence for the QD75D4

The M/D/X/Y device numbers in the examples are illustrative choices, not mandatory conventions. Buffer memory addresses are written as symbols `<Pr.x>` / `<Cd.x>` — they must be cross-checked against the tables in SH-080058 before use.

## 1. Buffer memory access

Two equivalent methods:

| Method | Syntax | Characteristics |
| --- | --- | --- |
| Direct | `U<base>\G<addr>` | Short, usable directly in read/write instructions; base 0 is the first module on the base |
| Indirect via instruction | `FROM` / `TO` | Convenient for reading/writing several consecutive words, easy to parameterise |

- `TO U0\G<addr> <value> K1` writes one word.
- `FROM U0\G<addr> D100 K4` reads 4 words into D100..D103.

With the QD75D4, `U0` assumes the module is in the first slot; change the base/slot to match the actual configuration.

## 2. Startup sequence

1. Write the required Pr. parameters.
2. Turn on Y0 (PLC READY).
3. Wait for X0 (QD75 READY) to turn on.
4. Check the axis synchronisation flag and that there are no errors.
5. Issue the axis start command via buffer memory.
6. Wait for positioning complete or the M code.

Do not issue a run command before X0 turns on. After writing parameters, a refresh/validation cycle is needed — see [X/Y signals](/en/q/qd75/io-signals).

## 3. IL example

<CodeTabs :tabs="tabs" />

<LadderDiagram />

Five rungs: write Pr.1–Pr.5, turn on Y0/wait for X0, read back and enable the run.

## 4. Safety interlocks

A minimal interlock example, placed ahead of every run command:

```il
LD   X<emergency stop NC>      (* loss of signal = stop *)
AND  X<limit +>
AND  X<limit ->
AND  M<operation enable>
AND  M501                 (* module READY *)
OUT  M610                 (* common run condition *)
```

Principles:

- The emergency stop uses a normally closed contact; loss of signal means stop.
- Hard limits cut the run condition, not merely report an error.
- Run commands must pass through the common condition and must not be bypassed with auxiliary flags.
- The E-stop must still act directly on the power circuit, independently of this ladder.

## Further reading

- [X/Y signals](/en/q/qd75/io-signals)
- [Position data](/en/q/qd75/position-data)
- [Commissioning](/en/q/qd75/commissioning)
