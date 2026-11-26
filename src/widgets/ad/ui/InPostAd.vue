<script lang="ts" setup>
type AdsByGoogleWindow = Window & {
  adsbygoogle?: unknown[]
}

interface Props {
  place: 'top' | 'bottom'
}

const props = defineProps<Props>()
const adRef = ref<HTMLElement | null>(null)

const placeClass = computed(() =>
  props.place === 'top' ? 'mb-16 xl:mb-12' : 'mt-16 xl:mt-20'
)

watch(
  adRef,
  el => {
    if (!el || el.getAttribute('data-adsbygoogle-status')) return

    try {
      const win = window as AdsByGoogleWindow
      ;(win.adsbygoogle = win.adsbygoogle || []).push({})
    } catch {
      // 광고 차단기 등으로 adsbygoogle 초기화가 실패해도 페이지 렌더링에 영향이 없도록 무시
    }
  },
  { flush: 'post', immediate: true }
)
</script>

<template>
  <ClientOnly>
    <aside
      aria-label="광고"
      class="in-post-ad not-prose my-12 w-full"
      :class="placeClass"
    >
      <ins
        ref="adRef"
        class="adsbygoogle"
        style="display: block; text-align: center"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-3441377677018772"
        data-ad-slot="6068611830"
        data-full-width-responsive="false"
      ></ins>
    </aside>
  </ClientOnly>
</template>

<style scoped>
.in-post-ad:has(ins.adsbygoogle[data-ad-status='unfilled']) {
  display: none !important;
}
</style>
