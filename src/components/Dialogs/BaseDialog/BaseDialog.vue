<template>
  <GDialog
    v-model="value"
    :max-width="400"
    :depressed="depressed"
  >
    <p>
      Base component
    </p>

    <BooleanSwitch
      v-model="depressed"
      label="depressed (without box-shadow)"
    />
  </GDialog>
</template>

<script>
import { ref } from 'vue'
import { GDialog } from '@/gitart-vue-dialog'

import { useModelWrapper } from '@/composables/modelWrapper'

import BooleanSwitch from '@/components/PropControls/BooleanSwitch/BooleanSwitch.vue'

export default {
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
    const value = useModelWrapper(props, emit)

    return {
      depressed,
      value,
    }
  },
}
</script>
