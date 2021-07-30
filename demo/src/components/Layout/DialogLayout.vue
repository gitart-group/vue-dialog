<template>
  <div class="flex wrap">
    <BaseDialogWrapper class="mr-3" />
    <StyledDialogWrapper />
  </div>
</template>

<script lang="ts">
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
