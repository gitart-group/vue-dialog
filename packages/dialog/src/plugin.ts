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

export const errorLogger = {
  pluginIsNotInitialized(): void {
    console.error('The gitart-vue-dialog plugin is not initialized. Read how to solve: https://gitart-vue-dialog.gitart.org/guide/usage/plugin-usage.html#installation')
  },
}

/**
 * Injection key
 *
 * Provides access to plugin methods and properties using the vue inject method
 *
 * https://gitart-vue-dialog.gitart.org/guide/usage/plugin-usage.html#usage
 *
 * @example Usage
 * const {
 *   dialogs,
 *   removeDialog,
 * } = inject(dialogInjectionKey)!
 */
export const dialogInjectionKey: DialogInjectionKey = Symbol('GDialog')

export const dialogInjectionFallback: IDialog = {
  dialogs: [],
  addDialog: () => {
    errorLogger.pluginIsNotInitialized()
  },
  removeDialog: () => {
    errorLogger.pluginIsNotInitialized()
  },
}

/**
 * Plugin to install
 *
 * https://gitart-vue-dialog.gitart.org/guide/usage/plugin-usage.html - Documentation
 *
 * @example installation
 * import { plugin as dialogPlugin } from 'gitart-vue-dialog'
 * createApp(App)
 *  .use(dialogPlugin)
 *  .mount('#app')
 */
export const plugin: Plugin = {
  install: (app) => {
    app.provide(dialogInjectionKey, $dialog)
    app.config.globalProperties.$dialog = $dialog
  },
}
