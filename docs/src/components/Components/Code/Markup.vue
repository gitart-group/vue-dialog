<template>
  <div class="app-code">
    <Prism
      ref="code"
      :code="code"
      :language="language"
    />
  </div>
</template>

<script lang="ts">
import Prism from './Prism.vue'

export default {
  name: 'Markup',

  components: {
    Prism,
  },

  props: {
    code: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.app-code {
  background-color: var(--code-bg-color);
  padding: 12px 50px 12px 16px;
}
</style>