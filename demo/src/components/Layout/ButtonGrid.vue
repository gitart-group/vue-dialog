<template>
  <div class="button-grid">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ButtonGrid',
}
</script>

<style lang="scss" scoped>
  .button-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6em;
  }
</style>