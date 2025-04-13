<script lang="ts" setup>
import Wrapper from './Wrapper.vue'

const githubLink = 'https://github.com/n2ptune'
</script>

<template>
  <Wrapper cursor-pointer :to="githubLink" target="_blank">
    <Icon name="i-akar-icons-github-fill" class="text-2xl" />
  </Wrapper>
</template>
