/**
 * Composable to extract partitions (template, script, style) from the vue component
 */

import { Ref } from 'vue'
import { useAsyncState } from '@vueuse/core'

export interface IPen {
  template: string
  script: string
  style: string
}

const parseTemplate = (target: string, template: string): string => {
  const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
  const regex = new RegExp(string, 'g')
  const parsed = regex.exec(template) || []

  return parsed[1] || ''
}

export const usePen = (file: string): Ref<IPen | null> => {
  const { state } = useAsyncState(async () => {
    const { default: res } = await import(`../components/Examples/${file}.vue?raw`)

    const template = parseTemplate('template', res)
    const script = parseTemplate('script', res)
    const style = parseTemplate('style', res)

    return {
      template,
      script,
      style,
    }
  }, null)

  return state
}
