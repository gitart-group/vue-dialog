<template>
  <div :class="classes" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useSizeStyle } from '../composables/sizeStyle'
import { convertToUnit } from '../util'

export default defineComponent({
  name: 'GDialogContent',
  props: {
    background: {
      type: [Boolean, String],
      required: true,
    },

    borderRadius: {
      type: [Boolean, Number, String],
      required: true,
    },

    class: {
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
      required: true,
    },

    maxWidth: {
      type: [String, Number],
      default: 'none',
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

  setup(props) {
    const { sizeStyles: styles } = useSizeStyle(props)
    const classes = computed(() => [
      'g-dialog-content',
      props.class,
      {
        'g-dialog-content--scrollable': props.scrollable,
        'g-dialog-content--depressed': props.depressed,
        'g-dialog-content--fullscreen': props.fullscreen,
      },
    ])

    const computedBackground = computed(() => {
      if (typeof props.background === 'string')
        return props.background

      else if (props.background)
        return 'var(--content-bg)'

      return 'transparent'
    })

    const computedBorderRadius = computed(() => {
      if (typeof props.borderRadius === 'string')
        return convertToUnit(props.borderRadius)

      else if (props.borderRadius)
        return 'var(--content-border-radius)'

      return '0'
    })

    return {
      styles,
      classes,
      computedBackground,
      computedBorderRadius,
    }
  },
})
</script>

<style lang="scss">
.g-dialog-content {
  $dialog: &;

  --content-bg: var(--g-dialog-content-bg, #fff);
  --content-border-radius: var(--g-dialog-content-border-radius, 4px);
  --content-shadow:
    var(
      --g-dialog-content-shadow,
      0 11px 15px -7px rgb(0 0 0 / 20%),
      0 24px 38px 3px rgb(0 0 0 / 14%),
      0 9px 46px 8px rgb(0 0 0 / 12%)
    );

  pointer-events: auto;
  overflow-y: auto;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  background: v-bind('computedBackground');
  border-radius: v-bind('computedBorderRadius');

  &:not(#{$dialog}--depressed):not(#{$dialog}--fullscreen) {
    box-shadow: var(--content-shadow)
  }

  &:not(#{$dialog}--fullscreen) {
    max-height: 90%;
    margin: 24px;
  }

  &--scrollable {
    display: flex;
  }

  &--fullscreen {
    height: 100%;
    border-radius: 0;
  }
}
</style>
