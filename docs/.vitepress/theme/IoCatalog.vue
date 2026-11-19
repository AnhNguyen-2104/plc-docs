<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { qModules, type QModule } from '../data/modules/qseries'

const { lang, page } = useData()
const isVi = computed(() => lang.value !== 'en')

const current = computed(() => {
  let rel = page.value.relativePath.replace(/\.md$/, '')
  if (rel.endsWith('/index')) rel = rel.slice(0, -'/index'.length)
  if (lang.value !== 'vi' && rel.startsWith(`${lang.value}/`)) {
    rel = rel.slice(lang.value.length + 1)
  }
  return `/${rel}`
})

type Kind = 'input' | 'output' | 'combined'

const props = defineProps<{ kind: Kind }>()

const NOUN: Record<Kind, { vi: string; en: string }> = {
  input: { vi: 'vào số', en: 'digital input' },
  output: { vi: 'ra số', en: 'digital output' },
  combined: { vi: 'kết hợp vào/ra', en: 'combined I/O' }
}

const rows = computed(() => qModules.filter((module) => module.kind === props.kind))
const summary = computed(() =>
  isVi.value
    ? `${rows.value.length} module ${NOUN[props.kind].vi} trong danh mục`
    : `${rows.value.length} ${NOUN[props.kind].en} modules catalogued`
)

function cell(value: { vi: string; en: string } | string): string {
  return typeof value === 'string' ? value : value[isVi.value ? 'vi' : 'en']
}

function isDocumented(module: QModule): boolean {
  return module.status === 'documented'
}

function isCurrent(module: QModule): boolean {
  return module.page === current.value
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
    <p class="io-catalog-intro">{{ summary }}</p>

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
        <tbody>
          <tr
            v-for="module in rows"
            :key="module.id"
            :class="{ 'io-catalog-planned': !isDocumented(module) }"
          >
            <th scope="row" class="io-catalog-model">
              <a
                v-if="isDocumented(module) && !isCurrent(module)"
                class="io-catalog-link"
                :href="withBase(module.page)"
              >
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
