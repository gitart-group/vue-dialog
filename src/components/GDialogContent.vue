<template>
  <div :class="classes" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useSizeStyle } from '../composable/sizeStyle'

export default defineComponent({
  name: 'GDialogContent',
  props: {
    maxWidth: {
      type: [String, Number],
      default: 'none',
    },

    width: {
      type: [String, Number],
      default: 'auto',
    },

    height: {
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

    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { sizeStyles: styles } = useSizeStyle(props)
    const classes = computed(() => [
      'g-dialog-content',
      props.class,
      {
        'g-dialog-content--scrollable': props.scrollable,
        'g-dialog-content--depressed': props.depressed,
      },
    ])

    return {
      styles,
      classes,
    }
  },
})
</script>

<style lang="scss">
.g-dialog-content {
  $dialog: &;

  pointer-events: auto;
  border-radius: 4px;
  margin: 24px;
  overflow-y: auto;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  z-index: inherit;

  &:not(#{$dialog}--depressed) {
    box-shadow:
      0 11px 15px -7px rgb(0 0 0 / 20%),
      0 24px 38px 3px rgb(0 0 0 / 14%),
      0 9px 46px 8px rgb(0 0 0 / 12%);
  }

  &:not(#{$dialog}--fullscreen) {
    max-height: 90%;
  }

  &--scrollable {
    display: flex;
  }
}
</style>