import { Content } from './types'

function decomposition(data: string[]) {
  if (!data.length) return

  const decomposition = {}

  data.forEach(str => {
    const splited = str.split(':')
    const type = splited[0].trim()
    const content = splited[1].trim()

    if (type === 'title' || type === 'tags' || type === 'path') {
      if (type === 'tags') {
        decomposition[type] = eval(content)
      } else {
        decomposition[type] = content
      }
    }
  })

  return decomposition
}

function extractWithTag(data, toJSON = false): any {
  if (!data.length) return

  const extract = {}
  const notArray: Array<Content> = data.filter(
    (content: Content) => typeof content.tags === 'string'
  )

  notArray.forEach(
    (content: Content): void => {
      content.tags = [content.tags] as string[]
    }
  )

  data.forEach((content: Content) => {
    ;(content.tags as string[]).forEach(tag => {
      if (!extract.hasOwnProperty(tag)) {
        extract[tag] = { name: tag, data: [] }
        extract[tag].data = [{ title: content.title, path: content.path }]
      } else {
        extract[tag].data.push({ title: content.title, path: content.path })
      }
    })
  })

  return toJSON ? JSON.stringify(extract, null, 2) : extract
}

export { decomposition, extractWithTag }
