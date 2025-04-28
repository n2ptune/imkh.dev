import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import inq from 'inquirer'

const postPath = resolve(__dirname, '../contents/posts')
const shortPath = resolve(__dirname, '../contents/shorts')

inq
  .prompt([
    {
      message: 'Content type',
      name: 'contentType',
      type: 'select',
      default: 'post',
      choices: ['post', 'short']
    },
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
    const { published, tags, title, description, filename, contentType } =
      answers
    const cover_image = ''
    const date = new Date().toISOString()
    const writePath = contentType === 'post' ? postPath : shortPath

    writeFileSync(
      join(writePath, filename + '.md'),
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
