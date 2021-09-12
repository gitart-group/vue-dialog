<template>
  <ButtonGrid>
    <DialogStateWrapper
      v-slot="{model, input}"
      label="Base"
    >
      <BaseDialog
        :model-value="model"
        lorem
        @update:model-value="input"
      />
    </DialogStateWrapper>

    <DialogStateWrapper
      v-slot="{model, input}"
      label="Styled"
    >
      <StyledDialog
        :model-value="model"
        @update:model-value="input"
      />
    </DialogStateWrapper>

    <DialogStateWrapper
      v-slot="{model, input}"
      label="Scroll"
    >
      <ScrollDialog
        :model-value="model"
        @update:model-value="input"
      />
    </DialogStateWrapper>

    <DialogStateWrapper
      v-slot="{model, input}"
      label="Fullscreen"
    >
      <FullscreenDialog
        :model-value="model"
        @update:model-value="input"
      />
    </DialogStateWrapper>
  </ButtonGrid>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'

import DialogStateWrapper from '@/components/Dialog/DialogStateWrapper.vue'
import ButtonGrid from '@/components/Layout/ButtonGrid.vue'

const BaseDialog = defineAsyncComponent(() => import('@/components/Dialogs/BaseDialog/BaseDialog.vue'))
const StyledDialog = defineAsyncComponent(() => import('@/components/Dialogs/StyledDialog/StyledDialog.vue'))
const ScrollDialog = defineAsyncComponent(() => import('@/components/Dialogs/ScrollDialog/ScrollDialog.vue'))
const FullscreenDialog = defineAsyncComponent(() => import('@/components/Dialogs/FullscreenDialog/FullscreenDialog.vue'))

export default defineComponent({
  name: 'DialogLayout',
  components: {
    DialogStateWrapper,
    ButtonGrid,
    BaseDialog,
    StyledDialog,
    ScrollDialog,
    FullscreenDialog,
  },
})
</script>
