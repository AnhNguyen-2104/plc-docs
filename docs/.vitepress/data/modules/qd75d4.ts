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
    src: 'SH-080058 §5.2.1 p.5-18'
  },
  {
    no: 'Pr.2',
    name: 'Number of pulses per rotation (Ap)',
    range: '1 to 65535',
    unit: 'pulse',
    def: '20000',
    note: 'Pulse count for one motor rotation.',
    src: 'SH-080058 §5.2.1 p.5-18'
  },
  {
    no: 'Pr.3',
    name: 'Movement amount per rotation (Al)',
    range: 'Depends on Pr.1 unit (mm 0.1..6553.5 µm, inch/degree 0.00001..0.65535, pulse 1..65535)',
    def: '20000',
    note: 'Movement per motor rotation before unit magnification (Pr.4).',
    src: 'SH-080058 §5.2.1 p.5-18'
  },
  {
    no: 'Pr.4',
    name: 'Unit magnification (Am)',
    range: '1, 10, 100, 1000',
    def: '1',
    note: 'Multiplies Pr.3 when one rotation exceeds the Pr.3 maximum.',
    src: 'SH-080058 §5.2.1 p.5-18'
  },
  {
    no: 'Pr.5',
    name: 'Pulse output mode (operation mode)',
    range: '0: PULSE/SIGN, 1: CW/CCW, 2: A/B phase (x4), 3: A/B phase (x1)',
    note: 'Latched value at the first PLC READY (Y0) OFF to ON after power-on or CPU reset.',
    src: 'SH-080058 §5.2.1 p.5-20'
  },
  {
    no: 'Pr.6',
    name: 'Rotation direction setting',
    range: '0: current value increment with forward run pulse output, 1: current value increment with reverse run pulse output',
    def: '0',
    src: 'SH-080058 §5.2.1 p.5-20'
  },
  {
    no: 'Pr.7',
    name: 'Bias speed at start',
    range: 'Depends on Pr.1 unit',
    def: '0',
    note: 'Must not exceed Pr.8 speed limit value.',
    src: 'SH-080058 §5.2.1 p.5-24'
  },
  {
    no: 'Pr.8',
    name: 'Speed limit value',
    range: 'mm 0.01..20000000.00; pulse (QD75D) 1..1000000',
    unit: 'unit/min',
    def: '200000',
    note: 'Command speed is clamped to this value.',
    src: 'SH-080058 §5.2.2 p.5-24'
  },
  {
    no: 'Pr.9',
    name: 'Acceleration time 0',
    range: '1 to 8388608',
    unit: 'ms',
    def: '1000',
    src: 'SH-080058 §5.2.2 p.5-24'
  },
  {
    no: 'Pr.10',
    name: 'Deceleration time 0',
    range: '1 to 8388608',
    unit: 'ms',
    def: '1000',
    src: 'SH-080058 §5.2.2 p.5-24'
  },
  {
    no: 'Pr.54',
    name: 'OPR torque limit value',
    range: '1 to 300',
    unit: '%',
    def: '300',
    note: 'Torque limit applied during machine OPR creep and stopper stop.',
    src: 'SH-080058 §5.2.6 p.5-54'
  },
  {
    no: 'Pr.56',
    name: 'Speed designation during OP shift',
    range: '0: OPR speed (Pr.46), 1: creep speed (Pr.47)',
    def: '0',
    src: 'SH-080058 §5.2.6 p.5-54'
  }
]

export const daRows: Row[] = [
  {
    no: 'Da.1',
    name: 'Operation pattern',
    range: '00: Positioning complete, 01: Continuous positioning control, 11: Continuous path control',
    def: '00',
    src: 'SH-080058 §5.3 p.5-59'
  },
  {
    no: 'Da.2',
    name: 'Control system',
    range: 'Control system code (ABS/INC linear, fixed-feed, circular, helical, speed, speed-position, position-speed, NOP, POS, JUMP, LOOP, LEND)',
    note: 'Covers 1-speed and 2-speed speed control, speed-position and position-speed switching.',
    src: 'SH-080058 §5.3 p.5-59'
  },
  {
    no: 'Da.3',
    name: 'Acceleration time No.',
    range: '0: Pr.9, 1: Pr.25, 2: Pr.26, 3: Pr.27',
    def: '0',
    src: 'SH-080058 §5.3 p.5-60'
  },
  {
    no: 'Da.4',
    name: 'Deceleration time No.',
    range: '0: Pr.10, 1: Pr.28, 2: Pr.29, 3: Pr.30',
    def: '0',
    src: 'SH-080058 §5.3 p.5-60'
  },
  {
    no: 'Da.5',
    name: 'Axis to be interpolated',
    range: '0: Axis 1, 1: Axis 2, 2: Axis 3, 3: Axis 4',
    def: '0',
    note: 'Setting the self-axis causes an error.',
    src: 'SH-080058 §5.1.4 p.5-8'
  },
  {
    no: 'Da.6',
    name: 'Positioning address / movement amount',
    range: 'Depends on Pr.1 unit and Da.2 control system',
    note: '32-bit value: target address for ABS, movement amount for INC and fixed-feed.',
    src: 'SH-080058 §5.1.4 p.5-8'
  },
  {
    no: 'Da.7',
    name: 'Arc address',
    range: 'Depends on Pr.1 unit and Da.2 control system',
    note: 'Sub point or center point for circular and helical interpolation.',
    src: 'SH-080058 §5.1.4 p.5-8'
  },
  {
    no: 'Da.8',
    name: 'Command speed',
    range: '-1: current speed; 0.01..20000000.00 mm/min (unit-dependent)',
    unit: 'unit/min',
    def: '0',
    note: '-1 keeps the current speed.',
    src: 'SH-080058 §5.3 p.5-70'
  },
  {
    no: 'Da.9',
    name: 'Dwell time',
    range: '0..65535 (JUMP: destination positioning data No. 1..600)',
    unit: 'ms',
    def: '0',
    note: 'Acts as the JUMP destination positioning data No. when Da.2 is JUMP.',
    src: 'SH-080058 §5.3 p.5-70'
  },
  {
    no: 'Da.10',
    name: 'M code',
    range: '0..65535 (JUMP 0..10, LOOP 1..65535, helical 0..999)',
    def: '0',
    note: 'Condition data No. or LOOP repetition count depending on Da.2.',
    src: 'SH-080058 §5.3 p.5-70'
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
    axis: 'all',
    x: 'X0',
    y: '—',
    name: 'QD75 READY',
    desc: 'Module-to-CPU ready signal, ON when the QD75 is ready.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: 'all',
    x: 'X1',
    y: '—',
    name: 'Synchronization flag',
    desc: 'ON when the QD75 buffer memory is accessible from the CPU module.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: 'all',
    x: '—',
    y: 'Y0',
    name: 'PLC READY',
    desc: 'CPU-to-module signal that notifies the QD75 that the CPU module is normal.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: '1-4',
    x: 'X4–X7',
    y: '—',
    name: 'M code ON',
    desc: 'Turns ON for each axis while its M code is being output.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: '1-4',
    x: 'X8–XB',
    y: '—',
    name: 'Error detection',
    desc: 'Turns ON for an axis when the module detects an error.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: '1-4',
    x: 'XC–XF',
    y: '—',
    name: 'BUSY',
    desc: 'Turns ON for an axis while positioning operation is in progress.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: '1-4',
    x: 'X10–X13',
    y: '—',
    name: 'Start complete',
    desc: 'Turns ON for an axis when the start command has been accepted.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: '1-4',
    x: 'X14–X17',
    y: '—',
    name: 'Positioning complete',
    desc: 'Turns ON for an axis when positioning for the data No. is complete.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: '1-4',
    x: '—',
    y: 'Y4–Y7',
    name: 'Axis stop',
    desc: 'CPU-to-module command that stops the corresponding axis.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: '1-4',
    x: '—',
    y: 'Y8 / YA / YC / YE',
    name: 'Forward run JOG start',
    desc: 'Forward run JOG start command for axes 1 to 4.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: '1-4',
    x: '—',
    y: 'Y9 / YB / YD / YF',
    name: 'Reverse run JOG start',
    desc: 'Reverse run JOG start command for axes 1 to 4.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: '1-4',
    x: '—',
    y: 'Y10–Y13',
    name: 'Positioning start',
    desc: 'Positioning start command for axes 1 to 4.',
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: '1-4',
    x: '—',
    y: 'Y14–Y17',
    name: 'Execution prohibition flag',
    desc: 'Execution prohibition flag for axes 1 to 4.',
    src: 'SH-080058 §3.3.1 p.3-16'
  }
]

export const modelTable: { model: string; output: string; axes: number; note: string }[] = [
  { model: 'QD75P1', output: 'Open collector', axes: 1, note: 'Discontinued Sep 2021 - replaced by QD75P1N (ngừng sản xuất 09/2021, SH-080058 A-19)' },
  { model: 'QD75P2', output: 'Open collector', axes: 2, note: 'Discontinued Sep 2021 - replaced by QD75P2N (ngừng sản xuất 09/2021, SH-080058 A-19)' },
  { model: 'QD75P4', output: 'Open collector', axes: 4, note: 'Discontinued Sep 2021 - replaced by QD75P4N (ngừng sản xuất 09/2021, SH-080058 A-19)' },
  { model: 'QD75D1', output: 'Differential driver', axes: 1, note: 'Discontinued Sep 2021 - replaced by QD75D1N (ngừng sản xuất 09/2021, SH-080058 A-19)' },
  { model: 'QD75D2', output: 'Differential driver', axes: 2, note: 'Discontinued Sep 2021 - replaced by QD75D2N (ngừng sản xuất 09/2021, SH-080058 A-19)' },
  { model: 'QD75D4', output: 'Differential driver', axes: 4, note: 'Discontinued Sep 2021 - replaced by QD75D4N (ngừng sản xuất 09/2021, SH-080058 A-19)' },
  { model: 'QD75P1N', output: 'Open collector', axes: 1, note: 'Current replacement (bản thay thế, SH-080058 phụ lục 1.2)' },
  { model: 'QD75P2N', output: 'Open collector', axes: 2, note: 'Current replacement (bản thay thế, SH-080058 phụ lục 1.2)' },
  { model: 'QD75P4N', output: 'Open collector', axes: 4, note: 'Current replacement (bản thay thế, SH-080058 phụ lục 1.2)' },
  { model: 'QD75D1N', output: 'Differential driver', axes: 1, note: 'Current replacement (bản thay thế, SH-080058 phụ lục 1.2)' },
  { model: 'QD75D2N', output: 'Differential driver', axes: 2, note: 'Current replacement (bản thay thế, SH-080058 phụ lục 1.2)' },
  { model: 'QD75D4N', output: 'Differential driver', axes: 4, note: 'Current replacement (bản thay thế, SH-080058 phụ lục 1.2)' }
]

export const qd75Specs: { axes: number; outputType: string; pointsPerAxis: number; src: string } = {
  axes: 4,
  outputType: 'Differential driver',
  pointsPerAxis: 600,
  src: 'SH-080058 §3.1 p.3-2'
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
