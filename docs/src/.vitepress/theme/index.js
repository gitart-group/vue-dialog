import DefaultTheme from 'vitepress/theme'
import './custom.css'

import BaseBtn from '@/.vitepress/components/Base/BaseBtn.vue'

import BtnWrapper from '@/.vitepress/components/Layout/BtnWrapper.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('BaseBtn', BaseBtn)
    app.component('BtnWrapper', BtnWrapper)
  }
}