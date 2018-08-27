<template>
	<div class="app-container">
		<form class="main" v-if="nowPage">
			<div class="list last">
				<div class="list-detail">
					<p>支付密码</p>
					<!-- newAgainPwd -->
					<div v-if="info == '下一步'">
						<input @input="passwordVerifiers('newPwd')" type="password" v-model="newPwd" placeholder="填写您的支付密码" pattern="[0-9]*"/><div>{{wrongNowPsd}}</div>
					</div>
					<div v-else>
					<input @input="passwordVerifiers('newAgainPwd')" type="password" v-model="newAgainPwd" placeholder="再次填写您的支付密码" pattern="[0-9]*"/><div>{{wrongNowPsd}}</div>
					</div>
				</div>
			</div>
			<div class="sub">
				<span @click="walletForgetpwd()">{{info}}</span>
			</div>
		</form>
		<!-- <forgetPsdNext v-if="subPage" :newPwd='newPwd'></forgetPsdNext> -->
	</div>
</template>
<script>
// import forgetPsdNext from "./forgetPsdNext";
import { walletForgetpwdSubmit } from '../../../api/api'
import { Toast } from 'vant'
import md5 from 'md5'
export default {
  components: {
    // forgetPsdNext
  },
  data () {
    return {
      nowPage: true,
      subPage: false,
      newAgainPwd: '',
      newPwd: '',
      wrongNowPsd: '',
      info: '下一步',
      prompt: '填写您的支付密码'
    }
  },
  methods: {
    // 提交
    submission () {
      if (this.Trim(this.newAgainPwd, 'g').length < 6) {
        this.wrongNowPsd = '密码必须是6位数字'
        return
      }
      if (this.newPwd != this.newAgainPwd) {
        this.wrongNowPsd = '确认2次密码一致'
        return
      }
      let params = {
        newPwd: md5(this.newAgainPwd)
      }
      walletForgetpwdSubmit(params)
        .then(res => {
          this.$router.push('/balanceIndex/user')
        })
        .catch(err => {
          Toast(err.data.message)
        })
    },
    // 密码输入校验
    passwordVerifiers (val) {
      let reg = /(^\s+)|(\s+$)|\s+/g
      if (reg.test(this[val])) {
        this[val] = this.Trim(this[val], 'g')
        Toast('支付密码必须是6位数字')
        return true
      };
      if (isNaN(+this[val])) {
        let length = this[val].length
        this[val] = this[val].slice(0, length - 1)
        Toast('支付密码必须是6位数字')
        return true
      };
      if (this[val].length > 6) {
        this[val] = this[val].slice(0, 6)
        Toast('支付密码必须是6位数字')
        return true
      };
      return false
    },
    walletForgetpwd () {
      if (this.info == '提交') {
        this.submission()
      } else {
        if (this.passwordVerifiers('newPwd')) {
          return
        } else if (this.Trim(this.newPwd, 'g').length < 6) {
          Toast('支付密码必须是6位数字')
          return
        }
        this.info = '提交'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  /*
  * @border-color: 统一边框颜色coupon
  * */

@border-color: #d2d2d2;
@pad: 30px;
.app-container {
  min-height: 1234px;
  background-color: #ededed;
  padding-top: @pad;
}

.iconfont {
  font-size: 24px;
}

.main {
  overflow: hidden;
  .list {
    background-color: #fff;
    padding-left: @pad;
    height: 100px;
    .list-detail {
      border-bottom: 1px solid @border-color;
      box-sizing: border-box;
      height: 100px;
      width: 100%;
      float: left;
      position: relative;
      span {
        display: block;
        width: 174px;
        height: 60px;
        border-radius: 30px;
        background-color: #9e2026;
        line-height: 60px;
        text-align: center;
        color: #fff;
        position: absolute;
        right: 30px;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    p {
      line-height: 100px;
      width: 160px;
      color: #000;
      font-size: 28px;
    }
    input {
      display: block;
      width: 40%;
      color: #999;
      font-size: 24px;
      border: none;
      outline: none;
      height: 98%;
      -webkit-tap-highlight-color: transparent;
    }
    div {
      height: 100%;
      line-height: 100px;
      color: red;
    }
    p,
    input {
      float: left;
    }
  }
  .list.last .list-detail {
    border-bottom: none;
  }
}

.sub {
  height: 88px;
  margin-top: 200px;
  padding: 0 @pad;
  span {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 88px;
    text-align: center;
    background-color: #9e2026;
    border-radius: 5px;
    color: #fff;
    font-size: 28px;
  }
}
</style>
