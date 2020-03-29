<template>
  <section class="card-component mb-4">
    <article class="px-8 py-4 flex flex-col">
      <div class="text-lg font-medium mb-2">
        월별 게시글
      </div>
      <ul class="archive">
        <li v-for="(itemValue, itemProp) in archive" :key="itemProp">
          <div class="flex justify-between px-1">
            <div class="text-gray-600">
              {{ convertDateFromString(itemProp) }}
            </div>
            <div class="text-gray-800 font-bold">
              <span class="text-purple-600 text-xl">{{ itemValue }}</span
              >개
            </div>
          </div>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
export default {
  props: ['archive'],

  methods: {
    /**
     * @param {string} str
     */
    convertDateFromString(str) {
      const splited = str.split('_')
      return `${splited[0]}년 ${splited[1]}월`
    }
  }
}
</script>

<style lang="postcss" scoped>
.archive {
  list-style: none !important;
}
</style>
