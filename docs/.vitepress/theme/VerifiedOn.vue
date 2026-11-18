<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{
  hardware: string
  cpu: string
  software: string
  date: string
  note?: string
}>()

const { lang } = useData()
const isVi = computed(() => lang.value === 'vi')

const ready = computed(
  () => !!props.hardware && !!props.cpu && !!props.software && !!props.date
)

const label = computed(() =>
  isVi.value ? 'Đã kiểm chứng trên thiết bị' : 'Verified on hardware'
)

const labels = computed(() =>
  isVi.value
    ? { hardware: 'Phần cứng', cpu: 'CPU', software: 'Phần mềm', date: 'Ngày' }
    : { hardware: 'Hardware', cpu: 'CPU', software: 'Software', date: 'Date' }
)
</script>

<template>
  <div v-if="ready" class="verified-on">
    <span class="verified-on-badge">{{ label }}</span>
    <ul class="verified-on-list">
      <li><strong>{{ labels.hardware }}:</strong> {{ hardware }}</li>
      <li><strong>{{ labels.cpu }}:</strong> {{ cpu }}</li>
      <li><strong>{{ labels.software }}:</strong> {{ software }}</li>
      <li><strong>{{ labels.date }}:</strong> {{ date }}</li>
    </ul>
    <p v-if="note" class="verified-on-note">{{ note }}</p>
  </div>
</template>
