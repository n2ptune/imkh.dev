import classNames from 'classnames'
import React from 'react'

type TagListProps = {
  tags: string[]
  isPadding?: boolean
}

type TagItemProps = {
  tag: string
}

const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  const style = classNames(
    'text-gray-400',
    'bg-transparent',
    'rounded-full',
    'border',
    'dark:border-black-primary-50',
    'dark:text-black-primary-10',
    'px-3 py-1',
    'mr-2 mb-2'
    // 'group group-hover:text-black-primary-50 group-hover:border-black-primary-50'
  )

  return <div className={style}>{tag}</div>
}

const TagList: React.FC<TagListProps> = ({ tags, isPadding }) => {
  const mergeClass = classNames('flex flex-wrap flex-row text-xs', {
    'px-4': isPadding
  })

  return (
    <div className={mergeClass}>
      {tags.map(tag => (
        <TagItem tag={tag} key={tag} />
      ))}
    </div>
  )
}

export default TagList
