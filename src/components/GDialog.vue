<template>
  <template v-if="activatedOnce">
    <Teleport to="body">
      <GDialogOverlay
        ref="overlay"
        :active="isActive"
        :deactivating="deactivating"
        :active-z-index="activeZIndex"
        @click="onClickOutside"
      />

      <Transition name="dialog-transition">
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
            <slot />
          </GDialogContent>
        </div>
      </Transition>
    </Teleport>
  </template>
</template>

<script lang="ts">
import {
  defineComponent, computed, ref, watch, onBeforeUnmount,
} from 'vue'

import { useStackable } from '../composable/stackable'
import { useLazyActivation } from '../composable/lazyActivation'
import { useScroll } from '../composable/scroll'

import GDialogOverlay from './GDialogOverlay.vue'
import GDialogContent from './GDialogContent.vue'

export default defineComponent({
  name: 'GDialog',
  components: {
    GDialogOverlay,
    GDialogContent,
  },

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

    maxWidth: {
      type: [String, Number],
      default: 'none',
    },

    modelValue: {
      type: Boolean,
      default: false,
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

    width: {
      type: [String, Number],
      default: 'auto',
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const contentFrame = ref<Element>()
    const overlay = ref<InstanceType<typeof GDialogOverlay>>()

    const overlayElement = computed<Element | undefined>(() => overlay.value?.$el as Element)

    const onClickOutside = () => {
      if (!props.persistent) {
        emit('update:modelValue', false)
      }
    }

    const { activatedOnce, active: isActive, deactivating } = useLazyActivation(
      computed(() => props.modelValue),
    )

    const { activeZIndex } = useStackable({
      activeElSelector: '.g-dialog-frame--active',
      stackMinZIndex: 200,
      isActive,
      content: contentFrame,
    })

    const classes = computed(() => [
      'g-dialog-frame',
      {
        'g-dialog-frame--active': isActive.value,
        'g-dialog-frame--fullscreen': props.fullscreen,
      },
    ])

    const styles = computed(() => ({
      zIndex: activeZIndex.value,
    }))

    const { enableScroll, disableScroll } = useScroll({
      overlay: overlayElement,
      content: contentFrame,
      contentActiveClass: 'g-dialog-frame--active',
      fullscreen: props.fullscreen,
      contentFullscreenClass: 'g-dialog-frame--fullscreen',
    })

    watch(isActive, (active) => {
      if(active) {
        disableScroll()
      } else {
        enableScroll()
      }
    })

    onBeforeUnmount(() => {
      enableScroll()
    })

    return {
      onClickOutside,
      activatedOnce,
      activeZIndex,
      isActive,
      deactivating,
      classes,
      styles,
      contentFrame,
      overlay,
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
  transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
  width: 100%;
  outline: none;
  pointer-events: none;
  z-index: 201;
}

.dialog-transition {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  opacity: 0;

  &-enter-from,
  &-leave-to {
    transform: scale(0.5);
    opacity: 0;
  }
}
</style>
