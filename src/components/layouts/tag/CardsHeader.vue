<template>
  <!-- <div class="mb-4 text-lg"></div> -->
  <div></div>
</template>

<script>
export default {
  props: {
    tops: {
      type: Array
    },
    all: {
      type: Array
    }
  },

  created() {
    console.log(this.tops, this.all)
  }
}
</script>
