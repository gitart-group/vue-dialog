<template>
  <div
    class="flex"
    justify="between"
    items="center"
    p="y-3 x-5"
    :shadow="shadow ? 'lg' : ''"
  >
    <slot />

    <div
      class="flex transition"
      cursor="pointer"
      h="8"
      w="8"
      justify="center"
      items="center"
      text="red-500"
      border="rounded-full"
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

  props: {
    shadow: {
      type: Boolean,
      default: true,
    },
  },

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
