<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { qModules, type QKind, type QModule } from '../data/modules/qseries'

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')

const KINDS: QKind[] = ['cpu', 'power', 'base', 'io', 'analog', 'counter', 'network', 'motion']

const kindLabel: Record<QKind, { vi: string; en: string }> = {
  cpu: { vi: 'CPU', en: 'CPU' },
  power: { vi: 'Nguồn', en: 'Power supply' },
  base: { vi: 'Base', en: 'Base unit' },
  io: { vi: 'Vào/ra số', en: 'Digital I/O' },
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

function cell(value: { vi: string; en: string } | string): string {
  return typeof value === 'string' ? value : value[isVi.value ? 'vi' : 'en']
}

function isDocumented(module: QModule): boolean {
  return module.status === 'documented'
}
</script>

<template>
  <div class="module-matrix">
    <p class="module-matrix-intro">
      {{
        isVi
          ? `${qModules.length} module Q-series, ${plannedCount} chưa tài liệu hoá đầy đủ.`
          : `${qModules.length} Q-series modules, ${plannedCount} not fully documented.`
      }}
    </p>

    <div class="module-matrix-wrap">
      <table class="module-matrix-table">
        <thead>
          <tr>
            <th>{{ isVi ? 'Model' : 'Model' }}</th>
            <th>{{ isVi ? 'Vai trò' : 'Role' }}</th>
            <th>{{ isVi ? 'Điểm chính' : 'Key spec' }}</th>
          </tr>
        </thead>
        <tbody v-for="group in groups" :key="group.kind">
          <tr class="matrix-group">
            <th :colspan="3" scope="colgroup">{{ group.label }}</th>
          </tr>
          <tr
            v-for="module in group.rows"
            :key="module.id"
            :class="{ 'module-matrix-planned': !isDocumented(module) }"
          >
            <th scope="row" class="module-matrix-model">
              <a v-if="isDocumented(module)" class="matrix-model-link" :href="withBase(module.page)">
                {{ module.model }}
              </a>
              <span v-else class="matrix-model-text">{{ module.model }}</span>
              <span v-if="!isDocumented(module)" class="matrix-badge">{{ isVi ? ' (dự kiến)' : ' (planned)' }}</span>
            </th>
            <td>{{ cell(module.role) }}</td>
            <td>{{ cell(module.keySpec) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="module-matrix-note">
      {{
        isVi
          ? 'Tên model liên kết tới trang chi tiết. Số liệu lấy từ manual SH-080483, SH-080042, SH-080055, SH-080054, SH-080036 và các manual mạng; dòng "dự kiến" là module chưa xác minh được từ manual trên đĩa.'
          : 'The model name links to the detail page. Values come from SH-080483, SH-080042, SH-080055, SH-080054, SH-080036 and the network manuals; "planned" rows are modules that could not be verified from the manuals on disk.'
      }}
    </p>
  </div>
</template>

<style scoped>
.module-matrix {
  margin: 1.5rem 0;
}

.module-matrix-wrap {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.module-matrix-table {
  width: 100%;
  border-collapse: collapse;
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
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  white-space: nowrap;
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
