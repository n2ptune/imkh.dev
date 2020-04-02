// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const siteUrl = 'https://blog.n2ptune.xyz'

module.exports = {
  siteName: `I Don't Know Web`,
  siteDescription: 'Personal blog for Web Dev/Tech',
  siteUrl,
  port: 4001,

  templates: {
    /**
     * @templates 정적 페이지 경로를 만들어내기 위한 메타데이터 같은 느낌
     * src/templates/*.vue 의 이름과 동일해야 할듯
     */
    Post: '/:title',
    Tag: '/tag/:id'
  },

  plugins: [
    /**
     * @markdown 로컬 파일을 기준으로 데이터를 읽어들이기 위한 플러그인 설치
     */
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          /**
           * @GraphQL 태그를 GraphQL Collection으로 만든다고 함
           */
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
        /**
         * @default
         */
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

  /**
   * @markdown 마크다운을 읽어들이기 위한 플러그인
   */
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
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
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(
          ...[
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
                ],
                whitelist: ['svg-inline--fa'],
                whitelistPatterns: [/shiki/, /fa-$/]
              })
            ]
          )
        }

        return options
      })
  }
}
