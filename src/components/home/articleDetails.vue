<template>
	<div class="articleDetails">
		<div class="header">
      <router-link :to="{path: '/storeHome/'+  userMsg.sellerId }">
			<div class="avatar">
				<div @click.stop="setTitle(userMsg.sellerName)" class="headimg"  v-bind:style="{backgroundImage: 'url(' + userMsg.headimgurl + ')'}">
				</div>
			</div>
			</router-link>
			<div class="shopInfo">
					<div class="name">
						<div class="sellerLevel"  v-bind:class="userMsg.sellerLevel"></div>
						<div class="verified">{{userMsg.sellerName}}</div>
					</div>
					<div class="userattr">
						<div class="item">
							<span class = "starLevel">
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
            <div v-if="userMsg.selfIs==true ? false : true" class="attention" v-show="userMsg.isAttention==true ? false : true">
                  <span @click="attention()">关注</span>
                  <span v-show="sale.isAttention==true ? true : false" @click="cancelattention()">取消关注</span>
              </div>
            <router-link :to="{name:'letter',params:{user_id:userMsg.sellerId}}">
							<div class="private" v-if="userMsg.selfIs==true ? false : true">
								<span>私信</span>
							</div>
						</router-link>
					</div>
			</div>
      </div>
      <div class="signature">
        <i>{{userMsg.sellerdesc}}</i>
      </div>
      <div class="signaturegrayFa">
        <div class="signaturegray"></div>
      </div>
      <div class="saleInfo">
        <div class="desc fullDesc" v-html="sellerdesc">
        </div>
        <div class="imgList">
          <div class="image--219j3" v-for ="(list,index) in sale.imgList" v-bind:style="{backgroundImage: 'url(' + list + ')'}" :key='index' @click="pupPic(index)"></div>
            <div :style="{backgroundImage : 'url(' + videoImg + ')'}" v-if="videoUrl" v-show="isVideo" class="videoBox"><video v-show='!isPlay' webkit-playsinline x5-video-player-type @pause.stop="pause" @ended.stop="ended" :poster="videoImg" :src="videoUrl"></video><img v-if="isPlay" @click.stop="play" src="../../assets/images/start.png" alt=""></div>
        </div>
        <div class="createTime border horizonBottom">
        <div class="freePost" v-show="sale.freeship == true">
					包邮
				</div>
				<div class="freePost" v-show="sale.isReturn == true">
					包退
				</div>
				<div class="freePost" @click="soldOutBtn" v-if="userMsg.selfIs ? (sale.logList.length == 0 ? true :false) : false">
				下架
        </div>
				<div class="time">
					{{timestampToTime(sale.startTime)}}
				</div>
			</div>
			<div v-if="!userMsg.selfIs">
				<div class="toolBox">
					<router-link :to="{path: '/articleDetails/complaint',query: {sellerId:sellerId,auction_id:sale.uri}}">
						<a v-if="userMsg.selfIs==true ? false : true" class="complainBtn">投诉
							<i class="iconfont icon-jingcha1"></i>
						</a>
					</router-link>
					<div @click="share()" class="shareIt" img="">
						<span>分享</span><i class="iconfont icon-fenxiang"></i>
					</div>
					<div class="likeIt"  @click="auctionFocus()">
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
					<div class="popularity" @click.stop="refreshLikeBox">
						<span>更新</span><i class="iconfont icon-shuaxin"></i>
					</div>
				</div>
				<div class="likeBox" v-if="likeList.length > 0">
          <a href="javascript:void(0)" class="likeAvatar" v-for="(item) in likeList" v-bind:style="{backgroundImage: 'url(' + item.headimgurl + ')'}"
              :key="item.article_id" @click="localSet(item.isCompany,item.userId)"></a>
          <div v-show="isShowMore" @click.stop="showMore" class = "showMore likeAvatar"><i class = "iconfont icon-gengduo1"></i></div>
          <div v-show="isclickClose" @click.stop="clickClose" class = "clickClose likeAvatar"><i class = "iconfont icon-xiangshang"></i></div>
				</div>
				<div class="AsapSupA" v-if="sale.isBeforehand">
					<!-- <div class="Asapsell">即将拍卖<i></i></div> -->
					<div class="SupAndShoot">距离开拍：<span><span><i>{{tostahour}}</i>时<i>{{tostamin}}</i>分<i>{{tostasec}}</i>秒<i style="display: none;">9</i></span></span>
					</div>
				</div>
				<div class="rewrwe" v-if="!sale.isBeforehand">
					<div class="stateInfo" v-if="haveend">
						<div class="state">
							正在拍卖<i></i>
						</div>
						<div class="endTime" v-if="haveend">
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
							<div v-if="userMsg.selfIs ? false :(haveend?true:false)
					" class="bidBtn" @click="openkeyBoard()">
								出价
							</div>
							<div class="bidBtns"><div><div class="saleEndBtn" v-show="havepaimaiend">{{month}}月{{day}}日 {{endhour}}:{{endminite}}拍卖结束</div></div></div>
						</div>
					</div>
				</div>
			</div>
			<!-- 卖家进入所看见的页面 start-->
			<div v-if="userMsg.selfIs">
				<div class="toolBox">
					<!-- <div class="time">
						{{timestampToTime(sale.startTime)}}
					</div> -->
					<div @click="share()" class="shareIt" img="">
						<span>分享</span><i class="iconfont icon-fenxiang"></i>
					</div>
					<div class="likeIt"  @click.stop="auctionFocus">
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
					<div class="popularity" @click.stop="refreshLikeBox">
						<span>更新</span><i class="iconfont icon-shuaxin"></i>
					</div>
				</div>
				<div class="likeBox" v-if="likeList.length > 0">
        <a href="javascript:void(0)" class="likeAvatar" v-for ="(item) in likeList" v-bind:style="{backgroundImage: 'url(' + item.headimgurl + ')'}" @click="localSet(item.isCompany,item.userId)" :key="item.article_id">
          </a>
          <div v-show="isShowMore" @click.stop="showMore" class = "showMore likeAvatar"><i class = "iconfont icon-gengduo1"></i></div>
          <div v-show="isclickClose" @click.stop="clickClose" class = "clickClose likeAvatar"><i class = "iconfont icon-xiangshang"></i></div>
				</div>
				<div class="rewrwe">
					<div class="stateInfo" >
              <div v-if="!sale.isBeforehand">
              <div class="state" v-if="haveend">
                正在拍卖<i></i>
              </div>
							<div class="state" v-if="!haveend">
								拍卖结束<i></i>
							</div>
							<div class="endTime" v-if="haveend">
								距离结束：<span><span><i>{{toendhour}}</i>时<i>{{toendminite}}</i>分<i>{{toendsecond}}</i><i style="display: none;">9</i></span></span>
							</div>
						</div>
						<div v-else>
							<div class="state">
								正在预展<i></i>
							</div>
							<div class="endTime" v-if="haveend">
								距离开拍：<span><span><i>{{tostahour}}</i>时<i>{{tostamin}}</i>分<i>{{tostasec}}</i><i style="display: none;">9</i></span></span>
							</div>
						</div>
						<div class="endTime" v-if="!haveend">
							<span><span>{{sale.logList[0] && sale.logList[0].addTime}}拍卖截止<i style="display: none;">9</i></span></span>
						</div>
						<div class="countdownTip" v-show='show'>
							<i class="iconfont icon-tixing"></i>
							最后5分钟，进入延时竞价周期
						</div>
					</div>
					<div class="sellerbidBtns" v-if="haveend">
						<div @click.stop="share">分享给朋友们</div>
						<div @click.stop="NotificationsOfGroupHair">群发通知</div>
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
						<div v-if="sale.priceList.cashPrice==0 ? false : true">
							<i class="iconfont icon-bao"></i>
							<span>￥{{sale.priceList.cashPrice}}元</span>
						</div>
					</div>
					<div class="moneyInfos">
						<div v-if="sale.priceList.yikoujia==0 ? false : true">
							<i class="iconfont icon-yikoujia2"></i>
							<span>￥{{sale.priceList.yikoujia}}元</span>
						</div>
						<div class="haveborder" v-if="sale.priceList.gjPriceStart==0 ? false : true">
							<i class="iconfont icon-cankaojia1"></i>
							<span>￥{{sale.priceList.gjPriceStart + '~' + sale.priceList.gjPriceEnd}}元</span>
						</div>
            </div>
          </div>
            </div>
			<!-- 卖家进入所看见的页面 end-->
			<div class="rewrwe" v-if="!sale.isBeforehand">
				<div class="moneyInfo" v-if="!userMsg.selfIs">
					<div class = "moneyInfoOne">
						<i class="iconfont icon-qi"></i>
						<span>￥{{sale.priceList.firstprice}}元</span>
					</div>
					<div>
						<i class="iconfont icon-jia"></i>
						<span>￥{{sale.priceList.addprice}}元</span>
					</div>
					<div v-if="sale.priceList.cashPrice==0 ? false : true">
						<i class="iconfont icon-bao"></i>
						<span>￥{{sale.priceList.cashPrice}}元</span>
					</div>
					<div>
						<i class="iconfont icon-yan"></i>
						<span>5分钟</span>
					</div>
				</div>
				<div class="moneyInfos" v-if="!userMsg.selfIs">
					<div v-if="sale.priceList.yikoujia==0 ? false : true">
						<i class="iconfont icon-yikoujia2"></i>
						<span>￥{{sale.priceList.yikoujia}}元</span>
					</div>
					<div class="haveborder" v-if="sale.priceList.cankaojia==0 ? false : true">
						<i class="iconfont icon-cankaojia1"></i>
						<span>￥{{sale.priceList.cankaojia}}元</span>
					</div>
				</div>
			</div>
			<div class="bidList">
				<div class="ddli"  v-for ="(logList,index) in loadMoreArr" :key="logList.auctionPrice">
					<div class="avatar">
						<div :class="0==index ? '' : imggrayClass" v-bind:style="{backgroundImage: 'url(' + logList.headimgurl + ')'}">
						</div>
						<img :src="logLists[logList.userLever-1]" alt="">
					</div>

					<div class="bidUser">
						<div :class="0==index ? 'nameClass' : graysomethingClass">
							{{logList.nickname}}
						</div>
						<!-- :class="0==index ? 'priceClass' : graysomethingClass" -->
						<div :class="0==index ? 'priceupdate' : graysomethingClass">
							￥{{logList.auctionPrice}}元
						</div>
					</div>
					<div class="state">
							<!-- :class="0==index ? bidLeaderClass : bidOutClass" -->
						<div class="bidState">
							<span :class="bidDownClass" v-if="isFirstPrice==1 ? true : false"></span>
							<span v-else
							:class="0==index ? (haveend ? bidLeaderClass : bidDownClass) : bidOutClass"></span>
						</div>
						<div :class="0==index ? 'bidTimeClass' : graysomethingClass">{{logList.addTime}}</div>
					</div>
				</div>
				<div v-if="isLoadMore" class="LoadMore ddli" @click.stop="loadMore">加载更多</div>
			</div>
			<div class="grayline"></div>
			<div class="otherSaleMain" >
				<div class="title border horizonBottom">
					<router-link  class="traceBox" :to="{path: 'storeHome', query: {user_id: sellerId}}">
						<span>店铺拍品</span>
					</router-link>
				</div>
				<div class="saleBox">
					<div class="saleItem" v-for ="(item,index) in shopList" :key="index">
						<!-- <router-link class="traceBox border verticalRight" :to="{name: 'auction', params: {id: item.auctionId }}"> -->
							<div @click="refreshnow(item.auctionId)" class="image--219j3 saleImg" v-bind:style="{backgroundImage:'url(' + item.imgUrl + ')'}">
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
						<!-- </router-link> -->
					</div>
				</div>
			</div>
			<div class="goShop border horizonTop">
				<router-link to="/newFootPrint/footer" class="traceBox border verticalRight" >
					<i class="iconfont icon-zuji"></i>
					我的足迹
					<div class = "decollator"></div>
				</router-link>
				<div style="width:50%;text-align:center;font-size: 14px;line-height:40px;color:#666;" @click="toStoreGo(sellerId,sellerName)" class="traceBox border verticalRight" >
					<i class="iconfont icon-gengduo"></i>
					进店逛逛
				</div>
        <!-- <router-link @click="toStoreGo(sellerId,this.userMsg.sellerName)" class="traceBox border verticalRight" :to="'/storeHome/'+sellerId">
            <i class="iconfont icon-gengduo"></i>
          进店逛逛
        </router-link> -->
			</div>
		</div>
      <!-- <router-link to="/message">
        <div class="imSupportBanner-modules">
        <div class="imSupportBanner">
          <i class="iconfont icon-tuisongxiaoxi"></i>
          <i class="service">联系平台客服</i>
        </div>
      </div>
		</router-link> -->
	<!-- 出价键盘 -->
		<div  id="fixednumMain" v-if=" bid==true ">
			<div @click="closeshowalert()" class="fixednumMask" style="opacity: 0.38;"></div>
			<div class="fixednumMain flip-up">
				<div>
					<div class="tipBanner">
						<span class="title" style="height:45px;line-height:45px;">领先价</span>
						<div class="last">
							{{sale.priceList.leadIngPrice}}
						</div>
						<div class="close" @click="closekeyBoard()">
							<i class="iconfont icon-guanbi"></i>
						</div>
					</div>
					<div class="priceBanner" @click="showcursor">
						<span class="title" style="height:45px;line-height:45px;">出价</span>
						<!-- <div class="editTxt"> -->
            <div class="last">
                {{lastofferPrice}}
            </div>	<i v-show="cursor1" id="cursor1" style="font-size:0.5rem;line-height: 1.15rem;">|</i>
            <div class="lasttwo" v-if="lasttwoShow">
                按一口价出价
            </div>
						<i @click="clearPrice" class="iconfont icon-shibai"></i>

						<!-- <i>*很遗憾，该拍品已经结束。</i> -->
					</div>

					<div class="btnBanner">
						<div :class="sale.priceList.yikoujia<1000 ? (sale.priceList.yikoujia == lastofferPrice ? 'yikoujiaGray' : fixedPriceClass) : (sale.priceList.yikoujia == lastofferPrice ? 'yikoujiaGraym' : fixedPricemClass)" v-if="sale.priceList.yikoujia==0 ? false : true" @click="auctionAddPrice">一口价￥{{sale.priceList.yikoujia}}</div>
						<div :class="sale.priceList.yikoujia<1000 ? confirmBtnClass : confirmBtnmClass" @click="confirmprice(lastofferPrice)">
							出价
						</div>
					</div>
				</div>
				<div class="numkey">
					<ul>
						<li @touchstart='oneClick()' data-touch="touchEffect" class="num">
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
						<li @click='dblzeroClick()' data-touch="touchEffect" class="num othernum" style="line-height: 50px">00</li>
						<li @click='zeroClick()' data-touch="touchEffect" class="num" style="line-height: 50px;">0</li>
						<li @click='del()' data-touch="touchEffect" class="delete" style="line-height: 50px;"></li>
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
						<div><i class="icon-erweima iconfont"></i></div>
						<div>拍品二维码</div>
					</div>
					<!-- <div class="floleft">
						<div class="icon-friends iconfont"></div>
						<div>一键分享</div>
					</div> -->
					<div class="floleft" id="floleft" data-clipboard-action="copy" :data-clipboard-text="text">
						<div><i class="icon-lianjie iconfont"></i></div>
						<div>复制链接</div>
					</div>
				</div>
			</div>
		</div>
	<!--弹出二维码页面-->
		<div id="fixednumMain" v-if="openerweima==true ">
			<div class="fixednumMask backgroundimg">
				<div class="erweimahead">
					<div class="headmsg headimg" v-bind:style="{backgroundImage: 'url(' + userMsg.headimgurl + ')'}"></div>
					<div class="headmsg">
						<div>{{userMsg.sellerName}}</div>
						<div>{{userMsg.sellerdesc}}</div>
					</div>
				</div>
				<div class="onlyerweima">
					<div class="onlyerweimaimg">
						<!-- <qrcode-vue value="http://192.168.7.103:8088/#/auction/3pm5zxn1gbldryV7" size="200" level="H"></qrcode-vue> -->
					</div>
					<div class="fingner">
						<div class="icon-zhiwen iconfont"></div>
						<div class="words">长按图片分享名片</div>
					</div>
				</div>
			</div>
		</div>
	<!-- 弹出提示框 -->
		<div id="fixednumMain" v-if="showalert==true">
			<div @click="closeshowalert()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="alertWrongPrice">
				<div class="wrongPrice">
					{{alertmessage}}<span v-if="alertmessage == '出价应该高于领先价格！'">最新领先价:{{loadMoreArr[0].auctionPrice}}元</span>
				</div>
				<div class="priceGray"></div>
				<div class="knowPrice" @click="exitalert()">
					知道了
				</div>
			</div>
		</div>
	<!-- 弹出是否一口价 -->
		<div id="fixednumMain" v-if="isendPrice">
			<div @click="closeshowalert()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="alertWrongPrice">
				<div class="verifySold" @click="confirmprice(oneprice)">
					按一口价出价
				</div>
				<div class="priceGray"></div>
				<div class="cancelSold" @click="closeshowalert()">
					取消
				</div>
			</div>
		</div>
	<!-- 弹出出价错误提示框 -->
		<div id="fixednumMain" v-if="wrongPrice">
			<div @click="closeshowalert()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="alertWrongPrice">
				<div class="wrongPrice">
					价格输入错误！
				</div>
				<div class="priceGray"></div>
				<div class="knowPrice" @click="closeshowalert()">
					知道了
				</div>
			</div>
		</div>
	<!-- 弹出是否下架 -->
		<div id="fixednumMain" v-if="issoldOut">
			<div @click="closeshowalert()" class="fixednumMask" style="opacity: 0.38;">
			</div>
			<div class="alertWrongPrice">
				<div class="verifySold" @click="verifySoldOut">
					确认下架
				</div>
				<div class="priceGray"></div>
				<div class="cancelSold" @click="closeshowalert()">
					取消
				</div>
			</div>
		</div>
	<!-- 是否弹出验证 -->
    <div id="fixednumMain" v-if="showveri">
      <div @click="closeshowveri()" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="telsharesomething">
        <form class="main">
          <div class="list">
            <div class="list-detail">
              <p>手机号</p>
              <input autofocus type="text" v-model="phone" placeholder="输入手机号" pattern="[0-9]*"/>
              <span @click="filterNum()">{{msg}}</span>
            </div>
          </div>
          <div class="list">
            <div class="list-detail">
              <p>验证码</p>
              <input type="text" v-model="numveri" placeholder="输入验证码" pattern="[0-9]*"/>
            </div>
          </div>
          <div class="mobileAlert">{{mobileAlert}}</div>
          <div class="sub">
            <span :class="numveri==''?'spanBac':'spanBack'" @click="subMethod()">下一步</span>
          </div>
        </form>
      </div>
    </div>
    <!-- 二维码图片 -->
    <div class = "imageMask" v-if="isImagePreview" @click.stop="closeMask">
      <div class = "imagePreviews">
        <img :src="previewImg[0]" alt="">
      </div>
    </div>
    <!-- PC端图片预览 -->
    <div class="pcPreview" v-if="pcPreview">
      <div class="imgLists">
        <div class="close" @click.stop="closePcPreview"></div>
        <p class="status">{{imgIndex + '/' + urls.length}}</p>
        <div class="left" @click.stop="imgPage('prev')"><i class="iconfont icon-zuojiantou"></i></div>
        <div class="right" @click.stop="imgPage('next')"><i class="iconfont icon-zuojiantou"></i></div>
        <div class="imgMain">
          <div class="imgItem" v-for="(item,index) in urls" :key="index" v-show="imgIndex == index+1">
            <img :src="item" alt="">
          </div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
import { Toast, ImagePreview } from 'vant'
import wx from 'weixin-js-sdk'
import assign from '../../assets/js/assign.js'
import {
  usermsg,
  shopFocus,
  shopCancel,
  auctionFocus,
  auctionAddPrice,
  getShopList,
  singledown,
  commodityDetailsQRCode,
  filterNum,
  subMethod
} from '../../api/api'
import {
  AlertModule,
  Alert,
  Group,
  XSwitch,
  Cell,
  TransferDomDirective as TransferDom
} from 'vux'
import ClipboardJS from 'clipboard'
import { posix } from 'path'
export default {
  mixins: [assign],
  directives: {
    TransferDom
  },
  components: {
    Alert,
    Group,
    XSwitch,
    Cell
  },
  data () {
    return {
      filterTime: '60',
      msg: '获取验证码',
      flag: true, // 获取验证码开关
      phone: '', // 发送短信手机号码
      type: '2', // 获取验证码类型
      _key: '', // 获取到的验证码
      numveri: '', // 输入的验证码
      mobileVeri: false,
      mobile_edit: '',
      mobileAlert: '',
      showveri: false,
      isendPrice: false,
      issoldOut: false,
      shop: [],
      userMsg: [], // 用户信息
      shopList: [], // 店铺拍品
      sale: { priceList: {} }, // 拍品信息
      article_id: '', // 产品id
      sellerId: '', // 用户id
      bid: false, // 是否点击出价
      offerPrice: [], // 出价
      lastofferPrice: '0', // 显示在上面的出价
      toendhour: '00',
      toendminite: '00',
      toendsecond: '00',
      tostahour: '00',
      tostamin: '00',
      tostasec: '00',
      show: false,
      month: '',
      day: '',
      endhour: '',
      endminite: '',
      idSubmit: '',
      oneprice: '',
      sharetosom: false,
      openerweima: false,
      isFirstPrice: 0,
      bidLeaderClass: 'bidLeader',
      bidOutClass: 'bidOut',
      bidDownClass: 'successdown',
      logListlength: 0,
      successdownClass: 'successdown',
      haveend: true,
      havepaimaiend: false,
      fixedPriceClass: 'fixedPrice',
      fixedPricemClass: 'fixedPricem',
      confirmBtnmClass: 'confirmBtnm',
      confirmBtnClass: 'confirmBtn',
      graysomethingClass: 'graysomething',
      nameClass: 'name',
      bidTimeClass: 'bidTime',
      imggrayClass: 'imggray',
      showalert: false,
      alertmessage: '',
      sellerdesc: '',
      Desc: '',
      wrongPrice: false,
      isShowMore: false,
      isclickClose: false,
      uri: '',
      likeList: [],
      logLists: [
        // 本地等级图片
        require('../../assets/images/icon_head_commoner.png'),
        require('../../assets/images/icon_head_childvoice.png'),
        require('../../assets/images/icon_head_scholar.png'),
        require('../../assets/images/icon_head_provincial.png'),
        require('../../assets/images/icon_head_shinshi.png'),
        require('../../assets/images/icon_head_master.png'),
        require('../../assets/images/icon_head_bachelor.png'),
        require('../../assets/images/icon_head_surname.png'),
        require('../../assets/images/icon_head_grandpreceptor.png'),
        require('../../assets/images/icon_head_oracle.png')
      ],
      yikoujiaEnd: '',
      render: 0,
      num: 0,
      endTime: '',
      timer: '',
      shows: false,
      text: '',
      hasmobile: '',
      flagChange: false,
      lasttwoShow: false,
      sendPriceFlag: false,
      previewImg: [],
      isPlay: true,
      videoImg: '', // 视频封面
      videoUrl: '',
      current: '',
      urls: [],
      isLoadMore: false, // 加载更多是否展示
      loadMoreArr: [], // 出价展示
      pageNum: 1, // 当前加载的出价次数
      sellerName: '',
      starttimer: '',
      startTime: '',
      isImagePreview: false, // 图片预览
      isVideo: true,
      cursor1: false,
      auctionFocusFlag: true,
      imgIndex: 0, // PC预览图片的页码
      pcPreview: false,
      status: true // 是否执行后退刷新事件
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.name == 'tangkaArtExhibition') {
      this.status = false
    }
    next()
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  methods: {
    // 关闭PC端图片预览
    closePcPreview () {
      this.pcPreview = false
    },
    // 切换预览图片
    imgPage (info) {
      if (info == 'prev') {
        if (this.imgIndex == 1) {
          this.imgIndex = this.urls.length
        } else {
          this.imgIndex--
        }
      } else {
        if (this.imgIndex == this.urls.length) {
          this.imgIndex = 1
        } else {
          this.imgIndex++
        }
      }
    },
    // 全屏
    FullScreen (video) {
      var ele = document.documentElement
      if (ele.requestFullscreen) {
        video.requestFullscreen()
      } else if (ele.mozRequestFullScreen) {
        video.mozRequestFullScreen()
      } else if (ele.webkitRequestFullScreen) {
        video.webkitRequestFullScreen()
      }
    },
    // 取消全屏
    cancelFullScreen () {
      var de = document
      if (de.exitFullscreen) {
        document.exitFullscreen()
      } else if (de.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (de.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    },
    localSet (bool, id) {
      if (bool) {
        this.$router.push('/storeIntroduced/' + id)
      } else {
        this.$router.push('/member/fansDetails/' + id)
      }
    },
    // 显示光标
    showcursor () {
      this.cursor1 = true
    },
    // 关闭预览遮罩
    closeMask () {
      this.isImagePreview = false
      this.isVideo = true
    },
    // 加载更多
    loadMore () {
      let num = this.sale.logList.length
      let arr = this.sale.logList.slice(
        this.pageNum * 5,
        (this.pageNum + 1) * 5
      )
      if (arr.length >= 5 && (this.pageNum + 1) * 5 < num) {
        this.loadMoreArr.push(...arr)
        this.pageNum++
      } else {
        this.loadMoreArr.push(...arr)
        this.isLoadMore = false
      }
    },
    toStoreGo (id, name) {
      this.$router.push('/storeHome/' + id)
      // localStorage.setItem("name", name);
    },
    // 视频点击播放
    play () {
      let video = document.querySelector('video')
      this.isPlay = false
      video.play()
      if (this.isPC()) {
        this.FullScreen(video)
      }
    },
    // 视频终止
    pause (e) {
      this.isPlay = true
    },
    // 视频播放完成
    ended () {
      this.isPlay = true
      this.cancelFullScreen()
    },
    // 获取验证码
    filterNum () {
      let _this = this
      let nowTime = new Date()
      let now = Math.floor(nowTime.getTime() / 1000)

      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(_this.phone)) {
        alert('请输入正确的手机号')
        return false
      }
      if (
        this.mobile_edit != '' &&
        Math.floor(this.mobile_edit) + 86400 * 7 > now
      ) {
        this.mobileAlert = '号码一周只可修改一次'
      } else {
        if (_this.flag == true) {
          _this.flag = false
          let t = setInterval(function () {
            _this.filterTime--
            if (_this.filterTime <= 0) {
              clearInterval(t) // 当倒计时时间小于0时，清除时间函数并且将时间开关打开
              _this.flag = true
              _this.msg = '获取验证码'
            } else {
              _this.msg = '重新发送(' + _this.filterTime + ')' // 返回最初状态；
            }
          }, 1000)
          _this.filterTime = '60'

          let params = {
            phone: _this.phone,
            type: '1'
          }
          filterNum(params)
            .then(function (res) {
              _this._key = res.data.key
            })
            .catch(function (err) {
              Toast(err.data.message)
            })
        }
      }
    },
    // 手机号绑定
    subMethod: function () {
      if (this.Trim(this.phone, 'g') == '') {
        Toast('手机号不能为空')
        return
      }
      if (this.Trim(this.numveri, 'g') == '') {
        Toast('请正确输入你收到的验证码')
        return
      }
      if (!this._key) {
        Toast('请先获取验证码')
        return
      }
      let params = {
        verification_key: this._key,
        verification_code: this.numveri,
        type: '1'
      }
      subMethod(params)
        .then(res => {
          this.showveri = false
          Toast('恭喜您绑定成功')
          this.usermsg()
        })
        .catch(function (err) {
          Toast(err.data.message)
        })
    },
    closeshowveri () {
      this.showveri = false
      this.mobileAlert = ''
    },
    // 群发通知
    NotificationsOfGroupHair () {
      this.$router.push('/sellerCenter/groupsentMessage')
    },
    // 确认下架
    verifySoldOut () {
      let downid = this.$route.params.id
      if (!this.flagChange) {
        this.flagChange = true
        singledown(downid)
          .then(res => {
            if (res.code == 200) {
              this.$router.push('/newStoreManage/drafts')
              this.flagChange = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 下架弹框
    soldOutBtn () {
      this.issoldOut = true
    },
    // 展示更多
    showMore () {
      this.likeList = this.sale.likeList
      this.isShowMore = false
      this.isclickClose = true
    },
    // 点击收起
    clickClose () {
      this.likeList = this.sale.likeList.slice(0, 20)
      this.isShowMore = true
      this.isclickClose = false
    },
    clearPrice () {
      this.lastofferPrice = '0'
      this.lasttwoShow = false
    },
    pupPic (index) {
      if (this.sale.disk == '1') {
        this.current = this.sale.imgList[index]
        this.urls = this.sale.imgList
      } else {
        this.current = this.sale.imgList[index].substring(
          0,
          this.sale.imgList[index].length - 6
        )
        this.urls = this.sale.imgList.map(item => {
          let coverUrl = item.substring(0, item.length - 6)
          return coverUrl
        })
      };
      let ua = window.navigator.userAgent.toLowerCase()
      if (this.isPC()) {
        this.pcPreview = true
        this.imgIndex = index + 1
      } else {
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          wx.previewImage({
            current: this.current, // 当前显示图片的http链接
            urls: this.urls // 需要预览的图片http链接列表
          })
        } else {
          ImagePreview(this.urls, index)
        }
      }
    },
    refreshnow (id) {
      this.$router.push('/auction/' + id)
      window.location.reload()
    },
    // 更新
    refreshLikeBox () {
      // this.usermsg();
      this.article_id = this.$route.params.id
      usermsg(this.article_id)
        .then(res => {
          // Toast("更新成功");
          Toast.loading({
            duration: 1000, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: '更新成功'
          })
          this.sale.likenum = res.data.sale.likenum
          // if (this.sale.likenum != "0") {
          //   this.sale.isLiked = true;
          // }
          this.sale.logList = res.data.sale.logList
          this.timetoend(res.data.sale.endTime)
          this.Kaitimetoend(res.data.sale.open_time)
          if (res.data.sale.likeList.length > 20) {
            this.isShowMore = true
            this.isclickClose = false
            this.likeList = res.data.sale.likeList.slice(0, 20)
          } else {
            this.likeList = res.data.sale.likeList
          }
          // 判断当前出价个数 决定是否展示更多
          if (res.data.sale.logList.length > 5) {
            this.isLoadMore = true
            this.loadMoreArr = res.data.sale.logList.slice(0, 5)
          } else {
            this.loadMoreArr = res.data.sale.logList
          }
        })
        .catch(err => {})
    },

    // getShopList 当前ID，当前用户ID
    getShopList (auctionId, sellerId) {
      getShopList(auctionId, sellerId).then(res => {
        this.shopList = res.data
      })
    },

    // 获取用户信息
    usermsg (type) {
      this.article_id = this.$route.params.id
      usermsg(this.article_id)
        .then(res => {
          if (res.code == 200) {
            let data = res.data
            this.endTime = data.sale.endTime
            this.startTime = data.sale.open_time
            this.hasmobile = data.shop.mobile
            this.videoUrl = data.sale.videoUrl
            this.Kaitimetoend(this.startTime)
            if (this.videoUrl) {
              this.videoImg = this.videoUrl + '?vframe/jpg/offset/1'
            }
            if (this.num === 0) {
              data.share.id = data.sale.uri
              this.goShares(data.share)
              this.num++
            }
            this.yikoujiaEnd = res.data.sale.yikoujiaEnd
            if (this.yikoujiaEnd == '1') {
              this.haveend = false
              this.havepaimaiend = true
              let oneDownTime = res.data.sale.logList[0].addTime
              this.month = oneDownTime.slice(5, 7)
              this.day = oneDownTime.slice(8, 10)
              this.endhour = oneDownTime.slice(11, 13)
              this.endminite = oneDownTime.slice(14, 16)
              if (type !== 'auctionFocus') {
                this.uri = data.sale.uri
                this.userMsg = data.shop
                this.sellerName = data.shop.sellerName
                this.sale = data.sale
                this.sellerId = data.shop.sellerId
                this.oneprice = data.sale.priceList.yikoujia
                this.logListlength = data.sale.logList.length
                this.sellerdesc = data.sale.desc.replace(/\n/g, '<br/>')
                this.getShopList(this.article_id, this.sellerId)
                // this.$refs.describe.innerHTML = data.sale.desc
                if (this.sale.logList == '') {
                  if (parseInt(this.sale.priceList.firstprice) > 0) {
                    this.lastofferPrice = parseInt(
                      this.sale.priceList.firstprice
                    )
                  } else {
                    this.lastofferPrice =
                      parseInt(this.sale.priceList.addprice) +
                      parseInt(this.sale.priceList.firstprice)
                  }
                } else {
                  this.lastofferPrice =
                    parseInt(this.sale.priceList.leadIngPrice) +
                    parseInt(this.sale.priceList.addprice)
                }
              } else {
                this.sale.likenum = res.data.sale.likenum
                this.sale.isLiked = true
                this.sale.logList = res.data.sale.logList
              }
            } else {
              this.haveend = true
              this.havepaimaiend = false
              if (type !== 'auctionFocus') {
                this.uri = data.sale.uri
                this.userMsg = data.shop
                this.sellerName = data.shop.sellerName
                this.sale = data.sale
                this.sellerId = data.shop.sellerId
                this.oneprice = data.sale.priceList.yikoujia
                this.logListlength = data.sale.logList.length
                this.timetoend(this.endTime)
                this.sellerdesc = data.sale.desc.replace(/\n/g, '<br/>')
                this.getShopList(this.article_id, this.sellerId)
                if (this.sale.logList == '') {
                  if (parseInt(this.sale.priceList.firstprice) > 0) {
                    this.lastofferPrice = parseInt(
                      this.sale.priceList.firstprice
                    )
                  } else {
                    this.lastofferPrice =
                      parseInt(this.sale.priceList.addprice) +
                      parseInt(this.sale.priceList.firstprice)
                  }
                } else {
                  this.lastofferPrice =
                    parseInt(this.sale.priceList.leadIngPrice) +
                    parseInt(this.sale.priceList.addprice)
                }
                // this.$refs.describe.innerHTML = data.sale.desc
              } else {
                this.sale.likenum = res.data.sale.likenum
                this.sale.isLiked = true
                this.sale.logList = res.data.sale.logList
              }
            }
            if (res.data.sale.likeList.length > 20) {
              this.isShowMore = true
              this.likeList = res.data.sale.likeList.slice(0, 20)
              return
            }
            this.likeList = res.data.sale.likeList
            // 判断当前出价个数 决定是否展示更多
            if (data.sale.logList.length > 5) {
              this.isLoadMore = true
              this.loadMoreArr = data.sale.logList.slice(0, 5)
            } else {
              this.loadMoreArr = data.sale.logList
            }
          }
          // 加载二维码
          commodityDetailsQRCode(this.article_id)
            .then(res => {
              this.previewImg.push(res.data.url)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          if (error.status == 404) {
            this.$router.push('/auctionErr')
          }
        })
    },
    exitalert () {
      this.showalert = false
    },
    closeshowalert () {
      this.showalert = false
      this.wrongPrice = false
      this.issoldOut = false
      this.isendPrice = false
      this.bid = false
    },
    // 打开二维码
    erweima () {
      this.sharetosom = false
      this.isImagePreview = true
      this.isVideo = false
    },
    // 复制链接
    copyLink () {
      if (!document.execCommand) {
        Toast('请手动复制链接')
      } else {
        let result = document.execCommand('copy')
        if (result) {
          Toast('复制成功')
        } else {
          Toast('复制失败 请手动复制链接')
        }
        this.sharetosom = false
      }
    },
    // 关闭
    closeshare () {
      this.sharetosom = false
    },
    // 分享
    share () {
      this.sharetosom = true
    },
    // 关注
    attention () {
      let _this = this
      shopFocus(_this.sellerId)
        .then(function (res) {
          _this.userMsg.isAttention = true
        })
        .catch(function (error) {})
    },
    // 取消关注
    cancelattention () {
      let _this = this
      shopCancel(_this.sellerId)
        .then(function (res) {
          _this.usermsg()
          // _this.sale.isLiked = false;
        })
        .catch(function (error) {})
    },
    // 点赞
    auctionFocus () {
      if (this.auctionFocusFlag) {
        this.auctionFocusFlag = false
        if (this.sale.isLiked) {
          return
        }
        auctionFocus(this.article_id)
          .then(res => {
            this.auctionFocusFlag = true
            this.sale.likenum = Number(this.sale.likenum) + 1
            this.sale.isLiked = true
            this.sale.likeList = this.sale.likeList.unshift({
              headimgurl: res.data.avatar,
              userId: res.data.user_id
            })
            this.attention()
          })
          .catch(error => {})
      }
    },
    // 一口价
    auctionAddPrice () {
      setTimeout(() => {
        this.lastofferPrice = this.sale.priceList.yikoujia
        this.lasttwoShow = true
      }, 360)
    },
    // 判断是否一口价结束
    yiKouJiaEnd (e, downTime) {
      if (e == '1') {
        this.haveend = false
        this.havepaimaiend = true
        let oneDownTime = downTime
        this.month = oneDownTime.slice(5, 7)
        this.day = oneDownTime.slice(8, 10)
        this.endhour = oneDownTime.slice(11, 13)
        this.endminite = oneDownTime.slice(14, 16)
      } else {
        this.haveend = true
        this.havepaimaiend = false
      }
    },
    // 出价
    confirmprice (price) {
      let params = {
        auction_price: price
      }
      if (!this.sendPriceFlag) {
        this.sendPriceFlag = true
        let reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/
        if (reg.test(price)) {
          auctionAddPrice(params, this.article_id)
            .then(res => {
              this.sendPriceFlag = false
              if (res.code == 200) {
                this.timetoend(res.data.endtime)
                this.usermsg()
                this.alertmessage = res.message
                this.bid = false
                this.isendPrice = false
                if (res.data.isFirstPrice == '1') {
                  this.show = false
                  let ymd = this.timestampToTimeYMD(res.data.time)
                  this.sale.logList = this.sale.logList.push(res.data)
                  this.yiKouJiaEnd(res.data.isFirstPrice, ymd)
                }
              } else if (res.code == 201) {
                this.$router.push({
                  path: '/payment/cashDepositPay',
                  query: { auction_id: this.uri, type: '0', price: price }
                })
              } else if (res.code == 202) {
                this.$router.push({
                  path: '/payment/cashDepositPay',
                  query: { auction_id: this.uri, type: '1', price: price }
                })
              } else {
                this.bid = false
                this.alertmessage = res.message
                this.showalert = true
                this.usermsg()
              }
            })
            .catch(err => {
              this.isendPrice = false
              if (err.data.code == 422) {
                this.sendPriceFlag = false
                this.bid = false
                this.showalert = true
                this.alertmessage = err.data.message
              }
              if (err.data.code == 403) {
                Toast.loading({
                  duration: 5000, // 持续展示 toast
                  forbidClick: true, // 禁用背景点击
                  message: err.data.message
                })
                // Toast(err.data.message)
                this.sendPriceFlag = false
                this.bid = false
                this.showveri = true
              }
            })
        } else {
          this.bid = false
          this.wrongPrice = true
          this.sendPriceFlag = false
        }
      }
    },
    // 开拍倒计时
    Kaitimetoend (starttime) {
      let self = this
      clearInterval(this.starttimer)
      this.starttimer = setInterval(function () {
        let nowTime = new Date()
        let t = starttime - Math.floor(nowTime.getTime() / 1000)
        if (t > 0) {
          let stahour = Math.floor(t / 3600)
          let stamin = Math.floor((t / 60) % 60)
          let stasec = Math.floor(t % 60)
          stahour = stahour < 10 ? '0' + stahour : stahour
          stamin = stamin < 10 ? '0' + stamin : stamin
          stasec = stasec < 10 ? '0' + stasec : stasec
          if (stahour <= 0) {
            self.tostahour = '00'
          }
          if (stahour <= 0 && stamin <= 0) {
            self.tostahour = '00'
          }
          if (stamin <= 0) {
            self.tostamin = '00'
          }
          self.tostahour = stahour
          self.tostamin = stamin
          self.tostasec = stasec
        } else {
          clearInterval(this.starttimer)
          self.tostahour = '00'
          self.tostamin = '00'
          self.tostasec = '00'
          self.sale.isBeforehand = false
        }
      }, 1000)
    },
    // 进行倒计时
    timetoend (endtime) {
      let self = this
      clearInterval(this.timer)
      this.timer = setInterval(function () {
        let nowTime = new Date()
        let enddTime = new Date(endtime * 1000)
        let t = endtime - Math.floor(nowTime.getTime() / 1000)
        let month = enddTime.getMonth() + 1
        let day = enddTime.getDate()
        let endhour = enddTime.getHours()
        let endminite = enddTime.getMinutes()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        endhour = endhour < 10 ? '0' + endhour : endhour
        endminite = endminite < 10 ? '0' + endminite : endminite
        self.month = month
        self.day = day
        self.endhour = endhour
        self.endminite = endminite

        if (t > 0) {
          let hour = Math.floor(t / 3600)
          let min = Math.floor((t / 60) % 60)
          let sec = Math.floor(t % 60)
          hour = hour < 10 ? '0' + hour : hour
          min = min < 10 ? '0' + min : min
          sec = sec < 10 ? '0' + sec : sec
          if (hour <= 0) {
            self.toendhour = '00'
          }
          if (hour <= 0 && min <= 0) {
            self.toendhour = '00'
          }
          if (min <= 0) {
            self.toendminite = '00'
          }
          if (t <= 300) {
            self.show = true
          } else {
            self.show = false
          }
          self.toendhour = hour
          self.toendminite = min
          self.toendsecond = sec
        } else {
          clearInterval(this.timer)
          self.toendhour = '00'
          self.toendminite = '00'
          self.toendsecond = '00'
          self.haveend = false
          self.havepaimaiend = true
        }
      }, 1000)
    },
    // 点击出价打开键盘
    openkeyBoard () {
      this.cursor1 = false
      this.usermsg()
      if (this.sale.logList == '') {
        if (parseInt(this.sale.priceList.firstprice) > 0) {
          this.lastofferPrice = parseInt(this.sale.priceList.firstprice)
        } else {
          this.lastofferPrice =
            parseInt(this.sale.priceList.addprice) +
            parseInt(this.sale.priceList.firstprice)
        }
      } else {
        this.lastofferPrice =
          parseInt(this.sale.priceList.leadIngPrice) +
          parseInt(this.sale.priceList.addprice)
      }
      this.offerPrice = [...(this.lastofferPrice + '')]
      this.bid = true
    },
    // 关闭键盘
    closekeyBoard () {
      this.bid = false
      this.lasttwoShow = false
    },
    // 删除
    del () {
      this.offerPrice.pop()
      this.lastofferPrice = this.offerPrice.join('')
      this.lasttwoShow = false
    },
    // 按数字1
    oneClick () {
      this.offerPrice.push(1)
      this.lastofferPrice = this.offerPrice.join('')
      this.lasttwoShow = false
    },
    // 按数字2
    twoClick () {
      this.offerPrice.push(2)
      this.lastofferPrice = this.offerPrice.join('')
      this.lasttwoShow = false
    },
    // 按数字3
    threeClick () {
      this.offerPrice.push(3)
      this.lastofferPrice = this.offerPrice.join('')
      this.lasttwoShow = false
    },
    // 按数字4
    fourClick () {
      this.offerPrice.push(4)
      this.lastofferPrice = this.offerPrice.join('')
      this.lasttwoShow = false
    },
    // 按数字5
    fiveClick () {
      this.offerPrice.push(5)
      this.lastofferPrice = this.offerPrice.join('')
      this.lasttwoShow = false
    },
    // 按数字6
    sixClick () {
      this.offerPrice.push(6)
      this.lastofferPrice = this.offerPrice.join('')
      this.lasttwoShow = false
    },
    // 按数字7
    sevenClick () {
      this.offerPrice.push(7)
      this.lastofferPrice = this.offerPrice.join('')
      this.lasttwoShow = false
    },
    // 按数字8
    eightClick () {
      this.offerPrice.push(8)
      this.lastofferPrice = this.offerPrice.join('')
      this.lasttwoShow = false
    },
    // 按数字9
    nineClick () {
      this.offerPrice.push(9)
      this.lastofferPrice = this.offerPrice.join('')
      this.lasttwoShow = false
    },
    // 按数字00
    dblzeroClick () {
      if (this.lastofferPrice != '') {
        this.offerPrice.push('00')
        this.lastofferPrice = this.offerPrice.join('')
      }
      this.lasttwoShow = false
    },
    // 按数字0
    zeroClick () {
      if (this.lastofferPrice != '') {
        this.offerPrice.push(0)
        this.lastofferPrice = this.offerPrice.join('')
      }
      this.lasttwoShow = false
    }
    // 传名字
    // setTitle(name) {
    //   localStorage.setItem("name", name);
    // }
  },
  mounted () {
    window.scrollTo(0, 0)
    window.addEventListener('popstate', _ => {
      if (this.isIos() && this.status) {
        this.$router.go(0)
      }
    })
    // 复制功能
    this.text = location.href
    let clipboard = new ClipboardJS('#floleft')
    clipboard.on('success', e => {
      this.sharetosom = false
      Toast('复制成功')
    })
    clipboard.on('error', e => {
      Toast('复制失败 请手动复制')
      this.sharetosom = false
    })
    // 获取数据
    this.usermsg()
    let err = JSON.parse(sessionStorage.getItem('err'))
    if (err != null) {
      if (err.err == 'err') {
        this.alertmessage = err.errmsg
        this.showalert = true
        sessionStorage.setItem('err', '')
      }
    }
  }
}
</script>

<style>
#trump_main_unique_1 {
  width: 100% !important;
  height: 100% !important;
}
.onlyerweima .onlyerweimaimg div:first-child canvas {
  margin-top: 50%;
  transform: translateY(-50%);
}
.van-toast {
  font-size: 28px !important;
  text-align: center !important;
}
.van-loading {
  display: none !important;
}
.van-toast--default {
  padding: 0.1rem !important;
  min-height: 0.8rem !important;
  width: 3.8rem !important;
}
.van-toast--default .van-toast__text {
  padding-top: 0 !important;
  font-size: 28px !important;
}
</style>

<style scoped>
.pcPreview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 991;
  background: rgba(0, 0, 0, 0.1);
}
.pcPreview .imgLists {
  height: 90%;
  width: 70%;
  margin: 0 auto;
  background: #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 991;
}

.pcPreview .imgLists .close {
  position: absolute;
  top : -19px;
  right : -19px;
  background: url("../../../static/images/delete.png") center;
  height: 38px;
  width: 38px;
  z-index : 992;
  border-radius : 50%;
}

.pcPreview .imgLists p {
  position: absolute;
  bottom : 20px;
  left : 50%;
  transform : translateX(-50%);
  font-size: 1.4em;
  color : #fff;
  z-index : 992;
}

.pcPreview .imgLists .left,.pcPreview .imgLists .right {
  position: absolute;
  width : 80px;
  height : 80px;
  border : 1px solid rgba(255,255,255,.37);
  border-radius : 50%;
  top : 50%;
  transform : translateY(-50%);
  z-index : 999;
}

.pcPreview .imgLists .left {
  left : 20px;
}

.pcPreview .imgLists .right {
  right : 20px;
}

.pcPreview .imgLists i {
  color : #fff;
  font-size : 32px;
  position: absolute;
  top : 50%;
  left : 50%;
  transform : translate(-50%,-50%);
  margin : 0;
}

.pcPreview .imgLists .right i {
  transform : translate(-50%,-50%) rotate(180deg);
}

.pcPreview .imgLists .imgMain {
  width : 100%;
  height : 100%;
  overflow : hidden;
}

.pcPreview .imgLists .imgMain .imgItem {
  height : 100%;
}

.pcPreview .imgLists .imgMain .imgItem img {
  position: absolute;
  top : 50%;
  left : 50%;
  transform : translate(-50%,-50%);
  max-height : 100%;
  max-width : 100%;
}

.imageMask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  z-index: 999;
}
.imageMask .imagePreviews {
  width: 80%;
  height: 100%;
  position: absolute;
  top : 50%;
  left : 50%;
  transform: translate(-50%,-50%);
}
.imageMask .imagePreviews img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top : 50%;
  transform : translateY(-50%);
}
video {
  object-fit: fill;
}
.AsapSupA {
  overflow: hidden;
  margin-top: 30px;
}
.Asapsell {
  width: 220px;
  height: 80px;
  background: #fd8f01;
  color: white;
  font-size: 28px;
  text-align: center;
  line-height: 80px;
  border-radius: 10px;
  position: relative;
  float: left;
}
.Asapsell i {
  position: absolute;
  top: 30px;
  right: -5px;
  display: block;
  width: 15px;
  height: 16px;
  background-color: #fd8f01;
  -webkit-transform: rotate(45deg);
}
.SupAndShoot {
  width: 640px;
  height: 80px;
  background: #9e2026;
  color: white;
  font-size: 28px;
  text-align: center;
  line-height: 80px;
  border-radius: 10px;
  float: left;
  margin-left: 30px;
}
.videoBox {
  position: relative;
}
.videoBox img {
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.telsharesomething {
  position: fixed;
  left: 5%;
  top: 35%;
  z-index: 1100;
  width: 90%;
  height: 400px;
  background: white;
  text-align: center;
  border-radius: 10px;
  padding-top: 20px;
}
.telsharesomething .main {
  overflow: hidden;
  margin-top: 0;
}
.telsharesomething .sub {
  height: 88px;
  margin-top: 50px;
  padding: 0 30px;
}
.telsharesomething .sub span {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 88px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  font-size: 28px;
}
.telsharesomething .sub .spanBac {
  background: #d2d2d2;
}
.telsharesomething .sub .spanBack {
  background: #9e2026;
}
.telsharesomething .main .list {
  background-color: #fff;
  padding-left: 30px;
  height: 100px;
}
.telsharesomething .main .list.last .list-detail {
  border-bottom: none;
}
.telsharesomething .main .list .list-detail {
  border-bottom: 1px solid #d2d2d2;
  box-sizing: border-box;
  height: 101px;
  width: 100%;
  float: left;
  position: relative;
}
.telsharesomething .main .list p {
  line-height: 100px;
  width: 160px;
  color: #000;
  font-size: 28px;
  float: left;
}
.telsharesomething .main .list input {
  display: block;
  width: 75%;
  height: 90px;
  margin-top: 5px;
  color: #999;
  font-size: 24px;
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  float: left;
}
.telsharesomething .main .list .list-detail span {
  display: block;
  width: 174px;
  height: 60px;
  border-radius: 30px;
  background-color: #9e2026;
  line-height: 60px;
  text-align: center;
  color: #fff;
  position: absolute;
  right: 30px;
  top: 0;
  bottom: 0;
  margin: auto;
}
.mobileAlert {
  text-align: center;
  margin-top: 5px;
  color: #f15511;
}
#fixednumMain {
  width: 100%;
}
.decollator {
  position: absolute;
  width: 2px;
  height: 40px;
  right: 0;
  top: 50%;
  border-right: 1px solid #d2d2d2;
  transform: translateY(-50%);
}
.likeAvatar.showMore,
.likeAvatar.clickClose {
  text-align: center !important;
  line-height: 0.65rem !important;
  box-sizing: border-box;
  border: 1px solid #999; /*no*/
}
.iconfont {
  color: #999;
  font-size: 30px;
}
.articleDetails {
  background-color: #ededef;
  max-width: 750px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.articleDetails .header {
  width: 100%;
  position: relative;
  height: 2.1rem;
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
}
.articleDetails .header .avatar {
  margin: 26px 26px 30px 30px;
  height: 127px;
  padding: 0.05rem;
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
.border.verticalRight:after {
  top: 0;
  right: 0;
}
.border.horizonTop:after,
.border.horizonBottom:after {
  position: absolute;
  width: 109%;
  height: 0.026667rem;
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
  left: -5%;
  border-top: 1px solid #d9d9d9; /*no*/
  content: "";
}
.articleDetails .saleInfo .bidBtns {
  width: 100%;
  display: table;
  cursor: pointer;
  position: relative;
}
.articleDetails .saleInfo .bidBtns .bidBtns .saleEndBtn {
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
  font-weight: 700;
}
.articleDetails .header .shopInfo .verified {
  line-height: 0.5rem;
  float: left;
}
.articleDetails .saleInfo .countdownTip {
  float: right;
  clear: both;
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  color: #999;
}
.articleDetails .header .shopInfo .userattr {
  width: 100%;
  height: 0.6rem;
  margin-top: 10px;
  overflow: hidden;
}
.articleDetails .header .shopInfo .name .sellerLevel {
  margin-right: 10px;
}
.sellerLevel.V0,
.V0 {
  background-position: 0 -1px;
}
.sellerLevel.V1,
.V1 {
  background-position: 0 -33px;
}
.sellerLevel.V2,
.V2 {
  background-position: 0 -64px;
}
.sellerLevel.V3,
.V3 {
  background-position: 0 -96px;
}
.sellerLevel.V4,
.V4 {
  background-position: 0 -128px;
}
.sellerLevel.V5,
.V5 {
  background-position: 0 -160px;
}
.sellerLevel.V6,
.V6 {
  background-position: 0 -193px;
}
.sellerLevel.V7,
.V7 {
  background-position: 0 -224px;
}
.sellerLevel.V8,
.V8 {
  background-position: 0 -255px;
}
.sellerLevel.V9,
.V9 {
  background-position: 0 -290px;
}
.sellerLevel.V10,
.V10 {
  background-position: 0 -322px;
}
.sellerLevel.V11,
.V11 {
  background-position: 0 -354px;
}
.sellerLevel.V12,
.V12 {
  background-position: 0 -386px;
}
.sellerLevel.V13,
.V13 {
  background-position: 0 -420px;
}
.sellerLevel.V14,
.V14 {
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
.articleDetails .header .shopInfo .userattr .item,
.articleDetails .header .shopInfo .userattr .item span {
  float: left;
}
.articleDetails .header .shopInfo .userattr .item .starLevel {
  line-height: 0.35rem;
}
.articleDetails .header .shopInfo .userattr .item span:last-child {
  line-height: 0.35rem;
}
.articleDetails .header .shopInfo .userattr .item {
  margin-right: 20px;
  line-height: 0.35rem;
}
.articleDetails .header .shopInfo .userattr .txt {
  display: inline-block;
  color: #999;
  font-size: 24px;
  margin-left: 8px;
}
.articleDetails .setup .icon-renzhengyonghu,
.articleDetails .setup .icon-anquanbaozhang {
  color: #ffac00;
  margin: 0;
}
.articleDetails .nosetup .icon-renzhengyonghu,
.articleDetails .nosetup .icon-anquanbaozhang {
  color: #999;
  margin: 0;
}
.articleDetails .saleInfo .likeIt .icon-xin3,
.articleDetails .saleInfo .likeIt .icon-xin1 {
  font-size: 32px;
  line-height: 0.9rem;
  transform: translateY(3%);
}
.articleDetails .icon-xingxing2 {
  color: #ffac00;
  margin: 0;
}
.articleDetails .sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.articleDetails .operation {
  width: 100%;
  overflow: hidden;
}
.articleDetails .operation .attention {
  width: 100px;
  height: 33px;
  line-height: 33px;
  border-radius: 2px;
  border: 1px solid #f15511; /*no*/
  text-align: center;
  float: left;
  margin-right: 20px;
}
.articleDetails .operation .attention span {
  font-size: 20px;
  color: #f15511;
}
.articleDetails .operation .private {
  width: 100px;
  height: 33px;
  line-height: 33px;
  border-radius: 2px;
  border: solid 1px #13b0fd; /*no*/
  text-align: center;
  float: left;
}
.articleDetails .operation .private span {
  font-size: 20px;
  color: #13b0fd;
}
.articleDetails .signature {
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  padding-left: 30px;
  padding-top: 16px;
  padding-bottom: 20px;
  /* margin-bottom: 10px;*/
}
.articleDetails .signature i {
  display: block;
  height: 50px;
  width: 90%;
  color: #999999;
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.articleDetails .saleInfo {
  padding: 30px 30px 1.333rem 30px;
  -moz-box-sizing: border-box; /*Firefox3.5+*/
  -webkit-box-sizing: border-box; /*Safari3.2+*/
  -o-box-sizing: border-box; /*Opera9.6*/
  -ms-box-sizing: border-box; /*IE8*/
  box-sizing: border-box;
  background-color: #fff;
}
.articleDetails .saleInfo .desc {
  font-family: PingFang-SC-Medium;
  font-size: 15px;
  line-height: 44px;
  color: #000;
  font-size: 28px;
  overflow-y: hidden;
  word-break: break-word;
  /*margin-bottom: 20px;*/
  /*overflow: hidden;*/
  /*text-overflow:ellipsis;*/
  white-space: wrap;
}
.articleDetails .saleInfo .nickname .desc {
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
  background-color: #ccc;
}
.articleDetails .saleInfo .imgList {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  margin-bottom: 10.2px;
  margin-right : 10.2px;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.articleDetails .saleInfo .imgList > div:nth-child(3n) {
  margin-right : 0;
}
.articleDetails .saleInfo .imgList > div video {
  width: 100%;
  height: 100%;
}
.articleDetails .saleInfo .imgList > div:last-child {
  max-width: 10rem;
  max-height: 10rem;
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
  opacity: 0.5;
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
  height: 1.1rem;
  line-height: 76px;
  position: relative;
}
.articleDetails .saleInfo .createTime::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 104%;
  left: 0;
}
.articleDetails .saleInfo .stateInfo.hide {
  display: none;
}

.articleDetails .saleInfo .createTime .freePost {
  height: 36px;
  width: 73px;
  border: 1px solid #fd8f01; /*no*/
  text-align: center;
  line-height: 0.5rem;
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
  margin: 0.21rem 10px 20px 0;
}

.articleDetails .saleInfo .createTime .time {
  float: right;
  color: #999999;
  font-size: 24px;
}

.articleDetails .saleInfo .toolBox {
  color: #999;
  display: table;
  width: 100%;
  height: 72px;
  line-height: 72px;
}
.articleDetails .saleInfo .toolBox .time {
  float: left;
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
  margin: 0 2px 0 0;
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
  margin-left: 30px;
  color: #999;
}
.articleDetails .icon-bao,
.articleDetails .icon-qi,
.articleDetails .icon-jia {
  font-size: 32px;
  margin: 0;
}
.articleDetails .saleInfo .shareIt {
  color: #333;
}
.articleDetails .icon-huo {
  color: #f15511;
}
.articleDetails .saleInfo .likeIt i,
.articleDetails .saleInfo .popularity i,
.articleDetails .saleInfo .shareIt i {
  font-size: 38px;
  height: 72px;
  line-height: 72px;
  margin: 0;
}
.saleInfo .shareIt i {
  color: #666;
}
.articleDetails .saleInfo .likeIt i {
  color: #f15511;
}
.articleDetails .saleInfo .likeIt:hover,
.articleDetails .saleInfo .popularity:hover,
.articleDetails .saleInfo .shareIt:hover {
  opacity: 0.9;
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
.articleDetails .saleInfo .shareIt span {
  color: #333;
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
  padding: 10px;
  text-align: center;
  background-color: #f4f4f4;
  box-sizing: border-box;
}
.articleDetails .saleInfo .likeBox:after {
  position: absolute;
  width: 17px;
  height: 17px;
  content: "";
  transform: rotate(45deg);
  top: -8.5px;
  border-left: 1px solid #f4f4f4; /*no*/
  border-top: 1px solid #f4f4f4; /*no*/
  background-color: #f4f4f4;
  right: 1.6rem;
  border-radius: 5px;
}
.articleDetails .saleInfo .likeBox .likeAvatar {
  float: left;
  height: 70px;
  width: 9%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  margin-right: 1.1%;
  margin-bottom: 7.25px;
}
.articleDetails .saleInfo .likeBox .likeAvatar:nth-child(10n) {
  margin-right: 0;
}

.articleDetails .saleInfo .tmpLikeBox {
  display: none;
}
.articleDetails .saleInfo .stateInfo .state {
  position: relative;
  float: left;
  color: #fff;
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
  color: #fff;
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
.articleDetails
  .saleInfo
  .stateInfo
  .endTime
  .saleInfo
  .stateInfo
  .endTime
  span {
  font-size: 24px;
}
.articleDetails .saleInfo .stateInfo .endTime i {
  color: #9e2026;
  padding: 0 4px;
  font-size: 32px;
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
  bottom: 109%;
  border-radius: 8px;
  color: #ffffff;
  padding: 0.2rem;
}
.articleDetails .saleInfo .bidBtns .bidTips .close {
  position: absolute;
  top: 0.08rem;
  right: 0.16rem;
  font-size: 20px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.articleDetails .saleInfo .bidBtns .bidTips .title {
  line-height: 1.2;
  font-size: 0.28rem;
  font-weight: bold;
}
.articleDetails .saleInfo .bidBtns .bidTips .desc {
  padding-top: 0.15rem;
  font-size: 0.28rem;
  line-height: 1.2;
  margin: 0;
}
.articleDetails .saleInfo .bidBtns .bidTips .arrow-down {
  position: absolute;
  left: 0.6rem;
  top: 100%;
  width: 0;
  height: 0;
  border-left: 0.18rem solid transparent;
  border-right: 0.18rem solid transparent;
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
  opacity: 0.6;
}
.articleDetails .saleInfo .bidList {
  width: 99.6%;
  background: #f4f4f4;
  position: relative;
}
.articleDetails .saleInfo .bidList .ddli {
  position: relative;
  border-bottom: 1px solid #d2d2d2;
  width: 96%;
  height: 113px;
  margin: 0 22px 0 15px;
  padding: 15px 0px 15px 0px;
  overflow: hidden;
}
.articleDetails .saleInfo .bidList .LoadMore {
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
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
.imggray {
  position: relative;
  /* -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
      -ms-filter: grayscale(100%);
      -o-filter: grayscale(100%);
      filter: grayscale(100%);
      filter: gray; */
}
.imggray::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.articleDetails .saleInfo .bidList .ddli .state .bidState {
  width: 220px;
  padding-bottom: 30px;
}
.articleDetails .saleInfo .bidList .ddli .state .bidState span {
  display: block;
  width: 220px;
}
.articleDetails .saleInfo .bidList .ddli .state .bidState .bidsuccess {
  height: 55px;
  width: 220px;
  display: block;
  margin-top: -2px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: right center;
  background-image: url("");
}
.articleDetails .saleInfo .bidList .ddli .state .bidState .bidOut {
  height: 55px;
  width: 220px;
  display: block;
  margin-top: -2px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: right center;
  background-image: url("../../assets/images/out.png");
}
.articleDetails .saleInfo .bidList .ddli .state .bidState .bidLeader {
  height: 60px;
  width: 220px;
  display: block;
  margin-top: -2px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: right center;
  background-image: url("../../assets/images/leader.png");
}
.articleDetails .saleInfo .bidList .ddli .state .bidState .successdown {
  height: 60px;
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
.articleDetails .saleInfo .bidList .ddli .avatar img {
  position: absolute;
  width: 100%;
  bottom: 0px;
}
.articleDetails .saleInfo .bidList .ddli .avatar.gray {
  opacity: 0.3;
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
.graysomething {
  color: #cecdca;
}
.articleDetails .saleInfo .bidList .ddli .bidUser .name a {
  color: #666;
}
.articleDetails .saleInfo .bidList .ddli .bidUser .priceupdate {
  margin-top: 17px;
  line-height: 30px;
  color: #9e2026;
  font-size: 28px;
}
.articleDetails .saleInfo .bidList .ddli .bidUser .bidPrice {
  position: relative;
  margin-top: 10px;
  line-height: 20px;
  color: #79797b;
  font-size: 13px;
  font-weight: normal;
}
.articleDetails .saleInfo .bidList .ddli .bidUser .bidPrice:after {
  position: absolute;
  left: 5%;
  top: -50%;
  width: 95%;
  height: 100%;
  content: "";
  -webkit-transform: skewY(10deg);
  border-bottom: 1px solid #79797b;
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
  padding-top: 0.32rem;
  padding-bottom: 0.16rem;
  color: #999;
  font-size: 24px;
}
.articleDetails .saleInfo .moneyInfo div,
.articleDetails .saleInfo .moneyInfoExtend div,
.articleDetails .saleInfo .moneyInfoPrice div {
  float: left;
  width: 25%;
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
  box-sizing: border-box;
  border-right: 1px solid #cfd1d4;
}
.articleDetails .saleInfo .moneyInfo div .iconfont {
  margin: 0;
}
.articleDetails .saleInfo .moneyInfo div.moneyInfoOne {
  display: flex;
  justify-content: flex-start;
}
.articleDetails .saleInfo .moneyInfo div:last-child {
  border-right: none;
  display: flex;
  align-items: start;
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
.articleDetails .otherSaleMain .title::before {
  position: absolute;
  content: "";
  left: 0;
  top: 0.36rem;
  width: 6px;
  height: 27px;
  background-color: #9e2026;
}
.articleDetails .otherSaleMain .title a {
  width: 60%;
  float: left;
  display: block;
}

.articleDetails .otherSaleMain .title a span {
  font-size: 28px;
}

.articleDetails .otherSaleMain .saleBox {
  overflow: hidden;
  width: 100%;
  margin-top: 20px;
}
.articleDetails .otherSaleMain .saleBox .saleItem {
  position: relative;
  width: 335px;
  float: left;
}

.articleDetails .otherSaleMain .saleBox :nth-child(even) {
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
  padding-top: 12px;
  height: 40px;
  font-size: 24px;
  color: #333;
  overflow: hidden;
}
.articleDetails .otherSaleMain .saleBox .saleInfo {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 5px 0 25px 0;
  padding: 0;
  display: table;
  font-size: 24px;
}
.articleDetails .otherSaleMain .saleInfo .bid {
  float: left;
  color: #9e2026;
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
.articleDetails .otherSaleMain .saleInfo .statics i {
  font-size: 38px;
  height: 40px;
  line-height: 40px;
  margin: 0;
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
  position: relative;
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
  height: 100%;
  line-height: 1rem;
  position: relative;
}

.articleDetails .goShop a i,.articleDetails .goShop div i {
  vertical-align : middle;
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
.articleDetails .service {
  line-height: 1rem;
}
.articleDetails .icon-tuisongxiaoxi {
  color: #13b0fd;
  font-size: 38px;
  margin: 0 5px 0 0;
  vertical-align: top;
}
.articleDetails .icon-gengduo {
  color: #666;
  font-size: 32px;
}
.articleDetails .icon-zuji {
  color: #666;
  font-size: 40px;
}
.sharesomething {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1100;
  width: 100%;
  height: 300px;
  background: white;
  text-align: center;
}
.alertWrongPrice {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1100;
  width: 100%;
  height: 240px;
  background: white;
  text-align: center;
}
.sharetofriends {
  height: 100px;
  line-height: 100px;
  color: #666;
}
.threemethods {
  overflow: hidden;
}
.threemethods .floleft {
  float: left;
  width: 20%;
  margin-left: 20%;
  border: none;
  background-color: #fff;
  cursor: pointer;
}
.icon-erweima {
  font-size: 0.7rem;
  line-height: 1.1rem;
  width: 80px;
  height: 80px;
  background: #ffde00;
  color: white;
  border-radius: 50%;
}
.icon-lianjie {
  font-size: 0.7rem;
  line-height: 1.1rem;
  width: 80px;
  height: 80px;
  background: #de5443;
  color: white;
  border-radius: 50%;
}
.erweimahead {
  overflow: hidden;
  margin: 50px 10px;
}
.erweimahead .headmsg {
  float: left;
  margin-left: 30px;
}
.erweimahead .headmsg div {
  height: 67px;
  line-height: 67px;
}
.erweimahead .headimg {
  width: 135px;
  height: 135px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.onlyerweima {
  width: 533px;
  height: 533px;
  margin: auto;
  text-align: center;
}
.onlyerweima .onlyerweimaimg {
  width: 520px;
  height: 520px;
  border: 1px solid #ededed;
}
.onlyerweima .onlyerweimaimg div:first-child {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 45px;
}
.fingner {
  margin-top: 30px;
  overflow: hidden;
}
.backgroundimg {
  background-image: url("../../assets/images/erweima.png");
  background-size: auto 100%;
  background-repeat: no-repeat;
  opacity: 1;
  width: 100%;
}
.icon-zhiwen {
  width: 60px;
  height: 60px;
  background: white;
  color: black;
  border-radius: 40px;
  font-size: 70px;
  float: left;
  margin-left: 140px;
}
.words {
  float: left;
  margin-top: 30px;
  margin-left: 20px;
}
.articleDetails .saleInfo .moneyInfos {
  width: 100%;
  display: table;
  padding-bottom: 0.32rem;
  padding-top: 0.16rem;
  color: #999;
  font-size: 24px;
}
.articleDetails .saleInfo .moneyInfos div {
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
.articleDetails .saleInfo .moneyInfos div:first-child {
  transform: translateX(-0.1rem);
}
.articleDetails .saleInfo .moneyInfos div .iconfont {
  font-size: 1.3rem;
  line-height: 0.3rem;
}
.articleDetails .saleInfo .moneyInfos div:first-child {
  display: flex;
  justify-content: flex-start;
}
.articleDetails .saleInfo .moneyInfos div:nth-child(2) {
  border-left: 1px solid #cfd1d4;
  border-width: 0 1px;
}
.articleDetails .saleInfo .moneyInfos div i {
  margin: 0;
}
/* .articleDetails .saleInfo .moneyInfos .iconfont {
		font-size : 0.4rem;
	} */
.articleDetails .saleInfo .moneyInfos .haveborder {
  width: 66%;
  font-size: 0.32rem;
}
.alertsomething div {
  height: 90px;
  line-height: 90px;
  font-size: 30px;
}
.alertsomething {
  position: fixed;
  left: 16%;
  top: 45%;
  z-index: 1100;
  width: 70%;
  height: 200px;
  background: white;
  text-align: center;
  border-radius: 20px;
}
.sellerbidBtns {
  overflow: hidden;
  width: 100%;
}
.sellerbidBtns div {
  width: 48%;
  height: 88px;
  line-height: 88px;
  color: #fff;
  font-size: 30px;
  text-align: center;
  border-radius: 5px;
  background-color: #9e2026;
  float: left;
}
.sellerbidBtns div:nth-child(2) {
  margin-left: 4%;
}
.icon-shuaxin {
  font-size: 30px !important;
}
.icon-friends {
  color: white;
  background: #12de0d;
  font-size: 72px;
  border-radius: 40px;
  width: 80px;
  height: 80px;
}
.signaturegrayFa {
  background: white;
  width: 100%;
}
.signaturegray {
  height: 0.133333rem;
  background: #ededef;
  width: 100%;
}
.icon-fenxiang {
  font-size: 30px !important;
}
.grayline {
  height: 20px;
  background: #ededef;
  margin-top: 20px;
  position: relative;
}
.grayline::after {
  content: "";
  position: absolute;
  width: 109%;
  height: 100%;
  background: rgb(237, 237, 239);
  left: -5%;
}
.msgBtn {
  width: 200px;
  height: 80px;
  line-height: 80px;
  border-radius: 20px;
  border: 0;
  background: #17d212;
  color: white;
}
.wrongPrice {
  height: 130px;
  color: #999999;
  line-height: 130px;
  font-size: 28px;
}
.verifySold {
  height: 130px;
  color: #b55459;
  line-height: 130px;
  font-size: 36px;
}
.priceGray {
  height: 10px;
  background: #ededef;
}
.knowPrice {
  height: 100px;
  color: #9e2026;
  line-height: 100px;
  font-size: 32px;
}
.cancelSold {
  height: 100px;
  color: #999999;
  line-height: 100px;
  font-size: 28px;
}
.icon-cankaojia1 {
  font-size: 80px;
}
.offerPriceClass {
  border: none;
}
.confirmBtn,
.confirmBtnm {
  text-align: center;
}
.yikoujiaGray {
  background: #ccc;
  width: 32%;
  float: left;
  margin-right: 12px;
  font-size: 28px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: #fff;
  border-radius: 8px;
}
.yikoujiaGraym {
  background: #f15511;
  width: 50%;
  float: left;
  margin-right: 12px;
  font-size: 28px;
  height: 80px;
  line-height: 80px;
  border-radius: 8px;
  text-align: center;
  color: #fff;
}
#cursor1 {
  animation: play 0.8s linear infinite;
}
@keyframes play {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
