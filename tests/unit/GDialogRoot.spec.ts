/* eslint-disable vue/one-component-per-file */
import type { PropType } from 'vue'

import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'

import GDialogRoot from '../../src/components/GDialogRoot.vue'
import {
  dialogInjectionFallback,
  dialogInjectionKey,
  plugin,
  useDialogConfirm,
  useGDialog,
} from '../../src/plugin'

const ManagedDialog = defineComponent({
  name: 'ManagedDialog',
  props: {
    confirm: {
      type: Function as PropType<(value?: boolean) => void>,
      default: undefined,
    },

    modelValue: {
      type: Boolean,
      required: true,
    },

    title: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  template: `
    <div v-if="modelValue" class="managed-dialog">
      <span class="title">{{ title }}</span>
      <button class="confirm" @click="confirm?.(true); $emit('update:modelValue', false)">Confirm</button>
      <button class="close" @click="$emit('update:modelValue', false)">Close</button>
    </div>
  `,
})

describe('GDialogRoot', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  test('uses fallback data if the plugin is not installed', () => {
    const wrapper = shallowMount(GDialogRoot)
    expect(wrapper.vm.dialogs).toBe(dialogInjectionFallback.dialogs)
  })

  test('uses injected plugin data when available', () => {
    const wrapper = shallowMount(GDialogRoot, {
      global: {
        provide: {
          [dialogInjectionKey as symbol]: {
            addDialog: vi.fn(),
            dialogs: [],
            removeDialog: vi.fn(),
          },
        },
      },
    })

    expect(wrapper.vm.dialogs).not.toBe(dialogInjectionFallback.dialogs)
  })

  test('renders plugin-managed dialogs and removes them by public id', async() => {
    vi.useFakeTimers()

    const wrapper = mount(defineComponent({
      components: {
        GDialogRoot,
      },
      setup() {
        const $dialog = useGDialog()

        const open = () => {
          return $dialog.addDialog({
            component: ManagedDialog,
            id: 'custom-id',
            props: {
              title: 'Hello',
            },
          })
        }

        return {
          dialogs: $dialog.dialogs,
          open,
          removeDialog: $dialog.removeDialog,
        }
      },
      template: `
        <button class="open" @click="open()">Open</button>
        <GDialogRoot />
      `,
    }), {
      attachTo: document.body,
      global: {
        plugins: [[plugin, {
          closeDelay: 0,
        }]],
      },
    })

    await wrapper.find('.open').trigger('click')

    expect(wrapper.find('.managed-dialog').exists()).toBe(true)
    expect(wrapper.vm.dialogs).toHaveLength(1)
    expect(wrapper.vm.dialogs[0].id).toBe('custom-id')

    wrapper.vm.removeDialog('custom-id', 0)
    vi.runAllTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.dialogs).toHaveLength(0)
  })

  test('can cancel dialog closing from the onClose hook', async() => {
    vi.useFakeTimers()

    const wrapper = mount(defineComponent({
      components: {
        GDialogRoot,
      },
      setup() {
        const $dialog = useGDialog()

        const open = () => {
          $dialog.addDialog({
            component: ManagedDialog,
            props: {
              title: 'Cancelable',
            },
          }, {
            onClose: ({ cancel }) => {
              cancel()
            },
          })
        }

        return {
          dialogs: $dialog.dialogs,
          open,
        }
      },
      template: `
        <button class="open" @click="open()">Open</button>
        <GDialogRoot />
      `,
    }), {
      attachTo: document.body,
      global: {
        plugins: [[plugin, {
          closeDelay: 0,
        }]],
      },
    })

    await wrapper.find('.open').trigger('click')
    await wrapper.find('.close').trigger('click')
    vi.runAllTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.managed-dialog').exists()).toBe(true)
    expect(wrapper.vm.dialogs).toHaveLength(1)
  })

  test('resolves useDialogConfirm with the rendered dialog instance', async() => {
    vi.useFakeTimers()

    const wrapper = mount(defineComponent({
      components: {
        GDialogRoot,
      },
      setup() {
        const result = ref<boolean | null>(null)
        const confirm = useDialogConfirm(ManagedDialog)

        const run = async() => {
          result.value = await confirm({
            title: 'Confirm me',
          })
        }

        return {
          result,
          run,
        }
      },
      template: `
        <button class="run" @click="run()">Run</button>
        <div class="result">{{ result }}</div>
        <GDialogRoot />
      `,
    }), {
      attachTo: document.body,
      global: {
        plugins: [[plugin, {
          closeDelay: 0,
        }]],
      },
    })

    await wrapper.find('.run').trigger('click')
    await wrapper.find('.confirm').trigger('click')
    vi.runAllTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.result).toBe(true)
  })
})
