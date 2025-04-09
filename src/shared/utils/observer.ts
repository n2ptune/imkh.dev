export function useObserver(opt: IntersectionObserverInit = {}) {
  const observer = ref<IntersectionObserver | null>(null)
  const visible = ref(false)
  const target = ref<HTMLElement | null>(null)

  function createObserver(__target: HTMLElement) {
    target.value = __target

    observer.value = new IntersectionObserver(entries => {
      if (entries.every(entry => entry.isIntersecting)) {
        visible.value = true
      } else {
        visible.value = false
      }
    }, opt)

    return observer.value
  }

  function observe() {
    if (!observer.value) return
    if (!toValue(target)) throw new Error('not found target')
    observer.value.observe(toValue(target)!)
  }

  function unobserve() {
    if (!observer.value) return
    if (!toValue(target)) throw new Error('not found target')
    observer.value.unobserve(toValue(target)!)
  }

  return {
    observer,
    createObserver,
    observe,
    unobserve,
    visible
  }
}
