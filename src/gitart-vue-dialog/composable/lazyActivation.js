import { nextTick, ref, watch } from 'vue';

export const useLazyActivation = baseState => {
  const activatedOnce = ref(baseState.value);
  const active = ref(baseState.value);

  watch(
    () => baseState.value,
    value => {
      if (activatedOnce.value) {
        active.value = value;
        return;
      }

      activatedOnce.value = true;
      nextTick(() => {
        active.value = value;
      });
    }
  );

  return {
    activatedOnce,
    active,
  };
};
