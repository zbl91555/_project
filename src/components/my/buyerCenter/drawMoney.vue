<template>
	<div class="app-containerdraw">
		<div v-if="nowPage">
			<div class="gray"></div>
			<div class="titleDraw">提现金额
				<input type="text" @focus="$focus()" @blur="$blur()" pattern="[0-9]*" v-model="yue"/>
			</div>
			<p class="tips">平台设定提现金额上限额度为{{limit}}元，最低额度1元<br />普通用户每天提现1次，认证商家每天可提现2次</p>
			<div class="btn"  @click="walletWithdrawalSubmit">
					确认
			</div>
		</div><!-- v-if="finishPage" :msg="msg" -->
		<certificationPaySucces v-if="downPage" :msg="msg"></certificationPaySucces>
	</div>
</template>

<script>
import certificationPaySucces from '../sellerCenter/certificationPaySucces'
import {walletWithdrawal, walletWithdrawalSubmit} from '../../../api/api'
import { Toast } from 'vant'
export default {
  data () {
    return {
      yue: '您现在的余额为：0元',
      limit: '0',
      active: false,
      mobile: '',
      type: '1', // 提现调用验证码接口的类型
      msg: [
        {scrib: '提现成功'},
        {money: ''},
        {link: '/balanceIndex/user'},
        {boleen: false}
      ],
      nowPage: true,
      downPage: false
    }
  },
  components: {
    certificationPaySucces
  },
  methods: {
    $focus: function () {
      this.yue = ''
    },
    $blur: function () {
      this.active = true
    },
    walletWithdrawal () {
      walletWithdrawal().then(res => {
        let _data = res.data
        this.yue = '您现在的余额为：' + _data.balance + '元'
        this.limit = _data.cashLimit
        this.active = _data.submitIs
      })
        .catch(function (err) {
          console.log(err)
        })
    },
    walletWithdrawalSubmit: function () {
      if (isNaN(this.yue) == true || this.Trim(this.yue, 'g') == '' || this.yue.charAt(0) == '0') {
        Toast('请输入正确的金额')
      }
      if (this.yue <= 0) {
        Toast('提现金额必须大于￥1元')
      }
      let params = {
        price: this.yue
      }
      walletWithdrawalSubmit(params).then(res => {
        console.log(res.data)
        this.msg[1].money = this.yue
        this.nowPage = false
        this.downPage = true
        this.info = res.data
      })
        .catch(err => {
          Toast(err.data.message)
        })
    }
  },
  mounted () {
    this.walletWithdrawal()
  }
}
</script>

<style lang="less" scoped>
	/*
	* @border-color: 统一边框颜色coupon
	* */
	@border-color: #d2d2d2;
	.app-containerdraw{
		min-height: 1234px;
		background-color: #ededed;
		/*padding: 0 30px;*/
		box-sizing: border-box;
	}
	.gray{
		height: 20px;
		background-color: #ededed;
	}
	input{
		outline: none;
		border: none;
		color: #d2d2d2;
		margin-left: 20px;
	}
	.titleDraw{
		padding: 40px 20px;
		font-size: 28px;
		color: #333;
		background: white;
	}
	.titleDraw input{
		font-size: 28px;
	}
	.op{
		height: 60px;
		width: 100%;
		border-bottom: 1px solid @border-color;
		/*span{
			display: block;
			width: 2px;
			height: 30px;
			background-color: #000;
			margin-right: 10px;
			float: left;
		}*/
		input{
			border:none;
			background: #ededed;
			display: block;
			width: 95%;
			height: 30px;
			font-size: 24px;
			color: #999;
			float: left;
			-webkit-tap-highlight-color: transparent;
		}
	}
	.tips{
		margin-top: 20px;
		color: #666666;
		line-height: 1.5;
		padding-left: 20px;
	}
	.btn{
		width: 90%;
		height: 88px;
		background-color: #08BA06;
		margin: 0 auto;
		margin-top: 200px;
		text-align: center;
		line-height: 88px;
		font-size: 28px;
		color:white;
	}
</style>
