<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import { LoadingShield, SkeletonBlock } from '~/widgets/loading'

interface Props {
  level: number
  links: TocLink[]
  activeId?: string 
}

const props = defineProps<Props>()
const isRoot = computed(() => props.level === 0)

const currentActiveId = ref('')
const observer = ref<IntersectionObserver | null>(null)
const mutationObserver = ref<MutationObserver | null>(null)

// 인디케이터 스타일 상태 (Root에서만 관리)
const indicatorStyle = ref({
  top: '0px',
  height: '0px',
  opacity: 0
})

const updateIndicator = () => {
  if (!isRoot.value || !activeSectionId.value) return

  nextTick(() => {
    // 현재 활성화된 섹션의 링크 요소를 찾음
    const activeLink = document.querySelector(`aside a[href="#${activeSectionId.value}"]`)
    const container = document.querySelector('.toc-container')
    
    if (activeLink && container) {
      const linkRect = activeLink.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      
      // 컨테이너 대비 상대적 위치 계산
      const top = linkRect.top - containerRect.top
      const height = linkRect.height

      indicatorStyle.value = {
        top: `${top}px`,
        height: `${height + 8}px`, // 텍스트보다 살짝 길게
        opacity: 1
      }
    }
  })
}

// 헤딩 관찰 시작
const startObserving = () => {
  if (!isRoot.value || import.meta.server) return

  if (observer.value) observer.value.disconnect()

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentActiveId.value = entry.target.id
      }
    })
  }

  observer.value = new IntersectionObserver(callback, {
    rootMargin: '-100px 0px -70% 0px',
    threshold: [0, 1]
  })

  const headings = document.querySelectorAll('article h2, article h3, article h4')
  
  if (headings.length > 0) {
    headings.forEach(h => observer.value?.observe(h))
    
    const scrollPos = window.scrollY + 120
    let currentId = ''
    for (const h of Array.from(headings)) {
      if ((h as HTMLElement).offsetTop <= scrollPos) {
        currentId = h.id
      } else {
        break
      }
    }
    if (currentId) currentActiveId.value = currentId
    else if (props.links.length > 0) currentActiveId.value = props.links[0].id
  } else {
    setTimeout(startObserving, 500)
  }
}

if (isRoot.value) {
  onMounted(() => {
    startObserving()
    const article = document.querySelector('article')
    if (article) {
      mutationObserver.value = new MutationObserver(() => startObserving())
      mutationObserver.value.observe(article, { childList: true, subtree: true })
    }
    // 초기 인디케이터 위치 설정
    updateIndicator()
  })

  // 활성 섹션이 바뀔 때마다 인디케이터 위치 업데이트
  watch(() => currentActiveId.value, () => updateIndicator())
  watch(() => props.links, () => {
    startObserving()
    updateIndicator()
  }, { deep: true })

  onUnmounted(() => {
    observer.value?.disconnect()
    mutationObserver.value?.disconnect()
  })
}

const paddingByLevel = computed(() => {
  const basePadding = 32
  const indentSize = 16
  return `${basePadding + (props.level * indentSize)}px`
})

const activeSectionId = computed(() => props.activeId || currentActiveId.value)

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    const headerHeight = 80
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <LoadingShield :condition="!!links.length">
    <div :class="['relative toc-container', isRoot ? 'space-y-1' : 'space-y-0.5']">
      <!-- 움직이는 하이라이트 인디케이터 (Root에서만 하나 노출) -->
      <div 
        v-if="isRoot"
        class="absolute left-0 w-[2px] bg-neutral-900 dark:bg-neutral-50 transition-all duration-300 ease-in-out z-20"
        :style="{
          top: indicatorStyle.top,
          height: indicatorStyle.height,
          opacity: indicatorStyle.opacity,
          transform: 'translateY(-4px)'
        }"
      />

      <ul
        v-for="link in links"
        :key="link.id"
        class="group"
      >
        <li 
          :class="[
            'transition-all duration-300 py-1 relative',
            activeSectionId === link.id 
              ? 'text-neutral-900 dark:text-neutral-50 font-bold' 
              : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300'
          ]"
        >
          <a 
            :href="'#' + link.id" 
            class="block text-sm truncate"
            :style="{ paddingLeft: paddingByLevel }"
            @click.prevent="scrollToSection(link.id)"
          >
            {{ link.text }}
          </a>
        </li>
        
        <template v-if="link.children">
          <TableContents 
            :level="props.level + 1" 
            :links="link.children" 
            :active-id="activeSectionId"
          />
        </template>
      </ul>
    </div>

    <template v-if="isRoot" #loading>
      <div v-bind="$attrs" class="space-y-3 pl-8">
        <SkeletonBlock class="w-full h-4" />
        <SkeletonBlock class="w-5/6 h-4 ml-4" />
        <SkeletonBlock class="w-4/6 h-4 ml-4" />
        <SkeletonBlock class="w-3/4 h-4 ml-8" />
      </div>
    </template>
  </LoadingShield>
</template>
