<template>
  <transition name="slide" appear>
    <div class="left side px-2 py-4 overflow-y-auto">
      <ul class="flex flex-col" v-for="tags in postByTag" :key="tags.id">
        <li class="font-semibold text-xl text-purple-700">
          {{
            tags.title[0].toUpperCase() + tags.title.slice(1, tags.title.length)
          }}
          태그와 관련된 포스트
        </li>
        <div class="mt-2">
          <li v-for="edge in tags.node" :key="edge.node.id" class="pl-2 my-6">
            <span class="text-sm lg:text-base font-semibold">
              <g-link :to="edge.node.path">
                {{ edge.node.title }}
                <font-awesome
                  :icon="['fas', 'external-link-alt']"
                  class="ml-1"
                  size="sm"
                  color="grey"
                />
              </g-link>
            </span>
            <div class="text-xs lg:text-sm text-gray-700">
              {{ edge.node.date }}
            </div>
          </li>
        </div>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    postByTag: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>

<style lang="postcss" scoped>
.left {
  --left-side-max-width: 340px;
  --left-side-outside-width: calc(-1 * var(--left-side-max-width));
  width: var(--left-side-max-width);
  left: 0;
  top: 0;
  z-index: 1;
  scrollbar-width: none;
  @apply bg-white-f shadow-2xl;
}
.left::-webkit-scrollbar {
  display: none;
}
.slide-enter-active,
.slide-leave-active {
  -webkit-transition: opacity 0.5s, -webkit-transform 0.5s;
  transition: opacity 0.5s, -webkit-transform 0.5s;
  transition: transform 0.5s, opacity 0.5s;
  transition: transform 0.5s, opacity 0.5s, -webkit-transform 0.5s;
  transform: translateX(var(--left-side-outside-width));
}
.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(var(--left-side-outside-width));
}
</style>
