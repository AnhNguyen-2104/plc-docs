---
title: "Q00UJCPU — CPU"
family: q
module: module-q00ujcpu
status: draft
source: SH-080483
---

<ModulePage id="q00ujcpu" />

## 1. Signal groups to wire

Q00UJCPU is a Q-series Universal CPU. The signal groups to wire are:

| Group | Signal | Direction | Notes |
| --- | --- | --- | --- |
| Power input | L, N | supply → CPU | Only Q00UJCPU has an integrated supply; Q03UDV/Q06UDH take 5 V through the base (SH-080483 §1.1 p.26) |
| Ground | LG, FG | — | Ground to ≤100 ohm; LG carries half the input voltage (SH-080483 §4.8.1 p.110) |
| Auxiliary 24 VDC | 24 VDC | power module → small load | Q62P supplies 0.6 A; Q61P/Q63P/Q64P have no 24 V output (SH-080483 §7.2.1 p.213–215) |
| Battery | Program-retention battery | — | Battery cover on the CPU face; replace with power off (SH-080483 §6.1.3 p.138) |
| Switch | RUN/STOP | — | CPU face switch; no field wiring |
| Programming port | Not verified in the parts-name table | bidirectional | USB/RS-232 ports are not listed in the parts-name table (SH-080483 §6.1.3 p.130/140/143) |
| Internal bus | Base connector | CPU ↔ base | Plugs into the CPU slot; no manual wiring |

## 2. Wiring principles

- **Connection type:** power terminals L/N/LG/FG + programming port — L, N, LG, FG and the programming port on the CPU face (SH-080483 §6.1.3, p. 132).
- Q00UJCPU feeds L/N directly; Q03UDV and Q06UDH have no field power terminals and take the 5 V rail through the base from the power module.
- The 5 V rail is internal to the base; never wire field signals to it.
- The RUN/STOP switch, battery cover and programming ports are on the CPU face; do not wire them.
- Tie LG and FG together and ground them; earth resistance ≤100 ohm, ground wire up to 2 mm² (SH-080483 §4.8.4 p.118).
- Route programming cables away from power wiring and secure them so the connector carries no strain.

## 3. Reference diagram

- Power and grounding: use [Q61P](/en/q/modules/m/q61p) and [Power and base](/en/q/system/power-and-base). L/N, LG/FG and the fuse apply; the 5 V rail is not a field wire.
- Slot: use [Q312B](/en/q/modules/m/q312b). Seating the CPU in the CPU slot applies; do not wire signals into the base.
- Ethernet: [QJ71E71-100](/en/q/modules/m/qj71e71-100) for the RJ45 style. Only the cable/connector style applies; its buffer-memory map does not apply to the built-in port.
- RS-232: [QJ71C24N](/en/q/modules/m/qj71c24n) for D-sub 9. Only the connector style applies; its pin table does not apply to the CPU port.

## 4. Manufacturer input/output circuits

The CPU face, ports, LEDs and battery cover for Q00UJCPU are in SH-080483 §6.1.3 (p. 132): <SourceRef doc="sh080483" page="132" />.

<ManualFigure
  src="/img/manual/q00ujcpu-parts.webp"
  alt="Q00UJCPU face: LEDs, USB/RS-232 ports, battery cover and connectors"
  caption="Manufacturer part names and ports for Q00UJCPU — power terminals L/N/LG/FG + programming port"
  doc="SH-080483"
  section="§6.1.3"
  page="132"
  pdf-url="https://www.mitsubishielectric.com/dl/fa/document/manual/plc/sh080483eng/sh080483engbc.pdf"
/>

The CPU group figure is also on [CPU group](/en/q/modules/cpu).

## 5. External device connections

- AC supply for Q00UJCPU: through a dedicated breaker/fuse, at the voltage in SH-080483 §1.1.
- Q03UDV/Q06UDH: confirm the rack 5 V total is below the power module rating before inserting the CPU.
- USB miniB cable for Q03UDV/Q06UDH; straight Ethernet cable to a hub/switch for Q03UDV; D-sub 9 cable for Q06UDH.
- Fit the program-retention battery in the correct orientation and compartment; replace with power off.

## 6. Checklist before power-up

- [ ] Power was switched off before wiring.
- [ ] CPU is seated in the correct base slot and the lock is engaged.
- [ ] Supply voltage matches the model range.
- [ ] LG and FG are grounded, earth resistance ≤100 ohm.
- [ ] Rack 5 V total is within the power module rating.
- [ ] Program-retention battery is fitted correctly.
- [ ] RUN/STOP switch is in STOP before downloading.
- [ ] Programming cable is in the correct port and carries no strain.
- [ ] No field wiring is connected to the 5 V rail.
