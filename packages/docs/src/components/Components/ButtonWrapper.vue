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
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
  background: rgba($primary, 0.2);
}
</style>
