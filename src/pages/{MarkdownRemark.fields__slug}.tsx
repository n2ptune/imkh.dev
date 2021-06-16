import React, { useEffect, useState } from 'react'
import PostLayout from '@/components/layouts/PostLayout'
import { graphql, PageProps } from 'gatsby'
import { SinglePostContext } from '@/context/post'

export default function Post(props: PageProps) {
  const { markdownRemark: md } = props.data as any
  const [post, setPost] = useState(null)

  useEffect(() => {
    setPost(md)
  }, [])

  return (
    <SinglePostContext.Provider value={{ post, setPost }}>
      <PostLayout>
        <div className="text-3xl font-bold">{md.frontmatter.title}</div>
        <div
          className="prose dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: md.html }}
        ></div>
      </PostLayout>
    </SinglePostContext.Provider>
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
