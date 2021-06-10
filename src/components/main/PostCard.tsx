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
    wrapper: classNames('col-span-12 md:col-span-6 lg:col-span-4'),
    image: classNames('rounded'),
    body: classNames(
      'bg-white dark:bg-black-primary-100 shadow-lg rounded',
      'h-full'
    ),
    content: classNames('p-6 lg:p-4')
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
        <div className={classes.content}>{post.id}</div>
      </div>
    </div>
  )
}

export default PostCard
