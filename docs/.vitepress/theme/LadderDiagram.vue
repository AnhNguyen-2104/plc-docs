<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')

const title = computed(() =>
  isVi.value
    ? 'Sơ đồ thang QD75D4 — ghi thông số, READY và cho phép chạy'
    : 'QD75D4 ladder diagram — parameter write, READY and run enable'
)

const ariaLabel = computed(() =>
  isVi.value
    ? 'Sơ đồ thang năm rung: ghi Pr.1 tới Pr.5, bật Y0, chờ X0, đọc lại và cho phép chạy'
    : 'Five-rung ladder: write Pr.1 to Pr.5, turn on Y0, wait for X0, read back and enable the run'
)

const unitLabel = computed(() => (isVi.value ? 'Pr.1 = đơn vị mm' : 'Pr.1 = unit mm'))

const runEnableLabel = computed(() => (isVi.value ? 'cho phép chạy' : 'run enable'))

const bufferNote = computed(() =>
  isVi.value ? 'Địa chỉ buffer: §7.1.2 p.7-5' : 'Buffer addresses: §7.1.2 p.7-5'
)

const bottomNote = computed(() =>
  isVi.value
    ? 'Ví dụ minh hoạ — chưa kiểm chứng trên phần cứng'
    : 'Illustrative example — not verified on hardware'
)
</script>

<template>
  <figure class="ladder-figure">
    <svg
      class="ladder-diagram"
      viewBox="0 0 900 560"
      role="img"
      :aria-label="ariaLabel"
      xmlns="http://www.w3.org/2000/svg"
      font-family="ui-sans-serif, system-ui, sans-serif"
      font-size="12"
    >
      <title>{{ title }}</title>

      <g class="ladder-rails" stroke="var(--vp-c-text-1)" stroke-width="1.5">
        <line x1="60" y1="70" x2="60" y2="470" />
        <line x1="860" y1="70" x2="860" y2="470" />
      </g>

      <g class="ladder-wires" stroke="currentColor" stroke-width="1.2" fill="none">
        <line x1="60" y1="105" x2="110" y2="105" />
        <line x1="110" y1="96" x2="110" y2="114" />
        <line x1="140" y1="96" x2="140" y2="114" />
        <line x1="140" y1="105" x2="230" y2="105" />
        <line x1="410" y1="105" x2="860" y2="105" />

        <line x1="60" y1="165" x2="110" y2="165" />
        <line x1="110" y1="156" x2="110" y2="174" />
        <line x1="140" y1="156" x2="140" y2="174" />
        <line x1="140" y1="165" x2="215" y2="165" />
        <line x1="215" y1="165" x2="215" y2="261" />
        <line x1="215" y1="165" x2="230" y2="165" />
        <line x1="215" y1="197" x2="230" y2="197" />
        <line x1="215" y1="229" x2="230" y2="229" />
        <line x1="215" y1="261" x2="230" y2="261" />

        <line x1="60" y1="335" x2="110" y2="335" />
        <line x1="110" y1="326" x2="110" y2="344" />
        <line x1="140" y1="326" x2="140" y2="344" />
        <line x1="140" y1="335" x2="250" y2="335" />
        <line x1="286" y1="335" x2="860" y2="335" />

        <line x1="60" y1="380" x2="110" y2="380" />
        <line x1="110" y1="371" x2="110" y2="389" />
        <line x1="140" y1="371" x2="140" y2="389" />
        <line x1="140" y1="380" x2="250" y2="380" />
        <line x1="286" y1="380" x2="860" y2="380" />

        <line x1="60" y1="440" x2="110" y2="440" />
        <line x1="110" y1="431" x2="110" y2="449" />
        <line x1="140" y1="431" x2="140" y2="449" />
        <line x1="140" y1="440" x2="230" y2="440" />
        <line x1="410" y1="440" x2="480" y2="440" />
        <line x1="516" y1="440" x2="860" y2="440" />
      </g>

      <g class="ladder-coils" stroke="currentColor" stroke-width="1.5" fill="none">
        <path d="M250 318 Q238 335 250 352" />
        <path d="M286 318 Q298 335 286 352" />
        <path d="M250 363 Q238 380 250 397" />
        <path d="M286 363 Q298 380 286 397" />
        <path d="M480 423 Q468 440 480 457" />
        <path d="M516 423 Q528 440 516 457" />
      </g>

      <g class="ladder-boxes">
        <rect x="230" y="88" width="180" height="34" rx="3" stroke="var(--vp-c-divider)" fill="var(--vp-c-bg-soft)" />
        <rect x="230" y="151" width="180" height="28" rx="3" stroke="var(--vp-c-divider)" fill="var(--vp-c-bg-soft)" />
        <rect x="230" y="183" width="180" height="28" rx="3" stroke="var(--vp-c-divider)" fill="var(--vp-c-bg-soft)" />
        <rect x="230" y="215" width="180" height="28" rx="3" stroke="var(--vp-c-divider)" fill="var(--vp-c-bg-soft)" />
        <rect x="230" y="247" width="180" height="28" rx="3" stroke="var(--vp-c-divider)" fill="var(--vp-c-bg-soft)" />
        <rect x="230" y="423" width="180" height="34" rx="3" stroke="var(--vp-c-divider)" fill="var(--vp-c-bg-soft)" />
      </g>

      <g
        class="ladder-box-text"
        font-family="ui-monospace, monospace"
        font-size="13"
        fill="var(--vp-c-text-1)"
        text-anchor="middle"
      >
        <text x="320" y="110">TO U0\G0 K0 K1</text>
        <text x="320" y="170">TO U0\G1 K500 K1</text>
        <text x="320" y="202">TO U0\G2 K50000 K1</text>
        <text x="320" y="234">TO U0\G3 K1 K1</text>
        <text x="320" y="266">TO U0\G4 K0 K1</text>
        <text x="320" y="445">FROM U0\G2 D200 K1</text>
      </g>

      <g class="ladder-labels" fill="var(--vp-c-text-2)" font-size="11">
        <text x="125" y="94" text-anchor="middle">M8000</text>
        <text x="125" y="154" text-anchor="middle">M8000</text>
        <text x="125" y="324" text-anchor="middle">M500</text>
        <text x="125" y="369" text-anchor="middle">X0</text>
        <text x="125" y="429" text-anchor="middle">M501</text>

        <text x="420" y="99" font-size="12">{{ unitLabel }}</text>
        <text x="230" y="295">Pr.2…Pr.5 (SH-080058 §5.2.1)</text>
        <text x="300" y="327">PLC READY</text>
        <text x="300" y="372">QD75 READY</text>
        <text x="530" y="433">{{ runEnableLabel }}</text>
      </g>

      <g class="ladder-coil-text" fill="var(--vp-c-text-1)" font-size="13" text-anchor="middle">
        <text x="268" y="340" font-weight="700">Y0</text>
        <text x="268" y="385">M501</text>
        <text x="498" y="445">M600</text>
      </g>

      <g class="ladder-notes" fill="var(--vp-c-text-2)" font-size="11">
        <text x="860" y="40" text-anchor="end">{{ bufferNote }}</text>
        <text x="60" y="515">{{ bottomNote }}</text>
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.ladder-figure {
  margin: 1rem 0;
}

.ladder-diagram {
  width: 100%;
  height: auto;
  display: block;
}
</style>
