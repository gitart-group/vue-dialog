// windi.config.js
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  attributify: true,
  extract: {
    exclude: [
      'node_modules/**/*',
      '.git/**/*',
    ],
  },
})