// @flow
import path from 'path'
import fs from 'fs'
import { parseMDHeader } from './parse'

type TagItem = {
  title: string,
  path: string
}

type Tag = {
  [key: string]: TagItem[]
}

export type ContentMap = {
  [key: string]: {
    title: string,
    fileName: string,
    fullPath: string,
    tags: string[] | string,
    date: string
  }
}

const filterMd = (file: string, _index: number, _array: string[]): boolean =>
  file.endsWith('.md')

const postPath = path.resolve(process.cwd(), 'content', 'posts')
const memoPath = path.resolve(process.cwd(), 'content', 'memo')

const obj: ContentMap = {}

const posts = fs.readdirSync(postPath).filter(filterMd)
const memos = fs.readdirSync(memoPath).filter(filterMd)

posts.forEach(post => {
  const file = fs.readFileSync(path.resolve(postPath, post), 'utf-8')
  const headers = parseMDHeader(file, post)
  console.log(headers)
  // obj[post] = headers
})

const tags: Tag = {}

const tagExtract = (property: string | string[], path: string): void => {
  if (Array.isArray(property)) {
    property.forEach(t => {
      if (tags[t]) {
        tags[t].push()
      } else {
        // tags[t] = [{ title: , path}]
      }
    })
  }
}
