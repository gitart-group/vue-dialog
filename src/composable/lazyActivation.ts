import {
  nextTick, ref, watch, Ref,
} from 'vue'

type UseLazyActivationFunc = (baseState: Ref<boolean>) => {
  activatedOnce: Ref<boolean>
  active: Ref<boolean>
  deactivating: Ref<boolean>
}

export const useLazyActivation: UseLazyActivationFunc = (baseState) => {
  const activatedOnce = ref(baseState.value)
  const active = ref(baseState.value)
  const deactivating = ref(false)

  watch(
    () => baseState.value,
    value => {
      if(!value) {
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
