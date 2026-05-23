import { createApp, defineComponent } from 'vue'

describe('plugin module', () => {
  afterEach(() => {
    vi.resetModules()
  })

  it('keeps the dialog injection key stable across module reloads', async() => {
    vi.resetModules()
    const first = await import('../../src/plugin')

    const app = createApp(defineComponent({
      render: () => null,
    }))
    app.use(first.plugin)

    expect(app._context.provides[first.dialogInjectionKey]).toBeDefined()

    vi.resetModules()
    const second = await import('../../src/plugin')

    expect(second.dialogInjectionKey).toBe(first.dialogInjectionKey)
    expect(app._context.provides[second.dialogInjectionKey]).toBeDefined()
  })
})
