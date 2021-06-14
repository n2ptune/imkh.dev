import React from 'react'
import { graphql } from 'gatsby'
import PostLayout from '@/components/layouts/PostLayout'

export default function Post({ data }) {
  return <PostLayout>{'Hello World'.repeat(20)}</PostLayout>
}
