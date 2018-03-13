<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <span :class="{on: loginWay}" @click="setLoginWay(true)">短信登录</span>
          <span :class="{on: !loginWay}" @click="setLoginWay(false)">密码登录</span>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button class="get_verification"
                      :class="{right_phone: rightPhone}" v-show="!computeTime" @click.prevent="getCode" >获取验证码</button>
              <button disabled="disabled" v-show="computeTime" class="get_verification" >{{computeTime}}s</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码"
                       v-if="showPassword" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码"
                       v-if="!showPassword" v-model="pwd">
                <div class="switch_button off" :class="showPassword?'on':'off'" @click="switchShowPassword">
                  <div class="switch_circle" :class="{on: showPassword}"></div>
                  <span class="switch_text" v-show="showPassword">abc</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha" @click="changeCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
    <AlertTip  @closeTip="closeTip" :alertText="alertText" v-if="alertShow"/>
  </div>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import {sendCode,smsLogin,pwdLogin} from '../../api'
  export default {

    data () {
      return {
        loginWay: true, // true代表短信登陆, false密码登陆
        phone: '', //手机号
        code:'',//短信验证码

        name:'',//用户名
        pwd:'',//密码
        captcha:'',//图片验证

        computeTime: 0, //计时时间
        showPassword:false,//是否显示输入密码
        alertText:'',//文本提示框
        alertShow:false
      }
    },
    computed:{
      rightPhone(){
        // 以1开头的11数字
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods: {
      setLoginWay (loginWay) {
        this.loginWay = loginWay
      },
      async getCode () {
        if(this.rightPhone) { // 输入了正确的手机号
          this.computeTime = 60
          const intervalId = setInterval(() => {
            this.computeTime--
            if (this.computeTime === 0) {
              clearInterval(intervalId)
            }
          }, 1000)
          //发送ajax请求，向手机发送验证码
          const result = await sendCode(this.phone)
          if (result.code === 1) {
            clearInterval(intervalId)
            this.alertShow = true
            this.alertText = result.msg
          }
        }
      },
      // 切换密码的显示和隐藏
      switchShowPassword () {
        this.showPassword = !this.showPassword
      },
      changeCaptcha(event){
        event.target.src = 'http://localhost:3000/captcha?time='+new Date()
      },
    async  login(){
        let result;
        if(this.loginWay){
          // 短信登陆
          const {phone,code}=this
          if(!this.rightPhone){// 手机号
            this.alertShow = true
            this.alertText = '请输入正确的手机号'
            return
          }else if(!/^\d{6}$/.test(code)){//验证码
            this.alertShow = true
            this.alertText = '请输入正确的验证码'
            return
          }
          // 发送ajax请求 手机号验证码登陆提交登陆请求
          result =await smsLogin({phone,code})
        } else {// 密码登陆
          const {name,pwd,captcha} = this
          if(!name){
            this.alertShow = true
            this.alertText = '请输入用户名'
            return
          }else if(!pwd){
            this.alertShow = true
            this.alertText = '请输入密码'
            return
          }else if(!captcha){
            this.alertShow = true
            this.alertText = '请输入验证码'
            return
          }
          /*
          用户名密码登陆
          */
          result =await pwdLogin({name, pwd, captcha})
        }
        if(result.code===0){
          const userInfo = result.data
          this.$store.dispatch('recordUserInfo', userInfo)
          // 回退
          this.$router.back()
        }else {
          this.alertShow = true
          this.alertText = result.msg
        }
      },
        // 关闭提示框
        closeTip () {
          this.alertShow = false
      }
    },
    components:{
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
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
          >span
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
                &.right_phone
                  color: black
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
                  &.on
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
