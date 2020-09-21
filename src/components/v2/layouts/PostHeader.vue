<template>
  <header>
    <PostLeftSide v-if="isShowLeft" :postByTag="postByTag" />
    <div>
      <font-awesome
        :icon="['fas', 'bars']"
        class="header-icon"
        @click="leftOverlay"
      />
    </div>
    <div class="flex">
      <Avatar width="35px" class="shadow-md" />
    </div>
    <div>
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
      :style="{ overflow: 'auto' }"
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
import Avatar from '@/components/v2/utils/Avatar.vue'

export default {
  components: {
    PostLeftSide,
    SearchForm,
    Avatar
  },

  props: {
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
    searchTerm: ''
  }),

  computed: {
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

  mounted() {},

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
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.65);
  @apply flex fixed w-full justify-between items-center px-3 top-0 left-0;
}
.header-icon {
  @apply text-purple-500 cursor-pointer transition-colors duration-500;
}
.header-icon:hover {
  @apply text-purple-600;
}
/* side */
.side {
  @apply fixed bg-white-f;
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
