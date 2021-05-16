<template>
  <header>
    <div class="flex items-center w-full">
      <g-link to="/">
        <Avatar class="shadow-2xl object-cover mr-0 lg:mr-2" width="40px" />
      </g-link>
      <div class="ml-auto space-x-4">
        <a href="https://github.com/n2ptune" target="_blank">
          <font-awesome
            :icon="['fab', 'github']"
            class="header-icon"
            size="lg"
          />
        </a>
        <font-awesome
          :icon="['fas', 'code-branch']"
          class="header-icon"
          size="lg"
          @click="handleSearchForm"
        />
      </div>
      <Overlay
        :handler="isSearchOverlay"
        :style="{ overflow: 'auto' }"
        :z-index="1"
        distance="72px"
        key="search"
        @click-outside="clickOutsideSearchOverlay"
      >
        <SearchForm @close-form="closeForm" />
      </Overlay>
    </div>
  </header>
</template>

<script>
import Avatar from '@/components/utils/Avatar.vue'
import SearchForm from '@/components/search/Form.vue'

export default {
  components: {
    Avatar,
    SearchForm
  },

  data: () => ({
    isSearchOverlay: false
  }),

  methods: {
    clickOutsideSearchOverlay() {
      this.isSearchOverlay = !this.isSearchOverlay
    },
    closeForm() {
      this.isSearchOverlay = false
    },
    handleSearchForm() {
      this.isSearchOverlay = !this.isSearchOverlay
    }
  }
}
</script>

<style lang="postcss" scoped>
header {
  @apply flex justify-between items-center px-2 py-4 bg-dark-lighten
  fixed w-full z-50 top-0;

  @screen md {
    @apply px-4;
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
}
</style>
