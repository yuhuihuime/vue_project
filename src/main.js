import Vue from 'vue'
import 'lib-flexible/flexible'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/star/star.vue'
import store from './vuex/store'
import i18n from './i18n'
import { Button } from 'mint-ui';
//需要进行依赖文件，以供webpack打包时打包并执行
import './mock/mock-server'

import VueLazyload from 'vue-lazyload'
import loading from './common/images/loading.gif'
import CartControl from './components/CartControl/CartControl'

Vue.use(VueLazyload,{
  loading//在要显示的图片未加载之前
})//此后vue内部多了全局指令lazy,但是绑定时v-开头

//注册全局的组件
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component('CartControl',CartControl)
Vue.config.productionTip = false
Vue.component(Button.name, Button)

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
