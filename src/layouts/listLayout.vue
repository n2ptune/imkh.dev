<script setup lang="ts">
import SEOWrapper from './SEOWrapper.vue'
</script>

<template>
  <SEOWrapper>
    <section class="layout">
      <CommonHeader />
      <CommonLayoutBodyWrapper>
        <slot />
        <CommonStickyTagInfo />
      </CommonLayoutBodyWrapper>
    </section>
  </SEOWrapper>
</template>
