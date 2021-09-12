/*eslint-env node*/
import path from 'path'
import { defineConfig, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

const resolve = (str: string) => path.resolve(__dirname, str)

export default ({ mode }: { mode: 'production'| 'development' }): UserConfigExport => defineConfig({
  root: resolve('.'),
  base: mode === 'production'
    ? '/gitart-vue-dialog/'
    : '/',

  plugins: [
    vue(),
    WindiCSS(),
  ],

  server: {
    fs: {
      strict: false,
      allow: [resolve('..')],
    },
  },

  resolve: {
    alias: {
      'gitart-vue-dialog': resolve('../src/index.ts'),
    },
  },

  build: {
    sourcemap: true,
  },
})