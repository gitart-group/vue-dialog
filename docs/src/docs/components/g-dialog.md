# GDialog

```js
import { GDialog } from 'gitart-vue-dialog'
```

## Props

| Name | Type | Default | Description |
|:---|:---|:---|:---|
| model-value | `boolean` | `false` | v-model props to activate and deactivate the dialog |
| persistent | `boolean` | `false` | Makes clicking outside of the element will not deactivate the dialog |
| max-width | `string,` `number` | `'none'` | Sets max-width for the dialog |
| width | `string,` `number` | `'auto'` | Sets width for the dialog |
| height | `string`, `number` | `'auto'` | Sets height for the dialog |
| depressed | `boolean` | `false` | Disables default box-shadow |
| contentClass | `string` | `''` | Applies to the div that wraps the main slot |

## Slots

| Name | Description |
|:---|:---|
| default | The default Vue slot


## Events

| Name | Payload | Description |
|:---|:---|:---|
| `update:modelValue` | `boolean` | runs with `false` after clicking outside