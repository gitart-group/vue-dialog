import { computed } from 'vue'

// helpers
import { convertToUnit } from '../helper'

export interface SizeProps {
  maxWidth?: number | string
  width?: number | string
  height?: number | string
}

export const useSizeStyle = (props: SizeProps) => {
  const sizeStyles = computed(() => ({
    maxWidth:
        props.maxWidth === 'none'
          ? undefined
          : convertToUnit(props.maxWidth),

    width:
        props.width === 'auto'
          ? undefined
          : convertToUnit(props.width),

    height:
        props.height === 'auto'
          ? undefined
          : convertToUnit(props.height),
  }))

  return {
    sizeStyles,
  }
}
