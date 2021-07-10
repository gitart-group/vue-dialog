// types
import { Ref, ComputedRef } from 'vue';

import { computed } from 'vue';
import { getZIndex } from '../helper';

interface IUseStackableParams {
  activeElSelector: string;
  stackMinZIndex: number
  isActive: Ref<boolean>;
  content: any;
} 

export const useStackable: (param: IUseStackableParams) => {activeZIndex: ComputedRef<number>} = ({
  activeElSelector,
  stackMinZIndex = 0,
  isActive,
  content,
}) => {
  const getMaxZIndex = () => {
    const zIndexes = [stackMinZIndex];

    const activeElements = document.querySelectorAll(activeElSelector);

    for (let index = 0; index < activeElements.length; index++) {
      zIndexes.push(getZIndex(activeElements[index]));
    }

    return Math.max(...zIndexes);
  };

  const activeZIndex = computed(() => {
    const index = isActive.value ? getMaxZIndex() + 2 : getZIndex(content.value);

    if (index === null) {
      // return null;
      return 0
    }

    return parseInt(index);
  });

  return {
    activeZIndex,
  };
};
