import type { Plugin } from 'vue'
import type { IDialog } from 'gitart-vue-dialog'
import { plugin as dialogPlugin } from 'gitart-vue-dialog'
// import 'gitart-vue-dialog/dist/style.css'

declare module '@vue/runtime-core' {
  export interface GDialogProperties {
    $dialog: IDialog
  }
}

export default (): Plugin => dialogPlugin
