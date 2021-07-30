<template>
  <button
    bg="green-600 hover:green-500 focus:green-500"
    text="sm white"
    font="mono light"
    p="y-2 x-4"
    border="3 rounded green-600 hover:green-500 focus:green-600"
    outline="none"
    class="focus:outline-none"

    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Btn',
})
</script>
