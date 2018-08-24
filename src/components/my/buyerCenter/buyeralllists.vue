<template>
	<div class="app-container" ref="ctn">
		<div class="buyer-nav">
			<router-link to="/buyerOrder/0/user">全部</router-link>
			<router-link to="/buyerOrder/0/user">待付款</router-link>
			<router-link to="/buyerOrder/0/user">待发货</router-link>
			<router-link to="/buyerOrder/0/user">待收货</router-link>
			<router-link to="/buyerOrder/0/user">待评价</router-link>
			<router-link class="search" :to="'/search/'+type">
				<i class="iconfont icon-sousuo"></i>
			</router-link>
		</div>
		<div class="buyer-list">
			<ul>
				<li v-for="(e, i) in allList">
					<div class="buyer-tool" :style="{backgroundImage:'url(' + e.avatar + ')'}">
						<router-link to="/myHome" style="">{{e.nickname}}<i class="iconfont icon-right"></i></router-link>
						<button class="buyer-status">{{e.change}}</button>
						<i><div class="waitepaywords">{{e.showPayment.title}}</div></i>
						<i class="iconfont icon-shouji op"></i>
						<i @click="alldingDan()" class="iconfont icon-wendang op"></i>	
					</div>
					<router-link :to="{path: '/orderDetail/'+e.order_id+'/all'}">
						<div class="buy-info">
							<div class="goods-info" :style="{backgroundImage:'url(' + e.auction_img + ')'}"></div>
							<p class="goods-intr">{{e.auction_desc}}</p>
							<ul class="buyer-detail">
								<li>成交金额：￥{{e.trueprice}}元</li>
								<li>付款截止：{{timestampToTime(parseFloat(e.addtime) + 86400 * 2)}}</li>
							</ul>
						</div>
					</router-link>
					<div class="need-pay" v-if="isTimeOut[i] == true">应付：￥{{e.trueprice}}</div>
					
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
				<router-link to:>	
					<div @click="lookshowlists()">查看该店铺的所有订单</div>
				</router-link>
					<div @click="closeshowlists()" class="bordertop">取消</div>					
			</div>
		</div>
	</div>
</template>
<script>
	import {getSellerOrders} from '../../../api/api'
	export default {
		data() {
			return {
				// 所有产品列表
				allList: [],
				// 0订单的占位符
				noOrder: false,
				// 如果下单48小时未付款，则显示交易失败，隐藏应付款和立即付款按钮
				isTimeOut: [true, true, true, true, true, true, true, true, true, true],
				page:0,
				showlists:false,
				type:''
			}
		},
		created() {
    		window.addEventListener("scroll", this.scrollHandler);
  		},
 		destroyed() {
    		window.removeEventListener("scroll", this.scrollHandler);
  		},
		methods: {
			//查看订单
			lookshowlists(){
				this.showlists=false
			},
			//关闭
			closeshowlists(){
				this.showlists=false
			},
			alldingDan(){
				this.showlists=true
			},
			scrollHandler() {
			      const st = document.documentElement.scrollTop || document.body.scrollTop;
			      const ch = this.$refs.ctn.clientHeight;
			      if (st + window.innerHeight >= ch) {
			        this.order();
			      }
    		}, 
			getSellerOrders(type,orderId) {
				this.page += 1;
				let params= {
					type: type,
					page: this.page,
					pagenum: '10',
				};
				getSellerOrders(orderId,params).then(res => {
					if(res.code == '200') {
						this.allList = this.allList.concat(res.data)	
						if(this.allList.length == '0') { // 如果没有订单，则显示0订单占位符
							_his.noOrder = true;
						}
						
						// 如果下单48小时未付款，则显示交易失败，隐藏应付款和立即付款按钮
						this.allList.forEach(function(e, i){
							if(e.add_time * 1000 <= (+new Date()) - (86400000 * 2)){
								this.isTimeOut[i] = false;
							}
						})
					}
				}).catch(err => {
					console.log(err);
				})
			}
		},
		mounted() {
			this.type = this.$route.params.types
			let orderId = this.$route.params.orderId
			this.getSellerOrders(this.type,orderId);
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
		/*a.selected {
			border-bottom: 4px solid #9e2026;
			color: #9e2026;
			font-weight: bold;
		}*/
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
</style>