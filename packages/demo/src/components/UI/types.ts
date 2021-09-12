import { Ref } from 'vue'

export interface RadioInjection {
  name: Ref<string>
  modelValue: Ref<string | boolean>
  onChange: (value: boolean | string) => void
}