<template>
	<div class="app-container">
		<div class="buyer-nav">
			<router-link to="/buyerCenter/buyerOrder">全部</router-link>
			<router-link to="/buyerCenter/buyerOrder/buyerWaitPay">待付款</router-link>
			<router-link to="/buyerCenter/buyerOrder/buyerWaitSend">待发货</router-link>
			<router-link class="selected" to="/buyerCenter/buyerOrder/buyerWaitReceive">待收货</router-link>
			<router-link to="/buyerCenter/buyerOrder/buyerWaitEvaluate">待评价</router-link>
			<router-link class="search" to="/buyerCenter/buyerOrder/search">
				<i class="iconfont icon-sousuo"></i>
			</router-link>
		</div>
		<div class="buyer-list">
			<ul>
				<li v-for="e in allList" :key="e">
					<div class="buyer-tool" :style="{backgroundImage:'url(' + e.avatar + ')'}">
						<router-link to="/myHome" style="">{{e.nickname}}<i class="iconfont icon-right"></i></router-link>
						<button class="buyer-status">{{e.change}}</button>
						<i><div class="waiteReceivewords">{{e.showPayment.title}}</div></i>
						<i @click="showdel()" class="iconfont icon-shouji op"></i>
						<i @click="alldingDan()" class="iconfont icon-wendang op"></i>
					</div>
					<div class="buy-info">
						<div class="goods-info" :style="{backgroundImage:'url(' + e.auction_img1 + ')'}"></div>
						<p class="goods-intr">{{e.auction_description}}</p>
						<ul class="buyer-detail">
							<li>成交金额：￥{{e.price}}元</li>
							<li v-if="e.is_delay==0 ? true : false">确认截止：{{timestampToTime(parseFloat(e.fahuo_time) + 86400 * 7)}}</li>
							<li v-if="e.is_delay==0 ? false : true">确认截止：{{timestampToTime(parseFloat(e.fahuo_time) + 86400 * 14)}}</li>
						</ul>
					</div>
					<div class="buyer-btn">
						<button v-if="e.showPayment.showLogisticsUser==true ? true : false">查看物流</button>
						<button v-if="e.showPayment.showReap==true ? true : false">确认收货</button>
						<button v-if="e.showPayment.showWaiterUser==true ? true : false">小二介入</button>
						<button v-if="e.showPayment.showCancelWaiterUser==true ? true : false">撤销介入</button>
						<button v-if="e.showPayment.showApplyGoods==true ? true : false">申请退货</button>
						<button v-if="e.showPayment.showRefusingFase==true ? true : false">拒绝当面交易</button>
						<!--延迟收货会让买家增加7天的收货期限，现在等待接口完成才可继续-->
						<button @click="delayReveive(e.end_time)">延长收货</button>
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
import {/* getReceiveInfo */} from '../../../api/api'
export default {
  components: {},
  data () {
    return {
      // 所有产品列表
      allList: [],
      noOrder: false,
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
    delayReveive: function (e) {
      // 延迟收货会让买家增加7天的收货期限，现在等待接口完成才可继续
      e = '555555555555555'
      console.log(e)
    },
    getReceiveInfo: function () {
      let _this = this
      let params = {
        type: 'user',
        state: 'yifahuo',
        page: '1',
        pagenum: '10'
      }
      // getReceiveInfo(params).then(function(res) {
      // 	if(res.code == '200') {
      // 		_this.allList = res.data;
      // 		if(_this.allList.length == 0) {
      // 			_this.noOrder = true;
      // 		}
      // 	}
      // }).catch(function(err) {
      // 	console.log(err);
      // })
    }
  },
  mounted () {
    this.getReceiveInfo()
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
			/*padding: 0 30px;*/
			margin-bottom: 10px;
			background-color: #fff;
			height: 386px;
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
					margin-right: 20px;
				}
				.goods-intr {
					float: left;
					width: 70%;
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
					float: left;
					width: 70%;
					margin-top: 30px;
				}
				.buyer-detail li {
					height: 25px;
					line-height: 25px;
					background-color: transparent;
					padding: 0;
					color: #999;
				}
			}
			.buyer-btn {
				height: 90px;
				padding: 20px 30px;
				button {
					float: right;
					outline: none;
					border: none;
					width: 150px;
					height: 50px;
					line-height: 50px;
					margin-left: 10px;
					background-color: transparent;
					border: 2px solid #9e2026;
					color: #9e2026;
					border-radius: 5px;
					box-sizing: border-box;

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
	.waiteReceivewords{
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
