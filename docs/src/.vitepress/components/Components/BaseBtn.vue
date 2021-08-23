<template>
  <button
    class="base-btn"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Btn',
}
</script>

<style lang="scss">
.base-btn {
  cursor: pointer;
  display: inline-block;
  border-radius: 6px;
  padding: 0 20px;
  line-height: 44px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--c-bg);
  background-color: var(--c-brand);
  border: 2px solid var(--c-brand);
  transition: background-color 0.1s ease;
  outline: none !important;

  &:hover {
    text-decoration: none;
    color: var(--c-bg);
    background-color: var(--c-brand-light);
  }
}
</style>