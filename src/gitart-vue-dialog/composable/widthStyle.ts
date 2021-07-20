import { computed } from 'vue'

// helpers
import { convertToUnit } from '@/gitart-vue-dialog/helper'

export interface WidthProps {
  maxWidth?: number | string
  width?: number | string
}

export const useWidthStyle = (props: WidthProps) => {
  const widthStyles = computed(() => {
    return {
      maxWidth:
        props.maxWidth === 'none'
          ? undefined
          : convertToUnit(props.maxWidth),

      width:
        props.width === 'auto'
          ? undefined
          : convertToUnit(props.width),
    }
  })

  return {
    widthStyles,
  }
}
