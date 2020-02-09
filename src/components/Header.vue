<template>
  <div
    class="font-head header flex items-center justify-center flex flex-col py-12"
  >
    <div class="text-white-f text-3xl">
      {{ $static.metadata.siteName }}
    </div>
    <div class="text-white-700 text-lg">
      {{ $static.metadata.siteDescription }}
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

.<style lang="postcss" scoped></style>
