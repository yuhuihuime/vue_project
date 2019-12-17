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
         
    },
   components:{
     FooterGuide
   }
  }
</script>
<style lang='stylus'>

</style>