<template>
  <div class="search-form">
    <input
      v-model="searchText"
      class="search-form__input"
      type="text"
      placeholder="Javascript, Vue..."
      @input="waitSearch"
    />
    <font-awesome
      :icon="['fas', 'times']"
      class="search-form__icon"
      @click="resetSearchText"
    />
    <div class="search-form__result">
      <ul v-if="searchResults.length" class="list-wrapper">
        <li v-for="item in searchResults" :key="item.id" class="list-item">
          <ListItem :item="item.node" />
        </li>
      </ul>
      <div v-else-if="isSearched" class="no-data">
        검색 결과가 없습니다. 다른 검색어로 검색해주세요. 🤞🤞
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
    $route() {
      this.$emit('close-form')
    }
  }
}
</script>

<style lang="postcss" scoped>
.search-form {
  @apply flex justify-center relative flex-wrap
    items-center w-full bg-white-f shadow-lg overflow-hidden;

  &__input {
    @apply text-3xl mx-2 text-purple-400 my-8;

    &:focus {
      outline: none;
    }

    &::placeholder {
      @apply text-purple-200;
    }
  }

  &__icon {
    @apply text-purple-200 cursor-pointer text-3xl mx-4;

    &:hover {
      @apply text-purple-300;
    }
  }

  &__result {
    @apply w-full text-center py-6 mb-4;

    & .list-wrapper {
      @apply px-4 break-all max-w-xl mx-auto pb-12;

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

@screen lg {
  .search-form {
    &__input {
      @apply text-5xl;
    }

    &__icon {
      @apply text-5xl;
    }

    &__result {
      & .no-data {
        @apply text-2xl;
      }
    }
  }
}
</style>
