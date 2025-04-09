import { useObserver } from '~/shared/utils'

export function useLazyImage(
  container: MaybeRef<HTMLElement | null>,
  src: string
) {
  const imageLoaded = ref(false)
  const loading = ref(false)
  const { createObserver, observe, unobserve, visible } = useObserver({
    threshold: 0.2
  })

  watch(
    () => toValue(container),
    container => {
      if (container) {
        createObserver(container)
        observe()
      }
    }
  )

  watch(
    () => visible.value,
    () => {
      if (visible.value && !imageLoaded.value) {
        load()
      }
    }
  )

  function load() {
    if (loading.value) return
    loading.value = true

    const image = new Image()

    image.src = src
    image.onload = function () {
      imageLoaded.value = true
    }

    loading.value = false
  }

  onBeforeUnmount(() => {
    unobserve()
  })

  return {
    imageLoaded
  }
}
