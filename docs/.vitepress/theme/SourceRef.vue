<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { useData } from 'vitepress'
import { pdfDocs } from '../data/pdfDocs'
import { useSourcePreview } from './useSourcePreview'

const props = defineProps<{
  doc: string
  page?: string
  text?: string
  label?: string
}>()

const { lang } = useData()
const isVi = computed(() => lang.value !== 'en')
const instanceId = useId()
const { activeId, toggle: toggleActive, close: closeActive } = useSourcePreview()

const docDef = computed(() => pdfDocs[props.doc])
const docTitle = computed(() => docDef.value?.title ?? props.doc)
const docUrl = computed(() => docDef.value?.url ?? '')
const printedPage = computed(() => props.page ?? '')
const pdfPage = computed(() => {
  if (!docDef.value || !props.page) return undefined
  return docDef.value.map[props.page]
})
const hasPage = computed(() => pdfPage.value !== undefined && docUrl.value !== '')
const displayText = computed(() => props.text ?? (docDef.value?.short ? `${docDef.value.short}${props.page ? ` ${props.page}` : ''}` : `${props.doc}${props.page ? ` ${props.page}` : ''}`))

const isOpen = computed(() => activeId.value === instanceId)
const iframeLoaded = ref(false)
const iframeTimedOut = ref(false)
let loadTimer: ReturnType<typeof setTimeout> | undefined

const embedUrl = computed(() => `${docUrl.value}#page=${pdfPage.value}&zoom=page-width&view=FitH`)
const fallbackUrl = computed(() => `${docUrl.value}#page=1`)

function clearTimer() {
  if (loadTimer) {
    clearTimeout(loadTimer)
    loadTimer = undefined
  }
}

function startTimer() {
  clearTimer()
  if (!hasPage.value) return
  loadTimer = setTimeout(() => {
    if (!iframeLoaded.value) iframeTimedOut.value = true
  }, 2000)
}

watch(isOpen, (open) => {
  if (!open) {
    clearTimer()
    return
  }
  iframeLoaded.value = false
  iframeTimedOut.value = false
  startTimer()
})

function onIframeLoad() {
  iframeLoaded.value = true
  clearTimer()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) closeActive()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  clearTimer()
})
</script>

<template>
  <button
    type="button"
    class="source-ref"
    aria-haspopup="dialog"
    :aria-expanded="isOpen"
    :aria-controls="isOpen ? `${instanceId}-drawer` : undefined"
    :title="label ?? displayText"
    @click="toggleActive(instanceId)"
  >
    <span class="source-ref-text">{{ displayText }}</span>
    <svg class="source-ref-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M9 1h6v6h-2V4.41L6.71 10.71 5.29 9.29 11.59 3H9V1z" fill="currentColor" />
      <path d="M2 3h5v2H4v7h7V9h2v5H2V3z" fill="currentColor" />
    </svg>
  </button>

  <Teleport v-if="isOpen" to="body">
    <aside
      :id="`${instanceId}-drawer`"
      class="source-drawer"
      role="dialog"
      :aria-label="isVi ? 'Xem trước tài liệu gốc' : 'Source document preview'"
    >
      <header class="source-drawer-header">
        <div class="source-drawer-heading">
          <strong class="source-drawer-title">{{ docTitle }}</strong>
          <span class="source-drawer-meta">
            <span v-if="printedPage" class="source-drawer-page">{{ printedPage }}</span>
            <span class="source-drawer-pdf">
              {{ isVi ? 'trang PDF' : 'PDF page' }} {{ pdfPage ?? '—' }}
            </span>
          </span>
        </div>
        <div class="source-drawer-actions">
          <a
            v-if="docUrl"
            class="source-drawer-newtab"
            :href="hasPage ? embedUrl : fallbackUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ isVi ? 'Mở tab mới' : 'Open in new tab' }}
          </a>
          <button
            type="button"
            class="source-drawer-close"
            :aria-label="isVi ? 'Đóng' : 'Close'"
            @click="closeActive"
          >
            ×
          </button>
        </div>
      </header>

      <div class="source-drawer-body">
        <div v-if="!hasPage" class="source-drawer-notice">
          <p>{{ isVi ? 'chưa có số trang PDF cho mục này' : 'no PDF page number for this entry' }}</p>
          <a
            v-if="docUrl"
            class="source-drawer-notice-link"
            :href="fallbackUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ isVi ? 'Mở PDF' : 'Open PDF' }}
          </a>
        </div>
        <div v-else-if="iframeTimedOut" class="source-drawer-notice">
          <p>{{ isVi ? 'Trình duyệt chặn nhúng PDF' : 'The browser blocked PDF embedding' }}</p>
          <a
            class="source-drawer-notice-link"
            :href="embedUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ isVi ? 'Mở tab mới' : 'Open in new tab' }}
          </a>
        </div>
        <iframe
          v-else
          class="source-drawer-frame"
          :src="embedUrl"
          :title="`${docTitle} — ${isVi ? 'trang PDF' : 'PDF page'} ${pdfPage}`"
          @load="onIframeLoad"
        />
      </div>
    </aside>
  </Teleport>
</template>
