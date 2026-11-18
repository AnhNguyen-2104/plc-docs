<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { families } from '../data/families'
import { capabilities } from '../data/capabilities'

const { lang } = useData()
const isVi = computed(() => lang.value === 'vi')

const orderedFamilies = computed(() => [...families].sort((a, b) => a.order - b.order))

const plannedTag = computed(() => (isVi.value ? 'dự kiến' : 'planned'))

function mark(level: string): string {
  if (level === 'yes') return '✔'
  if (level === 'partial') return '~'
  if (level === 'no') return '✘'
  return isVi.value ? 'dự kiến' : 'planned'
}

function levelClass(level: string): string {
  return `matrix-cell matrix-${level}`
}
</script>

<template>
  <div class="family-matrix">
    <div class="family-matrix-wrap">
      <table class="matrix-table">
        <thead>
          <tr>
            <th class="matrix-topic-head">{{ isVi ? 'Chủ đề' : 'Topic' }}</th>
            <th
              v-for="family in orderedFamilies"
              :key="family.id"
              :class="{ 'matrix-family-planned': family.status === 'planned' }"
            >
              {{ family.name[lang] }}
              <span v-if="family.status === 'planned'" class="matrix-planned-tag">{{ plannedTag }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cap in capabilities" :key="cap.topic.en">
            <th scope="row" class="matrix-topic">{{ cap.topic[lang] }}</th>
            <td
              v-for="family in orderedFamilies"
              :key="family.id"
              :class="levelClass(cap.support[family.id] ?? 'no')"
            >
              {{ mark(cap.support[family.id] ?? 'no') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="matrix-legend">
      <span class="matrix-cell matrix-yes">✔</span>
      {{ isVi ? 'có hỗ trợ' : 'supported' }}
      <span class="matrix-cell matrix-partial">~</span>
      {{ isVi ? 'một phần' : 'partial' }}
      <span class="matrix-cell matrix-no">✘</span>
      {{ isVi ? 'không' : 'no' }}
      <span class="matrix-cell matrix-planned">{{ plannedTag }}</span>
      {{ isVi ? 'dự kiến' : 'planned' }}
    </p>
  </div>
</template>
