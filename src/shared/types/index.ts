import type { PageCollectionItemBase, PostCollectionItem } from '@nuxt/content'

export type PostMeta = {
  cover_image: string | null
  date: string
  published: boolean
  tags: string[]
}

export interface CustomPostCollectionItem extends PageCollectionItemBase {
  meta: PostMeta
}

export type SortOption = 'latest' | 'name'
