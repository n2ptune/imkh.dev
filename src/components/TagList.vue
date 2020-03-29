<template>
  <section class="max-w-xs self-start hidden xl:block card-component">
    <article class="px-4 py-4">
      <div class="text-lg font-medium mb-4">
        태그 목록
      </div>
      <div class="px-1 flex justify-center items-center flex-wrap">
        <LinkedTag
          v-for="tag in tags"
          :key="tag.node.title"
          :name="tag.node.title"
          :path="tag.node.path"
          :prefix="false"
          bgColorClass="bg-purple-200"
          hoverColorClass="hover:bg-purple-300"
          class="block my-1"
        />
      </div>
    </article>
  </section>
</template>

<script>
export default {
  components: {
    LinkedTag: () => import('@/components/post/LinkedTag.vue')
  },

  props: ['tags']
}
</script>
