<template>
  <div class="dialog-card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DialogCard',
}
</script>

<style lang="scss" scoped>
.dialog-card {
  background: rgb(248, 248, 248);
  border-radius: 4px;
  padding: 20px 30px;
}
</style>
