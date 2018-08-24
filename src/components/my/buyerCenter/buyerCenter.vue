<template>
	<div class="maijia1">
		<div class="info">
			<group class="nav">
				<router-link to="/buyerCenter/buyerSet" class="set">
				<i class="iconfont icon-shezhi1"></i>
					<p>设置</p>
				</router-link>
				<router-link class="tou-xiang" :to="'/member/fansDetails/'+userInfo.id">
					<img :src="userInfo.headimgurl" alt="" />
				</router-link>
				<div class="nav-detail">
					<p class="nav-name">{{userInfo.nickname}}</p>
					<router-link class="hui-yuan" to="/buyerCenter/levelDetail">
						<span :style="{background: 'url('+ logLists[userInfo.lever-1] +')',backgroundSize:'100%'}"></span>
					</router-link>
					<p class="ji-fen">
						<span>积分&nbsp;<i>{{userInfo.points}}</i></span>
						<span>关注&nbsp;<i>{{userInfo.concerns}}</i></span>
					</p>
				</div>
				<div class="to-seller">
					<router-link to="/sellerCenter">
						<i class="iconfont icon-chuizi"></i>
						<span>卖家中心</span>
						<i class="iconfont icon-right"></i>
					</router-link>
				</div>
			</group>
		</div>
		<div class="my-order">
			<div class = "my-order-line"></div>
			<group>
			  <router-link to="/newBuyOrders/all">
				<cell class="title-order" title="我的订单" value-align="right" arrow-direction="right">
					全部订单<i class="iconfont icon-right"></i>
				</cell>
			  </router-link>
				<grid>
					<grid-item v-for="(e, $index) in orderList" v-bind:key="$index">
						<router-link :to="e.linkTo">
							<i class="iconfont" v-bind:class="e.iconClass"></i>
							<span class="grid-center" :class="$index == '0'? 'gridCenter' : ''">{{e.title}}</span>
							<span class="grid-tip" v-if="e.orderNum > 0">{{e.orderNum}}</span>
						</router-link>
					</grid-item>
					<grid-item>
						<router-link :to="'/afterSale/'+'user'">
							<i class="iconfont icon-iconshouhoufuwu"></i>
							<span class="grid-center" style="margin-top: -1px">退款/售后</span>
							<span class="grid-tip" v-if="afterSaleorderNum > 0">{{afterSaleorderNum}}</span>
						</router-link>
					</grid-item>
				
				</grid>
			</group>
		</div>
		<div class="detail-list">
			<grid :cols="4">
				<grid-item v-for="(i, $index) in detailList" :link="i.linkTo" v-bind:key="$index">
					<i class="iconfont" v-bind:class="[i.iconClass,{'greaterClass':$index=='1'||$index=='2'},{'smallerClass':$index=='3'}]"></i>
					<span class="grid-center">{{i.title}}</span>
				</grid-item>
				<!-- <grid-item>
					<span @click="testtest" class="grid-center">测试</span>
				</grid-item> -->
			</grid>
		</div>
		<div class="my-order nav">
			<router-link to="/sellerCenter">
				<group>
					<cell title="卖家中心-1元认证入驻" link="/sellerCenter" value-align="right" arrow-direction="right">
						<img slot="icon" width="20" style="margin-top:13px;margin-right:5px;" src="../../../assets/images/maijia1.png"> &nbsp;
						<i class="iconfont icon-right"></i>
					</cell>
				</group>
			</router-link>
		</div>	
	</div>
</template>

<script type="text/javascript">
	 import { XHeader, Group, Icon, Cell, Grid, GridItem } from 'vux'
	import {getMember,getSellerDate} from '../../../api/api'
	import assign from '../../../assets/js/assign.js'//混入式方法
	
	export default {
		components: {
			XHeader,
			Group,
			Icon,
			Cell,
			Grid,
			GridItem
		},

		data() {
			return {
				logLists : [//本地图片
						require('../../../assets/images/icon_commoner.png'),
						require('../../../assets/images/icon_childvoice.png'),
						require('../../../assets/images/icon_scholar.png'),
						require('../../../assets/images/icon_provincial.png'),
						require('../../../assets/images/icon_shinshi.png'),
						require('../../../assets/images/icon_master.png'),
						require('../../../assets/images/icon_bachelor.png'),
						require('../../../assets/images/icon_surname.png'),
						require('../../../assets/images/icon_grandprecepto.png'),
						require('../../../assets/images/icon_oracle.png'),
					],
				// order list
				orderList: [{
					iconClass: 'icon-daifukuan',
					title: '待付款',
					linkTo: '/newBuyOrders/waitPay',
					orderNum: '0',
					type:'0'
				}, {
					iconClass: 'icon-icon2',
					title: '待发货',
					linkTo: '/newBuyOrders/waitSend',
					orderNum: '0',
					type:'1'
				}, {
					iconClass: 'icon-daishouhuo',
					title: '待收货',
					linkTo: '/newBuyOrders/waitGet',
					orderNum: '0',
					type:'2'
				}, {
					iconClass: 'icon-comment-w',
					title: '待评价',
					linkTo: '/newBuyOrders/waitEva',
					orderNum: '0',
					type:'3'
				}],
				// detail list
				detailList: [{
					iconClass: 'icon-qianbao-',
					title: '我的钱包',
					linkTo: '/balanceIndex/user',
				}, {
					iconClass: 'icon-zuji',
					title: '足迹',
					linkTo: '/newFootPrint/footer',
				}, 
				// {
				// 	iconClass: 'icon-new',
				// 	title: '新品开拍',
				// 	linkTo: '/buyerCenter/newProduct',
				// }, 
				{
					iconClass: 'icon-liwuhuodong',
					title: '推荐有礼',
					linkTo: '/buyerCenter/PromotionGift',
				}, {
					iconClass: 'icon-guanzhu',
					title: '关注店铺',
					linkTo: '/buyerCenter/footprint?index=2',
				}, {
					iconClass: 'icon-xiaoxi3',
					title: '消息',
					linkTo: '/news',
				}],
				userInfo: {},
				// 点单阀
				num: '0',
				afterSaleorderNum:'0'
			}
		},
		methods: {
			testtest(){
				this.$store.dispatch('unsetAuthUser')
			},
			getMember() {
				let _this = this ;
				getMember('user').then(function(res) {
					_this.userInfo = res.data.info;
					_this.orderList[0].orderNum = res.data.order.waitPay; // 待付款
					_this.orderList[1].orderNum = res.data.order.waitDeliver; // 待发货
					_this.orderList[2].orderNum = res.data.order.waitReceive; // 待收货
					_this.orderList[3].orderNum = res.data.order.waitEvaluate; //待评价
					_this.afterSaleorderNum = res.data.order.waitService; // 售后
				}).catch(function(err) {
					console.log(err);
				})
			}
		},
		mounted() {
			this.getMember();
		},
		created() {
			
		}
	}
</script>

<style>
	/* .my-order .weui-cell {
		padding-right : 0.4rem;
	} */
	.my-order .weui-cells:after {
		border : none;
	}
	.my-order .weui-cells::before {
		border : none;
	}
	.my-order .weui-cell__ft::after {
		border:none;
	}
	.my-order .weui-cell__ft::before {
		border:none;
	}
	.detail-list .weui-grids::after {
		border : none;
	}
	.detail-list .weui-grids::before {
		border : none;
	}
	.detail-list .weui-grids .weui-grid::before {
		border : none;
	}
	.detail-list .weui-grids .weui-grid::after {
		border : none;
	}
	.my-order .weui-cells {
		margin-top: 10px;
	}
	.my-order .weui-cell {
		padding:5px 0px 0px 10px;
	}

</style>
<style type="text/css" lang="less" scoped>
	/*
	 * @header-height: 头部高度
	 * @font-size: 字体设置
	 * @bg-color: 背景统一颜色
	 * @border-color: 边框统一颜色
	 * @font-color: 统一字体颜色
	 * @main-color: 主色调
	 * @padding-left: 自定义左边距
	 * */
	
	@font-size: 18px;
	@bg-color: #fff;
	@border-color: #e5e5e5;
	@font-color: #333;
	@main-color: #9e2026;
	@padding-left: 20px;
	.my-order-line {
		width : 100%;
		border-bottom :0.5px solid #e5e5e5;/*no*/
		position: absolute;
		top :36%;
		z-index : 100;
		left : 0.4rem;
	}
	.maijia1 {
		overflow: hidden;
		padding-bottom: 100px;
	}
	.my-order .weui-grids a i {
		color : #999;
	}
	.my-order .weui-grids a a i {
		color : #999;
		font-size : 0.65rem!important;
	}
	.my-order .weui-grids a:first-child a i {
		font-size : 0.8rem!important;
	}
	.my-order .weui-grids a:last-child a i {
		font-size : 0.72rem!important;
	}
	.maijia1 /deep/.info {
		margin-bottom: 10px;
		width: 100%;
		height: 255px;
		background-color: @bg-color;
		box-sizing: border-box;
		position: relative;
		.weui-cells {
			margin: 0;
			&:before {
				border: none;
			}
			&:after {
				border: none;
			}
		}
		.set {
			display: inline-block;
			height: 60px;
			float: right;

		.iconfont {
			line-height : 1.3rem;
			color : #666;
			font-size : 0.533333rem;
		}
		}
		.set p {
			padding-left:5px;
			padding-right :28px;
			box-sizing: border-box;
			height: 70px;
			line-height: 100px;
			text-align: right;
			font-weight: bold;
			color: #333;
			font-size: 28px;
			float: right;
			i {
				margin-right: 10px;
				font-size: 32px;
			}
		}
		.nav {
			padding-left: @padding-left;
			.tou-xiang {
				display: inline-block;
				width: 140px;
				border-radius: 50%;
				background-color: #e9e9e9;
				padding: 4px;
				box-sizing: border-box;
				overflow: hidden;
				height: 140px;
				float: left;
				margin-top: 50px;
				margin-left: 10px;
				img {
					height: 100%;
					width: 100%;
					border-radius: 50%;
				}
			}
			.nav-detail {
				width: 40%;
				margin-left: 25px;
				font-weight: bold;
				color: @font-color;
				font-size: 26px;
			}
			.nav-detail {
				height: 140px;
				margin-top:61px;
				float: left;
			}
			.nav-name {
				height: 36px;
				font-size: 28px;
				margin-bottom:4px;
			}
			.hui-yuan {
				display: inline-block;
				margin: 5px 0;
				width: 65px;
				height: 33px;
				line-height: 33px;
				text-align: center;
				background: @main-color;
				color: @bg-color;
				font-weight: 100;
				font-size: 12px;

				span {
					display : block;
					height : 100%;
					background-size : 100%!important;
				}
			}
			.ji-fen {
				font-weight: 400;
				color: #999;
				span:nth-child(2) {
					margin-left: 20px;
				}
				span{
					i{
						font-family: PingFang-SC-Medium;
					}
				}
			}

			.to-seller {
				height: 72px;
				width: 222px;
				background-color: #9e2026;
				text-align: center;
				font-size: 28px;
				line-height: 72px;
				margin-top: 70px;
				float: right;
				border-bottom-left-radius: 50px;
				border-top-left-radius: 50px;
				a {
					display: block;
					width: 100%;
					color: #fff;
					padding-left : 0.15rem;
					i:first-child {
					font-size : 32px;
				}
				}
				.iconfont {
					color: #fff;
					font-size: 28px;
				}
				i:last-child {
					transform : translateY(1px);
				}
			}
		}
	}
	.gridCenter{
		margin-top: -5px;
	}
	.greaterClass{
		font-size:60px !important;
	}
	.maijia1 /deep/.my-order {
		width: 100%;
		// border-bottom: 2px solid @border-color;
		margin-bottom: 20px;
		position: relative;
		overflow : hidden;
		.weui-cells {
			box-sizing: border-box;
			padding-left: @padding-left;
			padding-right: @padding-left;
			line-height: 84px;

			.vux-cell-bd label {
				font-size: 30px;
			}
			.weui-cell__ft {
				color: #666;
				font-size: 26px;

				.icon-right {
					font-size: 28px;
					color : #999;
				}
				&:after {
					height: 0;
					width: 0;
					border: none;
				}
			}
		}
		.weui-grids {
			height: 185px;
			margin-top: 20px;
			a {
				height: 185px;
				position: relative;
				text-align : center;
				i {
					font-size: 60px;
					padding: 0 35px;
				}
				span {
					display: block;
					line-height: 1;
					text-align: center;
					font-size: 24px;
				}
				.grid-tip {
					display: inline-block;
					background-color: #db0909;
					color: #fff;
					height: 36px;
					width: 36px;
					line-height: 40px;
					text-align: center;
					border-radius: 50%;
					position: absolute;
					right:-55px;
					top: -120px;
					font-family: PingFang-SC-Medium;
				}
			}
		}
		.weui-grids,
		.weui-grid {
			&:before,
			&:after {
				border: none;
			}
		}
		.weui-cells:after {
			border: none;
		}
	}
	
	.maijia1 /deep/.my-order.nav {
		.weui-cells .weui-cell {
			border: none;
		}
		.weui-cells:before {
			// border-top: 1px solid #b1b1b1;
		}
	}
	.maijia1 /deep/.detail-list {
		margin-bottom:10px;
		background-color: @bg-color;
		position: relative;
		padding:0 10px;
		&:before {
			content : '';
			position: absolute;
			width : 100%;
			border-bottom : 0.5px solid #e5e5e5;/*no*/
			top : 50%;
			transform : translateY(-50%);
		}
		.weui-grid:nth-child(1){
			padding-top : 28px;
		}
		.weui-grid:nth-child(2){
			padding-top : 24px;
		}
		.weui-grid:nth-child(3){
			padding-top : 26px;
		}
		.weui-grid {
			height: 170px;
			text-align : center;
			box-sizing : border-box;
			padding-top : 36px;
			i {
				font-size: 0.70rem;
				padding: 0 55px;
				color: #f15511;
			}
			&:nth-of-type(5) i,
			&:nth-of-type(6) i {
				color: #fd8f01;
			}
			span {
				display: block;
				line-height: 2.5;
				text-align: center;
				font-size: 24px;
			}
		}
	}
	.smallerClass{
		font-size: 0.64rem !important;
	}
	.iconfont{
		margin: 0;
	}
</style>