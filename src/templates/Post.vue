<template>
  <PostLayout>
    {{ $page.post.title }}
  </PostLayout>
</template>

<script>
export default {}
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "D. MMMM. YYYY")
    timeToRead
    tags {
      id
      title
      path
    }
    description
    content
    cover_image
  }
  origin: post (id: $id) {
    date
  }
}
</page-query>
