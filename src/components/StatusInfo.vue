<template>
  <section class="card-component mb-8">
    <article class="px-8 py-4 flex flex-col">
      <div class="text-lg font-bold text-center mb-4">
        Blog Info
      </div>
      <article class="flex justify-center">
        <div class="level title">
          <div class="subject">게시글</div>
          <div class="item">{{ countOfPost }}</div>
        </div>
        <div class="level title">
          <div class="subject">태그</div>
          <div class="item">{{ countOfTag }}</div>
        </div>
      </article>
    </article>
  </section>
</template>

<script>
export default {
  props: ['countOfPost', 'countOfTag'],

  created() {
    console.log(this.countOfPost, this.countOfTag)
  }
}
</script>

<style lang="postcss" scoped>
.level {
  @apply text-center flex-auto;
}
.level .subject {
  @apply text-sm;
}
.level .item {
  @apply text-2xl font-bold;
}
</style>
