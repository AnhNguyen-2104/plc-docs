<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

type Variant =
  | 'generic'
  | 'mr-j4-a'
  | 'delta-b2'
  | 'yaskawa-sigma7'
  | 'panasonic-minas-a6'
  | 'stepper-dm542'

type Rail = 'p24' | '0v'
type Kind = 'pulse' | 'plc' | 'status' | 'common' | 'zero'
type Row = { q: string; d: string; kind: Kind; rail?: Rail }

const props = defineProps<{ variant?: Variant; axis?: string }>()

const { lang, site } = useData()
const isVi = computed(() => lang.value !== 'en')
const variant = computed<Variant>(() => props.variant ?? 'generic')
const axisNo = computed(() => props.axis ?? '1')

const BLOCKS: Record<Variant, { lines: [string, string]; connector: string }> = {
  generic: { lines: ['Driver servo', '(CN1)'], connector: 'CN1 (44P)' },
  'mr-j4-a': { lines: ['MR-J4-A', '(CN1)'], connector: 'CN1 (50P)' },
  'delta-b2': { lines: ['ASDA-B2', '(CN1)'], connector: 'CN1 (44P)' },
  'yaskawa-sigma7': { lines: ['SGD7S', '(CN1)'], connector: 'CN1 (50P)' },
  'panasonic-minas-a6': { lines: ['MINAS A6', '(X4)'], connector: 'X4 (50P)' },
  'stepper-dm542': { lines: ['DM542', '(P1)'], connector: 'P1' }
}

const block = computed(() => BLOCKS[variant.value])
const blockText = computed(() => block.value.lines.join(' '))

function buildRows(v: Variant, a: string): Row[] {
  switch (v) {
    case 'mr-j4-a':
      return [
        { q: `${a}A15 (PULSE F+)`, d: 'PP 10', kind: 'pulse' },
        { q: `${a}A16 (PULSE F−)`, d: 'PG 11', kind: 'pulse' },
        { q: `${a}A17 (PULSE R+)`, d: 'NP 35', kind: 'pulse' },
        { q: `${a}A18 (PULSE R−)`, d: 'NG 36', kind: 'pulse' },
        { q: `${a}A11 (READY)`, d: 'RD 49', kind: 'status' },
        { q: `${a}A12 (RDYCOM)`, d: '+24 V', kind: 'common', rail: 'p24' },
        { q: '0 V', d: 'DOCOM 46/47', kind: 'zero', rail: '0v' },
        { q: 'PLC output', d: 'SON 15', kind: 'plc' },
        { q: 'drive output', d: 'ALM 48 → PLC', kind: 'status' }
      ]
    case 'delta-b2':
      return [
        { q: `${a}A15 (PULSE F+)`, d: 'PULSE 43', kind: 'pulse' },
        { q: `${a}A16 (PULSE F−)`, d: '/PULSE 41', kind: 'pulse' },
        { q: `${a}A17 (PULSE R+)`, d: 'SIGN 39', kind: 'pulse' },
        { q: `${a}A18 (PULSE R−)`, d: '/SIGN 37', kind: 'pulse' },
        { q: `${a}A11 (READY)`, d: 'DO1+ 7', kind: 'status' },
        { q: `${a}A12 (RDYCOM)`, d: 'COM+ 11 (+24 V)', kind: 'common', rail: 'p24' },
        { q: '0 V', d: 'DO1− 6 / COM− 14', kind: 'zero', rail: '0v' },
        { q: 'PLC output', d: 'SON 9', kind: 'plc' },
        { q: 'drive output', d: 'ALRM 28/27 → PLC', kind: 'status' }
      ]
    case 'yaskawa-sigma7':
      return [
        { q: `${a}A15 (PULSE F+)`, d: 'PULS 7', kind: 'pulse' },
        { q: `${a}A16 (PULSE F−)`, d: '/PULS 8', kind: 'pulse' },
        { q: `${a}A17 (PULSE R+)`, d: 'SIGN 11', kind: 'pulse' },
        { q: `${a}A18 (PULSE R−)`, d: '/SIGN 12', kind: 'pulse' },
        { q: `${a}A11 (READY)`, d: 'S-RDY+ 29', kind: 'status' },
        { q: `${a}A12 (RDYCOM)`, d: 'S-RDY− 30', kind: 'status' },
        { q: '+24 V', d: '+24VIN 47', kind: 'common', rail: 'p24' },
        { q: '0 V', d: 'SG 1,2,6,10', kind: 'zero', rail: '0v' },
        { q: 'PLC output', d: '/S-ON 40', kind: 'plc' },
        { q: 'drive output', d: 'ALM+ 31 / ALM− 32 → PLC', kind: 'status' }
      ]
    case 'panasonic-minas-a6':
      return [
        { q: `${a}A15 (PULSE F+)`, d: 'PULSH1 44', kind: 'pulse' },
        { q: `${a}A16 (PULSE F−)`, d: 'PULSH2 45', kind: 'pulse' },
        { q: `${a}A17 (PULSE R+)`, d: 'SIGNH1 46', kind: 'pulse' },
        { q: `${a}A18 (PULSE R−)`, d: 'SIGNH2 47', kind: 'pulse' },
        { q: 'PLC output', d: 'SRV-ON 29', kind: 'plc' },
        { q: 'drive output', d: 'ALM 36/37 → PLC', kind: 'status' },
        { q: '0 V', d: 'SI-COM 7', kind: 'zero', rail: '0v' }
      ]
    case 'stepper-dm542':
      return [
        { q: `${a}A15 (PULSE F+)`, d: 'PUL+ P1', kind: 'pulse' },
        { q: `${a}A16 (PULSE F−)`, d: 'PUL− P1', kind: 'pulse' },
        { q: `${a}A17 (PULSE R+)`, d: 'DIR+ P1', kind: 'pulse' },
        { q: `${a}A18 (PULSE R−)`, d: 'DIR− P1', kind: 'pulse' },
        { q: 'PLC output', d: 'ENA+ P1', kind: 'plc' }
      ]
    default:
      return [
        { q: `${a}A15 (PULSE F+)`, d: 'PP', kind: 'pulse' },
        { q: `${a}A16 (PULSE F−)`, d: 'PG', kind: 'pulse' },
        { q: `${a}A17 (PULSE R+)`, d: 'NP', kind: 'pulse' },
        { q: `${a}A18 (PULSE R−)`, d: 'NG', kind: 'pulse' },
        { q: `${a}A11 (READY)`, d: 'RD', kind: 'status' },
        { q: `${a}A12 (RDYCOM)`, d: 'DOCOM 46/47', kind: 'zero', rail: '0v' },
        { q: 'PLC output', d: 'SON', kind: 'plc' },
        { q: 'drive output', d: 'ALM → PLC', kind: 'status' }
      ]
  }
}

const RAIL_BASE: Record<Rail, number> = { p24: 660, '0v': 684 }

const rows = computed(() => {
  const used: Record<Rail, number> = { p24: 0, '0v': 0 }
  return buildRows(variant.value, axisNo.value).map((row, index) => {
    const y = 190 + index * 26
    let busX: number | undefined
    if (row.rail) {
      busX = RAIL_BASE[row.rail] + used[row.rail] * 10
      used[row.rail] += 1
    }
    return { ...row, y, busX }
  })
})

const has = (rail: Rail) => computed(() => rows.value.some((r) => r.rail === rail))
const hasP24 = has('p24')
const has0V = has('0v')

const COLORS = {
  common: 'var(--vp-c-danger-1)',
  pulse: 'var(--vp-c-success-1)',
  zero: 'var(--vp-c-brand-1)',
  plc: 'var(--vp-c-warning-1)',
  status: 'var(--vp-c-tip-1)'
}

function rowColor(row: Row): string {
  return COLORS[row.kind]
}

const legend = computed(() => [
  { c: COLORS.common, text: isVi.value ? 'chung/+24 V' : 'common/+24 V', x: 24 },
  { c: COLORS.pulse, text: isVi.value ? 'xung/chiều' : 'pulse/direction', x: 236 },
  { c: COLORS.zero, text: '0 V', x: 420 },
  { c: COLORS.plc, text: 'PLC → drive', x: 560 },
  { c: COLORS.status, text: 'drive → PLC', x: 760 }
])

const title = computed(() =>
  isVi.value
    ? `Sơ đồ chân QD75D4 → ${blockText.value}, trục ${axisNo.value}`
    : `QD75D4 pin map → ${blockText.value}, axis ${axisNo.value}`
)

const variantNote = computed(() => {
  if (variant.value === 'panasonic-minas-a6') {
    return isVi.value
      ? 'Ví dụ này không đấu READY; drive không có ngõ SRDY được ghi trong bảng chân.'
      : 'READY is not wired in this example; no SRDY output is documented for this drive.'
  }
  if (variant.value === 'stepper-dm542') {
    return isVi.value ? 'Ví dụ này không đấu READY.' : 'READY is not wired in this example.'
  }
  return ''
})

const note = computed(() =>
  isVi.value
    ? 'Sơ đồ chân do chúng tôi vẽ lại từ bảng chân trong trang và manual hãng; không dùng ảnh của bên thứ ba.'
    : 'Pin map drawn for this site from the page\u2019s pin table and the manufacturer manuals; no third-party images are used.'
)

const ticks = Array.from({ length: 12 }, (_, i) => 216 + i * 26)
</script>

<template>
  <figure class="pinmap-figure">
    <svg
      class="pinmap-diagram"
      viewBox="0 0 1100 680"
      role="img"
      :aria-label="title"
      :data-site="site.title"
      xmlns="http://www.w3.org/2000/svg"
      font-family="ui-sans-serif, system-ui, sans-serif"
      font-size="12"
    >
      <title>{{ title }}</title>

      <text x="20" y="60" font-size="16" font-weight="700" fill="var(--vp-c-text-1)">
        {{ title }}
      </text>

      <g class="pinmap-module">
        <rect x="20" y="96" width="170" height="504" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="32" y="118" font-size="15" font-weight="700" fill="var(--vp-c-text-1)">QD75D4({{ axisNo }})</text>
        <text x="32" y="136" font-size="11" fill="var(--vp-c-text-2)">axis {{ axisNo }}</text>
        <rect x="32" y="148" width="6" height="6" fill="var(--vp-c-success-1)" />
        <rect x="44" y="148" width="6" height="6" fill="var(--vp-c-warning-1)" />
        <rect x="56" y="148" width="6" height="6" fill="var(--vp-c-tip-1)" />
        <rect x="40" y="200" width="40" height="324" rx="3" fill="none" stroke="var(--vp-c-divider)" />
        <rect x="100" y="200" width="40" height="324" rx="3" fill="none" stroke="var(--vp-c-divider)" />
        <line v-for="t in ticks" :key="`a1-${t}`" x1="45" :y1="t" x2="75" :y2="t" stroke="var(--vp-c-divider)" stroke-width="1.5" />
        <line v-for="t in ticks" :key="`a2-${t}`" x1="105" :y1="t" x2="135" :y2="t" stroke="var(--vp-c-divider)" stroke-width="1.5" />
      </g>

      <g class="pinmap-rows">
        <g v-for="(row, i) in rows" :key="`row-${i}`">
          <line
            x1="430"
            :x2="row.busX ?? 700"
            :y1="row.y"
            :y2="row.y"
            :stroke="rowColor(row)"
            stroke-width="2"
          />
          <line
            v-if="row.busX"
            :x1="row.busX"
            :x2="row.busX"
            :y1="row.y"
            y2="120"
            :stroke="rowColor(row)"
            stroke-width="2"
          />
          <text x="205" :y="row.y + 4" text-anchor="start" fill="var(--vp-c-text-1)">{{ row.q }}</text>
          <text x="915" :y="row.y + 4" text-anchor="end" fill="var(--vp-c-text-1)">{{ row.d }}</text>
        </g>
      </g>

      <g class="pinmap-buses">
        <template v-if="hasP24">
          <line x1="656" x2="700" y1="120" y2="120" stroke="var(--vp-c-danger-1)" stroke-width="2" />
          <text x="704" y="117" font-size="11" fill="var(--vp-c-danger-1)">+24 V</text>
        </template>
        <template v-if="has0V">
          <line x1="680" x2="700" y1="132" y2="132" stroke="var(--vp-c-brand-1)" stroke-width="2" />
          <text x="704" y="136" font-size="11" fill="var(--vp-c-brand-1)">0 V</text>
        </template>
      </g>

      <g class="pinmap-drive">
        <rect x="930" y="96" width="150" height="504" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="940" y="118" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">{{ block.lines[0] }}</text>
        <text x="940" y="134" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">{{ block.lines[1] }}</text>
        <text x="940" y="156" font-size="11" fill="var(--vp-c-text-2)">{{ block.connector }}</text>
        <rect x="940" y="170" width="6" height="6" fill="var(--vp-c-success-1)" />
        <rect x="952" y="170" width="6" height="6" fill="var(--vp-c-warning-1)" />
        <rect x="964" y="170" width="6" height="6" fill="var(--vp-c-tip-1)" />
        <rect x="960" y="196" width="60" height="340" rx="3" fill="none" stroke="var(--vp-c-divider)" />
        <line v-for="t in ticks" :key="`d-${t}`" x1="966" :y1="t" x2="1014" :y2="t" stroke="var(--vp-c-divider)" stroke-width="1.5" />
      </g>

      <g class="pinmap-legend">
        <g v-for="item in legend" :key="item.text">
          <line :x1="item.x" :x2="item.x + 22" y1="659" y2="659" :stroke="item.c" stroke-width="3" />
          <text :x="item.x + 30" y="663" font-size="11" fill="var(--vp-c-text-2)">{{ item.text }}</text>
        </g>
      </g>

      <text v-if="variantNote" x="24" y="628" font-size="11" fill="var(--vp-c-text-2)">{{ variantNote }}</text>
      <text x="20" y="678" font-size="11" fill="var(--vp-c-text-2)">{{ note }}</text>
    </svg>
  </figure>
</template>

<style scoped>
.pinmap-figure {
  margin: 1rem 0;
}

.pinmap-diagram {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}
</style>
