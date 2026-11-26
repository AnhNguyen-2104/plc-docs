<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

const { lang } = useData()
const route = useRoute()

const isVi = computed(() => lang.value !== 'en')
const base = computed(() => (isVi.value ? '/q/modules' : '/en/q/modules'))

type Section = { slug: string; vi: string; en: string }

const items: Section[] = [
  { slug: '', vi: 'Tổng quan', en: 'Overview' },
  { slug: 'assembly', vi: 'Ghép module', en: 'Module assembly' },
  { slug: 'guides', vi: 'Hướng dẫn các module', en: 'Module guides' },
  { slug: 'usage', vi: 'Cách dùng', en: 'How to use' }
]

function href(item: Section): string {
  return withBase(base.value + '/' + item.slug)
}

function normalizePath(path: string): string {
  const siteBase = withBase('/')
  const stripped =
    siteBase !== '/' && path.startsWith(siteBase) ? '/' + path.slice(siteBase.length) : path
  return stripped.replace(/\/+$/, '')
}

function active(item: Section): boolean {
  const path = normalizePath(route.path)
  const target = item.slug ? base.value + '/' + item.slug : base.value
  return path === target || path.endsWith(target + '/')
}
</script>

<template>
  <nav
    class="module-section-nav"
    :aria-label="isVi ? 'Mục danh mục module' : 'Module catalogue sections'"
  >
    <a
      v-for="item in items"
      :key="item.slug"
      :href="href(item)"
      :class="{ active: active(item) }"
      :aria-current="active(item) ? 'page' : undefined"
    >
      {{ isVi ? item.vi : item.en }}
    </a>
  </nav>
</template>

<style scoped>
.module-section-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 24px;
}

.module-section-nav a {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.module-section-nav a:hover {
  border-color: var(--vp-c-brand-1);
}

.module-section-nav a.active {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  border-color: var(--vp-c-brand-1);
}
</style>
