<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { provide, computed } from 'vue'

import { useComponentId } from '@/composables/componentId'

import { RadioInjectionKey } from '@/components/UI/symbols'

export default {
  name: 'RadioGroup',
  props: {
    name: {
      type: String,
      default: '',
    },

    modelValue: {
      type: [Boolean, String],
      default: '',
    },
  },

  emits: {
    'update:modelValue': (value: string | boolean) => true,
  },

  setup(props, { emit }) {
    const id = useComponentId()
    const computedName = computed(() => props.name || `radio-group-${id}`)

    const computedModelValue = computed(() => props.modelValue)

    provide(RadioInjectionKey, {
      name: computedName,
      modelValue: computedModelValue,
      onChange(value) {
        emit('update:modelValue', value)
      },
    })

  },
}
</script>
