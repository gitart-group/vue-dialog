import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue({}) as any,
    AutoImport({
      imports: ['vitest'],
      dts: 'tests/auto-imports.d.ts',
    }),
  ],
  test: {
    global: true,
    environment: 'happy-dom',
  },
})
