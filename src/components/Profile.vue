<template>
  <section
    class="profile flex mb-12 px-8 py-4 flex-wrap flex-col self-center w-auto md:self-start md:max-w-sm card-component"
  >
    <div class="mb-4">
      <g-image
        src="@/assets/profile.jpg"
        blur="4"
        class="mx-auto rounded-full"
        width="400"
      ></g-image>
    </div>
    <div class="mb-4 text-center">
      <div class="text-lg font-bold">
        n2ptune@outlook.com
      </div>
      <div class="text-gray-600 text-base">
        '웹'이 뭘까
      </div>
    </div>
    <div>
      <div class="text-xl font-bold mb-1 text-center">
        Love It 😍
      </div>
      <div class="tag-container flex flex-wrap justify-center">
        <normal-tag
          v-for="tag in $static.metadata.loves"
          :key="tag"
          :name="tag"
          colorClass="bg-blue-200"
        />
      </div>
    </div>
    <div class="mx-auto">
      <a href="https://github.com/n2ptune" target="_blank">
        <font-awesome :icon="['fab', 'github']" size="2x" />
      </a>
    </div>
  </section>
</template>

<static-query>
{
  metadata {
    loves
  }
}
</static-query>

<script>
import NormalTag from '@/components/NormalTag.vue'

export default {
  components: {
    NormalTag
  }
}
</script>

<style lang="postcss" scoped>
.profile > div:nth-last-child(2) {
  @apply mb-6;
}
</style>
