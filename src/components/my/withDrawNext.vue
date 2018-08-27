<template>
	<div class="newRecharge">
		<div class="topUp">
			<div class="head">
				<div>提现</div>
			</div>
			<div class="chargeMoney">
				提现金额
			</div>
			<div class="money" @click="openKeyboard">
				￥<span style="font-size:1rem">{{val}}<i v-show="cursor1" id="cursor1" style="font-size:1rem">|</i></span>
				<span v-if="des" style="font-size:0.5rem;color:#d2d2d2;">请输入提现金额</span>
			</div>
			<div class="border"></div>
			<div class="chargeMoney" style="color:#999999;">当前余额为：{{yue}}元</div>
			<div :class="val==''? 'nextStep':'nextStepC'" @click="walletWithdrawalSubmit">
				下一步
			</div>
			<div class="infuse" >
				<div>普通用户：每次可提现金额上限<i>{{limit}}元</i>，每天提现<i>1次</i></div>
				<div>认证商家：每次可提现金额上限<i>10000元</i>，每天提现<i>2次</i></div>
			</div>
		</div>
		<!-- 自定义键盘-->
		<keyboard :show="keyboard" @typing="typing" @complete="closeKeyboard"/>
		<!-- 提现完成页面 -->
		<withDrawNextDown :price='val' :title="title" :link="link" v-if="downPage"></withDrawNextDown>
		<!-- 是否弹出验证 -->
		<div id="fixednumMain" v-if="showveri">
			<div @click="closeshowveri()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="telsharesomething">
				<form class="main">
					<div class="list">
						<div class="list-detail">
							<p>手机号</p>
							<input type="text" v-model="phone" placeholder="输入手机号" pattern="[0-9]*"/>
							<span @click="filterNum()">{{msg}}</span>
						</div>
					</div>
					<div class="list">
						<div class="list-detail">
							<p>验证码</p>
							<input type="text" v-model="num" placeholder="输入验证码" pattern="[0-9]*"/>
						</div>
					</div>
					<div class="sub">
						<span :class="num==''?'spanBac':'spanBack'" @click="subMethod()">下一步</span>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import withDrawNextDown from './withDrawNextDown'
import { Toast } from 'vant'
import {walletWithdrawal, walletWithdrawalSubmit, filterNum, subMethod} from '../../api/api'
import keyboard from '../home/keyboard' // 数字键盘
export default {
  components: {
    keyboard,
    withDrawNextDown
  },
  // mixins:[assign],
  data () {
    return {
      yue: '',
      limit: '',
      telIs: '',
      // 键盘相关data
      keyboard: false,
      cursor1: false,
      val: '',
      nowPage: true,
      downPage: false,
      title: '余额提现',
      link: '/balanceIndex',
      des: true,
      showveri: false, // 手机号验证
      filterTime: '60',
      msg: '获取验证码',
      flag: true, // 获取验证码开关
      phone: '', // 发送短信手机号码
      type: '2', // 获取验证码类型
      _key: '', // 获取到的验证码
      num: '' // 输入的验证码
    }
  },
  mounted () {
    this.walletWithdrawal()
  },
  methods: {
    openKeyboard () {
      this.keyboard = true
      this.cursor1 = true
      this.des = false
    },
    closeshowveri () {
      this.showveri = false
    },
    closeKeyboard () {
      this.keyboard = false
      this.cursor1 = false
    },
    /* 输入 */
    typing (value) {
      /* 如果是点击删除 */
      if (value === '') {
        this.del()
      }
      /* 获取新的值 */
      this.val = this.val + value
    },
    del () {
      this.val = this.val.slice(0, -1)
    },
    walletWithdrawal () {
      walletWithdrawal().then(res => {
        let _data = res.data
        this.yue = _data.balance
        this.limit = _data.cashLimit
        this.telIs = _data.telIs
      })
        .catch(function (err) {
          console.log(err)
        })
    },
    walletWithdrawalSubmit () {
      if (isNaN(this.val) == true || this.Trim(this.val, 'g') == '' || this.val.charAt(0) == '0') {
        Toast('请输入正确的金额')
        return
      }
      if (this.val <= 0) {
        Toast('提现金额必须大于￥1元')
        return
      }
      if (this.telIs) {
        this.$router.push('/withDrawNextCash/' + this.val)
      } else {
        this.showveri = true
      }
    },
    filterNum () {
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
        let params = {
          phone: _this.phone,
          type: 1
        }
        filterNum(params).then(function (res) {
          _this._key = res.data.key
        }).catch(function (err) {
          Toast(err.data.message)
        })
      }
    },
    // 手机号提交
    subMethod () {
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
      let params = {
        verification_key: this._key,
        verification_code: this.num,
        type: 1
      }
      subMethod(params).then(res => {
        this.showveri = false
        this.$router.push('/withDrawNextCash/' + this.val)
      }).catch(function (err) {
        Toast(err.data.message)
      })
    }
  }
}
</script>

<style scoped>
	.telsharesomething{
		position: fixed;
		left:5%;
		top:35%;
		z-index: 1100;
		width:90%;
		height:400px;
		background: white;
		text-align: center;
		border-radius: 10px;
		padding-top: 20px;
	}
	.telsharesomething .main{
		overflow: hidden;
	}
	.telsharesomething .sub{
		height: 88px;
		margin-top:50px;
		padding: 0 30px;
	}
	.telsharesomething .sub span{
		display: block;
		width: 100%;
		height: 100%;
		line-height: 88px;
		text-align: center;
		border-radius: 5px;
		color: #fff;
		font-size: 28px;
	}
	.telsharesomething .sub .spanBac{
		background: #d2d2d2;
	}
	.telsharesomething .sub .spanBack{
		background: #9e2026;
	}
	.telsharesomething .main .list{
		background-color: #fff;
		padding-left: 30px;
		height: 100px;
	}
	.telsharesomething .main .list.last .list-detail{
		border-bottom: none;
	}
	.telsharesomething .main .list .list-detail{
		border-bottom: 1px solid #d2d2d2;
		box-sizing: border-box;
		height: 101px;
		width: 100%;
		float: left;
		position: relative;
	}
	.telsharesomething .main .list p{
		line-height: 100px;
		width: 160px;
		color: #000;
		font-size: 28px;
		float: left;
	}
	.telsharesomething .main .list input{
		display: block;
		width: 75%;
		height: 90px;
		margin-top: 5px;
		color: #999;
		font-size: 24px;
		border: none;
		outline: none;
		-webkit-tap-highlight-color: transparent;
		float: left;
	}
	.telsharesomething .main .list .list-detail span{
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

	.newRecharge{
		padding-top: 30px;
	}
	.newRecharge .topUp{
		width: 95%;
		height:643px;
		background:#fff;
		margin:0px auto;
	}
	.newRecharge .topUp .head{
		height: 35px;
		background: #f2f2f2;
		font-size: 28px;
		padding: 40px 56px
	}
	.newRecharge .topUp .chargeMoney{
		padding: 30px 56px 20px 56px;
		font-size: 24px;
	}
	.newRecharge .topUp .money{
		padding:0px 56px;
		font-size:48px;
	}
	.newRecharge .topUp .nextStep{
		width: 600px;
		height: 90px;
		background:#d2d2d2;
		border-radius:8px;
		color: white;
		font-size:28px;
		text-align: center;
		line-height:90px;
		margin: 30px auto;
	}
	.infuse{
		width: 600px;
		margin: 0 auto;
		color:#999999;
	}
	.infuse i{
		color: #9e2026
	}
	.border{
		border: 1px solid #d2d2d2;
		width: 600px;
		margin-left:56px;
	}
	.newRecharge .topUp .nextStepC{
		width: 600px;
		height: 90px;
		background:#9e2026;
		border-radius:8px;
		color: white;
		font-size:28px;
		text-align: center;
		line-height:90px;
		margin: 30px auto;
	}
	.newRecharge .topUp .head div:nth-child(1){
		float: left;
	}
	.newRecharge .topUp .head div:nth-child(2){
		float: right;
		color: #9e2026;
	}
	#cursor1 {
		animation: play 0.8s linear infinite;
    }
</style>
