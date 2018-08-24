<template>
	<div class="app-container">
		<form class="main">
			<div class="list">
				<div class="list-detail">
					<p>姓名</p>
					<input type="text" v-model="cardname" placeholder="输入姓名"/>
				</div>
			</div>
			<div class="list last">
				<div class="list-detail">
					<p>身份证</p>
					<input type="text" v-model="cardid" placeholder="输入身份证号"/>
				</div>
			</div>
			
			<div class="sub">
				<span @click="identityCheck()">下一步</span>
			</div>
		</form>
	</div>
</template>

<script>
import {identityCheck} from '../../../api/api';
import { Toast } from 'vant';
	export default {
		data() {
			return {
				cardid:'',
				cardname:'',
			}
		},
		methods: {
			identityCheck(){
				let _this = this;
				if (_this.Trim(_this.cardname, 'g') == '') {
					Toast('姓名不能为空');
					return;
				}
				if (_this.Trim(_this.cardid, 'g') == '') {
					Toast('身份证号码不能为空');
					return;
				}
				let params = {
					cardid: _this.cardid,
					cardname: _this.cardname,
				};
				identityCheck(params).then(function(res){
					_this.$router.push('/newforgetPsd')
				}).catch(function(err){
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