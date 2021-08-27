<template>
  <GDialog
    v-model="value"
    border-radius="50%"
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
.profile-dialog {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  img {
    max-height: 100%;
    max-width: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>