<template>
  <Component
    :is="component"
    v-if="component"
  />
</template>

<script lang="ts">
import { defineComponent, Component } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { imports } from '@/imports'

export default defineComponent({
  name: 'VueFile',

  props: {
    file: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { state: component } = useAsyncState(async() => {
      try {
        const { component } = (await imports[props.file]()) as { component: Component }

        return component
      } catch (error) {
        console.warn(`Example component "${props.file}" not found`)
        return null
      }
    }, null)

    return {
      component,
    }
  },
})
</script>
