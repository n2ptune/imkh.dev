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
    result.push(`${prop}: `)
  } else {
    if (prop === 'date') {
      const now = new Date()

      const glueZero = t => (t > 9 ? t : '0' + t)

      const date = {
        year: now.getUTCFullYear(),
        month:
          now.getUTCMonth() + 1 > 9
            ? now.getUTCMonth() + 1
            : `0${now.getUTCMonth() + 1}`,
        day: now.getUTCDate() > 9 ? now.getUTCDate() : `0${now.getUTCDate()}`,
        hours: glueZero(now.getUTCHours()),
        minutes: glueZero(now.getUTCMinutes()),
        seconds: glueZero(now.getUTCSeconds())
      }

      result.push(
        `date: ${date.year}-${date.month}-${date.day} ${date.hours}:${
          date.minutes
        }:${date.seconds}`
      )
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
  } else {
    if (fileName === 'default') {
      console.log('No offered name option so fileName has setting default name')
      console.log("It can offer '--name' option to set fileName")
    }
  }
})
