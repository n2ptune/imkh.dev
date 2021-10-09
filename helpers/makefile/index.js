// @flow
import fs from 'fs'
import path from 'path'
import post from './templates/post'
import note from './templates/note'
import { Command } from 'commander'

type MakeOption = {
  type: 'post' | 'note',
  name: string
}

const program = new Command()

program
  .option('-t, --type <type>', 'file type post | note')
  .option('-n, --name <name>', 'file name')

program.parse(process.argv)

const options: MakeOption = program.opts()
const { name, type } = options

if (!name || !type) {
  throw new Error('Required options')
}

const contentPath = path.resolve(
  process.cwd(),
  'content',
  type === 'post' ? 'posts' : 'note'
)

const template = type === 'post' ? post : note
const fileString = ['---']

const properties = template.map(property => {
  let value = ''
  if (typeof property.value === 'function') {
    value = property.value()
  } else if (typeof property.value === 'boolean') {
    value = property.value.toString()
  }
  return property.key + ': ' + value
})

const fullString = fileString.concat(properties, ['---'])
const fileName = name + '.md'
const fileNameWithPath = path.resolve(contentPath, fileName)

if (fs.existsSync(fileNameWithPath)) {
  throw new Error('File exist')
} else {
  fs.writeFileSync(fileNameWithPath, fullString.join('\n'))
}
