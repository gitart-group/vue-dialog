import type { Ref } from 'vue'

import { getCurrentInstance, ref, watch } from 'vue'

const overlays: Ref<number[]> = ref([])

const MIN_Z_INDEX = 1000

export function useOverlay(isActive: Ref<boolean | undefined>) {
  const id = getCurrentInstance()!.uid
  const zIndex = ref(0)

  watch(isActive, (value) => {
    if (value) {
      overlays.value.push(id)
      zIndex.value = MIN_Z_INDEX + ((overlays.value.indexOf(id) + 1) * 2)
    }
    else {
      overlays.value = overlays.value.filter(x => x !== id)
    }
  }, {
    immediate: true,
  })

  return { zIndex }
}
