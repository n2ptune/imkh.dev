<template>
  <header
    class="header flex items-center bg-white-f font-head justify-center sm:justify-start"
  >
    <router-link to="/">
      <div class="px-6 header-content flex flex-row items-center">
        <div class="mx-2">
          <g-image
            src="@/assets/profile.jpg"
            blur="4"
            width="60"
            contain
            class="rounded-full"
          />
        </div>
        <div class="flex flex-col">
          <div class="block text-2xl font-bold text-gray-800">
            {{ $static.metadata.siteName }}
          </div>
          <div class="block text-gray-700 font-display">
            웹 기술/개발 개인 블로그
          </div>
        </div>
      </div>
    </router-link>
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

.<style lang="postcss" scoped>
.header {
  height: 5rem;
}
.header-content > div {
  line-height: 1.2rem;
}
</style>
