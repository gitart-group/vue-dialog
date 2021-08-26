<template>
  <div class="method-switch">
    <UiTabBar
      v-model="activeTab"
      align="start"
    >
      <UiTab
        v-for="({key, label}) in tabs"
        :key="key"
        min-width
      >
        {{ label }}
      </UiTab>
    </UiTabBar>

    <div class="method-switch__slot">
      <slot :name="activeTabKey" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MethodSwitch',

  setup() {
    const activeTab = ref(0)
    const tabs = [
      {
        label: 'Composition API',
        key: 'composition',
      },
      {
        label: 'Option API',
        key: 'option',
      },
    ]

    const activeTabKey = computed(() => tabs[activeTab.value].key)

    return {
      tabs,
      activeTab,
      activeTabKey,
    }
  },
})
</script>

<style lang="scss">
.method-switch {
  border: 1px solid rgba(0, 0, 0, 0.12);
  margin: 1em 0;
  border-radius: 6px;
  overflow: hidden;

  .language-js {
    margin: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>