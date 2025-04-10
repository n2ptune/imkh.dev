export interface PostWithTagItem {
  label: string
  stem: string
}

export type PostTagData = {
  tagName: string
  label: string
  description: string
}

export interface PostTagInfo {
  tagName: string
  tagData: PostTagData
}
