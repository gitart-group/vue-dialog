import DefaultTheme from 'vitepress/theme'
// import { GDialog } from 'gitart-vue-dialog'
// import 'gitart-vue-dialog/dist/style.css'
import './custom.css'

// import BaseBtn from '@/.vitepress/components/Base/BaseBtn.vue'

// import BtnWrapper from '@/.vitepress/components/Layout/BtnWrapper.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // app.component('GDialog', GDialog)
    
    // app.component('BaseBtn', BaseBtn)
    // app.component('BtnWrapper', BtnWrapper)
  }
}