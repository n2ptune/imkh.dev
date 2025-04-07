import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import inq from 'inquirer'

const postPath = resolve(__dirname, '../src/content/posts')
const postDir = readdirSync(postPath)

export function getBaseRoutes(): string[] {
  return ['/']
}

export function getGenerateRoutes(): string[] {
  return postDir.map(file => {
    const routeName =
      '/' + (file.endsWith('.md') ? file.slice(0, file.length - 3) : file)
    return routeName
  })
}

export function getRoutesByTags() {
  const tagResult: string[] = []

  postDir
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const rf = readFileSync(resolve(postPath, file), 'utf-8')
        .split('---')[1]
        .split('---')[0]
        .split('\n')
      const tagLine = rf.find(t => t.startsWith('tags:'))
      const tags = JSON.parse(
        tagLine?.split('tags: ')[1].replace(/'/g, '"') || ''
      )
      if (tags && tags.length) {
        tags.forEach((tag: string) => {
          if (!tagResult.includes(tag)) {
            tagResult.push(tag)
          }
        })
      }
    })

  return tagResult.map(tag => `/tag/${tag}`)
}

inq
  .prompt([
    {
      message: 'File name',
      name: 'filename',
      type: 'input',
      default: 'default'
    },
    { message: 'Title', name: 'title', type: 'input', default: 'Test Title' },
    { message: 'Published', name: 'published', type: 'confirm', default: true },
    {
      message: 'Tags',
      name: 'tags',
      type: 'input',
      default: ''
    },
    {
      message: 'Description',
      name: 'description',
      type: 'input',
      default: ''
    }
  ])
  .then(answers => {
    const { published, tags, title, description, filename } = answers
    const cover_image = ''
    const date = new Date().toISOString()

    writeFileSync(
      join(postPath, filename + '.md'),
      `---
title: ${title}
published: ${published}
date: ${date}
cover_image: ${cover_image}
description: ${description}
tags: ${tags}
---

## ${title}`
    )
  })
