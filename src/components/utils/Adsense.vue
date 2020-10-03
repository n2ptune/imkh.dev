<template>
  <ins
    class="adsbygoogle"
    :data-ad-layout="adLayout"
    :data-ad-client="adClient"
    :data-ad-slot="adSlot"
    :data-ad-format="adFormat"
    :data-ad-full-width-responsive="adResponsive"
    :data-ad-layout-key="adLayoutKey"
    :style="adStyle"
  />
</template>

<script>
export default {
  props: {
    adLayout: {
      type: String,
      required: false,
      default: null
    },
    adClient: {
      type: String,
      required: false,
      default: 'ca-pub-3441377677018772'
    },
    adSlot: {
      type: String,
      required: true
    },
    adFormat: {
      type: String,
      required: false,
      default: 'auto'
    },
    adResponsive: {
      type: String,
      required: false,
      default: null
    },
    adLayoutKey: {
      type: String,
      required: false,
      default: null
    },
    adStyle: {
      type: String,
      required: false,
      default: null
    }
  },

  mounted() {
    this.viewAdsense()
  },

  methods: {
    viewAdsense() {
      this.$nextTick(() => {
        try {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (error) {
          console.error(error)
        }
      })
    }
  }
}
</script>
