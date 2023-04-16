<script setup lang="ts">
import SEOWrapper from './SEOWrapper.vue'
</script>

<template>
  <SEOWrapper>
    <section class="layout">
      <CommonHeader />
      <PostLayoutBody>
        <slot />
      </PostLayoutBody>
      <PostLayoutFooter />
    </section>
  </SEOWrapper>
</template>
