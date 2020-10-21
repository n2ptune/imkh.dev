<template>
  <div class="flex flex-row m-0 md:m-4 px-3 py-4 md:space-x-6 items-center">
    <div class="font-black relative">
      <div class="text-2xl space-x-3 cursor-pointer" @click="handleDropdown">
        <span>All Tags</span>
        <span>
          <font-awesome
            :icon="['fas', 'chevron-down']"
            :class="visibleDropdown ? 'fa-rotate-180' : ''"
            class="transition-transform duration-300"
          />
        </span>
      </div>
      <transition name="top-appear" appear>
        <div v-if="visibleDropdown" class="dropdown">
          <ul class="break-words">
            <li
              v-for="tag in all"
              :key="tag.title"
              class="inline-block mx-1 my-1"
            >
              <g-link :to="tag.path" class="space-x-2">
                <span class="hover:underline">{{ tag.title }}</span>
                <span class="text-base text-white-300">({{ tag.count }})</span>
              </g-link>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="hidden md:block">
      <ul class="text-lg space-x-5">
        <li
          v-for="top in tops"
          :key="top.title"
          class="inline-block text-white-400 transition-colors duration-300 hover:text-white-700 pb-1 border-b-2 border-elevation-300 hover:border-elevation-700"
        >
          <g-link :to="top.path"> #{{ top.title }} </g-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tops: {
      type: Array
    },
    all: {
      type: Array
    }
  },

  data: () => ({
    visibleDropdown: false
  }),

  methods: {
    handleDropdown() {
      this.visibleDropdown = !this.visibleDropdown
    }
  },

  watch: {
    $route() {
      if (this.visibleDropdown) {
        this.visibleDropdown = false
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.top-appear {
  &-enter-active,
  &-leave-active {
    @apply transition duration-500;
  }

  &-enter,
  &-leave-to {
    @apply transform -translate-y-4 opacity-0;
  }

  &-enter-to,
  &-leave {
    @apply transform translate-y-0 opacity-100;
  }
}

.dropdown {
  @apply absolute z-20 bg-dark-lighten shadow-xl text-white-700
  px-2 py-4 rounded-lg left-0 text-xl;

  top: 3rem;
  min-width: 450px;
}
</style>
