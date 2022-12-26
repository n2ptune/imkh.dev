import { glob } from 'glob'
import { __POSTS_DIR__, __POSTS_PATTERN__ } from './constants'

export function readPosts() {
  return glob
    .sync(__POSTS_PATTERN__)
    .map(post => post.replace(__POSTS_DIR__, '').replace('.md', ''))
}
