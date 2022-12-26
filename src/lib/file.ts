import  fs from 'node:fs'
import glob from 'glob'
import { __POSTS_DIR__, __POSTS_PATTERN__ } from './constants'
import { getFileLocalRoute } from './route'

export function readPosts() {
  return glob
    .sync(__POSTS_PATTERN__)
    .map(post => post.replace(__POSTS_DIR__, '').replace('.md', ''))
}

/**
 * @param {string} route /algorithm..., /some-post-route
 */
export function getMarkdown(route: string): string | undefined {
  return fs.readFileSync(getFileLocalRoute(route), 'utf8')
}
