# Gitart Vue Dialog (Vue 3 Only)

Customizable, beautifully animated, lightweight. Typescript support

📘 [Documentation](https://gitart-vue-dialog.netlify.app/)

🤯 [Examples](https://michaelgitart.github.io/gitart-vue-dialog/)

---

- files <br/>
  ~ 1.7 KiB - style.css `gitart-vue-dialog/dist/style.css` <br/> 
  ~ 9.2 KiB - index.upd.js (UPD format) `gitart-vue-dialog` <br/> 
  ~ 8.4 KiB - index.es.js (ES format) `gitart-vue-dialog/dist/index.es.js`


## Instalation

### Standalone Component

```js
// main.js or YourComponent.vue
import 'gitart-vue-dialog/dist/style.css'
```

```js
// YourComponent.vue
import { GDialog } from 'gitart-vue-dialog'

export default {
  components: {
    GDialog,
  },
}
```

### Plugin

Be sure to read the [documentation](https://gitart-vue-dialog.netlify.app/) for using the plugin

```js
import App from './App.vue'
import { plugin as dialogPlugin } from 'gitart-vue-dialog'
import 'gitart-vue-dialog/dist/style.css'

createApp(App)
  .use(dialogPlugin)
  .mount('#app')
```



## Usage

Read [Documentation](https://gitart-vue-dialog.netlify.app/)