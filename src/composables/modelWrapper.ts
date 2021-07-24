import { computed } from 'vue'

interface modelWrapperProps {
  modelValue: boolean
}

type modelWrapperEmitter = (event: 'update:modelValue', value: boolean) => void

export function useModelWrapper(props: modelWrapperProps, emit: modelWrapperEmitter) {
  return computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })
}
