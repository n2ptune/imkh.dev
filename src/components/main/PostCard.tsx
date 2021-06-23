import { useRelativeDate } from '@/hooks/date'
import { useTimeToReadToText } from '@/hooks/posts'
import classNames from 'classnames'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { BsBookmarkFill } from 'react-icons/bs'
import TagList from './TagList'
import { Link } from 'gatsby'

type PostCardProps = {
  post: any
}

const CARD_HEIGHT = '400px'
const CARD_IMAGE_HEIGHT = '150px'

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const coverImage = getImage(post.frontmatter.cover_image)
  const date = useRelativeDate(post.frontmatter.date as string)
  const ttr = useTimeToReadToText(post.timeToRead)
  const isCutDescription = post.frontmatter.title.length >= 20 && coverImage

  const classes = {
    wrapper: classNames(
      'col-span-12 md:col-span-6 lg:col-span-3 cursor-pointer',
      'transition-transform duration-200 transform',
      'hover:-translate-y-2 group'
    ),
    image: classNames('rounded bg-gray-200 dark:bg-black-primary-300 w-full'),
    body: classNames(
      'bg-white dark:bg-black-primary-100 shadow-lg rounded',
      'h-full relative'
    ),
    content: classNames('p-6 lg:p-4 space-y-2 text-sm'),
    groupText: classNames(
      'text-gray-400 dark:text-white dark:text-opacity-40 group-hover:text-black-primary-500 dark:group-hover:text-white dark:group-hover:text-opacity-100 transition-colors duration-300'
    )
  }

  return (
    <Link className={classes.wrapper} to={post.fields.slug}>
      <div style={{ height: CARD_HEIGHT }}>
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
            <div className="text-lg font-bold text-black-primary-300 dark:text-white">
              {post.frontmatter.title}
            </div>
            {!isCutDescription && (
              <div className={classes.groupText}>{post.excerpt}</div>
            )}
          </div>
          <TagList tags={post.frontmatter.tags} />
          <div className="text-xs flex items-center justify-between w-full absolute bottom-0 p-4 border-t border-gray-200 dark:border-black-primary-50">
            <span className={classes.groupText}>
              <BsBookmarkFill className="inline-block mr-2" />
              <span>{date}</span>
            </span>
            <span className={classes.groupText}>{ttr}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
