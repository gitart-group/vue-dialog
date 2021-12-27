import { createApp } from 'vue'

import 'virtual:windi.css'

import App from './App.vue'
import dialogPlugin from './g-dialog'

export const app = createApp(App)

app.use(dialogPlugin())
app.mount('#app')