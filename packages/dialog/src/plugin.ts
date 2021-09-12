import {
  reactive, shallowRef, Plugin,
} from 'vue'

import {
  IDialog, IDialogItem, DialogInjectionKey,
} from './types/Plugin'

const dialogs = reactive<IDialogItem[]>([])
const $dialog: IDialog = {
  dialogs,

  addDialog: ({ component, props }) => {
    dialogs.push({
      component: shallowRef(component),
      id: Date.now() + Math.random(),

      props: {
        modelValue: true,
        ...props,
      },
    })
  },

  removeDialog: (index) => {
    const dialog = dialogs[index]
    dialog.props.modelValue = false
    setTimeout(() => {
      dialogs.splice(index, 1)
    }, 150)
  },
}

export const dialogInjectionKey: DialogInjectionKey = Symbol('GDialog')

export const plugin: Plugin = {
  install: (app) => {
    app.provide(dialogInjectionKey, $dialog)
    app.config.globalProperties.$dialog = $dialog
  },
}
