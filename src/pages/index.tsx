import React from 'react'
import { PageProps } from 'gatsby'
import ListLayout from '@/components/layouts/ListLayout'
import Hero from '@/components/Hero'
import PostWrap from '@/components/main/PostWrap'

export default function Main(props: PageProps) {
  return (
    <>
      <Hero />
      <ListLayout>
        <article className="break-words">
          <PostWrap />
        </article>
      </ListLayout>
    </>
  )
}
