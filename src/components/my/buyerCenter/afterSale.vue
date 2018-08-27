<template>
	<div class="app-containerAllOrder">
		<div class="buyer-list">
			<ul>
				<li v-for="(e,index) in allList" :key="e">
					<div class="buyer-tool" :style="{backgroundImage:'url(' + e.avatar + ')'}">
						<router-link :to="'/storeHome/'+e.user_id" class="fontTwoE">{{e.nickname}}<i class="iconfont icon-right"></i></router-link>
						<button class="buyer-status">{{e.showPayment.title}}</button>
						<i @click="showdel()" class="iconfont icon-shouji op"></i>
						<i @click="alldingDan()" class="iconfont icon-wendang op"></i>
					</div>
					<!-- ,address_id:e.address_id -->
					<router-link :to="{path: '/orderDetail/'+e.order_id}">
						<div class="buy-info">
							<div class="goods-info" :style="{backgroundImage:'url(' + e.auction_img + ')'}"></div>
							<p class="goods-intr fontTwoE">{{e.auction_desc}}</p>
							<!-- 卖家已收货退货,交易失败 -->
							<ul class="buyer-detail" v-if="e.showPayment.nameVal === '0'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>失败时间：{{timestampToTime(parseFloat(e.finish_time))}}</li>
							</ul>
							<!-- 待付款 -->
							<ul class="buyer-detail" v-if="e.showPayment.nameVal === '1'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>付款截止：{{timestampToTime(parseFloat(e.add_time) + 86400 * 2)}}</li>
							</ul>
							<!-- 待发货 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '2'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>成交时间：{{timestampToTime(parseFloat(e.add_time))}}</li>
							</ul>
							<!-- 已发货,等待确认 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '3'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>成交时间：{{timestampToTime(parseFloat(e.add_time))}}</li>
								<li>收货截止时间：</li>
							</ul>
							<!-- 交易完成 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '4'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>成交时间：{{timestampToTime(parseFloat(e.add_time))}}</li>
								<li>确认收货：{{timestampToTime(parseFloat(e.add_time))}}</li>
							</ul>
							<!-- 交易失败 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '10'">
								<li>交易状态：交易失败</li>
								<li>失败时间：{{timestampToTime(parseFloat(e.finish_time))}}</li>
							</ul>
							<!-- 买家申请退款 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '5'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>申请时间：{{timestampToTime(parseFloat(e.tuikuan_time))}}</li>
								<li><div style="float:left">退款待处理还剩：</div><countDown style="width:80px;float:left" :endtime='parseFloat(e.tuikuan_time) + 86400 * 2' :dayShow='true' :secShow='false'></countDown></li>
							</ul>
							<!-- 买家申请退货 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '6'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>申请时间：{{timestampToTime(parseFloat(e.tuihuo_time))}}</li>
								<li><div style="float:left">退货待处理还剩：</div><countDown style="width:80px;float:left" :endtime='parseFloat(e.tuihuo_time) + 86400 * 2' :dayShow='true' :secShow='false'></countDown></li>
							</ul>
							<!-- 买家已发货 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '7'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>发货时间：{{timestampToTime(parseFloat(e.add_time))}}</li>
							</ul>
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '11'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>小二介入：{{timestampToTime(parseFloat(e.platform_time))}}</li>
							</ul>
							<!-- 同意退货 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '8'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>成交时间：{{timestampToTime(parseFloat(e.add_time))}}</li>
								<li>同意时间：{{timestampToTime(parseFloat(e.accept_time))}}</li>
							</ul>
						</div>
					</router-link>
					<div class="buyer-btn">
						<router-link :to="'/payment/'+e.order_id">
							<button class="isImpotant" v-if="e.showPayment.showPayment" >立即付款</button>
						</router-link>

						<button class="unImpotant fontCol" @click="showshowlist('payLaterType',e.order_id,index)" v-if="e.showPayment.showDelay">延迟付款</button>

						<button class="unImpotant fontCol" @click="showshowlist('FaceType',e.order_id,index)" v-if="e.showPayment.showFace">当面交易</button>

						<router-link :to="{path: '/returnRequest/'+e.order_id+'/2'}">
							<button class="unImpotant" v-if="e.showPayment.showApplyMoney">申请退款</button>
						</router-link>

						<router-link :to="'/confirmSend/'+e.order_id">
							<button class="isImpotant" v-if="e.showPayment.showDelivery">立即发货</button>
						</router-link>

						<router-link :to="{path: '/returnRequest/'+e.order_id+'/4'}">
							<button class="unImpotant" v-if="e.showPayment.showRefuseMoney">拒绝退款</button>
						</router-link>

						<router-link :to="'/agreeReturnMoney/'+e.order_id">
							<button class="unImpotant" v-if="e.showPayment.showAgreeMoney">同意退款</button>
						</router-link>

						<router-link :to="{path: '/checkLogistics/'+e.order_id+'/'+e.is_tuihuo}">
						<button class="unImpotant" v-if="e.showPayment.showLogisticsUser">查看物流</button> <!-- 买家 -->
						</router-link>

						<!-- 卖家 -->
						<router-link :to="{path: '/checkLogistics/'+e.order_id+'/'+e.is_tuihuo}">
						<button class="unImpotant" v-if="e.showPayment.showLogisticsSellerr">查看物流</button>
						</router-link>

						<router-link :to="{path: '/confirmBack/'+e.order_id}">
						<button class="unImpotant" v-if="e.showPayment.showReturnGood">立即退货</button>
						</router-link>

						<button class="isImpotant" @click="showshowlist('confirmGetType',e.order_id,index)" v-if="e.showPayment.showReap">确认收货</button>

						<router-link :to="'/agreeReturnSale/'+e.order_id">
							<button class="unImpotant" v-if="e.showPayment.showAgreeReturnGood">同意退货</button>
						</router-link>

						<router-link :to="{path: '/returnRequest/'+e.order_id+'/3'}">
							<button class="unImpotant" v-if="e.showPayment.showRefuseReturnGood">拒绝退货</button>
						</router-link>

						<router-link :to="'/agreeReturnMoney/'+e.order_id">
							<button class="unImpotant" v-if="e.showPayment.showReturnGoodAndMoney">收货并退款</button>
						</router-link>

						<router-link :to="{path: '/returnRequest/'+e.order_id+'/1'}">
							<button class="unImpotant" v-if="e.showPayment.showApplyGoods">申请退货</button>
						</router-link>

						<button class="unImpotant" @click="deLayTimeGet(e.order_id)" v-if="e.showPayment.showDelayGoods">延长收货</button>

						<button class="unImpotant" @click="showshowlist('refuseFaceType',e.order_id,index)" v-if="e.showPayment.showRefusingFase">拒绝当面交易</button >

						<button class="unImpotant" @click="showshowlist('RefuseReceiveType',e.order_id,index)" v-if="e.showPayment.showRefuseReceiveGood">拒绝收货</button>

						<router-link :to="{path: '/evaluate/'+e.order_id}">
							<button :class="isImpotant" v-if="e.showPayment.showEvaluate">立即评价</button>
						</router-link>
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
		<div id="fixednumMain" v-if="showlists">
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
		<div id="fixednumMain" v-if="showtel">
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
		<!-- 弹出弹框 -->
		<div id="fixednumMain" v-if="showshowlists">
			<div @click="closeshowlists()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="sharesomething">

				<div v-if="type=='FaceType'" @click="transactions()">确认当面交易</div>
				<div v-if="type=='refuseFaceType'" @click="refuseFaceToFaces()">确认拒绝当面交易</div>
				<div v-if="type=='payLaterType'"   @click="payLaters()">确认延期付款</div>
				<div v-if="type=='confirmGetType'" @click="confirmGets()">确认收货</div>
				<div v-if="type=='RefuseReceiveType'" @click="RefuseReceive()">拒绝收货</div>
				<div  @click="closeshowlists()" class="bordertop">取消</div>
			</div>
		</div>
	</div>
</template>
<script>
import countDown from '../../common/countDown'
import {orderConfirmGoods, order, orderTransaction, orderPaylater, orderRefuseFace, orderRefuseGoods, afterSale} from '../../../api/api'
export default {
  components: {
    countDown
  },
  data () {
    return {
      allList: [], // 所有产品列表
      nowindex: 0,
      showshowlists: false,
      type: '',
      orderId: '',
      whichIndex: 0
    }
  },
  methods: {
    showshowlist (type, id, index) {
      this.type = type
      this.showshowlists = true
      this.orderId = id
      this.whichIndex = index
    },
    // 关闭
    closeshowlists () {
      this.showshowlists = false
    },

    // 拒绝当面交易
    refuseFaceToFaces () {
      orderRefuseFace(this.orderId).then(res => {
        this.showshowlists = false
        this.allList[this.whichIndex].showPayment.showRefusingFase = false
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    // 当面交易
    transactions () {
      orderTransaction(this.orderId).then(res => {
        this.showshowlists = false
        this.allList[this.whichIndex].showPayment.showFace = false
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    // 确认收货
    confirmGets () {
      orderConfirmGoods(this.orderId).then(res => {
        // console.log(res.data)
        this.showshowlists = false
        this.allList[this.whichIndex].showPayment.showReap = false
      }).catch(err => {
        // console.log(err.response.data.message)
      })
    },
    // 延迟付款
    payLaters () {
      orderPaylater(this.orderId).then(res => {
        // console.log(res.data)
        this.showshowlists = false
        this.allList[this.whichIndex].showPayment.showDelay = false
      }).catch(err => {
        // console.log(err.response.data.message)
      })
    },
    // 拒绝收货
    RefuseReceive () {
      orderRefuseGoods(this.orderId).then(res => {
        // console.log(res.data)
        this.showshowlists = false
        this.allList[this.whichIndex].showPayment.showRefuseReceiveGood = false
      }).catch(err => {
        // console.log(err.response.data.message)
      })
    },
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

    alldingDan () {
      this.showlists = true
    },
    order: function (type) {
      let params = {
        type: type,
        page: '1',
        pagenum: '10',
        is_tuihuo: '1'
      }
      order(params).then(res => {
        console.log(res.data)
        this.allList = res.data
        if (this.allList.length == '0') { // 如果没有订单，则显示0订单占位符
          this.noOrder = true
        } else {
          this.noOrder = false
        }
      }).catch(err => {
        this.$router.push({name: 'errorPage'})
        console.log(err)
      })
    }
  },
  mounted () {
    let type = this.$route.params.type
    this.order(type)
  }
}
</script>

<style lang="less" scoped>
  .app-containerAllOrder {
    min-height: 1234px;
    background-color: #f4f4f4;
    overflow: hidden;
  }

  .app-containerAllOrder .buyer-nav {
    width: 100%;
    height: 78px;
    margin-bottom: 11px;
    background-color: #fff;
    padding: 0 30px;
    box-sizing: border-box;
    position: relative;
    a {
      display: inline-table;
      line-height: 78px;
      font-size: 60px;
      padding: 0 30px;
      box-sizing: border-box;
      color: #999;
    }
    a.search {
      display: inline-block;
      height: 48px;
      line-height: 48px;
      border-left: 4px solid #e5e5e5;
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 36px;
    }
    a.selected {
      border-bottom: 4px solid #9e2026;
      color: #9e2026;
      font-weight : 700;
    }
  }

  .app-containerAllOrder .buyer-list {
    margin-bottom: 100px;
    li {
      margin-top: 10px;
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
          color: #999999;
        }
        button {
          outline: none;
          border: none;
          background-color: #fff;
          color: #f15511;
          border-left: 1px solid #e5e5e5;
          /*margin-top: 19px;*/
        }
      }
      .buy-info {
        height: 220px;
        background-color: #f7f7f7;
        padding: 27px 30px;
        box-sizing: border-box;
        position: relative;
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
          position: absolute;
          bottom:27px;
          left:213px;
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
        min-height: 90px;
        overflow: hidden;
        padding: 20px 30px;
        box-sizing: border-box;
        button {
          float: right;
          outline: none;
          padding: 0 20px;
          box-sizing: border-box;
          height: 50px;
          line-height: 50px;
          margin-left: 10px;
          background-color: transparent;
          border-radius: 5px;
          margin-top: 10px;
          font-size: 28px;
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
    top: 324px;
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
  .menuItem {
		font-size: 30px;
		text-align: center;
		padding:0 16px;
		float: left;
		height: 74px;
		line-height: 74px;
		color: #999999
	}
	.selected {
		font-size: 30px;
		color: #9e2026;
			font-weight : 700;
		border-bottom:4px solid #9e2026;
	}
	.buyer-status{
		height: 30px;
		padding-left: 18px;
		color: #f15511;
		font-size: 24px;
		margin-top: 24px;
		line-height: 30px;
	}
	.icon-sousuo{
		margin: 0;
	}
	.unImpotant{
		border: 2px solid #999999;
        color: #999999;
	}
	.isImpotant{
		border: 2px solid #9e2026;
        color: #9e2026;
	}
	.fontTwoE{
		font-size:28px;
	}
	.fontCol{
		color: #333;
	}
</style>
