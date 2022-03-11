<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, ref, watch } from 'vue'

import { IN_BROWSER } from '../util'
import { useStack } from '../composables/stack'
import { useOverlay } from '../composables/overlay'
import { useLazyActivation } from '../composables/lazyActivation'
import { useScroll } from '../composables/scroll'
import { useWindowEventListener } from '../composables/window'

import GDialogOverlay from './GDialogOverlay.vue'
import GDialogFrame from './GDialogFrame.vue'

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

    /**
     * enables local mode for the dialog.
     * dialog is fixed to first "position: relative;" parent
     */
    local: Boolean,

    maxWidth: {
      type: [String, Number],
      default: 'none',
    },

    modelValue: Boolean,

    noClickAnimation: Boolean,

    overlayBackground: {
      type: [Boolean, String],
      default: true,
    },

    /**
     * clicking outside content will not close modal
     */
    persistent: Boolean,

    scrollable: Boolean,

    transition: {
      type: String,
      default: 'g-dialog-transition',
    },

    width: {
      type: [String, Number],
      default: 'auto',
    },
  },

  emits: {
    'update:modelValue': (val: boolean) => true,
  },

  setup(props, { emit }) {
    const overlayComponent = ref<InstanceType<typeof GDialogOverlay> | null>(null)
    const frameComponent = ref<InstanceType<typeof GDialogFrame> | null>(null)

    const overlayElement = computed<Element | undefined>(() => overlayComponent.value?.$el as Element)
    const frameElement = computed<Element | undefined>(() => frameComponent.value?.$el as Element)

    const scopedModelValue = ref(false)
    const { isTop } = useStack(scopedModelValue)

    /**
     * if props.modelValue is true at app startup, set true for
     * scopedModelValue on nextTick (after nuxt hydration).
     *
     * teleport on server-side gives hydration mismatch.
     * scopedModelValue can only be true in the browser.
     */
    if (IN_BROWSER && props.modelValue) {
      nextTick(() => {
        scopedModelValue.value = true
      })
    }

    watch(() => props.modelValue, (val) => {
      scopedModelValue.value = val
    })

    const onClose = () => {
      scopedModelValue.value = false
      emit('update:modelValue', false)
    }

    const onOpen = () => {
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

    useWindowEventListener('keyup', (ev) => {
      if (ev.key === 'Escape' && isTop.value) {
        if (!props.persistent)
          onClose()

        else
          animateClick()
      }
    }, { passive: true })

    // scroll
    const { enableScroll, disableScroll } = useScroll({
      overlay: overlayElement,
      content: frameElement,
      contentActiveClass: 'g-dialog-frame--active',
      fullscreen: props.fullscreen,
      contentFullscreenClass: 'g-dialog-frame--fullscreen',
    })

    watch(isActive, (active) => {
      if (props.local)
        return

      if (active)
        disableScroll()

      else
        enableScroll()
    })

    onBeforeUnmount(() => {
      enableScroll()
    })

    // click outside
    const onClickOutside = () => {
      if (!props.persistent)
        onClose()

      else
        animateClick()
    }

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
      onClickOutside,
      onClose,
    }
  },
})
</script>

<template>
  <slot name="activator" v-bind="activatorAttrs" />

  <template v-if="activatedOnce">
    <Teleport to="body" :disabled="local">
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

    <Teleport to="body" :disabled="local">
      <GDialogFrame
        ref="frameComponent"
        :is-active="isActive"
        :z-index="zIndex"
        :max-width="maxWidth"
        :width="width"
        :height="height"
        :scrollable="scrollable"
        :transition="transition"
        :depressed="depressed"
        :fullscreen="fullscreen"
        :background="background"
        :border-radius="borderRadius"
        :content-class="contentClass"
        :local="local"
        :persistent="persistent"
      >
        <slot :onClose="onClose" />
      </GDialogFrame>
    </Teleport>
  </template>
</template>
