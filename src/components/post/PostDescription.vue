<template>
  <article class="my-4 bg-red-200 full-width">
    <header class="py-2 px-4 bg-red-300">
      <font-awesome :icon="['fas', 'highlighter']" class="text-gray-800" />
      <span class="text-sm font-semibold ml-2 text-gray-800">이 글의 설명</span>
    </header>
    <article class="text-base px-4 py-4 md:px-8">
      {{ des }}
    </article>
  </article>
</template>

<script>
export default {
  props: ['des']
}
</script>
