import React, { useEffect, useState } from 'react'
import WrapLayout from './layouts/Wrap'
import classNames from 'classnames'
import { StaticImage } from 'gatsby-plugin-image'
import { HERO_HEIGHT } from '@/const'

const IMAGE_URL = '../images/hero-cover.jpg'

const Hero: React.FC = () => {
  const classes = {
    wrapper: classNames('oveflow-hidden'),
    image: classNames(
      'h-full w-full absolute top-0 bg-black-primary-300 z-10',
      HERO_HEIGHT.size
    ),
    text: classNames(
      'z-50 absolute top-0 h-full w-full flex justify-center items-center',
      'bg-opacity-60 bg-black-primary-300 flex-col',
      'text-white space-y-6',
      'transition-opacity duration-500'
    ),
    highlight: classNames('text-green-300'),
    photoBy: classNames('underline font-bold text-gray-300')
  }

  return (
    <WrapLayout>
      <div className={classes.wrapper} style={{ height: HERO_HEIGHT.size }}>
        <StaticImage
          src={IMAGE_URL}
          alt="HERO_IMAGE"
          objectFit="cover"
          objectPosition="center 40%"
          className={classes.image}
          loading="lazy"
          quality={100}
        />
        <div className={classes.text}>
          <div className="text-white text-center text-3xl lg:text-5xl font-bold">
            <div>
              <span className={classes.highlight}>개발자</span>의 개발로그
            </div>
            <div>
              같이 성장하는 학습{' '}
              <span className={classes.highlight}>블로그</span>
            </div>
          </div>
          <div className="text-gray-400 absolute bottom-3 right-3 text-xs">
            Photo by{' '}
            <a
              href="https://unsplash.com/@pawel_czerwinski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              className={classes.photoBy}
            >
              Pawel Czerwinski
            </a>{' '}
            on{' '}
            <a
              href="https://unsplash.com/photos/PPo9tjzjcPg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              className={classes.photoBy}
            >
              Unsplash
            </a>
          </div>
        </div>
      </div>
    </WrapLayout>
  )
}

export default Hero
