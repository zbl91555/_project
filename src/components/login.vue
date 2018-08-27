<template>
  <div class="loginValidation">
    <!-- 手机号 -->
    <div class="login" v-show="show">
      <i class="iconfont icon-guanbi" @click="close()"></i>
      <p>登录</p>
      <div class="region">
        国家/地区
        <i class="iconfont icon-right"></i>
      </div>
      <div class="phone">
         <input type="number" class="phonenumber" name="phonenumber" placeholder="请输入手机号"
        v-on:input ="choose()"  ref="input1" v-model="phone">
      </div>
      <i class="tipe" v-show="verificationCode"> {{tipe}} </i>
      <div class="nextStep" @click="nextStep()" :class="{ selected: hasvalidation }">下一步</div>
    </div>
    <!-- 验证码 -->
    <div class="validation" v-show="shows">
      <i class="iconfont icon-guanbi" @click="closes()"></i>
      <p>请输入验证码</p>
      <div class="region">
        {{phone}}
        <i class="time">{{count}}s</i>
      </div>
      <div class="phone">
        <input type="number" class="validationnumber" name="validationnumber" placeholder="请输入验证码"
        v-on:input ="chooses()"  ref="input2"  v-model="message">
      </div>
      <i class="tipe" v-show="verificationCodes"> {{tipes}} </i>
      <div class="nextStep" @click="login()" :class="{ selected: hasvalidations }">登录</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getLoginMobileCode, loginMobile } from '../api/api'
export default {
  name: 'login',
  data () {
    return {
      show: true,
      shows: false,
      count: '',
      hasvalidation: false,
      hasvalidations: false,
      verificationCode: false,
      verificationCodes: false,
      phone: '',
      tipe: '',
      tipes: '',
      message: '',
      key: ''
    }
  },
  methods: {
    close () {
      let _this = this
      _this.show = false
    },
    closes () {
      let _this = this
      _this.shows = false
    },
    // 下一步
    nextStep () {
      let _this = this
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (_this.phone == '') {
        _this.verificationCode = true
        _this.tipe = '*请输入手机号！'
      } else if (!reg.test(this.phone)) {
        _this.verificationCode = true
        _this.tipe = '*手机号输入有误，请重新输入！'
      } else {
        _this.show = false
        _this.shows = true
        const TIME_COUNT = 60
        localStorage.setItem('phone', this.phone)
        if (!this.timer) {
          this.count = TIME_COUNT
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
          this.getCode()
        }
      }
    },
    // 获取验证码
    getCode () {
      let params = {
        phone: this.phone,
        type: 0
      }
      getLoginMobileCode(params)
        .then(response => {
          if (response.code == 200) {
            this.key = response.data.key
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 登录
    login () {
      let _this = this
      if (_this.message == '') {
        _this.verificationCodes = true
        _this.tipes = '*请输入验证码！'
      } else if (!(_this.message.length == 4)) {
        _this.verificationCodes = true
        _this.tipes = '*验证码输入有误，请重新输入！'
      } else {
        _this.verificationCodes = false
        _this.logins()
      }
    },
    logins () {
      let _this = this
      let params = {
        verification_key: _this.key,
        verification_code: _this.message,
        type: 0
      }
      loginMobile(params)
        .then(response => {
          if (response.code == 200) {
            if (response.message === '已经登陆') {
              _this.$router.push({ path: '/recommend' })
              return
            }
            if (response.data.userInfo.type) {
              localStorage.setItem('mylink', true)
            } else {
              localStorage.setItem('mylink', false)
            }
            // cookies.set('Id', response.data.data.auth_id)
            // cookies.setItem('token', response.data.data.access_token)
            // _this.shows = false;
            // sessionStorage.setItem('token', response.data.access_token)
            // _this.$router.push({name:'author',params:{mobile:_this.phone}})
            _this.$store
              .dispatch('loginSuccess', response.data)
              .then(response => {
                // alert('登陆成功跳转首页')
                _this.$router.push({ path: '/home' })
              })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    choose () {
      let _this = this
      if (_this.$refs.input1.value == '') {
        _this.hasvalidation = false
      } else {
        _this.hasvalidation = true
      }
    },
    chooses () {
      let _this = this
      if (_this.$refs.input2.value == '') {
        _this.hasvalidations = false
      } else {
        _this.hasvalidations = true
      }
    }
  },
  created () {
    if (localStorage.getItem('phone')) {
      this.hasvalidation = true
      this.phone = localStorage.getItem('phone')
    }
  }
}
</script>

<style scoped>
.loginValidation {
  background-color: #999;
  max-width: 750px;
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
}
.loginValidation .login,
.validation {
  width: 494px;
  height: 320px;
  padding: 52px 73px 68px 73px;
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.loginValidation .validation {
  height: 430px;
}
.loginValidation .login p,
.validation p {
  text-align: center;
  font-size: 38px;
  margin: 0 auto 0px auto;
}
.loginValidation .phone,
.region {
  height: 116px;
  line-height: 116px;
  font-size: 31px;
  border-bottom: 1px solid #e5e5e5;
}
.loginValidation .login .region {
  display: none;
}
.loginValidation .phone {
  margin-bottom: 20px;
}
.loginValidation .nextStep {
  width: 494px;
  height: 86px;
  background-color: #d2d2d2;
  border-radius: 5px;
  text-align: center;
  line-height: 86px;
  color: #fff;
  font-size: 30px;
  margin-top: 40px;
}
.loginValidation .validation .nextStep {
  background-color: #d2d2d2;
}
.loginValidation .icon-right {
  font-size: 28px;
  color: #999;
  float: right;
}
.loginValidation .time {
  float: right;
  font-size: 28px;
  color: #9e2026;
}
.loginValidation .icon-guanbi {
  position: absolute;
  right: 30px;
  top: 30px;
  color: #d2d2d2;
  font-size: 60px;
}
.loginValidation input {
  background: none;
  outline: none;
  border: 0px;
  color: #000;
}
.loginValidation input::-webkit-input-placeholder {
  color: #999;
}
.loginValidation .selected {
  background-color: #9e2026;
}
.loginValidation .validation .selected {
  background-color: #9e2026;
}
.loginValidation .tipe {
  font-size: 8px;
  display: inline-block;
  text-align: left;
  color: #9e2026;
}
</style>
