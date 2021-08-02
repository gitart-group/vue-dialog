<template>
  <GDialog
    v-model="value"
    :max-width="400"
    :depressed="depressed"
  >
    <h4 class="mb-3">
      Base component
    </h4>

    <BooleanSwitch
      v-model="depressed"
      label="depressed (without box-shadow)"
    />
  </GDialog>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useVModel } from '@vueuse/core'

import { GDialog } from 'plugin'

import BooleanSwitch from '@/components/PropControls/BooleanSwitch/BooleanSwitch.vue'

export default defineComponent({
  name: 'BaseDialog',
  components: {
    GDialog,
    BooleanSwitch,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const depressed = ref(false)
    const value = useVModel(props, 'modelValue', emit)

    return {
      depressed,
      value,
    }
  },
})
</script>
