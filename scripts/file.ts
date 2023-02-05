import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const postPath = resolve(__dirname, '../content/posts')
const postDir = readdirSync(postPath)

export function getBaseRoutes(): string[] {
  return ['/']
}

export function getGenerateRoutes(): string[] {
  return postDir.map(file => {
    const routeName =
      '/' + (file.endsWith('.md') ? file.slice(0, file.length - 3) : file)
    return routeName
  })
}
