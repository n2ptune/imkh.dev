<template>
  <div class="profile-container">
    <div class="flex flex-col items-center">
      <g-image
        src="@/assets/profile.jpg"
        class="rounded-full border-4 border-white-f shadow-xl"
        width="100"
      />
      <div class="mt-2 text-base lg:text-lg">
        vue2598@gmail.com
      </div>
      <div class="mt-1 text-sm lg:text-base" :class="classBindingDescriptor">
        고양이가 내 소스 코드를 삼켰어요
      </div>
    </div>
    <div class="links">
      <a href="https://github.com/n2ptune" target="_blank">
        <font-awesome
          :icon="['fab', 'github']"
          size="lg"
          class="cursor-pointer"
          :class="classBindingIcon"
        />
      </a>
      <a href="mailto:vue2598@gmail.com" target="_blank">
        <font-awesome
          :icon="['fas', 'envelope']"
          size="lg"
          class="cursor-pointer"
          :class="classBindingIcon"
        />
      </a>
      <a href="https://www.instagram.com/idea.js/?hl=ko" target="_blank">
        <font-awesome
          :icon="['fab', 'instagram']"
          size="lg"
          class="cursor-pointer"
          :class="classBindingIcon"
        />
      </a>
      <a href="https://www.facebook.com/linediffuser" target="_blank">
        <font-awesome
          :icon="['fab', 'facebook']"
          size="lg"
          class="cursor-pointer"
          :class="classBindingIcon"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isSide: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    classBindingDescriptor() {
      return this.isSide ? 'text-gray-700' : 'text-white-700'
    },
    classBindingIcon() {
      return this.isSide
        ? 'text-gray-600 focus:text-black'
        : 'text-white-600 hover:text-white-f'
    }
  }
}
</script>

<style lang="postcss" scoped>
.profile-container {
  @apply flex flex-col mx-auto;
}
.links {
  @apply flex flex-row justify-center mt-6;
}
.links > *:not(:last-child) {
  @apply mr-2;
}
</style>
