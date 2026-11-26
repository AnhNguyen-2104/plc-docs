<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

type DriverKey =
  | 'mr-j4-a'
  | 'delta-b2'
  | 'yaskawa-sigma7'
  | 'panasonic-minas-a6'
  | 'stepper-dm542'
  | 'overview'

const props = defineProps<{ driver: DriverKey }>()

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')
const t = (value: L) => (isVi.value ? value.vi : value.en)
const tx = (value: string | L) => (typeof value === 'string' ? value : t(value))

const C = {
  pulse: 'var(--c1)',
  dir: 'var(--c2)',
  ready: 'var(--warning)',
  alarm: 'var(--error)',
  inp: 'var(--success)',
  power: 'var(--muted)',
  plc: 'var(--accent)'
}

type L = { vi: string; en: string }
type Row = { t: string; label: string | L; y: number; color: string }
type Wire = { d: string; color: string; dash?: string }
type MidBox = {
  x: number
  y: number
  w: number
  h: number
  title: L
  lines: L[]
  dashed?: boolean
  color?: string
}
type Supply = { x: number; y: number; sign: string; label: string | L }

type Variant = {
  title: L
  aria: L
  caption: L
  leftTitle: L
  leftSub: L
  rightTitle: L
  rightSub: L
  left: Row[]
  right: Row[]
  wires: Wire[]
  supply: Supply[]
  boxes: MidBox[]
  note?: L
  lane: [L, L]
}

const row = (t: string, label: string | L, y: number, color: string): Row => ({ t, label, y, color })

const pulseRows = (ready = C.ready): Row[] => [
  row('1A15', 'PULSE F+', 100, C.pulse),
  row('1A16', 'PULSE F−', 128, C.pulse),
  row('1A17', 'PULSE R+', 156, C.dir),
  row('1A18', 'PULSE R−', 184, C.dir),
  row('1A11', 'READY', 212, ready),
  row('1A12', 'RDYCOM', 240, ready)
]

const variants: Record<DriverKey, Variant> = {
  'mr-j4-a': {
    title: {
      vi: 'Đấu dây QD75D4 AX1 → Mitsubishi MR-J4-A (CN1)',
      en: 'QD75D4 AX1 → Mitsubishi MR-J4-A wiring (CN1)'
    },
    aria: {
      vi: 'Sơ đồ đấu dây QD75D4 trục 1 tới driver Mitsubishi MR-J4-A qua CN1: bốn dây xung vi sai 1A15 đến 1A18 tới PP, PG, NP, NG; READY 1A11 tới RD 49; RDYCOM 1A12 lên 24 V và DOCOM 46/47 về 0 V. Servo-ON, ALM và INP đi với PLC, không qua QD75D4.',
      en: 'QD75D4 axis 1 wiring to the Mitsubishi MR-J4-A driver over CN1: four differential pulse wires 1A15 to 1A18 to PP, PG, NP, NG; READY 1A11 to RD 49; RDYCOM 1A12 to 24 V and DOCOM 46/47 to 0 V. Servo-ON, ALM and INP go to the PLC, not through the QD75D4.'
    },
    caption: {
      vi: 'Vi sai PULSE/SIGN, Pr.5 = 0. Nguồn chân: SH-080058 §3.4.1; SH-030143-C §2.2–2.3.',
      en: 'Differential PULSE/SIGN, Pr.5 = 0. Pin source: SH-080058 §3.4.1; SH-030143-C §2.2–2.3.'
    },
    leftTitle: { vi: 'QD75D4 — AX1', en: 'QD75D4 — AX1' },
    leftSub: { vi: '(cổng phải)', en: '(right port)' },
    rightTitle: { vi: 'MR-J4-A', en: 'MR-J4-A' },
    rightSub: { vi: 'CN1 · 40 chân', en: 'CN1 · 40 pins' },
    left: pulseRows(),
    right: [
      row('10', 'PP', 100, C.pulse),
      row('11', 'PG', 128, C.pulse),
      row('35', 'NP', 156, C.dir),
      row('36', 'NG', 184, C.dir),
      row('49', 'RD', 212, C.ready),
      row('46/47', 'DOCOM', 268, C.power)
    ],
    wires: [
      { d: 'M250 100 H710', color: C.pulse },
      { d: 'M250 128 H710', color: C.pulse },
      { d: 'M250 156 H710', color: C.dir },
      { d: 'M250 184 H710', color: C.dir },
      { d: 'M250 212 H710', color: C.ready },
      { d: 'M250 240 H454', color: C.power },
      { d: 'M710 268 H546', color: C.power }
    ],
    supply: [
      { x: 470, y: 240, sign: '+', label: '+24 V' },
      { x: 530, y: 268, sign: '−', label: '0 V' }
    ],
    boxes: [],
    lane: [
      { vi: 'SON (CN1-15)', en: 'SON (CN1-15)' },
      { vi: 'ALM 48 / INP 24 → PLC', en: 'ALM 48 / INP 24 → PLC' }
    ]
  },
  'delta-b2': {
    title: {
      vi: 'Đấu dây QD75D4 AX1 → Delta ASDA-B2 (CN1)',
      en: 'QD75D4 AX1 → Delta ASDA-B2 wiring (CN1)'
    },
    aria: {
      vi: 'Sơ đồ đấu dây QD75D4 trục 1 tới driver Delta ASDA-B2 qua CN1: 1A15 tới 43 PULSE, 1A16 tới 41 /PULSE, 1A17 tới 39 SIGN, 1A18 tới 37 /SIGN; DO1+ 7 về READY 1A11, DO1− 6 về 0 V, RDYCOM 1A12 lên 24 V tại COM+ 11, COM− 14 về 0 V. Servo-ON và ALRM đi với PLC.',
      en: 'QD75D4 axis 1 wiring to the Delta ASDA-B2 driver over CN1: 1A15 to 43 PULSE, 1A16 to 41 /PULSE, 1A17 to 39 SIGN, 1A18 to 37 /SIGN; DO1+ 7 to READY 1A11, DO1− 6 to 0 V, RDYCOM 1A12 to 24 V at COM+ 11, COM− 14 to 0 V. Servo-ON and ALRM go to the PLC.'
    },
    caption: {
      vi: 'Vi sai PULSE/SIGN; VDD 17 và nguồn ngoài 24 V loại trừ nhau. Nguồn chân: ASDA-B2 p.3-18/3-21/3-22; SH-080058.',
      en: 'Differential PULSE/SIGN; VDD 17 and an external 24 V supply are mutually exclusive. Pin source: ASDA-B2 p.3-18/3-21/3-22; SH-080058.'
    },
    leftTitle: { vi: 'QD75D4 — AX1', en: 'QD75D4 — AX1' },
    leftSub: { vi: '(cổng phải)', en: '(right port)' },
    rightTitle: { vi: 'ASDA-B2', en: 'ASDA-B2' },
    rightSub: { vi: 'CN1 · 44 chân', en: 'CN1 · 44 pins' },
    left: pulseRows(),
    right: [
      row('43', 'PULSE', 100, C.pulse),
      row('41', '/PULSE', 128, C.pulse),
      row('39', 'SIGN', 156, C.dir),
      row('37', '/SIGN', 184, C.dir),
      row('7', 'DO1+ (SRDY)', 212, C.ready),
      row('11', 'COM+', 240, C.power),
      row('6', 'DO1−', 268, C.power),
      row('14', 'COM−', 296, C.power)
    ],
    wires: [
      { d: 'M250 100 H710', color: C.pulse },
      { d: 'M250 128 H710', color: C.pulse },
      { d: 'M250 156 H710', color: C.dir },
      { d: 'M250 184 H710', color: C.dir },
      { d: 'M250 212 H710', color: C.ready },
      { d: 'M250 240 H454', color: C.power },
      { d: 'M710 240 H486', color: C.power },
      { d: 'M710 268 H546', color: C.power },
      { d: 'M710 296 H546 V268', color: C.power }
    ],
    supply: [
      { x: 470, y: 240, sign: '+', label: '+24 V' },
      { x: 530, y: 268, sign: '−', label: '0 V' }
    ],
    boxes: [],
    lane: [
      { vi: 'SON / DI1 (9)', en: 'SON / DI1 (9)' },
      { vi: 'ALRM 28 / 27 → PLC', en: 'ALRM 28 / 27 → PLC' }
    ]
  },
  'yaskawa-sigma7': {
    title: {
      vi: 'Đấu dây QD75D4 AX1 → Yaskawa Sigma-7 (CN1)',
      en: 'QD75D4 AX1 → Yaskawa Sigma-7 wiring (CN1)'
    },
    aria: {
      vi: 'Sơ đồ đấu dây QD75D4 trục 1 tới driver Yaskawa Sigma-7 qua CN1: 1A15 tới 7 PULS, 1A16 tới 8 /PULS, 1A17 tới 11 SIGN, 1A18 tới 12 /SIGN; S-RDY 29/30 là cặp cách ly về READY 1A11 và RDYCOM 1A12; CLR 15/14 tuỳ chọn. Servo-ON, ALM và COIN đi với PLC.',
      en: 'QD75D4 axis 1 wiring to the Yaskawa Sigma-7 driver over CN1: 1A15 to 7 PULS, 1A16 to 8 /PULS, 1A17 to 11 SIGN, 1A18 to 12 /SIGN; S-RDY 29/30 is an isolated pair to READY 1A11 and RDYCOM 1A12; CLR 15/14 optional. Servo-ON, ALM and COIN go to the PLC.'
    },
    caption: {
      vi: 'Vi sai PULSE/SIGN; 29/30 là cặp cách ly. Nguồn chân: SGD7S p.4-35–4-38; SH-080058 phụ lục 8.1 (29/30 chưa đối chiếu bảng CN1).',
      en: 'Differential PULSE/SIGN; 29/30 is an isolated pair. Pin source: SGD7S p.4-35–4-38; SH-080058 appendix 8.1 (29/30 not cross-checked against the CN1 table).'
    },
    leftTitle: { vi: 'QD75D4 — AX1', en: 'QD75D4 — AX1' },
    leftSub: { vi: '(cổng phải)', en: '(right port)' },
    rightTitle: { vi: 'Sigma-7 SGD7S', en: 'Sigma-7 SGD7S' },
    rightSub: { vi: 'CN1 · 50 chân', en: 'CN1 · 50 pins' },
    left: [
      ...pulseRows(),
      row('1A13', 'CLEAR', 268, C.power),
      row('1A14', 'CLEAR COM', 296, C.power)
    ],
    right: [
      row('7', 'PULS', 100, C.pulse),
      row('8', '/PULS', 128, C.pulse),
      row('11', 'SIGN', 156, C.dir),
      row('12', '/SIGN', 184, C.dir),
      row('29', 'S-RDY+', 212, C.ready),
      row('30', 'S-RDY−', 240, C.ready),
      row('15', 'CLR', 268, C.power),
      row('14', '/CLR', 296, C.power)
    ],
    wires: [
      { d: 'M250 100 H710', color: C.pulse },
      { d: 'M250 128 H710', color: C.pulse },
      { d: 'M250 156 H710', color: C.dir },
      { d: 'M250 184 H710', color: C.dir },
      { d: 'M250 212 H710', color: C.ready },
      { d: 'M250 240 H710', color: C.ready },
      { d: 'M250 268 H710', color: C.power, dash: '5 4' },
      { d: 'M250 296 H710', color: C.power, dash: '5 4' }
    ],
    supply: [],
    boxes: [],
    note: {
      vi: '29/30: chưa đối chiếu bảng CN1 — chỉ theo ví dụ SH-080058 phụ lục 8.1',
      en: '29/30: not cross-checked against the CN1 table — SH-080058 appendix 8.1 example only'
    },
    lane: [
      { vi: '/S-ON (40)', en: '/S-ON (40)' },
      { vi: 'ALM+ 31 / ALM− 32 · /COIN 25/26 → PLC', en: 'ALM+ 31 / ALM− 32 · /COIN 25/26 → PLC' }
    ]
  },
  'panasonic-minas-a6': {
    title: {
      vi: 'Đấu dây QD75D4 AX1 → Panasonic MINAS A6 (CN1)',
      en: 'QD75D4 AX1 → Panasonic MINAS A6 wiring (CN1)'
    },
    aria: {
      vi: 'Sơ đồ đấu dây QD75D4 trục 1 tới driver Panasonic MINAS A6 qua CN1: 1A15 tới 44 PULSH1, 1A16 tới 45 PULSH2, 1A17 tới 46 SIGNH1, 1A18 tới 47 SIGNH2; nhánh opto PULS1/2, SIGN1/2, OPC1/2 là đường thay thế không dùng đồng thời. Servo-ON, ALM và INP đi với PLC.',
      en: 'QD75D4 axis 1 wiring to the Panasonic MINAS A6 driver over CN1: 1A15 to 44 PULSH1, 1A16 to 45 PULSH2, 1A17 to 46 SIGNH1, 1A18 to 47 SIGNH2; the opto branch PULS1/2, SIGN1/2, OPC1/2 is an alternative not used at the same time. Servo-ON, ALM and INP go to the PLC.'
    },
    caption: {
      vi: 'Vi sai nhóm H (PULSH/SIGNH); nhánh opto không dùng đồng thời. Nguồn chân: SX-DSV03025 p.45; SX-DSV03031.',
      en: 'H-group differential (PULSH/SIGNH); the opto branch is not used at the same time. Pin source: SX-DSV03025 p.45; SX-DSV03031.'
    },
    leftTitle: { vi: 'QD75D4 — AX1', en: 'QD75D4 — AX1' },
    leftSub: { vi: '(cổng phải)', en: '(right port)' },
    rightTitle: { vi: 'MINAS A6', en: 'MINAS A6' },
    rightSub: { vi: 'CN1 · đầu nối điều khiển', en: 'CN1 · control connector' },
    left: pulseRows(C.power),
    right: [
      row('44', 'PULSH1', 100, C.pulse),
      row('45', 'PULSH2', 128, C.pulse),
      row('46', 'SIGNH1', 156, C.dir),
      row('47', 'SIGNH2', 184, C.dir),
      row('41', 'SO-COM', 220, C.power),
      row('7', 'SI-COM', 248, C.power)
    ],
    wires: [
      { d: 'M250 100 H710', color: C.pulse },
      { d: 'M250 128 H710', color: C.pulse },
      { d: 'M250 156 H710', color: C.dir },
      { d: 'M250 184 H710', color: C.dir },
      { d: 'M137 296 V330 H415', color: C.ready, dash: '5 4' },
      { d: 'M710 330 H645', color: C.ready, dash: '5 4' }
    ],
    supply: [],
    boxes: [
      {
        x: 415,
        y: 296,
        w: 230,
        h: 66,
        title: { vi: 'Nhánh opto — thay thế', en: 'Opto branch — alternative' },
        lines: [
          { vi: 'PULS1/2 3/4 · SIGN1/2 5/6', en: 'PULS1/2 3/4 · SIGN1/2 5/6' },
          {
            vi: 'OPC1/2 1/2 — không dùng đồng thời',
            en: 'OPC1/2 1/2 — not used at the same time'
          }
        ],
        dashed: true,
        color: C.ready
      },
      {
        x: 268,
        y: 214,
        w: 200,
        h: 44,
        title: { vi: '1A11/1A12 để hở', en: '1A11/1A12 left open' },
        lines: [
          {
            vi: 'bảng chân A6 không có ngõ READY',
            en: 'A6 pin table has no READY input'
          }
        ]
      }
    ],
    lane: [
      { vi: 'SRV-ON (29)', en: 'SRV-ON (29)' },
      { vi: 'ALM 36/37 · INP 38/39 → PLC', en: 'ALM 36/37 · INP 38/39 → PLC' }
    ]
  },
  'stepper-dm542': {
    title: {
      vi: 'Đấu dây QD75D4 AX1 → driver step DM542 (P1)',
      en: 'QD75D4 AX1 → DM542 stepper driver wiring (P1)'
    },
    aria: {
      vi: 'Sơ đồ đấu dây QD75D4 trục 1 tới driver step DM542 qua khối P1: 1A15 tới PUL+, 1A16 tới PUL−, 1A17 tới DIR+, 1A18 tới DIR−, qua hộp giao diện theo manual DM542 vì P1 là ngõ opto; ENA để hở, ALM trên P2 về PLC.',
      en: 'QD75D4 axis 1 wiring to the DM542 stepper driver over terminal block P1: 1A15 to PUL+, 1A16 to PUL−, 1A17 to DIR+, 1A18 to DIR−, through an interface box per the DM542 manual because P1 is an opto input; ENA left open, ALM on P2 to the PLC.'
    },
    caption: {
      vi: 'PULSE/SIGN, Pr.5 = 0; P1 là ngõ opto — phải qua giao diện. Nguồn chân: DM542 p.3–4; SH-080058 §3.4.1.',
      en: 'PULSE/SIGN, Pr.5 = 0; P1 is an opto input — an interface is required. Pin source: DM542 p.3–4; SH-080058 §3.4.1.'
    },
    leftTitle: { vi: 'QD75D4 — AX1', en: 'QD75D4 — AX1' },
    leftSub: { vi: '(cổng phải)', en: '(right port)' },
    rightTitle: { vi: 'DM542', en: 'DM542' },
    rightSub: { vi: 'P1 · khối đầu cực', en: 'P1 · terminal block' },
    left: [
      row('1A15', 'PULSE F+', 100, C.pulse),
      row('1A16', 'PULSE F−', 128, C.pulse),
      row('1A17', 'PULSE R+', 156, C.dir),
      row('1A18', 'PULSE R−', 184, C.dir)
    ],
    right: [
      row('P1', 'PUL+', 100, C.pulse),
      row('P1', 'PUL−', 128, C.pulse),
      row('P1', 'DIR+', 156, C.dir),
      row('P1', 'DIR−', 184, C.dir),
      row('P1', { vi: 'ENA+ (hở)', en: 'ENA+ (open)' }, 240, C.power),
      row('P1', { vi: 'ENA− (hở)', en: 'ENA− (open)' }, 268, C.power),
      row('P2', 'ALM → PLC', 320, C.alarm)
    ],
    wires: [
      { d: 'M250 100 H392', color: C.pulse },
      { d: 'M668 100 H710', color: C.pulse },
      { d: 'M250 128 H392', color: C.pulse },
      { d: 'M668 128 H710', color: C.pulse },
      { d: 'M250 156 H392', color: C.dir },
      { d: 'M668 156 H710', color: C.dir },
      { d: 'M250 184 H392', color: C.dir },
      { d: 'M668 184 H710', color: C.dir }
    ],
    supply: [],
    boxes: [
      {
        x: 392,
        y: 76,
        w: 276,
        h: 136,
        title: { vi: 'Giao diện theo manual DM542', en: 'Interface per the DM542 manual' },
        lines: [
          { vi: 'Không đấu thẳng cặp vi sai', en: 'Do not wire the differential pair' },
          { vi: 'vào ngõ opto P1', en: 'straight into opto P1' },
          { vi: 'trở hạn dòng theo manual', en: 'series resistor per the manual' }
        ],
        color: C.plc
      }
    ],
    lane: [
      { vi: 'ENA+ (tuỳ chọn, mặc định hở)', en: 'ENA+ (optional, open by default)' },
      { vi: 'ALM P2 → PLC', en: 'ALM P2 → PLC' }
    ]
  },
  overview: {
    title: { vi: 'Sơ đồ khối QD75D4 → 5 driver', en: 'QD75D4 → 5 drivers block diagram' },
    aria: {
      vi: 'Sơ đồ khối nối QD75D4 với năm driver: MR-J4-A, ASDA-B2, Sigma-7 và MINAS A6 qua CN1 bằng xung vi sai; DM542 qua khối P1 cần giao diện opto. Servo-ON và alarm đi với PLC, không qua QD75D4.',
      en: 'Block diagram connecting the QD75D4 to five drivers: MR-J4-A, ASDA-B2, Sigma-7 and MINAS A6 over CN1 with differential pulses; DM542 over terminal block P1 needs an opto interface. Servo-ON and alarm go to the PLC, not through the QD75D4.'
    },
    caption: {
      vi: 'Sơ đồ khối, không có số chân. Nguồn: SH-080058; bảng chân từng driver ở trang riêng.',
      en: 'Block diagram, no pin numbers. Source: SH-080058; each driver pin table is on its own page.'
    },
    leftTitle: { vi: '', en: '' },
    leftSub: { vi: '', en: '' },
    rightTitle: { vi: '', en: '' },
    rightSub: { vi: '', en: '' },
    left: [],
    right: [],
    wires: [],
    supply: [],
    boxes: [],
    lane: [
      { vi: 'servo-ON / ENA', en: 'servo-ON / ENA' },
      { vi: 'ALM / INP → PLC', en: 'ALM / INP → PLC' }
    ]
  }
}

const overviewDrivers = [
  {
    name: 'MR-J4-A',
    sub: { vi: 'CN1 · vi sai PULSE/SIGN', en: 'CN1 · differential PULSE/SIGN' },
    tag: { vi: 'vi sai', en: 'differential' },
    color: C.pulse,
    y: 32
  },
  {
    name: 'ASDA-B2',
    sub: { vi: 'CN1 · vi sai 500 kpps', en: 'CN1 · differential 500 kpps' },
    tag: { vi: 'vi sai', en: 'differential' },
    color: C.pulse,
    y: 102
  },
  {
    name: 'Sigma-7 SGD7S',
    sub: { vi: 'CN1 · vi sai 4 Mpps', en: 'CN1 · differential 4 Mpps' },
    tag: { vi: 'vi sai', en: 'differential' },
    color: C.pulse,
    y: 172
  },
  {
    name: 'MINAS A6',
    sub: { vi: 'CN1 · vi sai 8 Mpps', en: 'CN1 · differential 8 Mpps' },
    tag: { vi: 'vi sai', en: 'differential' },
    color: C.pulse,
    y: 242
  },
  {
    name: 'DM542',
    sub: { vi: 'P1 · opto, qua giao diện', en: 'P1 · opto, via interface' },
    tag: { vi: 'opto', en: 'opto' },
    color: C.ready,
    y: 312
  }
]

const legend = [
  { color: C.pulse, label: { vi: 'Xung (PULSE)', en: 'Pulse (PULSE)' } },
  { color: C.dir, label: { vi: 'Chiều (SIGN/DIR)', en: 'Direction (SIGN/DIR)' } },
  { color: C.ready, label: { vi: 'READY / trạng thái', en: 'READY / status' } },
  { color: C.alarm, label: { vi: 'Alarm', en: 'Alarm' } },
  { color: C.inp, label: { vi: 'In-position', en: 'In-position' } },
  { color: C.power, label: { vi: '24 V / 0 V', en: '24 V / 0 V' } }
]

const ovBox = {
  title: { vi: 'QD75D4', en: 'QD75D4' },
  axes: { vi: 'AX1–AX4 · 4 trục', en: 'AX1–AX4 · 4 axes' },
  pulse: { vi: 'ngõ ra xung vi sai', en: 'differential pulse output' },
  driver: { vi: '(line driver)', en: '(line driver)' }
}

const laneHead = { vi: 'PLC (ngõ ra transistor)', en: 'PLC (transistor output)' }
const laneDriver = { vi: 'driver', en: 'driver' }
const notVia = { vi: 'KHÔNG đi qua QD75D4', en: 'NOT via QD75D4' }

const v = computed(() => variants[props.driver])
const isOverview = computed(() => props.driver === 'overview')

const lastY = (rows: Row[]) => (rows.length ? Math.max(...rows.map((r) => r.y)) : 0)
const leftH = computed(() => lastY(v.value.left) + 40)
const rightH = computed(() => lastY(v.value.right) + 40)
</script>

<template>
  <figure class="driver-wiring">
    <svg
      viewBox="0 0 960 470"
      role="img"
      :aria-label="t(v.aria)"
      font-family="ui-sans-serif, system-ui, sans-serif"
      focusable="false"
    >
      <title>{{ t(v.title) }}</title>

      <template v-if="isOverview">
        <rect
          x="24"
          y="120"
          width="200"
          height="180"
          rx="12"
          fill="var(--surface)"
          stroke="var(--border)"
        />
        <text x="124" y="164" text-anchor="middle" font-size="18" font-weight="700" fill="var(--fg)">
          {{ t(ovBox.title) }}
        </text>
        <text x="124" y="190" text-anchor="middle" font-size="12" fill="var(--fg)">
          {{ t(ovBox.axes) }}
        </text>
        <text x="124" y="212" text-anchor="middle" font-size="11" fill="var(--muted)">
          {{ t(ovBox.pulse) }}
        </text>
        <text x="124" y="232" text-anchor="middle" font-size="11" fill="var(--muted)">
          {{ t(ovBox.driver) }}
        </text>

        <path d="M224 210 H280" fill="none" stroke="var(--accent)" stroke-width="2" />
        <line x1="280" y1="60" x2="280" y2="340" stroke="var(--accent)" stroke-width="2" />

        <g v-for="d in overviewDrivers" :key="d.name">
          <path :d="`M280 ${d.y + 28} H360`" fill="none" stroke="var(--accent)" stroke-width="1.6" />
          <polygon :points="`360,${d.y + 28} 352,${d.y + 24} 352,${d.y + 32}`" fill="var(--accent)" />
          <rect
            x="360"
            :y="d.y"
            width="560"
            height="56"
            rx="10"
            fill="var(--surface)"
            stroke="var(--border)"
          />
          <text x="378" :y="d.y + 24" font-size="13" font-weight="700" fill="var(--fg)">
            {{ d.name }}
          </text>
          <text x="378" :y="d.y + 42" font-size="11" fill="var(--muted)">
            {{ t(d.sub) }}
          </text>
          <rect
            x="846"
            :y="d.y + 16"
            width="58"
            height="22"
            rx="11"
            fill="none"
            :stroke="d.color"
          />
          <text x="875" :y="d.y + 31" text-anchor="middle" font-size="10" :fill="d.color">
            {{ t(d.tag) }}
          </text>
        </g>
      </template>

      <template v-else>
        <rect
          x="24"
          y="16"
          width="226"
          :height="leftH"
          rx="12"
          fill="var(--surface)"
          stroke="var(--border)"
        />
        <text x="137" y="44" text-anchor="middle" font-size="16" font-weight="700" fill="var(--fg)">
          {{ t(v.leftTitle) }}
        </text>
        <text x="137" y="62" text-anchor="middle" font-size="11.5" fill="var(--muted)">
          {{ t(v.leftSub) }}
        </text>
        <g v-for="r in v.left" :key="`l-${r.t}-${r.y}`">
          <text
            x="40"
            :y="r.y + 4"
            font-size="12.5"
            font-weight="600"
            fill="var(--fg)"
            font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            {{ r.t }}
          </text>
          <text x="94" :y="r.y + 4" font-size="12" fill="var(--fg)">{{ tx(r.label) }}</text>
          <circle cx="238" :cy="r.y" r="3" :fill="r.color" />
        </g>

        <rect
          x="710"
          y="16"
          width="226"
          :height="rightH"
          rx="12"
          fill="var(--surface)"
          stroke="var(--border)"
        />
        <text x="823" y="44" text-anchor="middle" font-size="16" font-weight="700" fill="var(--fg)">
          {{ t(v.rightTitle) }}
        </text>
        <text x="823" y="62" text-anchor="middle" font-size="11.5" fill="var(--muted)">
          {{ t(v.rightSub) }}
        </text>
        <g v-for="r in v.right" :key="`r-${r.t}-${r.y}`">
          <text
            x="722"
            :y="r.y + 4"
            font-size="12.5"
            font-weight="600"
            fill="var(--fg)"
            font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            {{ r.t }}
          </text>
          <text x="784" :y="r.y + 4" font-size="12" fill="var(--fg)">{{ tx(r.label) }}</text>
          <circle cx="710" :cy="r.y" r="3" :fill="r.color" />
        </g>

        <path
          v-for="(w, i) in v.wires"
          :key="`w-${i}`"
          :d="w.d"
          fill="none"
          :stroke="w.color"
          stroke-width="1.8"
          :stroke-dasharray="w.dash"
          stroke-linejoin="round"
          stroke-linecap="round"
        />

        <g v-for="s in v.supply" :key="`sup-${s.x}-${s.y}`">
          <circle
            :cx="s.x"
            :cy="s.y"
            r="16"
            fill="var(--surface)"
            stroke="var(--muted)"
            stroke-width="1.6"
          />
          <text
            :x="s.x"
            :y="s.y + 5"
            text-anchor="middle"
            font-size="15"
            font-weight="700"
            fill="var(--muted)"
          >
            {{ s.sign }}
          </text>
          <text
            :x="s.x"
            :y="s.y + 33"
            text-anchor="middle"
            font-size="10"
            fill="var(--muted)"
          >
            {{ tx(s.label) }}
          </text>
        </g>

        <g v-for="(b, bi) in v.boxes" :key="`box-${bi}`">
          <rect
            :x="b.x"
            :y="b.y"
            :width="b.w"
            :height="b.h"
            rx="8"
            fill="var(--surface)"
            :stroke="b.color || 'var(--border)'"
            :stroke-dasharray="b.dashed ? '5 4' : undefined"
          />
          <text
            :x="b.x + b.w / 2"
            :y="b.y + 21"
            text-anchor="middle"
            font-size="12"
            font-weight="700"
            :fill="b.color || 'var(--fg)'"
          >
            {{ t(b.title) }}
          </text>
          <text
            v-for="(line, li) in b.lines"
            :key="`line-${li}`"
            :x="b.x + b.w / 2"
            :y="b.y + 40 + li * 15"
            text-anchor="middle"
            font-size="10.5"
            fill="var(--muted)"
          >
            {{ t(line) }}
          </text>
        </g>

        <text
          v-if="v.note"
          x="480"
          y="366"
          text-anchor="middle"
          font-size="10.5"
          fill="var(--warning)"
        >
          {{ t(v.note) }}
        </text>
      </template>

      <rect
        x="24"
        y="404"
        width="912"
        height="54"
        rx="8"
        fill="none"
        stroke="var(--border)"
        stroke-dasharray="4 4"
      />
      <text x="36" y="424" font-size="11" fill="var(--muted)">{{ t(laneHead) }}</text>
      <path d="M176 420 H262" fill="none" stroke="var(--accent)" stroke-width="1.6" />
      <polygon points="262,420 254,416 254,424" fill="var(--accent)" />
      <text x="270" y="424" font-size="11" fill="var(--fg)">{{ t(v.lane[0]) }}</text>

      <text x="36" y="444" font-size="11" fill="var(--muted)">{{ t(laneDriver) }}</text>
      <path d="M176 440 H262" fill="none" stroke="var(--warning)" stroke-width="1.6" />
      <polygon points="262,440 254,436 254,444" fill="var(--warning)" />
      <text x="270" y="444" font-size="11" fill="var(--fg)">{{ t(v.lane[1]) }}</text>

      <text x="924" y="424" text-anchor="end" font-size="10.5" fill="var(--warning)">
        {{ t(notVia) }}
      </text>
    </svg>

    <div class="dw-legend" aria-hidden="true">
      <span v-for="item in legend" :key="item.label.vi">
        <i :style="{ background: item.color }" />{{ t(item.label) }}
      </span>
    </div>

    <figcaption>{{ t(v.caption) }}</figcaption>
  </figure>
</template>
