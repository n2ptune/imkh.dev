<template>
  <header>
    <div class="flex items-center">
      <font-awesome
        :icon="['fas', 'bars']"
        class="header-icon"
        @click="leftOverlay"
      />
      <PostLeftSide v-if="isShowLeft" :postByTag="postByTag" />
    </div>
    <transition name="h-slide">
      <div
        v-if="isShowTitle"
        class="text-sm lg:text-base font-bold text-white-700"
      >
        {{ splitedTitle }}
      </div>
    </transition>
    <div class="header-right">
      <!-- <div class="search-form inline-flex relative"> -->
      <!-- <input
          id="search"
          v-model="searchTerm"
          type="text"
          class="mr-5 hidden lg:inline-flex bg-white-600 rounded-lg py-1 pl-3 pr-8 focus:outline-none focus:bg-white-f text-sm"
          placeholder="Search Posts..."
        /> -->
      <!-- <font-awesome
          :icon="['fas', 'search']"
          class="text-white-800 mr-2 header-icon"
        /> -->
      <!-- <div class="search-results" v-if="searchResults.length">
          <div class="text-sm text-purple-600 pb-2 border-b-2 border-gray-400">
            검색 결과({{ searchResults.length }}개)
          </div>
          <div class="search-wrap mt-4">
            <div v-for="post in searchResults" :key="post.id" class="mb-2">
              <div class="text-base">
                <g-link :to="post.path">
                  {{ post.title }}
                </g-link>
              </div>
              <div class="text-sm text-gray-700">
                {{ substringDescription(post.description) }}
              </div>
            </div>
          </div>
        </div> -->
      <!-- <font-awesome
          :icon="['fas', 'search']"
          class="search-icon text-gray-800"
        /> -->
      <!-- </div> -->
      <font-awesome
        :icon="['fas', 'search']"
        class="header-icon mr-2"
        @click="searchOverlay"
      ></font-awesome>
    </div>
    <Overlay
      :handler="isOpenMenu"
      key="leftMenu"
      @click-outside="clickOutsideLeftOverlay"
    />
    <Overlay
      :handler="isSearchOverlay"
      distance="3rem"
      key="search"
      @click-outside="clickOutsideSearchOverlay"
    >
      <SearchForm />
    </Overlay>
  </header>
</template>

<script>
import PostLeftSide from '@/components/v2/layouts/PostLeftSide.vue'
import SearchForm from '@/components/v2/search/Form.vue'

export default {
  components: {
    PostLeftSide,
    SearchForm
  },

  props: {
    title: {
      type: String,
      required: true
    },
    postByTag: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data: () => ({
    isOpenMenu: false,
    isShowLeft: false,
    isShowTitle: false,
    isSearchOverlay: false,
    ioRef: null,
    searchTerm: ''
  }),

  computed: {
    splitedTitle() {
      let subLength = 30

      if (window.innerWidth) {
        subLength = window.innerWidth > 870 ? undefined : subLength
      }

      return this.title.length > 30
        ? this.title.substring(0, subLength) + (subLength ? '...' : '')
        : this.title
    },
    searchResults() {
      const searchTerm = this.searchTerm
      if (searchTerm.length < 3) return []
      return this.$search.search({ query: searchTerm, limit: 5 })
    },
    substringDescription() {
      return desciprtion =>
        desciprtion.length > 50
          ? desciprtion.substring(0, 50) + '...'
          : desciprtion
    }
  },

  methods: {
    leftOverlay() {
      this.isOpenMenu = !this.isOpenMenu
      this.isShowLeft = !this.isShowLeft
    },
    clickOutsideLeftOverlay() {
      this.isOpenMenu = false
      if (this.isShowLeft) this.isShowLeft = false
      else if (this.isShowRight) this.isShowRight = false
    },
    clickOutsideSearchOverlay() {},
    searchOverlay() {
      this.isSearchOverlay = !this.isSearchOverlay
    }
  },

  mounted() {
    if (process.isClient) {
      const headWrap = document.querySelector('.head-wrap')

      const io = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            this.isShowTitle = false
          } else {
            this.isShowTitle = true
          }
        },
        {
          threshold: 1
        }
      )

      io.observe(headWrap)
      this.ioRef = io
    }
  },

  beforeDestroy() {
    const headWrap = document.querySelector('.head-wrap')
    this.ioRef.unobserve(headWrap)
  },

  watch: {
    $route(c, p) {
      this.searchTerm = ''
    }
  }
}
</script>

<style lang="postcss" scoped>
header {
  height: 3rem;
  z-index: 80;
  background-color: #242424;
  @apply flex fixed w-full justify-between items-center px-3 top-0 left-0;
}
.header-icon {
  @apply text-white-600 cursor-pointer transition-colors duration-500;
}
.header-icon:hover {
  @apply text-white-f;
}
/* side */
.side {
  @apply fixed h-full bg-white-f;
}
.h-slide-enter-active,
.h-slide-leave-active {
  transition: transform 0.45s ease, opacity 0.45s ease;
}
.h-slide-enter,
.h-slide-leave-to {
  transform: translateY(50%);
  opacity: 0;
}
.h-slide-enter-to,
.h-slide-leave {
  transform: translateY(0%);
  opacity: 1;
}
</style>
