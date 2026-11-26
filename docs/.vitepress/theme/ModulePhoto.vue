<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { qModules } from '../data/modules/qseries'

const props = defineProps<{ id: string; width?: number; height?: number }>()

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')
const module = computed(() => qModules.find((entry) => entry.id === props.id))
const src = computed(() => (module.value?.photo ? withBase(module.value.photo) : ''))
const alt = computed(() => {
  if (module.value?.photoAlt) return isVi.value ? module.value.photoAlt.vi : module.value.photoAlt.en
  return module.value?.model ?? props.id
})
const credit = computed(() => module.value?.photoCredit ?? '')
const creditLabel = computed(() => (isVi.value ? 'Ảnh: Mitsubishi Electric' : 'Photo: Mitsubishi Electric'))
const sourceLabel = computed(() => (isVi.value ? 'nguồn' : 'source'))
</script>

<template>
  <figure v-if="src" class="module-photo">
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy"
      decoding="async"
    />
    <figcaption>
      <span>{{ creditLabel }}</span>
      <template v-if="credit"> — <a :href="credit" target="_blank" rel="noopener">{{ sourceLabel }}</a></template>
    </figcaption>
  </figure>
  <p v-else class="photo-missing">
    {{ isVi ? 'Chưa có ảnh hãng cho model này.' : 'No manufacturer photo is available for this model.' }}
  </p>
</template>

<style scoped>
.module-photo {
  margin: 16px 0;
  display: grid;
  gap: 6px;
  justify-items: start;
}

.module-photo img {
  max-width: 100%;
  height: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.module-photo figcaption {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.photo-missing {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
