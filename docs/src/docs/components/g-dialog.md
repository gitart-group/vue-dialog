# GDialog

```js
import { GDialog } from 'gitart-vue-dialog'
```

The component uses the Vue 3 teleport to move the component html to `<body>`.

z-index of the component is 200. So be careful. Don't make z-index of the header or other element like this: <br/> `z-index: 9999` 

## Props

| Name | Type | Default | Description |
|:---|:---|:---|:---|
| content-class | `string` | `''` | Applies to the div that wraps the main slot |
| depressed | `boolean` | `false` | Disables default box-shadow |
| height | `string`, `number` | `'auto'` | Sets height for the dialog |
| max-width | `string,` `number` | `'none'` | Sets max-width for the dialog |
| model-value | `boolean` | `false` | v-model props to activate and deactivate the dialog |
| persistent | `boolean` | `false` | Makes clicking outside of the element will not deactivate the dialog |
| scrollable | `boolean` | `false` |  |
| width | `string,` `number` | `'auto'` | Sets width for the dialog |

## Slots

| Name | Description |
|:---|:---|
| default | The default Vue slot


## Events

| Name | Payload | Description |
|:---|:---|:---|
| `update:modelValue` | `boolean` | runs with `false` after clicking outside