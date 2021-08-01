<template>
  <Transition name="fade">
    <template v-if="active">
      <div
        :class="classes"
        :style="styles"
        @click="onClick"
      />
    </template>
  </Transition>
</template>

<script lang="ts">
import {
  computed, defineComponent,
} from 'vue'

export default defineComponent({
  name: 'GDialogOverlay',
  props: {
    active: {
      type: Boolean,
      required: true,
    },

    deactivating: {
      type: Boolean,
      required: true,
    },

    activeZIndex: {
      type: Number,
      required: true,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    const styles = computed(() => ({
      zIndex: props.activeZIndex - 1,
    }))
    const classes = computed(() => [
      'g-dialog-overlay',
      {
        'g-dialog-overlay--active': props.active && !props.deactivating,
      },
    ])

    const onClick = () => {
      emit('click')
    }

    return {
      styles,
      classes,
      onClick,
    }
  },
})
</script>

<style lang="scss">
.g-dialog-overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  opacity: 0.46;
  background-color: rgb(33, 33, 33);
  z-index: 200;

  &--active {
    pointer-events: auto;
  }
}

.fade {
  &-enter-active {
    transition: all 0.3s ease-out;
  }

  &-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
