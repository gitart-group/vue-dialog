# Plugin Usage

[[toc]]

---

- [GDialog Details](/docs/components/g-dialog)
- [GDialogRoot Details](/docs/components/g-dialog-root)

## Installation

```js{2,3,6}
import App from './App.vue'
import { plugin as dialogPlugin } from 'gitart-vue-dialog'
import 'gitart-vue-dialog/dist/style.css'

createApp(App)
  .use(dialogPlugin)
  .mount('#app')
```

We strongly recommend using GDialogRoot. That is component where will be rendered your [dialogs](#dialogs). 
Put it somewhere in you App.vue

Or write your own alternative. Look [here](/docs/components/g-dialog-root) how GDialogRoot works

```js{2,6}
// App.vue
import { GDialogRoot } from 'gitart-vue-dialog'

export default {
  components: {
    GDialogRoot,
  },
}
```

## Usage

You can access to the methods and properties of the plugin by injection `inject(dialogInjectionKey)` (or `this.$dialog` in option api)

))) method-switch

::: vue-slot composition
```js
import { dialogInjectionKey } from 'gitart-vue-dialog'

export default {
  setup() {
    const $dialog = inject(dialogInjectionKey)
    // $dialog.addDialog()
    // $dialog.removeDialog()
    // $dialog.dialogs
  }
}
```
:::

::: vue-slot option
```js
import { dialogInjectionKey } from 'gitart-vue-dialog'

export default {
  methods: {
    someMethod() {
      // this.$dialog
      // $dialog.addDialog()
      // $dialog.removeDialog()
      // $dialog.dialogs
    },
  },
}
```
:::

)))

## Properties

**$dialog** has such properties:

| Name | Type |
|:---|:---|
| [addDialog](#adddialog-data) | `Function` |
| [removeDialog](#removedialog-index) | `Function` |
| [dialogs](#dialogs) | `Array` |

### `addDialog(data)`

- **Type:** `Function`

- **Arguments:**
  - {Object} data - `{ component: DialogComponent, props: { ... } }`

- **Details:** <br/>
  The method adds your extended `data` argument to [dialogs](#dialogs) array.
  The `data.component` will be rendered in the [GDialogRoot](/docs/components/g-dialog-root) with the props you add to `data.props`

  ::: warning
    `data.props` should not contain modelValue. The `addDialog` overwrites it
  :::

  ::: info
  To close the dialog (DialogComponent.vue) you need inside emit the event `update:modelValue` with `false` inside. Take a look at the [example](#example) below
  :::

---

### `removeDialog(index)` 

- **Type:** `Function`

- **Arguments:**
  - {Number} index

- **Details:** <br/>
  The method removes item from [dialogs](#dialogs) by index. Useful if you decide to write your own [GDialogRoot](/docs/components/g-dialog-root)

---

### `dialogs` 
- **Type:** `Array`

- **Details:** <br/>
  Array of the IDialogItem. The array can be rendered in any part of your app. 
  We recommend use [GDialogRoot](/docs/components/g-dialog-root) for it.
  ```ts
  interface IDialogItem {
    component: ShallowUnwrapRef<Component>
    id: number
    props: {
      modelValue: boolean
      // other props
    }
  }
  ```

---

## Example

First create your Dialog component that will be launched from method. Name it InfoDialog.vue

```html
<GDialog
  v-model="value"
>
  <div>
    Info Alert
  </div>

  {{ info }}
</GDialog>
```

))) method-switch

::: vue-slot composition
```js
// InfoDialog.vue
import { computed } from 'vue'
import { GDialog } from 'gitart-vue-dialog'

export default {
  name: 'BaseDialog',
  components: {
    GDialog,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    info: {
      type: String,
      required: true,
    },
  },

  setup(props: IBaseDialogProps, { emit }) {
    const value = computed({
      get() {
        return props.modelValue
      },

      set(val) {
        emit('update:modelValue', val)
      },
    })

    return {
      value,
    }
  },
}
```
:::

::: vue-slot option
```js
// InfoDialog.vue
import { GDialog } from 'gitart-vue-dialog'

export default {
  name: 'BaseDialog',
  components: {
    GDialog,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    info: {
      type: String,
      required: true,
    },
  },

  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
}
```
:::

)))


Now launch the dialog from any component of your app:

))) method-switch

::: vue-slot composition
```js
import { dialogInjectionKey } from 'gitart-vue-dialog'
const InfoDialog = defineAsyncComponent(() => import('@/components/InfoDialog.vue'))

export default {
  setup() {
    const {
      addDialog,
    } = inject(dialogInjectionKey)

    const onOpenInfo = () => {
      addDialog({
        component: InfoDialog,
        props: {
          info: 'Info to display',
        },
      })
    }

    return {
      onOpenInfo,
    }
  },
}
```
:::

::: vue-slot option
```js
const InfoDialog = defineAsyncComponent(() => import('@/components/InfoDialog.vue'))

export default {
  methods: {
    onOpenInfo() {
      this.$dialog.addDialog({
        component: InfoDialog,
        props: {
          info: 'Info to display',
        },
      })
    },
  },
}
```
:::

)))
