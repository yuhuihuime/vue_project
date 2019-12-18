<template>
  <div>
    <footer class="footer_guide border-1px">

      <a href="javascript:;" class="guide_item" @click="goto('/msite')" :class="{on: isCurrent('/msite')}">
        <span class="item_icon">
          <i class="iconfont icon-Homehomepagemenu">&#xe9db;</i>
        </span>       
        <span>{{$t('footer_home')}}
          <!-- <router-link to = '/msite'>外卖</router-link> -->
        </span>
      </a>

      <a href="javascript:;" class="guide_item" @click="goto('/search')" :class="{on: isCurrent('/search')}">
        <span class="item_icon">
          <i class="iconfont icon-OrderHistory">&#xe65c;</i>
        </span>
        <span>{{$t('footer_search')}}
          <!-- <router-link :active="isActive" to = '/search'>搜索</router-link> -->
        </span>
      </a>

      <a href="javascript:;" class="guide_item"  @click="goto('/order')" :class="{on: isCurrent('/order')}">
        <span class="item_icon">
          <i class="iconfont icon-profilehover">&#xe61d;</i>
        </span>
        <span>{{$t('footer_order')}}
          <!-- <router-link :active="isActive" to = '/order'>订单</router-link> -->
        </span>
      </a>
      <a href="javascript:;" class="guide_item"  @click="goto('/profile')" :class="{on: isCurrent('/profile')}">
        <span class="item_icon">
          <i class="iconfont icon-search"></i>
        </span>
        <span>{{$t('footer_own')}}
          <!-- <router-link :active="isActive" to = '/profile'>我的</router-link> -->
        </span>
      </a>
    </footer> 
    
  </div>  
</template>
<script>
    export default {
        methods: {
            goto(path) {
                if(this.$route.path !== path){
                  this.$router.replace(path)
                }else{
                  window.location = path
                }
            },
            isCurrent(path) {
                // console.log(this.$route.path)
                return this.$route.path === path
            }
        }
    }
</script>
<style lang='stylus'>
 @import '../../common/stylus/mixins.styl'

  .footer_guide
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 18px
        margin-top 2px
        margin-bottom 2px
      .router-link-active
        color #02a774
         
        

</style>