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
import { defineComponent, inject } from 'vue'

import { dialogInjectionKey, dialogInjectionFallback, errorLogger } from '../plugin'

export default defineComponent({
  name: 'GDialogRoot',

  setup() {
    const {
      dialogs,
      removeDialog,
    } = inject(dialogInjectionKey, dialogInjectionFallback)

    // inject returned default value, so plugin is not installed
    if(dialogs === dialogInjectionFallback.dialogs) {
      errorLogger.pluginIsNotInitialized()
    }

    function onClose(index: number) {
      removeDialog(index)
    }

    return {
      dialogs,
      onClose,
    }
  },
})
</script>
