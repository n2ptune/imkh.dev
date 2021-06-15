import React from 'react'
import PostLayout from '@/components/layouts/PostLayout'
import { PageProps } from 'gatsby'
import { usePostWithSlug } from '@/hooks/posts'

export default function Post({ pageContext }: PageProps) {
  const data = usePostWithSlug((pageContext as any).fields__slug)
  console.log(data)
  return <PostLayout>{'Hello World'.repeat(20)}</PostLayout>
}
