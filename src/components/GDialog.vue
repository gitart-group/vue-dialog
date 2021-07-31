<template>
  <template v-if="activatedOnce">
    <Teleport to="body">
      <GDialogOverlay
        :active="isActive"
        :deactivating="deactivating"
        :active-z-index="activeZIndex"
        @click="onClickOutside"
      />

      <Transition name="dialog-transition">
        <div
          v-show="isActive"
          ref="frame"
          :class="classes"
          :style="styles"
        >
          <GDialogContent
            :width="width"
            :max-width="maxWidth"
            :scrollable="scrollable"
            :depressed="depressed"
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
  defineComponent, computed, ref, watch,
} from 'vue'

import { useStackable } from '../composable/stackable'
import { useLazyActivation } from '../composable/lazyActivation'

import { disableScroll, enableScroll } from '../helper/scroll.helper'

import GDialogOverlay from './GDialogOverlay.vue'
import GDialogContent from './GDialogContent.vue'

export default defineComponent({
  name: 'GDialog',
  components: {
    GDialogOverlay,
    GDialogContent,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },

    /**
     * lock scrolling of the body after opening
     */
    lockScroll: {
      type: Boolean,
      default: true,
    },

    /**
     * make body indent after the scroll bar disappears
     */
    lockScrollPadding: {
      type: Boolean,
      default: true,
    },

    /**
     * clicking outside content will not close modal
     */
    persistent: {
      type: Boolean,
      default: false,
    },

    maxWidth: {
      type: [String, Number],
      default: 'none',
    },

    width: {
      type: [String, Number],
      default: 'auto',
    },

    scrollable: {
      type: Boolean,
      default: false,
    },

    /**
     * removes box-shadow for content
     */
    depressed: {
      type: Boolean,
      default: false,
    },

    /**
     * hide scrollbar after opening the dialog
     */
    hideScrollbar: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const onClickOutside = () => {
      if (!props.persistent) {
        emit('update:modelValue', false)
      }
    }

    const { activatedOnce, active: isActive, deactivating } = useLazyActivation(
      computed(() => props.modelValue),
    )

    const frame = ref(null)
    const { activeZIndex } = useStackable({
      activeElSelector: '.q-dialog-frame--active',
      stackMinZIndex: 200,
      isActive,
      content: frame,
    })

    const classes = computed(() => [
      'q-dialog-frame',
      {
        'q-dialog-frame--active': isActive.value,
      },
    ])

    const styles = computed(() => ({
      zIndex: activeZIndex.value,
    }))

    watch(isActive, (active) => {
      if(active) {
        disableScroll(props.hideScrollbar)
      } else {
        enableScroll()
      }
    })

    return {
      onClickOutside,
      activatedOnce,
      activeZIndex,
      isActive,
      deactivating,
      classes,
      styles,
      frame,
    }
  },
})
</script>

<style lang="scss">
.q-dialog-frame {
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
