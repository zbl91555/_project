<template>
	<div class="looseChange">
		<div class="head"  v-if="info.type == '1'">
			<div>支出金额</div>
			<div>-{{info.price}}</div>
		</div>
		<div class="head"  v-else>
			<div>收入金额</div>
			<div>+{{info.price}}</div>
		</div>
		<div class="lookRelated" v-if="info.table == 'order'">
			<router-link  :to="'/orderDetail/'+info.order_id">
				<div class="iconfont icon-right"></div>
				<div>查看相关订单</div>
			</router-link>
		</div>

		<div class="deal">
			<div class="line">
				<div>交易种类</div>
				<div>{{info.reason}}</div>
			</div>
			<div class="line">
				<div>交易号</div>
				<div>{{info.sn}}</div>
			</div>
			<div class="line">
				<div>交易时间</div>
				<div>{{timestampToTime(info.addTime)}}</div>
			</div>
			<div class="line">
				<div>交易方式</div>
				<div>{{info.pos}}</div>
			</div>
		</div>
	</div>

</template>

<script>
	import {walletShow} from '../../api/api'
	export default {
		data() {
			return {
				id:'' ,
				info:{},
			}
		},
		methods: {
			walletShow(){ 
				let _this = this; 
			    walletShow(_this.id).then(function (response) { 
			        _this.info = response.data;
				})
			    .catch(function (error) {
			        console.log(error);
			    });
		    },
		},
		mounted() {
			this.id = this.$route.params.id;
			this.walletShow();
		},
	}
</script>

<style scoped>
	.looseChange{
		background: #f4f4f4
	}
	.looseChange .head{
		height: 49px;
		border-bottom: 1px solid #c3c3c3;
		background:#ffffff;
		overflow: hidden;
		padding:48px 26px;
	}
	.looseChange .head div:nth-child(1){
		float:left;
		font-size:32px;
		color: #a1a1a1
	}
	.looseChange .head div:nth-child(2){
		float:right;
		font-size: 48px;
	}
	.looseChange .lookRelated{
		overflow: hidden;
		height:28px;
		background:#ffffff;
		padding:30px 25px 30px 0;
		margin-bottom: 20px;
	}
	.looseChange .lookRelated div{
		float:right;
		margin: 0;
		font-size: 28px;
		line-height:28px;
		color: #a1a1a1
	}
	.looseChange .lookRelated div:nth-child(1){
		margin-left: 5px
	}
	.looseChange .deal{
		height: 334px;
		background:#ffffff;
		padding:48px 32px 0px 32px;
	}
	.looseChange .deal .line{
		overflow: hidden;
		height: 73px;
		font-size: 28px;
	}
	.looseChange .deal .line div:nth-child(1){
		float:left;
		color: #a1a1a1
	}
	.looseChange .deal .line div:nth-child(2){
		float:right;
	}
</style>