// @flow

export type Template = {
  key: string,
  value?: boolean | (() => string)
}

const postTemplate: Template[] = [
  { key: 'title' },
  { key: 'date', value: (): string => new Date().toISOString() },
  { key: 'published', value: true },
  { key: 'tags' },
  { key: 'cover_image' },
  { key: 'description' }
]

export default postTemplate
