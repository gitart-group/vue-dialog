import {
  reactive, InjectionKey, shallowRef, Plugin,
} from 'vue'

import { DialogMethods, IDialogItem } from './types/Plugin'

export const DialogMethodsKey: InjectionKey<DialogMethods> = Symbol('DialogMethod')
export const DialogDialogListKey: InjectionKey<IDialogItem[]> = Symbol('DialogList')

const dialogs = reactive<IDialogItem[]>([])

export const plugin: Plugin = {
  install: (app) => {
    app.provide(DialogMethodsKey, {
      add: ({ component, props }) => {
        dialogs.push({
          component: shallowRef(component),
          id: Date.now() + Math.random(),

          props: {
            modelValue: true,
            ...props,
          },
        })
      },

      remove: (index) => {
        const dialog = dialogs[index]
        dialog.props.modelValue = false
        setTimeout(() => {
          dialogs.splice(index, 1)
        }, 150)
      },
    })

    app.provide(DialogDialogListKey, dialogs)
  },
}
