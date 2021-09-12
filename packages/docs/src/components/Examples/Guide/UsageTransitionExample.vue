<template>
  <GDialog
    v-model="value"
    max-width="300"
    transition="custom-rotate-transition"
  >
    <UiButton @click="value = false">
      Close
    </UiButton>
  </GDialog>

  <GDialog
    v-model="value2"
    max-width="300"
    transition="custom-from-bottom-transition"
  >
    <UiButton @click="value2 = false">
      Close
    </UiButton>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at, nostrum hic est a nulla?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at, nostrum hic est a nulla?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at, nostrum hic est a nulla?
    </p>
  </GDialog>

  <ButtonWrapper>
    <UiButton @click="value = true">
      Rotate Transition
    </UiButton>

    <UiButton @click="value2 = true">
      From Bottom
    </UiButton>
  </ButtonWrapper>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(false)
    const value2 = ref(false)

    return {
      value,
      value2,
    }
  },
}
</script>

<style lang="scss">
.custom-rotate-transition {
  &-enter-from {
    transform: translate(0, 30px) rotate(20deg);
    opacity: 0;
  }

  &-leave-to {
    transform: translate(0, 30px) rotate(10deg);
    opacity: 0;
  }
}

.custom-from-bottom-transition {
  &-enter-from {
    transform: translate(0, 100%);
    opacity: 0;
  }

  &-leave-to {
    transform: translate(0, -30%);
    opacity: 0;
  }
}
</style>