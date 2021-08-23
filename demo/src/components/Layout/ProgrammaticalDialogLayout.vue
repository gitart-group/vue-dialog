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
import { dialogInjectionKey } from 'plugin'

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
    const {
      addDialog,
    } = inject(dialogInjectionKey)!

    const onOpenProfilePhotoDialog = () => {
      addDialog({
        component: ProfilePhotoDialog,
      })
    }

    const onOpenScrollDialog = () => {
      addDialog({
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
