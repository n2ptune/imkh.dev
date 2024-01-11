import { usePageStore } from '~~/store/page'

export function useScroll() {
  const pageStore = usePageStore()

  function onScroll(e: Event) {
    pageStore.scrollY = window.scrollY
  }

  function scrollTo() {
    window.scrollTo({
      left: 0,
      top: pageStore.scrollY,
      behavior: 'smooth'
    })
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('scroll', onScroll)
    }
    nextTick(() => {
      if (pageStore.scrollY > 0) {
        if (pageStore.scrollY > document.body.scrollHeight) {
          const interval = setInterval(fn, 50)

          function fn() {
            if (pageStore.scrollY <= document.body.scrollHeight) {
              scrollTo()
              clearInterval(interval)
            }
          }
        } else {
          scrollTo()
        }
      }
    })
  })

  onBeforeUnmount(() => {
    document.removeEventListener('scroll', onScroll)
  })
}
