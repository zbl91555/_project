<template>
	<div class="app-container">
		<form class="main">
			<div class="list">
				<div class="list-detail">
					<p>手机号</p>
					<input type="text" v-model="phone" placeholder="输入手机号" pattern="[0-9]*"/>
					<span @click="filterNum()">{{msg}}</span>
				</div>
			</div>
			<div class="list last">
				<div class="list-detail">
					<p>验证码</p>
					<input type="text" v-model="num" placeholder="输入验证码" pattern="[0-9]*"/>
				</div>
			</div>
			<div class="sub">
				<span @click="subMethod()">提交</span>
			</div>
		</form>
	</div>
</template>

<script>
import {filterNum, subMethod} from '../../../api/api'
import { Toast } from 'vant'
export default {
  data () {
    return {
      filterTime: '60',
      msg: '获取验证码',
      flag: true, // 获取验证码开关
      phone: '', // 发送短信手机号码
      type: '2', // 获取验证码类型
      _key: '', // 获取到的验证码
      num: '', // 输入的验证码
      money: '', // 提现金额
      tel: '', // 提现金额
      getMobile: ''
    }
  },
  methods: {
    filterNum: function () {
      let _this = this
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(_this.phone)) {
        alert('请输入正确的手机号')
        return false
      }
      if (_this.flag == true) {
        _this.flag = false
        let t = setInterval(function () {
          _this.filterTime--
          if (_this.filterTime <= 0) {
            clearInterval(t) // 当倒计时时间小于0时，清除时间函数并且将时间开关打开
            _this.flag = true
            _this.msg = '获取验证码'
          } else {
            _this.msg = '重新发送(' + _this.filterTime + ')' // 返回最初状态；
          }
        }, 1000)
        _this.filterTime = '60'
        if (_this.phone != _this.getMobile) {
          _this.type = 3
        }
        let params = {
          phone: _this.phone,
          type: _this.type
        }
        filterNum(params).then(function (res) {
          _this._key = res.data.key
        }).catch(function (err) {
          Toast(err.data.message)
        })
      }
    },
    subMethod: function () {
      if (this.Trim(this.phone, 'g') == '') {
        Toast('手机号不能为空')
        return
      }
      if (this.Trim(this.num, 'g') == '') {
        Toast('请正确输入你收到的验证码')
        return
      }
      if (!this._key) {
        Toast('请先获取验证码')
        return
      }
      if (this.phone != this.getMobile) {
        this.type = 3
      }
      let params = {
        verification_key: this._key,
        verification_code: this.num,
        type: this.type
      }
      subMethod(params).then(res => {
        console.log(this.type)
        if (this.type == 3) {
          this.$router.push('/buyerCenter/buyerSet')
        }
        if (this.type == 1) {
          this.$router.push('/buyerCenter/buyerSet')
        }
      }).catch(function (err) {
        Toast(err.data.message)
      })
    }
  },
  mounted () {
    this.getMobile = localStorage.getItem('mobile')
    this.type = this.$route.params.type // 验证类型
  }
}
</script>

<style lang="less" scoped>
	@border-color: #d2d2d2;
	@pad: 30px;
	.app-container {
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
			height: 100px;
			.list-detail{
				border-bottom: 1px solid @border-color;
				box-sizing: border-box;
				height: 101px;
				width: 100%;
				float: left;
				position: relative;
				span{
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
				width: 75%;
				height: 90px;
				margin-top: 5px;
				color: #999;
				font-size: 24px;
				border: none;
				outline: none;
				-webkit-tap-highlight-color: transparent;
			}
			p,
			input {
				float: left;
			}
		}
		.list.last .list-detail{
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
