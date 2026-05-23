import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const resolve = (str: string) => path.resolve(__dirname, '../', str)

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: resolve('src/index.ts'),
      name: 'GitartVueDialog',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es')
          return 'index.mjs'

        return 'index.cjs'
      },
    },

    rollupOptions: {
      external: ['vue', 'gitart-manage-vue-dialog'],
    },
  },
})
