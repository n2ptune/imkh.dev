import React from 'react'
import Header from './Header'
import WrapLayout from './Wrap'

export default function ListLayout({
  children
}: React.PropsWithChildren<unknown>) {
  return (
    <WrapLayout>
      <main>
        <Header />
        <section className="flex container mx-auto">
          <aside>1</aside>
          <section>{children}</section>
          <aside>3</aside>
        </section>
      </main>
    </WrapLayout>
  )
}
