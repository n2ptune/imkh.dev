<script lang="ts" setup>
definePageMeta({
  layout: 'post-layout'
})

const route = useRoute()

function log(obj: any) {
  console.log(obj)
}
</script>

<template>
  <ContentQuery
    :where="{ _dir: 'posts', _id: `content:posts:${route.params.post}.md` }"
    v-slot="{ data }"
    find="one"
  >
    {{ log(data) }}
    <ContentRenderer v-if="data" :value="data" />
  </ContentQuery>
</template>
