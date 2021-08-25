<template>
  <div class="example-component">
    <VueFile :file="file" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueFile from '@/components/Components/VueFile.vue'

export default defineComponent({
  name: 'ExampleComponent',
  components: {
    VueFile,
  },

  props: {
    file: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss">
  .example-component {
    padding: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }
</style>
