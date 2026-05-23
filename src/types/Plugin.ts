import type {
  Component, InjectionKey, ShallowUnwrapRef,
} from 'vue'

export type IDialogItemId = number | string

export type ExtractComponentProps<T> = T extends {
  new (...args: any): any
}
  ? InstanceType<T>['$props']
  : T extends (props: infer P, ...args: any) => any
    ? P
    : any

export type DialogCallback<P, R> = {} extends P
  ? (props?: P) => Promise<R>
  : (props: P) => Promise<R>

export type DialogOnCloseEvent = {
  id: IDialogItemId
  item: IDialogItem
  cancel: () => void
}

export interface IDialogItem {
  component: ShallowUnwrapRef<Component>
  id: IDialogItemId
  props: Record<string, unknown> & {
    modelValue: boolean
  }
  onClose?: ((event: DialogOnCloseEvent) => void) | undefined
}

type DialogAddMethod = <T>(params: {
  component: T
  props?: Omit<ExtractComponentProps<T>, 'modelValue'> | undefined
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

export interface DialogPluginOptions {
  closeDelay?: number
  props?: Record<string, unknown>
}
