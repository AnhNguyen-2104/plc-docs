<script setup lang="ts">
import { computed, useId } from 'vue'
import { useData } from 'vitepress'

type Row = { signal: string; pin: string; device: string }

const props = defineProps<{
  model: string
  role?: string
  connector: string
  widthPins?: number
  inputs: Row[]
  outputs: Row[]
}>()

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')

const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
const inArrow = `in-${uid}`
const outArrow = `out-${uid}`

const ROW_START = 170
const ROW_GAP = 26

type PlacedRow = Row & { y: number; direction: 'in' | 'out'; color: string }

const rows = computed<PlacedRow[]>(() => [
  ...props.inputs.map((row) => ({ ...row, direction: 'in' as const, color: 'var(--vp-c-success-1)' })),
  ...props.outputs.map((row) => ({ ...row, direction: 'out' as const, color: 'var(--vp-c-warning-1)' }))
].map((row, index) => ({ ...row, y: ROW_START + index * ROW_GAP })))

const total = computed(() => rows.value.length)
const viewHeight = computed(() => Math.max(560, ROW_START + total.value * ROW_GAP + 120))
const moduleBottom = computed(() => Math.max(500, ROW_START + total.value * ROW_GAP + 24))
const tickCount = computed(() => props.widthPins ?? Math.max(total.value, 2))
const title = computed(() => {
  const base = isVi.value ? `Sơ đồ khối ${props.model}` : `${props.model} block diagram`
  return props.role ? `${base} — ${props.role}` : base
})
const note = computed(() =>
  isVi.value
    ? 'Sơ đồ do chúng tôi vẽ lại từ bảng chân trong trang và manual hãng; không dùng ảnh của bên thứ ba.'
    : 'Drawn for this site from the page\u2019s pin table and the manufacturer manuals; no third-party images are used.'
)
const legend = computed(() => [
  { color: 'var(--vp-c-success-1)', text: isVi.value ? 'vào module' : 'into module', x: 360 },
  { color: 'var(--vp-c-warning-1)', text: isVi.value ? 'ra module' : 'out of module', x: 600 }
])
</script>

<template>
  <figure class="module-block-figure">
    <svg
      class="module-block-diagram"
      :viewBox="`0 0 1000 ${viewHeight}`"
      role="img"
      :aria-label="title"
      xmlns="http://www.w3.org/2000/svg"
      font-family="ui-sans-serif, system-ui, sans-serif"
      font-size="12"
    >
      <title>{{ title }}</title>
      <defs>
        <marker :id="inArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L8,3 L0,6 Z" fill="var(--vp-c-success-1)" />
        </marker>
        <marker :id="outArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L8,3 L0,6 Z" fill="var(--vp-c-warning-1)" />
        </marker>
      </defs>

      <text x="24" y="40" font-size="16" font-weight="700" fill="var(--vp-c-text-1)">{{ model }}</text>
      <text v-if="role" x="24" y="62" font-size="12" fill="var(--vp-c-text-2)">{{ role }}</text>

      <g class="module-block-body">
        <rect
          x="360"
          y="96"
          width="280"
          :height="moduleBottom - 96"
          rx="10"
          fill="var(--vp-c-bg-soft)"
          stroke="var(--vp-c-divider)"
        />
        <text x="500" y="124" text-anchor="middle" font-size="15" font-weight="700" fill="var(--vp-c-text-1)">
          {{ model }}
        </text>
        <text x="500" y="144" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">{{ connector }}</text>

        <rect x="344" y="158" width="16" :height="moduleBottom - 178" rx="2" fill="none" stroke="var(--vp-c-divider)" />
        <line
          v-for="n in tickCount"
          :key="`tick-${n}`"
          x1="346"
          x2="358"
          :y1="158 + (n - 1) * ((moduleBottom - 178) / Math.max(tickCount - 1, 1))"
          :y2="158 + (n - 1) * ((moduleBottom - 178) / Math.max(tickCount - 1, 1))"
          stroke="var(--vp-c-divider)"
          stroke-width="1.5"
        />
      </g>

      <g class="module-block-rows">
        <g v-for="(row, index) in rows" :key="`row-${index}`">
          <line
            v-if="row.direction === 'in'"
            x1="250"
            x2="344"
            :y1="row.y"
            :y2="row.y"
            :stroke="row.color"
            stroke-width="2"
            :marker-end="`url(#${inArrow})`"
          />
          <line
            v-else
            x1="344"
            x2="250"
            :y1="row.y"
            :y2="row.y"
            :stroke="row.color"
            stroke-width="2"
            :marker-end="`url(#${outArrow})`"
          />
          <text x="240" :y="row.y - 2" text-anchor="end" font-size="11" fill="var(--vp-c-text-1)">
            {{ row.device }}
          </text>
          <text x="240" :y="row.y + 10" text-anchor="end" font-size="10" fill="var(--vp-c-text-2)">
            {{ row.signal }}
          </text>
          <text x="660" :y="row.y + 4" font-size="11" fill="var(--vp-c-text-1)">{{ row.pin }}</text>
        </g>
      </g>

      <g class="module-block-legend">
        <g v-for="item in legend" :key="item.text">
          <line :x1="item.x" :x2="item.x + 22" :y1="viewHeight - 34" :y2="viewHeight - 34" :stroke="item.color" stroke-width="3" />
          <text :x="item.x + 30" :y="viewHeight - 30" font-size="11" fill="var(--vp-c-text-2)">{{ item.text }}</text>
        </g>
      </g>

      <text x="24" :y="viewHeight - 10" font-size="10" fill="var(--vp-c-text-2)">{{ note }}</text>
    </svg>
  </figure>
</template>

<style scoped>
.module-block-figure {
  margin: 1rem 0;
}

.module-block-diagram {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}
</style>
