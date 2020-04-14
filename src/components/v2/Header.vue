<template>
  <header>
    <div class="title">
      {{ titleName }}
    </div>
    <div class="icon">
      <button class="focus:outline-none" @click="openSideMenu">
        <font-awesome
          :icon="['fas', 'ellipsis-h']"
          size="lg"
          color="gray"
          class="hover:text-gray-700"
        />
      </button>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    titleName() {
      return '<imkh-dev :welcome="true" />'
    }
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
  @apply flex items-center justify-between relative top-0 h-12 p-3 border-b border-gray-300;
}
.title {
  font-family: 'Hack', monospace;
  letter-spacing: -1px;
  @apply font-bold text-base text-red-700;
}
@screen lg {
  header {
    @apply hidden;
  }
}
</style>
