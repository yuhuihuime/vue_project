/* 
对axios的二次封装用于发送ajax请求的函数
 */
import axios from 'axios'
import qs from 'qs'
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
     return config
})
//相应拦截器
instance.interceptors.response.use(
    response=>{
     return response.data
    },
    error=>{
        alert('请求出错：' + error.message)
        return new Promise(()=>{})
    }
)

export default instance