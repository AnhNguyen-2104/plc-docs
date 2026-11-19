<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    caption: string
    doc: string
    section: string
    page: string
    pdfUrl?: string
  }>(),
  { pdfUrl: '' }
)

const { lang, site } = useData()
const isVi = computed(() => lang.value !== 'en')
const imgSrc = computed(() => `${site.value.base.replace(/\/$/, '')}${props.src}`)
const credit = computed(() =>
  isVi.value
    ? `Nguồn: ${props.doc} ${props.section} (tr. ${props.page})`
    : `Source: ${props.doc} ${props.section} (p. ${props.page})`
)
const link = computed(() => (isVi.value ? 'Tài liệu gốc' : 'Original manual'))
</script>

<template>
  <figure class="manual-figure">
    <img :src="imgSrc" :alt="alt" loading="lazy" decoding="async" />
    <figcaption>
      <span class="manual-figure__caption">{{ caption }}</span>
      <span class="manual-figure__credit"> {{ credit }}<template v-if="pdfUrl"> — <a :href="pdfUrl" target="_blank" rel="noopener">{{ link }}</a></template></span>
    </figcaption>
  </figure>
</template>

<style scoped>
.manual-figure {
  margin: 16px 0;
  width: 100%;
}

.manual-figure img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.manual-figure figcaption {
  margin-top: 6px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.manual-figure__caption {
  display: block;
}

.manual-figure__credit {
  display: block;
  margin-top: 2px;
  font-size: 12px;
}
</style>
