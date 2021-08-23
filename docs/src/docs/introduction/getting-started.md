<!-- <script setup>
import BaseDialog from '@/.vitepress/components/Dialogs/Guide/BaseDialog.vue'
import BaseStyledDialog from '@/.vitepress/components/Dialogs/Guide/BaseStyledDialog.vue'
</script> -->

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

<<< @/.vitepress/includes/minumal-working-example/main.js
<<< @/.vitepress/includes/minumal-working-example/YourComponent.js
<<< @/.vitepress/includes/minumal-working-example/YourComponent.html

<!-- <BaseDialog />

Pretty **ugly** dialog, right? Let's add max-width, background and some padding. Take a look:

<BaseStyledDialog /> -->