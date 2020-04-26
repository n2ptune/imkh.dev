import { contentPath, filePath } from './path'
import { readDirFromPath, readFileFromPath } from './reader'
import { decomposition, extractWithTag } from './decomposition'
import { generateMarkdown } from './generator'

// Read all *.md files
const contents = readDirFromPath(contentPath, '.md')

const result = []

for (const content of contents) {
  const des = decomposition(readFileFromPath(filePath(content)))

  result.push(des)
}

// console.log(extractWithTag(result, false))
generateMarkdown(extractWithTag(result, false))
