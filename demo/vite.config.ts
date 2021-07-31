import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

export default ({ mode }: { mode: 'production'| 'development' }) => {
  const dialogPlugin = mode === 'development'
    ? path.resolve(__dirname, '../dist/index.js')
    : 'gitart-vue-dialog'

  const dialogPluginCss = mode === 'development'
    ? path.resolve(__dirname, '../dist/style.css')
    : 'gitart-vue-dialog/dist/style.css'

  return defineConfig({
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
        allow: [path.resolve(__dirname, '../')],
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src'),
        'plugin': dialogPlugin,
        'plugin-css': dialogPluginCss,
      },
    },

    build: {
      sourcemap: true,
    },
  })}