const path = require('path')
const { readDirFromPath, readFileFromPath } = require('./reader')
const { decomposition, extractWithTag } = require('./decomposition')

const rootPath = path.resolve(__dirname, '../../')
const contentPath = path.resolve(rootPath, 'content', 'posts')

// Read all *.md files
const contents = readDirFromPath(contentPath, '.md')

const result = []

for (const content of contents) {
  const des = decomposition(
    readFileFromPath(path.resolve(contentPath, content))
  )

  result.push(des)
}

// console.log(result.filter(content => content.tags.includes('javascript')))
console.log(extractWithTag(result, true))
