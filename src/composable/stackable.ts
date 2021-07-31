import {
  computed, Ref, ComputedRef,
} from 'vue'

// helpers
import { getZIndex } from '../helper'

interface IUseStackableParams {
  activeElSelector: string
  stackMinZIndex: number
  isActive: Ref<boolean>
  content: Ref<Element | null>
}

export const useStackable: (param: IUseStackableParams) => {activeZIndex: ComputedRef<number>} = ({
  activeElSelector,
  stackMinZIndex = 0,
  isActive,
  content,
}) => {
  const getMaxZIndex = (exclude: Element[] = []) => {
    const zIndexes = [stackMinZIndex]

    const activeElements = document.querySelectorAll(activeElSelector)

    for (let index = 0; index < activeElements.length; index++) {
      if(!exclude.includes(activeElements[index])) {
        zIndexes.push(getZIndex(activeElements[index]))
      }
    }

    return Math.max(...zIndexes)
  }

  const activeZIndex = computed(() => {
    if(!content.value) {
      return 0
    }

    const index = isActive.value
      ? getMaxZIndex([content.value]) + 2
      : getZIndex(content.value)

    if (index === null) {
      return 0
    }

    return index
  })

  return {
    activeZIndex,
  }
}
