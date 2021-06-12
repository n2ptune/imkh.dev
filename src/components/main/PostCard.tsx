import classNames from 'classnames'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

type PostCardProps = {
  post: any
}

const CARD_HEIGHT = '400px'
const CARD_IMAGE_HEIGHT = '150px'

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const coverImage = getImage(post.frontmatter.cover_image)

  const classes = {
    wrapper: classNames(
      'col-span-12 md:col-span-6 lg:col-span-4 cursor-pointer',
      'transition-transform duration-200 transform',
      'hover:-translate-y-2 group'
    ),
    image: classNames('rounded bg-gray-200 dark:bg-black-primary-300 w-full'),
    body: classNames(
      'bg-white dark:bg-black-primary-100 shadow-lg rounded',
      'h-full relative'
    ),
    content: classNames('p-6 lg:p-4 space-y-2')
  }

  return (
    <div className={classes.wrapper} style={{ height: CARD_HEIGHT }}>
      <div className={classes.body}>
        {coverImage ? (
          <GatsbyImage
            className={classes.image}
            image={coverImage}
            alt="image"
            style={{ height: CARD_IMAGE_HEIGHT }}
          />
        ) : null}
        <div className={classes.content}>
          <div className="text-lg font-bold">{post.frontmatter.title}</div>
          <div className="text-white text-opacity-50 group-hover:text-opacity-100 transition-colors duration-200">
            {post.excerpt}
          </div>
        </div>
        <div className="w-full absolute bottom-0 px-4 py-2 border-t border-gray-200 dark:border-black-primary-50">
          {post.frontmatter.date}
        </div>
      </div>
    </div>
  )
}

export default PostCard
