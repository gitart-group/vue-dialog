<template>
  <Component
    :is="dialog.component"
    v-for="(dialog) in dialogs"
    :key="dialog.id"
    v-bind="dialog.props"
    @update:model-value="onClose(dialog.id)"
  />
</template>

<script lang="ts">
import type { IDialogItemId } from 'src/types/Plugin'
import { defineComponent, inject } from 'vue'

import { dialogInjectionFallback, dialogInjectionKey, errorLogger } from '../plugin'

export default defineComponent({
  name: 'GDialogRoot',

  setup() {
    const {
      dialogs,
      removeDialog,
    } = inject(dialogInjectionKey, dialogInjectionFallback)

    // inject returned default value, so plugin is not installed
    if (dialogs === dialogInjectionFallback.dialogs)
      errorLogger.pluginIsNotInitialized()

    function onClose(id: IDialogItemId) {
      removeDialog(id)
    }

    return {
      dialogs,
      onClose,
    }
  },
})
</script>
