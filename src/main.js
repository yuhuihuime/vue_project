import Vue from 'vue'
import 'lib-flexible/flexible'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/star/star.vue'
import store from './vuex/store'
import i18n from './i18n'
//注册全局的组件
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
