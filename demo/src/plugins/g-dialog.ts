import { plugin as dialogPlugin, IDialog } from 'plugin' // gitart-vue-dialog
import 'plugin-css' // gitart-vue-dialog/dist/style.css

declare module '@vue/runtime-core' {
  export interface GDialogProperties {
    $dialog: IDialog
  }
}

export default () => dialogPlugin