<template>
  <header
    class="header font-display flex items-center bg-white-f justify-center sm:justify-start"
  >
    <router-link to="/">
      <div class="px-6 header-content flex flex-row items-center">
        <div class="block text-4xl font-bold text-purple-900 font-head mt-2">
          {{ $static.metadata.siteName }}
        </div>
      </div>
    </router-link>
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

.<style lang="postcss" scoped>
.header {
  height: 4rem;
}
.header-content > div {
  line-height: 1.4rem;
}
</style>
