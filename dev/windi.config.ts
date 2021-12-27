import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

export default defineConfig({
  attributify: true,
  extract: {
    include: ['./**/*.{vue,html,jsx,tsx}'],
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.btn': {
          'backgroundColor': '#3490dc',
          'padding': '.5rem 1rem',
          'borderRadius': '.25rem',
          'color': '#fff',
          'fontWeight': '600',
          '&:hover': {
            backgroundColor: '#2779bd',
          },
        },
      })
    }),
  ],
})
