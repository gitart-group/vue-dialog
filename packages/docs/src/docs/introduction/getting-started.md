

![Tux, the Linux mascot](/gitart-dialog-logo.svg)

::: warning Vue 3 only
Remember that the package only works with **Vue 3**
:::

## Package installation

```bash
yarn add gitart-vue-dialog
npm install gitart-vue-dialog
```

Then you should add somewhere in your script file or component the import of Dialog component:

```js
import "gitart-vue-dialog/dist/style.css";
import { GDialog, plugin } from "gitart-vue-dialog";
```

After that register this component locally or globally and install the plugin

## Minimal working example

Let's use standalone component (without installing plugin)

```js
// main.js or YourComponent.vue
import 'gitart-vue-dialog/dist/style.css'
```

```html
<GDialog v-model="value">
  Content
</GDialog>

<button @click="onOpen">Open Dialog</button>
```


))) method-switch

::: vue-slot composition
```js
// YourComponent.vue
import { ref } from 'vue'
import { GDialog } from 'gitart-vue-dialog'

export default {
  components: {
    GDialog,
  },
  setup() {
    const value = ref(false)
    const onOpen = () => {
      value.value = true
    }

    return {
      value,
      onOpen,
    }
  },
}
```
:::

::: vue-slot option
```js
// YourComponent.vue
import { GDialog } from 'gitart-vue-dialog'

export default {
  components: {
    GDialog,
  },
  data: () => ({
    value: false,
  }),
  methods: {
    onOpen() {
      this.value = true
    },
  },
}
```
:::

)))

<Example file="Introduction/GettingStartedExample" />

Pretty **ugly** dialog, right? Let's add background and some content. Take a look:

<Example file="Introduction/GettingStartedExampleStyled" />

Looks better. Here is more advanced [examples](https://michaelgitart.github.io/gitart-vue-dialog)
