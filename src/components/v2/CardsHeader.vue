<template>
  <div class="mb-4 text-lg">{{ computedTitle }}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    tagName: {
      type: String,
      required: false,
      default: ''
    },
    count: {
      type: Number,
      required: true
    }
  },

  methods: {
    setTitle() {
      if (this.title === 'all') return '모든 포스트'
      else if (this.title === 'tag')
        return `${this.tagName.toUpperCase()}와 관련된 포스트`
    }
  },

  computed: {
    computedTitle() {
      return `${this.setTitle()} ${this.count}개`
    }
  }
}
</script>
