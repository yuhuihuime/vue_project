<template>
  <div>
  <div class="goods">
    <div class="menu-wrapper" ref = 'left'>
      <ul ref="leftItem">
        <!--  current类名 -->
        <li class="menu-item" v-for="(good,index) in goods" :key="good.name" :class="{current: currentIndex===index}" @click="menuItem(index)">
          <span class="text bottom-border-1px"><img class="icon" :src="good.icon"  v-if="good.icon">{{good.name}}</span>
        </li>   
      </ul>
    </div>
    <div class="foods-wrapper" ref='right'>
      <ul ref = 'rightItem'>
        <li class="food-list-hook" v-for=" good in goods" :key="good.name">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for=" food in good.foods" :key="food.name"
            @click="showItem(food)">
              <div class="icon">
                <img width="57" height="57"
                     :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food='food'/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart/>
  </div>
  <!-- 组件标签对象就是组件对象 -->
  <Food :food='food' ref = 'food'/>
</div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../../components/CartControl/CartControl'
import ShopCart from '../../components/ShopCart/ShopCart'
import Food from '../../components/Food/Food'

export default {
  data(){
    return {
      //设计初始的数据
      tops:[],//对应下标对应的是存放的具体每一个左侧li上方偏移量【0，200，600，800】
      scrollY:0,//每个food向上滑动时的偏移量，
      food:{}//需要显示具体哪一个li的food
    }
  },
  computed:{
    ...mapState({
      goods:state=>state.shop.goods
    }),
    currentIndex(){
      const {tops,scrollY} = this
      //根据tops查找下标
      const index = tops.findIndex((top,index)=>
        top <= scrollY && scrollY <tops[index+1]
      )
      // 为了防止每次都要重新计算是否要进行下面的类名等改变，要存储一下进行对比操作
      //并且将滚动滑动到对应的位置
      if(index !== this.index && this.leftScroll){
        //进行保存
        this.index = index
        //让左侧的列表滑动到对应的位置
        //获取到当前的li元素
        const li = this.$refs.leftItem.children[index]
        //滑动scrollToElement  300ms事件
        this.leftScroll.scrollToElement(li,300)
      }
      return index
    }
  },
  methods:{
    //初始化时还没有调用，需要监视时才去调用
    initScroll(){
      this.leftScroll=new BScroll(this.$refs.left,{
        //默认要阻止点击事件,手动开启
        click:true
      }),      
      this.rightScroll=new BScroll(this.$refs.right,{
        //默认要阻止点击事件,手动开启
        click:true,
        probeType:1
      })
      //初始化之后需要给滑动的地方绑定监听  scroll监听
      //右侧的滑动
      /* 
      {String} type 事件名
      {Function} fn 回调函数
      {context} 函数执行的上下文环境，默认是 this
      x
        类型：Number
        作用：scroll 横轴坐标。
      */
     //绑定监听事件，当滑动时，获取scrollY并保存
      this.rightScroll.on('scroll', //scroll获取实时的坐标
        ({x,y})=>{this.scrollY = Math.abs(y)}
      ),
      //还需要绑定scrollEnd事件，因为scroll监视的只是触屏滑动，但是还需要做惯性滑动的效果，找到scroll
      //结束的位置
      this.rightScroll.on('scrollEnd', //scroll获取实时的坐标
        ({x,y})=>{this.scrollY = Math.abs(y)}
      )
    },
    //初始化的top值
    initTop(){
      //第一个值为0
      let top = 0
      const {tops} = this
      tops.push(top)
      //遍历所有的li,改变this指向        伪数组对象调用真数组上的方法，使用call与apply
      const lis = Array.prototype.slice.call(this.$refs.rightItem.children)
      //遍历li
      lis.forEach(li =>{
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops  //更新top的值
    },
    menuItem(index){
      //点击具体的一项，改变当前的currentIndex == 该项的index
      //右侧移动对应的top值
      //获取当前的top值
      const top = this.tops[index]
      //更新scrollY
      this.scrollY = top
      //更新右侧的移动距离
      this.rightScroll.scrollTo(0,-this.scrollY,300)
    },
    showItem(food){
      this.food = food
      this.$refs.food.toggleShow(food)
    }
  },
  watch:{
    goods(){
      //goods等页面的数据产生之后才去触发滚动事件
      this.$nextTick(()=>{
        this.initScroll()
        this.initTop()
      })
    }
  },
  components:{
    //声明使用
    CartControl,
    Food,
    ShopCart
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
