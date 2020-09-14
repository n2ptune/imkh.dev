// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const siteUrl = 'https://imkh.dev'

module.exports = {
  siteName: `imkh.dev`,
  siteDescription: 'Personal blog for Web Dev/Tech',
  siteUrl,
  port: 4001,

  templates: {
    Post: '/:title',
    Tag: '/tag/:id'
  },

  plugins: [
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        collections: [
          {
            typeName: 'Post',
            indexName: 'id',
            fields: ['title', 'tags', 'description']
          }
        ],
        searchFields: ['title']
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
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js'
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
          copyright: 'All rights reserved 2020, n2ptune',
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
      autolinkHeadings: false,
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
            require('postcss-for'),
            require('postcss-simple-vars'),
            require('postcss-import'),
            require('postcss-nested'),
            require('tailwindcss')
          ]
        )

        if (process.env.NODE_ENV === 'production') {
          options.plugins.push(
            ...[
              require('@fullhuman/postcss-purgecss')({
                content: [
                  'src/assets/**/*.css',
                  'src/styles/**/*.css',
                  'src/**/*.vue',
                  'src/**/*.js'
                ],
                extractors: [
                  {
                    extractor: content =>
                      content.match(/[A-Za-z0-9-_:\/]+/g) || [],
                    extensions: ['vue', 'js', 'css']
                  }
                ]
                // whitelist: ['svg-inline--fa'],
                // whitelistPatterns: [/shiki/, /fa-$/]
              })
            ]
          )
        }

        return options
      })
  }
}
