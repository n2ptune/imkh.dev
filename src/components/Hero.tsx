import React, { useState } from 'react'
import WrapLayout from './layouts/Wrap'
import classNames from 'classnames'
import { StaticImage } from 'gatsby-plugin-image'

const HERO_HEIGHT = '35rem'
const IMAGE_URL = '../images/hero-cover.jpg'

const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const classes = {
    wrapper: classNames('oveflow-hidden'),
    image: classNames(
      'h-full absolute top-0 bg-black-primary-300 z-10',
      HERO_HEIGHT
    ),
    text: classNames(
      'z-50 absolute top-0 h-full w-full flex justify-center items-center',
      'bg-opacity-30 bg-black-primary-300',
      'text-white'
    )
  }

  return (
    <WrapLayout>
      <div className={classes.wrapper} style={{ height: HERO_HEIGHT }}>
        <StaticImage
          src={IMAGE_URL}
          alt="HERO_IMAGE"
          objectFit="cover"
          objectPosition="center 40%"
          className={classes.image}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        {imageLoaded && <div className={classes.text}>Hero</div>}
      </div>
    </WrapLayout>
  )
}

export default Hero
