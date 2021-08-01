<template>
  <div
    class="app"
    p="x-5 y-12"
    gradient="to-r from-purple-400 via-pink-500 to-red-500"
  >
    <div
      class="container"
      bg="white"
      p="y-8 x-6"
      m="x-auto"
      border="rounded"
    >
      <div
        class="flex items-end"
        m="b-8"
      >
        <h1
          m="r-4"
        >
          Vue Dialog
        </h1>

        <a
          m="r-2"
          href="https://www.npmjs.com/package/gitart-vue-dialog"
          target="_blank"
        >
          npm
        </a>

        <a href="https://github.com/MichaelGitArt/gitart-vue-dialog" target="_blank">
          github
        </a>
      </div>

      <DialogLayout />
    </div>
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
  min-height: 100vh;
}
</style>
