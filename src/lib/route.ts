import { __POSTS_DIR__, __POSTS_PATTERN__ } from './constants'
import { readPosts } from './posts'

function getDefaultRoutes(): string[] {
  return ['/']
}

export function shouldRenderAllRoutes(): string[] {
  const postRoutes = readPosts()
  const defaultRoutes = getDefaultRoutes()
  // const tagRoutes = getTagRoutes()

  return [...postRoutes, ...defaultRoutes]
}
