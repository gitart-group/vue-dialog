<template>
  <div class="btn-wrapper">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BtnWrapper',
})
</script>

<style lang="scss" scoped>
.btn-wrapper {
  padding: 30px;
  border-radius: 4px;
  // background: rgb(221, 221, 221);
  display: flex;
  justify-content: center;
  background: #8f6cf92f;
}
</style>
