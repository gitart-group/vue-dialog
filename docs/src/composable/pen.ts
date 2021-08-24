import { useAsyncState } from '@vueuse/core'

const parseTemplate = (target: string, template: string): string => {
  const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
  const regex = new RegExp(string, 'g')
  const parsed = regex.exec(template) || []

  return parsed[1] || ''
}

export const usePen = (file: string) => {
  const { state } = useAsyncState(async () => {
    const { default: res } = await import(`../components/Examples/${file}.vue?raw`)

    const template = parseTemplate('template', res)

    return {
      template,
    }
  }, null)

  return state
}

// boot (res) {
//   console.log('🚀 ~ file: Example.vue ~ line 54 ~ boot ~ this.parseTemplate(\'template\', res)', this.parseTemplate('template', res))

//   // const template = this.parseTemplate('template', res)
//   // const style = this.parseTemplate('style', res)
//   // const script = this.parseTemplate('script', res)
//   // const codepenResources = this.parseTemplate('codepen-resources', res)
//   // const codepenAdditional = this.parseTemplate('codepen-additional', res)

//   // this.pen = {
//   //   template,
//   //   style,
//   //   script,
//   //   codepenResources,
//   //   codepenAdditional,
//   // }
// },

// parseTemplate (target, template) {
//   const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
//   const regex = new RegExp(string, 'g')
//   const parsed = regex.exec(template) || []

//   return parsed[1] || ''
// },

// data: () => ({ component: undefined }),

// created () {
//   this.load()
// },

// methods: {
//   async load () {
//     let component = {}

//     try {
//       const res = await import(`../Examples/${this.file}.vue?raw`)

//     } catch (err) {
//       console.warn(err)
//     }

//     this.component = component.default
//   },
// },