<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { qModules, type QModule } from '../data/modules/qseries'

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')

const COMBINED = new Set(['qh42p', 'qx41y41p', 'qx48y57'])

const ioModules = computed(() => qModules.filter((module) => module.kind === 'io'))

type Section = { key: 'input' | 'output' | 'combined'; label: string; rows: QModule[] }

const sections = computed<Section[]>(() => {
  const inputs = ioModules.value.filter((m) => !COMBINED.has(m.id) && /^Q[XI]/.test(m.model))
  const outputs = ioModules.value.filter((m) => /^QY/.test(m.model))
  const combined = ioModules.value.filter((m) => COMBINED.has(m.id))
  return [
    { key: 'input', label: isVi.value ? 'Ngõ vào' : 'Input', rows: inputs },
    { key: 'output', label: isVi.value ? 'Ngõ ra' : 'Output', rows: outputs },
    { key: 'combined', label: isVi.value ? 'Kết hợp' : 'Combined', rows: combined }
  ]
})

function cell(value: { vi: string; en: string } | string): string {
  return typeof value === 'string' ? value : value[isVi.value ? 'vi' : 'en']
}

function isDocumented(module: QModule): boolean {
  return module.status === 'documented'
}

function points(module: QModule): string {
  const text = isVi.value ? module.keySpec.vi : module.keySpec.en
  const match = text.match(/^(\d+)(?:\s*(?:vào|in)\s*\+\s*(\d+)\s*(?:ra|out))?/)
  if (!match) return ''
  return match[2] ? `${match[1]} + ${match[2]}` : match[1]
}
</script>

<template>
  <div class="io-catalog">
    <p class="io-catalog-intro">
      {{
        isVi
          ? `${ioModules.length} module vào/ra số trong danh mục`
          : `${ioModules.length} digital I/O modules catalogued`
      }}
    </p>

    <div class="io-catalog-wrap">
      <table class="io-catalog-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>{{ isVi ? 'Điểm' : 'Points' }}</th>
            <th>{{ isVi ? 'Thông số' : 'Spec' }}</th>
            <th>{{ isVi ? 'Ghi chú' : 'Note' }}</th>
          </tr>
        </thead>
        <tbody v-for="section in sections" :key="section.key">
          <tr class="io-catalog-group">
            <th :colspan="4" scope="colgroup">{{ section.label }}</th>
          </tr>
          <tr
            v-for="module in section.rows"
            :key="module.id"
            :class="{ 'io-catalog-planned': !isDocumented(module) }"
          >
            <th scope="row" class="io-catalog-model">
              <a v-if="isDocumented(module)" class="io-catalog-link" :href="withBase(module.page)">
                {{ module.model }}
              </a>
              <span v-else>{{ module.model }}</span>
              <span v-if="!isDocumented(module)" class="io-catalog-badge">{{ isVi ? ' (dự kiến)' : ' (planned)' }}</span>
            </th>
            <td>{{ points(module) }}</td>
            <td>{{ cell(module.keySpec) }}</td>
            <td>{{ `SH-080042 p.${module.manual.page}` }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.io-catalog {
  margin: 1.5rem 0;
}

.io-catalog-wrap {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.io-catalog-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.io-catalog-table th,
.io-catalog-table td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: left;
  vertical-align: top;
}

.io-catalog-table thead th {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.io-catalog-group th {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.io-catalog-model {
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

.io-catalog-link {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
}

.io-catalog-link:hover {
  text-decoration: underline;
}

.io-catalog-planned {
  color: var(--vp-c-text-2);
}

.io-catalog-badge {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0 0.375rem;
  border-radius: 999px;
  background: var(--vp-c-warning-1);
  color: var(--vp-c-bg-soft);
  font-size: 11px;
  font-weight: 600;
}

.io-catalog-intro {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
</style>
