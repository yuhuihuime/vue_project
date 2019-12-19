/* 
对axios的二次封装用于发送ajax请求的函数
 */
import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'
import router from '../router/index'
import {MessageBox,Toast} from 'mint-ui'

const instance = axios.create({
    baseURL:'/api',
    timeout:20000
})
//请求拦截器
instance.interceptors.request.use((config)=>{
    const data = config.data
    if(data instanceof Object){
        config.data = qs.stringify(data)
    }
    //请求时携带token
    //首先获取token,从vuex中读取
    const token = store.state.user.token
    //请求时有token携带token
    if(token){
        config.headers['Authorization'] = token
    }else{
        //没有token又分为需要与不需要
        const needCheck = config.headers.needCheck
        if(needCheck){
            throw new Error('请求出错，请重新登录！')
        }
    }
     return config
})
//相应拦截器
instance.interceptors.response.use(
    response=>{
     return response.data
    },
    error=>{
        //获取response
        const response = error.response
        //响应的错误中又分为没有token，直接拦截，所以没有响应
        if(!response){
            const path = router.currentRoute.path
            if(path !== '/login'){
                //不在login界面才会跳转到login界面
                router.replace('/login')
            }
        }else{
            //又分为发了请求但是token值与服务器的值不匹配（过期/修改本地token）==>401
            //在请求拦截之前发送请求路径不对时===>404
            //其他的错误
            if(response.status===401){
                const path = router.currentRoute.path
                if(path !== '/login'){
                    //不在login界面才会跳转到login界面
                    router.replace('/login')
                    Toast('登录已失效，请重新登录')
                }
            }else if(response.status===404){
              MessageBox('提示','请求资源不存在')
            }else{
               MessageBox('提示' ,error.message)
            }      
        }
        return new Promise(()=>{})
    }
)

export default instance