import { resolve } from 'path'
import { readDirFromPath, readFileFromPath } from './reader'
import { decomposition, extractWithTag } from './decomposition'

const rootPath = resolve(__dirname, '../../')
const contentPath = resolve(rootPath, 'content', 'posts')

// Read all *.md files
const contents = readDirFromPath(contentPath, '.md')

const result = []

for (const content of contents) {
  const des = decomposition(readFileFromPath(resolve(contentPath, content)))

  result.push(des)
}

console.log(extractWithTag(result, true))
