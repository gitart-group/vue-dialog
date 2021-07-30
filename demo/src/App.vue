<template>
  <div class="app p-3">
    <DialogLayout />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DialogLayout from './components/Layout/DialogLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    DialogLayout,
  },
})
</script>

<style lang="scss">
.app {
  height: 2000px;
}
</style>
