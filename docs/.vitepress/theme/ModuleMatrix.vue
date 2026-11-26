<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { qModules, type QKind, type QModule } from '../data/modules/qseries'

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')

const KINDS: QKind[] = ['cpu', 'power', 'base', 'input', 'output', 'combined', 'analog', 'counter', 'network', 'motion']

const kindLabel: Record<QKind, { vi: string; en: string }> = {
  cpu: { vi: 'CPU', en: 'CPU' },
  power: { vi: 'Nguồn', en: 'Power supply' },
  base: { vi: 'Base', en: 'Base unit' },
  input: { vi: 'Ngõ vào số', en: 'Digital inputs' },
  output: { vi: 'Ngõ ra số', en: 'Digital outputs' },
  combined: { vi: 'Kết hợp vào/ra', en: 'Combined I/O' },
  analog: { vi: 'Tương tự', en: 'Analog' },
  counter: { vi: 'Đếm xung', en: 'Counter' },
  network: { vi: 'Truyền thông', en: 'Network' },
  motion: { vi: 'Chuyển động', en: 'Motion' }
}

const groups = computed(() =>
  KINDS.map((kind) => ({
    kind,
    label: kindLabel[kind][isVi.value ? 'vi' : 'en'],
    rows: qModules.filter((module) => module.kind === kind)
  })).filter((group) => group.rows.length > 0)
)

const plannedCount = computed(() => qModules.filter((m) => m.status === 'planned').length)

const query = ref('')
const activeKind = ref<QKind | 'all'>('all')

const toolbarEl = ref<HTMLElement | null>(null)
const toolbarHeight = ref(0)
let toolbarObserver: ResizeObserver | null = null

onMounted(() => {
  const el = toolbarEl.value
  if (!el) return
  toolbarHeight.value = el.offsetHeight
  toolbarObserver = new ResizeObserver(() => {
    toolbarHeight.value = el.offsetHeight
  })
  toolbarObserver.observe(el)
})

onBeforeUnmount(() => {
  toolbarObserver?.disconnect()
  toolbarObserver = null
})

function fold(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
}

function matchesQuery(module: QModule, groupLabel: string): boolean {
  const needle = fold(query.value.trim())
  if (!needle) return true
  return [module.model, cell(module.role), cell(module.keySpec), groupLabel].some((value) =>
    fold(value).includes(needle)
  )
}

const visibleGroups = computed(() =>
  groups.value
    .filter((group) => activeKind.value === 'all' || group.kind === activeKind.value)
    .map((group) => ({
      ...group,
      rows: group.rows.filter((module) => matchesQuery(module, group.label))
    }))
    .filter((group) => group.rows.length > 0)
)

const visibleCount = computed(() =>
  visibleGroups.value.reduce((total, group) => total + group.rows.length, 0)
)

function groupAnchor(kind: QKind): string {
  return `q-modules-${kind}`
}

function cell(value: { vi: string; en: string } | string): string {
  return typeof value === 'string' ? value : value[isVi.value ? 'vi' : 'en']
}

function moduleHref(module: QModule): string {
  return withBase(`${isVi.value ? '/q' : '/en/q'}/modules/m/${module.id}`)
}

function isDocumented(module: QModule): boolean {
  return module.status === 'documented'
}
</script>

<template>
  <div class="module-matrix" :style="{ '--matrix-toolbar-h': toolbarHeight + 'px' }">
    <p class="module-matrix-intro">
      {{
        isVi
          ? `${qModules.length} module Q-series, ${plannedCount} chưa tài liệu hoá đầy đủ.`
          : `${qModules.length} Q-series modules, ${plannedCount} not fully documented.`
      }}
    </p>

    <div ref="toolbarEl" class="module-matrix-toolbar">
      <div class="module-matrix-search" role="search">
        <input
          v-model="query"
          type="search"
          class="module-matrix-input"
          :placeholder="isVi ? 'Tìm model, vai trò, thông số' : 'Search model, role, spec'"
          :aria-label="isVi ? 'Tìm model, vai trò, thông số' : 'Search model, role, spec'"
        />
        <span class="module-matrix-count" aria-live="polite">
          {{
            isVi
              ? `${visibleCount}/${qModules.length} model`
              : `${visibleCount}/${qModules.length} models`
          }}
        </span>
      </div>
      <div class="module-matrix-chips">
        <button
          type="button"
          class="matrix-chip"
          :class="{ 'is-active': activeKind === 'all' }"
          :aria-pressed="activeKind === 'all'"
          @click="activeKind = 'all'"
        >
          {{ isVi ? 'Tất cả' : 'All' }}
        </button>
        <button
          v-for="group in groups"
          :key="group.kind"
          type="button"
          class="matrix-chip"
          :class="{ 'is-active': activeKind === group.kind }"
          :aria-pressed="activeKind === group.kind"
          @click="activeKind = activeKind === group.kind ? 'all' : group.kind"
        >
          {{ group.label }}
        </button>
      </div>
    </div>

    <div class="module-matrix-wrap">
      <table class="module-matrix-table">
        <thead>
          <tr>
            <th aria-hidden="true"></th>
            <th scope="col">{{ isVi ? 'Model' : 'Model' }}</th>
            <th scope="col">{{ isVi ? 'Vai trò' : 'Role' }}</th>
            <th scope="col">{{ isVi ? 'Điểm chính' : 'Key spec' }}</th>
          </tr>
        </thead>
        <tbody v-for="group in visibleGroups" :key="group.kind" class="matrix-group-body">
          <tr :id="groupAnchor(group.kind)" class="matrix-group">
            <th :colspan="4" scope="colgroup">{{ group.label }} ({{ group.rows.length }})</th>
          </tr>
          <tr
            v-for="module in group.rows"
            :key="module.id"
            :class="{ 'module-matrix-planned': !isDocumented(module) }"
          >
            <td class="module-matrix-photo">
              <span v-if="module.photoThumb" class="module-matrix-photo-frame">
                <img
                  :src="withBase(module.photoThumb)"
                  :alt="module.model"
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </td>
            <th scope="row" class="module-matrix-model">
              <a class="matrix-model-link" :href="moduleHref(module)">{{ module.model }}</a>
              <span v-if="!isDocumented(module)" class="matrix-badge">{{ isVi ? ' (dự kiến)' : ' (planned)' }}</span>
            </th>
            <td>{{ cell(module.role) }}</td>
            <td>{{ cell(module.keySpec) }}</td>
          </tr>
        </tbody>
        <tbody v-if="visibleGroups.length === 0">
          <tr>
            <td colspan="4" class="module-matrix-empty">
              {{ isVi ? 'Không có kết quả phù hợp.' : 'No matches.' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="module-matrix-note">
      {{
        isVi
          ? 'Tên model liên kết tới trang riêng của module, nơi có bảng thông số và quy tắc đấu dây của đúng model. Số liệu lấy từ manual SH-080483, SH-080042, SH-080055, SH-080054, SH-080036 và các manual mạng; dòng "dự kiến" là module chưa xác minh được từ manual trên đĩa, trang của nó nêu rõ phần chưa xác minh.'
          : 'The model name links to the module\'s own page, with its facts table and class-appropriate wiring rules. Values come from SH-080483, SH-080042, SH-080055, SH-080054, SH-080036 and the network manuals; "planned" rows could not be verified from the manuals on disk, and their page states what is unverified.'
      }}
    </p>
  </div>
</template>

<style scoped>
.module-matrix {
  margin: 1.5rem 0;
}

.module-matrix-toolbar {
  position: sticky;
  top: var(--vp-nav-height, 0px);
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0 0.75rem;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.module-matrix-search {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.module-matrix-input {
  flex: 1 1 14rem;
  min-width: 0;
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.module-matrix-input:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.module-matrix-count {
  color: var(--vp-c-text-2);
  font-size: 12px;
  white-space: nowrap;
}

.module-matrix-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.matrix-chip {
  padding: 0.2rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.5;
  cursor: pointer;
}

.matrix-chip:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.matrix-chip:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.matrix-chip.is-active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: var(--vp-c-neutral-inverse);
  font-weight: 600;
}

.module-matrix-wrap {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

@media (min-width: 768px) {
  .module-matrix-wrap {
    overflow-x: visible;
  }
}

.module-matrix-table {
  display: table;
  overflow: visible;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
}

.module-matrix-table th,
.module-matrix-table td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: left;
  vertical-align: top;
}

.module-matrix-table thead th {
  position: sticky;
  top: calc(var(--vp-nav-height, 0px) + var(--matrix-toolbar-h, 0px));
  z-index: 2;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.matrix-group {
  scroll-margin-top: calc(var(--vp-nav-height, 0px) + var(--matrix-toolbar-h, 0px) + 2.5rem);
}

.module-matrix-empty {
  color: var(--vp-c-text-2);
  text-align: center;
}

.matrix-group th {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.module-matrix-model {
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

.module-matrix-photo {
  width: 56px;
}

.module-matrix-photo img {
  display: block;
  width: 48px;
  height: 48px;
  object-fit: contain;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
}

.matrix-model-link {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
}

.matrix-model-link:hover {
  text-decoration: underline;
}

.module-matrix-planned {
  color: var(--vp-c-text-2);
}

.matrix-badge {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0 0.375rem;
  border-radius: 999px;
  background: var(--vp-c-warning-1);
  color: var(--vp-c-bg-soft);
  font-size: 11px;
  font-weight: 600;
}

.module-matrix-intro,
.module-matrix-note {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.module-matrix-note {
  margin-top: 0.5rem;
}
</style>
