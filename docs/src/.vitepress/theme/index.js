import DefaultTheme from 'vitepress/theme'
import { GDialog } from 'gitart-vue-dialog/dist/server'
import 'gitart-vue-dialog/dist/style.css'
import './custom.css'

import BaseBtn from '@/components/Components/BaseBtn.vue'
import BtnWrapper from '@/components/Components/BtnWrapper.vue'
import Example from '@/components/Components/Example.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('GDialog', GDialog)
    app.component('BaseBtn', BaseBtn)
    app.component('BtnWrapper', BtnWrapper)
    app.component('Example', Example)
  },
}