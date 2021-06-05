import React from 'react'
import Avatar from '../common/Avatar'

export default function Header({ children }: React.PropsWithChildren<unknown>) {
  return (
    <header className="h-16 flex flex-row items-center flex-nowrap px-2 lg:px-6 justify-between">
      <div className="flex items-center flex-nowrap space-x-2">
        <Avatar />
        <h1 className="text-2xl font-semibold">imkh.dev</h1>
      </div>
    </header>
  )
}
