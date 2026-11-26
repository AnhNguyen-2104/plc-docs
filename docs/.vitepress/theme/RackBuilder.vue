<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { qModules, type QKind, type QModule } from '../data/modules/qseries'

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')

const MAIN_BASE_IDS = ['q33b', 'q35b', 'q38b', 'q312b']
const IO_KINDS: QKind[] = ['input', 'output', 'combined', 'analog', 'counter', 'network', 'motion']

const KIND_LABEL: Record<QKind, { vi: string; en: string }> = {
  cpu: { vi: 'CPU', en: 'CPU' },
  power: { vi: 'Nguồn', en: 'Power supply' },
  base: { vi: 'Base', en: 'Base unit' },
  input: { vi: 'Vào số', en: 'Digital input' },
  output: { vi: 'Ra số', en: 'Digital output' },
  combined: { vi: 'Kết hợp vào/ra', en: 'Combined I/O' },
  analog: { vi: 'Tương tự', en: 'Analog' },
  counter: { vi: 'Đếm xung', en: 'Counter' },
  network: { vi: 'Truyền thông', en: 'Network' },
  motion: { vi: 'Chuyển động', en: 'Motion' }
}

const cpuId = ref('q03udv')
const baseId = ref('q38b')
const powerId = ref('q61p')
const zeroEmpty = ref(false)
const copied = ref<'gx' | 'md' | null>(null)

const byId = (id: string) => qModules.find((module) => module.id === id)
const cpu = computed(() => byId(cpuId.value))
const base = computed(() => byId(baseId.value))
const power = computed(() => byId(powerId.value))
const integrated = computed(() => cpu.value?.integratedBase === true)
const slotCount = computed(() => (integrated.value ? 16 : (base.value?.slots ?? 8)))

const slotIds = ref<string[]>(Array(slotCount.value).fill(''))
const overrides = ref<string[]>(Array(slotCount.value).fill(''))

function resetSlots() {
  slotIds.value = Array(slotCount.value).fill('')
  overrides.value = Array(slotCount.value).fill('')
}

function setOverride(index: number, value: string) {
  const next = [...overrides.value]
  next[index] = value
  overrides.value = next
}

function effectivePoints(id: string, index: number): number {
  const raw = overrides.value[index]
  if (raw != null && raw !== '') {
    const parsed = Math.trunc(Number(raw))
    if (Number.isFinite(parsed) && parsed >= 0) return parsed
  }
  const module = id ? byId(id) : undefined
  if (module) return module.points ?? (zeroEmpty.value ? 0 : 16)
  return zeroEmpty.value ? 0 : 16
}

const cpuOptions = computed(() => qModules.filter((module) => module.kind === 'cpu'))
const baseOptions = computed(() =>
  qModules.filter((module) => module.kind === 'base' && MAIN_BASE_IDS.includes(module.id))
)
const powerOptions = computed(() => qModules.filter((module) => module.kind === 'power'))

const moduleGroups = computed(() =>
  IO_KINDS.map((kind) => ({
    kind,
    label: KIND_LABEL[kind][isVi.value ? 'vi' : 'en'],
    rows: qModules.filter((module) => module.kind === kind && module.status === 'documented')
  })).filter((group) => group.rows.length > 0)
)

const pick = (value: { vi: string; en: string }) => (isVi.value ? value.vi : value.en)

function hex(value: number): string {
  return value.toString(16).toUpperCase().padStart(3, '0')
}

type Row = {
  no: number
  id: string
  model: string
  type: string
  points: number
  startXY: string
  x: string
  y: string
  current: string
}

const rows = computed<Row[]>(() => {
  let cursor = 0
  return slotIds.value.map((id, no) => {
    const module = id ? byId(id) : undefined
    const points = effectivePoints(id, no)
    const start = cursor
    cursor += points
    const startXY = module ? `X/Y${hex(start)}` : ''
    const range = points > 0 ? `${hex(start)}–${hex(start + points - 1)}` : '—'
    const isInput = module?.kind === 'input'
    const isOutput = module?.kind === 'output'
    const isCombined = module && !isInput && !isOutput
    return {
      no,
      id,
      model: module?.model ?? '—',
      type: module ? pick(KIND_LABEL[module.kind]) : isVi.value ? 'Trống' : 'Empty',
      points,
      startXY,
      x: isInput || isCombined ? range : '—',
      y: isOutput || isCombined ? range : '—',
      current: module ? (module.current5v == null ? '—' : module.current5v.toFixed(3)) : '—'
    }
  })
})

const totalPoints = computed(() => rows.value.reduce((sum, row) => sum + row.points, 0))
const usedPoints = computed(() => rows.value.filter((row) => row.id).reduce((sum, row) => sum + row.points, 0))

const moduleCurrent = computed(() =>
  slotIds.value.reduce((sum, id) => {
    const module = id ? byId(id) : undefined
    return sum + (module?.current5v ?? 0)
  }, 0)
)

const unknownCurrent = computed(() =>
  slotIds.value
    .map((id) => (id ? byId(id) : undefined))
    .filter((module): module is QModule => !!module && module.current5v == null)
)

const unknownPoints = computed(() =>
  slotIds.value
    .map((id, index) =>
      id && (overrides.value[index] == null || overrides.value[index] === '') ? byId(id) : undefined
    )
    .filter((module): module is QModule => !!module && module.points == null)
)

const baseCurrent = computed(() => (integrated.value ? 0 : (base.value?.current5v ?? 0)))
const cpuCurrent = computed(() => cpu.value?.current5v ?? 0)
const totalCurrent = computed(() => baseCurrent.value + cpuCurrent.value + moduleCurrent.value)
const ratedCurrent = computed(() => power.value?.rated5v ?? 0)
const percent = computed(() =>
  ratedCurrent.value > 0 ? (totalCurrent.value / ratedCurrent.value) * 100 : 0
)
const remaining = computed(() => ratedCurrent.value - totalCurrent.value)
const overCurrent = computed(() => ratedCurrent.value > 0 && totalCurrent.value > ratedCurrent.value)
const overPoints = computed(
  () => cpu.value?.maxIoPoints != null && totalPoints.value > cpu.value.maxIoPoints
)

const currentSummary = computed(() => {
  if (integrated.value) {
    return isVi.value
      ? 'CPU tích hợp nguồn — tra định mức trong SH-080483 §6.'
      : 'CPU with integrated power supply — check the rating in SH-080483 §6.'
  }
  const total = totalCurrent.value.toFixed(3).replace('.', isVi.value ? ',' : '.')
  const rated = ratedCurrent.value.toFixed(1).replace('.', isVi.value ? ',' : '.')
  const pct = percent.value.toFixed(1).replace('.', isVi.value ? ',' : '.')
  const rest = remaining.value.toFixed(3).replace('.', isVi.value ? ',' : '.')
  return isVi.value
    ? `${total} A / ${rated} A (${pct} %), còn dư ${rest} A`
    : `${total} A / ${rated} A (${pct} %), ${rest} A spare`
})

const modelName = (module: QModule | undefined) => (module ? module.model : '—')

function loadSample() {
  cpuId.value = 'q03udv'
  baseId.value = 'q38b'
  powerId.value = 'q61p'
  const slots: string[] = ['qx40', 'qy40p', 'qd75d4', 'qd62', 'q64ad', 'qj71e71-100']
  while (slots.length < slotCount.value) slots.push('')
  slots.length = slotCount.value
  slotIds.value = slots
  overrides.value = Array(slotCount.value).fill('')
  zeroEmpty.value = false
}

function resetAll() {
  cpuId.value = 'q03udv'
  baseId.value = 'q38b'
  powerId.value = 'q61p'
  zeroEmpty.value = false
  resetSlots()
}

function gxText(): string {
  const head = 'Slot\tType\tModel Name\tPoints\tStart XY'
  const body = rows.value.map((row) => {
    const module = row.id ? byId(row.id) : undefined
    const type = module ? KIND_LABEL[module.kind].en : 'Empty'
    return [row.no, type, module ? module.model : '', row.points, row.startXY].join('\t')
  })
  return [head, ...body].join('\n')
}

function markdownText(): string {
  const head = isVi.value
    ? '| Khe | Model | Loại | Điểm | Start XY | Dải X | Dải Y | 5 V |'
    : '| Slot | Model | Type | Points | Start XY | X range | Y range | 5 V |'
  const rule = '| --- | --- | --- | --- | --- | --- | --- | --- |'
  const body = rows.value.map((row) =>
    `| ${row.no} | ${row.model} | ${row.type} | ${row.points} | ${row.startXY || '—'} | ${row.x} | ${row.y} | ${row.current} |`
  )
  return [head, rule, ...body].join('\n')
}

const pasteText = ref('')
const pasteError = ref(false)
type CrossRow = {
  no: number
  ok: boolean
  pointsOk: boolean
  xyOk: boolean
  points: string
  pastedPoints: string
  startXY: string
  pastedXY: string
}
const crossRows = ref<CrossRow[] | null>(null)

const crossSummary = computed(() => {
  if (!crossRows.value) return null
  return {
    ok: crossRows.value.filter((row) => row.ok).length,
    total: crossRows.value.length
  }
})

function normalizeAddress(rawValue: string) {
  const compact = rawValue.replace(/\s+/g, '').toUpperCase()
  const match = compact.match(/^(X\/Y|XY|X|Y)?([0-9A-F]+)$/)
  if (!match) return null
  const pre = match[1] === 'XY' ? 'X/Y' : (match[1] ?? '')
  return { pre, num: match[2].replace(/^0+/, '') || '0' }
}

function addressMatches(computedValue: string, pastedValue: string): boolean {
  const pasted = pastedValue.replace(/\s+/g, '').toUpperCase()
  if (!computedValue) return pasted === '' || pasted === '—'
  const computed = normalizeAddress(computedValue)
  const other = normalizeAddress(pasted)
  if (!computed || !other) return false
  const prefixOk =
    other.pre === '' ||
    other.pre === computed.pre ||
    (computed.pre === 'X/Y' && (other.pre === 'X' || other.pre === 'Y'))
  return computed.num === other.num && prefixOk
}

function comparePaste() {
  const pasted = new Map<number, { points: string; xy: string }>()
  for (const line of pasteText.value.split(/\r?\n/)) {
    if (!line.trim()) continue
    const cells = (line.includes('\t') ? line.split('\t') : line.split(/\s{2,}/)).map((cell) => cell.trim())
    if (cells.length < 2 || !/^\d+$/.test(cells[0])) continue
    pasted.set(Number.parseInt(cells[0], 10), { points: cells[3] ?? '', xy: cells[4] ?? '' })
  }
  pasteError.value = pasted.size === 0
  crossRows.value = pasteError.value
    ? null
    : rows.value.map((row) => {
        const entry = pasted.get(row.no)
        const pointsOk =
          !!entry && entry.points !== '' && Number.parseInt(entry.points, 10) === row.points
        const xyOk = !!entry && addressMatches(row.startXY, entry.xy)
        return {
          no: row.no,
          ok: pointsOk && xyOk,
          pointsOk,
          xyOk,
          points: String(row.points),
          pastedPoints: entry?.points || '—',
          startXY: row.startXY || '—',
          pastedXY: entry?.xy || '—'
        }
      })
}

function crossDetail(item: CrossRow): string {
  const head = isVi.value ? `Khe ${item.no}` : `Slot ${item.no}`
  const parts: string[] = []
  if (!item.pointsOk) {
    parts.push(
      isVi.value
        ? `điểm ${item.points} → ${item.pastedPoints}`
        : `points ${item.points} → ${item.pastedPoints}`
    )
  }
  if (!item.xyOk) {
    parts.push(`Start XY ${item.startXY} → ${item.pastedXY}`)
  }
  if (parts.length === 0) {
    return isVi.value
      ? `${head}: điểm ${item.points}, Start XY ${item.startXY}`
      : `${head}: points ${item.points}, Start XY ${item.startXY}`
  }
  return `${head}: ${parts.join(', ')} (GX)`
}

function clearPaste() {
  pasteText.value = ''
  pasteError.value = false
  crossRows.value = null
}

async function copy(kind: 'gx' | 'md') {
  if (!navigator.clipboard) return
  await navigator.clipboard.writeText(kind === 'gx' ? gxText() : markdownText())
  copied.value = kind
  setTimeout(() => {
    copied.value = null
  }, 2000)
}
</script>

<template>
  <div class="rack-builder">
    <div class="rack-controls">
      <label>
        <span>CPU</span>
        <select v-model="cpuId" @change="resetSlots">
          <option v-for="module in cpuOptions" :key="module.id" :value="module.id">
            {{ module.model }}
          </option>
        </select>
      </label>

      <label v-if="!integrated">
        <span>{{ isVi ? 'Base chính' : 'Main base' }}</span>
        <select v-model="baseId" @change="resetSlots">
          <option v-for="module in baseOptions" :key="module.id" :value="module.id">
            {{ module.model }}
          </option>
        </select>
      </label>

      <label v-if="!integrated">
        <span>{{ isVi ? 'Module nguồn' : 'Power supply' }}</span>
        <select v-model="powerId">
          <option v-for="module in powerOptions" :key="module.id" :value="module.id">
            {{ module.model }}
          </option>
        </select>
      </label>
    </div>

    <div class="rack-fixed">
      <template v-if="!integrated">
        <div class="rack-fixed-cell">
          <span class="rack-fixed-label">{{ isVi ? 'Nguồn' : 'Power' }}</span>
          <strong>{{ modelName(power) }}</strong>
          <span>{{ power?.rated5v != null ? `${power.rated5v} A @ 5 V` : '—' }}</span>
        </div>
        <div class="rack-fixed-cell">
          <span class="rack-fixed-label">CPU</span>
          <strong>{{ modelName(cpu) }}</strong>
          <span>{{ cpu?.maxIoPoints != null ? `${cpu.maxIoPoints} I/O` : '—' }}</span>
        </div>
      </template>
      <div v-else class="rack-fixed-cell rack-fixed-wide">
        <span class="rack-fixed-label">CPU</span>
        <strong>{{ modelName(cpu) }}</strong>
        <span>{{ isVi ? 'Nguồn + base tích hợp, 16 khe' : 'Integrated power and base, 16 slots' }}</span>
      </div>
    </div>

    <div class="rack-slots">
      <div v-for="(id, index) in slotIds" :key="index" class="rack-slot">
        <span class="rack-slot-no">{{ index }}</span>
        <select
          v-model="slotIds[index]"
          :aria-label="(isVi ? 'Module ở khe ' : 'Module in slot ') + index"
        >
          <option value="">—</option>
          <optgroup v-for="group in moduleGroups" :key="group.kind" :label="group.label">
            <option v-for="module in group.rows" :key="module.id" :value="module.id">
              {{ module.model }}
            </option>
          </optgroup>
        </select>
        <label class="rack-slot-points">
          <span class="rack-slot-points-label">{{ isVi ? 'Điểm' : 'Points' }}</span>
          <input
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            :value="overrides[index]"
            :placeholder="isVi ? 'Tự động' : 'Auto'"
            :aria-label="(isVi ? 'Ghi đè số điểm khe ' : 'Point override for slot ') + index"
            @input="setOverride(index, ($event.target as HTMLInputElement).value)"
          />
        </label>
      </div>
    </div>

    <div class="rack-options">
      <label class="rack-check">
        <input v-model="zeroEmpty" type="checkbox" />
        {{ isVi ? 'Khe trống = 0 điểm' : 'Empty slots = 0 points' }}
      </label>
      <button type="button" class="rack-button" @click="loadSample">
        {{ isVi ? 'Cấu hình mẫu' : 'Sample configuration' }}
      </button>
      <button type="button" class="rack-button" @click="resetAll">
        {{ isVi ? 'Đặt lại' : 'Reset' }}
      </button>
    </div>

    <div class="rack-summary" :class="{ 'rack-error': overCurrent || overPoints }">
      <p>
        <strong>{{ isVi ? 'Dòng 5 V:' : '5 V current:' }}</strong> {{ currentSummary }}
      </p>
      <p v-if="!integrated && overCurrent">
        {{ isVi ? 'Tổng dòng vượt định mức module nguồn — chọn nguồn lớn hơn.' : 'Total current exceeds the power supply rating — choose a larger supply.' }}
      </p>
      <p>
        <strong>{{ isVi ? 'Điểm I/O:' : 'I/O points:' }}</strong>
        {{ usedPoints }} {{ isVi ? 'đang dùng' : 'used' }} / {{ totalPoints }}
        {{ isVi ? 'điểm chiếm chỗ' : 'occupied' }}
        <template v-if="cpu?.maxIoPoints != null">
          — {{ isVi ? 'trần CPU' : 'CPU limit' }} {{ cpu.maxIoPoints }}
        </template>
      </p>
      <p v-if="overPoints">
        {{ isVi ? 'Tổng điểm vượt trần CPU.' : 'Total points exceed the CPU limit.' }}
      </p>
      <p v-if="unknownPoints.length" class="rack-warning">
        {{ isVi ? 'Chưa rõ số điểm:' : 'Unknown point count:' }}
        {{ unknownPoints.map((module) => module.model).join(', ') }} —
        {{ isVi ? 'địa chỉ phía sau có thể sai.' : 'addresses after this slot may be wrong.' }}
      </p>
      <p v-if="unknownCurrent.length" class="rack-warning">
        {{ isVi ? 'Chưa có số dòng, chưa cộng vào tổng:' : 'No current figure, not added to the total:' }}
        {{ unknownCurrent.map((module) => module.model).join(', ') }}.
      </p>
    </div>

    <div class="rack-table-wrap">
      <table class="rack-table">
        <thead>
          <tr>
            <th>{{ isVi ? 'Khe' : 'Slot' }}</th>
            <th>Model</th>
            <th>{{ isVi ? 'Loại' : 'Type' }}</th>
            <th>{{ isVi ? 'Điểm' : 'Points' }}</th>
            <th>Start XY</th>
            <th>{{ isVi ? 'Dải X' : 'X range' }}</th>
            <th>{{ isVi ? 'Dải Y' : 'Y range' }}</th>
            <th>5 V</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.no" :class="{ 'rack-row-empty': !row.id }">
            <td>{{ row.no }}</td>
            <td>{{ row.model }}</td>
            <td>{{ row.type }}</td>
            <td>{{ row.points }}</td>
            <td>{{ row.startXY || '—' }}</td>
            <td>{{ row.x }}</td>
            <td>{{ row.y }}</td>
            <td>{{ row.current }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="rack-crosscheck">
      <label class="rack-crosscheck-label" for="rack-crosscheck-paste">
        {{ isVi ? 'Dán bảng I/O Assignment từ GX Works2' : 'Paste GX Works2 I/O Assignment' }}
      </label>
      <textarea
        id="rack-crosscheck-paste"
        v-model="pasteText"
        class="rack-paste"
        rows="4"
        spellcheck="false"
        :placeholder="isVi ? 'Slot → Type → Model Name → Points → Start XY' : 'Slot → Type → Model Name → Points → Start XY'"
      />
      <div class="rack-crosscheck-actions">
        <button type="button" class="rack-button" @click="comparePaste">
          {{ isVi ? 'Đối chiếu' : 'Compare' }}
        </button>
        <button type="button" class="rack-button" @click="clearPaste">
          {{ isVi ? 'Xoá' : 'Clear' }}
        </button>
      </div>
      <p v-if="pasteError" class="rack-warning rack-cross-status" role="status">
        {{ isVi ? 'Không đọc được dòng dữ liệu nào — kiểm tra lại bảng đã dán (phân tách bằng tab).' : 'No data rows found — check the pasted table (tab-separated).' }}
      </p>
      <template v-if="crossRows && crossSummary">
        <p class="rack-cross-status" role="status">
          <strong>{{ isVi ? 'Kết quả đối chiếu:' : 'Comparison result:' }}</strong>
          {{ crossSummary.ok }}/{{ crossSummary.total }}
          {{ isVi ? 'khe khớp' : 'slots match' }}
        </p>
        <ul class="rack-cross-list">
          <li
            v-for="item in crossRows"
            :key="item.no"
            :class="item.ok ? 'rack-cross-ok' : 'rack-cross-bad'"
          >
            <span class="rack-cross-mark">{{ item.ok ? (isVi ? 'khớp' : 'match') : (isVi ? 'lệch' : 'mismatch') }}</span>
            <span>{{ crossDetail(item) }}</span>
          </li>
        </ul>
      </template>
    </div>

    <div class="rack-copy">
      <button type="button" class="rack-button" @click="copy('gx')">
        {{ copied === 'gx' ? (isVi ? 'Đã sao chép' : 'Copied') : (isVi ? 'Sao chép cho GX Works2' : 'Copy for GX Works2') }}
      </button>
      <button type="button" class="rack-button" @click="copy('md')">
        {{ copied === 'md' ? (isVi ? 'Đã sao chép' : 'Copied') : (isVi ? 'Sao chép Markdown' : 'Copy Markdown') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.rack-builder {
  margin: 1.5rem 0;
  display: grid;
  gap: 14px;
}

.rack-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.rack-controls label {
  display: grid;
  gap: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.rack-controls select,
.rack-slot select {
  min-width: 150px;
  padding: 6px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.rack-fixed {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rack-fixed-cell {
  min-width: 150px;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  display: grid;
  gap: 2px;
  font-size: 12px;
}

.rack-fixed-label {
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 10px;
}

.rack-slots {
  display: grid;
  gap: 6px;
}

.rack-slot {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rack-slot-no {
  width: 22px;
  text-align: right;
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.rack-options,
.rack-copy {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.rack-check {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.rack-button {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  cursor: pointer;
}

.rack-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.rack-summary {
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
}

.rack-summary p {
  margin: 4px 0;
}

.rack-error {
  border-color: var(--vp-c-danger-1);
}

.rack-error > p:first-child {
  color: var(--vp-c-danger-1);
}

.rack-warning {
  color: var(--vp-c-warning-1);
}

.rack-table-wrap {
  overflow-x: auto;
}

.rack-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.rack-table th,
.rack-table td {
  padding: 6px 8px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: left;
  white-space: nowrap;
}

.rack-table th {
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.rack-row-empty td {
  color: var(--vp-c-text-3);
}

.rack-slot-points {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.rack-slot-points input {
  width: 72px;
  padding: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.rack-crosscheck {
  display: grid;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.rack-crosscheck-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.rack-paste {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  resize: vertical;
}

.rack-crosscheck-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rack-cross-status {
  margin: 0;
  font-size: 13px;
}

.rack-cross-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 4px;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.rack-cross-list li {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 4px 6px;
  border-left: 3px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.rack-cross-ok {
  border-left-color: var(--vp-c-success-1);
}

.rack-cross-bad {
  border-left-color: var(--vp-c-danger-1);
}

.rack-cross-mark {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 10px;
}

.rack-cross-ok .rack-cross-mark {
  color: var(--vp-c-success-1);
}

.rack-cross-bad .rack-cross-mark {
  color: var(--vp-c-danger-1);
}
</style>
