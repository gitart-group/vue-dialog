<template>
  <GDialog v-model="value" max-width="500">
    <div class="getting-started-example-styled">
      <div class="getting-started-example-styled__content">
        <div class="getting-started-example-styled__title">
          Content
        </div>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ratione!</p>
      </div>

      <div class="getting-started-example-styled__actions">
        <UiButton>
          Submit
        </UiButton>
      </div>
    </div>
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
  name: 'GettingStartedExampleStyled',

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

<style lang="scss">
  .getting-started-example-styled {
    &__content {
      padding: 20px;
    }

    &__title {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    &__actions {
      display: flex;
      justify-content: flex-end;
      padding: 10px 20px;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
</style>
