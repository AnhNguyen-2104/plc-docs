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

const props = defineProps<{ variant?: Variant; axis?: string }>()

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')
const variant = computed<Variant>(() => props.variant ?? 'generic')
const axisNo = computed(() => props.axis ?? '1')

type Pin = { q: string; d: string }

const pins = computed<Pin[]>(() => {
  const a = axisNo.value
  const pulse: Pin[] = [
    { q: `${a}A15 PULSE F+`, d: 'PP' },
    { q: `${a}A16 PULSE F−`, d: 'PG' },
    { q: `${a}A17 PULSE R+`, d: 'NP' },
    { q: `${a}A18 PULSE R−`, d: 'NG' }
  ]
  switch (variant.value) {
    case 'mr-j4-a':
      return [
        { q: `${a}A15 PULSE F+`, d: 'PP 10' },
        { q: `${a}A16 PULSE F−`, d: 'PG 11' },
        { q: `${a}A17 PULSE R+`, d: 'NP 35' },
        { q: `${a}A18 PULSE R−`, d: 'NG 36' },
        { q: `${a}A11 READY`, d: 'RD 49' },
        { q: `${a}A12 RDYCOM`, d: '+24 V' },
        { q: '0 V', d: 'DOCOM 46/47' },
        { q: 'PLC output', d: 'SON 15' },
        { q: 'drive output', d: 'ALM 48 → PLC' }
      ]
    case 'delta-b2':
      return [
        { q: `${a}A15 PULSE F+`, d: 'PULSE 43' },
        { q: `${a}A16 PULSE F−`, d: '/PULSE 41' },
        { q: `${a}A17 PULSE R+`, d: 'SIGN 39' },
        { q: `${a}A18 PULSE R−`, d: '/SIGN 37' },
        { q: `${a}A11 READY`, d: 'DO1+ 7' },
        { q: `${a}A12 RDYCOM`, d: 'COM+ 11 (+24 V)' },
        { q: '0 V', d: 'DO1− 6 / COM− 14' },
        { q: 'PLC output', d: 'SON 9' },
        { q: 'drive output', d: 'ALRM 28/27 → PLC' }
      ]
    case 'yaskawa-sigma7':
      return [
        { q: `${a}A15 PULSE F+`, d: 'PULS 7' },
        { q: `${a}A16 PULSE F−`, d: '/PULS 8' },
        { q: `${a}A17 PULSE R+`, d: 'SIGN 11' },
        { q: `${a}A18 PULSE R−`, d: '/SIGN 12' },
        { q: 'PLC output', d: '/S-ON 40' },
        { q: 'drive output', d: 'ALM+ 31 / ALM− 32 → PLC' },
        { q: '0 V', d: 'SG 1,2,6,10' },
        { q: '+24 V', d: '+24VIN 47' }
      ]
    case 'panasonic-minas-a6':
      return [
        { q: `${a}A15 PULSE F+`, d: 'PULSH1 44' },
        { q: `${a}A16 PULSE F−`, d: 'PULSH2 45' },
        { q: `${a}A17 PULSE R+`, d: 'SIGNH1 46' },
        { q: `${a}A18 PULSE R−`, d: 'SIGNH2 47' },
        { q: 'PLC output', d: 'SRV-ON 29' },
        { q: 'drive output', d: 'ALM 36/37 → PLC' },
        { q: '0 V', d: 'SI-COM 7' }
      ]
    case 'stepper-dm542':
      return [
        { q: `${a}A15 PULSE F+`, d: 'PUL+ P1' },
        { q: `${a}A16 PULSE F−`, d: 'PUL− P1' },
        { q: `${a}A17 PULSE R+`, d: 'DIR+ P1' },
        { q: `${a}A18 PULSE R−`, d: 'DIR− P1' },
        { q: 'PLC output', d: 'ENA+ P1' }
      ]
    default:
      return [
        ...pulse,
        { q: `${a}A11 READY`, d: 'RD' },
        { q: `${a}A12 RDYCOM`, d: 'DOCOM' },
        { q: 'PLC output', d: 'SON' },
        { q: 'drive output', d: 'ALM → PLC' }
      ]
  }
})

const routed = new Set(['PLC output', 'drive output', '+24 V', '0 V'])

function rowY(index: number) {
  return 100 + index * 26
}

function isTwisted(index: number) {
  return index < 4
}

function isRouted(q: string) {
  return routed.has(q)
}

function crossPath(y: number) {
  return `M574 ${y - 4} L586 ${y + 4} M586 ${y - 4} L574 ${y + 4}`
}

const BOX_TITLES: Record<Variant, string> = {
  generic: 'Driver servo (CN1)',
  'stepper-dm542': 'DM542 (P1)',
  'mr-j4-a': 'MR-J4-A (CN1)',
  'delta-b2': 'ASDA-B2 (CN1)',
  'yaskawa-sigma7': 'SGD7S (CN1)',
  'panasonic-minas-a6': 'MINAS A6'
}

const boxTitle = computed(() => BOX_TITLES[variant.value])

const title = computed(() =>
  isVi.value
    ? `QD75D4 → ${boxTitle.value}, trục ${axisNo.value}`
    : `QD75D4 → ${boxTitle.value}, axis ${axisNo.value}`
)

const ariaLabel = computed(() =>
  isVi.value
    ? `Sơ đồ đấu dây QD75D4 trục ${axisNo.value} tới ${boxTitle.value}`
    : `Wiring diagram from QD75D4 axis ${axisNo.value} to ${boxTitle.value}`
)

const estopLabel = computed(() =>
  isVi.value ? 'E-stop cắt động lực độc lập PLC' : 'E-stop cuts power independently of the PLC'
)

const sourceLabel = computed(() =>
  isVi.value
    ? 'Nguồn chân: SH-080058 §3.4.2 p.3-25, §3.4.3 p.3-26–3-27; chân driver theo manual hãng.'
    : 'Pin sources: SH-080058 §3.4.2 p.3-25, §3.4.3 p.3-26–3-27; drive pins per the manufacturer manual.'
)

const pulseLegend = computed(() => {
  const p = pins.value.slice(0, 4)
  if (p.length < 4) return []
  const pair = (a: Pin, b: Pin) => `${a.q} → ${a.d}, ${b.q} → ${b.d}`
  return [
    isVi.value
      ? `Cặp 1: ${pair(p[0], p[1])} — vi sai, không tách`
      : `Pair 1: ${pair(p[0], p[1])} — differential, do not split`,
    isVi.value
      ? `Cặp 2: ${pair(p[2], p[3])} — vi sai, không tách`
      : `Pair 2: ${pair(p[2], p[3])} — differential, do not split`
  ]
})

const legendItems = computed<string[]>(() => {
  const pulse = pulseLegend.value
  const items = isVi.value
    ? [
        ...pulse,
        'READY 1A11 ← ngõ ra sẵn sàng của drive (kiểu sink)',
        'RDYCOM 1A12 ← +24 V của nguồn nhóm ngõ vào, không phải DICOM',
        'SON ← ngõ ra transistor của PLC, không phải QD75D4',
        'ALM → ngõ vào PLC để liên động',
        'E-stop cắt động lực độc lập với PLC'
      ]
    : [
        ...pulse,
        'READY 1A11 ← drive ready output (sinking type)',
        'RDYCOM 1A12 ← +24 V of the input-group supply, not DICOM',
        'SON ← PLC transistor output, not QD75D4',
        'ALM → PLC input for interlocking',
        'E-stop cuts power independently of the PLC'
      ]
  const readyLines = variant.value === 'delta-b2'
    ? (isVi.value
        ? ['READY 1A11 ← DO1+ 7 (SRDY), DO1− 6 → 0 V', 'RDYCOM 1A12 → COM+ 11 (+24 V), chung nguồn nhóm I/O']
        : ['READY 1A11 ← DO1+ 7 (SRDY), DO1− 6 → 0 V', 'RDYCOM 1A12 → COM+ 11 (+24 V), same supply as the I/O group'])
    : variant.value === 'mr-j4-a'
      ? (isVi.value
          ? ['READY 1A11 ← RD 49, DOCOM 46/47 → 0 V', 'RDYCOM 1A12 → +24 V; DOCOM 46/47 là chung của nhóm ngõ ra']
          : ['READY 1A11 ← RD 49, DOCOM 46/47 → 0 V', 'RDYCOM 1A12 → +24 V; DOCOM 46/47 is the output-group common'])
      : []
  const readyLines2 = variant.value === 'yaskawa-sigma7'
    ? (isVi.value
        ? ['READY 1A11 ← ngõ ra S-RDY(+) của drive', 'RDYCOM 1A12 ← S-RDY(−): cặp cách ly, không phải +24 V']
        : ['READY 1A11 ← drive S-RDY(+) output', 'RDYCOM 1A12 ← S-RDY(−): isolated pair, not +24 V'])
    : []
  if (readyLines2.length) items.splice(pulse.length, 2, ...readyLines2)
  if (readyLines.length) items.splice(pulse.length, 2, ...readyLines)
  if (variant.value === 'mr-j4-a') {
    items.push(
      isVi.value
        ? 'PP/PG dùng chung DI2/DI3 → gán lại bằng Pr.PD44/PD46'
        : 'PP/PG shared with DI2/DI3 → reassign with Pr.PD44/PD46'
    )
  }
  return items
})
</script>

<template>
  <figure class="wiring-figure">
    <svg
      class="wiring-diagram"
      :class="`wiring-diagram--${variant}`"
      viewBox="0 0 960 460"
      role="img"
      :aria-label="ariaLabel"
      xmlns="http://www.w3.org/2000/svg"
      font-family="ui-sans-serif, system-ui, sans-serif"
      font-size="12"
    >
      <title>{{ title }}</title>

      <g class="wiring-wires">
        <template v-for="(pin, index) in pins" :key="`wire-${index}`">
          <template v-if="isTwisted(index)">
            <line
              x1="520"
              :y1="rowY(index) - 2"
              x2="640"
              :y2="rowY(index) - 2"
              stroke="var(--vp-c-brand-1)"
              stroke-width="1.5"
            />
            <line
              x1="520"
              :y1="rowY(index) + 2"
              x2="640"
              :y2="rowY(index) + 2"
              stroke="var(--vp-c-brand-1)"
              stroke-width="1.5"
            />
            <path :d="crossPath(rowY(index))" stroke="var(--vp-c-text-2)" stroke-width="1" fill="none" />
          </template>
          <line
            v-else-if="isRouted(pin.q)"
            x1="220"
            :y1="rowY(index)"
            x2="640"
            :y2="rowY(index)"
            stroke="var(--vp-c-warning-1)"
            stroke-width="1.5"
            stroke-dasharray="4 3"
          />
          <line
            v-else
            x1="520"
            :y1="rowY(index)"
            x2="640"
            :y2="rowY(index)"
            stroke="var(--vp-c-brand-1)"
            stroke-width="1.5"
          />
        </template>
      </g>

      <g class="wiring-boxes">
        <rect x="20" y="70" width="200" height="320" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <rect x="340" y="70" width="180" height="320" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <rect x="640" y="70" width="290" height="320" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
      </g>

      <g class="wiring-labels">
        <text x="35" y="88" font-size="15" font-weight="700" fill="var(--vp-c-text-1)">PLC CPU (MELSEC Q)</text>
        <text x="35" y="120" fill="var(--vp-c-text-2)">Y0 PLC READY</text>
        <text x="35" y="145" fill="var(--vp-c-text-2)">Y10… positioning start</text>
        <text x="35" y="170" fill="var(--vp-c-text-2)">transistor output</text>

        <text x="355" y="88" font-size="15" font-weight="700" fill="var(--vp-c-text-1)">QD75D4</text>

        <text x="655" y="88" font-size="15" font-weight="700" fill="var(--vp-c-text-1)">{{ boxTitle }}</text>

        <template v-for="(pin, index) in pins" :key="`label-${index}`">
          <text x="515" :y="rowY(index) + 4" text-anchor="end" fill="var(--vp-c-text-2)">{{ pin.q }}</text>
          <text x="645" :y="rowY(index) + 4" fill="var(--vp-c-text-2)">{{ pin.d }}</text>
        </template>
      </g>

      <g class="wiring-motor" stroke="var(--vp-c-text-1)" fill="none">
        <line x1="860" y1="390" x2="872" y2="418" stroke-width="1.5" />
        <line x1="905" y1="390" x2="888" y2="418" stroke-width="1.5" />
        <circle cx="880" cy="430" r="14" stroke-width="1.5" />
        <text x="880" y="435" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)" stroke="none">M</text>
        <text x="790" y="410" fill="var(--vp-c-text-2)" stroke="none">U V W</text>
        <text x="790" y="426" fill="var(--vp-c-text-2)" stroke="none">encoder</text>
      </g>

      <g class="wiring-legend-g">
        <line x1="20" y1="400" x2="60" y2="400" stroke="var(--vp-c-warning-1)" stroke-width="1.5" stroke-dasharray="4 3" />
        <text x="70" y="404" fill="var(--vp-c-text-2)">SON: PLC → drive</text>
        <text x="20" y="424" fill="var(--vp-c-text-2)">{{ estopLabel }}</text>
      </g>
    </svg>
    <figcaption class="wiring-legend">
      <ul>
        <li v-for="(item, index) in legendItems" :key="`legend-${index}`">{{ item }}</li>
      </ul>
      <p class="wiring-source">{{ sourceLabel }}</p>
    </figcaption>
  </figure>
</template>

<style scoped>
.wiring-figure {
  margin: 1rem 0;
}

.wiring-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.wiring-legend {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.wiring-legend ul {
  margin: 0.5rem 0;
  padding-left: 1.2rem;
}

.wiring-source {
  font-size: 12px;
}
</style>
