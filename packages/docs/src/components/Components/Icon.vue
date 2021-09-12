<template>
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    :height="size"
    :width="size"
  >
    <path :d="iconPath" />
  </svg>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    iconPath: {
      type: String,
      required: true,
    },

    size: {
      type: [String, Number],
      default: 24,
    },
  },
})
</script>
