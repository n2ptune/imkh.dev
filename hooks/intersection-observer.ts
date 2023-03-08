export function useObserver(options?: IntersectionObserverInit) {
  const trackFn = ref<(entries: IntersectionObserverEntry[]) => any>(
    entries => {}
  )
  const observer = ref<IntersectionObserver | null>(null)
  const defaultOptions: IntersectionObserverInit = {
    threshold: 1
  }

  function createObserver(
    el: HTMLElement,
    callback: (entries: IntersectionObserverEntry[]) => any
  ) {
    if (
      typeof window !== 'undefined' &&
      'IntersectionObserver' in window &&
      el
    ) {
      trackFn.value = callback
      observer.value = new IntersectionObserver(
        trackFn.value,
        options || defaultOptions
      )
      observer.value.observe(el)
      return observer
    }
  }

  return {
    createObserver
  }
}
