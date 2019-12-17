// 向外暴露接口请求的函数模块
import axios from './axios'

export const reqAddress = (longitude,latitude) => axios(`/position/${latitude},${longitude}`)

export const reqCategorys = () => axios('/index_category')

export const reqShops = (longitude,latitude) => axios('/shops',{params:{latitude,longitude}})

//请求短信验证码
export const reqSmsCode = ({phone})=>axios('/sendcode',{params:{phone}})

//请求短信登录
export const reqSmsLogin = ({phone,code})=>axios('/login_sms',{params:{phone,code}})
//请求密码登录
export const reqPwdLogin = ({name,pwd,captcha})=>axios.post('/login_pwd',{name,pwd,captcha})
// export const reqPwdLogin = ({name, pwd, captcha}) => axios({
//     url: '/login_pwd',
//     method: 'POST',
//     data: {
//       name,
//       pwd,
//       captcha
//     }
//   })