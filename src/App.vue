<template>
  <div id="layout">
    <router-view />
    <SearchDialog v-if="isSearchDialog" />
    <Survey v-if="isForm" @disable="disableForm" />
  </div>
</template>

<script>
import { EventBus } from '@/components/utils/EventBus'
import SearchDialog from '@/components/search/SearchDialog.vue'
import Survey from '@/components/common/Survey.vue'

export default {
  data: () => ({
    isSearchDialog: false,
    isForm: false
  }),

  components: {
    SearchDialog,
    Survey
  },

  methods: {
    showForm() {
      if (!this.isConfirm()) {
        this.isForm = true
      }
    },
    isConfirm() {
      return window.localStorage.getItem('c')
    },
    disableForm() {
      window.localStorage.setItem('c', 1)
      this.isForm = false
    }
  },

  created() {
    EventBus.$on('search', e => (this.isSearchDialog = e))
  },

  mounted() {
    setTimeout(this.showForm, 5000)
  }
}
</script>
