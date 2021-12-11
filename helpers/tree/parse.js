/** @flow */
import type { Content } from './index.js'
import yaml from 'js-yaml'

export const AUTO_GENERATED_START_TEXT =
  '<!-- Auto generating by file-tree start -->'
export const AUTO_GENERATED_END_TEXT =
  '<!-- Auto generating by file-tree end -->'

export const parseMDHeader = (file: string, fileName: string): Content => {
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

  const arrData = arr.slice(startIndex + 1, endIndex)
  // Top yaml front-matter format headers -> js object
  const parsed: Content = yaml.load(arrData.join('\n'))

  return parsed
}

export const parseAllTags = (contents: Content[]): string[] => {
  const tags = [...new Set(contents.map(content => content.tags).flat())]
  tags.sort()
  return tags
}

// Return "start", "end" by tuple
export const parseReadMe = (content: string): [number, number, string[]] => {
  const separated = content.split('\n')
  const start = separated.findIndex(t => t.trim() === AUTO_GENERATED_START_TEXT)
  const end = separated.findIndex(t => t.trim() === AUTO_GENERATED_END_TEXT)
  return [start, end, separated]
}
