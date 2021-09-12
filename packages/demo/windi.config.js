// windi.config.js
import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

export default defineConfig({
  attributify: true,
  extract: {
    exclude: [
      'node_modules/**/*',
      '.git/**/*',
    ],
  },

  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        'h1': {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.semibold'),
        },
        'h2': {
          fontSize: theme('fontSize.2xl'),
          fontWeight: theme('fontWeight.semibold'),
        },
        'h3': {
          fontSize: theme('fontSize.xl'),
          fontWeight: theme('fontWeight.semibold'),
        },
        'h4': {
          fontSize: theme('fontSize.lg'),
          fontWeight: theme('fontWeight.medium'),
        },
        'h5': {
          fontSize: theme('fontSize.md'),
          fontWeight: theme('fontWeight.medium'),
        },
        'a': {
          textDecoration: 'underline',
        },
        'a:hover': {
          textDecoration: 'none',
        },
      })
    }),
  ],
})