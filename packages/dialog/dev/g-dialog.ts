import { Plugin } from 'vue'
import { plugin as dialogPlugin, IDialog } from 'gitart-vue-dialog'
// import 'gitart-vue-dialog/dist/style.css'

declare module '@vue/runtime-core' {
  export interface GDialogProperties {
    $dialog: IDialog
  }
}

export default (): Plugin => dialogPlugin