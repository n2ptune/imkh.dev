<template>
  <UApp>
    <TooltipProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </TooltipProvider>
  </UApp>
</template>

<script setup lang="ts">
import { TooltipProvider } from 'reka-ui'
</script>
