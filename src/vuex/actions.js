// 包含n个直接操作状态数据的方法的对象模块，可以有异步与发送请求的代码

import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER,
    RECEIVE_TOKEN,
    RESET_USER,
    RESET_TOKEN,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,

} from './mutations-type'

import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqAutoLogin,
    reqShopGoods,
    reqShopRatings,
    reqShopInfo
} from '../api'

export default {
    //获取当前地址信息的actions
    async getAddress({commit,state}){
        const {longitude,latitude} = state
        //发送异步请求
        let result = await reqAddress(longitude,latitude)
        //成功
        if(result.code === 0){
            const address = result.data
            commit(RECEIVE_ADDRESS,address)
        }
    }, 
    //获取当前分类信息的actions
    async getCategorys({commit}){
        //发送异步请求
        let result = await reqCategorys()
        //成功
        console.log(result)
        if(result.code === 0){
            const categorys = result.data
            commit(RECEIVE_CATEGORYS,categorys)
        }
    }, 
    //获取当前地址信息的actions
    async getShops({commit,state}){
        const {longitude,litatude} = state
        //发送异步请求
        let result = await reqShops(longitude,litatude)
        //成功
        if(result.code === 0){
            const shops = result.data
            commit(RECEIVE_SHOPS,shops)
        }
    },
    //保存用户的登录token等信息
    saveUserInfo({commit},user){
        const token = user.token
        //将token保存在localStorage中
        localStorage.setItem('token_key',token)
        //此时user里多存一份token
        delete user.token
        //将token保存在state中
        commit(RECEIVE_USER,user)
        //将user保存在state中
        commit(RECEIVE_TOKEN,token)
    },
    //进行自动登录
    async reqAutoLogin({commit,state}){
        //只需要验证token信息+user信息
        //只要有token但是没有user(用_id判断有没有即可)
        //有user就已经登录了,所以不用自自动登录
        if(state.token && !state.user._id){//判断里边有无东西
            const result = await reqAutoLogin()
            if(result.code===0){//正确的
                //把用户信息进行保存
                console.log(result)
                const user = result.data
                commit(RECEIVE_USER,user)
            }
        }
    },

    //退出登录
    logout({commit}){
        //1.需要重置state里边的user与token信息
        commit(RESET_USER)
        commit(RESET_TOKEN)
        //2.清除localStorage中的token
        localStorage.removeItem('token_key')

        //不需要跳转界面，因为默认到msite页面，但是首页挂载需要向后端发送请求，此时没有token，在
        //请求拦截器中进行拦截，进入错误流程,直接跳转界面到login
    },

//     export const reqShopGoods = ()=>axios('/goods')
// export const reqShopRatings = ()=>axios('/ratings')
// export const reqShopInfo = ()=>axios('/info')
    //保存商品Goods的信息
    async reqGoods({commit},cd){
        //发送请求
        const result = await reqShopGoods()
        //请求的code为0时，获取Goods信息，并保存到state里
        if(result.code===0){
            const info = result.data
            commit(RECEIVE_GOODS,{info})
            typeof cd === 'function'&& cd()
        }
    },

    //保存评分Ratings的信息
    async reqRatings({commit},cd){
        const result = await reqShopRatings()
        if(result.code===0){
            const ratings = result.data
            commit(RECEIVE_RATINGS,{ratings})
            typeof cd === 'function'&& cd()
        }
    },
    //保存商家信息Info的信息
    async reqInfo({commit},cd){
        const result = await reqShopInfo()
        if(result.code===0){
            const info = result.data
            commit(RECEIVE_INFO,{info})
            typeof cd === 'function'&& cd()
        }
    },

}