
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
import { GDialog } from "gitart-vue-dialog";
```

After that register this component locally or globally

## Minimal working example

```js
// main.js
import "gitart-vue-dialog/dist/style.css";
```

```js
// App.vue
import { GDialog } from "gitart-vue-dialog";

export default {
  components: {
    GDialog,
  },
  data: () => ({
    dialogState: false,
  }),

  methods: {
    onOpen() {
      this.dialogState = true;
    },
  },
}
```

```html
<GDialog v-model="dialogState">
  Content
</GDialog>

<button @click="onOpen">Open Dialog</button>
```
