import { computed, ComputedRef } from 'vue'

// helpers
import { convertToUnit } from '../helper'

export interface UseSizeStyleProps {
  maxWidth?: number | string
  width?: number | string
  height?: number | string
}

type UseSizeStyleReturnType = {
  sizeStyles: ComputedRef<{
    maxWidth: string | undefined;
    width: string | undefined;
    height: string | undefined;
  }>
}

export const useSizeStyle = (props: UseSizeStyleProps): UseSizeStyleReturnType => {
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
