import {
  Component, ShallowUnwrapRef,
} from 'vue'

export interface IDialogItem {
  component: ShallowUnwrapRef<Component>
  id: number
  props: {
    modelValue: boolean
  }
}

type DialogAddMethod = <T>(params: {
  component: Component
  props?: Omit<T, 'modelValue'> | undefined
}) => void

type DialogRemoveMethod = (
  index: number
) => void

export interface DialogMethods {
  add: DialogAddMethod
  remove: DialogRemoveMethod
}
