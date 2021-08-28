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
| [overlay-background](#overlay-background) | `boolean` `string` | `true` |
| [persistent](#persistent) | `boolean` | `false` |
| [scrollable](#scrollable) | `boolean` | `false` |
| [transition](#transition) | `string` | `g-dialog-transition` |
| [width](#width) | `string` `number` | `'auto'` |


### `background`
- **Type:** `Boolean | String`

- **Default:** `true`

- **Details:** <br/>
  Sets background to the dialog content

  - `true` - remains [default](#content-bg) backround, 
  - `false` - removes background
  - `String` - sets some backround to the current dialog content

  You can set default value for all dialogs by CSS var [--g-dialog-content-bg](#content-bg)

---

### `border-radius`
- **Type:** `Boolean | Number | String`

- **Default:** `true`

- **Details:** <br/>
  Sets border-radius to the dialog content

  - `true` - remains [default](#content-border-radius) border-radius, 
  - `false` - removes border-radius
  - `String` - sets some border-radius to the current dialog content

  You can set default value for all dialogs by CSS var [--g-dialog-content-border-radius](#content-border-radius)

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

### `overlay-background`
- **Type:** `Boolean | String`

- **Default:** `true`

- **Details:** <br/>
Sets dialog overlay background. 
  - `true` - remains [default](#overlay-bg) backround, 
  - `false` - removes background
  - `String` - sets some backround to the current dialog overlay

  You can set default value for all dialogs by CSS var [--g-dialog-overlay-bg](#overlay-bg)

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
### `transition`
- **Type:** `String`

- **Default:** `'g-dialog-transition'`

- **Details:** <br/>
Sets the component custom transition name (leaving and entering the dialog). Here is example:

```scss
// transition="custom-rotate-transition"
.custom-rotate-transition {
  &-enter-active,
  &-leave-active {
    transition-timing-function: linear;
    transition-duration: 0.1s; // not higher than 200ms
  }

  &-enter-from {
    transform: translate(0, 30px) rotate(12deg);
    opacity: 0;
  }

  &-leave-to {
    transform: translate(0, 30px) rotate(4deg);
    opacity: 0;
  }
}
```

::: warning
  On leaving don't set `transition-duration` higher than `150ms`-`200ms` if you are using
  plugin method [addDialog](/docs/guide/plugin-usage#adddialog-data).

  [removeDialog](/docs/guide/plugin-usage#removedialog-index) disables a dialog and deletes it after 150ms
  completely, so the custom transition may be truncated
:::

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
| default | The default Vue slot |


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

### content-shadow
- **Name:** `--g-dialog-content-shadow`

- **Default:** <br/>
  `0 11px 15px -7px rgb(0 0 0 / 20%),` <br/>
  `0 24px 38px 3px rgb(0 0 0 / 14%),` <br/>
  `0 9px 46px 8px rgb(0 0 0 / 12%)` <br/>

- **Details:**<br/>
  Sets default `box-shadow` for the dialog content

- **Usage:**

  ```css
  --g-dialog-content-shadow: 0 11px 15px -7px rgb(0 0 0 / 20%);
  ```
---

### overlay-bg
- **Name:** `--g-dialog-overlay-bg`

- **Default:** `rgba(33, 33, 33, 0.46)`

- **Details:**<br/>
  Sets default `background` for the dialog overlay

- **Usage:**

  ```css
  --g-dialog-overlay-bg: rgba(143, 108, 249, 0.4);
  ```
---