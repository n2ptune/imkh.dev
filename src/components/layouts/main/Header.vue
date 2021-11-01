<template>
  <header :class="isTransparentHeader && 'is-transparent'">
    <div class="container mx-auto flex items-center w-full">
      <g-link to="/">
        <!-- <Avatar class="shadow-2xl object-cover mr-0 lg:mr-2 inline-block" width="40px" /> -->
        <span
          class="
            font-bold
            text-2xl
            transition-colors
            duration-200
            text-green-500
            hover:text-green-600
          "
        >
          Devlog
        </span>
      </g-link>
      <ul class="header-list">
        <li>
          <g-link to="/" exact-active-class="exact-active">Blog</g-link>
        </li>
        <li>
          <g-link to="/note" exact-active-class="exact-active"> Note </g-link>
        </li>
        <li>
          <a href="https://github.com/n2ptune" target="_blank"> Github </a>
        </li>
      </ul>
      <div class="ml-auto space-x-4">
        <a href="https://github.com/n2ptune" target="_blank">
          <font-awesome
            :icon="['fab', 'github']"
            class="header-icon"
            size="lg"
          />
        </a>
        <font-awesome
          :icon="['fas', 'search']"
          class="header-icon"
          size="lg"
          @click="handleSearchForm"
        />
      </div>
    </div>
  </header>
</template>

<script>
import Avatar from '@/components/utils/Avatar.vue'
import { EventBus } from '@/components/utils/EventBus'

export default {
  components: {
    Avatar
  },

  data: () => ({
    isTransparentHeader: true
  }),

  created() {
    if (
      this.$route.path !== '/' &&
      this.$route.path !== '/note' &&
      !this.$route.path.startsWith('/tag/')
    ) {
      this.isTransparentHeader = false
    }
  },

  mounted() {
    window.addEventListener('scroll', this.setTransparentHeader)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.setTransparentHeader)
  },

  methods: {
    clickOutsideSearchOverlay() {
      this.isSearchOverlay = !this.isSearchOverlay
    },
    closeForm() {
      this.isSearchOverlay = false
    },
    handleSearchForm() {
      EventBus.$emit('search', true)
    },
    setTransparentHeader() {
      if (
        this.$route.path !== '/' &&
        this.$route.path !== '/note' &&
        !this.$route.path.startsWith('/tag/')
      )
        return
      if (window.scrollY >= 200) {
        this.isTransparentHeader = false
      } else {
        this.isTransparentHeader = true
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
header {
  @apply px-2 py-4
  fixed w-full z-50 top-0 bg-dark-surface bg-opacity-80 transition-colors duration-500;

  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);

  &.is-transparent {
    @apply bg-transparent;
  }

  & .menu-link {
    @apply inline-block ml-4 text-white-300 transition-colors duration-300;

    & .active--exact,
    &:hover {
      @apply text-white-700;
    }
  }

  & .header-icon {
    @apply font-thin cursor-pointer transition-colors duration-300
    text-white-500 hover:text-white-f;
  }

  ul.header-list {
    @apply hidden md:block ml-8 text-sm;

    & > li {
      @apply inline-block;

      & > a {
        @apply text-white-500 transition-colors duration-300;

        &.exact-active,
        &:hover {
          @apply text-white-f;
        }
      }
    }

    & > * + * {
      @apply ml-4;
    }
  }
}

@screen md {
  header {
    @apply px-4;
  }
}
</style>
