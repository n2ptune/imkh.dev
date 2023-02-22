<script lang="ts" setup>
import dayjs from 'dayjs'
import LocalizeFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizeFormat)
</script>

<template>
  <main class="text-black dark:text-white">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>
