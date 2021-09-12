import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import getDialogPlugin from './plugins/g-dialog'

export const app = createApp (App)

app.use(getDialogPlugin())
app.mount('#app')
