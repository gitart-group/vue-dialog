<template>
  <div>
    <BaseDialogWrapper />
  </div>

  <div>
    <StyledDialogWrapper />
  </div>
</template>

<script>
import BaseDialogWrapper from '@/components/Dialogs/BaseDialog/BaseDialogWrapper.vue'
import StyledDialogWrapper from '@/components/Dialogs/StyledDialog/StyledDialogWrapper.vue'

export default {
  name: 'DialogLayout',
  components: {
    BaseDialogWrapper,
    StyledDialogWrapper,
  },

  setup() {
  },
}
</script>
