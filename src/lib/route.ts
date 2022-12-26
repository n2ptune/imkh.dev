import { readPosts } from './file'
import path from 'node:path'

function getDefaultRoutes(): string[] {
  return ['/']
}

export function getFileLocalRoute(route: string, post = true): string {
  const searchRoute = post ? '../../content/posts' : '../../content/notes'
  const fullPath = path.join(__dirname, searchRoute, route + '.md')
  return fullPath
}

export function shouldRenderAllRoutes(): string[] {
  const postRoutes = readPosts()
  const defaultRoutes = getDefaultRoutes()
  // const tagRoutes = getTagRoutes()

  return [...postRoutes, ...defaultRoutes]
}
