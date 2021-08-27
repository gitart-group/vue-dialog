# GDialog

```js
import { GDialog } from 'gitart-vue-dialog'
```

The component uses the Vue 3 teleport to move the component html to `<body>`.

z-index of the component is 200. So be careful. Don't make z-index of the header or other element like this: <br/> `z-index: 9999` 

## Props

| Name | Type | Default |
|:---|:---|:---|
| [background](#background) | `boolean` `string` | `true` |
| [border-radius](#border-radius) | `boolean` `number` `string` | `true` |
| [content-class](#content-class) | `string` | `''` |
| [depressed](#depressed) | `boolean` | `false` |
| [height](#height) |  `string` `number` | `'auto'` |
| [max-width](#max-width) | `string` `number` | `'none'` |
| [model-value](#model-value) | `boolean` | `false` |
| [persistent](#persistent) | `boolean` | `false` |
| [scrollable](#scrollable) | `boolean` | `false` |
| [width](#width) | `string` `number` | `'auto'` |


### `background`
- **Type:** `Boolean | String`

- **Default:** `true`

- **Details:** <br/>
  Sets background to the dialog content

---

### `border-radius`
- **Type:** `Boolean | Number | String`

- **Default:** `true`

- **Details:** <br/>
  Sets border-radius to the dialog content

---

### `content-class`
- **Type:** `String`

- **Details:** <br/>
Applies the class to the content (div that wraps the main slot)

---


### `depressed`
- **Type:** `Boolean`

- **Default:** `false`

- **Details:** <br/>
Disables default box-shadow

---

### `height`
- **Type:** `String | Number`

- **Default:** `'auto'`

- **Details:** <br/>
Sets height for the dialog

---

### `max-width`
- **Type:** `String | Number`

- **Default:** `'none'`

- **Details:** <br/>
Sets max-width for the dialog

---

### `model-value`
- **Type:** `Boolean`

- **Default:** `false`

- **Details:** <br/>
v-model props to activate and deactivate the dialog

---

### `persistent`
- **Type:** `Boolean`

- **Default:** `false`

- **Details:** <br/>
Makes clicking outside of the element will not deactivate the dialog

---

### `scrollable`
- **Type:** `Boolean`

- **Default:** `false`

<!-- - **Details:** <br/> -->

---
### `width`
- **Type:** `String | Number`

- **Default:** `'auto'`

- **Details:** <br/>
Sets width for the dialog

---

## Slots

| Name | Description |
|:---|:---|
| default | The default Vue slot


## Events

| Name | Payload | Description |
|:---|:---|:---|
| `update:modelValue` | `boolean` | runs with `false` after clicking outside

## CSS Vars Customization

To change some styling (background, border-radius) for single dialog, you can pass props.
Or use CSS variables to do it globally. Put the vars into your global css file or into App.vue `<style>`

```css
:root {
  --g-dialog-content-bg: #eff1f3;
  --g-dialog-content-border-radius: 8px;
}
```

**List of possible variables:**

### content-bg
- **Name:** `--g-dialog-content-bg`

- **Default:** `#fff`

- **Details:** <br/>
  Sets default `background` for the dialog content

- **Usage:**

  ```css
  --g-dialog-content-bg: #282c34;
  ```

---

### content-border-radius
- **Name:** `--g-dialog-border-radius`

- **Default:** `4px`

- **Details:**<br/>
  Sets default `border-radius` for the dialog content

- **Usage:**

  ```css
  --g-dialog-border-radius: 0;
  ```
---