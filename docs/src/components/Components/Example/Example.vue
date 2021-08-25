<template>
  <div class="code-example">
    <ExampleToolbar @toggleCode="onToggleCode" />

    <ExampleCode
      v-if="pen"
      :pen="pen"
      :vissible="isCodeVissible"
    />

    <ExampleComponent :file="file" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { usePen } from '@/composable/pen'

import ExampleToolbar from './ExampleToolbar.vue'
import ExampleCode from './ExampleCode.vue'
import ExampleComponent from './ExampleComponent.vue'

export default defineComponent({
  name: 'Example',
  components: {
    ExampleToolbar,
    ExampleCode,
    ExampleComponent,
  },

  props: {
    file: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const pen = usePen(props.file)

    const isCodeVissible = ref(false)
    const onToggleCode = () => {
      isCodeVissible.value = !isCodeVissible.value
    }

    return {
      pen,
      onToggleCode,
      isCodeVissible,
    }
  },
})
</script>

<style lang="scss">
.code-example {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  overflow: hidden;
}
</style>