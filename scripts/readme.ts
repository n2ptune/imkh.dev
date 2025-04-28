import { readFileSync, writeFileSync } from 'node:fs'
import { join, basename } from 'node:path'
import { globSync } from 'glob'
import fm from 'front-matter'
import yaml from 'js-yaml'

const readmePath = join(__dirname, '../README.md')
const postPath = join(__dirname, '../contents/posts')
const shortPath = join(__dirname, '../contents/shorts')
const tagCollectionpath = join(__dirname, '../contents/tags/collection.yaml')

const START_TEXT = '<!-- Auto generating by file-tree start -->'
const END_TEXT = '<!-- Auto generating by file-tree end -->'

interface FrontMatter {
  title: string
  published: boolean
  date: string
  cover_image?: string | null
  description: string
  tags: string[]
}

type ParsedTag = {
  tags: Record<string, { label: string; description: string }>
}

function write(lines: string[], text: string) {
  lines.push(text)
}

function loadTagCollection(): ParsedTag | null {
  const collection = readFileSync(tagCollectionpath, 'utf8')

  try {
    return yaml.load(collection) as ParsedTag
  } catch (e) {
    return null
  }
}

function writeFile(text: string) {
  return writeFileSync(readmePath, text, 'utf8')
}

function readFile() {
  return readFileSync(readmePath, 'utf8')
}

function getPointRange(lines: string[]) {
  const start = lines.indexOf(START_TEXT)
  const end = lines.indexOf(END_TEXT, start)

  return [start, end]
}

function readme() {
  const readmeStr = readFile()
  const lines = readmeStr.split('\n')
  const [start, end] = getPointRange(lines)
  const endTemp = lines.splice(end, lines.length + 1)
  lines.splice(start + 2, lines.length + 1)

  const posts = globSync(join(postPath, '**/*.md'))
  const shorts = globSync(join(shortPath, '**/*.md'))

  const tagMap = new Map<string, any>()

  for (const filePath of ([] as string[]).concat(posts, shorts)) {
    const fileRaw = readFileSync(filePath, 'utf8')
    const parsed = fm<FrontMatter>(fileRaw)
    const filename = basename(filePath)
    const collectionPath = filePath.includes('/posts/')
      ? 'posts'
      : filePath.includes('/shorts/')
        ? 'shorts'
        : null

    const data = {
      ...parsed.attributes,
      filename,
      collectionPath
    }

    if (parsed.attributes.tags) {
      const tag = parsed.attributes.tags[0]
      if (tag) {
        if (tagMap.get(tag)) {
          tagMap.set(tag, [...tagMap.get(tag), data])
        } else {
          tagMap.set(tag, [data])
        }
      }
    }
  }

  const tagCollections = loadTagCollection()

  for (const [key, value] of tagMap.entries()) {
    value.sort((a: any, b: any) => (b.title > a.title ? -1 : 1))

    if (tagCollections) {
      const tag = tagCollections.tags[key]
      if (tag) {
        write(lines, `### ${tag.label}`)
      } else {
        write(lines, `### ${key}`)
      }
      write(lines, '')
    }

    for (const item of value) {
      write(
        lines,
        `- [${item.title}](./contents/${item.collectionPath}/${item.filename})`
      )
    }
    write(lines, '')
  }

  lines.push(...endTemp)
  return writeFile(lines.join('\n'))
}

readme()
