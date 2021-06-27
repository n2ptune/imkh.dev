import { SinglePostContext } from '@/context/post'
import React, { useContext } from 'react'
import * as styleModule from '@/styles/post-navi.module.css'
import classNames from 'classnames'

export type TableOfContents = {
  depth: number
  id: string
  value: string
}

const Navigation: React.FC = () => {
  const { post } = useContext(SinglePostContext)
  const depthClass = {
    '3': 'pl-3'
  }

  return (
    <aside className="hidden lg:block lg:col-span-3 lg:pl-6 xl:pl-8">
      <div className="sticky top-32 text-sm">
        <span>목차</span>
        {post && (
          <ul className={styleModule.navi}>
            {(post.headings as TableOfContents[]).map(heading => (
              <li
                key={heading.id}
                className={classNames(
                  styleModule.item,
                  depthClass[heading.depth]
                )}
              >
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
