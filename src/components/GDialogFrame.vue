<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import GDialogContent from './GDialogContent.vue'

export default defineComponent({
  name: 'GDialogFrame',
  components: {
    GDialogContent,
  },
  inheritAttrs: false,
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },

    zIndex: {
      type: Number,
      required: true,
    },

    background: {
      type: [Boolean, String],
      required: true,
    },

    borderRadius: {
      type: [Boolean, Number, String],
      required: true,
    },

    contentClass: {
      type: String,
      required: true,
    },

    depressed: {
      type: Boolean,
      required: true,
    },

    fullscreen: {
      type: Boolean,
      required: true,
    },

    height: {
      type: [String, Number],
      required: true,
    },

    local: {
      type: Boolean,
      required: true,
    },

    maxWidth: {
      type: [String, Number],
      required: true,
    },

    scrollable: {
      type: Boolean,
      required: true,
    },

    transition: {
      type: String,
      required: true,
    },

    width: {
      type: [String, Number],
      required: true,
    },
  },

  setup(props) {
    const frameElement = ref<Element>()

    // Add a quick "bounce" animation to the content
    const animateClick = () => {
      frameElement.value?.animate?.([
        { transformOrigin: 'center' },
        { transform: 'scale(1.03)' },
        { transformOrigin: 'center' },
      ], {
        duration: 150,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      })
    }

    const classes = computed(() => [
      'g-dialog-frame',
      {
        'g-dialog-frame--active': props.isActive,
        'g-dialog-frame--local': props.local,
      },
    ])

    const styles = computed(() => ({
      zIndex: props.zIndex,
    }))

    return {
      frameElement,

      classes,
      styles,
      animateClick,
    }
  },
})
</script>

<template>
  <Transition :name="transition">
    <div
      v-show="isActive"
      ref="frameElement"
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
</template>

<style lang="scss">
.g-dialog-frame {
  --frame-transition-duration: var(--g-dialog-transition-duration, 0.2s);

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
    transition-duration: var(--frame-transition-duration);
  }

  &-enter-from,
  &-leave-to {
    transform: scale(0.5);
    opacity: 0;
  }
}
</style>
