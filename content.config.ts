import { defineCollection, defineContentConfig } from '@nuxt/content'
import * as path from 'node:path'

export default defineContentConfig({
  collections: {
    post: defineCollection({
      type: 'page',
      source: {
        cwd: path.resolve(__dirname, 'contents/posts'),
        include: '**/*.md',
        prefix: '/'
      }
    }),
    short: defineCollection({
      type: 'page',
      source: {
        cwd: path.resolve(__dirname, 'contents/note'),
        include: '**/*.md',
        prefix: '/s'
      }
    })
  }
})
