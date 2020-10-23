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
      <Dropdown v-if="visibleDropdown" :tags="all" @close="handleDropdown" />
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
import Dropdown from './Dropdown.vue'

export default {
  components: {
    Dropdown
  },

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
      // 페이지 경로가 바뀌면 드롭다운 닫음
      if (this.visibleDropdown) {
        this.visibleDropdown = false
      }
    }
  }
}
</script>
