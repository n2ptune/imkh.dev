import { writeFileSync, readFileSync } from 'fs'
import { startLine, endLine } from './meta'
import { rootPath } from './path'

function generate(context: object): void {
  const readme = readFileSync(rootPath + '/README.md', 'utf8')
  const [s, e] = [readme.search(startLine), readme.search(endLine)]
  console.log(readme.substring(s, e))

  let result = ''

  for (const key in context) {
    const mark = [generateTitleMarkup(context[key].name)]
    context[key].data.forEach(post =>
      mark.push(generateMarkup(post.title, post.path))
    )

    mark.push('\n')
    mark.splice(1, 0, '\n')

    result += mark.join('\n')
  }

  console.log(result)
}

function generateTitleMarkup(title: string) {
  return `### ${title}`
}

function generateMarkup(title: string, path: string) {
  return `- <a href="${path}">${title}</a>`
}

export { generate }
