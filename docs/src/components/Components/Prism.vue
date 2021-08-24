<script lang="ts">
import { h, defineComponent, toRefs } from 'vue'
import Prism from 'prismjs'

export default defineComponent({
  props: {
    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      default: 'markup',
    },
  },
  setup(props, { attrs }) {
    const { language, code } = toRefs(props)

    const prismLanguage = Prism.languages[language.value]
    const className = `language-${language.value}`

    if (!prismLanguage) {
      console.warn(`Prism component for language "${language.value}" was not found, did you forget to register it?`)
    }
    return () => h(
      'pre',
      {
        ...attrs,
        class: [attrs.class, className],
      },
      [
        h('code', {
          ...attrs,
          class: [attrs.class, className],
          innerHTML: Prism.highlight(code.value, prismLanguage),
        }),
      ],
    )
  },
})
</script>
