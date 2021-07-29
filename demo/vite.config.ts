import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
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
