<template>
  <StyledDialog v-model="model" />

  <button @click="open">
    StyledDialog
  </button>
</template>

<script lang="ts">
import { ref } from 'vue'
import StyledDialog from './StyledDialog.vue'

export default {
  name: 'StyledDialogWrapper',
  components: {
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
