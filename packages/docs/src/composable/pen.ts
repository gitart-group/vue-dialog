/**
 * Composable to extract partitions (template, script, style) from the vue component
 */

import { Ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { imports } from '@/imports'

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
  const { state } = useAsyncState(async() => {
    try {
      const { raw } = (await imports[file]()) as { raw: string }

      const template = parseTemplate('template', raw)
      const script = parseTemplate('script', raw)
      const style = parseTemplate('style', raw)

      return {
        template,
        script,
        style,
      }
    } catch (error) {
      console.warn(`Example component "${file}" not found`)
      return null
    }
  }, null)

  return state
}
