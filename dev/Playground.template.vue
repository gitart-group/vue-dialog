<template>
  <GDialog
    v-slot="{ onClose }"
    v-model="dialog"
    close-on-back
  >
    <div>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>

      <button
        class="btn"
        @click="dialog2 = true"
      >
        Open 2
      </button>

      <button
        class="btn"
        @click="onClose"
      >
        Close
      </button>
    </div>
  </GDialog>

  <button
    class="btn"
    @click="dialog = true"
  >
    Open
  </button>

  <GDialog
    v-model="dialog2"
    max-width="300"
  >
    Content 2
  </GDialog>

  <GDialog
    max-width="300"
  >
    Scoped...

    <template #activator="{onClick}">
      <div @click="onClick">
        ni...
      </div>
    </template>
  </GDialog>

  <button
    class="btn"
    @click="dialog2 = true"
  >
    Open 2
  </button>
  <button
    class="btn"
    @click="onOpenByPlugin"
  >
    Open 3
  </button>
</template>

<script setup lang="ts">
import { useGDialog } from 'gitart-vue-dialog'

import Dialog1Vue from './components/Dialog1.vue'

const dialog = ref(false)
const dialog2 = ref(false)

const $dialog = useGDialog()

const onOpenByPlugin = () => {
  const id = $dialog.addDialog({
    component: Dialog1Vue,
  }, {
    onClose: ({ id, cancel }) => {
      console.warn('close...', id)
      // cancel()
    },
  })

  // setTimeout(() => {
  //   $dialog.removeDialog(id)
  //   console.warn('remove...', id)
  // }, 3000)
}
</script>
