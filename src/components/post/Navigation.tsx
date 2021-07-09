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
  const itemClass = classNames(
    'transition-all duration-200',
    'text-gray-400',
    'dark:text-black-primary-50',
    'dark:hover:text-white',
    'hover:text-black-primary-300'
  )

  return (
    <aside className="hidden lg:block lg:col-span-3 lg:pl-6 xl:pl-8">
      <div className="sticky top-32 text-sm">
        <span className="space-x-2">
          <span className="font-bold text-sm">목차</span>
        </span>
        {post && (
          <ul className={styleModule.navi}>
            {(post.headings as TableOfContents[]).map(heading => (
              <li
                key={heading.id}
                className={classNames(depthClass[heading.depth], itemClass)}
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
