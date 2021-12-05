/*eslint-env node*/
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'

const resolve = (str: string) => path.resolve(__dirname, str)

export default defineConfig({
  root: resolve('.'),

  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'gitart-vue-dialog': [
            'dialogInjectionKey',
            ['plugin', 'dialogPlugin'],
          ],
        },
      ],
      dts: resolve('auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        (name: string) => {
          if ([
            'GDialog',
            'GDialogRoot',
          ].includes(name)) {
            return { importName: name, path: 'gitart-vue-dialog' }
          }

          return
        },
      ],
      dts: resolve('components.d.ts'),
    }),
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