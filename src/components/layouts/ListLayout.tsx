import React from 'react'
import Navigation from '../main/Navigation'
import Header from './Header'
import WrapLayout from './Wrap'

export default function ListLayout({
  children
}: React.PropsWithChildren<unknown>) {
  return (
    <WrapLayout>
      <main className="pt-8 pb-72 bg-gray-100 dark:bg-black-primary-300">
        <Header />
        <section className="grid grid-cols-12 lg:gap-10 container mx-auto">
          <aside className="hidden lg:block lg:col-span-2">
            <Navigation />
          </aside>
          <section className="col-span-12 lg:col-span-10">{children}</section>
          {/* <aside className="hidden lg:block lg:col-span-2">3</aside> */}
        </section>
      </main>
    </WrapLayout>
  )
}
