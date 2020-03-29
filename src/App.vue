<template>
  <router-view />
</template>

<script>
export default {
  mounted() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: '3111093142448463',
        cookie: true,
        xfbml: true,
        version: 'v6.0'
      })

      FB.AppEvents.logPageView()
    }
    ;(function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }
}
</script>

<style lang="postcss">
.card-component {
  @apply bg-white-f rounded-lg shadow-xl;
}
</style>
