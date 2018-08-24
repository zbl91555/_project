<template>
	<div class="app-container">
		<form class="main">
			<div class="list last">
				<div class="list-detail">
					<p>支付密码</p>
					<input type="password" v-model="newAgainPwd" placeholder="再次填写您的支付密码" pattern="[0-9]*"/><div>{{wrongNowPsd}}</div>
				</div>
			</div>
			<div class="sub">
				<span @click="walletForgetpwdSubmit()">提交</span>
			</div>
		</form>
	</div>
</template>
<script>
	 import {walletForgetpwdSubmit} from '../../../api/api'
	import md5 from 'md5';
	import { Toast } from 'vant';
	export default {
		props:['newPwd'],
		data() {
			return {
				newAgainPwd: '' , //密码
				wrongNowPsd:'',
			}
		},
		methods: {
			walletForgetpwdSubmit() {
				if (this.Trim(this.newAgainPwd, 'g').length < 6) {
					this.wrongNowPsd = '密码必须是6位数字'
					return;
				}
				if (this.newPwd != this.newAgainPwd) {
					this.wrongNowPsd = '确认2次密码一致'
					return;
				}
				let params = {
					 newPwd: md5(this.newAgainPwd),
				};
				walletForgetpwdSubmit(params).then(res =>{
					this.$router.push('/balanceIndex/user')
				}).catch(err =>{
					Toast(err.data.message);
				})
			}
		},
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
			.list-detail{				
				border-bottom: 1px solid @border-color;
				box-sizing: border-box;
				height: 100px;
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
				width: 40%;
				color: #999;
				font-size: 24px;
				border: none;
				outline: none;
				height: 98%;
				-webkit-tap-highlight-color: transparent;
			}
			div{
				height: 100%;
				line-height: 100px;
				color:red;
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