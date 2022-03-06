import type { Ref } from 'vue'

import { nextTick, ref, watch } from 'vue'

type UseLazyActivationFunc = (baseState: Ref<boolean>) => {
  /**
   * determine if `baseState' was `true` at least once
   */
  activatedOnce: Ref<boolean>

  /**
   * proxy value of baseState.
   */
  active: Ref<boolean>
}

/**
 * make first activation lazy: `activatedOnce` changes immediately,
 * `active` changes on `nextTick`
 */
export const useLazyActivation: UseLazyActivationFunc = (baseState) => {
  const activatedOnce = ref(false)
  const active = ref(false)

  if (baseState.value) {
    activatedOnce.value = true
    nextTick(() => {
      active.value = true
    })
  }

  watch(baseState, (value) => {
    // lazy first activation
    if (!activatedOnce.value) {
      activatedOnce.value = true
      nextTick(() => {
        active.value = value
      })

      return
    }

    active.value = value
  })

  return {
    activatedOnce,
    active,
  }
}
