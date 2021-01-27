<template>
  <transition name="slide-navigation" appear>
    <aside
      v-show="offsetAside && isFixed"
      :style="{
        left: offsetWithMargin
      }"
    >
      <ul :style="{ fontSize: '0.9rem' }">
        <li class="pl-3 active">목차</li>
        <li
          v-for="(heading, index) in navi"
          :key="heading.title + index"
          :style="{
            paddingLeft: `calc(0.75rem + ${(heading.depth - 2) * 12}px`
          }"
          :class="heading.active ? 'active' : ''"
        >
          <a
            class="cursor-pointer"
            :data-anchor="heading.anchor"
            @click="anchor"
          >
            {{ heading.title }}
          </a>
        </li>
      </ul>
    </aside>
  </transition>
</template>

<script>
export default {
  data: () => ({
    contentOffset: 0,
    isFixed: true,
    leftMargin: 65,
    navi: null,
    offsetAside: 0,
    target: null
  }),

  computed: {
    offsetWithMargin() {
      return this.isFixed ? this.leftMargin + this.offsetAside + 'px' : 0
    }
  },

  methods: {
    parseHeading() {
      const headings = this.$page.post.headings
      const result = headings.map((heading, index) => {
        // Viewport 떨어진 거리
        let top =
          window.pageYOffset +
          document.querySelector(heading.anchor).getBoundingClientRect().top
        let nextTop = null
        if (headings.length - 1 > index) {
          // 다음 목차
          const nextDOM = document.querySelector(headings[index + 1].anchor)
          const { top } = nextDOM.getBoundingClientRect()
          nextTop = window.pageYOffset + top
        }

        // 취합
        return {
          path: heading.anchor,
          title: heading.value,
          ref: document.querySelector(heading.anchor),
          active: false,
          depth: heading.depth,
          anchor: heading.anchor,
          // 현재 Y가 거리 이상인 상태
          isActive(y) {
            this.active = this.top <= y && y >= this.nextTop
          },
          nextTop,
          top
        }
      })

      this.navi = result
    },
    resizingAside() {
      const { right } = this.target.getBoundingClientRect()
      this.offsetAside = right
    },
    naviActive() {
      const y = window.pageYOffset

      this.navi.map(n => n.isActive(y))

      const heightScope = this.target.clientHeight

      if (y >= heightScope) {
        this.isFixed = false
      } else {
        this.isFixed = true
      }
    },
    anchor(event) {
      event.preventDefault()
      // 앵커 값으로 엘리먼트 가져오기
      const target = document.querySelector(event.target.dataset.anchor)
      // Viewport로부터 떨어진 거리 스크롤 이동
      window.scrollTo(
        0,
        target.getBoundingClientRect().top + window.pageYOffset - 100
      )
    }
  },

  mounted() {
    this.parseHeading()
    this.target = document.querySelector('section[data-target-content]')

    let { top, right } = this.target.getBoundingClientRect()

    this.contentOffset = top
    this.offsetAside = right

    window.addEventListener('resize', this.resizingAside, { passive: true })
    window.addEventListener('scroll', this.naviActive, { passive: true })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizingAside)
    window.removeEventListener('scroll', this.naviActive)
  },

  watch: {
    $route(c, p) {
      if (process.isClient) {
        this.parseHeading()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.slide-navigation-enter-active,
.slide-navigation-leave-active {
  @apply transition-opacity duration-300;
}
.slide-navigation-enter,
.slide-navigation-leave-to {
  @apply opacity-0;
}
.slide-navigation-enter-to,
.slide-navigation-leave {
  @apply opacity-100;
}

aside {
  @apply hidden;
}

@screen 2xl {
  aside {
    top: 12rem;
    @apply flex fixed;
  }
  aside ul li {
    @apply text-white-500 border-l-4 border-elevation-300
    transition-colors duration-700;
  }
  aside ul li:hover,
  aside ul li.active {
    @apply text-white-f border-white-f;
  }
}
</style>
