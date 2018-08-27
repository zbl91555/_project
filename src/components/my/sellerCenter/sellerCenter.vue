<template>
	<div class="maijia2">
		<div class="info">
			<group class="nav">
				<router-link   to='/sellerCenter/sellerSetting'  class="set">
				<i class="iconfont icon-shezhi1"></i>
					<p>设置</p>
				</router-link>
				<router-link :to="'/storeIntroduced/'+seller_id" class="tou-xiang">
					<img @click="tostoreInt(sellerInfo.nickname)" :src="sellerInfo.headimgurl" alt="" />
				</router-link>
				<div class="nav-detail">
					<p class="nav-name">{{sellerInfo.nickname}}</p>
					<router-link class="hui-yuan" to="/levelDetail">
						<span :style="{background: 'url('+ logLists[sellerInfo.lever-1] +')',backgroundSize:'100%'}"></span>
					</router-link>
					<p class="ji-fen">
						<span>积分&nbsp;{{sellerInfo.points}}</span>
						<span>粉丝&nbsp;{{sellerInfo.concerns}}</span>
					</p>
				</div>
				<div class="to-seller">
					<router-link to="/buyerCenter">
						<i class="iconfont icon-maijia"></i>
						<span>买家中心</span>
						<i class="iconfont icon-right"></i>
					</router-link>
				</div>
			</group>
		</div>
		<div class="my-order">
			<div class = "my-order-line"></div>
			<group>
			<router-link to="/newSellerOrder/all">
				<cell title="我的订单" value-align="right" arrow-direction="right">
					全部订单<i class="iconfont icon-right"></i>
				</cell>
			</router-link>
				<grid>
					<grid-item v-for="(e, $index) in orderList" v-bind:key="$index">
					<router-link :to="e.linkTo">
						<i class="iconfont" v-bind:class="e.iconClass"></i>
						<span class="grid-center" :class="$index == '0'?'selDaiClass':''">{{e.title}}</span>
						<span class="grid-tip" v-if="e.orderNum > 0 ">{{e.orderNum}}</span>
					</router-link>
					</grid-item>
					<grid-item>
					<router-link :to="'/afterSale/'+'seller'">
						<i class="iconfont icon-iconshouhoufuwu"></i>
						<span class="grid-center">售后</span>
						<span class="grid-tip" v-if="afterSaleorderNum > 0 ">{{afterSaleorderNum}}</span>
					</router-link>
					</grid-item>
					<grid-item >
					<router-link to="/sellerReport">
						<i class="iconfont icon-statistic"></i>
						<span class="grid-center">店铺报表</span>
						<span class="grid-tip" v-if="reportorderNum > 0 ">{{reportorderNum}}</span>
					</router-link>
					</grid-item>
				</grid>
			</group>
		</div>
		<div class="detail-list">
			<grid :cols="4">
				<grid-item v-for="(i, $index) in detailList" :link="i.linkTo" v-bind:key="$index">
					<i class="iconfont" v-bind:class="i.iconClass"></i>
					<span class="grid-center">{{i.title}}</span>
				</grid-item>
				<grid-item>
				<router-link :to="'/storeHome/'+seller_id">
					<div @click="saveName(sellerInfo.nickname)">
						<i class="iconfont icon-6dianpu"></i>
						<span class="grid-center">我的店铺</span>
					</div>
				</router-link>
				</grid-item>
			</grid>
		</div>
		<div class="my-order nav">
			<group>
				<cell title="实名认证" link="/sellerCenter/realnameApplication" value-align="right" arrow-direction="left">
					<img slot="icon" width="20" style="display:block; margin-right:5px;" src="../../../assets/images/shiming.png">
					<span v-if="!sellerInfo.isCompany">未认证</span>
					<span v-else-if="sellerInfo.isCompany && sellerInfo.isCompanyType == 'individual'">已个人认证</span>
					<span v-else-if="sellerInfo.isCompany && sellerInfo.isCompanyType == 'business'">已企业认证</span>
					<i class="iconfont icon-right"></i>
				</cell>
				<cell title="消保金" link="/member/consumerSecurity" value-align="right" arrow-direction="right">
					<img slot="icon" width="20" style="display:block; margin-right:5px;" src="../../../assets/images/xiaobao.png">
					<span v-if="!sellerInfo.deposit">未缴纳</span>
					<span v-else>已缴纳</span>
					<i class="iconfont icon-right"></i>
				</cell>
			</group>
		</div>
		<div class="my-order nav" style="margin-bottom: 60px">
			<router-link to="/buyerCenter">
				<group>
					<cell title="买家中心" link="/buyerCenter" value-align="right" arrow-direction="right">
						<img slot="icon" width="20" style="display:block; margin-right:5px;" src="../../../assets/images/maijia2.png"> &nbsp;
						<i class="iconfont icon-right"></i>
					</cell>
				</group>
			</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
import { XHeader, Group, Icon, Cell, Grid, GridItem } from 'vux'
import {getMember} from '../../../api/api'
import assign from '../../../assets/js/assign.js'// 混入式方法
export default {
  components: {
    XHeader,
    Group,
    Icon,
    Cell,
    Grid,
    GridItem
  },
  mixins: [assign],
  data () {
    return {
      logLists: [// 本地图片
        require('../../../assets/images/icon_v1.png'),
        require('../../../assets/images/icon_v2.png'),
        require('../../../assets/images/icon_v3.png'),
        require('../../../assets/images/icon_v4.png'),
        require('../../../assets/images/icon_v5.png'),
        require('../../../assets/images/icon_v6.png'),
        require('../../../assets/images/icon_v7.png'),
        require('../../../assets/images/icon_v8.png'),
        require('../../../assets/images/icon_v9.png'),
        require('../../../assets/images/icon_v10.png'),
        require('../../../assets/images/icon_v11.png'),
        require('../../../assets/images/icon_v12.png'),
        require('../../../assets/images/icon_v13.png')
      ],
      // order list
      orderList: [{
        iconClass: 'icon-daifukuan',
        title: '待付款',
        linkTo: '/newSellerOrder/waitPay',
        orderNum: '0',
        type: '0'
      }, {
        iconClass: 'icon-icon2',
        title: '待发货',
        linkTo: '/newSellerOrder/waitSend',
        orderNum: '0',
        type: '1'
      }, {
        iconClass: 'icon-daishouhuo',
        title: '待收货',
        linkTo: '/newSellerOrder/waitGet',
        orderNum: '0',
        type: '2'
      }],
      afterSaleorderNum: '0',
      reportorderNum: '0',
      // detail list
      detailList: [{
        iconClass: 'icon-daifukuan',
        title: '我的钱包',
        linkTo: '/balanceIndex/seller'
      }, {
        iconClass: 'icon-guanli',
        title: '拍品管理',
        linkTo: '/newStoreManage/autioning'
      }, {
        iconClass: 'icon-xiaoxi1',
        title: '群发消息',
        linkTo: '/sellerCenter/groupsentMessage'
      }, {
        iconClass: 'icon-liwuhuodong',
        title: '推荐有礼',
        linkTo: '/buyerCenter/PromotionGift'
      },
      //  {
      // 	iconClass: 'icon-dengguang',
      // 	title: '营销工具',
      // 	linkTo: '/sellerCenter/sellerTool',
      // },
      {
        iconClass: 'icon-kuozhanshuxing',
        title: '扩展服务',
        linkTo: '/sellerCenter/extendedService'
      }, {
        iconClass: 'icon-xiaoxi3',
        title: '消息',
        linkTo: '/news'
      }],
      // , {
      // 	iconClass: 'icon-6dianpu',
      // 	title: '我的店铺',
      // 	linkTo: '/storeHome',
      // }
      // , {
      // 	iconClass: 'icon-kehufenbutu',
      // 	title: '分销中心',
      // 	linkTo: '/sellerCenter/marketingCenter',
      // }
      // 获取到的数据
      sellerInfo: {},
      seller_id: ''
    }
  },
  methods: {
    tostoreInt (name) {
      localStorage.setItem('name', name)
    },
    getMember: function () {
      let _this = this
      getMember('seller').then(function (res) {
        _this.sellerInfo = res.data.info
        _this.seller_id = res.data.info.id
        for (var i in _this.orderList) {
          _this.orderList[0].orderNum = res.data.order.waitPay // 待付款
          _this.orderList[1].orderNum = res.data.order.waitDeliver // 待发货
          _this.orderList[2].orderNum = res.data.order.waitReceive // 待收货
          _this.afterSaleorderNum = res.data.order.waitService // 售后
          _this.reportorderNum = res.data.order.Report // 店铺报表
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    saveName (name) {
      localStorage.setItem('name', name)
    }
  },
  mounted () {
    this.getMember()
  },
  created () {

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
	.vux-no-group-title .vux-cell-primary {
		transform : translateY(5px);
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
		height : 1px;
		border-bottom : 1px solid #e5e5e5;/*no*/
		position: absolute;
		top : 36%;
		z-index : 100;
		left : 0.45rem;
	}
	.maijia2 .info .set .iconfont {
		line-height : 1.3rem;
		color : #666;
		font-size : 0.53333rem;
	}
	.maijia2 {
		background: #ededed;
		overflow: hidden;
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

	.maijia2 /deep/.info {
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
		}
		.set p {
			padding-left: 10px;
			padding-right : 20px;
			box-sizing: border-box;
			height: 70px;
			line-height: 100px;
			text-align: right;
			font-weight: bold;
			color: #333;
			font-size: 26px;
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
			.tou-xiang,
			.nav-detail {
				height: 140px;
				margin-top: 61px;
				float: left;
			}
			.nav-name {
				height: 36px;
				font-size: 28px;
				margin-bottom:4px;
				margin-top:8px;
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
				color : #666;
				span:nth-child(2) {
					margin-left: 15px;
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
					font-size : 34px;
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

	.maijia2 /deep/.my-order {
		width: 100%;
		// border-bottom: 2px solid @border-color;
		margin-bottom: 30px;
		position: relative;
		.weui-cells {
			box-sizing: border-box;
			padding-left: @padding-left;
			padding-right: @padding-left;
			line-height: 84px;
			.weui-cell:last-child .weui-cell__hd{
				transform : translateY(2px);
			}
			.vux-cell-bd label {
				font-size: 30px;
				line-height : 1rem;
			}
			.weui-cell__ft {
				color: #999;
				font-size: 26px;
				padding-right : 0;
				.icon-right {
					font-size: 30px;
					color : #d2d2d2;
					transform : translateY(2px);
				}
				&:after {
					height: 0;
					width: 0;
					border: none;
				}
			}
		}
		.weui-grids {
			height: 200px;
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
					line-height: 36px;
					text-align: center;
					border-radius: 50%;
					position: absolute;
					right: -55px;
					top: -120px;
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
		.weui-grid{
			padding:50px 0;
		}
		.weui-cells:after {
			border: none;
		}
	}

	.maijia2 /deep/.my-order.nav {
		.weui-cells .weui-cell {
			border: none;
		}
		// .weui-cells:before {
		// 	border-top: 1px solid #b1b1b1;
		// }
	}

	.maijia2 /deep/.detail-list {
		margin-bottom: 30px;
		background-color: @bg-color;
		position: relative;
		&:before {
			content : '';
			position: absolute;
			width : 100%;
			height : 1px;
			border-bottom : 1px solid #e5e5e5;/*no*/
			top : 50%;
			transform : translateY(-50%);
		}
		.weui-grid {
			height: 170px;
			text-align : center;
			box-sizing : border-box;
			padding-top : 46px;
			i {
				font-size: 0.65rem;
				padding: 0 55px;
				color: #f15511;
			}
			&:nth-of-type(5) i,
			&:nth-of-type(6) i,
			&:nth-of-type(7) i,
			&:nth-of-type(8) i {
				color: #fd8f01;
			}
			span {
				display: block;
				line-height: 2.5;
				text-align: center;
				font-size: 24px;
			}
			&:before {
				border-right: none;
			}
			&:after {
				// border-bottom: 1px solid @border-color;
			}
		}
	}
	.iconfont{
		margin: 0
	}
	.selDaiClass{
		margin-top: -3px;
	}
</style>
