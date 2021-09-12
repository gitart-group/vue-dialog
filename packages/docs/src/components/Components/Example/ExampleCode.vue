<template>
  <div v-if="vissible">
    <UiTabBar
      v-model="active"
      align="start"
    >
      <UiTab
        v-for="({language, label}) in sections"
        :key="language"
        min-width
      >
        {{ label }}
      </UiTab>
    </UiTabBar>

    <Markup
      :code="activeSection.code"
      :language="activeSection.language"
    />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, ref,
} from 'vue'

import Markup from '@/components/Components/Code/Markup.vue'
import { IPen } from '@/composable/pen'

export default defineComponent({
  name: 'ExampleCode',
  components: {
    Markup,
  },

  props: {
    pen: {
      type: Object as PropType<IPen>,
      required: true,
    },

    vissible: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {
    interface ISection {
      label: string
      code: string
      language: string
    }

    const sections: ISection[] = []

    if(props.pen.template) {
      sections.push({
        label: 'Template',
        code: props.pen.template,
        language: 'html',
      })
    }

    if(props.pen.script) {
      sections.push({
        label: 'Script',
        code: props.pen.script,
        language: 'js',
      })
    }

    if(props.pen.style) {
      sections.push({
        label: 'Style',
        code: props.pen.style,
        language: 'html',
      })
    }

    const active = ref(0)
    const activeSection = computed(() => sections[active.value])

    return {
      sections,
      active,
      activeSection,
    }

  },
})
</script>
