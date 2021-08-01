/**
 * A copy of the vuetify implemantation
 * https://github.com/vuetifyjs/vuetify/blob/v2.5.8/packages/vuetify/src/mixins/overlayable/index.ts
 */

/**
 * Polyfill for Event.prototype.composedPath
 */
const composedPath = (e: WheelEvent): EventTarget[] => {
  if (e.composedPath) return e.composedPath()

  const path = []
  let el = e.target as Element

  while (el) {
    path.push(el)

    if (el.tagName === 'HTML') {
      path.push(document)
      path.push(window)

      return path
    }

    el = el.parentElement!
  }
  return path
}

const hasScrollbar = (el?: Element) => {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

  const style = window.getComputedStyle(el)
  return ['auto', 'scroll'].includes(style.overflowY!) && el.scrollHeight > el.clientHeight
}

const shouldScroll = (el: Element, delta: number) => {
  if (el.scrollTop === 0 && delta < 0) return true
  return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0
}

export const noScrollableParent = (event: WheelEvent, content: Element | undefined) => {
  const path = composedPath(event)
  const delta = event.deltaY

  for (let index = 0; index < path.length; index++) {
    const el = path[index]

    if (el === document) return true
    if (el === document.documentElement) return true
    if (el === content) return true

    if (hasScrollbar(el as Element)) return shouldScroll(el as Element, delta)
  }

  return true
}
