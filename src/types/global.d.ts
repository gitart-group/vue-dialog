import type { IDialog } from './Plugin'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dialog: IDialog
  }
}

export {}
