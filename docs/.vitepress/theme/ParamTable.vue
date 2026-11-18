<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

type Row = {
  no: string
  name: string
  range: string
  unit?: string
  def?: string
  note?: string
  src: string
}

const props = defineProps<{ rows: Row[]; title?: string }>()
const { lang } = useData()
const isVi = computed(() => lang.value === 'vi')

const headers = computed(() =>
  isVi.value
    ? { no: 'Số', name: 'Tên', range: 'Dải giá trị', unit: 'Đơn vị', def: 'Mặc định', note: 'Ghi chú', src: 'Nguồn' }
    : { no: 'No.', name: 'Name', range: 'Setting range', unit: 'Unit', def: 'Default', note: 'Note', src: 'Source' }
)

const showUnit = computed(() => props.rows.some((row) => !!row.unit))
const showDef = computed(() => props.rows.some((row) => row.def !== undefined && row.def !== ''))
const showNote = computed(() => props.rows.some((row) => !!row.note))
</script>

<template>
  <figure class="param-table-figure">
    <figcaption v-if="title" class="param-table-caption">{{ title }}</figcaption>
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
          <tr v-for="row in rows" :key="row.no">
            <td class="param-table-no">{{ row.no }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.range }}</td>
            <td v-if="showUnit">{{ row.unit ?? '' }}</td>
            <td v-if="showDef">{{ row.def ?? '' }}</td>
            <td v-if="showNote">{{ row.note ?? '' }}</td>
            <td class="param-table-src">{{ row.src }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </figure>
</template>
