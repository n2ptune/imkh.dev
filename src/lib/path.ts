import path from 'node:path'

export function getFileLocalRoute(route: string, post = true): string {
  const searchRoute = post ? '../../content/posts' : '../../content/notes'
  const fullPath = path.join(__dirname, searchRoute, route + '.md')
  return fullPath
}
