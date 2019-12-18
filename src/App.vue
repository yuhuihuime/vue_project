<template>
  <div>
    <footer-guide v-show='$route.meta.isShowFooter'></footer-guide>
    <router-view></router-view>
  </div>  
</template>
<script> 
  import FooterGuide from './components/FooterGuide/FooterGuide' 
  export default {
    mounted(){
     //尽量早的实现自动登录效果
         this.$store.dispatch('reqAutoLogin')
    },
   components:{
     FooterGuide
   }
  }
</script>
<style lang='stylus'>

</style>