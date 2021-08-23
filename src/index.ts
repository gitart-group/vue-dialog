import './scss/main.scss'

// standalone component
export { default as GDialog } from './components/GDialog.vue'

// using plugin
export * from './types/Plugin'

export { default as GDialogRoot } from './components/GDialogRoot.vue'

export {
  plugin, dialogInjectionKey,
} from './plugin'
