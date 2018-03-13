<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <FooterGuide v-if="$route.meta.showFooter"/>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
    components:{
      FooterGuide
    },
    created () {
      // 异步获取address
      this.$store.dispatch('getAddress')
      // 通知action获取用户信息
      this.$store.dispatch('getUserInfo')
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
