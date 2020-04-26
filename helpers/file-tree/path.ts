import { resolve } from 'path'

export const rootPath = resolve(__dirname, '../../')
export const contentPath = resolve(rootPath, 'content', 'posts')
export const filePath = (fileName: string): string =>
  resolve(contentPath, fileName)
