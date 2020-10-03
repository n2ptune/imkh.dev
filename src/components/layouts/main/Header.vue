<template>
  <header>
    <div class="title">
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
  @apply flex items-center justify-between relative top-0 h-12 px-3 py-8
  border-b border-gray-200;
}

@screen lg {
  header {
    @apply hidden;
  }
}
</style>
