<template>
     <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:isShowMsm}" @click="isShowMsm=true">短信登录</a>
            <a href="javascript:;" :class="{on:!isShowMsm}" @click="isShowMsm=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:isShowMsm}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model='phone' name="myphone" v-validate="{required:true,regex: /^1\d{10}$/}">

                <button :disabled="!isRightPhone || computedTime>0" class="get_verification" :class="{on:isRightPhone}" @click.prevent="sendCode">{{computedTime>0?`短信已发送(${computedTime}s)`:'获取验证码'}}</button>    
                <span style="color: red;" v-show="errors.has('myphone')">{{ errors.first('myphone') }}</span>

              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码"  v-model="code" name="code" v-validate="{required: true,regex: /^\d{6}$/}">
                <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!isShowMsm}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机号/邮箱/用户名" v-model="name" name="name" v-validate="'required'">
                  <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </section>
                <section class="login_verification">

                  <input :type="togglePwd?'text':'pwd'" maxlength="8" placeholder="密码" v-model="pwd" name="mypwd" v-validate="'required'">

                  <span style="color: red;" v-show="errors.has('mypwd')">{{ errors.first('mypwd') }}</span>

                  <div class="switch_button" :class="togglePwd?'on':'off'" @click="togglePwd=!togglePwd">
                    <div class="switch_circle" :class="{right:togglePwd}"></div>
                    <span class="switch_text">{{togglePwd?'abc':''}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" name="mycaptcha" v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}">

                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="updateImage" >

                  <span style="color: red;" v-show="errors.has('mycaptcha')">{{ errors.first('mycaptcha') }}</span>

                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
</template>
<script>
    import Vue from 'vue'
    import VeeValidate from 'vee-validate'
    import zh_CN from 'vee-validate/dist/locale/zh_CN'
    import { MessageBox,Toast } from 'mint-ui';

    import {reqSmsCode,reqSmsLogin,reqPwdLogin} from '../../api/index.js'

    Vue.use(VeeValidate)
    VeeValidate.Validator.localize('zh_CN', {
      messages: zh_CN.messages,
      attributes: {
        myphone: '手机号',
        code: '验证码',
        name:'手机号/邮箱/用户名',
        mypwd:'密码',
        mycaptcha:'验证码'
      }
    })
    VeeValidate.Validator.extend('myphone', {
      validate: value => {
        return /^1\d{10}$/.test(value)
      },
      getMessage: field => field + '必须是11位手机号码'
    })

    export default {
      data(){
        return {
          isShowMsm:true,
          phone:'',
          code:'',
          name:'',
          pwd:'',
          togglePwd:false,
          computedTime:0,
          captcha:'',
        }
      },
      computed:{
        isRightPhone(){       
          return /^1\d{10}$/.test(this.phone)
        }
      },
      methods:{
        async sendCode(){         
          this.computedTime=10
          const codeTime = setInterval(() => {
            this.computedTime--   
            if(this.computedTime <= 0){
              clearInterval(codeTime)
            }        
          }, 1000);
          const {phone} = this
          const result = await reqSmsCode({phone})  
          console.log(result)
          if(result.code===0){
            //发送成功
            Toast('发送信息成功')         
          }else{
            //发送失败
            MessageBox('提示',result.msg)
          }      
        },
        updateImage(e){
          e.target.src = 'http://localhost:4000/captcha?name='+Date.now()
        },
        async login(){
          let msgArr
          if(this.isShowMsm){
            // 对指定的所有表单项进行验证
            msgArr=['myphone','code']
          }else{
            msgArr=['name','mypwd','mycaptcha']
          }
          const success = await this.$validator.validateAll(msgArr)
          if(success){
            let result
            const {phone,code,name,pwd,captcha} = this
            if(this.isShowMsm){
              result = await reqSmsLogin({phone,code})
            }else{
              result = await reqPwdLogin({name,pwd,captcha})
            }
            //对结果进行统一处理
            if(result.code===0){
              //成功
                // {
                //   "code": 0,
                //   "data": {
                //     "_id": "5a9cd9c6ad5b2d34d42b385d",
                //     "phone": "13716962779",
                //     "token": "abcdxx"
                //   }
                // }
              const user = result.data
              //1.保存数据到vuex的state中===>进行免密登录
              this.$store.dispatch('saveUserInfo',user)
              //2.跳转页面到profile页面
              this.$router.replace({path:'/profile'})

            }else{
              //失败
              MessageBox('提示',result.msg)
            }          
          }
          
        }
    
      }
    }
</script>
<style lang='stylus' scoped>
.loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.on{
                    color #000
                  }
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
              
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
      
</style>