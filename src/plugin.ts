import type { IGDialog as ManagedDialog } from 'gitart-manage-vue-dialog'

import type { App, Plugin } from 'vue'

import type {
  DialogCallback,
  DialogInjectionKey,
  DialogOnCloseEvent,
  DialogPluginOptions,
  ExtractComponentProps,
  IDialog,
  IDialogItem,
  IDialogItemId,
} from './types/Plugin'

import {
  gitartDialogPlugin,
  gitartDialogInjectionKey as managedDialogInjectionKey,
} from 'gitart-manage-vue-dialog'
import { inject, shallowReactive } from 'vue'

type ManagedComponentProps<T> = Omit<ExtractComponentProps<T>, 'modelValue'>

const installVuePlugin = (
  app: App,
  vuePlugin: Plugin,
  options?: DialogPluginOptions,
) => {
  if (typeof vuePlugin === 'function')
    vuePlugin(app, options)
  else
    vuePlugin.install(app, options)
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
// Keep the provide/inject key stable across HMR reloads in dev.
export const dialogInjectionKey: DialogInjectionKey = Symbol.for('gitart-vue-dialog:GDialog') as DialogInjectionKey

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
  install: (app, options?: DialogPluginOptions) => {
    let managedDialog: ManagedDialog | undefined

    const proxyApp = Object.create(app) as App
    proxyApp.provide = ((key, value) => {
      if (key === managedDialogInjectionKey)
        managedDialog = value as ManagedDialog

      app.provide(key, value)
      return proxyApp
    }) as App['provide']

    installVuePlugin(proxyApp, gitartDialogPlugin, options)

    if (!managedDialog) {
      errorLogger.pluginIsNotInitialized()
      return
    }
    const dialogManager = managedDialog

    const defaultCloseDelay = options?.closeDelay ?? 500
    const dialogs = shallowReactive<IDialogItem[]>([])
    const dialogIndex = new Map<IDialogItemId, {
      cleanupTimer: ReturnType<typeof setTimeout> | null
      internalId: number
      item: IDialogItem
    }>()

    const removePublicDialog = (id: IDialogItemId) => {
      const entry = dialogIndex.get(id)

      if (!entry)
        return

      if (entry.cleanupTimer) {
        clearTimeout(entry.cleanupTimer)
        entry.cleanupTimer = null
      }

      const dialogIndexInList = dialogs.indexOf(entry.item)
      if (dialogIndexInList !== -1)
        dialogs.splice(dialogIndexInList, 1)

      dialogIndex.delete(id)
    }

    const schedulePublicDialogRemoval = (id: IDialogItemId, delay: number) => {
      const entry = dialogIndex.get(id)

      if (!entry)
        return

      if (entry.cleanupTimer)
        clearTimeout(entry.cleanupTimer)

      entry.cleanupTimer = setTimeout(() => {
        removePublicDialog(id)
      }, delay)
    }

    const getDialogId = (id?: IDialogItemId): IDialogItemId => {
      if (id !== undefined && !dialogIndex.has(id))
        return id

      if (id !== undefined)
        console.warn(`Dialog with id "${String(id)}" already exists. Falling back to an auto-generated id.`)

      let generatedId: IDialogItemId = Date.now() + Math.random()
      while (dialogIndex.has(generatedId))
        generatedId = Date.now() + Math.random()

      return generatedId
    }

    const $dialog: IDialog = {
      dialogs,

      addDialog: ({ component, props, id }, hooks) => {
        const dialogId = getDialogId(id)
        const managedDialogItem = dialogManager.addDialog(
          component,
          (props ?? {}) as unknown as ManagedComponentProps<typeof component>,
        )
        const dialogItem: IDialogItem = {
          component: managedDialogItem.component,
          id: dialogId,
          props: managedDialogItem.props as IDialogItem['props'],
          onClose: hooks?.onClose,
        }

        dialogs.push(dialogItem)
        dialogIndex.set(dialogId, {
          cleanupTimer: null,
          internalId: managedDialogItem.id,
          item: dialogItem,
        })

        return dialogId
      },

      removeDialog: (id, closeDelay) => {
        const entry = dialogIndex.get(id)

        if (!entry || !entry.item.props.modelValue)
          return

        let canceled = false
        const event: DialogOnCloseEvent = {
          id,
          cancel: () => {
            console.warn('Dialog closing canceled')
            canceled = true
          },
          item: entry.item,
        }

        if (entry.item.onClose) {
          entry.item.onClose(event)

          if (canceled)
            return
        }

        dialogManager.removeDialog(entry.internalId, closeDelay)
        schedulePublicDialogRemoval(id, closeDelay ?? defaultCloseDelay)
      },
    }

    app.provide(dialogInjectionKey, $dialog)
    app.config.globalProperties.$dialog = $dialog
  },
}

export const useGDialog = (): IDialog => {
  return inject(dialogInjectionKey, dialogInjectionFallback)
}

/**
 * helper composable for dialogs that confirm something
 */
export function useDialogConfirm<T>(
  component: T,
  _$dialog?: IDialog,
): DialogCallback<Omit<ExtractComponentProps<T>, 'modelValue' | 'confirm'>, boolean> {
  const $dialog = _$dialog || useGDialog()

  return ((props = {}) => {
    return new Promise((resolve) => {
      let confirmed = false

      $dialog.addDialog({
        component,
        props: {
          ...(props as Record<string, unknown>),
          confirm: () => {
            confirmed = true
            resolve(true)
          },
        } as unknown as ManagedComponentProps<T>,
      }, {
        onClose: () => {
          if (!confirmed)
            resolve(false)
        },
      })
    })
  }) as DialogCallback<Omit<ExtractComponentProps<T>, 'modelValue' | 'confirm'>, boolean>
}

/**
 * helper composable for dialogs that return some data
 */
export function useDialogReturnData<D, T = any>(
  component: T,
  _$dialog?: IDialog,
): DialogCallback<Omit<ExtractComponentProps<T>, 'confirm' | 'modelValue'>, D | null>
export function useDialogReturnData<T>(
  component: T,
  _$dialog?: IDialog,
): DialogCallback<Omit<ExtractComponentProps<T>, 'confirm' | 'modelValue'>, any>
export function useDialogReturnData<D, T = any>(
  component: T,
  _$dialog?: IDialog,
) {
  const $dialog = _$dialog || useGDialog()

  return (props = {}) => {
    return new Promise<D | null>((resolve) => {
      let confirmed = false

      $dialog.addDialog({
        component,
        props: {
          ...(props as Record<string, unknown>),
          confirm: (data: D) => {
            confirmed = true
            resolve(data)
          },
        } as unknown as ManagedComponentProps<T>,
      }, {
        onClose: () => {
          if (!confirmed)
            resolve(null)
        },
      })
    })
  }
}
