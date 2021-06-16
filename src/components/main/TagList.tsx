import React from 'react'

type TagListProps = {
  tags: string[]
}

type TagItemProps = {
  tag: string
}

const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  return (
    <div className="text-white bg-black-primary-50 px-2 py-1 rounded dark:border-transparent dark:bg-black-primary-50 dark:text-white">
      #{tag}
    </div>
  )
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap flex-row space-x-2 px-4 text-sm">
      {tags.map(tag => (
        <TagItem tag={tag} key={tag} />
      ))}
    </div>
  )
}

export default TagList
