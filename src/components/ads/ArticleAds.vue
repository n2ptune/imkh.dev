<script lang="ts" setup>
onMounted(() => {
  // @ts-ignore
  ;(adsbygoogle = window.adsbygoogle || []).push({})
})

interface Props {
  place: 'top' | 'bottom'
}

const props = defineProps<Props>()
const placeClass = computed(() => props.place === 'top' ? '!mb-[6rem] lg:mb-[3rem]' : '!mt-[6rem] lg:mt-[6rem]')
</script>

<template>
  <ins
    class="adsbygoogle"
    :class="placeClass"
    style="display: block; text-align: center"
    data-ad-layout="in-article"
    data-ad-format="fluid"
    data-ad-client="ca-pub-3441377677018772"
    data-ad-slot="6068611830"
  ></ins>
</template>

<style lang="postcss" scoped>
ins.adsbygoogle {
  @apply rounded-lg my-12 prose lg:prose-lg mx-auto max-h-[200px];

  &:not([data-ad-status='filled']) {
    @apply animate-pulse bg-slate-100 dark:bg-neutral-900;
  }
}
</style>
