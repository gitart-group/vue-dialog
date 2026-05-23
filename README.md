[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct.svg)](https://savelife.in.ua/en/)

<p align="center"><img src="src/assets/gitart-dialog-logo.svg" width="170" alt="Gitart Vue Dialog logo"></p>

<h1 align="center">Gitart Vue Dialog</h1>

<p align="center">Vue 3 Dialog/Modal Component + Plugin (optional)</p>

---

📘 [Documentation](https://gitart-vue-dialog.gitart.org/)

🤯 [Examples](https://examples.gitart-vue-dialog.gitart.org/)

⭐ [You can star it here, thanks :)](https://github.com/gitart-group/vue-dialog)

Typescript support, customizable, beautifully animated, SSR, accessible focus handling, and programmatic dialogs powered by `gitart-manage-vue-dialog`.


## Installation

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

Be sure to read the [documentation](https://gitart-vue-dialog.gitart.org/) for using the plugin

```js
import App from './App.vue'
import { GDialogRoot, plugin as dialogPlugin } from 'gitart-vue-dialog'

createApp(App)
  .use(dialogPlugin)
  .mount('#app')
```

```vue
<template>
  <RouterView />
  <GDialogRoot />
</template>
```

### Programmatic Dialogs

```ts
import { useDialogConfirm, useGDialog } from 'gitart-vue-dialog'
import MyDialog from './MyDialog.vue'

const $dialog = useGDialog()
const confirmDialog = useDialogConfirm(MyDialog)

$dialog.addDialog({
  component: MyDialog,
  props: {
    title: 'Opened programmatically',
  },
})

const confirmed = await confirmDialog({
  title: 'Are you sure?',
})
```



## Usage

Read [Documentation](https://gitart-vue-dialog.gitart.org/)

<img src="src/assets/example-video.gif" width="690" alt="Example Video">


Made in Ukraine 🇺🇦 by [Mykhailo Kryvorucho](https://twitter.com/MichaelGitart)
