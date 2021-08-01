<template>
  <GDialog
    v-model="value"
    max-width="400"
    height="600"
    scrollable
  >
    <div
      flex="~ col"
      bg="gray-50"
      border="rounded"
    >
      <DialogToolbar @close="onClose">
        <h4>
          Scroll Dialog
        </h4>
      </DialogToolbar>

      <div
        p="x-5 y-4"
        overflow="auto"
      >
        <p v-for="item in 8" :key="item">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam quisquam iste assumenda
          voluptates optio dolorum facere, corrupti adipisci ex possimus,
          quis sunt. Quis dolorum voluptatibus ab quasi, nemo rem? Culpa!
        </p>
      </div>
    </div>
  </GDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GDialog } from 'plugin'

import { useModelWrapper } from '@/composables/modelWrapper'

import DialogToolbar from '@/components/Dialog/DialogToolbar.vue'

export default defineComponent({
  name: 'BaseDialog',
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

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const value = useModelWrapper(props, emit)

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
