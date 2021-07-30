import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

export default ({ mode }: { mode: 'production'| 'development' }) => defineConfig({
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
      allow: ['../'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      'plugin': path.resolve(__dirname, '../dist'),
    },
  },
})