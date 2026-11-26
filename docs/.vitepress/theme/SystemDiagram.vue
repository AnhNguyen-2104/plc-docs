<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { qModules } from '../data/modules/qseries'
type SlotColor = 'power' | 'io' | 'motion' | 'net' | 'neutral'

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')

const COLOR: Record<SlotColor, string> = {
  power: 'var(--vp-c-danger-1)',
  io: 'var(--vp-c-success-1)',
  motion: 'var(--vp-c-brand-1)',
  net: 'var(--vp-c-warning-1)',
  neutral: 'var(--vp-c-text-2)'
}

type Slot = {
  no: number
  model: string
  role: { vi: string; en: string }
  spec: { vi: string; en: string }
  color: SlotColor
}

const slots: Slot[] = [
  {
    no: 0,
    model: 'Q61P',
    role: { vi: 'Nguồn 5 V', en: '5 V supply' },
    spec: { vi: '5 VDC 6 A', en: '5 VDC 6 A' },
    color: 'power'
  },
  {
    no: 1,
    model: 'Q03UDV',
    role: { vi: 'CPU điều khiển', en: 'Controller CPU' },
    spec: { vi: '0.58 A @5 V', en: '0.58 A @5 V' },
    color: 'neutral'
  },
  {
    no: 2,
    model: 'QX40',
    role: { vi: '16 ngõ vào', en: '16 inputs' },
    spec: { vi: '24 VDC 4 mA', en: '24 VDC 4 mA' },
    color: 'io'
  },
  {
    no: 3,
    model: 'QY40P',
    role: { vi: '16 ngõ ra', en: '16 outputs' },
    spec: { vi: '0.1 A/điểm', en: '0.1 A/point' },
    color: 'io'
  },
  {
    no: 4,
    model: 'QD75D4',
    role: { vi: 'Định vị 4 trục', en: '4-axis motion' },
    spec: { vi: '0.82 A @5 V', en: '0.82 A @5 V' },
    color: 'motion'
  },
  {
    no: 5,
    model: 'QD62',
    role: { vi: 'Đếm xung', en: 'Pulse counter' },
    spec: { vi: '0.30 A @5 V', en: '0.30 A @5 V' },
    color: 'motion'
  },
  {
    no: 6,
    model: 'Q64AD',
    role: { vi: '4 kênh analog', en: '4 analog in' },
    spec: { vi: '0.63 A @5 V', en: '0.63 A @5 V' },
    color: 'neutral'
  },
  {
    no: 7,
    model: 'QJ71E71-100',
    role: { vi: 'Ethernet', en: 'Ethernet' },
    spec: { vi: '0.50 A @5 V', en: '0.50 A @5 V' },
    color: 'net'
  }
]

const slotX = (index: number) => 258 + index * 72
const slotCx = (index: number) => slotX(index) + 35
const pick = (value: { vi: string; en: string }) => (isVi.value ? value.vi : value.en)
const slotPhoto = (model: string) => {
  const module = qModules.find((entry) => entry.model === model)
  return module?.photoThumb ? withBase(module.photoThumb) : ''
}

const title = computed(() =>
  isVi.value ? 'Hệ thống Q hoàn chỉnh — rack Q38B' : 'Complete Q system — Q38B rack'
)

const ariaLabel = computed(() =>
  isVi.value
    ? 'Sơ đồ tổng thể hệ thống MELSEC Q: base Q38B tám vị trí, nguồn Q61P, CPU Q03UDV, các module I/O và chuyển động, thiết bị ngoài, nguồn 24 VDC và tủ động lực.'
    : 'Complete MELSEC Q system diagram: an eight-position Q38B base with Q61P supply, Q03UDV CPU, I/O and motion modules, field devices, a 24 VDC supply and the power rails.'
)

const baseTitle = computed(() =>
  isVi.value ? 'Base unit Q38B' : 'Q38B base unit'
)

const baseSub = computed(() =>
  isVi.value ? 'Vị trí 0–7 · cấu hình tham chiếu' : 'Positions 0–7 · reference configuration'
)

const leftTitle = computed(() => (isVi.value ? 'Thiết bị ngoài' : 'Field devices'))
const sensorTitle = computed(() => (isVi.value ? 'Cảm biến NPN / PNP' : 'NPN / PNP sensors'))
const sensorSub = computed(() => (isVi.value ? 'ngõ vào X' : 'X inputs'))
const buttonTitle = computed(() => (isVi.value ? 'Nút nhấn / E-stop' : 'Pushbutton / E-stop'))
const buttonSub = computed(() => (isVi.value ? 'dừng khẩn cấp' : 'emergency stop'))
const relayTitle = computed(() => (isVi.value ? 'Rơ-le / đèn / van' : 'Relay / lamp / valve'))
const relaySub = computed(() => (isVi.value ? 'tải ngõ ra Y' : 'Y output loads'))
const supplyTitle = computed(() => (isVi.value ? 'Nguồn 24 VDC' : '24 VDC supply'))
const supplySub = computed(() => (isVi.value ? 'nguồn ngoài cho I/O' : 'external I/O supply'))
const acTitle = computed(() => (isVi.value ? 'AC 100–240 V' : 'AC 100–240 V'))
const acSub = computed(() => (isVi.value ? 'vào Q61P' : 'into Q61P'))
const hmiTitle = computed(() => (isVi.value ? 'HMI / PC' : 'HMI / PC'))
const hmiSub = computed(() => (isVi.value ? 'Ethernet 100BASE-TX' : 'Ethernet 100BASE-TX'))
const ampTitle = computed(() => 'MR-J4-A')
const ampSub = computed(() => (isVi.value ? 'khuếch đại servo' : 'servo amplifier'))
const motorLabel = computed(() => (isVi.value ? 'động cơ servo' : 'servo motor'))
const encoderLabel = computed(() => (isVi.value ? 'encoder' : 'encoder'))
const loadTitle = computed(() => (isVi.value ? 'Tải DC 24 V' : 'DC 24 V loads'))
const loadSub = computed(() => (isVi.value ? 'đèn / van / rơ-le' : 'lamp / valve / relay'))
const legendTitle = computed(() => (isVi.value ? 'Chú thích' : 'Legend'))

const legend = computed(() => [
  { color: COLOR.power, label: isVi.value ? 'Nguồn (AC/DC)' : 'Power (AC/DC)' },
  { color: COLOR.io, label: isVi.value ? 'I/O số (X/Y)' : 'Digital I/O (X/Y)' },
  { color: COLOR.motion, label: isVi.value ? 'Chuyển động (xung)' : 'Motion (pulse)' },
  { color: COLOR.net, label: isVi.value ? 'Mạng (Ethernet)' : 'Network (Ethernet)' }
])

const note = computed(() =>
  isVi.value
    ? 'Nguồn: SH-080483 §7.2.1. Sơ đồ là logic; Q61P không có ngõ ra 24 V nên nhóm I/O dùng nguồn 24 VDC ngoài.'
    : 'Source: SH-080483 §7.2.1. The drawing is logical; Q61P has no 24 V output, so the I/O group uses an external 24 VDC supply.'
)

const neutralNote = computed(() =>
  isVi.value
    ? 'CPU và module analog dùng màu chữ trung tính.'
    : 'CPU and analog modules use the neutral text colour.'
)
</script>

<template>
  <figure class="system-figure">
    <svg
      class="system-diagram"
      viewBox="0 0 1100 720"
      role="img"
      :aria-label="ariaLabel"
      xmlns="http://www.w3.org/2000/svg"
      font-family="ui-sans-serif, system-ui, sans-serif"
    >
      <title>{{ title }}</title>

      <!-- base unit -->
      <g>
        <rect x="248" y="118" width="594" height="164" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="262" y="138" font-size="14" font-weight="700" fill="var(--vp-c-text-1)">{{ baseTitle }}</text>
        <text x="262" y="154" font-size="9.5" fill="var(--vp-c-text-2)">{{ baseSub }}</text>

        <template v-for="(slot, index) in slots" :key="`slot-${slot.no}`">
          <rect
            :x="slotX(index)"
            y="176"
            width="70"
            height="86"
            rx="5"
            fill="var(--vp-c-bg-soft)"
            :stroke="COLOR[slot.color]"
            stroke-width="1.2"
          />
          <rect :x="slotX(index)" y="176" width="70" height="3" rx="1.5" :fill="COLOR[slot.color]" />
          <text
            :x="slotCx(index)"
            y="171"
            text-anchor="middle"
            font-size="10"
            fill="var(--vp-c-text-2)"
          >{{ slot.no }}</text>
          <text
            :x="slotCx(index)"
            y="196"
            text-anchor="middle"
            font-size="9"
            font-weight="700"
            fill="var(--vp-c-text-1)"
          >{{ slot.model }}</text>
          <image
            v-if="slotPhoto(slot.model)"
            :href="slotPhoto(slot.model)"
            :x="slotX(index) + 4"
            y="202"
            width="62"
            height="47"
            preserveAspectRatio="xMidYMid meet"
          />
          <template v-else>
            <text
              :x="slotCx(index)"
              y="212"
              text-anchor="middle"
              font-size="9"
              fill="var(--vp-c-text-2)"
            >{{ pick(slot.role) }}</text>
            <text
              :x="slotCx(index)"
              y="228"
              text-anchor="middle"
              font-size="8.5"
              fill="var(--vp-c-text-2)"
            >{{ pick(slot.spec) }}</text>
          </template>
        </template>
      </g>

      <!-- connector stubs -->
      <g stroke-linecap="round">
        <line x1="437" y1="262" x2="437" y2="286" stroke="var(--vp-c-success-1)" stroke-width="1.6" />
        <rect x="432" y="286" width="10" height="10" rx="2" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-success-1)" />
        <text x="447" y="310" font-size="9" fill="var(--vp-c-success-1)">X0…X0F</text>

        <line x1="509" y1="262" x2="509" y2="286" stroke="var(--vp-c-success-1)" stroke-width="1.6" />
        <rect x="504" y="286" width="10" height="10" rx="2" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-success-1)" />
        <text x="519" y="310" font-size="9" fill="var(--vp-c-success-1)">Y0…Y0F</text>

        <line x1="581" y1="262" x2="581" y2="286" stroke="var(--vp-c-brand-1)" stroke-width="1.6" />
        <rect x="576" y="286" width="10" height="10" rx="2" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-brand-1)" />
        <text x="591" y="332" font-size="9" fill="var(--vp-c-brand-1)">PULSE F/R</text>

        <line x1="797" y1="262" x2="797" y2="286" stroke="var(--vp-c-warning-1)" stroke-width="1.6" />
        <rect x="792" y="286" width="10" height="10" rx="2" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-warning-1)" />
        <text x="807" y="334" font-size="9" fill="var(--vp-c-warning-1)">Ethernet</text>
      </g>

      <!-- left column: field devices -->
      <g>
        <text x="30" y="278" font-size="11" font-weight="700" fill="var(--vp-c-text-2)">{{ leftTitle }}</text>

        <rect x="30" y="285" width="180" height="58" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="42" y="305" font-size="11" font-weight="700" fill="var(--vp-c-text-1)">{{ sensorTitle }}</text>
        <text x="42" y="321" font-size="9" fill="var(--vp-c-text-2)">{{ sensorSub }}</text>

        <rect x="30" y="350" width="180" height="48" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="42" y="370" font-size="11" font-weight="700" fill="var(--vp-c-text-1)">{{ buttonTitle }}</text>
        <text x="42" y="386" font-size="9" fill="var(--vp-c-text-2)">{{ buttonSub }}</text>

        <rect x="30" y="406" width="180" height="60" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="42" y="426" font-size="11" font-weight="700" fill="var(--vp-c-text-1)">{{ relayTitle }}</text>
        <text x="42" y="442" font-size="9" fill="var(--vp-c-text-2)">{{ relaySub }}</text>
        <text x="42" y="457" font-size="9" fill="var(--vp-c-danger-1)">+24 V / 0 V</text>
      </g>

      <!-- right column -->
      <g>
        <rect x="870" y="110" width="210" height="90" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="884" y="134" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">{{ hmiTitle }}</text>
        <text x="884" y="152" font-size="9" fill="var(--vp-c-warning-1)">{{ hmiSub }}</text>
        <text x="884" y="176" font-size="9" fill="var(--vp-c-text-2)">Ethernet</text>

        <rect x="870" y="220" width="210" height="110" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="884" y="244" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">{{ ampTitle }}</text>
        <text x="884" y="262" font-size="9" fill="var(--vp-c-text-2)">{{ ampSub }}</text>
        <text x="884" y="292" font-size="9" fill="var(--vp-c-brand-1)">PULSE F+ / F− / R+ / R−</text>
        <text x="884" y="312" font-size="9" fill="var(--vp-c-text-2)">U V W</text>

        <circle cx="955" cy="372" r="24" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-text-1)" stroke-width="1.5" />
        <text x="955" y="378" text-anchor="middle" font-size="15" font-weight="700" fill="var(--vp-c-text-1)">M</text>
        <line x1="930" y1="330" x2="930" y2="372" stroke="var(--vp-c-brand-1)" stroke-width="1.6" />
        <line x1="979" y1="372" x2="990" y2="372" stroke="var(--vp-c-text-2)" stroke-width="1" />
        <text x="922" y="350" text-anchor="end" font-size="9" fill="var(--vp-c-text-2)">U V W</text>
        <text x="955" y="416" text-anchor="middle" font-size="9" fill="var(--vp-c-text-2)">{{ motorLabel }}</text>
        <line x1="979" y1="372" x2="990" y2="372" stroke="var(--vp-c-text-2)" stroke-width="1" />
        <text x="994" y="376" font-size="9" fill="var(--vp-c-text-2)">{{ encoderLabel }}</text>

        <rect x="870" y="450" width="210" height="55" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" />
        <text x="884" y="472" font-size="11" font-weight="700" fill="var(--vp-c-text-1)">{{ loadTitle }}</text>
        <text x="884" y="488" font-size="9" fill="var(--vp-c-text-2)">{{ loadSub }}</text>
        <text x="884" y="500" font-size="9" fill="var(--vp-c-danger-1)">+24 V / 0 V</text>
      </g>

      <!-- signal wiring -->
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- X bus to sensors and pushbutton, with hops over the AC feed -->
        <path d="M210 314 H287" stroke="var(--vp-c-success-1)" stroke-width="1.6" />
        <path d="M287 314 A6 6 0 0 1 299 314 H437" stroke="var(--vp-c-success-1)" stroke-width="1.6" />
        <path d="M210 376 H287" stroke="var(--vp-c-success-1)" stroke-width="1.6" />
        <path d="M287 376 A6 6 0 0 1 299 376 H437" stroke="var(--vp-c-success-1)" stroke-width="1.6" />
        <line x1="437" y1="296" x2="437" y2="376" stroke="var(--vp-c-success-1)" stroke-width="1.6" />

        <!-- Y outputs to the load group -->
        <path d="M509 296 V440 H299" stroke="var(--vp-c-success-1)" stroke-width="1.6" />
        <path d="M299 440 A6 6 0 0 0 287 440 H210" stroke="var(--vp-c-success-1)" stroke-width="1.6" />

        <!-- pulse output to the amplifier -->
        <path d="M581 296 V315 H870" stroke="var(--vp-c-brand-1)" stroke-width="1.6" />

        <!-- Ethernet to the HMI -->
        <path d="M797 296 V306 H856 V165 H870" stroke="var(--vp-c-warning-1)" stroke-width="1.6" />
      </g>

      <!-- power wiring -->
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M293 470 V262" stroke="var(--vp-c-danger-1)" stroke-width="2" />
      </g>

      <!-- supply blocks -->
      <g>
        <rect x="30" y="470" width="160" height="65" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-danger-1)" />
        <text x="42" y="490" font-size="11" font-weight="700" fill="var(--vp-c-text-1)">{{ supplyTitle }}</text>
        <text x="42" y="506" font-size="9" fill="var(--vp-c-text-2)">{{ supplySub }}</text>
        <text x="42" y="524" font-size="9" fill="var(--vp-c-danger-1)">+24 V</text>
        <text x="100" y="524" font-size="9" fill="var(--vp-c-text-2)">0 V</text>

        <rect x="240" y="470" width="160" height="65" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-danger-1)" />
        <text x="252" y="490" font-size="11" font-weight="700" fill="var(--vp-c-text-1)">{{ acTitle }}</text>
        <text x="252" y="506" font-size="9" fill="var(--vp-c-text-2)">{{ acSub }}</text>
        <text x="252" y="524" font-size="9" fill="var(--vp-c-danger-1)">L / N</text>
        <text x="340" y="524" font-size="9" fill="var(--vp-c-success-1)">FG</text>
      </g>

      <!-- power rails -->
      <g>
        <line x1="150" y1="560" x2="1080" y2="560" stroke="var(--vp-c-danger-1)" stroke-width="2" />
        <line x1="170" y1="582" x2="1080" y2="582" stroke="var(--vp-c-text-2)" stroke-width="2" />
        <text x="700" y="552" text-anchor="middle" font-size="10" fill="var(--vp-c-danger-1)">+24 V</text>
        <text x="700" y="598" text-anchor="middle" font-size="10" fill="var(--vp-c-text-2)">0 V</text>
        <line x1="150" y1="535" x2="150" y2="560" stroke="var(--vp-c-danger-1)" stroke-width="2" />
        <line x1="170" y1="535" x2="170" y2="582" stroke="var(--vp-c-danger-1)" stroke-width="2" />
        <line x1="1045" y1="505" x2="1045" y2="560" stroke="var(--vp-c-danger-1)" stroke-width="1.6" />
        <line x1="1075" y1="505" x2="1075" y2="582" stroke="var(--vp-c-text-2)" stroke-width="1.6" />
      </g>

      <!-- FG earth under the AC feed -->
      <g stroke="var(--vp-c-success-1)" stroke-width="1.6" fill="none">
        <line x1="340" y1="535" x2="340" y2="542" />
        <line x1="328" y1="542" x2="352" y2="542" />
        <line x1="333" y1="548" x2="347" y2="548" />
        <line x1="337" y1="554" x2="343" y2="554" />
      </g>

      <!-- legend -->
      <g>
        <text x="30" y="642" font-size="11" font-weight="700" fill="var(--vp-c-text-2)">{{ legendTitle }}</text>
        <template v-for="(item, index) in legend" :key="`legend-${index}`">
          <line
            :x1="30 + index * 270"
            y1="672"
            :x2="70 + index * 270"
            y2="672"
            :stroke="item.color"
            stroke-width="2.5"
          />
          <text :x="80 + index * 270" y="676" font-size="10" fill="var(--vp-c-text-2)">{{ item.label }}</text>
        </template>
        <text x="30" y="702" font-size="9" fill="var(--vp-c-text-2)">{{ neutralNote }}</text>
      </g>
    </svg>

    <figcaption class="system-note">{{ note }}</figcaption>
  </figure>
</template>

<style scoped>
.system-figure {
  margin: 1rem 0;
}

.system-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.system-note {
  margin-top: 0.5rem;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
