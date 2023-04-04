import type {
  Component, InjectionKey, ShallowUnwrapRef,
} from 'vue'

export type IDialogItemId = number | string

export type DialogOnCloseEvent = {
  id: IDialogItemId
  item: IDialogItem
  cancel: () => void
}

export interface IDialogItem {
  component: ShallowUnwrapRef<Component>
  id: IDialogItemId
  props: {
    modelValue: boolean
  }
  onClose?: ((event: DialogOnCloseEvent) => void) | undefined
}

type DialogAddMethod = <T>(params: {
  component: Component
  props?: Omit<T, 'modelValue'> | undefined
  id?: IDialogItemId | undefined
}, hooks?: {
    onClose?: ((event: DialogOnCloseEvent) => void) | undefined
  }) => IDialogItemId

type DialogRemoveMethod = (
  id: IDialogItemId,
  closeDelay?: number
) => void

interface IDialogMethods {
  addDialog: DialogAddMethod
  removeDialog: DialogRemoveMethod
}

export interface IDialog extends IDialogMethods {
  dialogs: IDialogItem[]
}

export type DialogInjectionKey = InjectionKey<IDialog>
