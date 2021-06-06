import React, { useMemo } from 'react'
import Avatar from '../common/Avatar'
import classnames from 'classnames'
import { Link } from 'gatsby'

const HeaderNavi: React.FC = () => {
  const classes = useMemo(() => {
    return {
      wrapper: classnames(
        'hidden lg:block children:inline-block text-gray-400 space-x-5 ml-10'
      ),
      item: classnames(
        'transition-colors duration-300 hover:text-white text-sm'
      )
    }
  }, [])

  return (
    <nav className={classes.wrapper}>
      <Link to="/" activeClassName="text-white" className={classes.item}>
        Blog Home
      </Link>
      <a
        target="_blank"
        href="https://github.com/n2ptune/imkh.dev"
        className={classes.item}
      >
        Github
      </a>
    </nav>
  )
}

export default function Header({ children }: React.PropsWithChildren<unknown>) {
  return (
    <header className="h-16 flex flex-row items-center flex-nowrap px-2 lg:px-6 bg-black-primary-400 text-white">
      <div className="flex items-center flex-nowrap space-x-2">
        <Avatar />
        <h1 className="text-xl font-semibold">imkh.dev</h1>
      </div>
      <HeaderNavi />
    </header>
  )
}
