import DefaultTheme from 'vitepress/theme'

// BalmUI
import UiButton from 'balm-ui/components/button'
import UiTabsComponents from 'balm-ui/components/tabs'

import 'balm-ui/components/core.css'
import 'balm-ui/components/button/button.css'
import 'balm-ui/components/tabs/tabs.css'

import $theme from 'balm-ui/plugins/theme'

// Gitart Dialog
import { GDialog } from 'gitart-vue-dialog/dist/server'
import 'gitart-vue-dialog/dist/style.css'

import './custom.scss'

import ButtonWrapper from '@/components/Components/ButtonWrapper.vue'
import Example from '@/components/Components/Example/Example.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {

    app.use($theme, {
      primary: '#8f6cf9',
      'on-primary': '#fff',
    })

    app.use(UiButton, {
      raised: true,
    })
    app.use(UiTabsComponents)

    app.component('GDialog', GDialog)
    app.component('ButtonWrapper', ButtonWrapper)
    app.component('Example', Example)
  },
}