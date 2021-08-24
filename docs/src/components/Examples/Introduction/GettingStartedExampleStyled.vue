<template>
  <GDialog v-model="value" max-width="500">
    <div class="getting-started-example-styled">
      Content
    </div>
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
  name: 'GettingStartedExampleStyled',

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

<style lang="scss">
  .getting-started-example-styled {
    padding: 30px;
    background: #fff;
  }
</style>
