<script lang="ts" setup>
const route = useRoute()
const query = queryContent('posts')
const content = ref<any>(null)

query
  .where({ _path: ('/posts/' + route.params.post) as string })
  .findOne()
  .then(result => (content.value = result))
</script>

<template>
  <main>
    <ContentRenderer v-if="content" :value="content" />
    <div v-else>
      Not Found
    </div>
  </main>
</template>
