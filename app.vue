<script lang="ts" setup>
useSeoMeta({
  titleTemplate: str => (str ? `${str} | imkh.dev` : 'imkh.dev'),
  googleSiteVerification: 'Apvl3CGBeJfNwha8SQ4DbDVYem4yZTHeLQ-ckfH4FSw',
  robots: 'All',
  ogType: 'website'
})

useHead({
  script: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3441377677018772',
      async: true,
      crossorigin: 'anonymous'
    }
  ],
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: 'favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: 'favicon-16x16.png'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    }
  ]
})
</script>

<template>
  <main class="text-black dark:text-white">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>
