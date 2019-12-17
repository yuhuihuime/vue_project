  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import Msite from '../pages/Msite/msite.vue'
  import Search from '../pages/Search/search.vue'
  import Order from '../pages/Order/order.vue'
  import Profile from '../pages/Profile/profile.vue'
  import Login from '../pages/Login/login.vue'

  Vue.use(VueRouter)

  export default new VueRouter({
      mode:'history',
      routes:[
        {
            path:'/msite',
            component:Msite,
            meta:{
                isShowFooter:true
            }
        },
        {
            path:'/search',
            component:Search,
            meta:{
                isShowFooter:true
            }
        },
        {
            path:'/order',
            component:Order,
            meta:{
                isShowFooter:true
            }
        },
        {
            path:'/profile',
            component:Profile,
            meta:{
                isShowFooter:true
            }
        },
        
        {
            path:'/login',
            component:Login
        },
        {
            path:'/',
            redirect:'/msite'
        },
      ]
  })