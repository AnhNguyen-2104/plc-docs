<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { imageSizes } from '../data/imageSizes'

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
const size = computed(() => imageSizes[props.src])
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
    <img
      :src="imgSrc"
      :alt="alt"
      :width="size?.[0]"
      :height="size?.[1]"
      loading="lazy"
      decoding="async"
    />
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
  border: 1px solid var(--pq-line);
  border-radius: 4px;
  background: var(--pq-paper);
  overflow: hidden;
}

.manual-figure img {
  display: block;
  width: 100%;
  height: auto;
}

.manual-figure figcaption {
  margin: 0;
  padding: 8px 12px;
  border-top: 1px solid var(--pq-line);
  font-size: 13px;
  color: #4a4f55;
  line-height: 1.5;
}

.manual-figure__caption {
  display: block;
}

.manual-figure__credit {
  display: block;
  margin-top: 2px;
  font-family: var(--pq-font-mono);
  font-size: 12px;
  font-weight: 500;
  color: #5c6268;
}

.manual-figure__credit a {
  color: var(--pq-blue);
}
</style>
