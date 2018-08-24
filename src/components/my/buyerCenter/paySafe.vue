<template>
	<div class="app-containerpay">
		<ul class="mainpay">
			<li>
				<router-link to="/balance/paySafe/resetPayPsd">
					重置支付密码
					<i class="iconfont icon-right"></i>
				</router-link>
			</li>
			<li>
				<router-link to="/identityVerifi">
					忘记支付密码
					<i class="iconfont icon-right"></i>
				</router-link>
			</li>
			<li>
				<router-link to="/modifyId">
					修改身份信息
					<i class="iconfont icon-right"></i>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
	/*
	 * @border-color: 统一边框颜色coupon
	 * */
	
	@border-color: #d2d2d2;
	@pad: 30px;
	.app-containerpay {
		min-height: 1234px;
		padding-top: @pad;
	}
	
	.iconfont {
		font-size: 24px;
		margin: 0;
	}
	
	.mainpay {
		background-color: #fff;
		border-bottom: 1px solid @border-color;
		li {
			height: 100px;
			line-height: 100px;
			padding-left: @pad;
			a {
				display: block;
				border-bottom: 1px solid @border-color;
				padding-right: @pad;
				font-size: 28px;
				i {
					float: right;
				}
			}
			
		}
		li:nth-last-of-type(1) a {
			border-bottom: none;
		}
	}
</style>