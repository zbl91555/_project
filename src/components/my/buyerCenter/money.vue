<template>
	<div class="money">
		<div class="moneylist">
				<div class="left">
					<div>支付-拍品贷款</div>
					<div>余额-2018-03-01 11:35</div>
				</div>
				<div class="right">
					-1.00
				</div>
		</div>
		<div class="moneylist">
				<div class="left">
					<div>充值</div>
					<div>微信-2018-03-01 11:35</div>
				</div>
				<div class="right" style="color: #15df0b">
					+1.00
				</div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>
<style scoped>
	.moneylist{
		height: 100px;
		border-bottom: 1px solid #e5e5e5;
		padding-left: 10px;
		overflow: hidden;
		margin-left: 10px;
		line-height: 100px;
		padding-right: 10px;
	}
	.moneylist .left{
		float: left;
		height: 100px
	}
	.moneylist .left div{
		height: 50px;
		line-height: 50px
	}
	.moneylist .left div:last-child{
		color: #8d8787;
	}
	.moneylist .right{
		float: right;
		line-height: 100px;
		font-size: 36px
	}
</style>
