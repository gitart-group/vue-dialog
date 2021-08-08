<template>
  <ButtonGrid>
    <Btn @click="onOpenProfilePhotoDialog">
      Profile Photo (Programmatical, Async)
    </Btn>

    <Btn @click="onOpenScrollDialog">
      Scroll Dialog (Programmatical)
    </Btn>
  </ButtonGrid>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject } from 'vue'
import { DialogMethodsKey } from 'plugin'

import Btn from '@/components/UI/Btn/Btn.vue'
import ScrollDialog from '@/components/Dialogs/ScrollDialog/ScrollDialog.vue'

import ButtonGrid from '@/components/Layout/ButtonGrid.vue'

const ProfilePhotoDialog = defineAsyncComponent(() => import('@/components/Dialogs/ProfilePhotoDialog/ProfilePhotoDialog.vue'))

export default defineComponent({
  name: 'ProgrammaticalDialogLayout',
  components: {
    Btn,
    ButtonGrid,
  },

  setup() {
    const $dialog = inject(DialogMethodsKey)

    const onOpenProfilePhotoDialog = () => {
      $dialog?.add({
        component: ProfilePhotoDialog,
      })
    }

    const onOpenScrollDialog = () => {
      $dialog?.add({
        component: ScrollDialog,
      })
    }

    return {
      onOpenProfilePhotoDialog,
      onOpenScrollDialog,
    }
  },
})
</script>
