<template>
  <GDialog
    v-model="value"
    :max-width="400"
  >
    <div
      bg="gray-50"
      border="rounded"
    >
      <DialogToolbar @close="onClose">
        <h4 class="text-lg font-medium">
          Styled Dialog
        </h4>
      </DialogToolbar>

      <div p="x-5 y-4">
        <p>
          StyledDialogWrapper
        </p>
      </div>
    </div>
  </GDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GDialog } from 'plugin/index.js'

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
