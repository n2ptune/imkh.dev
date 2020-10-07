<template>
  <header>
    <!-- <div class="title">
      <Avatar class="shadow-md object-cover" />
    </div>
    <div class="icon">
      <button class="focus:outline-none" @click="openSideMenu">
        <font-awesome
          :icon="['fas', 'bars']"
          size="lg"
          class="text-purple-500 hover:text-purple-600"
        />
      </button>
    </div> -->
    <div class="flex items-center">
      <Avatar class="shadow-2xl object-cover mr-2" width="40px" />
      <ul class="text-base">
        <li class="menu-link">
          <g-link to="/">
            Home
          </g-link>
        </li>
        <li class="menu-link">
          <a href="#">
            Portfolio
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import Avatar from '@/components/utils/Avatar.vue'

export default {
  components: {
    Avatar
  },

  methods: {
    openSideMenu() {
      this.$emit('openSideMenu')
    }
  }
}
</script>

<style lang="postcss" scoped>
header {
  @apply flex justify-between items-center px-2 py-4 bg-dark-lighten
  fixed w-full z-50;

  @screen md {
    @apply px-4;
  }

  & .menu-link {
    @apply inline-block ml-4 text-white-300;

    & .active--exact {
      @apply text-white-900 font-bold;
    }
  }
}
</style>
