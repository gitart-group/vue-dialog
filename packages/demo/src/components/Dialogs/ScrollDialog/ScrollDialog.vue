<template>
  <GDialog
    v-model="value"
    max-width="400"
    height="600px"
    scrollable
  >
    <div flex="~ col">
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
import { useVModel } from '@vueuse/core'
import { GDialog } from 'gitart-vue-dialog'

import DialogToolbar from '@/components/Dialog/DialogToolbar.vue'

export default defineComponent({
  name: 'ScrollDialog',
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
