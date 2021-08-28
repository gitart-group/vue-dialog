<template>
  <GDialog
    v-model="value"
    fullscreen
    transition="custom-slide-up-transition"
  >
    <div
      min-h="full"
    >
      <DialogToolbar @close="onClose">
        <h4>
          Fullscreen Dialog
        </h4>
      </DialogToolbar>

      <div p="x-5 y-4">
        <BooleanSwitch
          v-model="longContent"
          label="Long Content"
        />

        <div
          v-if="longContent"
          bg="purple-500"
          font="semibold"
          h="screen"
          p="6"
          rounded="md"
          text="xl white"
        >
          Long Content
        </div>
      </div>
    </div>
  </GDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { GDialog } from 'plugin'

import DialogToolbar from '@/components/Dialog/DialogToolbar.vue'
import BooleanSwitch from '@/components/PropControls/BooleanSwitch/BooleanSwitch.vue'

export default defineComponent({
  name: 'FullscreenDialog',
  components: {
    GDialog,
    DialogToolbar,
    BooleanSwitch,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const value = useVModel(props, 'modelValue', emit)
    const onClose = () => {
      value.value = false
    }

    const longContent = ref(false)

    return {
      value,
      onClose,

      longContent,
    }
  },
})
</script>

<style lang="scss">
.custom-slide-up-transition {
  opacity: 0;

  &-enter-from {
    transform: translate(0, 40%);
    opacity: 0;
  }

  &-leave-to {
    opacity: 0;
  }
}
</style>