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
export default {
  name: 'BaseDialog',
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
