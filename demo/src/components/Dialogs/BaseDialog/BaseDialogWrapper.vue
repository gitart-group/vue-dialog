<template>
  <div>
    <BaseDialog v-model="model" />
    <Btn @click="open">
      BaseDialog
    </Btn>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import Btn from '@/components/UI/Btn/Btn.vue'

import BaseDialog from './BaseDialog.vue'

export default {
  name: 'BaseDialogWrapper',
  components: {
    BaseDialog,
    Btn,
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
