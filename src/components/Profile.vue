<template>
  <div
    class="profile flex items-start mb-24 bg-white-f rounded-lg px-8 py-4 flex-wrap flex-col"
  >
    <div class="text-2xl text-left font-bold mb-4">
      Profile
    </div>
    <div class="mb-4">
      <div class="text-xl">
        @n2ptune(n2ptune@outlook.com)
      </div>
      <div class="text-gray-700">
        Web Developer
        <br />
        Front-End, Back-End
      </div>
    </div>
    <div>
      <div class="text-xl font-bold mb-1">
        Love It 😍
      </div>
      <div class="tag-container flex flex-wrap">
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
  </div>
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
.profile {
  max-width: var(--content-max);
}
.profile > div:nth-last-child(2) {
  @apply mb-6;
}
</style>
