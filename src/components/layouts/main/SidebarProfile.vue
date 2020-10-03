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
    <div class="mx-auto mt-4">
      <div class="text-center text-base my-2" :class="classBindingDescriptor">
        태그 모아보기
      </div>
      <transition-group
        name="scale"
        appear
        tag="div"
        class="flex flex-wrap justify-center px-6 xl:px-12 tag-wrapper"
        :class="classBindingMobile"
      >
        <g-link
          v-for="tag in tags"
          :key="tag.node.id"
          :class="classBindingMobile"
          :to="tag.node.path"
          class="tag"
        >
          {{ tag.node.title }}
        </g-link>
      </transition-group>
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
    },
    tags: {
      type: Array,
      required: true
    }
  },

  computed: {
    classBindingDescriptor() {
      return this.isSide ? 'text-gray-800' : 'text-white-700'
    },
    classBindingIcon() {
      return this.isSide
        ? 'text-purple-500 focus:text-purple-600'
        : 'text-white-600 hover:text-white-f'
    },
    classBindingMobile() {
      return this.isSide ? 'mobile' : ''
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
.tag-wrapper.mobile {
  @apply px-0 !important;
}
.tag {
  @apply py-1 px-2 bg-white-600 
  text-gray-800 rounded-lg cursor-pointer transition-colors duration-500
  mr-1 mb-1;
}
.tag.mobile {
  @apply bg-purple-500 text-white-f;
}
.tag:not(.mobile):hover {
  @apply bg-white-f text-black;
}
.scale-enter-active {
  transition: transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955),
    opacity 0.75s ease;
  transform-origin: bottom center;
}
.scale-enter {
  opacity: 0;
  transform: scale(0);
}
.scale-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
