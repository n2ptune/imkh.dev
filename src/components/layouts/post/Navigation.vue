<template>
  <transition name="slide-navigation" appear>
    <aside
      v-if="isFixed"
      :style="{
        left: offsetWithMargin
      }"
    >
      <ul :style="{ fontSize: '0.9rem' }">
        <li class="pl-3 active">목차</li>
        <li
          v-for="(heading, index) in navi"
          :id="heading.path"
          :key="heading.path + index"
          :class="[
            heading.level ? 'pl-6' : 'pl-3',
            heading.active ? 'active' : ''
          ]"
        >
          <a :href="'#' + heading.path" @click="anchor">
            {{ heading.title }}
          </a>
        </li>
      </ul>
    </aside>
  </transition>
</template>

<script>
export default {
  props: {
    content: {
      type: undefined
    }
  },

  data: () => ({
    contentOffset: 0,
    offsetAside: 0,
    leftMargin: 65,
    target: null,
    isFixed: true,
    navi: null
  }),

  computed: {
    offsetWithMargin() {
      return this.isFixed ? this.leftMargin + this.offsetAside + 'px' : 0
    }
  },

  methods: {
    parseHeading() {
      const domParser = new DOMParser()
      const _document = domParser.parseFromString(
        this.$page.post.content,
        'text/html'
      )

      const headings = Array.from(_document.querySelectorAll('h2, h3'))
      const result = headings.map((heading, index) => {
        let top =
          window.pageYOffset +
          document.querySelector('#' + heading.id).getBoundingClientRect().top
        let nextTop = null
        if (headings.length - 1 > index) {
          const nextDOM = document.querySelector('#' + headings[index + 1].id)
          const { top } = nextDOM.getBoundingClientRect()

          nextTop = window.pageYOffset + top
        }

        return {
          path: heading.id,
          title: heading.innerText,
          level: heading.tagName.toLowerCase() === 'h2' ? 0 : 1,
          ref: document.querySelector('#' + heading.id),
          active: false,
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
      if (!this.isFixed) return

      const { right } = this.target.getBoundingClientRect()
      this.offsetAside = right
    },
    naviActive() {
      const y = window.pageYOffset

      this.navi.map(n => n.isActive(y))

      const heightScope = this.$parent.$el.clientHeight

      if (y >= heightScope) {
        this.isFixed = false
      } else {
        this.isFixed = true
      }
    },
    anchor(event) {
      event.preventDefault()

      const targetID = event.target.attributes.href.value.slice(1)
      const targetElem = document.getElementById(targetID)
      // const targetElemTop = targetElem.offsetTop
      const targetElemTop =
        targetElem.getBoundingClientRect().top +
        window.pageYOffset -
        (targetElem.clientHeight + 20 * 3)

      window.scrollTo(0, targetElemTop)
      // window.history.pushState({}, '', '#' + targetID)
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
  aside ul li:hover {
    @apply text-white-f font-semibold;
  }
  aside ul li.active,
  aside ul li.sub-active {
    @apply border-white-f text-white-f;
  }
}
</style>
