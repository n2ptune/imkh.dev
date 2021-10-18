<template>
  <div class="search-form">
    <div class="search-form__wrapper">
      <input
        v-model="searchText"
        class="search-form__input"
        type="text"
        placeholder="Javascript, Vue..."
        @input="waitSearch"
      />
      <font-awesome
        v-show="searchText"
        :icon="['fas', 'redo']"
        class="search-form__icon"
        @click="resetSearchText"
      />
    </div>
    <div class="search-form__result">
      <transition name="spinner-fade" appear mode="in-out">
        <div
          v-show="!isSearched && searchText.length"
          class="search-form__result-spinner"
        />
      </transition>
      <div v-if="searchResults.length" class="text-left my-2 md:px-4">
        총
        <span class="text-green-500 font-bold">{{ searchResults.length }}</span
        >개의 포스트
      </div>
      <ul v-if="searchResults.length" class="list-wrapper">
        <li v-for="item in searchResults" :key="item.id" class="list-item">
          <ListItem :item="item.node" />
        </li>
      </ul>
      <div v-else-if="isSearched" class="no-data">
        검색 결과가 없습니다. 다른 검색어로 검색해주세요.
        <span class="text-white-f">🤞🤞</span>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  allPost {
    edges {
      node {
        title
        excerpt
        date
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</static-query>

<script>
import ListItem from './ListItem.vue'
import debounce from 'lodash.debounce'

export default {
  components: {
    ListItem
  },

  data: () => ({
    searchText: '',
    searchResults: [],
    isSearched: false,
    posts: []
  }),

  created() {
    this.posts = this.$static.allPost.edges
  },

  methods: {
    resetSearchText() {
      this.searchText = ''
      this.isSearched = false
    },
    waitSearch: debounce(function() {
      if (!this.searchText) {
        this.searchResults = []
        this.isSearched = false
        return
      }

      this.$search(this.searchText, this.posts, {
        keys: ['node.title', 'node.excerpt', 'node.tags.title']
      }).then(result => {
        this.searchResults = result
      })

      this.isSearched = true
    }, 500)
  },

  watch: {
    searchText(text) {
      this.isSearched = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.spinner-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 350ms ease;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
  }
}

.search-form {
  @apply flex justify-center relative flex-wrap
    items-center w-full overflow-x-hidden
    text-white-500 px-1 md:px-4;

  &__wrapper {
    @apply relative w-full;
  }

  &__input {
    @apply text-xl text-green-500 my-8 bg-transparent
    border-b border-elevation-300 pb-4 w-full;

    &:focus {
      outline: none;
    }

    &::placeholder {
      @apply text-white-200;
    }
  }

  &__icon {
    @apply text-white-200 cursor-pointer text-3xl mx-4 absolute right-0;

    top: 30%;

    &:hover {
      @apply text-white-500;
    }
  }

  &__result {
    @apply w-full text-center py-6 mb-4 relative;

    &-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid theme('colors.white.300');
      border-top: 4px solid theme('colors.white.f');
      animation: rotate infinite linear 950ms;
      position: absolute;
      left: calc(50% - 20px);
      top: 0;

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @apply bg-transparent block rounded-full mx-auto mb-6;
    }

    & .list-wrapper {
      max-height: calc(100vh - 500px);
      @apply px-1 md:px-4 break-all max-w-xl mx-auto pt-6 pb-12 overflow-y-auto;

      & .list-item {
        &:not(:last-child) {
          @apply mb-4;
        }
      }
    }

    & .no-data {
      @apply text-xl max-w-2xl mx-auto break-all px-6;
    }
  }
}

@screen md {
  .search-form {
    &__input {
      @apply pr-16 pl-4;
    }
  }
}
</style>
