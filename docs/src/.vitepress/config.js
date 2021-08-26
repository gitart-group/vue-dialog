/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const mdContainerPlugin = require('markdown-it-container')

console.log('🚀 ~ file: config.js ~ line 4 ~ mdContainerPlugin', mdContainerPlugin)

module.exports = {
  vite: {
    server: {
      port: 3001,
      fs: {
        strict: false,
        allow: [path.resolve(__dirname, '../')],
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../'),
      },
    },
  },

  title: 'Gitart Vue Dialog',
  description: 'Documentaion for Gitart Vue Dialog. Docs',
  lang: 'en-US',

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],

  markdown: {
    config: md => {

      /**
       * ::: vue-slot composition
       * CONTENT
       * :::
       */
      md.use(mdContainerPlugin, 'vue-slot', {
        render(tokens, idx) {
          const token = tokens[idx]

          if (token.nesting === 1) {
            const slotName = token.info.split(' ')[2]

            return `<template #${slotName}>`
          }

          return '</template>'
        },
      })

      /**
       * ))) method-switch
       *
       * ::: vue-slot composition
       * CONTENT
       * :::
       * ::: vue-slot option
       * CONTENT
       * :::
       *
       * )))
       */
      md.use(mdContainerPlugin, 'method-switch', {
        marker: ')',
        render(tokens, idx) {
          const token = tokens[idx]

          if (token.nesting === 1) {
            return '<MethodSwitch>'
          }

          return '</MethodSwitch>'
        },
      })
    },
  },

  themeConfig: {
    lastUpdated: 'Last Updated',
    displayAllHeaders: true,
    activeHeaderLinks: false,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/introduction/getting-started' },
      {
        text: 'npm',
        link: 'https://www.npmjs.com/package/gitart-vue-dialog',
        target: '_blank',
        rel: false,
      },
      {
        text: 'Github',
        link: 'https://github.com/MichaelGitArt/gitart-vue-dialog',
        target: '_blank',
        rel: false,
      },
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/': getGuideSidebar(),
    },
  },
}

function getGuideSidebar() {
  return [
    {
      text: 'Introduction',
      children: [
        { text: 'Getting Started', link: '/docs/introduction/getting-started' },
        { text: 'Usage Types', link: '/docs/introduction/usage-types' },
      ],
    },

    {
      text: 'Guide',
      children: [
        { text: 'Component Usage', link: '/docs/guide/component-usage' },
        { text: 'Plugin Usage', link: '/docs/guide/plugin-usage' },
        { text: 'Properties', link: '/docs/guide/properties' },
      ],
    },

    {
      text: 'Components',
      children: [
        { text: 'GDialog', link: '/docs/components/g-dialog' },
        { text: 'GDialogRoot', link: '/docs/components/g-dialog-root' },
      ],
    },
  ]
}
