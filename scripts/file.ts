import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const postPath = resolve(__dirname, '../contents/posts')
const postDir = readdirSync(postPath)

export function getStaticRoutes() {
  return ['/', '/s']
}

export function getPostRoutes() {
  return postDir.map(file => {
    const routeName =
      '/' + (file.endsWith('.md') ? file.slice(0, file.length - 3) : file)
    return routeName
  })
}

// export function getRoutesByTags() {
//   const tagResult: string[] = []

//   postDir
//     .filter(file => file.endsWith('.md'))
//     .map(file => {
//       const rf = readFileSync(resolve(postPath, file), 'utf-8')
//         .split('---')[1]
//         .split('---')[0]
//         .split('\n')
//       const tagLine = rf.find(t => t.startsWith('tags:'))
//       const tags = JSON.parse(
//         tagLine?.split('tags: ')[1].replace(/'/g, '"') || ''
//       )
//       if (tags && tags.length) {
//         tags.forEach((tag: string) => {
//           if (!tagResult.includes(tag)) {
//             tagResult.push(tag)
//           }
//         })
//       }
//     })

//   return tagResult.map(tag => `/tag/${tag}`)
// }
