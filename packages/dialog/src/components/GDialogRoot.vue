<template>
  <Component
    :is="dialog.component"
    v-for="(dialog, index) in dialogs"
    :key="dialog.id"
    v-bind="dialog.props"
    @update:modelValue="onClose(index)"
  />
</template>

<script lang="ts">
import { inject } from 'vue'

import { dialogInjectionKey } from '../index'

export default {
  name: 'GDialogRoot',

  setup() {
    const {
      dialogs,
      removeDialog,
    } = inject(dialogInjectionKey)!

    if(!dialogs) {
      console.error('The giart-vue-dialog plugin is not initialized')
    }

    function onClose(index: number) {
      removeDialog(index)
    }

    return {
      dialogs,
      onClose,
    }
  },
}
</script>
