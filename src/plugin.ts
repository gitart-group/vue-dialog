import type { Plugin } from 'vue'
import { shallowReactive } from 'vue'

import type {
  DialogInjectionKey, IDialog, IDialogItem,
} from './types/Plugin'

const dialogs = shallowReactive<IDialogItem[]>([])
const $dialog: IDialog = {
  dialogs,

  addDialog: ({ component, props }) => {
    dialogs.push({
      component,
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
    console.error('The gitart-vue-dialog plugin is not initialized. Read how to solve: https://gitart-vue-dialog.netlify.app/docs/guide/plugin-usage.html#usage')
  },
}

/**
 * Injection key
 *
 * Provides access to plugin methods and properties using the vue inject method
 *
 * https://gitart-vue-dialog.netlify.app/docs/guide/plugin-usage.html#usage
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
 * https://gitart-vue-dialog.netlify.app/docs/guide/plugin-usage.html - Documentation
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
