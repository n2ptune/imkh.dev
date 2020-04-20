<template>
  <!-- <transition> -->
  <aside
    v-if="isFixed"
    :style="{
      left: isFixed ? offsetAside + leftMargin + 'px' : 0
    }"
  >
    <ul class="text-sm">
      <li class="pl-3">목차</li>
      <li
        v-for="heading in navi"
        :key="heading.path"
        :class="heading.level ? 'pl-6' : 'pl-3'"
      >
        {{ heading.title }}
      </li>
    </ul>
  </aside>
  <!-- </transition> -->
</template>

<script>
export default {
  props: {
    navi: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    contentOffset: 0,
    offsetAside: 0,
    leftMargin: 15,
    // leftPadding: 10,
    target: null,
    isFixed: null
  }),

  methods: {
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
      const selector = this.navi.map(heading => '#' + heading.path).join(',')
      const headings = Array.from(document.querySelectorAll(selector))

      const getFilterHeadings = t => el => el.tagName.toLowerCase() === t

      const h2s = headings.filter(getFilterHeadings('h2'))
      const h3s = headings.filter(getFilterHeadings('h3'))

      console.log(h2s, h3s)
    }
  },

  mounted() {
    this.target = document.querySelector('section[data-target-content]')

    let { top, right } = this.target.getBoundingClientRect()

    this.contentOffset = top
    this.offsetAside = right

    window.addEventListener('resize', this.resizingAside, { passive: true })
    window.addEventListener('scroll', this.fixedAside, { passive: true })

    this.naviActive()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizingAside)
    window.removeEventListener('scroll', this.fixedAside)
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
    @apply border-l-4 border-gray-300;
  }
  aside ul li.active,
  aside ul li.sub-active {
    @apply border-purple-300 text-purple-600 font-bold;
  }
}
</style>
