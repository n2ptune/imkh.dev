<script lang="ts" setup>
useSeoMeta({
  titleTemplate(str) {
    return `${str} | imkh.dev`
  },
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
    },
    {
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W4HRXVM');`,
      tagPosition: 'head'
    },
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-J1LYTZVE92'
    },
    {
      innerHTML: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-J1LYTZVE92');`,
      tagPosition: 'head'
    }
  ]
})

useHeadSafe({
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
  <div class="relative">
    <slot />
  </div>
</template>
