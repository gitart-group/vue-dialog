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

export const disableScroll = (hideScrollbar = false) => {
  if (hideScrollbar) {
    disableBodyScroll(document.body)
  } else {
    const scrollWidth = getScrollbarWidth()
    disableBodyScroll(document.body)
    if (scrollWidth > 0) {
      document.body.style.paddingRight = scrollWidth + 'px'
    }
  }
}

export const enableScroll = () => {
  enableBodyScroll(document.body)
  document.body.style.paddingRight = '0'
}
