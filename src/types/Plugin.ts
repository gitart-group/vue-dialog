import {
  Component, ShallowUnwrapRef, InjectionKey,
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

interface IDialogMethods {
  addDialog: DialogAddMethod
  removeDialog: DialogRemoveMethod
}

export interface IDialog extends IDialogMethods {
  dialogs: IDialogItem[]
}

export type DialogInjectionKey = InjectionKey<IDialog>
