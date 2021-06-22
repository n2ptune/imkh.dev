import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import classNames from 'classnames'

interface AvatarProps {
  sizeClass?: string
}

const Avatar: React.FC<AvatarProps> = ({ sizeClass }) => {
  const style = classNames(
    `rounded-full bg-gray-200 dark:bg-black-primary-300 mr-2`,
    sizeClass || 'w-8 h-8'
  )

  return (
    <StaticImage
      src="../../images/profile.png"
      alt="profile"
      className={style}
      placeholder="dominantColor"
    />
  )
}

export default Avatar
