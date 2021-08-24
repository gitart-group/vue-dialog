<template>
  <GDialog v-model="value">
    Content
  </GDialog>

  <BtnWrapper>
    <BaseBtn @click="onOpen">
      Open Dialog
    </BaseBtn>
  </BtnWrapper>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'BaseDialog',

  setup() {
    const dialogState = ref(false)

    const value = computed({
      get() {
        return dialogState.value
      },
      set(val) {
        dialogState.value = val
      },
    })

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
