<template>
  <GDialog v-model="dialogState" max-width="500">
    <div class="content">
      Content
    </div>
  </GDialog>

  <BtnWrapper>
    <BaseBtn @click="onOpen">
      Open A More Prettier Dialog
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

<style lang="scss" scoped>
.content {
  padding: 30px;
  background: #fff;
}
</style>
