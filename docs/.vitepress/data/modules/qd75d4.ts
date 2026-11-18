export type Row = {
  no: string
  name: string
  range: string
  unit?: string
  def?: string
  note?: string
  src: string
}

export const prRows: Row[] = [
  {
    no: 'Pr.1',
    name: 'Unit setting',
    range: '0: mm, 1: inch, 2: degree, 3: pulse',
    def: '0',
    note: 'Per-axis unit used by positioning addresses and speed values.',
    src: 'SH-080058 — ch. parameter list'
  },
  {
    no: 'Pr.2',
    name: 'Number of pulses per rotation (Ap)',
    range: '1 to 65535',
    unit: 'pulse',
    def: '20000',
    note: 'Pulse count for one motor rotation.',
    src: 'SH-080058 — ch. parameter list'
  },
  {
    no: 'Pr.3',
    name: 'Movement amount per rotation (Al)',
    range: 'Depends on Pr.1 unit',
    def: '20000',
    note: 'Movement per motor rotation before unit magnification (Pr.4).',
    src: 'SH-080058 — ch. parameter list'
  },
  {
    no: 'Pr.4',
    name: 'Unit magnification (Am)',
    range: '1, 10, 100, 1000',
    def: '1',
    note: 'Multiplies Pr.3 when one rotation exceeds the Pr.3 maximum.',
    src: 'SH-080058 — ch. parameter list'
  },
  {
    no: 'Pr.5',
    name: 'Pulse output mode (operation mode)',
    range: '0: PULSE/SIGN, 1: CW/CCW, 2: A/B phase (x4), 3: A/B phase (x1)',
    note: 'Latched value at the first PLC READY (Y0) OFF to ON after power-on or CPU reset.',
    src: 'SH-080058 — ch. parameter list'
  },
  {
    no: 'Pr.6',
    name: 'Rotation direction setting',
    range: '0: current value increment with forward run pulse output, 1: current value increment with reverse run pulse output',
    def: '0',
    src: 'SH-080058 — ch. parameter list'
  },
  {
    no: 'Pr.7',
    name: 'Bias speed at start',
    range: 'Depends on Pr.1 unit',
    def: '0',
    note: 'Must not exceed Pr.8 speed limit value.',
    src: 'SH-080058 — ch. parameter list'
  },
  {
    no: 'Pr.8',
    name: 'Speed limit value',
    range: 'Depends on Pr.1 unit (mm: 0 to 20000000.00 mm/min)',
    unit: 'unit/min',
    def: '200000',
    note: 'Command speed is clamped to this value.',
    src: 'SH-080058 — ch. parameter list'
  },
  {
    no: 'Pr.9',
    name: 'Acceleration time 0',
    range: '1 to 8388608',
    unit: 'ms',
    def: '1000',
    src: 'SH-080058 — ch. parameter list'
  },
  {
    no: 'Pr.10',
    name: 'Deceleration time 0',
    range: '1 to 8388608',
    unit: 'ms',
    def: '1000',
    src: 'SH-080058 — ch. parameter list'
  },
  {
    no: 'Pr.54',
    name: 'OPR torque limit value',
    range: '1 to 300',
    unit: '%',
    def: '300',
    note: 'Torque limit applied during machine OPR creep and stopper stop.',
    src: 'SH-080058 — ch. OPR parameter'
  },
  {
    no: 'Pr.56',
    name: 'Speed designation during OP shift',
    range: '0: OPR speed (Pr.46), 1: creep speed (Pr.47)',
    def: '0',
    src: 'SH-080058 — ch. OPR parameter'
  }
]

export const daRows: Row[] = [
  {
    no: 'Da.1',
    name: 'Operation pattern',
    range: '00: Positioning complete, 01: Continuous positioning control, 11: Continuous path control',
    def: '00',
    src: 'SH-080058 — ch. positioning data'
  },
  {
    no: 'Da.2',
    name: 'Control system',
    range: 'Control system code (ABS/INC linear, fixed-feed, circular, helical, speed, speed-position, position-speed, NOP, POS, JUMP, LOOP, LEND)',
    note: 'Covers 1-speed and 2-speed speed control, speed-position and position-speed switching.',
    src: 'SH-080058 — ch. positioning data'
  },
  {
    no: 'Da.3',
    name: 'Acceleration time No.',
    range: '0: Pr.9, 1: Pr.25, 2: Pr.26, 3: Pr.27',
    def: '0',
    src: 'SH-080058 — ch. positioning data'
  },
  {
    no: 'Da.4',
    name: 'Deceleration time No.',
    range: '0: Pr.10, 1: Pr.28, 2: Pr.29, 3: Pr.30',
    def: '0',
    src: 'SH-080058 — ch. positioning data'
  },
  {
    no: 'Da.5',
    name: 'Axis to be interpolated',
    range: '0: Axis 1, 1: Axis 2, 2: Axis 3, 3: Axis 4',
    def: '0',
    note: 'Setting the self-axis causes an error.',
    src: 'SH-080058 — ch. positioning data'
  },
  {
    no: 'Da.6',
    name: 'Positioning address / movement amount',
    range: 'Depends on Pr.1 unit and Da.2 control system',
    note: '32-bit value: target address for ABS, movement amount for INC and fixed-feed.',
    src: 'SH-080058 — ch. positioning data'
  },
  {
    no: 'Da.7',
    name: 'Arc address',
    range: 'Depends on Pr.1 unit and Da.2 control system',
    note: 'Sub point or center point for circular and helical interpolation.',
    src: 'SH-080058 — ch. positioning data'
  },
  {
    no: 'Da.8',
    name: 'Command speed',
    range: '-1: current speed, otherwise up to Pr.8 speed limit value',
    unit: 'unit/min',
    def: '-1',
    src: 'SH-080058 — ch. positioning data'
  },
  {
    no: 'Da.9',
    name: 'Dwell time',
    range: '0 to 65535',
    unit: 'ms',
    def: '0',
    note: 'Acts as the JUMP destination positioning data No. when Da.2 is JUMP.',
    src: 'SH-080058 — ch. positioning data'
  },
  {
    no: 'Da.10',
    name: 'M code',
    range: '0 to 65535',
    def: '0',
    note: 'Condition data No. or LOOP repetition count depending on Da.2.',
    src: 'SH-080058 — ch. positioning data'
  }
]

export type Signal = {
  axis: string
  x: string
  y: string
  name: string
  desc: string
  src: string
}

export const xySignals: Signal[] = [
  {
    axis: '-',
    x: 'X0',
    y: 'Y0',
    name: 'QD75 READY / PLC READY',
    desc: 'X0 is ON when the module is ready; Y0 is the CPU-side PLC READY command to the QD75.',
    src: 'SH-080058 — ch. I/O signals'
  },
  {
    axis: '-',
    x: 'X1',
    y: '-',
    name: 'Synchronization flag',
    desc: 'ON when the QD75 buffer memory is accessible (interlock for sequence program access).',
    src: 'SH-080058 — ch. I/O signals'
  },
  {
    axis: '1 to 4',
    x: 'X4 to X7',
    y: '-',
    name: 'M code ON',
    desc: 'Axis 1 to 4 M code output signal.',
    src: 'SH-080058 — ch. I/O signals'
  },
  {
    axis: '1 to 4',
    x: 'X8 to XB',
    y: '-',
    name: 'Error detection',
    desc: 'Axis 1 to 4 error detection signal.',
    src: 'SH-080058 — ch. I/O signals'
  },
  {
    axis: '1 to 4',
    x: 'XC to XF',
    y: '-',
    name: 'BUSY',
    desc: 'Axis 1 to 4 BUSY (operating) signal.',
    src: 'SH-080058 — ch. I/O signals'
  },
  {
    axis: '1 to 4',
    x: 'X10 to X13',
    y: 'Y10 to Y13',
    name: 'Start complete / Positioning start',
    desc: 'X10 to X13 report start completion; Y10 to Y13 are the per-axis positioning start commands.',
    src: 'SH-080058 — ch. I/O signals'
  },
  {
    axis: '1 to 4',
    x: 'X14 to X17',
    y: '-',
    name: 'Positioning complete',
    desc: 'Axis 1 to 4 positioning complete signal.',
    src: 'SH-080058 — ch. I/O signals'
  },
  {
    axis: '1 to 4',
    x: '-',
    y: 'Y4 to Y7',
    name: 'Axis stop',
    desc: 'Axis 1 to 4 stop command from the CPU module.',
    src: 'SH-080058 — ch. I/O signals'
  },
  {
    axis: '1 to 4',
    x: '-',
    y: 'Y8 to YF',
    name: 'JOG start (forward / reverse)',
    desc: 'Forward run and reverse run JOG start commands for axes 1 to 4.',
    src: 'SH-080058 — ch. I/O signals'
  },
  {
    axis: '1 to 4',
    x: '-',
    y: 'Y14 to Y17',
    name: 'Execution prohibition flag',
    desc: 'Axis 1 to 4 execution prohibition flag.',
    src: 'SH-080058 — ch. I/O signals'
  }
]

export const modelTable: { model: string; output: string; axes: number; note: string }[] = [
  { model: 'QD75P1', output: 'Open collector', axes: 1, note: 'Discontinued Sep 2021 - replaced by QD75P1N' },
  { model: 'QD75P2', output: 'Open collector', axes: 2, note: 'Discontinued Sep 2021 - replaced by QD75P2N' },
  { model: 'QD75P4', output: 'Open collector', axes: 4, note: 'Discontinued Sep 2021 - replaced by QD75P4N' },
  { model: 'QD75D1', output: 'Differential driver', axes: 1, note: 'Discontinued Sep 2021 - replaced by QD75D1N' },
  { model: 'QD75D2', output: 'Differential driver', axes: 2, note: 'Discontinued Sep 2021 - replaced by QD75D2N' },
  { model: 'QD75D4', output: 'Differential driver', axes: 4, note: 'Discontinued Sep 2021 - replaced by QD75D4N' },
  { model: 'QD75P1N', output: 'Open collector', axes: 1, note: 'Current replacement (FA-A-0286)' },
  { model: 'QD75P2N', output: 'Open collector', axes: 2, note: 'Current replacement (FA-A-0286)' },
  { model: 'QD75P4N', output: 'Open collector', axes: 4, note: 'Current replacement (FA-A-0286)' },
  { model: 'QD75D1N', output: 'Differential driver', axes: 1, note: 'Current replacement (FA-A-0286)' },
  { model: 'QD75D2N', output: 'Differential driver', axes: 2, note: 'Current replacement (FA-A-0286)' },
  { model: 'QD75D4N', output: 'Differential driver', axes: 4, note: 'Current replacement (FA-A-0286)' }
]

export const qd75Specs: { axes: number; outputType: string; pointsPerAxis: number; src: string } = {
  axes: 4,
  outputType: 'Differential driver',
  pointsPerAxis: 600,
  src: 'SH-080058 — ch. specifications'
}

export const unitExamples: {
  label: string
  pr2: string
  pr3: string
  pr4: string
  formula: string
  pulsesPerMm: string
  src: string
}[] = [
  {
    label: 'mm, 100 pulse/mm',
    pr2: '10000',
    pr3: '100',
    pr4: '1',
    formula: 'pulses/mm = (Pr.2 x Pr.4) / Pr.3 = (10000 x 1) / 100',
    pulsesPerMm: '100',
    src: 'SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4'
  },
  {
    label: 'mm, 10000 pulse/mm',
    pr2: '10000',
    pr3: '10',
    pr4: '10',
    formula: 'pulses/mm = (Pr.2 x Pr.4) / Pr.3 = (10000 x 10) / 10',
    pulsesPerMm: '10000',
    src: 'SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4'
  },
  {
    label: 'degree (Pr.1 = 2), 27.78 pulse/degree',
    pr2: '10000',
    pr3: '360',
    pr4: '1',
    formula: 'pulses/degree = (Pr.2 x Pr.4) / Pr.3 = (10000 x 1) / 360',
    pulsesPerMm: '27.78',
    src: 'SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4'
  }
]
