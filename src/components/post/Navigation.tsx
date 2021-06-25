import { SinglePostContext } from '@/context/post'
import React, { useContext } from 'react'

export type TableOfContents = {
  depth: number
  id: string
  value: string
}

const Navigation: React.FC = () => {
  const { post } = useContext(SinglePostContext)

  return (
    <aside className="hidden lg:block lg:col-span-3 lg:pl-6 xl:pl-8">
      <div className="sticky top-32 text-sm">
        <span>목차</span>
        {post && (
          <ul>
            {(post.headings as TableOfContents[]).map(heading => (
              <li key={heading.id}>
                <a href={`#${heading.id}`}>{heading.value}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}

export default Navigation
