<template>
  <GDialog
    v-model="value"
    content-class="profile-dialog-wrapper"
    width="300"
    height="300"
  >
    <div class="profile-dialog">
      <img src="/assets/img/profile.jpg" alt="Profile">
    </div>
  </GDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVModel } from '@vueuse/core'
import { GDialog } from 'plugin'

export default defineComponent({
  name: 'ProfilePhotoDialog',
  components: {
    GDialog,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const value = useVModel(props, 'modelValue', emit)

    return {
      value,
    }
  },
})
</script>

<style lang="scss" scoped>
::v-global(.profile-dialog-wrapper) { /* stylelint-disable-line selector-pseudo-element-no-unknown */
  border-radius: 50%;
}

.profile-dialog {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 10px;
  background-color: #fff;
  // overflow: auto;

  img {
    max-height: 100%;
    max-width: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>