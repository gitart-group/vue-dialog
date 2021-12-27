import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const resolve = (str: string) => path.resolve(__dirname, '../', str)

export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    fs: {
      allow: ['..'],
    },
  },
  build: {
    lib: {
      entry: resolve('src/index.ts'),
      name: 'index',
      fileName: (format) => {
        let fileEnd = 'js'

        if (format === 'es')
          fileEnd = 'mjs'

        else if (format === 'umd')
          fileEnd = 'cjs'

        return `index.${fileEnd}`
      },
    },

    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
