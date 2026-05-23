<script lang="ts">
import type { PropType } from 'vue'

import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'
import { useCloseOnBack } from 'gitart-manage-vue-dialog'

import { IN_BROWSER } from '../util'
import { useStack } from '../composables/stack'
import { useOverlay } from '../composables/overlay'
import { useLazyActivation } from '../composables/lazyActivation'
import { useScroll } from '../composables/scroll'
import { useWindowEventListener } from '../composables/window'

import GDialogOverlay from './GDialogOverlay.vue'
import GDialogFrame from './GDialogFrame.vue'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

const isFocusableTarget = (value: unknown): value is HTMLElement | SVGElement => {
  return value instanceof HTMLElement || value instanceof SVGElement
}

const getFocusableElements = (container?: Element): Array<HTMLElement | SVGElement> => {
  if (!container)
    return []

  return Array.from(container.querySelectorAll<HTMLElement | SVGElement>(FOCUSABLE_SELECTOR))
    .filter((element) => {
      const htmlElement = element as HTMLElement
      return !htmlElement.hasAttribute('disabled')
        && htmlElement.getAttribute('aria-hidden') !== 'true'
    })
}

export default defineComponent({
  name: 'GDialog',
  components: {
    GDialogOverlay,
    GDialogFrame,
  },

  inheritAttrs: false,
  props: {
    background: {
      type: [Boolean, String],
      default: true,
    },

    ariaDescribedby: {
      type: String,
      default: undefined,
    },

    ariaLabel: {
      type: String,
      default: undefined,
    },

    ariaLabelledby: {
      type: String,
      default: undefined,
    },

    borderRadius: {
      type: [Boolean, Number, String],
      default: true,
    },

    contentClass: {
      type: String,
      default: '',
    },

    /**
     * removes box-shadow for content
     */
    depressed: Boolean,

    fullscreen: Boolean,

    height: {
      type: [String, Number],
      default: 'auto',
    },

    initialFocus: {
      type: [String, Object] as PropType<string | HTMLElement | SVGElement | null>,
      default: undefined,
    },

    /**
     * enables local mode for the dialog.
     * dialog is fixed to first "position: relative;" parent
     */
    local: Boolean,

    maxWidth: {
      type: [String, Number],
      default: 'none',
    },

    modelValue: {
      type: Boolean,
      default: undefined,
    },

    noClickAnimation: Boolean,

    overlayBackground: {
      type: [Boolean, String],
      default: true,
    },

    restoreFocus: {
      type: Boolean,
      default: true,
    },

    /**
     * clicking outside content will not close modal
     */
    persistent: Boolean,

    scrollable: Boolean,

    /**
     * CSS selector string or an actual DOM node where
     * where to teleport dialog when it is opened.
     */
    teleportTo: {
      type: [String, Object] as PropType<string | HTMLElement | SVGElement>,
      default: 'body',
    },

    trapFocus: {
      type: Boolean,
      default: true,
    },

    /**
     * disables teleport.
     */
    disableTeleport: Boolean,

    transition: {
      type: String,
      default: 'g-dialog-transition',
    },

    width: {
      type: [String, Number],
      default: 'auto',
    },

    /**
     * it true, the dialog will add hash to the url.
     * and will be closed on browser back button.
     */
    closeOnBack: {
      type: Boolean,
      default: false,
    },

    /**
     * disables internal useCloseOnBack integration.
     * useful when history/hash sync is managed externally.
     */
    disableUseCloseOnBack: Boolean,
  },

  emits: {
    'update:modelValue': (val: boolean) => true,
  },

  setup(props, { emit }) {
    const instance = getCurrentInstance()!
    const overlayComponent = ref<InstanceType<typeof GDialogOverlay> | null>(null)
    const frameComponent = ref<InstanceType<typeof GDialogFrame> | null>(null)

    const overlayElement = computed<Element | undefined>(() => overlayComponent.value?.$el as Element)
    const frameElement = computed<HTMLElement | undefined>(() => frameComponent.value?.$el as HTMLElement)

    const withModelValue = props.modelValue !== undefined

    const scopedModelValue = ref(false)
    const mounted = ref(false)
    watch(() => props.modelValue, (val) => {
      if (!withModelValue || !mounted.value)
        return

      scopedModelValue.value = !!val
    })

    const { isTop } = useStack(scopedModelValue)

    const onClose = () => {
      if (!withModelValue)
        scopedModelValue.value = false

      emit('update:modelValue', false)
    }

    const onOpen = () => {
      if (!withModelValue)
        scopedModelValue.value = true

      emit('update:modelValue', true)
    }

    const { activatedOnce, active: isActive } = useLazyActivation(scopedModelValue)

    const { zIndex } = useOverlay(isActive)

    // Add a quick "bounce" animation to the content
    const animateClick = () => {
      if (props.noClickAnimation) return

      frameComponent.value?.animateClick()
    }

    const lastFocusedElement = ref<HTMLElement | SVGElement | null>(null)

    const focusDialog = () => {
      const currentFrameElement = frameElement.value

      if (!currentFrameElement || !isTop.value)
        return

      let focusTarget: HTMLElement | SVGElement | null = null

      if (typeof props.initialFocus === 'string') {
        focusTarget = currentFrameElement.querySelector<HTMLElement>(props.initialFocus)
          ?? document.querySelector<HTMLElement>(props.initialFocus)
      }
      else if (isFocusableTarget(props.initialFocus)) {
        focusTarget = props.initialFocus
      }

      const elementToFocus = focusTarget ?? getFocusableElements(currentFrameElement)[0] ?? currentFrameElement
      elementToFocus.focus({ preventScroll: true })
    }

    const restorePreviousFocus = () => {
      if (!props.restoreFocus)
        return

      lastFocusedElement.value?.focus({ preventScroll: true })
    }

    const handleFrameKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !props.trapFocus || !isActive.value || !isTop.value)
        return

      const currentFrameElement = frameElement.value
      if (!currentFrameElement)
        return

      const focusableElements = getFocusableElements(currentFrameElement)
      if (!focusableElements.length) {
        event.preventDefault()
        currentFrameElement.focus({ preventScroll: true })
        return
      }

      const firstFocusableElement = focusableElements[0]
      const lastFocusableElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (!activeElement || !currentFrameElement.contains(activeElement)) {
        event.preventDefault()
        ;(event.shiftKey ? lastFocusableElement : firstFocusableElement).focus({ preventScroll: true })
        return
      }

      if (!event.shiftKey && activeElement === lastFocusableElement) {
        event.preventDefault()
        firstFocusableElement.focus({ preventScroll: true })
      }
      else if (event.shiftKey && activeElement === firstFocusableElement) {
        event.preventDefault()
        lastFocusableElement.focus({ preventScroll: true })
      }
    }

    useWindowEventListener('keyup', (ev) => {
      if (!isActive.value || ev.key !== 'Escape' || !isTop.value)
        return

      if (!props.persistent)
        onClose()

      else
        animateClick()
    }, { passive: true })

    useWindowEventListener('keydown', (ev) => {
      if (ev.key !== 'Tab')
        return

      handleFrameKeydown(ev)
    }, { passive: false })

    onMounted(() => {
      mounted.value = true

      if (withModelValue)
        scopedModelValue.value = !!props.modelValue
    })

    watch(isTop, (value) => {
      if (value && isActive.value) {
        nextTick(() => {
          focusDialog()
        })
      }
    })

    const { enableScroll, disableScroll } = useScroll({
      overlay: overlayElement,
      content: frameElement,
      contentActiveClass: 'g-dialog-frame--active',
      fullscreen: props.fullscreen,
      contentFullscreenClass: 'g-dialog-frame--fullscreen',
    })

    // scroll + focus lifecycle
    watch(isActive, (active, previousActive) => {
      if (!props.local) {
        if (active)
          disableScroll()
        else
          enableScroll()
      }

      if (!IN_BROWSER)
        return

      if (active && !previousActive) {
        const activeElement = document.activeElement
        lastFocusedElement.value = isFocusableTarget(activeElement)
          ? activeElement
          : null

        nextTick(() => {
          focusDialog()
        })
      }
      else if (!active && previousActive) {
        nextTick(() => {
          restorePreviousFocus()
        })
      }
    })

    onBeforeUnmount(() => {
      enableScroll()

      if (scopedModelValue.value)
        restorePreviousFocus()
    })

    // click outside
    const onClickOutside = () => {
      if (!props.persistent)
        onClose()

      else
        animateClick()
    }

    useCloseOnBack({
      active: scopedModelValue,
      closeOnBack: props.closeOnBack && !props.disableUseCloseOnBack,
      dialogHash: `dialog-${instance.uid}`,
      onClose,
    })

    // activator slot
    const activatorAttrs = {
      onClick() {
        onOpen()
      },
    }

    return {
      overlayComponent,
      frameComponent,

      activatedOnce,
      zIndex,
      isActive,
      activatorAttrs,
      handleFrameKeydown,
      onClickOutside,
      onClose,
    }
  },
})
</script>

<template>
  <slot name="activator" v-bind="activatorAttrs" />

  <template v-if="activatedOnce">
    <Teleport :to="teleportTo" :disabled="local || disableTeleport">
      <GDialogOverlay
        v-if="!fullscreen"
        ref="overlayComponent"
        :active="isActive"
        :z-index="zIndex"
        :background="overlayBackground"
        :local="local"
        @click="onClickOutside"
      />
    </Teleport>

    <Teleport :to="teleportTo" :disabled="local || disableTeleport">
      <GDialogFrame
        ref="frameComponent"
        :is-active="isActive"
        :z-index="zIndex"
        :max-width="maxWidth"
        :width="width"
        :height="height"
        :aria-describedby="ariaDescribedby"
        :aria-label="ariaLabel"
        :aria-labelledby="ariaLabelledby"
        :scrollable="scrollable"
        :transition="transition"
        :depressed="depressed"
        :fullscreen="fullscreen"
        :background="background"
        :border-radius="borderRadius"
        :content-class="contentClass"
        :handle-keydown="handleFrameKeydown"
        :local="local"
      >
        <slot :on-close="onClose" />
      </GDialogFrame>
    </Teleport>
  </template>
</template>
