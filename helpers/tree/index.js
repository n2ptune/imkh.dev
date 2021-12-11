#!/usr/bin/env node
/** @flow */
import * as path from 'path'
import * as fs from 'fs'
import {
  AUTO_GENERATED_END_TEXT,
  AUTO_GENERATED_START_TEXT,
  parseAllTags,
  parseMDHeader,
  parseReadMe
} from './parse'

export type Content = {
  title: string,
  fileName: string,
  fullPath: string,
  tags: string[],
  date: Date,
  published: boolean,
  cover_image?: string
}

export type ContentMap = {
  [key: string]: Content[]
}

const filterMd = (file: string, _index: number, _array: string[]): boolean =>
  file.endsWith('.md')

const postPath = path.resolve(process.cwd(), 'content', 'posts')
const notePath = path.resolve(process.cwd(), 'content', 'note')

const obj: ContentMap = {}
const contents: Content[] = []

const posts = fs.readdirSync(postPath).filter(filterMd)
const notes = fs.readdirSync(notePath).filter(filterMd)

posts.forEach(post => {
  const file = fs.readFileSync(path.resolve(postPath, post), 'utf-8')
  const content = parseMDHeader(file, post)
  content.fullPath = path.relative(process.cwd(), postPath + `/${post}`)
  contents.push(content)
})

const allTags = parseAllTags(contents)

// { javscript: [], css: [], ... }
allTags.forEach(tag => (obj[tag] = []))

contents.forEach(content => {
  content.tags.forEach(tag => {
    obj[tag].push(content)
  })
})

const readMePath = path.resolve(process.cwd(), 'README.md')
const readMeContent = fs.readFileSync(readMePath, 'utf-8')
const [start, end, separated] = parseReadMe(readMeContent)
// Contents...
const beforeBlock = separated.slice(0, start)
// Todo...
const afterBlock = separated.slice(end + 1)
const middleBlock = []

middleBlock.push(AUTO_GENERATED_START_TEXT, '')

for (const key in obj) {
  middleBlock.push(`### ${key}`, '')

  const value = obj[key]

  value.forEach(content => {
    middleBlock.push(`- [${content.title}](${content.fullPath})`)
  })

  middleBlock.push('')
}

middleBlock.push(AUTO_GENERATED_END_TEXT)

const merged = beforeBlock.concat(middleBlock, afterBlock)

// Write
fs.writeFileSync(readMePath, merged.join('\n'), { encoding: 'utf-8' })
