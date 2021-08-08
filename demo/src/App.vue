<template>
  <div
    class="app"
    p="x-5 y-12"
    gradient="to-r from-purple-400 via-pink-500 to-red-500"
  >
    <div
      class="container"
      bg="white"
      p="t-8 b-4 x-6"
      m="x-auto"
      border="rounded"
    >
      <TheHeader m="b-4" />

      <div p="y-3">
        <DialogLayout />
      </div>

      <div p="y-3">
        <ProgrammaticalDialogLayout />
      </div>

      <TheFooter m="t-4" />
    </div>
  </div>
  <GDialogRoot />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GDialogRoot } from 'plugin'

import TheHeader from '@/components/Layout/TheHeader.vue'
import TheFooter from '@/components/Layout/TheFooter.vue'

import DialogLayout from '@/components/Layout/DialogLayout.vue'
import ProgrammaticalDialogLayout from '@/components/Layout/ProgrammaticalDialogLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    GDialogRoot,
    TheHeader,
    TheFooter,
    DialogLayout,
    ProgrammaticalDialogLayout,
  },
})
</script>

<style lang="scss">
.app {
  min-height: 100vh;
}
</style>
