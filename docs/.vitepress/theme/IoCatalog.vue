<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { qModules, type QModule } from '../data/modules/qseries'

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')

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

function moduleHref(module: QModule): string {
  return withBase(`${isVi.value ? '/q' : '/en/q'}/modules/m/${module.id}`)
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
    <p class="io-catalog-intro">{{ summary }}</p>

    <div class="io-catalog-wrap">
      <table class="io-catalog-table">
        <thead>
          <tr>
            <th aria-hidden="true"></th>
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
            <td class="io-catalog-photo">
              <a v-if="module.photoThumb" :href="moduleHref(module)">
                <img
                  :src="withBase(module.photoThumb)"
                  :alt="module.model"
                  width="44"
                  height="44"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </td>
            <th scope="row" class="io-catalog-model">
              <a class="io-catalog-link" :href="moduleHref(module)">{{ module.model }}</a>
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

.io-catalog-photo {
  width: 52px;
}

.io-catalog-photo img {
  display: block;
  width: 44px;
  height: 44px;
  object-fit: contain;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
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
