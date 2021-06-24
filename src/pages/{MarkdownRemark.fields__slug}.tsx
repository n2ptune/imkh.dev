import React, { useEffect, useState } from 'react'
import PostLayout from '@/components/layouts/PostLayout'
import { graphql, PageProps } from 'gatsby'
import { SinglePostContext } from '@/context/post'
import Avatar from '@/components/common/Avatar'
import { useRelativeDate } from '@/hooks/date'
import * as layoutModule from '@/styles/post-layout.module.css'
import { useTimeToReadToText } from '@/hooks/posts'
import TagList from '@/components/main/TagList'

export default function Post(props: PageProps) {
  const { markdownRemark: md } = props.data as any
  const [post, setPost] = useState(null)
  const formatDate = useRelativeDate(md.frontmatter.date)
  const ttr = useTimeToReadToText(md.timeToRead, true)

  useEffect(() => {
    setPost(md)
  }, [])

  return (
    <SinglePostContext.Provider value={{ post, setPost }}>
      <PostLayout>
        <div className={layoutModule.layoutHeader}>
          <div className="text-3xl font-bold mb-1">{md.frontmatter.title}</div>
          <div className="font-light text-lg mb-8 text-gray-500">
            {md.frontmatter.description}
          </div>
          <div className="space-x-2">
            <Avatar />
            <span className="text-sm">ㅡ</span>
            <span className="text-sm">{formatDate}</span>
            <span>{ttr}</span>
          </div>
          <div className="py-6">
            <TagList tags={md.frontmatter.tags} />
          </div>
        </div>
        <span className="absolute left-0 h-px w-full bg-gray-200 dark:bg-black-primary-200"></span>
        <div
          className="mt-48 prose dark:prose-dark"
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
