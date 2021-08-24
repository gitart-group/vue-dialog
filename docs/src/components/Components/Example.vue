<template>
  <div class="code-example">
    <div v-if="pen && pen.template">
      <Markup
        :code="pen.template"
        language="html"
      />
    </div>

    <div class="code-example__component">
      <VueFile :file="file" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePen } from '../../composable/pen'
import VueFile from './VueFile.vue'
import Markup from './Markup.vue'

export default defineComponent({
  name: 'Example',
  components: {
    VueFile,
    Markup,
  },

  props: {
    file: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const pen = usePen(props.file)

    return {
      pen,
    }
  },
})
</script>

<style lang="scss">
.code-example {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  overflow: hidden;

  &__component {
    padding: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }
}
</style>