<template>
  <div>
    <h3 m="b-3">
      Dialogs using #activator slot
    </h3>

    <GDialog
      v-model="dialog"
      max-width="400"
    >
      <template #activator="attrs">
        <Btn v-bind="attrs" m="r-2">
          Activator
        </Btn>
      </template>

      <DialogToolbar @close="dialog = false" />

      <div p="x-5 y-4">
        <h3 m="b-4">
          Activator
        </h3>
      </div>
    </GDialog>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { GDialog } from 'gitart-vue-dialog'

import DialogToolbar from '@/components/Dialog/DialogToolbar.vue'

import Btn from '@/components/UI/Btn/Btn.vue'

export default defineComponent({
  name: 'DialogLayout',
  components: {
    GDialog,
    DialogToolbar,
    Btn,
  },

  setup() {
    const dialog = ref(false)

    return {
      dialog,
    }
  },
})
</script>
