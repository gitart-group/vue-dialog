import { computed } from 'vue';
import indexHelper from '../helper/index';

export const useWidthStyle = props => {
  const widthStyles = computed(() => {
    return {
      maxWidth:
        props.maxWidth === 'none'
          ? undefined
          : indexHelper.convertToUnit(props.maxWidth),
      width:
        props.width === 'auto'
          ? undefined
          : indexHelper.convertToUnit(props.width),
    };
  });

  return {
    widthStyles,
  };
};
