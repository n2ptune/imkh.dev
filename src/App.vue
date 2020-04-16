<template>
  <transition name="opacity" appear mode="out-in">
    <router-view />
  </transition>
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

<style scoped>
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.5s ease;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0.1;
}
.opacity-enter-to,
.opacity-leave {
  opacity: 1;
}
</style>
