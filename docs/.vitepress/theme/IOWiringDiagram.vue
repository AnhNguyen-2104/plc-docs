<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

type Variant = 'input-sink' | 'input-source' | 'output-relay' | 'output-transistor'

const props = defineProps<{ variant: Variant; module?: string }>()

const VARIANTS: Variant[] = ['input-sink', 'input-source', 'output-relay', 'output-transistor']

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')

const variant = computed<Variant>(() =>
  VARIANTS.includes(props.variant) ? props.variant : 'input-sink'
)

const DEFAULT_MODULE: Record<Variant, string> = {
  'input-sink': 'QX40',
  'input-source': 'QX80',
  'output-relay': 'QY10',
  'output-transistor': 'QY40P'
}

const model = computed(() => props.module ?? DEFAULT_MODULE[variant.value])
const isSinkInput = computed(() => variant.value === 'input-sink')
const isInput = computed(() => variant.value === 'input-sink' || variant.value === 'input-source')
const isRelay = computed(() => variant.value === 'output-relay')

const TITLES: Record<Variant, { vi: string; en: string }> = {
  'input-sink': { vi: 'Ngõ vào DC, common dương (NPN)', en: 'DC input, positive common (NPN)' },
  'input-source': { vi: 'Ngõ vào DC, common âm (PNP)', en: 'DC input, negative common (PNP)' },
  'output-relay': { vi: 'Ngõ ra rơ-le (tiếp điểm)', en: 'Relay (contact) output' },
  'output-transistor': { vi: 'Ngõ ra transistor, kiểu sink', en: 'Transistor output, sink type' }
}

const SUBTITLES: Record<Variant, { vi: string; en: string }> = {
  'input-sink': { vi: '16 DI · common dương · 24 VDC · ~4 mA', en: '16 DI · positive common · 24 VDC · ~4 mA' },
  'input-source': { vi: '16 DI · common âm · 24 VDC · ~4 mA', en: '16 DI · negative common · 24 VDC · ~4 mA' },
  'output-relay': { vi: '16 DO · rơ-le · 2 A/điểm · 8 A/common', en: '16 DO · relay · 2 A/point · 8 A/common' },
  'output-transistor': { vi: '16 DO · sink · 0,1 A/điểm · 1,6 A/common', en: '16 DO · sink · 0.1 A/point · 1.6 A/common' }
}

const subtitle = computed(() =>
  isVi.value ? SUBTITLES[variant.value].vi : SUBTITLES[variant.value].en
)

const title = computed(() =>
  `${model.value} — ${isVi.value ? TITLES[variant.value].vi : TITLES[variant.value].en}`
)

const ariaLabel = computed(() =>
  isVi.value
    ? `Sơ đồ mạch ${model.value}: ${TITLES[variant.value].vi}, có chiều dòng điện và photocoupler bên trong module.`
    : `${model.value} circuit diagram: ${TITLES[variant.value].en}, with the current path and the internal photocoupler.`
)

const comRail = computed(() =>
  isSinkInput.value ? '+24 V' : variant.value === 'input-source' ? '0 V' : '0 V'
)

const sensorTitle = computed(() => (isVi.value ? 'CẢM BIẾN' : 'SENSOR'))
const sensorType = computed(() => (isSinkInput.value ? 'NPN' : 'PNP'))
const loadTitle = computed(() => (isVi.value ? 'TẢI' : 'LOAD'))
const fuseTitle = computed(() => (isVi.value ? 'CẦU CHÌ' : 'FUSE'))
const surgeTitle = computed(() => (isVi.value ? 'triệt xung' : 'suppressor'))
const diodeTitle = computed(() => (isVi.value ? 'diode flyback' : 'flyback diode'))
const coilTitle = computed(() => (isVi.value ? 'cuộn hút' : 'coil'))
const contactTitle = computed(() => (isVi.value ? 'tiếp điểm' : 'contact'))
const photoTitle = computed(() => (isVi.value ? 'bộ ghép quang' : 'photocoupler'))
const pathTitle = computed(() => (isVi.value ? 'Chiều dòng khi ON' : 'Current path when ON'))

const internalLabel = computed(() =>
  isInput.value
    ? isVi.value
      ? 'Trong module: photocoupler (LED + transistor)'
      : 'Inside the module: photocoupler (LED + transistor)'
    : isRelay.value
      ? isVi.value
        ? 'Trong module: cuộn hút + tiếp điểm cách ly'
        : 'Inside the module: coil + isolated contact'
      : isVi.value
        ? 'Trong module: photocoupler + transistor ngõ ra'
        : 'Inside the module: photocoupler + output transistor'
)

const notes = computed<string[]>(() => {
  const common = isVi.value
    ? [
        `Điểm chung (COM) nối ${comRail.value}; điện áp 24 VDC đặt lên mạch qua tải hoặc qua cảm biến.`,
        'Đường nét đứt là chiều dòng điện khi ngõ vào/ngõ ra đang ON.',
        'Sơ đồ là logic, không phải bản vẽ lắp đặt; luôn đối chiếu sơ đồ chân của đúng model.'
      ]
    : [
        `The common (COM) connects to ${comRail.value}; 24 VDC is applied across the circuit through the load or the sensor.`,
        'The dashed path is the current direction while the input/output is ON.',
        'The drawing is logical, not an installation drawing; always cross-check the pinout of the exact model.'
      ]

  const variantNotes: Record<Variant, string[]> = {
    'input-sink': isVi.value
      ? [
          'Cảm biến NPN kéo dòng từ ngõ vào X về 0 V; COM của module nối +24 V.',
          'Dòng chạy +24 V → COM → mạch trong → X → cảm biến NPN → 0 V.'
        ]
      : [
          'The NPN sensor sinks current from input X to 0 V; the module COM goes to +24 V.',
          'Current flows +24 V → COM → internal circuit → X → NPN sensor → 0 V.'
        ],
    'input-source': isVi.value
      ? [
          'Cảm biến PNP đẩy dòng vào ngõ vào X; COM của module nối 0 V.',
          'Dòng chạy +24 V → cảm biến PNP → X → mạch trong → COM → 0 V.'
        ]
      : [
          'The PNP sensor sources current into input X; the module COM goes to 0 V.',
          'Current flows +24 V → PNP sensor → X → internal circuit → COM → 0 V.'
        ],
    'output-relay': isVi.value
      ? [
          'Tiếp điểm rơ-le đóng cắt tải; cầu chì bảo vệ đường tải khi ngắn mạch.',
          'Tải cảm (van, rơ-le) cần bộ triệt xung song song với cuộn dây.'
        ]
      : [
          'The relay contact switches the load; the fuse protects the load circuit against a short circuit.',
          'Inductive loads (valve, relay) need a surge suppressor across the coil.'
        ],
    'output-transistor': isVi.value
      ? [
          'Ngõ ra sink nối cực âm của tải về 0 V; cực dương của tải lên +24 V.',
          'Tải cảm (van, rơ-le) cần diode song song, cathode về +24 V.'
        ]
      : [
          'The sink output pulls the load negative side to 0 V; the load positive side goes to +24 V.',
          'Inductive loads (valve, relay) need a diode across the coil, cathode to +24 V.'
        ]
  }

  return [...variantNotes[variant.value], ...common]
})

const sourceLine = computed(() => {
  const prefix = isVi.value ? 'Nguồn:' : 'Source:'
  const map: Record<Variant, string> = {
    'input-sink': 'SH-080042 §2.4 p.2-4; SH-080483 §4.8.2 p.111',
    'input-source': 'SH-080042 §2.18 p.2-24; SH-080483 §4.8.2 p.111',
    'output-relay': 'SH-080042 §3.1 p.3-1, §1.2.2 p.1-5',
    'output-transistor': 'SH-080042 §3.5 p.3-7, §1.2.2 p.1-5'
  }
  return `${prefix} ${map[variant.value]}`
})

const sourceLong = computed(() =>
  isVi.value
    ? 'Nguồn: SH-080483 §4.8 p.105–118 (đấu dây nguồn, tiếp địa), §7.2.1 p.212–216 (nguồn module); SH-080042 §1.2.1–§1.2.2 p.1-1–1-7 (mạch vào/ra, diode, cầu chì), §2.4 p.2-4 (QX40), §2.18 p.2-24 (QX80), §3.1 p.3-1 (QY10), §3.3 p.3-4 (QY18A), §3.5 p.3-7 (QY40P).'
    : 'Sources: SH-080483 §4.8 p.105–118 (power wiring, grounding), §7.2.1 p.212–216 (module supply); SH-080042 §1.2.1–§1.2.2 p.1-1–1-7 (input/output circuits, diodes, fuses), §2.4 p.2-4 (QX40), §2.18 p.2-24 (QX80), §3.1 p.3-1 (QY10), §3.3 p.3-4 (QY18A), §3.5 p.3-7 (QY40P).'
)
</script>

<template>
  <figure class="iow-figure">
    <svg
      class="iow-diagram"
      viewBox="0 0 900 420"
      role="img"
      :aria-label="ariaLabel"
      xmlns="http://www.w3.org/2000/svg"
      font-family="ui-sans-serif, system-ui, sans-serif"
    >
      <title>{{ title }}</title>

      <text x="24" y="26" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">{{ title }}</text>
      <text x="24" y="44" font-size="10" fill="var(--vp-c-text-2)">{{ subtitle }}</text>

      <!-- supply rails -->
      <line x1="240" y1="40" x2="820" y2="40" stroke="var(--vp-c-danger-1)" stroke-width="2" />
      <line x1="240" y1="360" x2="820" y2="360" stroke="var(--vp-c-text-2)" stroke-width="2" />
      <text x="826" y="44" font-size="10" fill="var(--vp-c-danger-1)">+24 V</text>
      <text x="826" y="364" font-size="10" fill="var(--vp-c-text-2)">0 V</text>

      <!-- module frame -->
      <rect x="20" y="60" width="260" height="240" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
      <circle cx="280" cy="100" r="4" fill="var(--vp-c-text-2)" />
      <circle cx="280" cy="200" r="4" fill="var(--vp-c-text-2)" />

      <!-- ================= INPUTS ================= -->
      <g v-if="isInput">
        <text x="34" y="84" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">{{ model }}</text>
        <text x="34" y="100" font-size="9" fill="var(--vp-c-text-2)">{{ subtitle }}</text>
        <text x="286" y="96" font-size="9" fill="var(--vp-c-text-1)">{{ isSinkInput ? 'COM' : 'X' }}</text>
        <text x="286" y="204" font-size="9" fill="var(--vp-c-text-1)">{{ isSinkInput ? 'X' : 'COM' }}</text>

        <!-- internal series path: top = COM (sink) or X (source) -->
        <line x1="280" y1="100" x2="240" y2="100" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="240" y1="100" x2="240" y2="146" stroke="var(--vp-c-text-2)" stroke-width="1.4" />

        <!-- series resistor (top) -->
        <rect x="237" y="146" width="6" height="14" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-text-2)" />
        <text x="252" y="157" font-size="9" fill="var(--vp-c-text-2)">R</text>

        <line x1="240" y1="160" x2="240" y2="162" stroke="var(--vp-c-text-2)" stroke-width="1.4" />

        <template v-if="isSinkInput">
          <!-- diode cathode up: current rises from COM to X -->
          <polygon points="234,174 246,174 240,162" fill="var(--vp-c-text-2)" />
          <line x1="234" y1="174" x2="246" y2="174" stroke="var(--vp-c-text-2)" stroke-width="1.6" />
        </template>
        <template v-else>
          <!-- diode cathode down: current falls from X to COM -->
          <polygon points="234,162 246,162 240,174" fill="var(--vp-c-text-2)" />
          <line x1="234" y1="162" x2="246" y2="162" stroke="var(--vp-c-text-2)" stroke-width="1.6" />
        </template>

        <line x1="240" y1="174" x2="240" y2="200" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="240" y1="200" x2="280" y2="200" stroke="var(--vp-c-text-2)" stroke-width="1.4" />

        <!-- photocoupler -->
        <circle cx="150" cy="175" r="18" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-text-2)" />
        <line x1="142" y1="164" x2="142" y2="186" stroke="var(--vp-c-text-2)" stroke-width="1.6" />
        <line x1="142" y1="175" x2="132" y2="175" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="142" y1="168" x2="158" y2="158" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="142" y1="182" x2="158" y2="192" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="226" y1="152" x2="176" y2="166" stroke="var(--vp-c-text-2)" stroke-width="1.2" />
        <polygon points="176,166 184,160 183,169" fill="var(--vp-c-text-2)" />
        <line x1="226" y1="164" x2="176" y2="178" stroke="var(--vp-c-text-2)" stroke-width="1.2" />
        <polygon points="176,178 184,172 183,181" fill="var(--vp-c-text-2)" />
        <text x="118" y="212" font-size="8.5" fill="var(--vp-c-text-2)">{{ photoTitle }}</text>

        <!-- external sensor -->
        <rect x="400" y="130" width="140" height="100" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="470" y="172" text-anchor="middle" font-size="11" font-weight="700" fill="var(--vp-c-text-1)">{{ sensorTitle }}</text>
        <text x="470" y="190" text-anchor="middle" font-size="11" fill="var(--vp-c-success-1)">{{ sensorType }}</text>
        <text x="478" y="140" font-size="8.5" fill="var(--vp-c-text-2)">V+</text>
        <text x="478" y="250" font-size="8.5" fill="var(--vp-c-text-2)">0 V</text>
        <text x="392" y="156" text-anchor="end" font-size="8.5" fill="var(--vp-c-text-2)">OUT</text>

        <line x1="470" y1="130" x2="470" y2="40" stroke="var(--vp-c-danger-1)" stroke-width="1.6" />
        <circle cx="470" cy="40" r="3" fill="var(--vp-c-danger-1)" />
        <line x1="470" y1="230" x2="470" y2="360" stroke="var(--vp-c-text-2)" stroke-width="1.6" />
        <circle cx="470" cy="360" r="3" fill="var(--vp-c-text-2)" />

        <template v-if="isSinkInput">
          <path d="M280 200 H330 V160 H400" stroke="var(--vp-c-success-1)" stroke-width="1.6" fill="none" />
          <path d="M280 100 H320 V40" stroke="var(--vp-c-danger-1)" stroke-width="1.6" fill="none" />
          <circle cx="320" cy="40" r="3" fill="var(--vp-c-danger-1)" />
        </template>
        <template v-else>
          <path d="M280 100 H340 V160 H400" stroke="var(--vp-c-success-1)" stroke-width="1.6" fill="none" />
          <path d="M280 200 H320 V360" stroke="var(--vp-c-text-2)" stroke-width="1.6" fill="none" />
          <circle cx="320" cy="360" r="3" fill="var(--vp-c-text-2)" />
        </template>
      </g>

      <!-- ================= RELAY OUTPUT ================= -->
      <g v-else-if="isRelay">
        <text x="34" y="84" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">{{ model }}</text>
        <text x="34" y="100" font-size="9" fill="var(--vp-c-text-2)">{{ subtitle }}</text>
        <text x="286" y="116" font-size="9" fill="var(--vp-c-text-1)">Y</text>
        <text x="286" y="224" font-size="9" fill="var(--vp-c-text-1)">COM</text>
        <circle cx="280" cy="120" r="4" fill="var(--vp-c-text-2)" />
        <circle cx="280" cy="220" r="4" fill="var(--vp-c-text-2)" />

        <!-- contact -->
        <line x1="280" y1="120" x2="240" y2="120" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <circle cx="240" cy="120" r="3" fill="var(--vp-c-text-2)" />
        <line x1="240" y1="120" x2="212" y2="148" stroke="var(--vp-c-text-2)" stroke-width="1.6" />
        <circle cx="240" cy="180" r="3" fill="var(--vp-c-text-2)" />
        <line x1="240" y1="180" x2="240" y2="220" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="240" y1="220" x2="280" y2="220" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <text x="196" y="116" text-anchor="end" font-size="8.5" fill="var(--vp-c-text-2)">{{ contactTitle }}</text>

        <!-- coil -->
        <path d="M140 220 Q146 208 152 220 Q158 208 164 220 Q170 208 176 220" fill="none" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="140" y1="220" x2="128" y2="220" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <text x="120" y="205" font-size="8.5" fill="var(--vp-c-text-2)">{{ coilTitle }}</text>
        <line x1="164" y1="204" x2="224" y2="150" stroke="var(--vp-c-text-2)" stroke-width="1" stroke-dasharray="4 3" />

        <!-- photocoupler drive -->
        <circle cx="90" cy="250" r="14" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-text-2)" />
        <polygon points="84,250 94,250 89,257" fill="var(--vp-c-text-2)" />
        <line x1="84" y1="257" x2="94" y2="257" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="94" y1="252" x2="104" y2="246" stroke="var(--vp-c-text-2)" stroke-width="1" />
        <line x1="94" y1="256" x2="104" y2="250" stroke="var(--vp-c-text-2)" stroke-width="1" />
        <text x="112" y="254" font-size="8.5" fill="var(--vp-c-text-2)">{{ photoTitle }}</text>

        <!-- external circuit: +24 -> fuse -> load -> Y -> contact -> COM -> 0 V -->
        <path d="M280 120 H360 V180 H480 V170" stroke="var(--vp-c-text-1)" stroke-width="1.6" fill="none" />
        <line x1="480" y1="90" x2="480" y2="84" stroke="var(--vp-c-text-1)" stroke-width="1.6" />
        <rect x="462" y="60" width="36" height="24" rx="4" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="480" y="75" text-anchor="middle" font-size="7.5" fill="var(--vp-c-text-1)">{{ fuseTitle }}</text>
        <line x1="480" y1="60" x2="480" y2="40" stroke="var(--vp-c-danger-1)" stroke-width="1.6" />
        <circle cx="480" cy="40" r="3" fill="var(--vp-c-danger-1)" />

        <rect x="400" y="90" width="160" height="80" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="480" y="126" text-anchor="middle" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">{{ loadTitle }}</text>
        <text x="480" y="144" text-anchor="middle" font-size="8.5" fill="var(--vp-c-text-2)">24 VDC / 240 VAC</text>

        <path d="M560 90 H600 V170 H560" fill="none" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <rect x="594" y="118" width="12" height="24" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-text-2)" />
        <line x1="588" y1="118" x2="612" y2="142" stroke="var(--vp-c-text-2)" stroke-width="1" />
        <text x="612" y="134" font-size="8.5" fill="var(--vp-c-text-2)">{{ surgeTitle }}</text>

        <path d="M280 220 H320 V360" stroke="var(--vp-c-text-2)" stroke-width="1.6" fill="none" />
        <circle cx="320" cy="360" r="3" fill="var(--vp-c-text-2)" />
      </g>

      <!-- ================= TRANSISTOR OUTPUT ================= -->
      <g v-else>
        <text x="34" y="84" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">{{ model }}</text>
        <text x="34" y="100" font-size="9" fill="var(--vp-c-text-2)">{{ subtitle }}</text>
        <text x="286" y="96" font-size="9" fill="var(--vp-c-text-1)">12/24 VDC</text>
        <text x="286" y="174" font-size="9" fill="var(--vp-c-text-1)">Y</text>
        <text x="286" y="244" font-size="9" fill="var(--vp-c-text-1)">COM</text>
        <circle cx="280" cy="100" r="4" fill="var(--vp-c-text-2)" />
        <circle cx="280" cy="170" r="4" fill="var(--vp-c-text-2)" />
        <circle cx="280" cy="240" r="4" fill="var(--vp-c-text-2)" />

        <!-- output transistor: collector at Y, emitter at COM -->
        <line x1="280" y1="170" x2="240" y2="170" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="240" y1="170" x2="232" y2="170" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="232" y1="170" x2="232" y2="178" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="212" y1="178" x2="212" y2="202" stroke="var(--vp-c-text-2)" stroke-width="1.6" />
        <line x1="212" y1="186" x2="232" y2="178" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="212" y1="194" x2="232" y2="204" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <polygon points="226,197 234,199 231,207" fill="var(--vp-c-text-2)" />
        <line x1="232" y1="204" x2="232" y2="240" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="232" y1="240" x2="280" y2="240" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="200" y1="190" x2="212" y2="190" stroke="var(--vp-c-text-2)" stroke-width="1.2" />
        <text x="188" y="228" font-size="8.5" fill="var(--vp-c-text-2)">Tr</text>

        <!-- photocoupler drive -->
        <circle cx="110" cy="250" r="16" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-text-2)" />
        <polygon points="102,250 114,250 108,259" fill="var(--vp-c-text-2)" />
        <line x1="102" y1="259" x2="114" y2="259" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <line x1="114" y1="252" x2="126" y2="246" stroke="var(--vp-c-text-2)" stroke-width="1" />
        <line x1="114" y1="256" x2="126" y2="250" stroke="var(--vp-c-text-2)" stroke-width="1" />
        <circle cx="152" cy="250" r="16" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-text-2)" />
        <line x1="144" y1="240" x2="144" y2="260" stroke="var(--vp-c-text-2)" stroke-width="1.6" />
        <line x1="144" y1="250" x2="134" y2="250" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <text x="96" y="288" font-size="8.5" fill="var(--vp-c-text-2)">{{ photoTitle }}</text>
        <line x1="168" y1="242" x2="206" y2="196" stroke="var(--vp-c-text-2)" stroke-width="1" stroke-dasharray="4 3" />

        <line x1="280" y1="100" x2="250" y2="100" stroke="var(--vp-c-danger-1)" stroke-width="1.6" />
        <line x1="250" y1="100" x2="250" y2="40" stroke="var(--vp-c-danger-1)" stroke-width="1.6" />
        <circle cx="250" cy="40" r="3" fill="var(--vp-c-danger-1)" />

        <!-- external load: +24 -> load -> Y, diode across the load -->
        <line x1="480" y1="40" x2="480" y2="70" stroke="var(--vp-c-danger-1)" stroke-width="1.6" />
        <rect x="400" y="70" width="160" height="80" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="480" y="106" text-anchor="middle" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">{{ loadTitle }}</text>
        <text x="480" y="122" text-anchor="middle" font-size="8.5" fill="var(--vp-c-text-2)">12–24 VDC</text>
        <line x1="480" y1="150" x2="480" y2="170" stroke="var(--vp-c-text-1)" stroke-width="1.6" />
        <line x1="280" y1="170" x2="360" y2="170" stroke="var(--vp-c-text-1)" stroke-width="1.6" />
        <line x1="360" y1="170" x2="480" y2="170" stroke="var(--vp-c-text-1)" stroke-width="1.6" />

        <path d="M560 70 H640 V150 H560" fill="none" stroke="var(--vp-c-text-2)" stroke-width="1.4" />
        <polygon points="634,108 646,108 640,96" fill="var(--vp-c-text-2)" />
        <line x1="634" y1="96" x2="646" y2="96" stroke="var(--vp-c-text-2)" stroke-width="1.6" />
        <text x="652" y="104" font-size="8.5" fill="var(--vp-c-text-2)">{{ diodeTitle }}</text>

        <path d="M280 240 H320 V360" stroke="var(--vp-c-text-2)" stroke-width="1.6" fill="none" />
        <circle cx="320" cy="360" r="3" fill="var(--vp-c-text-2)" />

        <text x="400" y="196" font-size="9" fill="var(--vp-c-text-2)">0.1 A/point · 1.6 A/common</text>
      </g>

      <text x="34" y="318" font-size="8.5" fill="var(--vp-c-text-2)">{{ internalLabel }}</text>

      <!-- current path note -->
      <line x1="34" y1="382" x2="220" y2="382" stroke="var(--vp-c-success-1)" stroke-width="1.8" stroke-dasharray="6 4" />
      <polygon points="220,377 232,382 220,387" fill="var(--vp-c-success-1)" />
      <text x="240" y="386" font-size="10" font-weight="700" fill="var(--vp-c-success-1)">{{ pathTitle }}</text>

      <text x="24" y="410" font-size="9" fill="var(--vp-c-text-2)">{{ sourceLine }}</text>
    </svg>

    <figcaption class="iow-notes">
      <ul>
        <li v-for="(item, index) in notes" :key="`note-${index}`">{{ item }}</li>
      </ul>
      <p class="iow-source">{{ sourceLong }}</p>
    </figcaption>
  </figure>
</template>

<style scoped>
.iow-figure {
  margin: 1rem 0;
}

.iow-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.iow-notes {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.iow-notes ul {
  margin: 0.5rem 0;
  padding-left: 1.2rem;
}

.iow-source {
  font-size: 12px;
}
</style>
