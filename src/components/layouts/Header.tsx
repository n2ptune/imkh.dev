import React, { useMemo } from 'react'
import Avatar from '../common/Avatar'
import classNames from 'classnames'
import { Link } from 'gatsby'
import { HEADER_HEIGHT } from '@/const'

const HeaderNavi: React.FC = () => {
  const classes = useMemo(() => {
    return {
      wrapper: classNames(
        'hidden lg:block children:inline-block text-gray-500 space-x-5 ml-10'
      ),
      item: classNames(
        'transition-colors duration-300 hover:text-white text-sm'
      )
    }
  }, [])

  return (
    <nav className={classes.wrapper}>
      <Link to="/" activeClassName="text-white" className={classes.item}>
        Home
      </Link>
      <a
        target="_blank"
        href="https://github.com/n2ptune/imkh.dev"
        className={classes.item}
      >
        Github
      </a>
      <a href="" className={classes.item}>
        Search
      </a>
    </nav>
  )
}

export default function Header({ children }: React.PropsWithChildren<unknown>) {
  return (
    <header
      className={`flex flex-row fixed top-0 left-0 w-full items-center flex-nowrap px-2 lg:px-6 bg-black-primary-300 z-50 text-white ${HEADER_HEIGHT.class} border-b border-black-primary-100`}
    >
      <div className="flex items-center flex-nowrap space-x-2">
        <Avatar />
        <h1 className="text-xl font-semibold">imkh.dev</h1>
      </div>
      <HeaderNavi />
    </header>
  )
}
