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
	import {filterNum,subMethod} from '../../../api/api';
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				filterTime: '60',
				msg: '获取验证码',
				flag: true,  // 获取验证码开关
				phone: '', // 发送短信手机号码
				type: '2',  // 获取验证码类型
				_key: '',  // 获取到的验证码 
				num: '',  //输入的验证码
				mon: ''  //提现金额
			}
		},
		methods: {
			filterNum: function() {
				let _this = this;
				let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
				if(!myreg.test(_this.phone)){
					alert('请输入正确的手机号')
					return false
				}
				if(_this.flag == true){
					_this.flag = false;
					let t = setInterval(function(){
						_this.filterTime--;
						if (_this.filterTime <= 0) {							
							clearInterval(t);   // 当倒计时时间小于0时，清除时间函数并且将时间开关打开
							_this.flag = true;
							_this.msg = '获取验证码';
						} else {
							_this.msg = '重新发送(' + _this.filterTime + ')'; // 返回最初状态；
						}
					}, 1000);
					_this.filterTime = '60';
					console.log(_this.type);
					let params = {
							phone: _this.phone,
							type: _this.type,
						};
					filterNum(params).then(function(res){
						if(res.code == '200'){							
							_this._key = res.data.key;
						}
					}).catch(function(err){
						Toast(err.data.message);
					})
				}
			},
			subMethod: function(){
				let _this = this;
				if (_this.Trim(_this.num, 'g') == '') {
					alert('请正确输入你收到的验证码');
					return;
				}	
				let params = {
					verification_key: _this._key,
					verification_code: _this.num,
					type: _this.type,
					money: _this.mon,
				};		
				subMethod(params).then(function(res){
					_this.$router.push('/balance/paySafe/forgetPsdNext')
				}).catch(function(err){
					Toast(err.data.message);
				})
			}
		},
		mounted() {
			
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
				height: 98px;
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