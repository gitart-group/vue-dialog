<template>
  <div>
    <Component
      :is="component"
      v-if="component"
      v-bind="{
        ...$attrs,
      }"
    />
  </div>
</template>

<script>
import { defineComponent, shallowRef } from 'vue'

export default defineComponent({
  name: 'Example',
  props: {
    file: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    component: null,
  }),

  created() {
    this.load()
  },

  methods: {
    async load() {
      try {
        const res = await import(`../Examples/${this.file}.vue`)
        console.log('🚀 ~ file: Example.vue ~ line 38 ~ load ~ res2', res2)

        this.component = shallowRef(res.default)
      } catch (error) {
        console.log('🚀 ~ file: Example.vue ~ line 32 ~ load ~ error', error)
      }
    },
  },
})
</script>
