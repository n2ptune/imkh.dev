import { readdirSync, readFileSync } from 'fs'

function readDirFromPath(path, ext) {
  return readdirSync(path, 'utf8').filter(file => file.endsWith(ext))
}

function readFileFromPath(path: string) {
  const _data = readFileSync(path, 'utf-8')
    .split('\n')
    .slice(1, 7)

  // 데스크탑이랑 노트북에서 경로 차이
  // 기준 문자열을 imkh.dev 혹은 dev-blog로 정함
  const pathFromRoot =
    path.indexOf('dev-blog') !== -1
      ? path.split('dev-blog')[1]
      : path.split('imkh.dev')[1]

  _data.push(`path: ${pathFromRoot}`)

  return _data
}

export { readDirFromPath, readFileFromPath }
