/* eslint-disable vue/one-component-per-file */
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'

import GDialog from '../../src/components/GDialog.vue'

const waitForDialog = async() => {
  await nextTick()
  await nextTick()
  await nextTick()
}

describe('GDialog', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    window.location.hash = ''
  })

  it('opens from the activator slot in uncontrolled mode', async() => {
    const wrapper = mount(defineComponent({
      components: {
        GDialog,
      },
      template: `
        <GDialog disable-teleport>
          <template #activator="{ onClick }">
            <button class="activator" @click="onClick">Open</button>
          </template>

          <button class="inside">Inside</button>
        </GDialog>
      `,
    }), {
      attachTo: document.body,
    })

    await wrapper.find('.activator').trigger('click')
    await waitForDialog()

    expect(wrapper.find('.g-dialog-frame').attributes('role')).toBe('dialog')
    expect(document.activeElement).toBe(wrapper.find('.inside').element)
  })

  it('closes on overlay click and restores focus', async() => {
    const wrapper = mount(defineComponent({
      components: {
        GDialog,
      },
      setup() {
        const dialog = ref(false)

        return {
          dialog,
        }
      },
      template: `
        <button class="trigger" @click="dialog = true">Open</button>

        <GDialog v-model="dialog" disable-teleport>
          <button class="inside">Inside</button>
        </GDialog>
      `,
    }), {
      attachTo: document.body,
    })

    const trigger = wrapper.find('.trigger')
    ;(trigger.element as HTMLButtonElement).focus()

    await trigger.trigger('click')
    await waitForDialog()
    await wrapper.find('.g-dialog-overlay').trigger('click')
    await waitForDialog()

    expect(wrapper.vm.dialog).toBe(false)
    expect(document.activeElement).toBe(trigger.element)
  })

  it('closes only the top-most dialog when Escape is pressed', async() => {
    const wrapper = mount(defineComponent({
      components: {
        GDialog,
      },
      setup() {
        const dialog1 = ref(true)
        const dialog2 = ref(true)

        return {
          dialog1,
          dialog2,
        }
      },
      template: `
        <GDialog v-model="dialog1" disable-teleport>
          <button class="first">First</button>
        </GDialog>

        <GDialog v-model="dialog2" disable-teleport>
          <button class="second">Second</button>
        </GDialog>
      `,
    }), {
      attachTo: document.body,
    })

    await waitForDialog()

    window.dispatchEvent(new KeyboardEvent('keyup', {
      key: 'Escape',
    }))
    await waitForDialog()

    expect(wrapper.vm.dialog1).toBe(true)
    expect(wrapper.vm.dialog2).toBe(false)

    window.dispatchEvent(new KeyboardEvent('keyup', {
      key: 'Escape',
    }))
    await waitForDialog()

    expect(wrapper.vm.dialog1).toBe(false)
  })

  it('traps keyboard focus inside the active dialog', async() => {
    const wrapper = mount(defineComponent({
      components: {
        GDialog,
      },
      setup() {
        const dialog = ref(true)

        return {
          dialog,
        }
      },
      template: `
        <GDialog v-model="dialog" disable-teleport>
          <button class="first">First</button>
          <button class="last">Last</button>
        </GDialog>
      `,
    }), {
      attachTo: document.body,
    })

    await waitForDialog()

    const firstButton = wrapper.find('.first').element as HTMLButtonElement
    const lastButton = wrapper.find('.last').element as HTMLButtonElement

    lastButton.focus()
    window.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Tab',
    }))
    await nextTick()

    expect(document.activeElement).toBe(firstButton)

    firstButton.focus()
    window.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
    }))
    await nextTick()

    expect(document.activeElement).toBe(lastButton)
  })

  it('closes when browser history moves away from the dialog hash', async() => {
    const wrapper = mount(defineComponent({
      components: {
        GDialog,
      },
      setup() {
        const dialog = ref(true)

        return {
          dialog,
        }
      },
      template: `
        <GDialog
          v-model="dialog"
          close-on-back
          disable-teleport
        >
          <div>Content</div>
        </GDialog>
      `,
    }), {
      attachTo: document.body,
    })

    await waitForDialog()
    expect(window.location.hash).toContain('dialog-')

    window.location.hash = '#external-route'
    window.dispatchEvent(new PopStateEvent('popstate'))
    await waitForDialog()

    expect(wrapper.vm.dialog).toBe(false)
  })

  it('does not duplicate the dialog hash when mounted open', async() => {
    mount(defineComponent({
      components: {
        GDialog,
      },
      setup() {
        const dialog = ref(true)

        return {
          dialog,
        }
      },
      template: `
        <GDialog
          v-model="dialog"
          close-on-back
          disable-teleport
        >
          <div>Content</div>
        </GDialog>
      `,
    }), {
      attachTo: document.body,
    })

    await waitForDialog()

    expect(window.location.hash.match(/dialog-\d+/g)).toHaveLength(1)
  })

  it('does not wire browser history when useCloseOnBack is disabled', async() => {
    const wrapper = mount(defineComponent({
      components: {
        GDialog,
      },
      setup() {
        const dialog = ref(true)

        return {
          dialog,
        }
      },
      template: `
        <GDialog
          v-model="dialog"
          close-on-back
          disable-use-close-on-back
          disable-teleport
        >
          <div>Content</div>
        </GDialog>
      `,
    }), {
      attachTo: document.body,
    })

    await waitForDialog()

    expect(window.location.hash).toBe('')

    window.location.hash = '#external-route'
    window.dispatchEvent(new PopStateEvent('popstate'))
    await waitForDialog()

    expect(wrapper.vm.dialog).toBe(true)
  })
})
