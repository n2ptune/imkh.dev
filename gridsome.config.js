// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const siteUrl = 'https://imkh.dev'

module.exports = {
  siteName: `>_`,
  siteDescription: 'Personal blog for Web Dev/Tech',
  siteUrl,
  port: 8000,

  templates: {
    Post: [
      {
        path: node => `/${node.fileInfo.name}`
      }
    ],
    Tag: '/tag/:id',
    Note: [
      {
        path: node => `/note/${node.fileInfo.name}`
      }
    ]
  },

  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Note',
        path: 'content/note/*.md'
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-158765885-1'
      }
    },
    {
      use: '@microflash/gridsome-plugin-feed',
      options: {
        contentTypes: ['Post'],
        feedOptions: {
          title: 'n2ptune Dev Blog',
          description: 'Personal Web Tech/Dev Blog',
          id: siteUrl,
          link: siteUrl,
          language: 'ko',
          copyright: 'All rights reserved 2022, n2ptune',
          feedLinks: {
            rss: siteUrl + '/rss.xml'
          }
        },
        rss: {
          enabled: true,
          output: '/rss.xml'
        },
        nodeToFeedItem: node => ({
          title: node.title,
          description: node.description,
          date: node.date,
          url: siteUrl + node.path,
          author: 'n2ptune'
        })
      }
    }
  ],

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      autolinkHeadings: true,
      plugins: [
        ['@gridsome/remark-prismjs'],
        [
          '@noxify/gridsome-plugin-remark-embed',
          {
            enabledProviders: ['Codepen'],
            Codepen: {
              height: 500
            }
          }
        ]
      ]
    }
  },

  css: {
    split: true
  },

  chainWebpack: config => {
    config.module
      .rule('postcss')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(
          ...[
            // require('postcss-for'),
            // require('postcss-simple-vars'),
            require('postcss-import'),
            require('postcss-nested'),
            require('cssnano'),
            require('tailwindcss'),
            require('postcss-simple-vars')
          ]
        )

        return options
      })

    config.plugins.delete('prefetch')
  }
}
