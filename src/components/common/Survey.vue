<template>
  <transition name="fade" appear>
    <div class="wrapper">
      <div class="font-bold text-lg lg:text-xl">
        설문에 참여해주세요!
      </div>
      <div class="leading-tight tracking-tight">
        더 나은 블로그를 위해
        <span class="text-green-600 font-bold underline">
          <a href="https://forms.gle/TtUAhaEAxXhMbC8g7" target="_blank">
            설문조사</a
          ></span
        >를 하고 있습니다. 시간 내어주시면 감사하겠습니다.
      </div>
      <div>
        <button
          class="px-4 py-1 rounded-full bg-green-600 text-white-f hover:bg-green-700 transition-colors duration-200"
          @click="$emit('disable')"
        >
          관심 없습니다
        </button>
      </div>
    </div>
  </transition>
</template>

<style lang="postcss" scoped>
.wrapper {
  @apply fixed w-72 lg:w-80 p-2 lg:p-4 bg-white-f shadow-xl rounded-lg
  text-black space-y-3;

  bottom: 10px;
  right: 10px;
}

.fade {
  &-enter-active,
  &-leave-active {
    @apply transition-all duration-300 transform;
  }

  &-enter,
  &-leave-to {
    @apply opacity-0 translate-y-10;
  }

  &-enter-to,
  &-leave {
    @apply opacity-100 translate-y-0;
  }
}
</style>
