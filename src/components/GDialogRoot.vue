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
