<template>
	<div class="app-container">
		<div class="main">
			<div class="list">
				<div class="con">
					<p>当前密码</p>
					<input type="password" @blur="loseFocus('currentPassword')" @input="passwordLength('currentPassword')" v-model="pwd.oldPwd" value="" placeholder="填写您的当前密码" pattern="[0-9]*"/>
					<div>{{wrongNowPsd}}</div>
				</div>
			</div>
			<div class="list">
				<div class="con">
					<p>新密码</p>
					<input type="password" @blur="loseFocus('newPassword')" @input="passwordLength('newPassword')" v-model="pwd.newPwd" value="" placeholder="填新写的交易密码" pattern="[0-9]*"/>
					<div>{{wrongNewPsd}}</div>
				</div>
			</div>
			<div class="list last">
				<div class="con">
					<p>确认密码</p>
					<input type="password" @blur="loseFocus('DetermineTheNewPassword')" @input="passwordLength('DetermineTheNewPassword')" v-model="pwd.reNewPwd" value="" placeholder="再输入一遍确认您的交易密码" pattern="[0-9]*"/>
					<div>{{wrongAgainPsd}}</div>
				</div>
			</div>
			<div class="sub">
				<span @click="walletResetpwd()">提交</span>
			</div>
		</div>
	</div>
</template>
<script>
import { walletResetpwd } from '../../../api/api'
import md5 from 'md5'
import { Toast } from 'vant'
export default {
  data () {
    return {
      pwd: {
        oldPwd: '',
        newPwd: '',
        reNewPwd: ''
      },
      wrongNowPsd: '',
      wrongNewPsd: '',
      wrongAgainPsd: ''
    }
  },
  methods: {
    // 失去焦点校验
    loseFocusVerifiers (val) {
      if (val.length == 0) {

      } else if (val.length < 6) {
        Toast('支付密码必须是6位数字')
      }
    },
    // 密码输入校验
    passwordVerifiers (val, attribute) {
      let reg = /(^\s+)|(\s+$)|\s+/g
      if (reg.test(val)) {
        this.pwd[attribute] = this.Trim(val, 'g')
        Toast('支付密码必须是6位数字')
      }
      if (isNaN(+val)) {
        let length = val.length
        this.pwd[attribute] = val.slice(0, length - 1)
        Toast('支付密码必须是6位数字')
      }
      if (val.length > 6) {
        this.pwd[attribute] = val.slice(0, 6)
        Toast('支付密码必须是6位数字')
      }
    },
    // 失去焦点事件
    loseFocus (val) {
      let _this = this
      switch (val) {
        case 'currentPassword':
          _this.loseFocusVerifiers(_this.pwd.oldPwd)
          break
        case 'newPassword':
          _this.loseFocusVerifiers(_this.pwd.newPwd)
          break
        case 'DetermineTheNewPassword':
          _this.loseFocusVerifiers(_this.pwd.reNewPwd)
          break
      }
    },
    // input输入事件
    passwordLength (val) {
      let _this = this
      switch (val) {
        case 'currentPassword':
          _this.passwordVerifiers(_this.pwd.oldPwd, 'oldPwd')
          break
        case 'newPassword':
          _this.passwordVerifiers(_this.pwd.newPwd, 'newPwd')
          break
        case 'DetermineTheNewPassword':
          _this.passwordVerifiers(_this.pwd.reNewPwd, 'reNewPwd')
          break
      }
    },
    clear () {
      this.wrongNowPsd = ''
      this.wrongNewPsd = ''
      this.wrongAgainPsd = ''
    },
    // 提交
    walletResetpwd () {
      let _this = this
      if (
        this.Trim(_this.pwd.oldPwd, 'g').length < 6 ||
        this.Trim(_this.pwd.newPwd, 'g').length < 6 ||
        this.Trim(_this.pwd.reNewPwd, 'g').length < 6
      ) {
        Toast('支付密码必须是6位数字')
        return
      }
      if (
        _this.Trim(_this.pwd.oldPwd, 'g') === _this.Trim(_this.pwd.newPwd, 'g')
      ) {
        Toast('新密码不能和老密码相同')
        return
      }
      if (_this.pwd.newPwd != _this.pwd.reNewPwd) {
        Toast('请确认两次的密码一致')
        return
      }
      let params = {
        oldPwd: md5(_this.pwd.oldPwd),
        newPwd: md5(_this.pwd.newPwd),
        reNewPwd: md5(_this.pwd.reNewPwd)
      }
      walletResetpwd(params)
        .then(function (res) {
          _this.$router.push('/balanceIndex/user')
        })
        .catch(function (err) {
          Toast(err.data.message)
          _this.clear()
        })
    }
  },
  mounted () {}
}
</script>
<style>
.van-toast {
  font-size: 28px;
}
</style>
<style lang="less" scoped>
  /*
  * @border-color: 统一边框颜色coupon
  * */

@border-color: #d2d2d2;
@pad: 30px;
.app-container {
  min-height: 1234px;
  padding-top: 15px;
}

.iconfont {
  font-size: 24px;
}

.main {
  overflow: hidden;
  .list {
    background-color: #fff;
    padding-left: @pad;
    box-sizing: border-box;
    height: 100px;
    .con {
      width: 100%;
      height: 100%;
      border-bottom: 1px solid @border-color;
      box-sizing: border-box;
    }
    p {
      height: 100%;
      line-height: 100px;
      width: 20%;
      color: #000;
      font-size: 28px;
    }
    input {
      display: block;
      width: 60%;
      color: #999;
      font-size: 28px;
      border: none;
      outline: none;
      height: 98%;
      -webkit-tap-highlight-color: transparent;
    }
    div {
      width: 40%;
      height: 100%;
      line-height: 100px;
      color: red;
    }
    p,
    input,
    div {
      float: left;
    }
  }
  .list.last .con {
    border-bottom: none;
  }
}

.sub {
  height: 88px;
  margin-top: 200px;
  padding: 0 @pad;
  span {
    display: block;
    /*-webkit-appearance: none;*/
    /*outline: none;
			border: none;*/
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
