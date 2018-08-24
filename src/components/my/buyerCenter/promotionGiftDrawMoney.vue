<template>
	<div class="app-containerProm">
		<div class="list">
			<p>提现金额</p>
			<input type="text" v-model="price" placeholder="最低提现金额100元" />
		</div>
		<div class="tips">
			可提现金额<span v-if='info.balance'>￥{{info.balance}}</span>
			<span v-else>￥0</span>，
			今日余：<span>{{2-info.times}}</span>次
		</div>
		<div class="sub">
			<span @click="rewardWithdrawalSubmit()">微信提现</span>
		</div>
	</div>
</template>


<script>
	import {rewardWithdrawal,rewardWithdrawalSubmit} from '../../../api/api'
	export default {
		data() {
			return {
				info:{},
				price:''
			}
		},
		methods: {
			rewardWithdrawal:function(){
				let _this = this;
				rewardWithdrawal().then(function(res){
					 _this.info =res.data
				})
				.catch(function(err){
					console.log(err);
				})
			},
			rewardWithdrawalSubmit:function(){
				let _this = this;
				let params = {
			            price:this.price,
			      };
				rewardWithdrawalSubmit(params).then(function(res){
					_this.$router.push('/buyerCenter/PromotionGift')
					 _this.info =res.data
				})
				.catch(function(err){
					console.log(err.message);
				})
			},
		},
		mounted() {
			this.rewardWithdrawal();
		},
	}
</script>

<style lang="less" scoped>
	/*
	 * @border-color: 统一边框颜色
	 * */
	
	@border-color: #e5e5e5;
	.app-containerProm {
		min-height: 1234px;
		background-color: #f4f4f4;
		padding-top: 30px;
	}
	
	.app-containerProm .list {
		height: 110px;
		width: 100%;
		background-color: #fff;
		border-bottom: 1px solid @border-color;
		border-top: 1px solid @border-color;
		p {
			width: 178px;
			line-height: 110px;
			font-size: 28px;
			color: #333;
			padding: 0 30px;
			box-sizing: border-box;
		}
		input {
			display: inline-block;
			width: 72%;
			border: none;
			outline: none;
			-webkit-tap-highlight-color: transparent;
			font-size: 24px;
			color: #999;
			height: 107px;
			margin-top: 1px;
		}
		p,
		input {
			float: left;
		}
	}
	.app-containerProm .tips{
		height: 65px;
		line-height: 65px;
		color: #999;
		padding: 0 30px;
	}
	.app-containerProm .sub {
		height: 88px;
		margin-top: 200px;
		padding: 0 30px;
		span {
			display: block;
			width: 100%;
			height: 100%;
			line-height: 88px;
			text-align: center;
			background-color: #d2d2d2;
			border-radius: 5px;
			color: #fff;
			font-size: 30px;
		}
	}
</style>