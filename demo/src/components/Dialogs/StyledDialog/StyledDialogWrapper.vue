<template>
  <div>
    <StyledDialog v-model="model" />

    <Btn @click="open">
      StyledDialog
    </Btn>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

import Btn from '@/components/UI/Btn/Btn.vue'
import StyledDialog from './StyledDialog.vue'

export default {
  name: 'StyledDialogWrapper',
  components: {
    Btn,
    StyledDialog,
  },

  setup() {
    const model = ref(false)

    const open = () => {
      model.value = true
    }

    return {
      model,
      open,
    }
  },
}
</script>
