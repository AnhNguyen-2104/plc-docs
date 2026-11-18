import type { Loc } from '../families'

export type Row = {
  no: string
  name: Loc
  range: Loc
  unit?: Loc
  def?: Loc
  note?: Loc
  src: string
  srcDoc?: string
  srcPage?: string
}

export const prRows: Row[] = [
  {
    no: 'Pr.1',
    name: { vi: 'Đơn vị đặt — Unit setting', en: 'Unit setting' },
    range: {
      vi: '0: mm, 1: inch, 2: độ (degree), 3: xung (pulse)',
      en: '0: mm, 1: inch, 2: degree, 3: pulse'
    },
    def: { vi: '0', en: '0' },
    note: {
      vi: 'Đơn vị theo trục dùng cho địa chỉ vị trí và tốc độ (Per-axis unit used by positioning addresses and speed values).',
      en: 'Per-axis unit used by positioning addresses and speed values.'
    },
    src: 'SH-080058 §5.2.1 p.5-18',
    srcDoc: 'sh080058',
    srcPage: '5-18'
  },
  {
    no: 'Pr.2',
    name: {
      vi: 'Số xung mỗi vòng — Number of pulses per rotation (Ap)',
      en: 'Number of pulses per rotation (Ap)'
    },
    range: { vi: '1 đến 65535 (1 to 65535)', en: '1 to 65535' },
    unit: { vi: 'xung (pulse)', en: 'pulse' },
    def: { vi: '20000', en: '20000' },
    note: {
      vi: 'Số xung cấp cho một vòng động cơ (Pulse count for one motor rotation).',
      en: 'Pulse count for one motor rotation.'
    },
    src: 'SH-080058 §5.2.1 p.5-18',
    srcDoc: 'sh080058',
    srcPage: '5-18'
  },
  {
    no: 'Pr.3',
    name: {
      vi: 'Quãng đường mỗi vòng — Movement amount per rotation (Al)',
      en: 'Movement amount per rotation (Al)'
    },
    range: {
      vi: 'Phụ thuộc đơn vị Pr.1 (Depends on Pr.1 unit) — mm 0,1…6553,5 µm, inch/độ (inch/degree) 0,00001…0,65535, xung (pulse) 1…65535',
      en: 'Depends on Pr.1 unit (mm 0.1..6553.5 µm, inch/degree 0.00001..0.65535, pulse 1..65535)'
    },
    def: { vi: '20000', en: '20000' },
    note: {
      vi: 'Quãng đường mỗi vòng động cơ trước khi nhân hệ số Pr.4 (Movement per motor rotation before unit magnification).',
      en: 'Movement per motor rotation before unit magnification (Pr.4).'
    },
    src: 'SH-080058 §5.2.1 p.5-18',
    srcDoc: 'sh080058',
    srcPage: '5-18'
  },
  {
    no: 'Pr.4',
    name: { vi: 'Hệ số nhân đơn vị — Unit magnification (Am)', en: 'Unit magnification (Am)' },
    range: { vi: '1, 10, 100, 1000', en: '1, 10, 100, 1000' },
    def: { vi: '1', en: '1' },
    note: {
      vi: 'Nhân vào Pr.3 khi một vòng vượt quá giới hạn Pr.3 (Multiplies Pr.3 when one rotation exceeds the Pr.3 maximum).',
      en: 'Multiplies Pr.3 when one rotation exceeds the Pr.3 maximum.'
    },
    src: 'SH-080058 §5.2.1 p.5-18',
    srcDoc: 'sh080058',
    srcPage: '5-18'
  },
  {
    no: 'Pr.5',
    name: {
      vi: 'Chế độ ngõ ra xung (chế độ vận hành) — Pulse output mode (operation mode)',
      en: 'Pulse output mode (operation mode)'
    },
    range: {
      vi: '0: PULSE/SIGN, 1: CW/CCW, 2: pha A/B (A/B phase) ×4, 3: pha A/B (A/B phase) ×1',
      en: '0: PULSE/SIGN, 1: CW/CCW, 2: A/B phase (x4), 3: A/B phase (x1)'
    },
    note: {
      vi: 'Giá trị được chốt tại lần Y0 (PLC READY) chuyển OFF → ON đầu tiên sau khi cấp điện hoặc reset CPU (Latched value at the first PLC READY (Y0) OFF to ON after power-on or CPU reset).',
      en: 'Latched value at the first PLC READY (Y0) OFF to ON after power-on or CPU reset.'
    },
    src: 'SH-080058 §5.2.1 p.5-20',
    srcDoc: 'sh080058',
    srcPage: '5-20'
  },
  {
    no: 'Pr.6',
    name: { vi: 'Thiết lập chiều quay — Rotation direction setting', en: 'Rotation direction setting' },
    range: {
      vi: '0: giá trị hiện tại tăng khi phát xung chạy thuận (current value increment with forward run pulse output), 1: giá trị hiện tại tăng khi phát xung chạy ngược (current value increment with reverse run pulse output)',
      en: '0: current value increment with forward run pulse output, 1: current value increment with reverse run pulse output'
    },
    def: { vi: '0', en: '0' },
    src: 'SH-080058 §5.2.1 p.5-20',
    srcDoc: 'sh080058',
    srcPage: '5-20'
  },
  {
    no: 'Pr.7',
    name: { vi: 'Tốc độ bias khi khởi động — Bias speed at start', en: 'Bias speed at start' },
    range: { vi: 'Phụ thuộc đơn vị Pr.1 (Depends on Pr.1 unit)', en: 'Depends on Pr.1 unit' },
    def: { vi: '0', en: '0' },
    note: {
      vi: 'Không được vượt quá giá trị giới hạn tốc độ Pr.8 (Must not exceed Pr.8 speed limit value).',
      en: 'Must not exceed Pr.8 speed limit value.'
    },
    src: 'SH-080058 §5.2.1 p.5-24',
    srcDoc: 'sh080058',
    srcPage: '5-24'
  },
  {
    no: 'Pr.8',
    name: { vi: 'Giá trị giới hạn tốc độ — Speed limit value', en: 'Speed limit value' },
    range: {
      vi: 'mm 0,01…20000000,00; xung (pulse) (QD75D) 1…1000000',
      en: 'mm 0.01..20000000.00; pulse (QD75D) 1..1000000'
    },
    unit: { vi: 'đơn vị/phút (unit/min)', en: 'unit/min' },
    def: { vi: '200000', en: '200000' },
    note: {
      vi: 'Tốc độ lệnh bị chặn theo giá trị này (Command speed is clamped to this value).',
      en: 'Command speed is clamped to this value.'
    },
    src: 'SH-080058 §5.2.2 p.5-24',
    srcDoc: 'sh080058',
    srcPage: '5-24'
  },
  {
    no: 'Pr.9',
    name: { vi: 'Thời gian gia tốc 0 — Acceleration time 0', en: 'Acceleration time 0' },
    range: { vi: '1 đến 8388608 (1 to 8388608)', en: '1 to 8388608' },
    unit: { vi: 'ms', en: 'ms' },
    def: { vi: '1000', en: '1000' },
    src: 'SH-080058 §5.2.2 p.5-24',
    srcDoc: 'sh080058',
    srcPage: '5-24'
  },
  {
    no: 'Pr.10',
    name: { vi: 'Thời gian giảm tốc 0 — Deceleration time 0', en: 'Deceleration time 0' },
    range: { vi: '1 đến 8388608 (1 to 8388608)', en: '1 to 8388608' },
    unit: { vi: 'ms', en: 'ms' },
    def: { vi: '1000', en: '1000' },
    src: 'SH-080058 §5.2.2 p.5-24',
    srcDoc: 'sh080058',
    srcPage: '5-24'
  },
  {
    no: 'Pr.54',
    name: { vi: 'Giá trị giới hạn mô-men OPR — OPR torque limit value', en: 'OPR torque limit value' },
    range: { vi: '1 đến 300 (1 to 300)', en: '1 to 300' },
    unit: { vi: '%', en: '%' },
    def: { vi: '300', en: '300' },
    note: {
      vi: 'Giới hạn mô-men áp dụng trong lúc bò OPR và dừng tại chặn cơ khí (Torque limit applied during machine OPR creep and stopper stop).',
      en: 'Torque limit applied during machine OPR creep and stopper stop.'
    },
    src: 'SH-080058 §5.2.6 p.5-54',
    srcDoc: 'sh080058',
    srcPage: '5-54'
  },
  {
    no: 'Pr.56',
    name: {
      vi: 'Chỉ định tốc độ khi dịch OP — Speed designation during OP shift',
      en: 'Speed designation during OP shift'
    },
    range: {
      vi: '0: tốc độ OPR (Pr.46), 1: tốc độ bò (creep speed, Pr.47)',
      en: '0: OPR speed (Pr.46), 1: creep speed (Pr.47)'
    },
    def: { vi: '0', en: '0' },
    src: 'SH-080058 §5.2.6 p.5-54',
    srcDoc: 'sh080058',
    srcPage: '5-54'
  }
]

export const daRows: Row[] = [
  {
    no: 'Da.1',
    name: { vi: 'Mẫu vận hành — Operation pattern', en: 'Operation pattern' },
    range: {
      vi: '00: hoàn tất định vị (Positioning complete), 01: điều khiển định vị liên tục (Continuous positioning control), 11: điều khiển đường liên tục (Continuous path control)',
      en: '00: Positioning complete, 01: Continuous positioning control, 11: Continuous path control'
    },
    def: { vi: '00', en: '00' },
    src: 'SH-080058 §5.3 p.5-59',
    srcDoc: 'sh080058',
    srcPage: '5-59'
  },
  {
    no: 'Da.2',
    name: { vi: 'Hệ điều khiển — Control system', en: 'Control system' },
    range: {
      vi: 'Mã hệ điều khiển (Control system code) — ABS/INC tuyến tính (linear), chạy cố định (fixed-feed), cung tròn (circular), xoắn ốc (helical), tốc độ (speed), tốc độ–vị trí (speed-position), vị trí–tốc độ (position-speed), NOP, POS, JUMP, LOOP, LEND',
      en: 'Control system code (ABS/INC linear, fixed-feed, circular, helical, speed, speed-position, position-speed, NOP, POS, JUMP, LOOP, LEND)'
    },
    note: {
      vi: 'Bao gồm điều khiển tốc độ 1 cấp và 2 cấp, chuyển đổi tốc độ–vị trí và vị trí–tốc độ (Covers 1-speed and 2-speed speed control, speed-position and position-speed switching).',
      en: 'Covers 1-speed and 2-speed speed control, speed-position and position-speed switching.'
    },
    src: 'SH-080058 §5.3 p.5-59',
    srcDoc: 'sh080058',
    srcPage: '5-59'
  },
  {
    no: 'Da.3',
    name: { vi: 'Số thời gian gia tốc — Acceleration time No.', en: 'Acceleration time No.' },
    range: {
      vi: '0: Pr.9, 1: Pr.25, 2: Pr.26, 3: Pr.27',
      en: '0: Pr.9, 1: Pr.25, 2: Pr.26, 3: Pr.27'
    },
    def: { vi: '0', en: '0' },
    src: 'SH-080058 §5.3 p.5-60',
    srcDoc: 'sh080058',
    srcPage: '5-60'
  },
  {
    no: 'Da.4',
    name: { vi: 'Số thời gian giảm tốc — Deceleration time No.', en: 'Deceleration time No.' },
    range: {
      vi: '0: Pr.10, 1: Pr.28, 2: Pr.29, 3: Pr.30',
      en: '0: Pr.10, 1: Pr.28, 2: Pr.29, 3: Pr.30'
    },
    def: { vi: '0', en: '0' },
    src: 'SH-080058 §5.3 p.5-60',
    srcDoc: 'sh080058',
    srcPage: '5-60'
  },
  {
    no: 'Da.5',
    name: { vi: 'Trục nội suy — Axis to be interpolated', en: 'Axis to be interpolated' },
    range: {
      vi: '0: Trục 1 (Axis 1), 1: Trục 2 (Axis 2), 2: Trục 3 (Axis 3), 3: Trục 4 (Axis 4)',
      en: '0: Axis 1, 1: Axis 2, 2: Axis 3, 3: Axis 4'
    },
    def: { vi: '0', en: '0' },
    note: {
      vi: 'Đặt chính trục của mình sẽ gây lỗi (Setting the self-axis causes an error).',
      en: 'Setting the self-axis causes an error.'
    },
    src: 'SH-080058 §5.1.4 p.5-8',
    srcDoc: 'sh080058',
    srcPage: '5-8'
  },
  {
    no: 'Da.6',
    name: {
      vi: 'Địa chỉ định vị / lượng di chuyển — Positioning address / movement amount',
      en: 'Positioning address / movement amount'
    },
    range: {
      vi: 'Phụ thuộc đơn vị Pr.1 và hệ điều khiển Da.2 (Depends on Pr.1 unit and Da.2 control system)',
      en: 'Depends on Pr.1 unit and Da.2 control system'
    },
    note: {
      vi: 'Giá trị 32 bit (32-bit value): địa chỉ đích cho ABS, lượng di chuyển cho INC và chạy cố định (target address for ABS, movement amount for INC and fixed-feed).',
      en: '32-bit value: target address for ABS, movement amount for INC and fixed-feed.'
    },
    src: 'SH-080058 §5.1.4 p.5-8',
    srcDoc: 'sh080058',
    srcPage: '5-8'
  },
  {
    no: 'Da.7',
    name: { vi: 'Địa chỉ cung — Arc address', en: 'Arc address' },
    range: {
      vi: 'Phụ thuộc đơn vị Pr.1 và hệ điều khiển Da.2 (Depends on Pr.1 unit and Da.2 control system)',
      en: 'Depends on Pr.1 unit and Da.2 control system'
    },
    note: {
      vi: 'Điểm phụ hoặc tâm cho nội suy cung tròn và xoắn ốc (Sub point or center point for circular and helical interpolation).',
      en: 'Sub point or center point for circular and helical interpolation.'
    },
    src: 'SH-080058 §5.1.4 p.5-8',
    srcDoc: 'sh080058',
    srcPage: '5-8'
  },
  {
    no: 'Da.8',
    name: { vi: 'Tốc độ lệnh — Command speed', en: 'Command speed' },
    range: {
      vi: '-1: tốc độ hiện tại (current speed); 0,01…20000000,00 mm/phút (mm/min), phụ thuộc đơn vị',
      en: '-1: current speed; 0.01..20000000.00 mm/min (unit-dependent)'
    },
    unit: { vi: 'đơn vị/phút (unit/min)', en: 'unit/min' },
    def: { vi: '0', en: '0' },
    note: {
      vi: '-1 giữ nguyên tốc độ hiện tại (-1 keeps the current speed).',
      en: '-1 keeps the current speed.'
    },
    src: 'SH-080058 §5.3 p.5-70',
    srcDoc: 'sh080058',
    srcPage: '5-70'
  },
  {
    no: 'Da.9',
    name: { vi: 'Thời gian dừng (dwell) — Dwell time', en: 'Dwell time' },
    range: {
      vi: '0…65535 (JUMP: số dữ liệu vị trí đích 1…600 / destination positioning data No. 1..600)',
      en: '0..65535 (JUMP: destination positioning data No. 1..600)'
    },
    unit: { vi: 'ms', en: 'ms' },
    def: { vi: '0', en: '0' },
    note: {
      vi: 'Đóng vai trò số dữ liệu vị trí đích của JUMP khi Da.2 là JUMP (Acts as the JUMP destination positioning data No. when Da.2 is JUMP).',
      en: 'Acts as the JUMP destination positioning data No. when Da.2 is JUMP.'
    },
    src: 'SH-080058 §5.3 p.5-70',
    srcDoc: 'sh080058',
    srcPage: '5-70'
  },
  {
    no: 'Da.10',
    name: { vi: 'Mã M — M code', en: 'M code' },
    range: {
      vi: '0…65535 (JUMP 0…10, LOOP 1…65535, xoắn ốc / helical 0…999)',
      en: '0..65535 (JUMP 0..10, LOOP 1..65535, helical 0..999)'
    },
    def: { vi: '0', en: '0' },
    note: {
      vi: 'Số dữ liệu điều kiện hoặc số lần lặp LOOP tuỳ Da.2 (Condition data No. or LOOP repetition count depending on Da.2).',
      en: 'Condition data No. or LOOP repetition count depending on Da.2.'
    },
    src: 'SH-080058 §5.3 p.5-70',
    srcDoc: 'sh080058',
    srcPage: '5-70'
  }
]

export type Signal = {
  axis: Loc
  x: string
  y: string
  name: Loc
  desc: Loc
  src: string
  srcDoc?: string
  srcPage?: string
}

export const xySignals: Signal[] = [
  {
    axis: { vi: 'tất cả (all)', en: 'all' },
    x: 'X0',
    y: '—',
    name: { vi: 'QD75 READY', en: 'QD75 READY' },
    desc: {
      vi: 'Tín hiệu module báo CPU rằng QD75 đã sẵn sàng (module-to-CPU ready signal), bật khi QD75 sẵn sàng.',
      en: 'Module-to-CPU ready signal, ON when the QD75 is ready.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: 'tất cả (all)', en: 'all' },
    x: 'X1',
    y: '—',
    name: { vi: 'Cờ đồng bộ (Synchronization flag)', en: 'Synchronization flag' },
    desc: {
      vi: 'Bật khi buffer memory của QD75 truy cập được từ module CPU (ON when the QD75 buffer memory is accessible from the CPU module).',
      en: 'ON when the QD75 buffer memory is accessible from the CPU module.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: 'tất cả (all)', en: 'all' },
    x: '—',
    y: 'Y0',
    name: { vi: 'PLC READY', en: 'PLC READY' },
    desc: {
      vi: 'Tín hiệu CPU → module báo cho QD75 rằng CPU đang bình thường (CPU-to-module signal that notifies the QD75 that the CPU module is normal).',
      en: 'CPU-to-module signal that notifies the QD75 that the CPU module is normal.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: '1–4', en: '1-4' },
    x: 'X4–X7',
    y: '—',
    name: { vi: 'Mã M ON (M code ON)', en: 'M code ON' },
    desc: {
      vi: 'Bật cho từng trục trong khi mã M của trục đó đang được xuất (Turns ON for each axis while its M code is being output).',
      en: 'Turns ON for each axis while its M code is being output.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: '1–4', en: '1-4' },
    x: 'X8–XB',
    y: '—',
    name: { vi: 'Phát hiện lỗi (Error detection)', en: 'Error detection' },
    desc: {
      vi: 'Bật cho một trục khi module phát hiện lỗi (Turns ON for an axis when the module detects an error).',
      en: 'Turns ON for an axis when the module detects an error.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: '1–4', en: '1-4' },
    x: 'XC–XF',
    y: '—',
    name: { vi: 'BUSY', en: 'BUSY' },
    desc: {
      vi: 'Bật cho một trục trong khi đang thực hiện thao tác định vị (Turns ON for an axis while positioning operation is in progress).',
      en: 'Turns ON for an axis while positioning operation is in progress.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: '1–4', en: '1-4' },
    x: 'X10–X13',
    y: '—',
    name: { vi: 'Khởi động hoàn tất (Start complete)', en: 'Start complete' },
    desc: {
      vi: 'Bật cho một trục khi lệnh khởi động đã được chấp nhận (Turns ON for an axis when the start command has been accepted).',
      en: 'Turns ON for an axis when the start command has been accepted.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: '1–4', en: '1-4' },
    x: 'X14–X17',
    y: '—',
    name: { vi: 'Định vị hoàn tất (Positioning complete)', en: 'Positioning complete' },
    desc: {
      vi: 'Bật cho một trục khi việc định vị cho số dữ liệu đó hoàn tất (Turns ON for an axis when positioning for the data No. is complete).',
      en: 'Turns ON for an axis when positioning for the data No. is complete.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: '1–4', en: '1-4' },
    x: '—',
    y: 'Y4–Y7',
    name: { vi: 'Dừng trục (Axis stop)', en: 'Axis stop' },
    desc: {
      vi: 'Lệnh CPU → module dừng trục tương ứng (CPU-to-module command that stops the corresponding axis).',
      en: 'CPU-to-module command that stops the corresponding axis.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: '1–4', en: '1-4' },
    x: '—',
    y: 'Y8 / YA / YC / YE',
    name: { vi: 'Khởi động JOG chạy thuận (Forward run JOG start)', en: 'Forward run JOG start' },
    desc: {
      vi: 'Lệnh khởi động JOG chạy thuận cho trục 1 đến 4 (Forward run JOG start command for axes 1 to 4).',
      en: 'Forward run JOG start command for axes 1 to 4.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: '1–4', en: '1-4' },
    x: '—',
    y: 'Y9 / YB / YD / YF',
    name: { vi: 'Khởi động JOG chạy ngược (Reverse run JOG start)', en: 'Reverse run JOG start' },
    desc: {
      vi: 'Lệnh khởi động JOG chạy ngược cho trục 1 đến 4 (Reverse run JOG start command for axes 1 to 4).',
      en: 'Reverse run JOG start command for axes 1 to 4.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: '1–4', en: '1-4' },
    x: '—',
    y: 'Y10–Y13',
    name: { vi: 'Khởi động định vị (Positioning start)', en: 'Positioning start' },
    desc: {
      vi: 'Lệnh khởi động định vị cho trục 1 đến 4 (Positioning start command for axes 1 to 4).',
      en: 'Positioning start command for axes 1 to 4.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  },
  {
    axis: { vi: '1–4', en: '1-4' },
    x: '—',
    y: 'Y14–Y17',
    name: { vi: 'Cờ cấm thực thi (Execution prohibition flag)', en: 'Execution prohibition flag' },
    desc: {
      vi: 'Cờ cấm thực thi cho trục 1 đến 4 (Execution prohibition flag for axes 1 to 4).',
      en: 'Execution prohibition flag for axes 1 to 4.'
    },
    src: 'SH-080058 §3.3.1 p.3-16'
  }
]

for (const signal of xySignals) {
  signal.srcDoc = 'sh080058'
  signal.srcPage = '3-16'
}

export const modelTable: { model: string; output: Loc; axes: number; note: Loc }[] = [
  {
    model: 'QD75P1',
    output: { vi: 'Open collector', en: 'Open collector' },
    axes: 1,
    note: {
      vi: 'Ngừng sản xuất 09/2021 — thay bằng QD75P1N (Discontinued Sep 2021, SH-080058 A-19)',
      en: 'Discontinued Sep 2021 - replaced by QD75P1N (SH-080058 A-19)'
    }
  },
  {
    model: 'QD75P2',
    output: { vi: 'Open collector', en: 'Open collector' },
    axes: 2,
    note: {
      vi: 'Ngừng sản xuất 09/2021 — thay bằng QD75P2N (Discontinued Sep 2021, SH-080058 A-19)',
      en: 'Discontinued Sep 2021 - replaced by QD75P2N (SH-080058 A-19)'
    }
  },
  {
    model: 'QD75P4',
    output: { vi: 'Open collector', en: 'Open collector' },
    axes: 4,
    note: {
      vi: 'Ngừng sản xuất 09/2021 — thay bằng QD75P4N (Discontinued Sep 2021, SH-080058 A-19)',
      en: 'Discontinued Sep 2021 - replaced by QD75P4N (SH-080058 A-19)'
    }
  },
  {
    model: 'QD75D1',
    output: { vi: 'Differential driver (vi sai)', en: 'Differential driver' },
    axes: 1,
    note: {
      vi: 'Ngừng sản xuất 09/2021 — thay bằng QD75D1N (Discontinued Sep 2021, SH-080058 A-19)',
      en: 'Discontinued Sep 2021 - replaced by QD75D1N (SH-080058 A-19)'
    }
  },
  {
    model: 'QD75D2',
    output: { vi: 'Differential driver (vi sai)', en: 'Differential driver' },
    axes: 2,
    note: {
      vi: 'Ngừng sản xuất 09/2021 — thay bằng QD75D2N (Discontinued Sep 2021, SH-080058 A-19)',
      en: 'Discontinued Sep 2021 - replaced by QD75D2N (SH-080058 A-19)'
    }
  },
  {
    model: 'QD75D4',
    output: { vi: 'Differential driver (vi sai)', en: 'Differential driver' },
    axes: 4,
    note: {
      vi: 'Ngừng sản xuất 09/2021 — thay bằng QD75D4N (Discontinued Sep 2021, SH-080058 A-19)',
      en: 'Discontinued Sep 2021 - replaced by QD75D4N (SH-080058 A-19)'
    }
  },
  {
    model: 'QD75P1N',
    output: { vi: 'Open collector', en: 'Open collector' },
    axes: 1,
    note: {
      vi: 'Bản thay thế hiện hành (Current replacement, SH-080058 phụ lục 1.2)',
      en: 'Current replacement (SH-080058 appendix 1.2)'
    }
  },
  {
    model: 'QD75P2N',
    output: { vi: 'Open collector', en: 'Open collector' },
    axes: 2,
    note: {
      vi: 'Bản thay thế hiện hành (Current replacement, SH-080058 phụ lục 1.2)',
      en: 'Current replacement (SH-080058 appendix 1.2)'
    }
  },
  {
    model: 'QD75P4N',
    output: { vi: 'Open collector', en: 'Open collector' },
    axes: 4,
    note: {
      vi: 'Bản thay thế hiện hành (Current replacement, SH-080058 phụ lục 1.2)',
      en: 'Current replacement (SH-080058 appendix 1.2)'
    }
  },
  {
    model: 'QD75D1N',
    output: { vi: 'Differential driver (vi sai)', en: 'Differential driver' },
    axes: 1,
    note: {
      vi: 'Bản thay thế hiện hành (Current replacement, SH-080058 phụ lục 1.2)',
      en: 'Current replacement (SH-080058 appendix 1.2)'
    }
  },
  {
    model: 'QD75D2N',
    output: { vi: 'Differential driver (vi sai)', en: 'Differential driver' },
    axes: 2,
    note: {
      vi: 'Bản thay thế hiện hành (Current replacement, SH-080058 phụ lục 1.2)',
      en: 'Current replacement (SH-080058 appendix 1.2)'
    }
  },
  {
    model: 'QD75D4N',
    output: { vi: 'Differential driver (vi sai)', en: 'Differential driver' },
    axes: 4,
    note: {
      vi: 'Bản thay thế hiện hành (Current replacement, SH-080058 phụ lục 1.2)',
      en: 'Current replacement (SH-080058 appendix 1.2)'
    }
  }
]

export const qd75Specs: { axes: number; outputType: Loc; pointsPerAxis: number; src: string } = {
  axes: 4,
  outputType: { vi: 'Differential driver (vi sai)', en: 'Differential driver' },
  pointsPerAxis: 600,
  src: 'SH-080058 §3.1 p.3-2'
}

export const unitExamples: {
  label: Loc
  pr2: string
  pr3: string
  pr4: string
  formula: Loc
  pulsesPerMm: Loc
  src: string
}[] = [
  {
    label: { vi: 'mm, 100 xung/mm (pulse/mm)', en: 'mm, 100 pulse/mm' },
    pr2: '10000',
    pr3: '100',
    pr4: '1',
    formula: {
      vi: 'pulses/mm = (Pr.2 × Pr.4) / Pr.3 = (10000 × 1) / 100',
      en: 'pulses/mm = (Pr.2 x Pr.4) / Pr.3 = (10000 x 1) / 100'
    },
    pulsesPerMm: { vi: '100', en: '100' },
    src: 'SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4'
  },
  {
    label: { vi: 'mm, 10000 xung/mm (pulse/mm)', en: 'mm, 10000 pulse/mm' },
    pr2: '10000',
    pr3: '10',
    pr4: '10',
    formula: {
      vi: 'pulses/mm = (Pr.2 × Pr.4) / Pr.3 = (10000 × 10) / 10',
      en: 'pulses/mm = (Pr.2 x Pr.4) / Pr.3 = (10000 x 10) / 10'
    },
    pulsesPerMm: { vi: '10000', en: '10000' },
    src: 'SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4'
  },
  {
    label: {
      vi: 'độ (degree) (Pr.1 = 2), 27,78 xung/độ (pulse/degree)',
      en: 'degree (Pr.1 = 2), 27.78 pulse/degree'
    },
    pr2: '10000',
    pr3: '360',
    pr4: '1',
    formula: {
      vi: 'pulses/degree = (Pr.2 × Pr.4) / Pr.3 = (10000 × 1) / 360',
      en: 'pulses/degree = (Pr.2 x Pr.4) / Pr.3 = (10000 x 1) / 360'
    },
    pulsesPerMm: { vi: '27,78', en: '27.78' },
    src: 'SH-080058 — Pr.1/Pr.2/Pr.3/Pr.4'
  }
]
