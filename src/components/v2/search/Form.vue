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
          <div class="list-item__title">
            {{ item.node.title }}
          </div>
          <div class="list-item__description">
            {{ item.node.description }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  data: () => ({
    searchText: '',
    searchResults: []
  }),

  methods: {
    resetSearchText() {
      this.searchText = ''
    },
    waitSearch: debounce(function() {
      this.searchResults = this.$search.search({
        query: this.searchText,
        limit: 10
      })
    }, 500)
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
      @apply px-4 break-all max-w-xl mx-auto;

      & .list-item {
        &:not(:last-child) {
          @apply mb-4;
        }
      }
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
  }
}
</style>
