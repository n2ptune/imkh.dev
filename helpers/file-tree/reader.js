const fs = require('fs')

function readDirFromPath(path, ext) {
  return fs.readdirSync(path).filter(file => file.endsWith(ext))
}

function readFileFromPath(path, encoding = 'utf8') {
  const _data = fs
    .readFileSync(path, encoding)
    .split('\n')
    .slice(1, 7)

  const pathFromRoot = '.' + path.split('dev-blog')[1]
  _data.push(`path: ${pathFromRoot}`)

  return _data
}

module.exports = { readDirFromPath, readFileFromPath }
