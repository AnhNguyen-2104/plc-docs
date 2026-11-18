<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { filterRows } from './filterRows'

type Loc = { vi: string; en: string }
type Cell = string | Loc

type Row = {
  no: string
  name: Cell
  range: Cell
  unit?: Cell
  def?: Cell
  note?: Cell
  src: string
  srcDoc?: string
  srcPage?: string
}

const props = defineProps<{ rows: Row[]; title?: string }>()
const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')
const locale = computed<'vi' | 'en'>(() => (lang.value === 'en' ? 'en' : 'vi'))

function t(value?: Cell): string {
  if (value === undefined || value === null) return ''
  if (typeof value === 'string') return value
  return value[locale.value] ?? value.vi
}

const headers = computed(() =>
  isVi.value
    ? { no: 'Số', name: 'Tên', range: 'Dải giá trị', unit: 'Đơn vị', def: 'Mặc định', note: 'Ghi chú', src: 'Nguồn' }
    : { no: 'No.', name: 'Name', range: 'Setting range', unit: 'Unit', def: 'Default', note: 'Note', src: 'Source' }
)

const showUnit = computed(() => props.rows.some((row) => !!row.unit))
const showDef = computed(() => props.rows.some((row) => row.def !== undefined && row.def !== ''))
const showNote = computed(() => props.rows.some((row) => !!row.note))
const columnCount = computed(
  () => 4 + (showUnit.value ? 1 : 0) + (showDef.value ? 1 : 0) + (showNote.value ? 1 : 0)
)

const query = ref('')
const appliedQuery = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | undefined

watch(query, (value) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    appliedQuery.value = value
  }, 120)
})

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

const filteredRows = computed(() =>
  filterRows(props.rows, appliedQuery.value, (row) => [
    row.no,
    row.src,
    row.name,
    row.range,
    row.unit,
    row.def,
    row.note
  ])
)

function clearFilter() {
  if (debounceTimer) clearTimeout(debounceTimer)
  query.value = ''
  appliedQuery.value = ''
}
</script>

<template>
  <figure class="param-table-figure">
    <figcaption v-if="title" class="param-table-caption">{{ title }}</figcaption>
    <div class="param-table-filter">
      <input
        v-model="query"
        type="search"
        class="param-table-filter-input"
        :placeholder="isVi ? 'Lọc: mã hoặc tên (vd. Pr.5, đơn vị, pulse)' : 'Filter: code or name (e.g. Pr.5, unit, pulse)'"
        :aria-label="isVi ? 'Lọc bảng thông số' : 'Filter parameter table'"
      />
      <button
        v-if="query"
        type="button"
        class="param-table-filter-clear"
        :aria-label="isVi ? 'Xoá bộ lọc' : 'Clear filter'"
        @click="clearFilter"
      >
        ×
      </button>
      <span class="param-table-filter-count">{{ filteredRows.length }}/{{ rows.length }}</span>
    </div>
    <div class="param-table-wrap">
      <table class="param-table">
        <thead>
          <tr>
            <th>{{ headers.no }}</th>
            <th>{{ headers.name }}</th>
            <th>{{ headers.range }}</th>
            <th v-if="showUnit">{{ headers.unit }}</th>
            <th v-if="showDef">{{ headers.def }}</th>
            <th v-if="showNote">{{ headers.note }}</th>
            <th>{{ headers.src }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredRows.length === 0">
            <td :colspan="columnCount" class="param-table-empty">Không có dòng khớp / No matching row</td>
          </tr>
          <tr v-for="row in filteredRows" :key="row.no">
            <td class="param-table-no">{{ row.no }}</td>
            <td>{{ t(row.name) }}</td>
            <td>{{ t(row.range) }}</td>
            <td v-if="showUnit">{{ t(row.unit) }}</td>
            <td v-if="showDef">{{ t(row.def) }}</td>
            <td v-if="showNote">{{ t(row.note) }}</td>
            <td class="param-table-src">
              <SourceRef v-if="row.srcDoc" :doc="row.srcDoc" :page="row.srcPage" :text="row.src" />
              <template v-else>{{ row.src }}</template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </figure>
</template>
