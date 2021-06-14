import React from 'react'
import Header from './Header'
import WrapLayout from './Wrap'
import * as style from '@/styles/post-layout.module.css'

export default function PostLayout({
  children
}: React.PropsWithChildren<unknown>) {
  return (
    <WrapLayout>
      <main className="pt-24 pb-72 bg-black-primary-10 dark:bg-black-primary-300 transition-colors duration-300">
        <Header />
        <section className={style.layoutSection}>
          <section className="grid grid-cols-12 lg:gap-6">
            <article className="col-span-12 lg:col-span-9">{children}</article>
            <aside className="hidden lg:block lg:col-span-3">SIdebar</aside>
          </section>
        </section>
      </main>
    </WrapLayout>
  )
}
