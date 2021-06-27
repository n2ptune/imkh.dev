import React, { useContext, useMemo } from 'react'
import Avatar from '../common/Avatar'
import classNames from 'classnames'
import { Link } from 'gatsby'
import { HEADER_HEIGHT } from '@/const'
import ThemeContext from '@/context/theme'

const HeaderNavi: React.FC = () => {
  const { color, toggleTheme } = useContext(ThemeContext)
  const classes = useMemo(() => {
    return {
      wrapper: classNames(
        'hidden lg:block children:inline-block text-gray-500 space-x-5 ml-10 text-sm'
      ),
      item: classNames(
        'transition-colors duration-300 hover:text-white',
        'cursor-pointer'
      )
    }
  }, [])

  const handleToggleTheme = () => {
    if (color === 'dark') {
      toggleTheme('light')
    } else {
      toggleTheme('dark')
    }
  }

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
      <span className={classes.item}>Search</span>
      {typeof window !== 'undefined' && (
        <React.Suspense fallback={<span />}>
          <span onClick={handleToggleTheme} className={classes.item}>
            {color === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </React.Suspense>
      )}
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
