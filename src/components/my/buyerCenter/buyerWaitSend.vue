<template>
	<div class="app-container">
		<div class="buyer-nav">
			<router-link to="/buyerCenter/buyerOrder">全部</router-link>
			<router-link to="/buyerCenter/buyerOrder/buyerWaitPay">待付款</router-link>
			<router-link class="selected" to="/buyerCenter/buyerOrder/buyerWaitSend">待发货</router-link>
			<router-link to="/buyerCenter/buyerOrder/buyerWaitReceive">待收货</router-link>
			<router-link to="/buyerCenter/buyerOrder/buyerWaitEvaluate">待评价</router-link>
			<router-link class="search" to="/buyerCenter/buyerOrder/search">
				<i class="iconfont icon-sousuo"></i>
			</router-link>
		</div>
		<div class="buyer-list">
			<ul>
				<li v-for="(e, i) in allList" :key="e">
					<div class="buyer-tool" :style="{backgroundImage:'url(' + e.avatar + ')'}">
						<router-link to="/myHome" style="">{{e.nickname}}<i class="iconfont icon-right"></i></router-link>
						<button class="buyer-status">{{e.change}}</button>
						<i><div class="waitesendwords">{{e.showPayment.title}}</div></i>
						<i @click="showdel()" class="iconfont icon-shouji op"></i>
						<i @click="alldingDan()" class="iconfont icon-wendang op"></i>
					</div>
					<router-link to="">
						<div class="buy-info">
							<div class="goods-info" :style="{backgroundImage:'url(' + e.auction_img1 + ')'}"></div>
							<p class="goods-intr">{{e.auction_description}}</p>
							<ul class="buyer-detail">
								<li>成交金额：￥{{e.price}}元</li>
								<li>
									<span>付款时间：{{timestampToTime(e.payment_time)}}</span>
									<router-link to="/buyerCenter/buyerOrder/money">钱款<i class="iconfont icon-right"></i></router-link>
								</li>
							</ul>
						</div>
					</router-link>
					<div class="buyer-btn" v-if="refundBtn[i] == true">
						<button v-if="e.showPayment.showApplyMoney==true ? true : false">申请退款</button>
						<button v-if="e.showPayment.showDelivery==true ? true : false">立即发货</button>
						<button v-if="e.showPayment.showRefuseMoney==true ? true : false">拒绝退款</button>
						<button v-if="e.showPayment.showAgreeMoney==true ? true : false">同意退款</button>
					</div>
				</li>
			</ul>
			<div class="no-info" v-if="noOrder">
				<div class="icon"><i class="iconfont icon-dingdan"></i></div>
				<p>您还没有相关的订单</p>
				<p>可以看看有哪些想买的</p>
			</div>
		</div>
		<!-- 是否弹出该店铺所有订单 -->
		<div id="fixednumMain" v-if="showlists==true ">
			<div @click="closeshowlists()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="sharesomething">
				<router-link to="/buyerCenter/buyerOrder/buyeralllists">
					<div @click="lookshowlists()">查看该店铺的所有订单</div>
				</router-link>
					<div @click="closeshowlists()" class="bordertop">取消</div>
			</div>
		</div>
		<!-- 是否弹出打电话 -->
		<div id="fixednumMain" v-if="showtel==true ">
			<div @click="closeshowdel()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="telsharesomething">
				<div>
					<span>电话号码:</span>
					<span>18862877559</span>
				</div>
				<div>
					<a href="">确认拨打?</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {/* getSendInfo */} from '../../../api/api'
export default {
  components: {},
  data () {
    return {
      // 所有产品列表
      allList: [],
      noOrder: false,
      // 一次请求多少订单数量这里就是多少false，如果付款3天后未发货，就可显示申请退款按钮；
      refundBtn: [false, false, false, false, false, false, false, false, false, false],
      showlists: false,
      showtel: false
    }
  },
  methods: {
    // 打电话
    showdel () {
      this.showtel = true
    },
    // 关掉电话
    closeshowdel () {
      this.showtel = false
    },
    // 查看订单
    lookshowlists () {
      this.showlists = false
    },
    // 关闭
    closeshowlists () {
      this.showlists = false
    },
    alldingDan () {
      this.showlists = true
    },
    getSendInfo: function () {
      let _this = this
      let params = {
        type: 'user',
        state: 'daifahuo',
        page: '1',
        pagenum: '10'
      }
      /* getSendInfo(params).then(function(res) {
					if(res.code == '200') {
						_this.allList = res.data;
						// 如果没有订单，则显示0订单占位符
						if(_this.allList.length == '0') {
							_this.noOrder = true;
						}
						_this.allList.forEach(function(e, i) {
							// 当前日 - 3 >= 付款日时，显示退款按钮
							if((e.payment_time * 1000) <= (+new Date()) - (86400000 * 3)) {
								_this.refundBtn[i] = true;
							}
						})
					}
				}).catch(function(err) {
					console.log(err);
				}) */
    },
    getNow: function () {
      let _this = this
      let now = _this.timestampToTimeYMD(+new Date() / 1000)

      return now
    }
  },
  mounted () {
    this.getSendInfo()
  }
}
</script>

<style lang="less" scoped>
	.app-container {
		min-height: 1234px;
		background-color: #f4f4f4;
		overflow: hidden;
	}

	.buyer-nav {
		width: 100%;
		height: 78px;
		margin-bottom: 10px;
		background-color: #fff;
		padding: 0 30px;
		box-sizing: border-box;
		position: relative;
		a {
			display: inline-table;
			line-height: 74px;
			font-size: 30px;
			padding: 0 15px;
			box-sizing: border-box;
			color: #999;
		}
		a.search {
			display: inline-block;
			height: 48px;
			line-height: 48px;
			border-left: 2px solid #e5e5e5;
			position: absolute;
			top: 15px;
			right: 30px;
		}
		a.selected {
			border-bottom: 4px solid #9e2026;
			color: #9e2026;
			font-weight: bold;
		}
	}

	.buyer-list {
		margin-bottom: 100px;
		position: relative;
		li {
			margin-bottom: 10px;
			background-color: #fff;
			.buyer-tool {
				height: 76px;
				line-height: 76px;
				background-position: 30px center;
				background-repeat: no-repeat;
				background-size: 38px;
				padding: 0 30px;
				box-sizing: border-box;
				position: relative;
				a {
					margin-left: 50px;
					display: inline-block;
					line-height: 76px;
					float: left;
					position: relative;
					padding-right: 40px;
					i {
						margin: 0;
						font-size: 21px;
					}
				}
				button,
				i {
					float: right;
				}
				i {
					font-size: 32px;
					margin: 0;
				}
				.op {
					padding: 0 20px;
				}
				button {
					outline: none;
					border: none;
					background-color: #fff;
					color: #f15511;
					margin-top: 19px;
				}
			}
			.buy-info {
				height: 220px;
				background-color: #f7f7f7;
				padding: 27px 30px;
				box-sizing: border-box;
				.goods-info {
					height: 166px;
					width: 166px;
					float: left;
					background-repeat: no-repeat;
					background-position: center;
					background-size: cover;
				}
				.goods-intr {
					float: right;
					width: 73%;
					height: 60px;
					line-height: 30px;
					margin-bottom: 10px;
					word-break: break-all;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					color: #333;
				}
				.buyer-detail {
					float: right;
					width: 73%;
					margin-top: 30px;
				}
				.buyer-detail li {
					height: 25px;
					line-height: 25px;
					background-color: transparent;
					padding: 0;
					color: #999;
					a{
						display: block;
						font-size: 24px;
						color: #999;
						height: 25px;
						line-height: 25px;
						float: right;

						i{
							font-size: 24px;
							margin: 0;
						}
					}
				}
			}
			.buyer-btn {
				padding: 20px 30px;
				box-sizing: border-box;
				overflow: hidden;
				button {
					float: right;
					outline: none;
					border: none;
					width: 150px;
					height: 50px;
					line-height: 50px;
					background-color: transparent;
					border: 2px solid #9e2026;
					color: #9e2026;
					border-radius: 5px;
				}
			}
		}
	}

	.no-info {
		height: 375px;
		width: 277px;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		top: 124px;
		.icon {
			width: 277px;
			height: 277px;
			border-radius: 50%;
			background-color: #e1e1e1;
			i {
				line-height: 277px;
				text-align: center;
				font-size: 188px;
				color: #fff;
			}
		}
		p {
			text-align: center;
		}
		p:nth-of-type(1) {
			margin-top: 25px;
			color: #666;
			font-size: 28px;
		}
		p:nth-of-type(2) {
			color: #999;
			font-size: 24px;
		}
	}
	.waitesendwords{
		height: 30px;
		padding-left: 18px;
		color: #f15511;
		font-size: 24px;
		margin-top: 24px;
		line-height: 30px;
		border-left: 1px solid #e5e5e5
	}
	.sharesomething{
		position: fixed;
		left:0;
		bottom: 0;
		z-index: 1100;
		width: 100%;
		height:200px;
		background: white;
		text-align: center;
	}
	.sharesomething div{
		height: 90px;
		line-height: 90px;
		font-size: 30px
	}
	.bordertop{
		border-top: 10px solid #e5e5e5
	}
	.telsharesomething div{
		height: 90px;
		line-height: 90px;
		font-size: 30px
	}
	.telsharesomething{
		position: fixed;
		left:16%;
		top:45%;
		z-index: 1100;
		width: 70%;
		height:200px;
		background: white;
		text-align: center;
		border-radius: 20px
	}
</style>
