import type { Ref } from 'vue'

import { nextTick, ref, watch } from 'vue'

type UseLazyActivationFunc = (baseState: Ref<boolean>) => {
  activatedOnce: Ref<boolean>
  active: Ref<boolean>
  deactivating: Ref<boolean>
}

export const useLazyActivation: UseLazyActivationFunc = (baseState) => {
  const activatedOnce = ref(false)
  const active = ref(false)
  const deactivating = ref(false)

  if (baseState.value) {
    activatedOnce.value = true
    nextTick(() => {
      active.value = true
    })
  }

  watch(
    () => baseState.value,
    (value) => {
      if (!value) {
        deactivating.value = true
        nextTick(() => {
          active.value = value
          deactivating.value = false
        })

        return
      }

      if (activatedOnce.value) {
        active.value = value
        return
      }

      activatedOnce.value = true
      nextTick(() => {
        active.value = value
      })
    },
  )

  return {
    activatedOnce,
    active,
    deactivating,
  }
}
