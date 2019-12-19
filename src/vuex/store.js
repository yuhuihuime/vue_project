// vuex中最核心的对象模块
import Vue from 'vue'
import Vuex from 'vuex'

import msite from './Modules/msite'
import shop from './Modules/shop'
import user from './Modules/user'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'



Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    mutations,
    getters,
    modules:{
        shop,
        msite,
        user
    }
})