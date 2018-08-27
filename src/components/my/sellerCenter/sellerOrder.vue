<template>
	<div class="app-container">
		<div class="buyer-nav">
			<div v-for="(list,index) in fivebtn" :key="index" class="menuItem" :class="{ selected:nowindex == index}" @click="Red(index)">{{list.text}}
			</div>
			<router-link class="search" to="/buyerCenter/buyerOrder/search">
				<i class="iconfont icon-sousuo"></i>
			</router-link>
		</div>
		<div class="buyer-list">
			<ul>
				<li v-for="(e,index) in allList" :key="index">
					<div class="buyer-tool" :style="{backgroundImage:'url(' + e.avatar + ')'}">
						<router-link to="/myHome">{{e.nickname}}<i class="iconfont icon-right"></i></router-link>
						<button class="buyer-status">{{e.showPayment.title}}</button>
						<i @click="showdel()" class="iconfont icon-shouji op"></i>
						<i @click="alldingDan()" class="iconfont icon-wendang op"></i>
					</div>
					<div class="buy-info">
						<div class="goods-info" :style="{backgroundImage:'url(' + e.auction_img + ')'}"></div>
						<p class="goods-intr">{{e.auction_description}}</p>

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
						</ul>
						<!-- 买家申请退货 -->
						<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '6'">
							<li>成交金额：￥{{e.price}}元</li>
							<li>申请时间：{{timestampToTime(parseFloat(e.tuihuo_time))}}</li>
						</ul>
						<!-- 买家已发货 -->
						<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '7'">
							<li>成交金额：￥{{e.price}}元</li>
							<li>发货时间：{{timestampToTime(parseFloat(e.add_time))}}</li>
						</ul>
						<!-- 同意退货 -->
						<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '8'">
							<li>成交金额：￥{{e.price}}元</li>
							<li>成交时间：{{timestampToTime(parseFloat(e.add_time))}}</li>
							<li>同意时间：{{timestampToTime(parseFloat(e.accept_time))}}</li>
						</ul>
					</div>
					<div class="buyer-btn">
						<button v-if="e.showPayment.showPayment" >立即付款</button>
						<button v-if="e.showPayment.showDelay">延迟付款</button>
						<button v-if="e.showPayment.showFace">当面交易</button>
						<button v-if="e.showPayment.showApplyMoney">申请退款</button>
						<button v-if="e.showPayment.showDelivery">立即发货</button>
						<button v-if="e.showPayment.showRefuseMoney">拒绝退款</button>
						<button v-if="e.showPayment.showAgreeMoney">同意退款</button>
						<button v-if="e.showPayment.showLogisticsUser">查看物流 买家</button>
						<button v-if="e.showPayment.showLogisticsSellerr">查看物流  卖家</button>
						<button v-if="e.showPayment.showReturnGood">立即退货</button>
						<button v-if="e.showPayment.showReap">确认收获</button>
						<button v-if="e.showPayment.showAgreeReturnGood">同意退货</button>
						<button v-if="e.showPayment.showRefuseReturnGood">拒绝退货</button>
						<button v-if="e.showPayment.showLogisticsSellerr">查看物流  卖家</button>
						<button v-if="e.showPayment.showReturnGoodAndMoney">收货并退款</button>
						<button v-if="e.showPayment.showWaiterSeller">小二介入2 卖家</button>
						<button v-if="e.showPayment.showWaiterUser">小二介入1 买家</button>
						<button v-if="e.showPayment.showCancelWaiterSeller">撤销介入2 卖家</button>
						<button v-if="e.showPayment.showCancelWaiterUser">撤销介入 1 买家</button>
						<button v-if="e.showPayment.showApplyGoods">申请退货</button>
						<button v-if="e.showPayment.showDelayGoods">延长收货</button>
						<button v-if="e.showPayment.showRefusingFase">拒绝当面交易</button>
						<button v-if="e.showPayment.showRefuseReceiveGood">拒绝收货</button>
						<button v-if="e.showPayment.showEvaluate">立即评价</button>
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
		<Navbar num='0'></Navbar>
	</div>
</template>
<script>
import {order} from '../../../api/api'
import Navbar from '../../common/Navbar'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      // 所有产品列表
      allList: [],
      // 0订单的占位符
      noOrder: false,
      showlists: false,
      showtel: false,
      fivebtn: [
        {
          'text': '全部',
          'type': ''
        },
        {
          'text': '待付款',
          'type': 'daifukuan'
        },
        {
          'text': '待发货',
          'type': 'daifahuo'
        },
        {
          'text': '待收货',
          'type': 'yifahuo'
        },
        {
          'text': '待评价',
          'type': 'yishouhuo'
        }
      ],
      nowindex: 0,
      type: ''
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
    getAllInfo: function (type) {
      let _this = this
      let params = {
        type: 'user',
        page: '1',
        pagenum: '10',
        state: type
      }
      order(params).then(function (res) {
        if (res.code == '200') {
          _this.allList = res.data
          if (_this.allList.length == '0') { // 如果没有订单，则显示0订单占位符
            _this.noOrder = true
          }
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    Red (index) {
      this.allList = []
      this.nowindex = index
      this.type = this.fivebtn[index].type
      this.getAllInfo(this.type)
    }
  },
  mounted () {
    this.getAllInfo()
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
    height: 120px;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 0 60px;
    box-sizing: border-box;
    position: relative;
    a {
      display: inline-table;
      line-height: 148px;
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
      top: 30px;
      right: 15px;
    }
    a.selected {
      border-bottom: 4px solid #9e2026;
      color: #9e2026;
      font-weight: bold;
    }
  }

  .buyer-list {
    margin-bottom: 100px;
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
          border: none;
          padding: 0 20px;
          box-sizing: border-box;
          height: 50px;
          line-height: 50px;
          margin-left: 10px;
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
		font-size: 28px;
		text-align: center;
		padding:0 16px;
		float: left;
		height: 100px;
		line-height: 100px
	}
	.selected {
		color: #9e2026;
		border-bottom: 8px solid #9e2026;
	}
	.buyer-status{
		font-size: 24px;
	}
</style>
