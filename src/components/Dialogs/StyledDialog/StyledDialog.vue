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

<script>
import { GDialog } from '@/gitart-vue-dialog'

import { useModelWrapper } from '@/composables/modelWrapper'

import DialogCard from '@/components/Dialog/DialogCard.vue'

export default {
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
}
</script>
