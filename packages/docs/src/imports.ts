/* eslint-disable @typescript-eslint/no-explicit-any */
export const imports = {
  async 'Introduction/GettingStartedExample'() {
    return {
      component: (await import('./components/Examples/Introduction/GettingStartedExample.vue')).default,
      raw: (await import('./components/Examples/Introduction/GettingStartedExample.vue?raw')).default,
    }
  },

  async 'Introduction/GettingStartedExampleStyled'() {
    return {
      component: (await import('./components/Examples/Introduction/GettingStartedExampleStyled.vue')).default,
      raw: (await import('./components/Examples/Introduction/GettingStartedExampleStyled.vue?raw')).default,
    }
  },

  async 'Guide/UsageActivatorExample'() {
    return {
      component: (await import('./components/Examples/Guide/UsageActivatorExample.vue')).default,
      raw: (await import('./components/Examples/Guide/UsageActivatorExample.vue?raw')).default,
    }
  },

  async 'Guide/UsageFullscreenExample'() {
    return {
      component: (await import('./components/Examples/Guide/UsageFullscreenExample.vue')).default,
      raw: (await import('./components/Examples/Guide/UsageFullscreenExample.vue?raw')).default,
    }
  },

  async 'Guide/UsageTransitionExample'() {
    return {
      component: (await import('./components/Examples/Guide/UsageTransitionExample.vue')).default,
      raw: (await import('./components/Examples/Guide/UsageTransitionExample.vue?raw')).default,
    }
  },

  async 'Guide/UsagePersistentExample'() {
    return {
      component: (await import('./components/Examples/Guide/UsagePersistentExample.vue')).default,
      raw: (await import('./components/Examples/Guide/UsagePersistentExample.vue?raw')).default,
    }
  },

  async 'Guide/UsageScrollableExample'() {
    return {
      component: (await import('./components/Examples/Guide/UsageScrollableExample.vue')).default,
      raw: (await import('./components/Examples/Guide/UsageScrollableExample.vue?raw')).default,
    }
  },
} as any