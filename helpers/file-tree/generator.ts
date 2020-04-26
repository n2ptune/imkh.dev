import { writeFileSync, readFileSync } from 'fs'
import { startLine, endLine, signature } from './meta'
import { rootPath } from './path'

function generateMarkdown(context: object, callback: Function): void {
  // Read file README.md
  const readme = readFileSync(rootPath + '/README.md', 'utf8')
  // Search startLine, endLine in README.md
  const [s, e] = [readme.search(startLine), readme.search(endLine)]

  // Check startLine and endLine
  if (!s || !e)
    callback(false, new Error("can't find signature line of start, end"))

  const startAndEnd = readme.substring(s, e + endLine.length)
  const splited = readme.split(startAndEnd)

  let result = ''

  for (const key in context) {
    const mark = [generateTitleMarkup(context[key].name)]
    context[key].data.forEach(post =>
      mark.push(generateMarkup(post.title, post.path))
    )

    mark.push('\n')
    mark.splice(1, 0, '')

    result += mark.join('\n')
  }

  result =
    splited[0] +
    startLine +
    '\n\n' +
    signature +
    '\n\n' +
    result +
    endLine +
    splited[1]

  try {
    writeFileSync(rootPath + '/README.md', result, 'utf8')
    callback(true, null)
  } catch (error) {
    callback(false, new Error(error))
  }
}

function generateTitleMarkup(title: string) {
  return `### ${title}`
}

function generateMarkup(title: string, path: string) {
  return `- <a href="${path}">${title}</a>`
}

export { generateMarkdown }
