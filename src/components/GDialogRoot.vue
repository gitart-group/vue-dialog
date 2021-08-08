<template>
  <Component
    :is="modal.component"
    v-for="(modal, index) in dialogs"
    :key="modal.id"
    v-bind="modal.props"
    @update:modelValue="onClose(index)"
  />
</template>

<script lang="ts">
import { inject } from 'vue'

import { DialogMethodsKey, DialogDialogListKey } from '../index'

export default {
  name: 'GDialogRoot',

  setup() {
    const dialogs = inject(DialogDialogListKey, [])
    const $dialog = inject(DialogMethodsKey, null)

    if(!$dialog) {
      console.error('The plugin is not initialized')
    }

    function onClose(index: number) {
      if(!$dialog) {
        throw new Error('good')
      }

      $dialog.remove(index)
    }

    return {
      dialogs,
      onClose,
    }
  },
}
</script>
