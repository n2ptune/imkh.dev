<template>
  <header>
    <div class="title">
      <g-image src="@/assets/profile.jpg" class="avatar" />
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
export default {
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
.title {
  & .avatar {
    width: 40px;
    object-fit: cover;

    @apply rounded-full shadow-md;
  }
}
@screen lg {
  header {
    @apply hidden;
  }
}
</style>
