<template>
  <main>
    <ContentNavigation>
      <ul>
        <li v-for="post in posts" :key="post._id">
          <NuxtLink :to="post._path"> {{ post.title }}</NuxtLink>
        </li>
      </ul>
    </ContentNavigation>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'list-layout' })

const query = queryContent()
const posts = ref<Record<string, any>[]>([])

query.find().then(result => {
  posts.value = result
    .filter(post => post.title)
    .map(({ body, ...values }) => ({ ...values }))
})
</script>
