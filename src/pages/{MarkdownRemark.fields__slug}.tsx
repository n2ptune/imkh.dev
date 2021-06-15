import React from 'react'
import PostLayout from '@/components/layouts/PostLayout'
import { graphql, PageProps } from 'gatsby'

export default function Post(props: PageProps) {
  console.log(props)
  const { markdownRemark: md } = props.data as any
  return (
    <PostLayout>
      <div className="text-3xl font-bold">{md.frontmatter.title}</div>
      <div dangerouslySetInnerHTML={{ __html: md.html }}></div>
    </PostLayout>
  )
}

export const query = graphql`
  query ($fields__slug: String) {
    markdownRemark(fields: { slug: { eq: $fields__slug } }) {
      id
      tableOfContents(absolute: false, heading: "", maxDepth: 10)
      timeToRead
      html
      frontmatter {
        date
        description
        published
        tags
        title
      }
      fields {
        slug
      }
    }
  }
`
