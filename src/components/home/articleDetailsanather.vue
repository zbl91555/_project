<template>
	<div class="articleDetails">
		<div class="header">
    	 	<router-link :to="{path: '/storeHome', query: { user_id: userMsg.sellerId }}">
			<div class="avatar">
				<div class="headimg"  v-bind:style="{backgroundImage: 'url(' + userMsg.headimgurl + ')'}">
				</div>
			</div>
			</router-link>
			<div class="shopInfo">
					<div class="name">
						<div class="sellerLevel"  v-bind:class="userMsg.sellerLevel"></div>
						<router-link :to="{path: '/userMessage'}">
							<div class="verified">{{userMsg.sellerName}}</div>
						</router-link>
					</div>
					<div class="userattr">
						<div class="item">
							<span>
								<i class="iconfont  icon-xingxing2"></i>
							</span>
							<span class="txt">{{userMsg.points}}分</span>
						</div>
						<!-- 实名认证判断 -->
						<div class="item" >
							<div class="setup" v-if="userMsg.isCompany == true">
								<span>
									<i class="iconfont icon-renzhengyonghu"></i>
								</span>
								<span class="txt">已认证</span>
							</div>
							<div v-else class="nosetup">
								<span>
									<i class="iconfont icon-renzhengyonghu"></i>
								</span>
								<span class="txt">未认证</span>
							</div>
						</div>
						<!-- 消保金判断 -->
						<div class="item">
							<div class="nosetup" v-if="userMsg.topicCash == 0">
								<span>
									<i class="iconfont icon-anquanbaozhang"></i>
								</span>
								<span class="txt">未缴纳</span>
							</div>
							<div v-else class="setup">
								<span>
									<i class="iconfont icon-anquanbaozhang"></i>
								</span>
								<span class="txt">￥{{userMsg.topicCash}}元</span>
							</div>
						</div>
					</div>
					<div class="operation">
						<div class="attention">
					        <span v-show="sale.isAttention==true ? false : true" @click="attention()">关注</span>
					        <span v-show="sale.isAttention==true ? true : false" @click="cancelattention()">取消关注</span>
					    </div>
					    <div class="private">
					        <span>私信</span>
					    </div>
					</div>
			</div>
	    </div>
	    <div class="signature">
	    	<i>{{userMsg.sellerdesc}}</i>
	    </div>

	    <div class="saleInfo">
	    	<div class="desc fullDesc">
	    		{{sale.desc}}
	    	</div>
	    	<div class="imgList"  >
	    		<div class="image--219j3 " v-for ="(list,index) in sale.imgList" v-bind:style="{backgroundImage: 'url(' + list.imgUrl + ')'}" :key="index"></div>
	    	</div>
	    	<div class="createTime border horizonBottom">
				<div class="freePost" v-show="sale.freeship == true">
					包邮
				</div>
				<div class="freePost" v-show="sale.isReturn == true">
					包退
				</div>
				<div class="time">
					{{timestampToTime(sale.startTime)}}
				</div>
			</div>
			<div class="toolBox">
				<router-link :to="{path: '/articleDetails/complaint',query: {id:sellerId,idSubmit:idSubmit}}">
					<a class="complainBtn">投诉
						<i class="iconfont icon-jingcha1"></i>
					</a>
				</router-link>
				<div @click="share()" class="shareIt" img="">
					<span>分享</span><i class="iconfont icon-fenxiang"></i>
				</div>
				<div class="likeIt"  @click="giveLike()">
					<div class="setup" v-if="sale.isLiked == true">
						<span>{{sale.likenum}}</span><i class="iconfont icon-xin3"></i>
					</div>
					<div v-else class="nosetup">
						<span>{{sale.likenum}}</span><i class="iconfont icon-xin1"></i>
					</div>
				</div>
				<div class="popularity">
					<span>{{sale.viewnum}}</span><i class="iconfont icon-huo"></i>
				</div>
			</div>
			<div class="likeBox">
				<router-link class="likeAvatar" v-for ="(item,index) in sale.likeList" :key="index" v-bind:style="{backgroundImage: 'url(' + item.headimgurl + ')'}"
	    		:to="{path: '/storeHome/storeIntroduced', query: { user_id: item.userId} }">
	    		</router-link>
			</div>
			<div class="stateInfo">
				<div class="state" v-if="isFirstPrice==1 ? false : true">
					正在拍卖<i></i>
				</div>
				<div class="endTime" v-if="isFirstPrice==1 ? false : true">
					距离结束：<span><span><i>{{toendhour}}</i>时<i>{{toendminite}}</i>分<i>{{toendsecond}}</i><i style="display: none;">9</i></span></span>
				</div>
				<div class="countdownTip" v-show='show'> 
					<i class="iconfont icon-tixing"></i>
					最后5分钟，进入延时竞价周期
				</div>
			</div>
			<div class="bidBtns">
				<div>
					<div class="price" style="display: none;">
						0
					</div>
					<div v-if="isFirstPrice==1 ? false : true
			" class="bidBtn" @click="openkeyBoard()" v-show="haveend">
						出价
					</div>
					<div class="bidBtns"><div><div class="saleEndBtn" v-show="havepaimaiend">{{month}}月{{day}}日 {{endhour}}:{{endminite}}拍卖结束</div></div></div>
				</div>
			</div>
			<div class="moneyInfo">
				<div>
					<i class="iconfont icon-qi"></i>
					<span>￥{{sale.priceList.firstprice}}元</span>
				</div>
				<div>
					<i class="iconfont icon-jia"></i>
					<span>￥{{sale.priceList.addprice}}元</span>
				</div>
				<div>
					<i class="iconfont icon-bao"></i>
					<span>￥{{sale.priceList.cashPrice}}元</span>
				</div>
			</div>
			<div class="bidList">
				<div class="ddli"  v-for ="(logList,index) in sale.logList" :key="index">
					<div class="avatar">
						<div v-bind:style="{backgroundImage: 'url(' + logList.headimgurl + ')'}">
						</div>
					</div>
					<div class="bidUser">
						<div class="name">
							{{logList.nickname}}
						</div>
						<div class="price">
							￥{{logList.auctionPrice}}元
						</div>
					</div>
					<div class="state">
						<div class="bidTime">{{logList.addTime}}</div>	
						<div class="bidState">
							<span v-if="isFirstPrice==0 ? true : false" :class="0==index ? bidLeaderClass : bidOutClass"></span>
							<span :class="successdown" v-if="isFirstPrice==1 ? true : false"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="otherSaleMain" >
				<div class="title border horizonBottom">
					<router-link  class="traceBox" :to="{path: 'storeHome', query: {user_id: sellerId}}">
						<span>店铺拍品</span>
					</router-link>
				</div>
				<div class="saleBox">
					<div class="saleItem" v-for ="(item,index) in shopList">
						<router-link  class="traceBox border verticalRight" :to="{path: 'message', query: {id: item.auctionId}}">
							<div class="image--219j3 saleImg" v-bind:style="{backgroundImage:'url(' + item.imgUrl + ')'}">
							</div>
							<div class="desc">
								{{item.desc}}
							</div>
							<div class="saleInfo">
								<div class="bid"> 
									<span v-if="item.leadingprice == '0' ">￥{{item.firstprice}}起</span>
									<span v-else>￥{{item.leadingprice}}</span>
								</div>
								<div class="statics">
									<i class="iconfont icon-huo"></i><span>{{item.viewnum}}</span>
								</div>
							</div>
						</router-link>
					</div>
				</div>
			</div>
			<div class="goShop border horizonTop">
				<router-link to="/buyerCenter/footprint" class="traceBox border verticalRight" >
					<i class="iconfont icon-zuji"></i>
					我的足迹
				</router-link>
				<router-link  class="traceBox border verticalRight" :to="{path: '/storeHome',query: { user_id: sellerId}}"> 
		    		<i class="iconfont icon-gengduo"></i>
					更多拍品
				</router-link>
			</div>
		</div>
	    <router-link to="/message">
		    <div class="imSupportBanner-modules">
				<div class="imSupportBanner">
					<i class="iconfont icon-tuisongxiaoxi"></i>
					<i class="service">联系平台客服</i>
				</div>
			</div>
		</router-link>
	<!-- 出价键盘 -->
		<div id="fixednumMain" v-if=" bid==true ">
			<div class="fixednumMask" style="opacity: 0.38;"></div>
			<div class="fixednumMain flip-up">
				<div>
					<div class="tipBanner">
						<span class="title">领先价</span>
						<div class="last">
							{{sale.priceList.leadIngPrice}}
						</div>
						<div class="close" @click="closekeyBoard()">
							<i class="iconfont icon-guanbi"></i>
						</div>
					</div>
					<div class="priceBanner"> 
						<span class="title">出价</span>
						<div class="editTxt">
							<span class="hover">{{lastofferPrice}}</span>
						</div>
						<!-- <i>*很遗憾，该拍品已经结束。</i> -->
					</div>

					<div class="btnBanner">
						<div class="fixedPrice" v-if="sale.priceList.yikoujia==0 ? false : true" @click="oneconfirmprice()">一口价￥{{sale.priceList.yikoujia}}</div>
						<div class="confirmBtn" @click="confirmprice()">
							出价
						</div>
					</div>
				</div>
				<div class="numkey">
					<ul>
						<li @click='oneClick()' data-touch="touchEffect" class="num">
						<div class="number">
							1
						</div>
						<div class="letter">
						</div>
						</li>
						<li @click='twoClick()' data-touch="touchEffect" class="num">
						<div class="number">
							2
						</div>
						<div class="letter">
							ABC
						</div>
						</li>
						<li @click='threeClick()' data-touch="touchEffect" class="num">
						<div class="number">
							3
						</div>
						<div class="letter">
							DEF
						</div>
						</li>
						<li @click='fourClick()' data-touch="touchEffect" class="num">
						<div class="number">
							4
						</div>
						<div class="letter">
							GHI
						</div>
						</li>
						<li @click='fiveClick()' data-touch="touchEffect" class="num">
						<div class="number">
							5
						</div>
						<div class="letter">
							JKL
						</div>
						</li>
						<li @click='sixClick()' data-touch="touchEffect" class="num">
						<div class="number">
							6
						</div>
						<div class="letter">
							MNO
						</div>
						</li>
						<li @click='sevenClick()' data-touch="touchEffect" class="num">
						<div class="number">
							7
						</div>
						<div class="letter">
							PQRS
						</div>
						</li>
						<li @click='eightClick()' data-touch="touchEffect" class="num">
						<div class="number">
							8
						</div>
						<div class="letter">
							TUV
						</div>
						</li>
						<li @click='nineClick()' data-touch="touchEffect" class="num">
						<div class="number">
							9
						</div>
						<div class="letter">
							WXYZ
						</div>
						</li>
						<li @click='dblzeroClick()' data-touch="touchEffect" class="num othernum" style="line-height: 50px;margin-bottom:6px">00</li>
						<li @click='zeroClick()' data-touch="touchEffect" class="num" style="line-height: 50px;margin-bottom:6px">0</li>
						<li @click='del()' data-touch="touchEffect" class="delete" style="line-height: 50px;margin-bottom:6px"></li>
					</ul>
				</div>
			</div>
		</div>
	<!--弹出分享-->
		<div id="fixednumMain" v-if="sharetosom==true ">
			<div @click="closeshare()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="sharesomething">
				<div class="sharetofriends">分享给好友</div>
				<div class="threemethods">
					<div class="floleft" @click="erweima()">
						<div class="icon-erweima iconfont"></div>
						<div>二维码</div>
					</div>
					<div class="floleft">
						<div class="icon-lianjie iconfont"></div>
						<div>发送链接</div>
					</div>
					
				</div>
			</div>
		</div>
	<!--弹出二维码页面-->	
		<div id="fixednumMain" v-if="openerweima==true ">
			<div class="fixednumMask" style="background: white;opacity: 1;">
				<div class="erweimahead">
					<div class="headmsg headimg" v-bind:style="{backgroundImage: 'url(' + userMsg.headimgurl + ')'}"></div>
					<div class="headmsg">
						<div>{{userMsg.sellerName}}</div>
						<div>{{userMsg.sellerdesc}}</div>
					</div>
				</div>
				<div class="onlyerweima">
					<div class="onlyerweimaimg">二维码</div>
					<div class="fingner">
						<span class="fingnerimg "></span>
						<span>长按图片分享名片</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {usermsg,shopFocus,getmsg,auctionFocus,oneconfirmprice} from '../../api/api'
	export default{
		data(){
			return{
				userMsg:[],  //用户信息
				shopList:[], //店铺拍品
				sale:[],  //拍品信息
      			article_id:'', //产品id
      			sellerId:'',  //用户id
      			bid:false,   //是否点击出价
      			offerPrice:[],  //出价
      			lastofferPrice:'', //显示在上面的出价
      			toendhour:'00',    
      			toendminite:'00',
      			toendsecond:'00',
      			show:false,
      			month:'',
      			day:'',
      			endhour:'',
      			endminite:'',
      			idSubmit:'',
      			oneprice:'',
      			sharetosom:false,
      			openerweima:false,
      			isFirstPrice:0,
      			bidLeaderClass: 'bidLeader',
  				bidOutClass: 'bidOut',
  				logListlength:0,
  				successdownClass:'successdown',
  				haveend:true,
  				havepaimaiend:false
			}

		},
		methods:{
			//获取用户信息
			usermsg(){
				let _this = this;
				_this.article_id = this.$route.query.id
				usermsg(_this.article_id).then(function(res){
					let data = res.data
      				_this.userMsg = data.shop
      				_this.shopList = data.shopList
      				_this.sale = data.sale
      				_this.sellerId = data.shop.sellerId 
      				_this.oneprice = data.sale.priceList.yikoujia
      				_this.timetoend(data.sale.endTime)
      				_this.getmsg(data.shop.sellerId)
      				_this.logListlength=data.sale.logList.length
				}).catch(function(error){
					console.log(error)
				})
			},
			//打开二维码
			erweima(){
				this.openerweima=true;
				this.sharetosom=false
			},
			//关闭
			closeshare(){
				this.sharetosom=false
			},
			//分享
			share(){
				this.sharetosom=true
			},
			//关注
			attention(){
				let _this = this;
				let params = {
					seller_id:_this.sellerId,
                    type:'focus'
				};
                shopFocus(params).then(function(res){
            		_this.usermsg();
				}).catch(function(error){		
				})
			},
			//取消关注
			cancelattention(){
				let _this = this;
				let params = {
					seller_id:_this.sellerId,
                    type:'cancel' 
				};
				focus(params).then(function(res){
            		_this.usermsg();
					// _this.sale.isLiked = false;
				}).catch(function(error){
					
				})
			},
			getmsg(e){
				let _this = this;
				let params = {
					auction_id:e,
				};
				getmsg(params).then(function(res){
					 _this.idSubmit = res.data.idSubmit
				}).catch(function(error){
					
				})
			},
			//点赞
			giveLike(){
				let _this = this;
				let params = {
					auctionId:_this.article_id   
				};
                auctionFocus(_this.article_id ).then(function(res){
            		_this.usermsg();
					console.log('222')
					// _this.sale.isLiked = false;
				}).catch(function(error){
					
				})
			},
			//一口价
			oneconfirmprice(){
				let _this = this;
				let params = {
					auction_id:this.article_id,
                    auction_price:this.oneprice,
				};
				oneconfirmprice(params).then(function(res){
            		_this.bid = false;
            		_this.isFirstPrice=res.data.isFirstPrice
					_this.usermsg()
				}).catch(function(error){
					console.log(error)
				})
			},
			//出价
			confirmprice(){
				let _this = this;
				let params = {
					auction_id:this.article_id,
                    auction_price:this.lastofferPrice, 
				};
				oneconfirmprice(params).then(function(res){
            		_this.bid = false;
					_this.usermsg()
				}).catch(function(error){
					console.log(error)
				})
			},
			//进行倒计时
			timetoend(endtime){
				let self = this;
				let timer = setInterval(function(){
					let nowTime = new Date();
					let enddTime = new Date(endtime*1000);
					let t = endtime - Math.floor(nowTime.getTime()/1000);
                    let month = enddTime.getMonth()+1;
                    let day = enddTime.getDate();
                    let endhour = enddTime.getHours();
                    let endminite = enddTime.getMinutes();
                    	month = month < 10 ? "0" + month : month;
	                    day = day < 10 ? "0" + day : day;
	                    endhour = endhour < 10 ? "0" + endhour : endhour;
	                    endminite = endminite < 10 ? "0" + endminite : endminite;
                    self.month = month;
                    self.day = day;
                    self.endhour = endhour;
                    self.endminite = endminite;
                    
					if(t>0){
						let hour=Math.floor((t/3600));
	                    let min=Math.floor((t/60)%60);
	                    let sec=Math.floor(t%60);
	                    hour = hour < 10 ? "0" + hour : hour;
	                    min = min < 10 ? "0" + min : min;
	                    sec = sec < 10 ? "0" + sec : sec;
	                    if(hour <= 0){
	                    	self.toendhour = '00';
	                    };
	                    if(min <= 0){
	                    	self.toendminite = '00';
	                    }
	                    if(t<=300){
	                    	self.show=true
	                    }
	                    self.toendhour = hour;
	                    self.toendminite = min;
	                    self.toendsecond = sec;
					}else{
                      clearInterval(timer);
                      	self.toendhour = '00';
	                    self.toendminite = '00';
	                    self.toendsecond = '00';
	                    self.haveend=false;
  						self.havepaimaiend=true;
                    }
				},1000)
			},
			// 点击出价打开键盘
			openkeyBoard(){
				this.bid = true;
				this.lastofferPrice=''
			},
			// 关闭键盘
			closekeyBoard(){
				this.bid = false;
			},
			//删除
			del(){
				this.offerPrice.pop();
				this.lastofferPrice=this.offerPrice.join('')
			},
			// 按数字1
			oneClick(){
				this.offerPrice.push(1);
				this.lastofferPrice=this.offerPrice.join('')
			},
			// 按数字2
			twoClick(){
				this.offerPrice.push(2);
				this.lastofferPrice=this.offerPrice.join('')
			},
			// 按数字3
			threeClick(){
				this.offerPrice.push(3);
				this.lastofferPrice=this.offerPrice.join('')
			},
			// 按数字4
			fourClick(){
				this.offerPrice.push(4);
				this.lastofferPrice=this.offerPrice.join('')
			},
			// 按数字5
			fiveClick(){
				this.offerPrice.push(5);
				this.lastofferPrice=this.offerPrice.join('')
			},
			// 按数字6
			sixClick(){
				this.offerPrice.push(6);
				this.lastofferPrice=this.offerPrice.join('')
			},
			// 按数字7
			sevenClick(){
				this.offerPrice.push(7);
				this.lastofferPrice=this.offerPrice.join('')
			},
			// 按数字8
			eightClick(){
				this.offerPrice.push(8);
				this.lastofferPrice=this.offerPrice.join('')
			},
			// 按数字9
			nineClick(){
				this.offerPrice.push(9);
				this.lastofferPrice=this.offerPrice.join('')
			},
			// 按数字00
			dblzeroClick(){
				if(this.lastofferPrice!=''){
					this.offerPrice.push('00');
					this.lastofferPrice=this.offerPrice.join('')
				}
			},
			// 按数字0
			zeroClick(){
				if(this.lastofferPrice!=''){
					this.offerPrice.push(0);
					this.lastofferPrice=this.offerPrice.join('')
				}
			},
		},
		mounted(){
			this.usermsg();
		},
	}
</script>

<style scoped>
	.iconfont{
		color: #999;
		font-size: 30px;
	}	
	.articleDetails{
		background-color: #ededef;
	    max-width: 750px;
	    position: relative;
	    box-sizing: border-box;
	    min-height: 250vh;
	}
	.articleDetails .header {
	    width: 100%;
	    position: relative;
	    height: 188px;
	    background-color: #FFF;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    display: -webkit-flex;
	}
	.articleDetails .header .avatar {
	    margin: 26px 26px 30px 30px;
	    height: 127px;
	    padding: 3px;
	    border: 2px solid #ececec;
	    -webkit-box-sizing: content-box;
	    box-sizing: content-box;
	}
	.articleDetails .header .shopInfo {
	    height: 188px;
	    -ms-flex: 1;
	    flex: 1;
	    -webkit-flex: 1;
	    -webkit-box-flex: 1;
	}
	.border {
	    position: relative;
	}
	.border.horizonBottom:after {
	    left: 0;
	    bottom: 0;
	}
	.border.verticalLeft:after, .border.verticalRight:after {
	    width:2px;
	    height: 100%;
	    -ms-transform: scaleX(0.5);
	    transform: scaleX(0.5);
	    -webkit-transform: scaleX(0.5);
	}
	.border.verticalRight:after {
	    top: 0;
	    right: 0;
	}
	.border.horizonTop:after, .border.horizonBottom:after {
	    width: 100%;
	    height: 2px;
	    -ms-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	    -webkit-transform: scaleY(0.5);
	}
	.border:after {
	    position: absolute;
	    content: '';
	    background-color: #D9D9D9;
	}
	.articleDetails .saleInfo .bidBtns {
	    width: 100%;
	    display: table;
	    cursor: pointer;
	    position: relative;
	}
	.articleDetails .saleInfo .bidBtns .bidBtns .saleEndBtn{
	    background-color: #ccc;
	}
	.articleDetails .header .avatar .headimg {
	    width: 127px;
	    height: 127px;
	    display: block;
	    background-size: cover;
	    background-repeat: no-repeat;
	    background-position: center center;
	}
	.articleDetails .header .shopInfo .name {
	    padding-top: 30px;
	    width: 100%;
	    color: #000;
	    overflow: hidden;
	    font-size: 30px;
	    color: #f15511;
	}
	.articleDetails .saleInfo .countdownTip{
		float: right;
		clear: both;
		height: 40px;
		line-height: 40px;
		margin-bottom: 10px;
		color: #999;
	}
	.articleDetails .header .shopInfo .userattr {
	    width: 100%;
	    height: 50px;
	    margin-top: 10px;
	}
	.articleDetails .header .shopInfo .name .sellerLevel {
	    margin-right:10px;
	    margin-bottom:10px;
	}
	.sellerLevel.V0, .V0 {
	    background-position: 0 -1px;
	}
	.sellerLevel.V1, .V1 {
	    background-position: 0 -33px;
	}
	.sellerLevel.V2, .V2 {
	    background-position: 0 -64px;
	}
	.sellerLevel.V3, .V3 {
	    background-position: 0 -96px;
	}
	.sellerLevel.V4, .V4 {
	    background-position: 0 -128px;
	}
	.sellerLevel.V5, .V5 {
	    background-position: 0 -160px;
	}
	.sellerLevel.V6, .V6 {
	    background-position: 0 -193px;
	}
	.sellerLevel.V7, .V7 {
	    background-position: 0 -224px;
	}
	.sellerLevel.V8, .V8 {
	    background-position: 0 -255px;
	}
	.sellerLevel.V9, .V9 {
	    background-position: 0 -290px;
	}
	.sellerLevel.V10, .V10 {
	    background-position: 0 -322px;
	}
	.sellerLevel.V11, .V11 {
	    background-position: 0 -354px;
	}
	.sellerLevel.V12, .V12 {
	    background-position: 0 -386px;
	}
	.sellerLevel.V13, .V13 {
	    background-position: 0 -420px;
	}
	.sellerLevel.V14, .V14 {
	    background-position: 0 -450px;
	}
	.sellerLevel {
	    float: left;
	    width: 60px;
	    height: 30px;
	    background-size: cover;
	    background-repeat: no-repeat;
	    background-image: url(../../assets/images/sellerLevels.png);
	}
	.articleDetails .header .shopInfo .name a {
	    float: left;
	    display: block;
	    overflow: hidden;
	    max-width: 3.8rem;
	    -o-text-overflow: ellipsis;
	    text-overflow: ellipsis;
	    color: #f15511;
	}
	

	.articleDetails .header .shopInfo .userattr .item, .articleDetails .header .shopInfo .userattr .item span {
	    float: left;
	}
	.articleDetails .header .shopInfo .userattr .item {
	    margin-right: 20px;
	}
	.articleDetails .header .shopInfo .userattr .txt {
	    display: inline-block;
	    color: #999;
	    font-size: 24px;
	    margin-left: 8px;
	}
	.articleDetails .setup .icon-renzhengyonghu , .articleDetails .setup .icon-anquanbaozhang{
		color: #ffac00;
		margin:0;
	}
	.articleDetails .nosetup .icon-renzhengyonghu , .articleDetails .nosetup .icon-anquanbaozhang {
		color: #999;
		margin:0;
	}
	.articleDetails .saleInfo .likeIt .icon-xin3 , .articleDetails .saleInfo .likeIt .icon-xin1{
		font-size: 32px;
		height: 72px;
	  	line-height: 69px;
	}
	.articleDetails .icon-xingxing2 {
		color: #ffac00;
		margin:0;
	}
	.articleDetails .sticky {
	    position: -webkit-sticky;
	    position: sticky;
	    top: 0;
	}
	.articleDetails .operation{
		width: 100%;
	}
	.articleDetails .operation .attention{
		width: 100px;
		height: 33px;
		line-height: 33px;
		border-radius:2px;
		border:1px solid  #f15511;
		text-align: center;
		float: left;
		margin-right: 20px;
	}
	.articleDetails .operation .attention span {
		font-size: 20px;
		color: #f15511;

	}
	.articleDetails .operation .private{
		width: 100px;
		height: 33px;
		line-height: 33px;
		border-radius: 2px;
		border: solid 1px #13b0fd;
		text-align: center;
		float: left;
	}
	.articleDetails .operation .private span {
		font-size: 20px;
		color: #13b0fd;
	}
	.articleDetails .signature{
		height: 50px;
	    line-height: 40px;
	    background-color: #fff;
	    padding-left: 30px; 
	    margin-bottom: 10px;
	}
	.articleDetails .signature i{
		display: block;
		height: 50px;
		width: 90%;
		color: #999999;
	    font-size: 24px;
	    overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.articleDetails .saleInfo{
		padding: 30px 30px 0 30px;
		-moz-box-sizing: border-box; /*Firefox3.5+*/
		-webkit-box-sizing: border-box; /*Safari3.2+*/
		-o-box-sizing: border-box; /*Opera9.6*/
		-ms-box-sizing: border-box; /*IE8*/
		box-sizing: border-box; 
		background-color: #fff;
	}
	.articleDetails .saleInfo .desc {
	  	font-size: 15px;
	  	line-height: 44px;
	  	color: #333;
	  	font-size: 28px;
	  	overflow-y: hidden;
	  	word-break: break-word;
	  	margin-bottom: 20px;
	  	overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.articleDetails .saleInfo .nickname  .desc {
	  cursor: pointer;
	  margin: 8px 0 5px;
	}
	.articleDetails .saleInfo .desc.fullDesc {
	  max-height: none;
	  overflow-y: auto;
	}
	.articleDetails .saleInfo .desc label {
	  display: block;
	  width: 100%;
	  color: #878787;
	  font-size: 12px;
	  line-height: 20px;
	  margin: 10px 0 5px;
	}
	.articleDetails .saleInfo .showMore {
	  height: 20px;
	  line-height: 20px;
	  color: #576b95;
	  font-size: 15px;
	  margin-bottom: 5px;
	  width: 34px;
	  text-align: left;
	  border-radius: 1px;
	}
	.articleDetails .saleInfo .showMore.hide {
	  display: none;
	}
	.articleDetails .saleInfo .showMore.click {
	  background-color: #CCC;
	}
	.articleDetails .saleInfo .imgList {
	  width: 100%;
	  display: table;
	}
	.articleDetails .saleInfo .imgList .video-play {
	  overflow: hidden;
	}
	.articleDetails .saleInfo .imgList > div {
	  float: left;
	  width: 223px;
	  height: 223px;
	  max-width: 223px;
	  max-height: 223px;
	  margin: 3px;
	  cursor: pointer;
	  background-size: cover;
	  background-position: center;
	  background-repeat: no-repeat;
	}
	.articleDetails .saleInfo .imgList > div.video-play {
	  position: relative;
	}
	.articleDetails .saleInfo .imgList > div.video-play::before {
	  content: "";
	  display: block;
	  position: absolute;
	  height: 100%;
	  width: 100%;
	  top: 0;
	  left: 0;
	  background-repeat: no-repeat;
	  background-position: center;
	  background-size: 50% 50%;
	  background-image: url("/res/img/video/video_play.png");
	}
	.articleDetails .saleInfo .imgList div.clickImg {
	  opacity: .5;
	}
	/*.articleDetails .saleInfo .createTime,*/
	.articleDetails .saleInfo .stateInfo {
	  width: 100%;
	  height: 83px;
	  line-height: 83px;
	  /*padding-top: 4px;*/
	  color: #999;
	}
	.articleDetails .saleInfo .createTime {
	  height: 76px;
	  line-height: 76px; 
	  position: relative;
	}
	.articleDetails .saleInfo .stateInfo.hide {
	  display: none;
	}

	.articleDetails .saleInfo .createTime .freePost{
	  height: 36px;
	  width: 73px;
	  border: 1px solid #fd8f01;
	  text-align: center;
	  line-height: 42px;
	  font-size: 24px;
	  display: -webkit-box;
	  display: -ms-flexbox;
	  display: flex;
	  display: -webkit-flex;
	  float: left;
	  margin-right: 2px;
	  border-radius: 3px;
	  color: #fd8f01;
	  display: block;
	  margin:20px 10px 20px 0;
	}

	.articleDetails .saleInfo .createTime .time {
	  float: right;
	  color: #999999;
	  font-size: 20px;
	}


	.articleDetails .saleInfo .toolBox {
	  color: #999;
	  display: table;
	  width: 100%;
	  height: 72px;
	  line-height: 72px;
	}
	.articleDetails .saleInfo .toolBox .complainBtn {
	  position: relative;
	  float: left;
	  cursor: pointer;
	  padding-right: 26px;
	  font-size: 24px;
	  color: #333;

	}
	.articleDetails .saleInfo .toolBox .complainBtn i {
	  font-size: 42px;
	  margin:0  2px 0 0;
	  float: left;
	}
	.articleDetails .saleInfo .likeIt,
	.articleDetails .saleInfo .popularity,
	.articleDetails .saleInfo .shareIt {
	  float: right;
	  width: auto;
	  height: 72px;
	  line-height: 72px;
	  font-size: 24px;
	  text-indent: 0;
	  cursor: pointer;
	  display: -webkit-box;
	  display: -ms-flexbox;
	  display: flex;
	  display: -webkit-flex;
	  margin-left: 10px;
	  color: #999;
	}
	.articleDetails .icon-bao , .articleDetails .icon-qi , .articleDetails .icon-jia{
		font-size: 32px;
		margin: 0;
	}
	.articleDetails .saleInfo .shareIt{
		color: #333;
	}
	.articleDetails .icon-huo {
		color: #f15511;
	}
	.articleDetails .saleInfo .likeIt i,
	.articleDetails .saleInfo .popularity i,
	.articleDetails .saleInfo .shareIt i {
	  font-size:38px;
	  height: 72px;
	  line-height: 72px;
	  margin:0;
	}
	.articleDetails .saleInfo .likeIt i {
	  color: #f15511;
	}
	.articleDetails .saleInfo .likeIt:hover,
	.articleDetails .saleInfo .popularity:hover,
	.articleDetails .saleInfo .shareIt:hover {
	  opacity: .9;
	}
	.articleDetails .saleInfo .shareIt {
	  color: #999;
	  font-size: 13px;
	  background-size: 13px;
	}
	.articleDetails .saleInfo .likeIt.liked i::before {
	  content: "\E665";
	}
	.articleDetails .saleInfo .popularity {
	  padding-left: 0;
	}
	.articleDetails .saleInfo .likeIt span,
	.articleDetails .saleInfo .popularity span,
	.articleDetails .saleInfo .shareIt span {
	  display: inline-block;
	  height: 72px;
	  font-size: 24px;
	  margin-right: 5px;
	}
	.articleDetails .saleInfo .priceGuess {
	  float: right;
	  width: 35px;
	  height: 26px;
	  padding-left: 10px;
	  color: #999;
	  background-size: 20px;
	  background-repeat: no-repeat;
	  background-position: 25px center;
	  background-image: url("/res/img/activity/flow/questionMark.gif");
	}
	.articleDetails .saleInfo .likeBox {
	  position: relative;
	  display: table;
	  width: 100%;
	  max-height: 57px;
	  padding: 8px 0px  8px 0px;
	  text-align: center;
	  background-color: #f4f4f4;
	}
	.articleDetails .saleInfo .likeBox:after {
	  position: absolute;
	  right: 60px;
	  width: 0;
	  height: 0;
	  content: '';
	  border-width: 6px;
	  border-style: solid;
	  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #F0F1F2 rgba(0, 0, 0, 0);
	}
	.articleDetails .saleInfo .likeBox:after {
	  top: -12px;
	}
	.articleDetails .saleInfo .likeBox .likeAvatar {
	  float: left;
	  height: 70px;
	  width: 70px;
	  margin: 0 0 4px 5px;
	  background-size: cover;
	  background-position: center;
	  background-repeat: no-repeat;
	  cursor: pointer;
	}

	.articleDetails .saleInfo .tmpLikeBox {
	  display: none;
	}
	.articleDetails .saleInfo .stateInfo .state {
	  position: relative;
	  float: left;
	  color: #FFF;
	  padding: 10px 15px;
	  background-color: #fd8f01;
	  font-size: 24px;
	  width: 130px;
	  height: 32px;
	  line-height: 32px;
	  margin-top: 15px;
	  text-align: center;
	  border-radius: 4px;
	}
	.articleDetails .saleInfo .stateInfo .state.end {
	  color: #FFF;
	  background-color: #ccc;
	}
	.articleDetails .saleInfo .stateInfo .state i {
	  position: absolute;
	  top: 18px;
	  right: -5px;
	  display: block;
	  width: 15px;
	  height: 16px;
	  background-color: #fd8f01;
	  -webkit-transform: rotate(45deg);
	}
	.articleDetails .saleInfo .stateInfo .endTime,
	.articleDetails .saleInfo .stateInfo .endTimeTips {
	  float: right;
	}
	.articleDetails .saleInfo .stateInfo .endTime .saleInfo .stateInfo .endTime span {
	  font-size: 24px;
	}
	.articleDetails .saleInfo .stateInfo .endTime i {
	  color: #9e2026;
	  padding: 0 4px;
	  font-size: 28px;
	}
	.articleDetails .saleInfo .stateInfo .endTimeTips label {
	  color: #780018;
	  padding: 0 2px;
	  font-size: 28px;
	}
	.articleDetails .saleInfo .bidBtns .bidTips {
	  position: absolute;
	  width: 3.4rem;
	  background: rgba(244, 98, 1, 0.9);
	  right: 0;
	  bottom: 110%;
	  border-radius: 8px;
	  color: #ffffff;
	  padding: .2rem;
	}
	.articleDetails .saleInfo .bidBtns .bidTips .close {
	  position: absolute;
	  top: .08rem;
	  right: .16rem;
	  font-size: 20px;
	  -webkit-transform: rotate(45deg);
	      -ms-transform: rotate(45deg);
	          transform: rotate(45deg);
	}
	.articleDetails .saleInfo .bidBtns .bidTips .title {
	  line-height: 1.2;
	  font-size: .28rem;
	  font-weight: bold;
	}
	.articleDetails .saleInfo .bidBtns .bidTips .desc {
	  padding-top: .15rem;
	  font-size: .28rem;
	  line-height: 1.2;
	  margin: 0;
	}
	.articleDetails .saleInfo .bidBtns .bidTips .arrow-down {
	  position: absolute;
	  left: .6rem;
	  top: 100%;
	  width: 0;
	  height: 0;
	  border-left: .18rem solid transparent;
	  border-right: .18rem solid transparent;
	  border-top: 0.18rem solid rgba(244, 98, 1, 0.9);
	}
	.articleDetails .saleInfo .bidBtns {
	  width: 100%;
	  display: table;
	  cursor: pointer;
	  position: relative;
	}
	.articleDetails .saleInfo .bidBtns .price {
	  display: none;
	}
	.articleDetails .saleInfo .bidBtns .bidBtn,
	.articleDetails .saleInfo .bidBtns .groupBtn,
	.articleDetails .saleInfo .bidBtns .multiBtn,
	.articleDetails .saleInfo .bidBtns .saleEndBtn,
	.articleDetails .saleInfo .bidBtns .saleOpenBtn,
	.articleDetails .saleInfo .bidBtns .shareBtnLayer div {
	  position: relative;
	  width: 100%;
	  height: 88px;
	  line-height: 88px;
	  color: #fff;
	  font-size: 30px;
	  text-align: center;
	  border-radius: 5px;
	  background-color: #9e2026;
	}

	.articleDetails .saleInfo .bidList .isGray {
	  -webkit-filter: grayscale(60%);
	  filter: grayscale(60%);
	  opacity: .6;
	}
	.articleDetails .saleInfo .bidList {
	  width: 99.6%;
	  background: #F0F1F2;
	}
	.articleDetails .saleInfo .bidList .ddli {
	  position: relative;
	  border-bottom: 1px solid #d2d2d2;
	  width: 96%;
	  height: 113px;
	  margin: 0 22px 0 15px;
	  padding: 15px 0px 15px 0px ;
	  overflow: hidden;
	}
	.articleDetails .saleInfo .bidList .ddli:first-child {
	  /*margin-top: 8px;*/
	}
	.articleDetails .saleInfo .bidList .ddli:last-child {
	  margin-bottom: 28px;
	  border-bottom: none;
	}
	.articleDetails .saleInfo .bidList .ddli .state {
	  position: relative;
	  float: right;
	  text-align: right;
	}
	.articleDetails .saleInfo .bidList .ddli .state .bidTime {
	  position: absolute;
	  right: 0;
	  height: 36px;
	  line-height: 36px;
	  color: #999;
	  margin: 72px 0 0;
	  width: 250px;
	}
	.articleDetails .saleInfo .bidList .ddli .state .bidState {
	  width: 220px;
	}
	.articleDetails .saleInfo .bidList .ddli .state .bidState span {
	  display: block;
	  width: 220px;
	}
	.articleDetails .saleInfo .bidList .ddli .state .bidState .bidsuccess {
	  height:55px;
	  width: 220px;
	  display: block;
	  margin-top: -2px;
	  background-size: auto 100%;
	  background-repeat: no-repeat;
	  background-position: right center;
	  background-image: url("");
	}
	.articleDetails .saleInfo .bidList .ddli .state .bidState .bidOut {
	  height:55px;
	  width: 220px;
	  display: block;
	  margin-top: -2px;
	  background-size: auto 100%;
	  background-repeat: no-repeat;
	  background-position: right center;
	  background-image: url("../../assets/images/out.png");
	}
	.articleDetails .saleInfo .bidList .ddli .state .bidState .bidLeader {
	  height:60px;
	  width: 220px;
	  display: block;
	  margin-top: -2px;
	  background-size: auto 100%;
	  background-repeat: no-repeat;
	  background-position: right center;
	  background-image: url("../../assets/images/leader.png");
	}
	.articleDetails .saleInfo .bidList .ddli .state .bidState .successdown {
	  height:60px;
	  width: 220px;
	  display: block;
	  margin-top: -2px;
	  background-size: auto 100%;
	  background-repeat: no-repeat;
	  background-position: right center;
	  background-image: url("../../assets/images/deal.png");
	}
	.articleDetails .saleInfo .bidList .ddli .state .bidState .bidDeal {
	  height: 38px;
	  margin-top: -2px;
	  background-size: auto 100%;
	  background-repeat: no-repeat;
	  background-position: right center;
	  background-image: url("/res/img/deal.png?t=1");
	}
	.articleDetails .saleInfo .bidList .ddli .avatar {
	  float: left;
	  width: 113px;
	  height: 113px;
	  margin-right: 20px;
	  position: relative;
	}
	.articleDetails .saleInfo .bidList .ddli .avatar.gray {
	  opacity: .3;
	}
	.articleDetails .saleInfo .bidList .ddli .avatar.gray a:after {
	  content: "";
	  position: absolute;
	  left: 0;
	  top: 0;
	  width: 113px;
	  height: 113px;
	  background-color: rgba(0, 0, 0, 0.6);
	}
	.articleDetails .saleInfo .bidList .ddli .avatar > div {
	  width: 113px;
	  height: 113px;
	  background-size: cover;
	  background-repeat: no-repeat;
	  background-position: center center;
	}
	.articleDetails .saleInfo .bidList .ddli .avatar .buyerLevels {
	  position: absolute;
	  left: 0;
	  bottom: 0;
	}
	.articleDetails .saleInfo .bidList .ddli .bidUser {
	  position: absolute;
	  left: 150px;
	  line-height: 52px;
	  color: #666;
	  font-size: 28px;
	  font-weight: bold;
	  white-space: nowrap;
	}
	.articleDetails .saleInfo .bidList .ddli .bidUser .name {
	  line-height: 50px;
	  max-width: 3.6rem;
	  overflow: hidden;
	  white-space: nowrap;
	  -o-text-overflow: ellipsis;
	     text-overflow: ellipsis;
	}
	.articleDetails .saleInfo .bidList .ddli .bidUser .name a {
	  color: #666;
	}
	.articleDetails .saleInfo .bidList .ddli .bidUser .price {
	  margin-top: 17px;
	  line-height: 30px;
	  color: #9e2026;
	  font-size: 28px;
	}
	.articleDetails .saleInfo .bidList .ddli .bidUser .bidPrice {
	  position: relative;
	  margin-top: 10px;
	  line-height: 20px;
	  color: #79797B;
	  font-size: 13px;
	  font-weight: normal;
	}
	.articleDetails .saleInfo .bidList .ddli .bidUser .bidPrice:after {
	  position: absolute;
	  left: 5%;
	  top: -50%;
	  width: 95%;
	  height: 100%;
	  content: '';
	  -webkit-transform: skewY(10deg);
	  border-bottom: 1px solid #79797B;
	}
	.articleDetails .saleInfo .bidList .ddli .bidUser .bidPrice.noDelete {
	  text-decoration: none;
	}
	.articleDetails .saleInfo .bidList .bidMore {
	  height: 32px;
	  line-height: 32px;
	  margin-bottom: 2px;
	  text-align: center;
	  cursor: pointer;
	}
	.articleDetails .saleInfo .moneyInfo,
	.articleDetails .saleInfo .moneyInfoExtend,
	.articleDetails .saleInfo .moneyInfoPrice {
	  width: 100%;
	  display: table;
	  padding: 24px 0;
	  color: #999;
	  font-size: 24px;
	}
	.articleDetails .saleInfo .moneyInfo div,
	.articleDetails .saleInfo .moneyInfoExtend div,
	.articleDetails .saleInfo .moneyInfoPrice div {
	  float: left;
	  width: 33%;
	  display: -webkit-box;
	  /* 老版本语法: Safari,  iOS, Android browser, older WebKit browsers.  */
	  display: -webkit-flex;
	  /* 新版本语法： Chrome 21+ */
	  display: -ms-flexbox;
	  display: flex;
	  /* 新版本语法： Opera 12.1, Firefox 22+ */
	  /*水平居中*/
	  /*老版本语法*/
	  -webkit-box-pack: center;
	  /*新版本语法*/
	  -webkit-justify-content: center;
	  -ms-flex-pack: center;
	      justify-content: center;
	  line-height: 30px;
	}
	.articleDetails .saleInfo .moneyInfo div:nth-child(2) {
	  border: 1px solid #cfd1d4;
	  border-width: 0 1px;
	}
	.articleDetails .saleInfo .moneyInfoExtend div:nth-child(2) {
	  width: 66%;
	  border: 1px solid #cfd1d4;
	  border-width: 0 0 0 1px;
	}
	.articleDetails .saleInfo .moneyInfoPrice div:nth-child(1) {
	  width: 50%;
	}
	.articleDetails .saleInfo .moneyInfoPrice div:nth-child(2) {
	   width: 50%;
	   -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	   border: 1px solid #cfd1d4;
	   border-width: 0 0 0 1px;
	}
	.articleDetails .otherSaleMain .title {
	    position: relative;
	    height: 88px;
	    margin: 0 auto;
	    line-height: 88px;
	    font-size: 28px;
	    color: #333;
	    text-indent: 20px; 
	}
	.articleDetails .otherSaleMain .title:before {
	    position: absolute;
	    content: '';
	    left: 0;
	    top: 25px;
	    width: 6px;
	    height: 27px;
	    background-color: #9e2026;;
	}
	.articleDetails .otherSaleMain .title a {
	    width: 60%;
	    float: left;
	    display: block;
	}

	.articleDetails .otherSaleMain .saleBox {
	    overflow: hidden;
	    width: 100%;
	    margin-top: 20px;
	}
	.articleDetails .otherSaleMain .saleBox .saleItem{
	    position: relative;
	    width: 335px;
	    float: left;
	   
	}

	.articleDetails .otherSaleMain .saleBox :nth-child(even){
		 margin-left: 15px;
	}
	.articleDetails .saleItem:first-child {
	    border-top: none;
	}
	.articleDetails .otherSaleMain .saleBox .saleItem .saleImg {
	    position: relative;
	    width: 100%;
	    height: 405px;
	    background-size: cover;
	    background-position: center;
	    background-repeat: no-repeat;
	}
	.articleDetails .otherSaleMain .saleBox .saleItem .desc {
	    padding-top:22px;
	    height: 40px;
	    font-size: 24px;
	    color: #333;
	    overflow: hidden;
	}
	.articleDetails .otherSaleMain .saleBox .saleInfo {
	    width: 100%;
	    height: 40px;
	    line-height: 40px;
	    margin:20px 0 10px 0;
	    padding:0;
	    display: table;
	    font-size: 24px;
	}
	.articleDetails .otherSaleMain .saleInfo .bid {
	    float: left;
	    color: #9e2026;;
	    text-align: left;
	    font-size: 28px;
	}

	.articleDetails .otherSaleMain .saleInfo .statics {
	    float: right;
	    color: #999;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    display: -webkit-flex;
	}
	.articleDetails .otherSaleMain .saleInfo .statics i{
		font-size: 38px;
		height: 40px;
	    line-height: 40px;
	    margin:0;
	}
	 .articleDetails .otherSaleMain .saleInfo .statics span {
	    height: 40px;
	    line-height: 40px;
	    margin: 1px 0;
	    font-size: 28px;
	}

	.articleDetails .goShop {
	    height: 93px;
	    line-height: 93px;
	    display: -ms-flexbox;
	    display: flex;
	    display: -webkit-box;
	    display: -webkit-flex;
	    /*border-bottom: 10px solid #EFEFF4;*/
	}
	.articleDetails .goShop a {
	    color: #333;
	    display: block;
	    font-size: 28px;
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    -webkit-flex: 1;
	    text-align: center;
	    height: 26px;
	    line-height: 26px;
	    margin: 30px 0;
	}

	.imSupportBanner-modules .imSupportBanner {
	    width: 100%;
	    text-align: center;
	    margin-top: 10px;
	    height: 100px;
	    line-height: 100px;
	    font-size: 24px;
	    color: #13b0fd;
	    background-color: #fff;
	}
	.articleDetails .service{
	  line-height: 110px;
	}
	.articleDetails .icon-tuisongxiaoxi{
		color: #13b0fd;
		font-size: 38px;
		margin:0 5px 0 0;
		vertical-align: top;
	}
	.articleDetails .icon-gengduo{
		color: #666;
		font-size: 32px;
	}
	.articleDetails .icon-zuji {
		color: #666;
		font-size: 40px;
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
	.sharetofriends{
		height:100px;
		line-height: 100px;
		color: #666;
	}
	.threemethods{
		overflow: hidden;
	}
	.threemethods .floleft{
		float: left;
		width: 20%;
		margin-left: 18%;
	}
	.icon-erweima{
		color: white;
		background: #ffde00;
		font-size: 72px;
		border-radius: 40px;
		width: 80px;
		height: 80px;
	}
	.icon-lianjie{
		font-size: 72px;
		width: 80px;
		height: 80px;
		background: #de5443;
		color: white;
		border-radius: 40px;
	}
	.erweimahead{
		overflow: hidden;
		margin:50px 10px;
	}
	.erweimahead .headmsg{
		float: left;
		margin-left: 30px
	}
	.erweimahead .headmsg div{
		height: 67px;
		line-height: 67px
	}
	.erweimahead .headimg{
		width: 135px;
		height: 135px;
		display: block;
	    background-size: cover;
	    background-repeat: no-repeat;
	    background-position: center center;
	}
	.onlyerweima{
		width: 533px;
		height: 533px;	
		margin:auto;
		text-align: center;
	}
	.onlyerweima .onlyerweimaimg{
		width: 520px;
		height: 520px;
		border: 1px solid #ededed;
	}
	.fingner{
		margin-top: 30px;
	}
</style>

