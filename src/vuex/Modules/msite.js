/* 
mutations + actions + state + getters
 */
 import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
} from '../mutations-type'
import {
    reqAddress,
    reqCategorys,
    reqShops,
} from '../../api'


 export default{
     state:{
        latitude: 40.10038, // 纬度
        longitude: 116.36867, // 经度
        address: {}, // 地址信息对象
        categorys: [], // 分类数组
        shops: [], //商家数组
     },
     mutations:{
        [RECEIVE_ADDRESS](state,address){        
            state.address = address
        },
        [RECEIVE_CATEGORYS](state,categorys){
            state.categorys = categorys
        },
        [RECEIVE_SHOPS](state,shops){
            state.shops = shops
        },

     },
     actions:{
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
     },
     getters:{

     }
 }