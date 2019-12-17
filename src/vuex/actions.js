// 包含n个直接操作状态数据的方法的对象模块，可以有异步与发送请求的代码

import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER,
    RECEIVE_TOKEN
} from './mutations-type'

import {
    reqAddress,
    reqCategorys,
    reqShops,
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
        commit(RECEIVE_USER,{user})
        //将user保存在state中
        commit(RECEIVE_TOKEN,{token})
    }

}