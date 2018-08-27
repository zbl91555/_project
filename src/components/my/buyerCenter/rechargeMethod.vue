<template>
	<div class="app-container">
		<ul>
			<li class="list">
				<div class="con">余额充值</div>
			</li>
			<li class="list">
				<div class="con">需要支付<span>￥{{num}}</span></div>
			</li>
			<li class="op" @click="aa(0)" :class="{active: sw == 0}">
				<div class="con">
					<span><i class="iconfont icon-duihao2"></i></span>
					<div class="img">
						<img src="../../../assets/images/travel.png" alt="" />
					</div>
					<div class="msg">
						<h1>微信支付</h1>
						<p>使用微信支付，简单方便</p>
					</div>
				</div>
			</li>
			<li class="op" @click="aa(1)" :class="{active: sw == 1}">
				<div class="con">
					<span><i class="iconfont icon-duihao2"></i></span>
					<div class="img">
						<img src="../../../assets/images/icon_transfer.png" />
					</div>
					<div class="msg">
						<h1>转账支付</h1>
						<p>ATM&nbsp;&nbsp;柜台转账&nbsp;&nbsp;网银转账&nbsp;&nbsp;支付宝</p>
					</div>
				</div>
			</li>
		</ul>
		<div class="btn">
			<button>安全支付</button>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      num: '',
      sw: 0
    }
  },
  methods: {
    aa: function (i) {
      let _this = this
      _this.sw = i
    }
  },
  mounted () {
    this.num = this.$route.query.detail
  }
}
</script>

<style lang="less" scoped>
	/*
	* @border-color: 边框统一颜色
	* */

	@border-color: #e5e5e5;
	.app-container {
		min-height: 1234px;
		background-color: #f4f4f4;
		padding: 20px 0;
		ul {
			background-color: #fff;
		}
		ul li {
			color: #333;
			font-size: 28px;
			width: 100%;
		}
		.list {
			height: 100px;
		}
		.op {
			height: 130px;
		}
		.list,
		.op {
			padding-left: 30px;
			box-sizing: border-box;
		}
		.list .con {
			line-height: 100px;
		}
		.list .con span {
			margin-left: 25px;
			color: #f15511;
		}
		.list .con,
		.op .con {
			height: 100%;
			width: 100%;
			border-bottom: 1px solid @border-color;
		}
		.op:nth-last-of-type(1) .con{
			border-bottom: none;
		}
		.op .con {
			span {
				display: block;
				width: 40px;
				height: 40px;
				border: 2px solid @border-color;
				box-sizing: border-box;
				border-radius: 50%;
				float: left;
				margin-top: 45px;
			}
			.img {
				height: 100%;
				width: 70px;
				padding: 30px 0;
				box-sizing: border-box;
				float: left;
				img {
					margin-left: 35px;
					width: 100%;
				}
			}
			.msg {
				height: 100%;
				padding: 30px 0;
				box-sizing: border-box;
				width: 75%;
				float: right;
				h1 {
					font-size: 28px;
					color: #333;
					line-height: 1.5;
				}
				p {
					font-size: 24px;
					color: #999;
				}
			}
		}
		.op .con span i {
			display: none;
			color: #9e2026;
			font-size: 40px;
		}
		.op.active .con span {
			border: none;
			i {
				display: block;
			}
		}
		.btn {
			width: 100%;
			padding: 165px 30px 0 30px;
			box-sizing: border-box;
			button {
				background-color: #9e2026;
				display: block;
				width: 100%;
				height: 88px;
				outline: none;
				border: none;
				border-radius: 5px;
				color: #fff;
				font-size: 28px;
			}
		}
	}
</style>
