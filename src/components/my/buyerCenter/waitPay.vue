<template>
	<div class="app-containerAllOrder" ref="allOrder">
		<div class="buyer-list">
			<ul>
				<li v-for="(e,index) in allList" :key="e.auction_id"> 
					
						<div class="buyer-tool">
							<img class="buyerToolbac" :src="e.avatar" alt="">
							<span @click = "moveTo(e.user_id,e.nickname)" class="nickname">{{e.nickname}}</span>
							<button class="buyer-status">{{e.showPayment.title}}</button>
							<i style="position:relative;" class="iconfont icon-shouji op">
								<a style="width:20px;height:100%;position: absolute;right:8px;padding-right:0;margin-left:8px;" :href="'tel:'+e.mobile"></a>
							</i>
							<i @click="alldingDan(e.order_id)" class="iconfont icon-wendang op"></i>
						</div>  
					
					<!-- ,address_id:e.address_id -->  
					<router-link :to="{path: '/orderDetail/'+e.order_id+'/all'}">
						<div class="buy-info">
							<div class="goods-info" :style="{backgroundImage:'url(' + e.auction_img + ')'}"></div>
							<p class="goods-intr fontTwoE">{{e.auction_desc}}</p>

							<!-- 待付款 -->
							<ul class="buyer-detail" v-if="e.showPayment.nameVal === '1'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>成交时间：{{timestampToTimeYMDHM(parseFloat(e.add_time))}}</li>
								<li><div style="float:left">付款截止：</div>
									<countDown style="width:80px;float:left" :endtime='parseFloat(e.abort_payment_time)' :dayShow='false' :secShow='true'></countDown></li>
							</ul>
							<!-- 待发货 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '2'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>付款时间：{{timestampToTimeYMDHM(parseFloat(e.payment_time))}}</li>
							</ul>
							<!-- 待发货 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '21'">
								<li>成交金额：￥{{e.price}}元</li>
								<li><div style="float:left">发货截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(e.abort_fahuo_time)' :dayShow='true' :secShow='false'></countDown></li>
							</ul>
							
							<!-- 已发货,等待确认 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '3'">
								<li>成交金额：￥{{e.price}}元</li>
								<li><div style="float:left">确认截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(e.abort_shouhuo_time)' :dayShow='true' :secShow='false'></countDown></li>
								<!-- <li v-else><div style="float:left">确认截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(e.fahuo_time)+86400 * 14' :dayShow='true' :secShow='false'></countDown></li> -->
							</ul>
							<!-- 待评价 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '41'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>成交时间：{{timestampToTimeYMDHM(parseFloat(e.add_time))}}</li>
								<li><div style="float:left">评价截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(e.abort_comment_time)' :dayShow='true' :secShow='false'></countDown></li>
							</ul>
							<!-- 交易完成 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '4'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>成交时间：{{timestampToTimeYMDHM(parseFloat(e.add_time))}}</li>
								<li>完成时间：{{timestampToTimeYMDHM(parseFloat(e.shouhuo_time))}}</li>
							</ul>
							<!-- 交易失败 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '10'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>失败时间：{{timestampToTimeYMDHM(parseFloat(e.finish_time))}}</li>

							</ul>
							<!-- 买家申请退款 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '5'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>申请时间：{{timestampToTimeYMDHM(parseFloat(e.tuikuan_time))}}</li>
								<!-- <li>截止时间：{{timestampToTimeYMDHM(parseFloat(e.abort_tuikuan_time))}}</li> -->
								<li><div style="float:left">确认截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(e.abort_tuikuan_time)' :dayShow='true' :secShow='false'></countDown></li>
							</ul>
							<!-- 买家申请退货 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '6'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>申请时间：{{timestampToTimeYMDHM(parseFloat(e.tuihuo_time))}}</li>
								<li><div style="float:left">确认截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(e.abort_tuihuo_time)' :dayShow='true' :secShow='false'></countDown></li>
							</ul>
							<!-- 买家已发货 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '7'">
								<li>成交金额：￥{{e.price}}元</li>
								<!-- <li>确认截止：{{timestampToTimeYMDHM(parseFloat(e.add_time))}}</li> -->
								<li><div style="float:left">收货截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(e.abort_tuihuo_expresstime)' :dayShow='true' :secShow='false'></countDown></li>
							</ul>
							<!-- 同意退货 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '8'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>同意时间：{{timestampToTimeYMDHM(parseFloat(e.accept_time))}}</li>
							</ul>
							<!-- 申请当面交易卖家 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '9'">
								<li>成交金额：￥{{e.price}}元</li>
								<li>申请时间：{{timestampToTimeYMDHM(parseFloat(e.face_apply_time))}}</li>
							</ul>
							<!-- 申请当面交易买家 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '91'">
								<li>成交金额：￥{{e.price}}元</li>
								<!-- <li>确认截止：{{timestampToTime(parseFloat(e.face_confirm_time))}}</li> -->
								<li><div style="float:left">确认截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(e.face_confirm_time)' :dayShow='false' :secShow='true'></countDown></li>
							</ul>
							<!-- 小二介入申请 -->
							<ul class="buyer-detail" v-else-if="e.showPayment.nameVal === '11'">
								<li>成交金额：￥{{e.price}}元</li>
								<!-- <li>确认截止：{{timestampToTime(parseFloat(e.face_confirm_time))}}</li> -->
								<li><div style="float:left">小二介入：</div><countDown style="width:80px;float:left" :endtime='parseFloat(e.platform_time)' :dayShow='false' :secShow='true'></countDown></li>
							</ul>
						</div>
					</router-link>
					<div class="buyer-btn"> 
						<router-link :to="{path:'/payment', query: { order_id:e.order_id}}">
							<button class="isImpotant" v-if="e.showPayment.showPayment" >立即付款</button>
						</router-link>

						<button class="unImpotant fontCol" @click="showshowlist('payLaterType',e.order_id,index)" v-if="e.showPayment.showDelay">延迟付款</button>

						<button class="unImpotant fontCol" @click="showshowlist('FaceType',e.order_id,index)" v-if="e.showPayment.showFace">当面交易</button>
						
						<router-link :to="{path: '/returnRequest/'+e.order_id+'/2'}">
							<button class="unImpotant" v-if="e.showPayment.showApplyMoney">申请退款</button>
						</router-link>

						<router-link :to="'/confirmSend/'+e.order_id">
							<button @click="setOrderLength" class="isImpotant" v-if="e.showPayment.showDelivery">立即发货</button>
						</router-link>

						<router-link :to="{path: '/returnRequest/'+e.order_id+'/4'}">
							<button class="unImpotant" v-if="e.showPayment.showRefuseMoney">拒绝退款</button>
						</router-link>	

						<router-link :to="'/agreeReturnMoney/'+e.order_id">
							<button class="unImpotant" v-if="e.showPayment.showAgreeMoney">同意退款</button>
						</router-link>
						<button class="isImpotant" @click="showshowlist('confirmGetType',e.order_id,index)" v-if="e.showPayment.showReap">确认收货</button>
       					<router-link :to="{path: '/checkLogistics/'+e.order_id+'/'+e.is_tuihuo}">
						<button class="unImpotant" v-if="e.showPayment.showLogisticsUser">查看物流</button> <!-- 买家 -->
						</router-link>

						<!-- 卖家 -->
						<router-link :to="{path: '/checkLogistics/'+e.order_id+'/'+e.is_tuihuo}">
						<button class="unImpotant" v-if="e.showPayment.showLogisticsSellerr">查看物流</button>
						</router-link>
						
						<router-link :to="{path: '/confirmBack/'+e.order_id}">
						<button class="isImpotant" v-if="e.showPayment.showReturnGood">立即退货</button>
						</router-link>
						<router-link :to="'/agreeReturnSale/'+e.order_id">
							<button class="unImpotant" v-if="e.showPayment.showAgreeReturnGood">同意退货</button>
						</router-link>

						<router-link :to="{path: '/returnRequest/'+e.order_id+'/3'}">
							<button class="unImpotant" v-if="e.showPayment.showRefuseReturnGood">拒绝退货</button>
						</router-link>

						<router-link :to="'/agreeReturnConfirmReceipt/'+e.order_id">
							<button class="unImpotant" v-if="e.showPayment.showReturnGoodAndMoney">收货并退款</button>
						</router-link>
						
						<router-link :to="{path: '/returnRequest/'+e.order_id+'/1'}">
							<button class="unImpotant" v-if="e.showPayment.showApplyGoods">申请退货</button>
						</router-link>

						<button class="unImpotant" @click="showshowlist('delayedDelivery',e.order_id,index)" v-if="e.showPayment.showDelayGoods">延长收货</button>

						<button class="unImpotant" @click="showshowlist('refuseFaceType',e.order_id,index)" v-if="e.showPayment.showRefusingFase">拒绝当面交易</button >

						<button class="unImpotant" @click="showshowlist('RefuseReceiveType',e.order_id,index)" v-if="e.showPayment.showRefuseReceiveGood">拒绝收货</button>
						<router-link :to="{path: '/evaluate/'+e.order_id}">
							<button :class="isImpotant" v-if="e.showPayment.showEvaluate">立即评价</button>   
						</router-link>

					</div>
				</li>
				<load-more v-if="loading" tip="正在加载"></load-more>
    			<load-more v-if="elseloading" :show-loading="false" tip="暂无更多数据" background-color="#fbf9fe"></load-more>
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
				<router-link :to="'/buyeralllists/'+whichType+'/'+orderId">	
					<div @click="lookshowlists()">{{writer}}</div>
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
					<span>{{telMobile}}</span>
				</div>
				<div>
					<a :href="'tel:'+telMobile">确认拨打?</a>
				</div>			  
			</div>
		</div>
		<!-- 弹出弹框 -->
		<div id="fixednumMain" v-if="showshowlists">
			<div @click="closeshowlists()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="sharesomething">

				<div v-if="type=='FaceType'" style="color:red" @click="transactions()">确认当面交易</div>
				<div v-if="type=='refuseFaceType'" style="color:red" @click="refuseFaceToFaces()">确认拒绝当面交易</div>
				<div v-if="type=='payLaterType'" style="color:red" @click="payLaters()">确认延期付款</div>
				<div v-if="type=='confirmGetType'" style="color:red" @click="confirmGets()">确认收货</div>
				<div v-if="type=='RefuseReceiveType'" style="color:red" @click="RefuseReceive()">拒绝收货</div>
				<div v-if="type=='delayedDelivery'" @click="delayedDelivery()"><span style="color:red">延迟收货</span><span style="color:#aba9a5">（收货将会延长7天）</span></div>
				<div  @click="closeshowlists()" class="bordertop">取消</div>					
			</div>
		</div>
	</div>
</template>
<script>
	import { LoadMore } from 'vux'
	import countDown from '../../common/countDown'
	import {orderConfirmGoods,order,orderTransaction,orderPaylater,orderRefuseFace,orderRefuseGoods,orderDelayGoods } from '../../../api/api';
	export default {
		components:{
			countDown,
			LoadMore
		},
		data() {
			return {
				allList: [],// 所有产品列表
				nowindex:0,
				fivebtn:[
					{
			          "text":"全部",
			          'type':'',
			          'link':'/buyerOrder/-1/'          
			        },
			        {
			          "text":"待付款",
			          'type':'daifukuan',
			          'link':'/buyerOrder/0/'                  
			        },
			        {
			          "text":"待发货",
			          'type':'daifahuo',
			          'link':'/buyerOrder/1/' 
			        },
			        {
			          "text":"待收货",
			          'type':'yifahuo',
			          'link':'/buyerOrder/2/'                   
			        },
			        {
			          "text":"待评价",
			          'type':'yishouhuo',
			          'link':'/buyerOrder/3/'                        
			        }
				],
				elseloading:false,
				loading:false,
				showshowlists:false,
				type:"",
				types:'' ,
				orderId:'',
				whichIndex:0,
				showlists:false,
				writer:'', //弹框文案
				showtel:false,
				noOrder:false,
				telMobile:'',
				page:0,
				params:{},
				whichType:''
			}
		},
		created() {
		    window.addEventListener("scroll", this.scrollHandler);
		},

		destroyed() {
		    window.removeEventListener("scroll", this.scrollHandler);
		},
		methods: {  
			setOrderLength(){
				sessionStorage.setItem('orderLength',this.allList.length)
			},
			//注册scroll事件并监听 
		    scrollHandler() {
		      const st = document.documentElement.scrollTop || document.body.scrollTop;
		      const ch = this.$refs.allOrder.clientHeight;
		      if (st + window.innerHeight >= ch) {
		        this.order(this.whichType);
		      }
		    }, 
			moveTo(id,name){
				// /member/fansDetails/0Rjd35B6apkJEaN1
				// <router-link :to="'/storeHome/'+e.user_id">
				if(this.whichType == 'seller'){
					this.$router.push('/member/fansDetails/'+id)
				}else if(this.whichType == 'user'){
					this.$router.push('/storeHome/'+id)
					localStorage.setItem('name',name)
				}
			},
		    showshowlist(type,id,index){
		    	this.type=type,
                this.showshowlists=true;
                this.orderId=id;
                this.whichIndex = index;
		    },
		    //关闭
			closeshowlists(){
				this.showshowlists=false;
				this.showlists = false
			},

		    //拒绝当面交易
		    refuseFaceToFaces(){
                orderRefuseFace(this.orderId).then(res=> {
	          		this.showshowlists=false;
	          		this.allList[this.whichIndex].showPayment.showRefusingFase = false;
	          		this.$router.push('/newSellerOrder/waitPay')
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
		    },
			//当面交易
			transactions(){
        		orderTransaction(this.orderId).then(res=> {
          			this.showshowlists=false;
          		    this.allList[this.whichIndex].showPayment.showFace = false;
          		    this.$router.push('/newSellerOrder/waitGet')
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
			},
			//确认收货
			confirmGets(){
				orderConfirmGoods(this.orderId).then(res=> {
          			this.showshowlists=false;
          			this.allList[this.whichIndex].showPayment.showReap = false;
          			this.$router.push('/evaluate/'+this.orderId)
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
			},
			//延迟付款
			payLaters(){
        		orderPaylater(this.orderId).then(res=> {
          			console.log(res.data);
          			this.showshowlists=false;
          			this.allList[this.whichIndex].showPayment.showDelay = false;
          		
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
			},
			//拒绝收货
			RefuseReceive(){
				orderRefuseGoods(this.orderId).then(res=> {
          			console.log(res.data);
          			this.showshowlists=false;
          			this.allList[this.whichIndex].showPayment.showRefuseReceiveGood = false;
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
			},
			//延迟收货
			delayedDelivery(){
				orderDelayGoods(this.orderId).then(res=> {
          			this.showshowlists=false;
          			this.allList[this.whichIndex].showPayment.showDelayGoods = false;
          			this.allList[this.whichIndex].abort_shouhuo_time = parseFloat(this.allList[this.whichIndex].abort_shouhuo_time)+86400 * 7;
          			
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
			},
			

			//打电话
			showdel(mobile){
				this.showtel=true
				this.telMobile = mobile
			},
			//关掉电话
			closeshowdel(){
				this.showtel=false
			},
			//查看订单
			lookshowlists(){
				this.showlists=false
			},
			
			alldingDan(orderid){
				this.showlists=true
				this.orderId = orderid
			},
			order: function(type) {
				let _this = this;
				this.page += 1;
				let params
					params = {
						type: type,
						page:this.page,
						pagenum: '10',
						state: 'daifukuan',
					}
				order(params).then(function(res) {
					_this.allList = _this.allList.concat(res.data);
					if(res.data.length == '0'){
						_this.loading = false
						_this.elseloading = true
					}else{
						if(_this.allList.length > '3'){
							_this.loading = true
							_this.elseloading = false
						}else{
							_this.loading = false
							_this.elseloading = false
						}
					}
					if(_this.allList.length == '0'){ // 如果没有订单，则显示0订单占位符
						_this.noOrder = true;
					}else{
						_this.noOrder = false;
					}
				}).catch(function(err) {
					this.$router.push({name:'errorPage'})
					console.log(err);
				})
			},

			Red(index){
				this.allList=[];
				this.nowindex=index;
				this.page = 0;
				let types = this.$route.params.types;
				this.type=this.fivebtn[index].type;
				this.$router.push(this.fivebtn[index].link+types)
				this.order(this.whichType);
			},
		},
		mounted() {
			if(this.$route.path == '/newBuyOrders/waitPay'){
				this.whichType = 'user'
				this.writer = "查看该买家的所有订单"
			}else{
				this.whichType = 'seller'
				this.writer = "查看该店铺的所有订单"
			}
			// this.params = JSON.parse(localStorage.getItem('params'))
			// if(this.$route.params.type != 6){
			// 	this.nowindex=parseInt(this.$route.params.type)+1;
			// 	this.type=this.fivebtn[this.nowindex].type;
			// }else{
			// 	this.type = this.params.type
			// 	this.types = this.params.state
			// 	this.nowindex = 6
			// }
			this.order(this.whichType);
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
  .buyerToolbac {
  	width:40px;
	margin-top:18px;
	height:40px;
  }
  .app-containerAllOrder .buyer-list {
  	padding-bottom:100px;
    li {
      margin-top: 10px;
      background-color: #fff;
      .buyer-tool {
        height: 76px;
        line-height: 76px;
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
          height: 60px;
          line-height: 30px;
          margin-bottom: 10px;
          word-break: break-all;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
         /* overflow: hidden;*/
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
  .menuItemClass{
  	   width: 88%;
  	   height: 74px;
  	   display: flex;
  	   justify-content: space-between;
  }
  .menuItem {
	    font-size: 30px;
	    text-align: center;
	    padding:0 16px;
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
	.nickname{
		font-size:28px;
		margin-left:10px;
	}
	.fontCol{
		color: #333;
	}
</style>

