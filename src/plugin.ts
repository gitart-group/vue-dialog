import type { Plugin } from 'vue'
import { reactive, shallowReactive } from 'vue'

import type {
  DialogInjectionKey, DialogOnCloseEvent, IDialog, IDialogItem,
} from './types/Plugin'

const dialogs = shallowReactive<IDialogItem[]>([])

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
    return null as any
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
  install: (app, options) => {
    const defaultCloseDelay = options?.closeDelay ?? 500
    const defaultProps = options?.props ?? {}

    const $dialog: IDialog = {
      dialogs,

      addDialog: ({ component, props, id }, hooks) => {
        const dialogId = id ?? Date.now() + Math.random()

        dialogs.push({
          component,
          id: dialogId,

          props: reactive({
            modelValue: true,
            ...defaultProps,
            ...props,
          }),

          onClose: hooks?.onClose,
        })

        return dialogId
      },

      removeDialog: (id, closeDelay) => {
        const dialog = dialogs.find(d => d.id === id)

        if (!dialog || !dialog.props.modelValue)
          return

        let canceled = false
        const event: DialogOnCloseEvent = {
          id,
          cancel: () => {
            console.warn('Dialog closing canceled')
            canceled = true
          },
          item: dialog,
        }

        if (dialog.onClose) {
          dialog.onClose(event)

          if (canceled)
            return
        }

        dialog.props.modelValue = false
        setTimeout(() => {
          dialogs.splice(dialogs.indexOf(dialog), 1)
        }, closeDelay ?? defaultCloseDelay)
      },
    }

    app.provide(dialogInjectionKey, $dialog)
    app.config.globalProperties.$dialog = $dialog
  },
}
