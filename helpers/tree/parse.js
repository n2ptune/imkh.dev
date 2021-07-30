// @flow
import type { ContentMap } from './index.js'

export const parseMDHeader = (file: string, fileName: string): any => {
  const arr = file.split('\n')
  let flag = false
  let startIndex = 0
  let endIndex = 0
  let i = 0

  while (true) {
    if (arr[i].trim() === '---') {
      if (!flag) {
        flag = true
        startIndex = i
      } else {
        endIndex = i
        break
      }
    }
    i++
  }

  const parse = arr.slice(startIndex + 1, endIndex).join(',')
}
