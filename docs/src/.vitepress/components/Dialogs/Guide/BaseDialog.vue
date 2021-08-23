<template>
  <GDialog v-model="dialogState">
    Content
  </GDialog>

  <BtnWrapper>
    <BaseBtn @click="onOpen">
      Open Dialog
    </BaseBtn>
  </BtnWrapper>
</template>

<script>
import { GDialog } from 'gitart-vue-dialog'
import 'gitart-vue-dialog/dist/style.css'

export default {
  name: 'BaseDialog',
  components: {
    GDialog,
  },

  data: () => ({
    dialogState: false,
  }),

  methods: {
    onOpen() {
      this.dialogState = true
    },
  },
}
</script>
