<template>
  <div class="example-toolbar">
    <UiButton
      class="example-toolbar__code-button"
      outlined
      :raised="false"
      @click="onToggleCode"
    >
      <Icon :icon-path="codeIcon" />
    </UiButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/Components/Icon.vue'

import { mdiXml } from '@mdi/js'

export default defineComponent({
  name: 'ExampleToolbar',
  components: {
    Icon,
  },

  emits: ['toggleCode'],
  setup(_, { emit }) {
    const onToggleCode = () => {
      emit('toggleCode')
    }

    return {
      codeIcon: mdiXml,
      onToggleCode,
    }
  },
})
</script>

<style lang="scss">
.example-toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 5px 12px;

  &__code-button {
    border-radius: 50%;
    padding: 0;
    width: 36px;
    min-width: 0;

    .mdc-button__label {
      display: flex;
      align-items: center;
    }

    .mdc-button__ripple {
      border-radius: inherit;
    }
  }
}
</style>