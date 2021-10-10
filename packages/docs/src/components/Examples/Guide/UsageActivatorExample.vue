<template>
  <ButtonWrapper>
    <GDialog
      v-model="value"
      max-width="500"
    >
      <template #activator="attrs">
        <UiButton v-bind="attrs">
          Open Dialog
        </UiButton>
      </template>

      <div class="usage-slot-dialog">
        <p>
          Using slot
        </p>

        <UiButton @click="value = false">
          Close
        </UiButton>
      </div>
    </GDialog>
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
.usage-slot-dialog {
  padding: 0 30px 20px;
}
</style>
