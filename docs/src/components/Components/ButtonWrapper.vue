<template>
  <div class="btn-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'BtnWrapper',
}
</script>

<style lang="scss">
@import '@/.vitepress/theme/var';

.btn-wrapper {
  padding: 30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  background: rgba($primary, 0.2);
}
</style>
