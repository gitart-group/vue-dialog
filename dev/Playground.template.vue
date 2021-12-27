<template>
  <GDialog
    v-model="dialog"
    max-width="300"
  >
    Content
  </GDialog>

  <button
    class="btn"
    @click="dialog = true"
  >
    Open
  </button>
</template>

<script setup lang="ts">
const dialog = ref(false)
</script>
