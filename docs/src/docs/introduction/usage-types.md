# Usage Types

You can use standalone component GDialog. Similar to Vuetify VDialog.
or take full functionality after installing a plugin

- [standalone component](#standalone-component)
- [plugin](#plugin)

## Standalone Component

[Read in details on the Component Usage](/guide/component-usage)

Import package styles and register GDialog. Done! You can use the component.

```js
// main.js or YourComponent.vue
import 'gitart-vue-dialog/dist/style.css'
```

```js
import { GDialog } from 'gitart-vue-dialog'

export default {
  components: {
    GDialog,
  },
}
```

## Plugin

[Read in details on the Plugin Usage](/guide/plugin-usage)

Plugin give you posiblity to launch dialogs from any method without putting GDialog in template.
It could be async component, which will be loaded after calling onOpenInfo()

```js
const InfoDialog = defineAsyncComponent(() => import('@/components/InfoDialog.vue'))

export default {
  methods: {
    onOpenInfo() {
      this.$dialog.addDialog({
        component: InfoDialog,
        props: {
          lorem: true
        }
      })
    },
  },
}

```

This way, you can launch a dialog from any component of your app. This's great! Isn't it? :)


Don't forget read [Plugin Usage](/guide/plugin-usage). You need add GDialogRoot to you App.vue