<template>
  <div
    border="t-1 gray-200"
    flex="~"
    p="x-2 t-2"
    text="xs gray-400"
  >
    <span>
      {{ name }}@{{ version }}
    </span>

    <span m="l-auto">
      {{ author.name }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { version, author, name } from 'gitart-vue-dialog/package.json'

export default defineComponent({
  name: 'TheFooter',
  setup() {
    return {
      version,
      author,
      name,
    }
  },
})
</script>
