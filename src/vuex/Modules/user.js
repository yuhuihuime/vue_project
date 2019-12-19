/* 
mutations + actions + state + getters
 */
 import {
    RECEIVE_USER,
    RECEIVE_TOKEN,
    RESET_USER,
    RESET_TOKEN
} from '../mutations-type'

import {
    reqAutoLogin,
} from '../../api'

 export default{
     state:{
        user:{},
        token:localStorage.getItem('token_key')||'',
     },
     mutations:{        
        [RECEIVE_USER](state,user){
            state.user = user
        },
        [RECEIVE_TOKEN](state,token){
            state.token = token
        },
        [RESET_USER](state,{user}){
            state.user = {}
        },
        [RESET_TOKEN](state,{token}){
            state.token = ''
        }
     },
     actions:{
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
     },
     getters:{

     }
 }