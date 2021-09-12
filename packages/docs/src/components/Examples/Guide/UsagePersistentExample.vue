<template>
  <GDialog
    v-model="value"
    max-width="300"
    persistent
  >
    <p>
      Try to click outside
    </p>

    <UiButton @click="value = false">
      Close
    </UiButton>
  </GDialog>

  <ButtonWrapper>
    <UiButton @click="value = true">
      Open Dialog
    </UiButton>
  </ButtonWrapper>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(false)

    return {
      value,
    }
  },
}
</script>
