import React from 'react'
import { PageProps } from 'gatsby'
import ListLayout from '@/components/layouts/ListLayout'
import Hero from '@/components/Hero'

export default function Main(props: PageProps) {
  return (
    <>
      <Hero />
      <ListLayout>
        <article>Hello</article>
      </ListLayout>
    </>
  )
}
