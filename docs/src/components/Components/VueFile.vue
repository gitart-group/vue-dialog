<template>
  <Component
    :is="component"
    v-if="component"
  />
</template>

<script lang="ts">
import { defineComponent, Component } from 'vue'
import { useAsyncState } from '@vueuse/core'

export default defineComponent({
  name: 'VueFile',

  props: {
    file: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { state: component } = useAsyncState(async () => {
      const res = await import(`../Examples/${props.file}.vue`)
      return res.default as Component
    }, null)

    return {
      component,
    }
  },
})
</script>
