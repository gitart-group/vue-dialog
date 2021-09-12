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
} as any