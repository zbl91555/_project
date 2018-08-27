<template>
	<div class="app-container" ref="ctn">
		<div class="buyer-nav">
			<router-link to="/buyerCenter/buyerOrder">全部</router-link>
			<router-link class="selected" to="/buyerCenter/buyerOrder/buyerWaitPay">待付款</router-link>
			<router-link to="/buyerCenter/buyerOrder/buyerWaitSend">待发货</router-link>
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
						<router-link :to="{path: '/storeHome/storeIntroduced', query: { user_id: e.order_id }}" style="">{{e.nickname}}<i class="iconfont icon-right"></i></router-link>
						<button class="buyer-status">{{e.change}}</button>
						<i><div class="waitepaywords">待付款</div></i>
						<i @click="showdel()" class="iconfont icon-shouji op"></i>
						<i @click="alldingDan()" class="iconfont icon-wendang op"></i>
					</div>
					<router-link to="/buyerCenter/buyerOrder/orderDetail">
						<div class="buy-info">
							<div class="goods-info" :style="{backgroundImage:'url(' + e.auction_img1 + ')'}"></div>
							<p class="goods-intr">{{e.auction_description}}</p>
							<ul class="buyer-detail">
								<li>成交金额：￥{{e.price}}元</li>
								<li>付款截止：{{timestampToTime(parseFloat(e.addtime) + 86400 * 2)}}</li>
							</ul>
						</div>
					</router-link>
					<div class="need-pay" v-if="isTimeOut[i] == true">应付：￥{{e.trueprice}}</div>
					<div class="buyer-btn" v-if="isTimeOut[i] == true">
						<button v-if="e.showPayment.showPayment==true ? true : false">立即付款</button>
						<button v-if="e.showPayment.showDelay==true ? true : false">延期付款</button>
						<button v-if="e.showPayment.showFace==true ? true : false">当面交易</button>
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
import {order} from '../../../api/api'
export default {
  components: {},
  data () {
    return {
      // 所有产品列表
      allList: [],
      // 0订单的占位符
      noOrder: false,
      // 如果下单48小时未付款，则显示交易失败，隐藏应付款和立即付款按钮
      isTimeOut: [true, true, true, true, true, true, true, true, true, true],
      page: 0,
      showlists: false,
      showtel: false
    }
  },
  created () {
    window.addEventListener('scroll', this.scrollHandler)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler)
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
    scrollHandler () {
      const st = document.documentElement.scrollTop || document.body.scrollTop
      const ch = this.$refs.ctn.clientHeight
      if (st + window.innerHeight >= ch) {
        this.getPayInfo()
      }
    },
    getPayInfo: function () {
      let _this = this
      this.page += 1
      let params = {
        type: 'user',
        state: 'daifukuan',
        page: this.page,
        pagenum: '10'
      }
      order(params).then(function (res) {
        if (res.code == '200') {
          _this.allList = _this.allList.concat(res.data)
          if (_this.allList.length == '0') { // 如果没有订单，则显示0订单占位符
            _this.noOrder = true
          }

          // 如果下单48小时未付款，则显示交易失败，隐藏应付款和立即付款按钮
          _this.allList.forEach(function (e, i) {
            if (e.add_time * 1000 <= (+new Date()) - (86400000 * 2)) {
              _this.isTimeOut[i] = false
            }
          })
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getPayInfo()
  }
}
</script>

<style lang="less" scoped>
	@border-color: #e5e5e5;
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
			overflow: hidden;
			.buyer-tool,
			.need-pay,
			.buyer-btn {
				padding: 0 30px;
				box-sizing: border-box;
			}
			.buyer-tool {
				height: 76px;
				line-height: 76px;
				background-position: 30px center;
				background-repeat: no-repeat;
				background-size: 38px;
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
				}
			}
			.need-pay {
				height: 60px;
				line-height: 60px;
				width: 100%;
				text-align: right;
				font-size: 28px;
				color: #333;
				border-bottom: 1px solid @border-color;
			}
			.buyer-btn {
				height: 90px;
				button {
					float: right;
					outline: none;
					border: none;
					width: 150px;
					height: 50px;
					line-height: 50px;
					margin-top: 20px;
					background-color: transparent;
					border: 2px solid #9e2026;
					color: #9e2026;
					border-radius: 5px;
					box-sizing: border-box;
					margin-left: 10px
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
	.waitepaywords{
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
