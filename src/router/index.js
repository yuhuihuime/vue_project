  import Vue from 'vue'
  import VueRouter from 'vue-router'
  
  import Msite from '../pages/Msite/msite.vue'
  import Search from '../pages/Search/search.vue'
  import Order from '../pages/Order/order.vue'
  import Profile from '../pages/Profile/profile.vue'

  Vue.use(VueRouter)

  export default new VueRouter({
      mode:'history',
      routes:[
        {
            path:'/msite',
            component:Msite
        },
        {
            path:'/search',
            component:Search
        },
        {
            path:'/order',
            component:Order
        },
        {
            path:'/profile',
            component:Profile
        },
        {
            path:'/',
            redirect:'/home'
        },
      ]
  })