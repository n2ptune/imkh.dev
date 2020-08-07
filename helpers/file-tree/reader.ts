import { readdirSync, readFileSync } from 'fs'

function readDirFromPath(path, ext) {
  return readdirSync(path).filter(file => file.endsWith(ext))
}

function readFileFromPath(path) {
  const _data = readFileSync(path, 'utf-8')
    .split('\n')
    .slice(1, 7)

  const pathFromRoot = '.' + path.split('dev-blog')[1]
  _data.push(`path: ${pathFromRoot}`)

  return _data
}

export { readDirFromPath, readFileFromPath }
