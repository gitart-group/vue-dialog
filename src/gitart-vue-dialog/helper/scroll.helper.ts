import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

export const getScrollbarWidth = () => {
  const container = document.createElement('div')
  container.style.visibility = 'hidden'
  container.style.overflow = 'scroll'
  const inner = document.createElement('div')

  container.appendChild(inner)
  document.body.appendChild(container)
  const scrollbarWidth = container.offsetWidth - inner.offsetWidth
  document.body.removeChild(container)

  return scrollbarWidth
}

/**
 *
 * @param {boolean} hideScroll
 */
const disableScroll = (hideScroll = false) => {
  if (hideScroll) {
    const scrollWidth = getScrollbarWidth()
    disableBodyScroll(document.body)
    if (scrollWidth > 0) {
      document.body.style.paddingRight = scrollWidth + 'px'
    }
  } else {
    disableBodyScroll(document.body)
  }
}

const enableScroll = () => {
  enableBodyScroll(document.body)
  document.body.style.paddingRight = '0'
}

export default {
  getScrollbarWidth,
  disableScroll,
  enableScroll,
}
