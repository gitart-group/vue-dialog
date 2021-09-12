# GDialogRoot

```js
import { GDialogRoot } from 'gitart-vue-dialog'
```

## Usage

Put `GDialogRoot` into your root component (App.vue)

::: warning
Remember GDialogRoot just render dialogs added by `$dialog.addDialog()`.
No props, no slots, no events.
:::

## How does it works

The components just render [$dialog.dialogs](/docs/guide/plugin-usage#dialogs) and removes them on `@update:modelValue` event.

```html
<Component
  :is="dialog.component"
  v-for="(dialog, index) in dialogs"
  :key="dialog.id"
  v-bind="dialog.props"
  @update:modelValue="onClose(index)"
/>
```
- `dialogs` - it's array of the plugin dialogs. Details: [$dialog.dialogs](/docs/guide/plugin-usage#dialogs)
- `onClose` - method that runs [$dialog.removeDialog](/docs/guide/plugin-usage#removedialog-index)

If it's not enough, you can write your own alternative.
