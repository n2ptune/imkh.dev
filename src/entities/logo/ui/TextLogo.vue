<script setup lang="ts">
interface Props {
  isLink?: boolean
}

const { isLink = false } = defineProps<Props>()
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate>
    <div class="font-bold text-xl">imkh.dev</div>
  </DefineTemplate>

  <NuxtLink v-if="isLink" to="/" active-class="">
    <UButton variant="link" color="neutral">
      <ReuseTemplate />
    </UButton>
  </NuxtLink>

  <ReuseTemplate v-else />
</template>
