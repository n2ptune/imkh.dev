const path = require('path')
const fs = require('fs')

/**
 * @get arguments(terminal), template
 */
const parseArgs = require('minimist')(process.argv.slice(2))
const template = require(path.join(__dirname, '/template.json'))

/** @type {string} */
const fileName = parseArgs.hasOwnProperty('name') ? parseArgs.name : 'default'
const postPath = path.join(__dirname, '../../content/posts')

/** @type {string[]} */
const result = []

for (const prop in template) {
  /** @type {boolean} */
  const val = template[prop]

  if (!val) {
    result.unshift(`${prop}: `)
  } else {
    if (prop === 'date') {
      const now = new Date()
      const date = {
        year: now.getFullYear(),
        month:
          now.getMonth() + 1 > 9
            ? now.getMonth() + 1
            : `0${now.getMonth() + 1}`,
        day: now.getDate() + 1 > 9 ? now.getDate() : `0${now.getDate()}`
      }

      result.unshift(`date: ${date.year}-${date.month}-${date.day}`)
    }
  }
}

// 양 끝쪽에 구분자 생성
result.unshift('---')
result.push('---\n')

// 문자열로 변환
const header = result.join('\n')

// 파일 쓰기
fs.writeFile(`${postPath}/${fileName}.md`, header, function(err) {
  if (err) {
    throw err
  }
})
