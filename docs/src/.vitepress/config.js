module.exports = {
  title: "Gitart Vue Dialog",
  description: "Documentaion for Gitart Vue Dialog. Docs",
  lang: "en-US",
  vite: {
    server: {
      port: 3001,
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  
  themeConfig: {
    lastUpdated: "Last Updated",
    displayAllHeaders: true,
    activeHeaderLinks: false,

    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
      {
        text: "npm",
        link: "https://www.npmjs.com/package/gitart-vue-dialog",
        target: "_blank",
        rel: false,
      },
      {
        text: "Github",
        link: "https://github.com/MichaelGitArt/gitart-vue-dialog",
        target: "_blank",
        rel: false,
      },
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/': getGuideSidebar(),
    },
  },
};

function getGuideSidebar() {
  return [
    {
      text: 'Introduction',
      children: [
        { text: 'Getting Started', link: '/guide/' },
      ]
    },
    // {
    //   text: 'Guide',
    //   children: [
    //     { text: 'Chapter One', link: '/guide/getting-start' },
    //     { text: 'Chapter two', link: '/guide/two' },
    //     { text: 'API', link: '/api/' },
    //   ]
    // },
    // {
    //   text: 'Advanced',
    //   children: [
    //     { text: 'Frontmatter', link: '/guide/frontmatter' },
    //     { text: 'Global Computed', link: '/guide/global-computed' },
    //     { text: 'Global Component', link: '/guide/global-component' },
    //     { text: 'Customization', link: '/guide/customization' },
    //     {
    //       text: 'Differences from Vuepress',
    //       link: '/guide/differences-from-vuepress'
    //     }
    //   ]
    // },
    {
      text: 'API',
      link: '/api/'
    },
  ]
}