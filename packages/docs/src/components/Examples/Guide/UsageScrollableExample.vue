<template>
  <GDialog
    v-model="value"
    max-width="500"
    scrollable
  >
    <div class="usage-scrollable-dialog">
      <div class="usage-scrollable-dialog__content">
        <p v-for="i in 15" :key="i">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum voluptas laboriosam voluptate ex consequuntur corporis, commodi animi architecto quidem fugiat.
        </p>
      </div>

      <div class="usage-scrollable-dialog__actions">
        <UiButton @click="value = false">
          Close
        </UiButton>
      </div>
    </div>
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

<style lang="scss" scoped>
.usage-scrollable-dialog {
  display: flex;
  flex-direction: column;

  &__content {
    overflow: auto;
    padding: 20px;
  }

  &__actions {
    padding: 10px;
    box-shadow: 0 11px 15px -7px rgb(0 0 0 / 20%), 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%);
  }
}
</style>