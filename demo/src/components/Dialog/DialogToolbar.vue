<template>
  <div
    class="flex justify-between items-center"
    p="y-3 x-5"
    shadow="lg"
  >
    <slot />

    <div
      class="w-8 h-8 flex items-center justify-center cursor-pointer"
      text="red-500"
      bg="gray-200 hover:gray-300"
      p="a-2"

      @click="onClose"
    >
      X
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DialogToolbar',

  emits: ['close'],

  setup(_, { emit }) {
    const onClose = () => {
      emit('close')
    }

    return {
      onClose,
    }

  },
})
</script>
