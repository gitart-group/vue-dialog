# Component Usage

- [GDialog Details](/docs/components/g-dialog)

To use the package you don't need install the plugin. 
Just styles and register GDialog component. In some cases it's enough


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
