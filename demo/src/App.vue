<template>
  <div
    class="app"
    p="x-5 y-12"
    gradient="to-br from-purple-400 via-pink-500 to-red-500"
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

      <div p="y-3">
        <NestingDialogLayout />
      </div>

      <TheFooter m="t-4" />
    </div>
  </div>
  <GDialogRoot />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GDialogRoot } from 'plugin'

import TheHeader from '@/components/Interface/TheHeader.vue'
import TheFooter from '@/components/Interface/TheFooter.vue'

import DialogLayout from '@/components/Layout/DialogLayout.vue'
import ProgrammaticalDialogLayout from '@/components/Layout/ProgrammaticalDialogLayout.vue'
import NestingDialogLayout from '@/components/Layout/NestingDialogLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    GDialogRoot,
    TheHeader,
    TheFooter,
    DialogLayout,
    ProgrammaticalDialogLayout,
    NestingDialogLayout,
  },
})
</script>

<style lang="scss">
:root {
  --g-dialog-content-bg: #f9fafb;
  --g-dialog-content-border-radius: 6px;
  --g-dialog-overlay-bg: rgba(33, 33, 33, 0.55);
}

.app {
  min-height: 120vh;
}
</style>
