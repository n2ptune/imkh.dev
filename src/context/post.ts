import { createContext } from 'react'

// Multiple
const PostContext = createContext({ posts: [] })

// Single
const SinglePostContext = createContext({
  post: null,
  setPost: (s: unknown) => {}
})

export { PostContext, SinglePostContext }
