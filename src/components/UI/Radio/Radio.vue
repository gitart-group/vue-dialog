<template>
  <div>
    <label>
      <input
        type="radio"
        :name="computedName"
        :checked="selected"
        @change="onChange"
      >
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { computed, inject } from 'vue'

import { useComponentId } from '@/composables/componentId'

import { RadioInjectionKey } from '@/components/UI/symbols'

export default {
  name: 'Radio',
  props: {
    value: {
      type: [String, Boolean],
      default: true,
    },

    label: {
      type: String,
      default: '',
    },

    /**
     * Sets component's name attribute
     */
    name: {
      type: String,
      default: '',
    },
  },

  emits: ['change'],

  setup(props, { emit }) {
    const RadioGroup = inject(RadioInjectionKey)

    const id = useComponentId()
    const computedName = computed(() => {
      if(props.name && !RadioGroup) {
        return props.name
      }

      return RadioGroup?.name || `radio-${id}`
    })

    const onChange = () => {
      emit('change')
      RadioGroup?.onChange(props.value)
    }

    const selected = computed(() => RadioGroup?.modelValue.value === props.value)

    return {
      computedName,
      onChange,
      selected,
    }
  },
}
</script>
