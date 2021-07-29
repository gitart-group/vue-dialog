<template>
  <GDialog
    v-model="value"
    :max-width="400"
  >
    <DialogCard>
      <p>
        StyledDialogWrapper
      </p>
    </DialogCard>
  </GDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GDialog } from 'plugin/index.js'

import { useModelWrapper } from '@/composables/modelWrapper'

import DialogCard from '@/components/Dialog/DialogCard.vue'

export default defineComponent({
  name: 'BaseDialog',
  components: {
    GDialog,
    DialogCard,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const value = useModelWrapper(props, emit)

    return {
      value,
    }
  },
})
</script>
