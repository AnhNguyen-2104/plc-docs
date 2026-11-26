<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { qModules, type QModule } from '../data/modules/qseries'

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')
const missing = computed(() => qModules.filter((module) => !module.photoThumb))

function href(module: QModule): string {
  return withBase(`${isVi.value ? '/q' : '/en/q'}/modules/m/${module.id}`)
}
</script>

<template>
  <div class="module-gallery">
    <p class="module-gallery-intro">
      {{
        isVi
          ? `${qModules.length} model Q-series, ${qModules.length - missing.length} có ảnh sản phẩm chính hãng.`
          : `${qModules.length} Q-series models, ${qModules.length - missing.length} with a manufacturer product photo.`
      }}
    </p>

    <div class="module-gallery-grid">
      <a
        v-for="module in qModules"
        :key="module.id"
        class="module-gallery-item"
        :href="href(module)"
      >
        <img
          v-if="module.photoThumb"
          :src="withBase(module.photoThumb)"
          :alt="module.model"
          width="96"
          height="72"
          loading="lazy"
          decoding="async"
        />
        <div v-else class="module-gallery-placeholder" aria-hidden="true">
          {{ module.model.slice(0, 3) }}
        </div>
        <span class="module-gallery-model">{{ module.model }}</span>
        <span v-if="!module.photoThumb" class="module-gallery-missing">
          {{ isVi ? 'Chưa có ảnh hãng' : 'No manufacturer photo' }}
        </span>
      </a>
    </div>

    <p v-if="missing.length" class="module-gallery-note">
      <strong>{{ isVi ? 'Chưa có ảnh hãng:' : 'No manufacturer photo:' }}</strong>
      {{ missing.map((module) => module.model).join(', ') }}.
    </p>
  </div>
</template>

<style scoped>
.module-gallery {
  margin: 1.5rem 0;
}

.module-gallery-intro {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.module-gallery-grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 10px;
}

@media (max-width: 960px) {
  .module-gallery-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .module-gallery-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.module-gallery-item {
  display: grid;
  justify-items: center;
  gap: 4px;
  padding: 8px 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-decoration: none;
  text-align: center;
}

.module-gallery-item:hover {
  border-color: var(--vp-c-brand-1);
}

.module-gallery-item img {
  width: 96px;
  height: 72px;
  object-fit: contain;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.module-gallery-placeholder {
  width: 96px;
  height: 72px;
  display: grid;
  place-items: center;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 4px;
  color: var(--vp-c-text-3);
  font-size: 11px;
  letter-spacing: 0.08em;
}

.module-gallery-model {
  font-size: 11px;
  font-weight: 600;
  line-height: 1.3;
}

.module-gallery-missing {
  font-size: 10px;
  color: var(--vp-c-text-3);
  line-height: 1.2;
}

.module-gallery-note {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
