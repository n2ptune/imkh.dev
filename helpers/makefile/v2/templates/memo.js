const memoTemplate = [
  { key: 'title' },
  { key: 'date', value: () => new Date().toISOString() },
  { key: 'description' }
]

export default memoTemplate
