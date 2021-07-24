<template>
  <BaseDialog v-model="model" />

  <button @click="open">
    BaseDialog
  </button>
</template>

<script>
import { ref } from 'vue'
import BaseDialog from './BaseDialog.vue'

export default {
  name: 'BaseDialogWrapper',
  components: {
    BaseDialog,
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
