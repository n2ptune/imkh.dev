<template>
  <div>
    <ContentDoc v-slot="{ doc }">
      <h1>{{ doc.title }}</h1>
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
</script>
