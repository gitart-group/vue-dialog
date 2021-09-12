import { createApp } from 'vue'

import App from './App.vue'
import dialogPlugin from './g-dialog'

export const app = createApp(App)

app.use(dialogPlugin())
app.mount('#app')