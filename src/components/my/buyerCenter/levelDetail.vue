<template>
	<div class="app-container">
		<p class="title">淘拍堂买家等级积分说明</p>
		<ul class="list">
			<li><span>0-20</span><span>白丁</span></li>
			<li><span>21-50</span><span>童生</span></li>
			<li><span>51-200</span><span>秀才</span></li>
			<li><span>201-500</span><span>举人</span></li>
			<li><span>501-200</span><span>进士</span></li>
			<li><span>2001-10000</span><span>状元</span></li>
			<li><span>10001-50000</span><span>学士</span></li>
			<li><span>50001-100000</span><span>司徒</span></li>
			<li><span>100001-500000</span><span>太傅</span></li>
			<li><span>500001-1000000</span><span>圣贤</span></li>
		</ul>
		<p class="title">淘拍堂买家积分规则</p>
		<p class="detail">拍品成交价/10=交易买家积分（取整，单笔交易最少积1分）</p>
		<p class="tip">注：每人每天每店铺只积累一次积分</p>
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
	/*
	* @border-color: 统一边框颜色
	* */

	@border-color: #e5e5e5;
	.app-container {
		min-height: 1234px;
		background-color: #f4f4f4;
		padding: 30px 30px 0 30px;
		box-sizing: border-box;
	}
	.title{
		font-size: 34px;
		color: #333;
		line-height: 3;
	}
	.list{
		height: 759px;
		width: 100%;
		background-image: url(../../../assets/images/level.png);
		background-position: center;
		background-size: cover;
		padding: 30px 75px;
		box-sizing: border-box;
		li{
			height: 38px;
			line-height: 38px;
			padding: 16px 0;
			span:nth-child(1){
				font-size: 28px;
				color: #666;
			}
			span:nth-child(2){
				display: inline-block;
				width: 76px;
				height: 38px;
				float: right;
				background-color: #9e2026;
				font-size: 24px;
				color: #fff;
				text-align: center;
			}
		}
	}
	.detail{
		color: #666;
		font-size: 24px;
	}
	.tip{
		color: #999;
		font-size: 24px;
		margin-top: 100px;
		text-align: center;
	}
</style>
