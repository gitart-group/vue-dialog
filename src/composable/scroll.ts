import { Ref } from 'vue'

import { noScrollableParent, getScrollbarWidth } from '../helper/scroll.helper'

type UseScrollParams = {
  overlay: Ref<Element | undefined>
  content: Ref<Element | undefined>
  contentActiveClass: string
  fullscreen: boolean
  contentFullscreenClass: string
}
interface UseScrollReturnType {
  disableScroll: () => void
  enableScroll: () => void
}

type UseScroll = (params: UseScrollParams) => UseScrollReturnType

export const useScroll: UseScroll = ({
  overlay,
  content,
  contentActiveClass,
  fullscreen,
  contentFullscreenClass,
}) => {
  let disabled = false
  let disableType: 'byEvents' | 'byOverflow'

  const eventListener = (event: WheelEvent) => {
    if(event.target === overlay.value
    || event.target === document.body
    || noScrollableParent(event, content.value)
    ) {
      event.preventDefault()
    }
  }

  const scrollbarWidth = getScrollbarWidth()
  const zeroScrollBar = scrollbarWidth === 0

  const disableScroll = () => {
    if(disabled) {
      return
    }

    // The mobile has the scroll bar width of 0
    // hide the scroll bar for fullscreen mode
    if (zeroScrollBar || fullscreen) {
      disableType = 'byOverflow'
      document.documentElement.classList.add('overflow-y-hidden')
    } else {
      disableType = 'byEvents'
      window.addEventListener('wheel', eventListener, {
        passive: false,
      })
    }

    disabled = true
  }

  const enableScroll = () => {
    if(!disabled) {
      return
    }

    if(disableType === 'byEvents') {
      window.removeEventListener('wheel', eventListener)
    }else if (disableType === 'byOverflow') {
      const activeContentElements = document.getElementsByClassName(contentActiveClass)
      const activeFullscreenContentElements = document.getElementsByClassName(contentFullscreenClass)

      if((!zeroScrollBar && fullscreen && activeFullscreenContentElements.length === 1) || activeContentElements.length === 1) {
        document.documentElement.classList.remove('overflow-y-hidden')
      }
    }

    disabled = false
  }

  return {
    disableScroll,
    enableScroll,
  }
}