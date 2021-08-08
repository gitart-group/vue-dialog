import { createApp } from 'vue'
import { plugin as dialogPlugin } from 'plugin' // gitart-vue-dialog
import 'plugin-css' // gitart-vue-dialog/dist/style.css

import App from './App.vue'
import 'virtual:windi.css'

export const app = createApp(App)
  .use(dialogPlugin)
  .mount('#app')
