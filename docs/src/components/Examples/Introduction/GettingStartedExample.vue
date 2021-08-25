<template>
  <GDialog v-model="value">
    Content
  </GDialog>

  <ButtonWrapper>
    <UiButton @click="onOpen">
      Open Dialog
    </UiButton>
  </ButtonWrapper>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'GettingStartedExample',

  setup() {
    const value = ref(false)
    const onOpen = () => {
      value.value = true
    }

    return {
      value,
      onOpen,
    }
  },
}
</script>
