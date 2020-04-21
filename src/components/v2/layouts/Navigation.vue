<template>
  <transition name="slide-navigation">
    <aside
      v-if="isFixed"
      :style="{
        left: isFixed ? offsetAside + leftMargin + 'px' : 0
      }"
    >
      <ul :style="{ fontSize: '0.9rem' }">
        <li class="pl-3">목차</li>
        <li
          v-for="heading in navi"
          :id="heading.path"
          :key="heading.path"
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
    leftMargin: 15,
    target: null,
    isFixed: null,
    navi: null
  }),

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
    fixedAside() {
      const y = window.scrollY
      this.contentOffset = this.target.getBoundingClientRect().top

      if (y >= this.contentOffset) {
        this.resizingAside()
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    resizingAside() {
      if (!this.isFixed) return

      const { right } = this.target.getBoundingClientRect()
      this.offsetAside = right
    },
    naviActive() {
      const y = window.pageYOffset

      this.navi.map(n => n.isActive(y))
    },
    anchor(event) {
      event.preventDefault()

      const targetID = event.target.attributes.href.value.slice(1)
      const targetElem = document.getElementById(targetID)
      // const targetElemTop = targetElem.offsetTop
      const targetElemTop =
        targetElem.getBoundingClientRect().top +
        window.pageYOffset -
        (targetElem.clientHeight + 16 * 3)

      window.scrollTo(0, targetElemTop)
      window.history.pushState({}, '', '#' + targetID)
    }
  },

  mounted() {
    this.parseHeading()

    this.target = document.querySelector('section[data-target-content]')

    let { top, right } = this.target.getBoundingClientRect()

    this.contentOffset = top
    this.offsetAside = right

    window.addEventListener('resize', this.resizingAside, { passive: true })
    window.addEventListener('scroll', this.fixedAside, { passive: true })
    window.addEventListener('scroll', this.naviActive, { passive: true })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizingAside)
    window.removeEventListener('scroll', this.fixedAside)
    window.removeEventListener('scroll', this.naviActive)
  },

  watch: {
    $route(c, p) {
      this.parseHeading()
    }
  }
}
</script>

<style lang="postcss" scoped>
aside {
  @apply hidden;
}

@screen 2xl {
  aside {
    top: 5rem;
    @apply flex fixed;
  }
  aside ul li {
    @apply text-gray-700 border-l-4 border-gray-300 transition-colors duration-700;
  }
  aside ul li:hover {
    @apply text-black font-semibold;
  }
  aside ul li.active,
  aside ul li.sub-active {
    @apply border-purple-300 text-purple-600;
  }
}

.slide-navigation-enter-active,
.slide-navigation-leave-active {
  transition: opacity 0.45s ease;
}
.slide-navigation-enter,
.slide-navigation-leave-to {
  opacity: 0;
}
.slide-navigation-enter-to,
.slide-navigation-leave {
  transform: translateY(0);
  opacity: 1;
}
</style>
