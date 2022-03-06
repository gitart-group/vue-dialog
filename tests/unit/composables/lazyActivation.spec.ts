import { nextTick, ref } from 'vue'
import { useLazyActivation } from '../../../src/composables/lazyActivation'

describe('Test lazyActivation composable', () => {
  it('Test `true` by default. The activation should be delayed', async() => {
    const modelValue = ref(true)

    const {
      activatedOnce,
      active,
    } = useLazyActivation(modelValue)

    expect(activatedOnce.value).toBe(true)
    expect(active.value).toBe(false)

    await nextTick()

    expect(active.value).toBe(true)
  })

  it('Test `false` by default. All should be false', async() => {
    const modelValue = ref(false)

    const {
      activatedOnce,
      active,
    } = useLazyActivation(modelValue)

    expect(activatedOnce.value).toBe(false)
    expect(active.value).toBe(false)
  })

  it('The first activation must be delayed', async() => {
    const modelValue = ref(false)

    const {
      activatedOnce,
      active,
    } = useLazyActivation(modelValue)

    modelValue.value = true
    await nextTick()

    expect(activatedOnce.value).toBe(true)
    expect(active.value).toBe(false)

    await nextTick()

    expect(active.value).toBe(true)
  })

  it('Subsequent activations must be immediate', async() => {
    const modelValue = ref(false)

    const {
      activatedOnce,
      active,
    } = useLazyActivation(modelValue)

    // first activation

    modelValue.value = true

    await nextTick()
    await nextTick()

    expect(activatedOnce.value).toBe(true)
    expect(active.value).toBe(true)

    // deactivation without delay

    modelValue.value = false
    await nextTick()

    expect(active.value).toBe(false)

    // activation without delay

    modelValue.value = true
    await nextTick()

    expect(active.value).toBe(true)
  })
})
