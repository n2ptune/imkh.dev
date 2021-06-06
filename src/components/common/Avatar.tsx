import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const Avatar: React.FC = () => {
  return (
    <StaticImage
      src="../../images/profile.png"
      alt="profile"
      className="rounded-full w-8 h-8 bg-gray-200 dark:bg-black-primary-300 mr-2"
      placeholder="dominantColor"
    />
  )
}

export default Avatar
