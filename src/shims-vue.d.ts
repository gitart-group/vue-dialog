declare module '*.vue' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  import { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}
