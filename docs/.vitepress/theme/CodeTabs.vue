<script setup lang="ts">
import { ref } from 'vue'

type Tab = { label: string; code: string; lang?: string }

const props = defineProps<{ tabs: Tab[] }>()
const active = ref(0)
</script>

<template>
  <div v-if="props.tabs.length" class="code-tabs">
    <div class="code-tabs-nav" role="tablist">
      <button
        v-for="(tab, index) in props.tabs"
        :key="index"
        type="button"
        role="tab"
        class="code-tab"
        :class="{ 'code-tab-active': index === active }"
        :aria-selected="index === active"
        @click="active = index"
      >
        {{ tab.label }}
      </button>
    </div>
    <pre class="code-tabs-pre"><code>{{ props.tabs[active]?.code ?? '' }}</code></pre>
  </div>
</template>
