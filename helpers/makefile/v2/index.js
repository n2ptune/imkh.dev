import fs from 'fs'
import path from 'path'
import post from './templates/post'
import memo from './templates/memo'
import { Command } from 'commander'

const program = new Command()

program
  .option('-t, --type <type>', 'file type post | memo')
  .option('-n, --name <name>', 'file name')

program.parse(process.argv)

const options = program.opts()
