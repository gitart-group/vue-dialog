<template>
  <div
    grid="inline gap-3 auto-cols-auto flow-col"
  >
    <DialogStateWrapper
      v-slot="{model, input}"
      label="Base"
    >
      <BaseDialog :model-value="model" @update:model-value="input" />
    </DialogStateWrapper>

    <DialogStateWrapper
      v-slot="{model, input}"
      label="Styled"
    >
      <StyledDialog :model-value="model" @update:model-value="input" />
    </DialogStateWrapper>

    <DialogStateWrapper
      v-slot="{model, input}"
      label="Scroll"
    >
      <ScrollDialog :model-value="model" @update:model-value="input" />
    </DialogStateWrapper>
  </div>
</template>

<script lang="ts">
import DialogStateWrapper from '@/components/Dialog/DialogStateWrapper.vue'
import BaseDialog from '@/components/Dialogs/BaseDialog/BaseDialog.vue'
import StyledDialog from '@/components/Dialogs/StyledDialog/StyledDialog.vue'
import ScrollDialog from '@/components/Dialogs/ScrollDialog/ScrollDialog.vue'

export default {
  name: 'DialogLayout',
  components: {
    DialogStateWrapper,
    BaseDialog,
    StyledDialog,
    ScrollDialog,
  },

  setup() {},
}
</script>
