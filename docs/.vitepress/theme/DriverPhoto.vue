<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
const props = defineProps<{ src: string; alt: string; caption?: string; source: string; sourceUrl: string }>()
const { lang, site } = useData()
const isVi = computed(() => lang.value !== 'en')
const imgSrc = computed(() => `${site.value.base.replace(/\/$/, '')}${props.src}`)
const credit = computed(() => (isVi.value ? `Ảnh minh hoạ: ${props.source}` : `Illustration: ${props.source}`))
const note = computed(() => isVi.value
  ? 'Ảnh tham khảo từ nguồn ngoài — đối chiếu số chân với manual hãng trước khi đấu dây.'
  : 'Reference image from an external source — verify pin numbers against the manufacturer manual before wiring.')
</script>
<template>
  <figure class="driver-photo">
    <a :href="sourceUrl" target="_blank" rel="noopener noreferrer">
      <img :src="imgSrc" :alt="alt" loading="lazy" decoding="async" />
    </a>
    <figcaption>
      <p v-if="caption" class="driver-photo-caption">{{ caption }}</p>
      <p class="driver-photo-source"><a :href="sourceUrl" target="_blank" rel="noopener noreferrer">{{ credit }}</a></p>
      <p class="driver-photo-note">{{ note }}</p>
    </figcaption>
  </figure>
</template>
<style scoped>
.driver-photo { margin: 1rem 0; }
.driver-photo img { width: 100%; height: auto; display: block; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); }
.driver-photo-caption { font-size: 14px; color: var(--vp-c-text-1); margin: 0.5rem 0 0.25rem; }
.driver-photo-source { font-size: 12px; margin: 0; }
.driver-photo-note { font-size: 12px; color: var(--vp-c-text-2); margin: 0.25rem 0 0; }
</style>
