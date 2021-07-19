<template>
  <transition name="top-appear" appear>
    <div class="dropdown">
      <ul class="break-words">
        <li v-for="tag in tags" :key="tag.title" class="inline-block mx-1 my-1">
          <g-link :to="tag.path" class="space-x-2">
            <span class="hover:underline">{{ tag.title }}</span>
            <span class="text-base text-white-300">({{ tag.count }})</span>
          </g-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array
    }
  },

  mounted() {
    document.addEventListener('click', this.clickOnOutside)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.clickOnOutside)
  },

  methods: {
    clickOnOutside(e) {
      if (!this.$parent.$el.contains(e.target)) {
        // 클릭 이벤트가 드롭다운 컴포넌트(현재 컴포넌트)의 부모 범위에서
        // 벗어난 경우 부모에게 드롭다운 닫기 요청
        this.$emit('close')
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
  width: 320px;
}

@screen md {
  .dropdown {
    width: 350px;
  }
}

@screen lg {
  .dropdown {
    width: 450px;
  }
}
</style>
