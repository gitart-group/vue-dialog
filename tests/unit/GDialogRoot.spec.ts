import { shallowMount } from '@vue/test-utils'
import GDialogRoot from '../../src/components/GDialogRoot.vue'
import { dialogInjectionFallback, dialogInjectionKey } from '../../src/plugin'

describe('Test Provide/Inject for GDialogRoot', () => {
  test('Use fallback data if plugin is not installed', () => {
    const wrapper = shallowMount(GDialogRoot)
    expect(wrapper.vm.dialogs).toBe(dialogInjectionFallback.dialogs)
  })

  test('Use plugin data with global provide', () => {
    const wrapper = shallowMount(GDialogRoot, {
      global: {
        provide: {
          [dialogInjectionKey as symbol]: () => ({}),
        },
      },
    })

    expect(wrapper.vm.dialogs).not.toBe(dialogInjectionFallback.dialogs)
  })
})
