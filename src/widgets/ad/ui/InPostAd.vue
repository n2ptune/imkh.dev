<script lang="ts" setup>
onMounted(() => {
  // @ts-ignore
  ;(adsbygoogle = window.adsbygoogle || []).push({})
})

interface Props {
  place: 'top' | 'bottom'
}

const props = defineProps<Props>()
const placeClass = computed(() =>
  props.place === 'top' ? '!mb-[6rem] lg:mb-[3rem]' : '!mt-[6rem] lg:mt-[6rem]'
)
</script>

<template>
  <ins
    class="adsbygoogle rounded-lg my-12 prose lg:prose-lg mx-auto max-h-[200px] not-[[data-ad-status='filled']]:animate-pulse not-[[data-ad-status='filled']]:bg-neutral-100 not-[[data-ad-status='filled']]:dark:bg-neutral-800 px-8"
    :class="placeClass"
    style="display: block; text-align: center"
    data-ad-layout="in-article"
    data-ad-format="fluid"
    data-ad-client="ca-pub-3441377677018772"
    data-ad-slot="6068611830"
  ></ins>
</template>
