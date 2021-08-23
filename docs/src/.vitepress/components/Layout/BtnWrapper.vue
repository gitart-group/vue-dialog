<template>
  <div class="btn-wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BtnWrapper',
}
</script>

<style lang="scss" scoped>
.btn-wrapper {
  padding: 30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  background: #8f6cf92f;
}
</style>
