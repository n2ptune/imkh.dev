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

generateMarkdown(
  extractWithTag(result, false),
  (completed: boolean, error: Error) => {
    if (!completed || error) {
      console.error('Something wrong...')
      throw error
    } else {
      console.log(
        '\x1b[32m%s',
        'The README.md file has been created successfully.'
      )
      console.log(
        '\x1b[31m%s\x1b[0m',
        'The file has not apply prettier so must be execute command of lint or modify directly that file.'
      )
    }
  }
)
