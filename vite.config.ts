import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const resolvePath = (str: string) => path.resolve(__dirname, str)

export default defineConfig({
  plugins: [vue()],
  server: {
    fs: {
      allow: ['..'],
    },
  },
  resolve: {
    alias: {
      '@': resolvePath('/src'),
    },
  },
  build: {
    lib: {
      entry: resolvePath('src/index.ts'),
      name: 'index',
      fileName: format => {
        switch (format) {
          case 'es':
            return 'index.js'

          case 'umd':
            return 'server.js'

          default:
            return `index.${format}.js`
        }
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
