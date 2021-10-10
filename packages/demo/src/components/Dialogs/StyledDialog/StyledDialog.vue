<template>
  <GDialog
    v-model="value"
    transition="custom-rotate-transition"
    overlay-background="rgba(143, 108, 249, 0.4)"
    :max-width="400"
  >
    <DialogToolbar @close="onClose">
      <h4>
        Styled Dialog
      </h4>
    </DialogToolbar>

    <div p="x-5 y-4">
      <p>
        Some content
      </p>
    </div>
  </GDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVModel } from '@vueuse/core'
import { GDialog } from 'gitart-vue-dialog'

import DialogToolbar from '@/components/Dialog/DialogToolbar.vue'

export default defineComponent({
  name: 'StyledDialog',
  components: {
    GDialog,
    DialogToolbar,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    'update:modelValue': (val: boolean) => true,
  },

  setup(props, { emit }) {
    const value = useVModel(props, 'modelValue', emit)

    const onClose = () => {
      value.value = false
    }

    return {
      value,
      onClose,
    }
  },
})
</script>

<style lang="scss" >
.custom-rotate-transition {
  &-enter-active,
  &-leave-active {
    transition-timing-function: linear;
  }

  &-enter-from {
    transform: translate(0, 30px) rotate(12deg);
    opacity: 0;
  }

  &-leave-to {
    transform: translate(0, 30px) rotate(4deg);
    opacity: 0;
  }
}
</style>