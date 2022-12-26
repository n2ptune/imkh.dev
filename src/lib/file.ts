import fs from 'node:fs/promises'
import { getFileLocalRoute } from './path'

/**
 * @param {string} route /algorithm..., /some-post-route
 */
export function getMarkdown(route: string): Promise<string> {
  return fs.readFile(getFileLocalRoute(route), 'utf8')
}
