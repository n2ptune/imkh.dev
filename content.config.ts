import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import * as path from 'node:path'

export default defineContentConfig({
  collections: {
    post: defineCollection({
      type: 'page',
      source: {
        cwd: path.resolve(__dirname, 'contents/posts'),
        include: '**/*.md',
        prefix: '/'
      },
      schema: z.object({
        published: z.boolean(),
        tags: z.array(z.string()),
        cover_image: z.string(),
        date: z.string()
      })
    }),
    short: defineCollection({
      type: 'page',
      source: {
        cwd: path.resolve(__dirname, 'contents/note'),
        include: '**/*.md',
        prefix: '/s'
      }
    }),
    tag: defineCollection({
      type: 'data',
      source: {
        cwd: path.resolve(__dirname, 'contents/tags'),
        include: 'collection.yaml'
      },
      schema: z.object({
        tags: z.record(
          z.string(),
          z.object({
            label: z.string(),
            description: z.string()
          })
        )
      })
    })
  }
})
