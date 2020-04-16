<template>
  <div class="mb-4 text-lg">
    <div v-if="tagName" class="inline-block mr-5">
      <g-link to="/v2">
        <font-awesome
          :icon="['fas', 'chevron-left']"
          class="cursor-pointer transition-colors duration-500 text-gray-700 hover:text-black"
        />
      </g-link>
    </div>
    <div class="inline-block">
      {{ computedTitle }}
    </div>
  </div>
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
