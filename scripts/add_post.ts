import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import inq from 'inquirer'

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
