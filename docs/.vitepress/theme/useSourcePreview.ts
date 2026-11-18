import { ref } from 'vue'

const activeId = ref<string | null>(null)

export function useSourcePreview() {
  function toggle(id: string) {
    activeId.value = activeId.value === id ? null : id
  }

  function close() {
    activeId.value = null
  }

  return { activeId, toggle, close }
}
