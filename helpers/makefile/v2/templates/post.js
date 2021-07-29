const postTemplate = [
  { key: 'title' },
  { key: 'date', value: () => new Date().toISOString() },
  { key: 'published', value: true },
  { key: 'tags' },
  { key: 'cover_image' },
  { key: 'description' }
]

export default postTemplate
