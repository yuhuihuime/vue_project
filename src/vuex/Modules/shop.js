/* 
mutations + actions + state + getters
 */
//保存商品信息
import Vue from 'vue'
import {
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT,
    CLEAR_ALL
} from '../mutations-type'

import {
    reqShopGoods,
    reqShopRatings,
    reqShopInfo
} from '../../api'

 export default{
     state:{
        goods:[],//goods>foods>count
        ratings:[],
        info:{},
        cartFoods:[]
     },
     mutations:{
        [RECEIVE_GOODS](state,{goods}){
            state.goods = goods
        },
        [RECEIVE_RATINGS](state,{ratings}){
            state.ratings = ratings
        },
        [RECEIVE_INFO](state,{info}){
            state.info = info
        },
        [ADD_FOOD_COUNT](state,{food}){
            if(food.count){
                food.count++
            }else{
                Vue.set(food,'count',1)
                state.cartFoods.push(food)
            }
        },
        [REDUCE_FOOD_COUNT](state,{food}){
            if(food.count>0){
                food.count--
                if(food.count===1){
                    food.count.splice(state.cartFoods.indexOf(food),1)
                }
            }
        },
        [CLEAR_ALL](state){
            state.cartFoods.forEach((food)=> food.count=0 )
           state.cartFoods = []//直接更改没有效果，需要提前将所有的food中的count变为0
        }
     },
     actions:{
        //     export const reqShopGoods = ()=>axios('/goods')
        // export const reqShopRatings = ()=>axios('/ratings')
        // export const reqShopInfo = ()=>axios('/info')
        //保存商品Goods的信息
        async reqGoods({commit},cd){
            //发送请求
            const result = await reqShopGoods()
            //请求的code为0时，获取Goods信息，并保存到state里
            if(result.code===0){
                const goods = result.data
                commit(RECEIVE_GOODS,{goods})
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
        //更新food的数量
        updateFoodCount({commit},{isAdd,food}){
            if(isAdd){
                commit(ADD_FOOD_COUNT,{food})
            }else{
                commit(REDUCE_FOOD_COUNT,{food})
            }
        },
     },
     getters:{
         //总的数量
        totalCount (state){
           return state.cartFoods.reduce((pre,food)=>pre + food.count,0)
        }, //0是初始值
         //总的价格
        totalPrice (state){
           return state.cartFoods.reduce((pre,food)=>pre + food.count*food.price,0)
        } //0是初始值
     }
 }