<template>
  <slot name="activator" v-bind="activatorAttrs" />

  <template v-if="activatedOnce">
    <Teleport to="body" :disabled="local">
      <GDialogOverlay
        v-if="!fullscreen"
        ref="overlay"
        :active="isActive"
        :z-index="zIndex"
        :background="overlayBackground"
        :local="local"
        @click="onClickOutside"
      />
    </Teleport>

    <Teleport to="body" :disabled="local">
      <Transition :name="transition">
        <div
          v-show="isActive"
          ref="contentFrame"
          :class="classes"
          :style="styles"
        >
          <GDialogContent
            :class="contentClass"
            :max-width="maxWidth"
            :width="width"
            :height="height"
            :scrollable="scrollable"
            :depressed="depressed"
            :fullscreen="fullscreen"
            :background="background"
            :border-radius="borderRadius"
          >
            <slot :onClose="onClose" />
          </GDialogContent>
        </div>
      </Transition>
    </Teleport>
  </template>
</template>

<script lang="ts">
import {
  computed, defineComponent, onBeforeUnmount, ref, watch,
} from 'vue'

import { useEventListener } from '@vueuse/core'
import { useStack } from '../composables/stack'
import { useOverlay } from '../composables/overlay'
import { useLazyActivation } from '../composables/lazyActivation'
import { useScroll } from '../composables/scroll'

import GDialogOverlay from './GDialogOverlay.vue'
import GDialogContent from './GDialogContent.vue'

export default defineComponent({
  name: 'GDialog',
  components: {
    GDialogOverlay,
    GDialogContent,
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
    depressed: {
      type: Boolean,
      default: false,
    },

    fullscreen: {
      type: Boolean,
      default: false,
    },

    height: {
      type: [String, Number],
      default: 'auto',
    },

    /**
     * enables local mode for the dialog.
     * dialog is fixed to first "position: relative;" parent
     */
    local: {
      type: Boolean,
      default: false,
    },

    maxWidth: {
      type: [String, Number],
      default: 'none',
    },

    modelValue: {
      type: Boolean,
      default: false,
    },

    noClickAnimation: {
      type: Boolean,
      default: false,
    },

    overlayBackground: {
      type: [Boolean, String],
      default: true,
    },

    /**
     * clicking outside content will not close modal
     */
    persistent: {
      type: Boolean,
      default: false,
    },

    scrollable: {
      type: Boolean,
      default: false,
    },

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
    const contentFrame = ref<Element>()
    const overlay = ref<InstanceType<typeof GDialogOverlay>>()
    const overlayElement = computed<Element | undefined>(() => overlay.value?.$el as Element)

    const scopedModelValue = ref(props.modelValue)
    const { isTop } = useStack(scopedModelValue)

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

      contentFrame.value?.animate?.([
        { transformOrigin: 'center' },
        { transform: 'scale(1.03)' },
        { transformOrigin: 'center' },
      ], {
        duration: 150,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      })
    }

    useEventListener('keyup', (ev) => {
      if (ev.key === 'Escape' && isTop.value) {
        if (!props.persistent)
          onClose()

        else
          animateClick()
      }
    }, { passive: true })

    const classes = computed(() => [
      'g-dialog-frame',
      {
        'g-dialog-frame--active': isActive.value,
        'g-dialog-frame--fullscreen': props.fullscreen,
        'g-dialog-frame--local': props.local,
      },
    ])

    const styles = computed(() => ({
      zIndex: zIndex.value,
    }))

    // scroll
    const { enableScroll, disableScroll } = useScroll({
      overlay: overlayElement,
      content: contentFrame,
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
      activatedOnce,
      zIndex,
      isActive,
      classes,
      styles,
      contentFrame,
      overlay,
      activatorAttrs,
      onClickOutside,
      onClose,
    }
  },
})
</script>

<style lang="scss">
.g-dialog-frame {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  outline: none;
  pointer-events: none;
  z-index: 201;

  &--local {
    position: absolute;
  }
}

.g-dialog-transition {
  opacity: 0;

  &-enter-active,
  &-leave-active {
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 0.2s;
  }

  &-enter-from,
  &-leave-to {
    transform: scale(0.5);
    opacity: 0;
  }
}
</style>
