import React, { createContext } from 'react'
import { PageProps } from 'gatsby'
import ListLayout from '@/components/layouts/ListLayout'
import Hero from '@/components/Hero'
import PostWrap from '@/components/main/PostWrap'
import { useAllPosts } from '@/hooks/posts'

export const PostContext = createContext({ posts: [] })

export default function Main(props: PageProps) {
  const { posts } = useAllPosts()

  return (
    <>
      <Hero />
      <ListLayout>
        <article className="break-words">
          <PostContext.Provider value={{ posts }}>
            <PostWrap />
          </PostContext.Provider>
        </article>
      </ListLayout>
    </>
  )
}
