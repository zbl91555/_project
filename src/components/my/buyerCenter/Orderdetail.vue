<template>
	<div class="orderDetail">
		<div class="backgroundcolor" :class=" index==0 ? (item.title ==='交易失败' ? 'backgroundfail' : 'backgroundcolorall') : ''" v-for="(item,index) in orderDetailList.process" :key="item.time" @click="toanather(item.link)">
			<i style="font-size:30px" class="iconfont iconleft" :class=" index==0 ? (['icon-'+item.status+'-bai','whitecol']): ('icon-'+item.status+'-hei')"></i>
			<div class="left">
				<div :class=" index==0 ? 'whitecolfons' : 'blackcol'">{{item.title}}</div>
				<div :class=" index==0 ? 'whitecol' : 'blackcolgray'">{{item.timeName}}:{{timestampToTime(item.time)}}</div>
				<div v-if=" item.title ==='交易失败' ? (item.failReason == '' ? false : true):false" :class=" item.title ==='交易失败' ? 'whitecol' : ''">失败原因:{{item.failReason}}</div>
			</div>
			<router-link :to="item.link" v-if='item.link != 0 && linkPath'>
				<div class="icon-right iconfont right" ></div>
			</router-link>	<!-- orderDetailList.expressCode!= false  -->
		</div>
		<div class="gray"></div>
		<div>
			<div class="buyer-tool" :style="{backgroundImage:'url(' + orderDetailList.avatar + ')'}">
				<router-link :to="'/storeHome/'+orderDetailList.userId">
					<div class="orderNickname">{{orderDetailList.nickname}}</div>
				</router-link>
				<i><div class="waitepaywords">{{btnStatus.title}}</div></i>
				<i style="position: relative" class="iconfont icon-shouji op">
					<a style="width:20px;height:38px;margin-left:0;position: absolute;right: 8px;padding-right: 0" :href="'tel:'+tel"></a>
				</i>
			<!-- 	<i @click="alldingDan()" class="iconfont icon-wendang op"></i>	 -->
			</div>
			<router-link :to="{name: 'auction', params: {id: orderDetailList.auctionId }}">
				<div class="buy-info">
					<div class="goods-info" :style="{backgroundImage:'url(' + orderDetailList.auctionImg + ')'}"></div>
					<p class="goods-intr">{{orderDetailList.auctionDesc}}</p>
					<ul class="buyer-detail" v-if="orderDetailList.btnStatus.nameVal === '1'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li>成交时间：{{timestampToTimeYMDHM(parseFloat(orderDetailList.add_time))}}</li>
						<li><div style="float:left">付款截止：</div>
							<countDown style="width:80px;float:left" :endtime='parseFloat(orderDetailList.abort_payment_time)' :dayShow='false' :secShow='true'></countDown></li>
					</ul>
					<!-- 待发货 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '2'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li>付款时间：{{timestampToTimeYMDHM(parseFloat(orderDetailList.payment_time))}}</li>
					</ul>
					<!-- 待发货 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '21'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li><div style="float:left">发货截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(orderDetailList.abort_fahuo_time)' :dayShow='true' :secShow='false'></countDown></li>
					</ul>
					
					<!-- 已发货,等待确认 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '3'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li><div style="float:left">确认截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(orderDetailList.abort_shouhuo_time)' :dayShow='true' :secShow='false'></countDown></li>
					</ul>
					<!-- 待评价 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '41'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li>成交时间：{{timestampToTimeYMDHM(parseFloat(orderDetailList.add_time))}}</li>
						<li><div style="float:left">评价截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(orderDetailList.abort_comment_time)' :dayShow='true' :secShow='false'></countDown></li>
					</ul>
					<!-- 交易完成 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '4'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li>成交时间：{{timestampToTimeYMDHM(parseFloat(orderDetailList.add_time))}}</li>
						<li>完成时间：{{timestampToTimeYMDHM(parseFloat(orderDetailList.shouhuo_time))}}</li>
					</ul>
					<!-- 交易失败 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '10'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li>失败时间：{{timestampToTimeYMDHM(parseFloat(orderDetailList.finish_time))}}</li>
					</ul>
					<!-- 买家申请退款 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '5'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li>申请时间：{{timestampToTimeYMDHM(parseFloat(orderDetailList.tuikuan_time))}}</li>
						<li><div style="float:left">确认截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(orderDetailList.abort_tuikuan_time)' :dayShow='true' :secShow='false'></countDown></li>
						<!-- <li>确认截止：{{timestampToTimeYMDHM(parseFloat(orderDetailList.abort_tuikuan_time))}}</li> -->
					</ul>
					<!-- 买家申请退货 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '6'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li>申请时间：{{timestampToTimeYMDHM(parseFloat(orderDetailList.tuihuo_time))}}</li>
						<li><div style="float:left">确认截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(orderDetailList.abort_tuihuo_time)' :dayShow='true' :secShow='false'></countDown></li>
					</ul>
					<!-- 买家已发货 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '7'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li>发货时间：{{timestampToTimeYMDHM(parseFloat(orderDetailList.add_time))}}</li>
					</ul>
					<!-- 同意退货 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '8'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li>同意时间：{{timestampToTimeYMDHM(parseFloat(orderDetailList.accept_time))}}</li>
					</ul>
					<!-- 申请当面交易卖家 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '9'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li>申请时间：{{timestampToTimeYMDHM(parseFloat(orderDetailList.face_apply_time))}}</li>
					</ul>
					<!-- 申请当面交易买家 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '91'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li><div style="float:left">确认截止：</div><countDown style="width:80px;float:left" :endtime='parseFloat(orderDetailList.face_confirm_time)' :dayShow='false' :secShow='true'></countDown></li>
					</ul>
					<!-- 小二介入 -->
					<ul class="buyer-detail" v-else-if="orderDetailList.btnStatus.nameVal === '11'">
						<li>成交金额：￥{{orderDetailList.price}}元</li>
						<li>小二介入：{{timestampToTime(parseFloat(orderDetailList.platform_time))}}</li>
						<!-- <li><div style="float:left">小二介入：</div><countDown style="width:80px;float:left" :endtime='parseFloat(orderDetailList.platform_time)' :dayShow='false' :secShow='true'></countDown></li> -->
					</ul>
				</div>	
			</router-link>
			<div class="need-pay">
				<div>
					应付：￥{{orderDetailList.price}}
				</div>
			</div>
			<div class="buyer-btn">
				<router-link :to="{path:'/payment', query: { order_id:orderDetailList.order_id}}">
					<button class="isImpotant" v-if="orderDetailList.btnStatus.showPayment" >立即付款</button>
				</router-link>
				<button @click="showshowlist('payLaterType',orderDetailList.order_id)" class="unImpotant fontCol"  v-if="orderDetailList.btnStatus.showDelay">延迟付款</button>
				<button @click="showshowlist('FaceType',orderDetailList.order_id)" class="unImpotant fontCol"  v-if="orderDetailList.btnStatus.showFace">当面交易</button>
				
				<router-link :to="{path: '/returnRequest/'+orderDetailList.order_id+'/2'}">
					<button class="unImpotant" v-if="orderDetailList.btnStatus.showApplyMoney">申请退款</button>
				</router-link>

				<router-link :to="'/confirmSend/'+orderDetailList.order_id">
					<button class="isImpotant" v-if="orderDetailList.btnStatus.showDelivery">立即发货</button>
				</router-link>

				<router-link :to="{path: '/returnRequest/'+orderDetailList.order_id+'/4'}">
					<button class="unImpotant" v-if="orderDetailList.btnStatus.showRefuseMoney">拒绝退款</button>
				</router-link>	

				<router-link :to="'/agreeReturnMoney/'+orderDetailList.order_id">
					<button class="unImpotant" v-if="orderDetailList.btnStatus.showAgreeMoney">同意退款</button>
				</router-link>
				<button @click="showshowlist('confirmGetType',orderDetailList.order_id)" class="isImpotant"  v-if="orderDetailList.btnStatus.showReap">确认收货</button>
					<router-link :to="{path: '/checkLogistics/'+orderDetailList.order_id+'/'+orderDetailList.is_tuihuo}">
				<button class="unImpotant" v-if="orderDetailList.btnStatus.showLogisticsUser">查看物流</button> <!-- 买家 -->
				</router-link>

				<!-- 卖家 -->
				<router-link :to="{path: '/checkLogistics/'+orderDetailList.order_id+'/'+orderDetailList.is_tuihuo}">
				<button class="unImpotant" v-if="orderDetailList.btnStatus.showLogisticsSellerr">查看物流</button>
				</router-link>
				
				<router-link :to="{path: '/confirmBack/'+orderDetailList.order_id}">
				<button class="isImpotant" v-if="orderDetailList.btnStatus.showReturnGood">立即退货</button>
				</router-link>
				<router-link :to="'/agreeReturnSale/'+orderDetailList.order_id">
					<button class="unImpotant" v-if="orderDetailList.btnStatus.showAgreeReturnGood">同意退货</button>
				</router-link>

				<router-link :to="{path: '/returnRequest/'+orderDetailList.order_id+'/3'}">
					<button class="unImpotant" v-if="orderDetailList.btnStatus.showRefuseReturnGood">拒绝退货</button>
				</router-link>

				<router-link :to="'/agreeReturnConfirmReceipt/'+orderDetailList.order_id">
					<button class="unImpotant" v-if="orderDetailList.btnStatus.showReturnGoodAndMoney">收货并退款</button>
				</router-link>
				
				<router-link :to="{path: '/returnRequest/'+orderDetailList.order_id+'/1'}">
					<button class="unImpotant" v-if="orderDetailList.btnStatus.showApplyGoods">申请退货</button>
				</router-link>
				<button @click="showshowlist('delayedDelivery',orderDetailList.order_id)" class="unImpotant" v-if="orderDetailList.btnStatus.showDelayGoods">延长收货</button>
				<button @click="showshowlist('refuseFaceType',orderDetailList.order_id)" class="unImpotant"  v-if="orderDetailList.btnStatus.showRefusingFase">拒绝当面交易</button >
				<button @click="showshowlist('RefuseReceiveType',orderDetailList.order_id)" class="unImpotant"  v-if="orderDetailList.btnStatus.showRefuseReceiveGood">拒绝收货</button>
				<router-link :to="{path: '/evaluate/'+orderDetailList.order_id}">
					<button :class="isImpotant" v-if="orderDetailList.btnStatus.showEvaluate">立即评价</button>   
				</router-link>
			</div>
		</div>
		<div class="gray"></div>
		<div>
			<div class="ordermessage">订单信息</div>
			<div class="ordermessageone">
				<div class="ordermessagetel">
					<i>{{orderDetailList.mobile}}</i>
					<i class="wordacol" v-if="orderDetailList.type == '0'">卖家电话:&nbsp;&nbsp;</i>
					<i class="wordacol" v-else>买家电话:&nbsp;&nbsp;</i> </div>
					<router-link :to="{name:'letter',params:{user_id:orderDetailList.userId,user_name:orderDetailList.nickname}}">
						<i class="icon-xiaoxi3 iconfont ordermessagenmb"></i>
					</router-link>
					<i class="iconfont icon-shouji ordermessagenmb" style="position: relative;">
						<a style="width:20px;height:38px;margin-left:0;position: absolute;right: 8px;padding-right: 0" :href="'tel:'+tel"></a>
					</i>
			</div>
			<div class="ordermessageone">
				<div class="ordermessagetel"><i>{{orderDetailList.auction_sn}}</i><i class="wordacol">拍品编号:&nbsp;&nbsp;</i></div>
				<i id="auctionSn" data-clipboard-action="copy" :data-clipboard-text="text" class="iconfont icon-wendang ordermessagenmb" @click="auctionSn"></i>
			</div>
			<div class="ordermessageone">
				<div class="ordermessagetel"><i>{{orderDetailList.order_sn}}</i><i class="wordacol">货款交易编号:&nbsp;&nbsp;</i></div>
			</div>
			<div class="smaTwoIn" v-show="platformCancels||platformShow">	  
				<div @click="platformCancel" class="icon-btn" v-show="platformCancels">
					<i class="wordacol">撤销介入</i>
					<i class="icon-kefu1 iconfont"></i>
				</div>
					<div v-show="platformShow" @click="applyKojiin"> 
						<i class="wordacol">小二介入</i>
						<i class="icon-kefu1 iconfont"></i>
					</div>
			</div> 
		</div>
		<div class="gray"></div>
		<div v-if="orderDetailList.orderAddress">
			<div class="sendMessage">
				<div>发货信息</div>
				<div class="wuliu" v-if="orderDetailList.express != null">
					<router-link :to="{path: '/checkLogistics/'+orderDetailList.order_id+'/false'}">
						<i class="icon-right iconfont"></i>
						<i>物流信息</i>
					</router-link>
				</div>
			</div>
			<div class="getMan">
				<div class="getManName">
					<span>收货人:</span>
					<span>{{orderDetailList.orderAddress.name}}</span>
					<span>{{orderDetailList.orderAddress.tele}}</span>
				</div>
				<div class="getManAdress">
					<span>收货地址:</span>
					<span>{{orderDetailList.orderAddress.province}} {{orderDetailList.orderAddress.city}} {{orderDetailList.orderAddress.country}}
					{{orderDetailList.orderAddress.address}}</span>
				</div>
			</div>
			<div class="sendMethod" v-if="orderDetailList.express != null">
				<div class="wuliu">发货方式:</div>
				<div>{{orderDetailList.expressCode}}（单号：{{orderDetailList.express}}）</div>
			</div>
			<div class="sendMethod" v-if="orderDetailList.isExpress == '2'">
				<div class="wuliu">发货方式:</div>
				<div>送货上门</div>
			</div>
			<div class="gray"></div>
		</div>

		<div v-if="orderDetailList.currentexchange == '1'">
			<div class="sendMessage">
				<div>发货信息</div>
			</div>
			<div class="sendMethod">
				<div class="wuliu">发货方式:</div>
				<div>当面交易</div>
			</div>
			<div class="gray"></div>
		</div>

		<div class="gray"></div>
		<div v-if="orderDetailList.afterSaleList != ''">
			<div class="sendMessage">
				<div>售后信息</div>
			</div>
			<div class="afterSale" v-for="(afterSaleList,index) in orderDetailList.afterSaleList" :key="index">
				<div class="wuliu" v-if="afterSaleList.type == '0'">买家-{{afterSaleList.reason}}</div>
				<div class="wuliu" v-else>卖家-{{afterSaleList.reason}}</div>
				<div class="wuliu">{{timestampToTime(afterSaleList.addTime)}}</div>
			</div>
			<div style="overflow: hidden;padding-right:20px">
				<div v-if="seeMoreSale" @click="moreAfterSale" class="iconfont icon-jiantouxiangxia"></div>
				<div v-if="seeMoreSaleshang" @click="initAfterSale" class="iconfont icon-jiantouxiangshang"></div>
			</div>
			<div class="gray"></div>
		</div>
		<div v-if="orderDetailList.refundOrderAddress != null">
			<div class="sendMessage">
				<div>退货信息</div>
				<router-link v-if="orderDetailList.refundExpressCode !='' && orderDetailList.refundExpressCode !=null" :to="{path: '/checkLogistics/'+orderDetailList.order_id+'/true'}">
						<i class="icon-right iconfont"></i>
						<i>物流信息</i>
				</router-link>
			</div>
			<div class="getMan">
				<div class="getManName">
					<span>收货人:</span>
					<span>{{orderDetailList.refundOrderAddress.name}}</span>
					<span>{{orderDetailList.refundOrderAddress.tele}}</span>
				</div>
				<div class="getManAdress">
					<span>收货地址:</span>
					<span>{{orderDetailList.refundOrderAddress.province}} {{orderDetailList.refundOrderAddress.city}} {{orderDetailList.refundOrderAddress.country}}
					{{orderDetailList.refundOrderAddress.address}}</span>
				</div>
			</div>

			<div class="sendMethod" v-if="orderDetailList.refundExpressCode">
				<div class="wuliu">退货方式:</div>
				<div>{{orderDetailList.refundExpress}}（单号：{{orderDetailList.refundExpressCode}}）</div>
			</div>
			<div class="gray"></div>
		</div>
		<!-- <div class="lovepic">
			<div class="icon-xin3 iconfont"></div>
			<span>你可能还喜欢</span>
		</div>
		<div class="allmaylike">
			<div class="maylike">
				<div class="picstyle"></div>
				<div style="padding:0 14px;">title</div>
				<div class="price">
					<div class="floatl">￥100起</div>
					<div class="floatr"><i>223</i><i class="icon-huo iconfont"></i></div>
				</div>
			</div>
			<div class="maylike">
				<div class="picstyle"></div>
				<div style="padding:0 14px;">title</div>
				<div class="price">
					<div class="floatl">￥100起</div>
					<div class="floatr"><i>223</i><i class="icon-huo iconfont"></i></div>
				</div>
			</div>
			<div class="maylike">
				<div class="picstyle"></div>
				<div style="padding:0 14px;">title</div>
				<div class="price">
					<div class="floatl">￥100起</div>
					<div class="floatr"><i>223</i><i class="icon-huo iconfont"></i></div>
				</div>
			</div>
		</div> -->
		<!-- 是否弹出该店铺所有订单 -->
		<div id="fixednumMain" v-if="showlists">
			<div @click="closeshowlists()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="sharesomething">
				<router-link :to="'/buyeralllists/'+order_id">	
					<div @click="lookshowlists()">查看该店铺的所有订单</div>
				</router-link>
					<div @click="closeshowlists()" class="bordertop">取消</div>					
			</div>
		</div>
		<!-- 是否弹出继续发货 -->
		<div id="fixednumMain"  v-if="deliverGoods">
			<div @click="closedeliverGoods()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="continusharesomething">
				<router-link :to="'/buyerOrder/'+1+'/seller'">	
					<div class="deliverGoods" >继续发货</div>
				</router-link> 
					<div @click="closedeliverGoods()" class="bordertop">取消</div>					
			</div>
		</div>
		<!-- 是否撤销小二介入  -->
		<div id="fixednumMain" v-if="applySmall">
			<div @click="closedeliverGoods()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="sharesomething">
					<div class="deliverGoods">是否要撤销小二介入？</div>
					<div class="bordertop" @click="platformCancelSmall">确认</div>
					<div @click="closedeliverGoods()" class="bordertop">取消</div>				
			</div>
		</div>
		<!-- 是否弹出打电话 -->
		<div id="fixednumMain" v-if="showtel">
			<div @click="closeshowdel()" class="fixednumMask" style="opacity: 0.38;">	
			</div>
			<div class="telsharesomething">
				<div>
					<span>电话号码:</span>
					<span>{{tel}}</span>
				</div>
				<div>
					<a :href="'tel:'+tel">确认拨打?</a>
				</div>			
			</div>
		</div>
		<!-- 弹出弹框 -->
		<div id="fixednumMain" v-if="showshowlists">
			<div @click="closeshowlists()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="continusharesomething">

				<div v-if="type=='FaceType'" style="color:red" @click="transactions()">确认当面交易</div>
				<div v-if="type=='refuseFaceType'" style="color:red" @click="refuseFaceToFaces()">确认拒绝当面交易</div>
				<div v-if="type=='payLaterType'" style="color:red" @click="payLaters()">确认延期付款</div>
				<div v-if="type=='confirmGetType'" style="color:red" @click="confirmGets()">确认收货</div>
				<div v-if="type=='RefuseReceiveType'" style="color:red" @click="RefuseReceive()">拒绝收货</div>
				<div v-if="type=='delayedDelivery'" @click="delayedDelivery()"><span style="color:red">延迟收货</span><span style="color:#aba9a5">（收货将会延长7天）</span></div>
				<div  @click="closeshowlists()" class="bordertop">取消</div>					
			</div>
		</div>
		<!-- 是否弹出小二介入弹框 -->
		<!-- <div id="fixednumMain" v-if="applySmallIn">
			<div @click="closeshowdel()" class="fixednumMask" style="opacity: 0.38;">	
			</div>
			<div class="telsharesomething">
				<div style="margin-top:25px">
					<span>已申请小二介入</span>
				</div>		
			</div>
		</div> -->
	</div>
</template>
<script>
	import { Toast } from 'vant';
	import countDown from '../../common/countDown'
    import {orderShow,platformCancel,orderRefuseFace,orderTransaction,orderConfirmGoods,orderPaylater,orderRefuseGoods,orderDelayGoods,platformView} from '../../../api/api';
    import ClipboardJS from 'clipboard'
	export default {
		components: {
			countDown
		},
		data() {
			return {
				orderDetailList:{btnStatus : {}},
				showlists:false,
				showtel:false,
				applySmall:false,
				order_id:'',
				deliverGoods:false,
				tel:'',
				btnStatus:{},
				seeMoreSale:true,
				seeMoreSaleshang:false,
				linkPath: true,
				showshowlists:false, //按钮往下
				type:'',
				orderId:'',
				text:''  //拍品编号
			}
		},
		computed:{
			platformShow(){
				let show = this.btnStatus.showWaiterUser||this.orderDetailList.btnStatus.showWaiterSeller;
				return show;
			},
			platformCancels(){
				let show = this.btnStatus.showCancelWaiterUser||this.orderDetailList.btnStatus.showCancelWaiterSeller;
				return show;
			},
		},
		
		methods: {
			auctionSn(){
				let clipboard =  new ClipboardJS('#auctionSn');
				clipboard.on('success', (e) =>{
					Toast('复制拍品编号成功')
				});
				clipboard.on('error', (e) =>{
					Toast('复制失败 请手动复制');
				});
			},
			//小二介入申请
			applyKojiin(){
				platformView(this.order_id).then(
                    res => {
                      if(res.code == '200'){
                       this.$router.push({path:'/buyerCenter/buyerOrder/Kojiin',query:{order_id:this.order_id}})
                      }
                    }
                    ).catch(err=>{
                    	if(err.data.code == '400'){
                      		Toast(err.data.message)
                        } 
                    })
			},
			//拒绝当面交易
		    refuseFaceToFaces(){
                orderRefuseFace(this.orderId).then(res=> {
	          		this.showshowlists=false;
	          		this.orderDetailList.btnStatus.showRefusingFase = false;
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
		    },
			//当面交易
			transactions(){
        		orderTransaction(this.orderId).then(res=> {
          			this.showshowlists=false;
          		    this.orderDetailList.btnStatus.showFace = false;
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
			},
			//确认收货
			confirmGets(){
				orderConfirmGoods(this.orderId).then(res=> {
          			this.showshowlists=false;
          			this.orderDetailList.btnStatus.showReap = false;
          			this.$router.push('/evaluate/'+this.orderId)
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
			},
			//延迟付款
			payLaters(){
        		orderPaylater(this.orderId).then(res=> {
          			this.showshowlists=false;
          			this.orderDetailList.btnStatus.showDelay = false;
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
			},
			//拒绝收货
			RefuseReceive(){
				orderRefuseGoods(this.orderId).then(res=> {
          			this.showshowlists=false;
          			this.orderDetailList.btnStatus.showRefuseReceiveGood = false;
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
			},
			//延迟收货
			delayedDelivery(){
				orderDelayGoods(this.orderId).then(res=> {
          			this.showshowlists=false;
          			this.orderDetailList.btnStatus.showDelayGoods = false;
          			this.orderDetailList.abort_shouhuo_time = parseFloat(this.orderDetailList.abort_shouhuo_time)+86400 * 7;
        		}).catch(err=> {
          			console.log(err.response.data.message);
        		})
			},
			//关闭弹框
			closeshowlists(){
				this.showshowlists=false;
				this.showlists = false
			},
			//打开弹框
			showshowlist(type,id){
		    	this.type=type,
					this.showshowlists=true;
					this.orderId=id;
		    },
			toanather(link){
				if(link!=0 && this.orderDetailList.isExpress != '2'){
					this.$router.push(link)
				}else{
					return
				}
			},
			//看更多售后信息
			moreAfterSale(){
				this.seeMoreSale = false
				this.seeMoreSaleshang = true
				this.orderShow()
			},
			initAfterSale(){
				this.seeMoreSale = true
				this.seeMoreSaleshang = false
				this.orderShow()
			},
			closedeliverGoods(){
				this.deliverGoods = false
				this.applySmall = false	
			},
			//打电话
			showdel(){
				this.showtel=true
			},
			//关掉电话
			closeshowdel(){
				this.showtel = false
				this.applySmallIn = false
			},
			//打卖家电话
			callSellPhone(){
				this.showtel=true
			},
			//查看订单
			lookshowlists(){
				this.showlists=false
			},
			alldingDan(){
				this.showlists=true
			},
			orderShow(){
				this.order_id = this.$route.params.order_id
				orderShow(this.order_id).then(res =>{
					this.orderDetailList = res.data;
					this.text = res.data.auction_sn;
					this.btnStatus = res.data.btnStatus;
					this.tel = res.data.mobile;
					if(this.orderDetailList.afterSaleList.length<=2){
						this.seeMoreSale = false
						this.seeMoreSaleshang = false
					}else{
						if(this.seeMoreSale == true){
						this.seeMoreSaleshang = false
						this.orderDetailList.afterSaleList = this.orderDetailList.afterSaleList.slice(0,2)
						}
					}
					let linkPath = res.data.process.find(function(v){
						return v.link
					})
					if(linkPath.link.substring(0,15) == '/checkLogistics'){
						if(res.data.expressCode == false){
							this.linkPath = false
						}else{
							this.linkPath = true
						}
					}
					
				}).catch(err =>{
					 console.log(err)
				})
			},
			platformCancel(){
				this.applySmall = true
				// let _this = this;
				// _this.order_id = this.$route.params.order_id
    //             platformCancel(_this.order_id).then(res=> {
    //               console.log(res.data);
    //             }).catch(err=> {
    //               console.log(err.response.data.message);
    //             })
            },
            platformCancelSmall(){
            	this.order_id = this.$route.params.order_id
                platformCancel(this.order_id).then(res=> {
                  this.applySmall = false;
                  this.orderShow()
                }).catch(err=> {
                  console.log(err.response.data.message);
                })
            }
		},
		mounted() {
			let clipboard =  new ClipboardJS('#auctionSn');
			clipboard.on('success', (e) =>{
				Toast('复制拍品编号成功')
			});
			clipboard.on('error', (e) =>{
				Toast('复制失败 请手动复制');
			});
			if(sessionStorage.getItem('deliverGoods') == 'true'){
				if(sessionStorage.getItem('orderLength') == '1'){
					this.deliverGoods = false
				}else{
					this.deliverGoods = true;
					sessionStorage.setItem("deliverGoods", "false");
				}
			}else{
				this.deliverGoods = false
			}
			this.orderShow()
		}
	}
</script>

<style lang='less' scoped>
.buyer-btn {
        min-height: 90px;
        overflow: hidden;
        padding: 20px 30px;
        box-sizing: border-box;
        button {
          float: right;
          outline: none;
          padding: 0 5px;
          box-sizing: border-box;
          height: 50px;
          line-height: 50px;
          margin-left: 10px;
          background-color: transparent;
          border-radius: 5px;
          font-size: 28px;
          text-align: center;
        }
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
    .icon-jiantouxiangxia,.icon-jiantouxiangshang{
    	float: right;
    }
	@border-color: #e5e5e5;
	.orderDetail{
		padding-bottom: 200px;
	}
	.backgroundcolorall{
		background:#424b51;
	}
	.backgroundfail{
		background:#424b51;
		height: 138px !important;
	}
	.whitecol{
		color: white;
	}
	.whitecolfons{
		color: white;
		font-size: 32px
	}
	.blackcol{
		color: black;
		font-size: 32px
	}
	.blackcolgray{
		color: #999;
	}
	.backgroundcolor{
		height: 108px;
		overflow: hidden;
		line-height: 108px;
		padding-left: 32px;
		padding-right:30px;
		padding-top: 14px;
		padding-bottom: 14px;
		border-bottom: 1px solid #e5e5e5;
	}
	.jingpai{
		color: #6e6e6e;
		height: 108px;
		overflow: hidden;
		line-height: 108px;
		padding-left: 32px;
		padding-right:30px;
		padding-top: 12px;
		padding-bottom: 14px
	}
	.jingpai .left{
		float: left;
	}
	.jingpai .left .start{
		line-height: 50px;
		margin-left: 24px;
		color: #333333
	}
	.jingpai .left .starttime{
		line-height: 50px;
		margin-left: 24px;
		color: #999999
	}
	.backgroundcolor .gou,.jingpai .gou{
		line-height: 100px;
		float: left;
	}
	.backgroundcolor .left{
		float: left;
		line-height: 50px;
		margin-left: 24px;
	}
	.backgroundcolor .left div:nth-child(2){
		font-size: 24px;
	}
	.backgroundcolor .right{
		float: right;
		line-height: 100px;
	}
	.icon-chuizi1{
		color: #666666;
		font-size: 60px;
	}
	.gray{
		background: #ededef;
		height: 20px
	}
	.buyer-tool {
				height: 76px;
				line-height: 76px;
				background-position: 30px center;
				background-repeat: no-repeat;
				background-size: 38px;
				position: relative;
	}
	.buyer-tool	a {
					margin-left: 80px;
					display: inline-block;
					line-height: 76px;
					float: left;
					position: relative;
					padding-right: 40px;	
	}
	.buyer-tool	a i {
					margin: 0;
					font-size: 21px;
	}
	.buyer-tool	button,i {
					float: right;
	}
	.buyer-tool	i {
					font-size: 32px;
					margin: 0;
	}
	.buyer-tool	.op {
					padding: 0 20px;
	}
	.buyer-tool	button {
					outline: none;
					border: none;
					background-color: #fff;
					color: #f15511;
					
	}
	.waitepaywords{
		height: 30px;
		padding-left: 18px;
		color: #f15511;
		font-size: 24px;
		margin-top: 24px;
		line-height: 30px;
		border-left: 1px solid #e5e5e5;
		padding-right: 34px
	}
	.buy-info {
				height: 220px;
				background-color: #f7f7f7;
				padding: 27px 30px;
				box-sizing: border-box;
				position: relative;
	}
	.buy-info .goods-info {
					height: 166px;
					width: 166px;
					float: left;
					background-repeat: no-repeat;
					background-position: center;
					background-size: cover;
					margin-right: 20px;
	}
	.buy-info .goods-intr {
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
	.buy-info .buyer-detail {
		float: right;
		width: 70%;
		position: absolute;
        bottom:27px;
        left:213px;
	}
	.buy-info .buyer-detail li {
		height: 25px;
		line-height: 25px;
		background-color: transparent;
		padding: 0;
		color: #999;
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
	.need-pay div{
		float:right;
		padding-right:46px;
	}
	.buyer-btn {
				height: 90px;
				padding-right:30px;
	}
	.buyer-btn button {
		float: right;
		outline: none;
		border: none;
	/*	width: 160px;*/
		height: 50px;
		line-height: 50px;
		background-color: transparent;
		border: 2px solid #9e2026;
		color: #9e2026;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 0px 18px;
	}
	.ordermessage{
		height: 80px;
		border-bottom: 1px solid #e5e5e5;
		margin-left: 30px;
		line-height: 80px
	}
	.ordermessagetel{
		float: left;
		height: 60px;
		line-height: 60px;
	}
	.ordermessagetel{
		font-size: 28px;
	}
	.ordermessagenmb{
		float: right;
		height: 50px;
		line-height: 60px;
		padding-right: 20px;
	}
	.ordermessageone{
		overflow: hidden;
		margin-left: 30px;
	}
	.wordacol{
		color: #999
	}
	.ordermessagenmb i{
		padding-right:20px;
	}
	.lovepic{
		height: 114px;
		text-align: center;
	}
	.lovepic span{
		margin: auto;
		line-height:114px; 
	}
	.icon-xin3{
		color:#fe8483;
	}
	.picstyle{
		width: 370px;
		height: 428px;
		background: url('../../../assets/images/newuser.png');
		background-repeat: no-repeat;
	    background-position: center;
	    background-size: cover;
	}
	.allmaylike{
		overflow: hidden;
	}
	.maylike{
		width: 49%;
		float: left;
		margin-top: 10px;
	}
	.maylike:nth-child(even){
		margin-left: 2%
	}
	.maylike .price{
		overflow: hidden;
		padding:0 20px;
	}
	.maylike .price .floatl{
		float: left;
		color: #962125;
		font-size: 24px;
	}
	.maylike .price .floatr{
		float: right;
		line-height: 35px;
	}
	.maylike .price .floatr i{
		line-height: 35px;
		color: #999999;
	}
	.iconleft{
		float:left;
		width: 50px;
	}
	.iconfont{
		margin: 0;
		font-size:36px;
	}
	.sendMessage,.sendMethod,.afterSale{
		overflow: hidden;
		height: 90px;
		border-bottom: 1px solid #e5e5e5;
		margin-left: 30px;
		line-height: 90px
	}
	.getMan{
		margin-left: 30px;
		padding-top: 20px;
		padding-right:30px;
		font-size: 24px;
		overflow:hidden;
	}
	.getMan .getManName,.getMan .getManAdress{
		width: 100%
	}
	.getMan .getManAdress{
		margin-top:10px;
	}
	.getMan .getManAdress span:nth-child(1){
		float: left;
		color:#999;
	}
	.getMan .getManAdress span:nth-child(2){
		display: block;
		width: 430px;
		float: left;
		margin-left:10px;
	}
	.getMan .getManName span:nth-child(1){
		color:#999;
	}
	.getMan .getManName span:nth-child(2){
		margin-left:30px;
	}
	.getMan .getManName span:nth-child(3){
		float: right;
	}
	.sendMessage div:nth-child(1),.getMan div:nth-child(1),.getMan div:nth-child(2),.sendMethod div,.afterSale div:nth-child(1){
		float: left;
	}

	/*.getMan div:nth-child(1){
		width: 80px;
		margin-top: 20px
	}
	.getMan div:nth-child(2){
		width: 460px;
		height:130px;
		margin-top: 20px
	}
	.getMan div:nth-child(3){
		margin-top: 20px
	}
	.getMan div:nth-child(2) p{
        display: block;
        padding-bottom: 8px;
        margin-left: 10px;
	}*/
	.sendMessage div:nth-child(2),.afterSale div:nth-child(2){
		float: right;
		padding-right: 20px;
	}
	.icon-right{
		font-size: 16px;
		margin-left: 20px;
	}
	
	.sendMethod div:nth-child(2){
		margin-left: 10px
	}
	.sharesomething{
    position: fixed;
    left:0;
    bottom: 0;
    z-index: 1100;
    width: 100%;
    height:300px;
    background: white;
    text-align: center;
  }
  .sharesomething div{
    height: 90px;
    line-height: 90px;
    font-size: 30px
  }
  .continusharesomething{
  	position: fixed;
    left:0;
    bottom: 0;
    z-index: 1100;
    width: 100%;
    height:200px;
    background: white;
    text-align: center;
  }
  .continusharesomething div{
    height: 90px;
    line-height: 90px;
    font-size: 30px
  }
  .bordertop{
    border-top: 2px solid #e5e5e5
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
	.getManAddress{
		margin-top: 10px;
		word-break:break-word;
	}
	.icon-right,.wuliu{
		color: #999999
	}
	.icon-huo{
		color: #999999;
	}
	.smaTwoIn{
		height: 80px;
		border-bottom: 1px solid #e5e5e5;
		margin-left: 30px;
		line-height: 80px;
		overflow: hidden;

	}
	.smaTwoIn div{
		float:right;
		margin-right:20px;
		border:2px solid black;
		border-radius: 5px;
		height: 30px;
		line-height: 30px;
		padding: 8px 10px;
		font-size: 24px
	}
	.icon-kefu1{
		color: black;
		padding-right: 8px;
	}
	.deliverGoods{
		color: red;
	}
</style>