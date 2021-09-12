<template>
  <GDialog
    v-model="dialog"
    max-width="300"
  >
    Content
  </GDialog>

  <button @click="dialog = true">
    Open
  </button>
</template>

<script lang="ts">
import { ref } from 'vue'
import { GDialog } from 'gitart-vue-dialog'

export default {
  name: 'Playground',
  components: {
    GDialog,
  },

  setup() {
    const dialog = ref(false)

    return {
      dialog,
    }
  },
}
</script>
