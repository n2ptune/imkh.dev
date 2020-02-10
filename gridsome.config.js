// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
module.exports = {
  siteName: `I Don't Know Web`,
  siteDescription: 'Personal blog for Web Dev/Tech',
  siteUrl: '',

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
    }
  ],

  /**
   * @markdown 마크다운을 읽어들이기 위한 플러그인
   */
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: ['@gridsome/remark-prismjs']
    }
  }
}
