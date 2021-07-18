<template>
  <div id="layout">
    <router-view />
    <SearchDialog v-if="isSearchDialog" />
  </div>
</template>

<script>
import { EventBus } from '@/components/utils/EventBus'
import SearchDialog from '@/components/search/SearchDialog.vue'

export default {
  data: () => ({
    isSearchDialog: false
  }),

  components: {
    SearchDialog
  },

  created() {
    EventBus.$on('search', e => (this.isSearchDialog = e))
  }
}
</script>
