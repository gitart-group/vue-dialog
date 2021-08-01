import { Ref } from 'vue'

import { noScrollableParent } from '../helper/scroll.helper'

type ScrollParams = {
  overlay: Ref<Element | undefined>
  content: Ref<Element | undefined>
}

export const useScroll = ({
  overlay,
  content,
}: ScrollParams) => {
  let disabled = false

  const eventListener = (event: WheelEvent) => {
    if(event.target === overlay.value
    || event.target === document.body
    || noScrollableParent(event, content.value)
    ) {
      event.preventDefault()
    }
  }

  const disableScroll = () => {
    if(disabled) {
      return
    }

    window.addEventListener('wheel', eventListener, {
      passive: false,
    })
    disabled = true
  }

  const enableScroll = () => {
    if(!disabled) {
      return
    }

    window.removeEventListener('wheel', eventListener)
    disabled = false
  }

  return {
    disableScroll,
    enableScroll,
  }
}