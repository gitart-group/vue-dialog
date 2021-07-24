<template>
  <RadioGroup v-model="value">
    {{ label }}
    <Radio
      :value="true"
      label="True"
    />

    <Radio
      :value="false"
      label="False"
    />
  </RadioGroup>
</template>

<script lang="ts">
import { useModelWrapper } from '@/composables/modelWrapper'

import Radio from '@/components/UI/Radio/Radio.vue'
import RadioGroup from '@/components/UI/RadioGroup/RadioGroup.vue'

export default {
  name: 'BooleanSwitch',
  components: {
    Radio,
    RadioGroup,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: null,
    },
  },

  setup(props, { emit }) {
    const value = useModelWrapper(props, emit)

    return {
      value,
    }
  },
}
</script>
