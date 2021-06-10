import React from 'react'
import Navigation from '../main/Navigation'
import Header from './Header'
import WrapLayout from './Wrap'

export default function ListLayout({
  children
}: React.PropsWithChildren<unknown>) {
  return (
    <WrapLayout>
      <main className="py-8">
        <Header />
        <section className="grid grid-cols-12 lg:gap-10 container mx-auto">
          <aside className="hidden lg:block lg:col-span-2">
            <Navigation />
          </aside>
          <section className="col-span-12 lg:col-span-8">{children}</section>
          <aside className="hidden lg:block lg:col-span-2">3</aside>
        </section>
      </main>
    </WrapLayout>
  )
}
