import { HEADER_HEIGHT } from '@/const'
import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'

const Navigation: React.FC = () => {
  const query = useStaticQuery(graphql`
    query allTags {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)

  const tags = query.allMarkdownRemark.edges.map(
    edge => edge.node.frontmatter.tags
  )
  const removedDuplicatedTag = [...new Set(tags.flat())] as string[]
  removedDuplicatedTag.sort()

  return (
    <div
      className="sticky text-xl font-black"
      style={{ top: `calc(${HEADER_HEIGHT.size} + 20px)` }}
    >
      🐋 모든 태그
      <div className="font-normal pl-6 my-4 space-y-1">
        {removedDuplicatedTag.map(tag => (
          <div className="text-sm" key={tag}>
            <span className="text-gray-600 dark:text-gray-400 hover:text-black-primary-500 dark:hover:text-white cursor-pointer">
              {tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Navigation
