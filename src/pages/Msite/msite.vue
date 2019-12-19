<template>
   <section class="msite">
        <!--首页头部-->
        <Header :title="address.name">
          <span class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
          </span>          
          <span class="header_login"  slot="right">
            <span class="header_login_text">登录|注册</span>
          </span>
        </Header>
        <!--首页导航-->
        <nav class="msite_nav" v-if="categorys.length>0">
          <div class="swiper-container">
            <div class="swiper-wrapper"  v-if="categorys.length > 0">
              <div class="swiper-slide" v-for="(cs,id) in categorysArr" :key="id">
                <div class="link_to_food" v-for="(c,index) in cs" :key="index">
                  <div class="food_container">
                    <img :src="'https://fuss10.elemecdn.com'+c.image_url">
                  </div>
                  <span>{{c.title}}</span>
                </div>               
              </div>            
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <nav class="msite_nav" v-else>             
          <img src="./images/msite_back.svg">               
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list" @click="$router.push('/shop/goods')">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <div class="shop_container">
            <ul class="shop_list" v-if=" shops.length > 0"><!-- 需要的loading图根据shops里边的长度是0还是多 -->
              <li class="shop_li border-1px" v-for="shop in shops" :key='shop.id'>
                <a>
                  <div class="shop_left">
                    <img class="shop_img" :src="'https://fuss10.elemecdn.com'+shop.image_path">
                  </div>
                  <div class="shop_right">
                    <section class="shop_detail_header">
                      <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                      <ul class="shop_detail_ul">
                        <li class="supports" v-for='(support,index) in shop.supports' :key='index'>{{support.icon_name}}</li>
                      </ul>
                    </section>
                    <section class="shop_rating_order">
                      <section class="shop_rating_order_left">
                        
                        <Star :score="shop.rating" :size="24"/>                                 <div class="rating_section">{{shop.rating}}</div>
                        <div class="order_section">
                          月售{{shop.rating_count}}单
                        </div>
                      </section>
                      <section class="shop_rating_order_right">
                        <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                      </section>
                    </section>
                    <section class="shop_distance">
                      <p class="shop_delivery_msg">
                        <span>¥{{shop.float_minimum_order_amount}}起送</span>
                        <span class="segmentation">/</span>
                        <span>配送费约¥{{shop.float_delivery_fee}}</span>
                      </p>
                    </section>
                  </div>
                </a>
              </li>
            </ul>
            <ul class="shop_list" v-else><!-- 需要的loading图根据shops里边的长度是0还是多 -->
              <li>
                <img src="./images/shop_back.svg" alt="">
              </li>
              <li>
                <img src="./images/shop_back.svg" alt="">
              </li>
              <li>
                <img src="./images/shop_back.svg" alt="">
              </li>
              <li>
                <img src="./images/shop_back.svg" alt="">
              </li>
             
            </ul>
          </div>
        </div>
    </section>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import {mapState} from 'vuex'

export default {
  data(){
    return {
      size:'24',
    }
  },
  async mounted(){
    this.$store.dispatch('getShops') 
    this.$store.dispatch('getAddress') 
    //利用dispatch的返回值是promise，返回的是一个解析所有被触发的actions处理器的promise，只有在数据更新与界面更新之后才往下执行，await之后调用函数
    //先发送两个请求，等待第二个请求之后之后调用函数
    await this.$store.dispatch('getCategorys')
    new Swiper('.swiper-container',{
      loop:true,
      pagination:{
        el:'.swiper-pagination',
      }
    })

 
 
  },
  computed:{
    //'address','shops','categorys'
    ...mapState({
      address: state=>state.msite.address,
      shops: state=>state.msite.shops,
      categorys: state=>state.msite.categorys      
    }),
    
    categorysArr(){
      let bigArray=[]
      let smallArray=[]
      this.categorys.forEach(item=>{
        if(smallArray.length===0){
          bigArray.push(smallArray)
        }
        smallArray.push(item)
        if(smallArray.length===8){
          smallArray = []
        }
      })
      return bigArray
    }
  }

};
</script>
<style lang='stylus'>
@import '../../common/stylus/mixins.styl'
.msite  //首页
          width 100%
          .msite_header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
            .header_search
              position absolute
              left 15px
              top 50%
              transform translateY(-50%)
              width 10%
              height 50%
              .icon-sousuo
                font-size 25px
                color #fff
            .header_title
              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%)
              width 50%
              color #fff
              text-align center
              .header_title_text
                font-size 20px
                color #fff
                display block
            .header_login
              font-size 14px
              color #fff
              position absolute
              right 15px
              top 50%
              transform translateY(-50%)
              .header_login_text
                color #fff
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
            .shop_container
              margin-bottom 50px
              .shop_list
                .shop_li
                  bottom-border-1px(#f1f1f1)
                  width 100%
                  >a
                    clearFix()
                    display block
                    box-sizing border-box
                    padding 15px 8px
                    width 100%
                    .shop_left
                      float left
                      box-sizing border-box
                      width 23%
                      height 75px
                      padding-right 10px
                      .shop_img
                        display block
                        width 100%
                        height 100%
                    .shop_right
                      float right
                      width 77%
                      .shop_detail_header
                        clearFix()
                        width 100%
                        .shop_title
                          float left
                          width 200px
                          color #333
                          font-size 16px
                          line-height 16px
                          font-weight 700
                          &::before
                            content '品牌'
                            display inline-block
                            font-size 11px
                            line-height 11px
                            color #333
                            background-color #ffd930
                            padding 2px 2px
                            border-radius 2px
                            margin-right 5px
                        .shop_detail_ul
                          float right
                          margin-top 3px
                          .supports
                            float left
                            font-size 10px
                            color #999
                            border 1px solid #f1f1f1
                            padding 0 2px
                            border-radius 2px
                      .shop_rating_order
                        clearFix()
                        width 100%
                        margin-top 18px
                        margin-bottom 8px
                        .shop_rating_order_left
                          float left
                          color #ff9a0d
                         .rating_section
                            float left
                            font-size 10px
                            color #ff6000
                            margin-left 4px
                          .order_section
                            float left
                            font-size 10px
                            color #666
                            transform scale(.8)
                        .shop_rating_order_right
                          float right
                          font-size 0
                          .delivery_style
                            transform-origin 35px 0
                            transform scale(.7)
                            display inline-block
                            font-size 12px
                            padding 1px
                            border-radius 2px
                          .delivery_left
                            color #fff
                            margin-right -10px
                            background-color #02a774
                            border 1px solid #02a774
                          .delivery_right
                            color #02a774
                            border 1px solid #02a774
                      .shop_distance
                        clearFix()
                        width 100%
                        font-size 12px
                        .shop_delivery_msg
                          float left
                          transform-origin 0
                          transform scale(.9)
                          color #666
                        .segmentation
                          color #ccc
                


 
 </style>