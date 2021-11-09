<template>
  <section class="flex items-center justify-center h-screen font-display">
    <article>
      <div class="image mx-auto">
        <g-image src="@/assets/pikachu_404.png" blur="4" width="200" />
      </div>
      <div
        class="number text-center text-4xl md:text-6xl font-bold mt-1 tracking-widest text-accent-main"
      >
        404
      </div>
      <div class="description text-center text-white-f">
        Page Not Found :(
        <br />
        페이지를 찾을 수 없습니다.
      </div>
      <div class="mt-2 text-center">
        <g-link to="/" class="text-white-f hover:text-accent-main underline">
          <font-awesome :icon="['fas', 'chevron-left']" size="sm" />
          <span class="ml-2">메인으로 돌아가기</span>
        </g-link>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: '404 Page Not Found',
      meta: [
        {
          key: 'description',
          name: 'description',
          content: '페이지를 찾을 수 없습니다.'
        },
        {
          key: 'og:title',
          property: 'og:title',
          content: '404 Page Not Found'
        },
        {
          key: 'og:description',
          property: 'og:description',
          content: '페이지를 찾을 수 없습니다.'
        }
      ]
    }
  }
}
</script>
