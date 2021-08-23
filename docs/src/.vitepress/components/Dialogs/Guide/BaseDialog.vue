<template>
  <!-- <GDialog v-model="dialogState">
    Content
  </GDialog> -->

  <BtnWrapper>
    <BaseBtn @click="onOpen">
      Open Dialog
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
