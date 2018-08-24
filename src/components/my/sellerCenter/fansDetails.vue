<template>
  	<div class="fanssDetails">
		<div class="userHeader">
			<div class="avatar">
				<div class="img" v-bind:style="{backgroundImage: 'url(' + storeInfos.avatar + ')'}"></div>
			</div>
			<div class="userinfo">
				<div class="name">
					<div class="sellerLevel"  v-bind:class="storeInfos.level"></div>
					<span class="limit">{{storeInfos.nickname}}</span>
				</div>
				<div class="desc">
					{{storeInfos.signature}}
				</div>
				<div v-if="!storeInfos.me" class="shopButton" @click="focusShop()">
					<div class="attention cancel ">
						{{focus}}
					</div>
				</div>
			</div>
		</div>
		<div class="userBuyer">
			<div class="titleBanner">
				<div class="title">
					买家信息
				</div>
				<div class="contents">
					<div class="score">
						积分 {{storeInfos.spoints}}
					</div>
				</div>
			</div>
			<div class="rate">
				<div class="buyerRate">
					<span class="title">退货比例</span>
					<span class="contents detailed level">{{storeInfos.tuihuo_percent}}%</span>
				</div>
				<div class="buyerRate">
					<span class="title">违约比例</span>
					<span class="contents detailed level">{{storeInfos. weiyue_percent}}%</span>
				</div>
			</div>
		</div>
		<div class="userInfo">
			<div class="province">
				<div class="title">地区</div>
				<div class="contents">{{storeInfos.province}}&nbsp;{{storeInfos.city}} </div>
			</div>
			<div v-if="!storeInfos.me" class="tel blackListButton"  @click="shieldingBtn()" >
				<div class="title">屏蔽用户</div>
				<div class="contents"></div>
				<div class="black">
					<i class="iconfont icon-right"></i>
				</div>
			</div>
		</div>
		<div class="userAttention">
			<div class="titleBanner">
				<div class="title">已关注{{total}}家店铺</div>
			</div>
			<div class="user" ref="ctn">
				<router-link  v-for = "(item, index) in focusShops" :key="index" :to="'/storeHome/'+item.sellerId" >
					<div class="shopItem">
						<div class="shopAvatar">
							<img :src="item.headimgurl">
						</div>
						<div class="shopInfo">
							<div class="username">
								<div class="sellerLevel lv3"></div>
								<span class="name">{{item.nickname}}</span>
								<span class="fanss">粉丝{{item.concerns}}</span>
							</div>
					<div class="userattr">
						<div class="item">
							<span>
								<i class="iconfont  icon-xingxing2"></i>
							</span>
							<span class="txt">{{item.points}}分</span>
						</div>
						<!-- 实名认证判断 -->
						<div class="item" >
							<div class="setup" v-if="item.isCompany == true">
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
							<div class="nosetup" v-if="item.desposit == 0">
								<span>
									<i class="iconfont icon-anquanbaozhang"></i>
								</span>
								<span class="txt">未缴纳</span>
							</div>
							<div v-else class="setup">
								<span>
									<i class="iconfont icon-anquanbaozhang"></i>
								</span>
								<span class="txt">￥{{item.desposit}}元</span>
							</div>
						</div>
					</div>

						</div>
					</div>
				</router-link>				
			</div>
		</div>
		<actionsheet v-model="shield" :menus="menus2" @on-click-menu-menu1="shielduser" @on-click-menu-menu2="viewshielduser" show-cancel></actionsheet>
		<actionsheet v-model="focusUser" :menus="menus1" @on-click-menu-menu4="cancelFocus" show-cancel></actionsheet>
		<toast width="200px" v-model="showSuccess" :text="toastText" type="text"  :time="1000" is-show-mask></toast>	
	</div>
</template>
<script>
import {Actionsheet , Toast} from 'vux'
import {userIndex,shielduser,cancelFocus,shopFocus,user_focusShopList} from '../../../api/api'
export default {
	components: {
	    Actionsheet,
	    Toast
  	},
  	data() {
	    return {
	      	storeInfos:[],
	      	user_id:'',
	      	shielding:true,
	      	focus:'',
	      	focusShops:[],
	      	pagenum:10,
	      	page:0,
	      	total:'',
	      	isCompany:'',
	      	level:'',
		    shield: false,
			menus2: {
			    menu1: '屏蔽该用户',
			    menu2: '查看屏蔽用户',
		   	},
		   	focusUser:false,
		   	menus1: {
			    menu3: '取消关注将无法看到该店铺的拍品',
			    menu4: '取消关注',
		   	},
		   	showSuccess:false,
		    toastText:'',
		    is_pingbi:'',
		    isshow:'',
		    pingbi_count:'',
	    };
  	},
  methods: { 
	    storeInfo(){  
		    this.user_id = this.$route.params.user_id 
		    userIndex(this.user_id).then(res =>{ 
		        if(res.code==200){
		        	if(res.data.me == true){
  						this.menus2 = {
  							menu2: '查看屏蔽用户'
  						}
  					}else{
  						if(res.data.is_pingbi == '0'){
				          	this.menus2 = {
								menu1: '屏蔽该用户',
			    			    menu2: '查看屏蔽用户',
							}
				          }else if(res.data.is_pingbi == '1'){
				          	this.menus2 = {
								menu1: '取消屏蔽该用户',
			    			    menu2: '查看屏蔽用户',
							}
				          }
  					}
		           this.storeInfos = res.data;
		           this.focus = res.data.focus;
		           this.is_pingbi = res.data.is_pingbi;
		           this.pingbi_count = res.data.pingbi_count;
		          if(this.focus=='0'){
		          	this.focus='关注'
		          }else{
		          	this.focus='已关注'
		          }
		          
		        }    
		    })
		    .catch(err =>{
		        console.log(err);
		    });
	    }, 
	    //点击屏蔽按钮
	    shieldingBtn(){
	    	this.shield = true;
	    },
	    shielduser(){	

	      	//0 未屏蔽 1 已屏蔽  2自己
	      	if(this.is_pingbi=='0'){
	      		let params = {
	      			type : 'add'
	      		}
                shielduser(this.user_id,params).then(response =>{
			      //   this.showSuccess = true;
	     			// this.toastText='屏蔽成功';
	     			this.menus2= {
	     				menu1: '取消屏蔽该用户',
			    		menu2: '查看屏蔽用户',
	     			}
	     			this.$router.push('/shieldingUsers')
	     			this.storeInfo();
			    })
			    .catch(error =>{
			        console.log(error);
			    });
	      	}else if(this.is_pingbi=='1'){
	      		let params = {
	      			type : 'cancel'
	      		}
                shielduser(this.user_id,params).then(response =>{
			        this.showSuccess = true;
	     			this.toastText='取消屏蔽用户成功';
	     			this.menus2= {
	     				menu1: '屏蔽该用户',
			    		menu2: '查看屏蔽用户',
	     			}
	     			this.storeInfo();
			    })
			    .catch(error =>{
			        console.log(error);
			    });
	      	}else{
	      		this.showSuccess = true;
	     		this.toastText='无法屏蔽自己'
	      	}
	    },
	    //查看屏蔽用户
	    viewshielduser(){
	    	// 屏蔽为空时，不跳转屏蔽列表
	    	if(this.pingbi_count=='0'){
	    		this.showSuccess = true;
	    		this.toastText='您没有屏蔽的用户'
	    	}else{
	    		this.$router.push({ path: '/shieldingUsers' })
	    	}
	    	
	    },
	    //取消关注
	    cancelFocus(){
	    	let params = {
 				type:'cancel',
				seller_id:this.user_id
	    	};
	    	cancelFocus(params).then(response =>{ 
					if(response.code==200){
						this.showSuccess = true;
					    this.toastText='取消关注成功'
					    this.focus='关注'
					}
				})
				.catch(error => {
				    console.log(error);
				});
	    },
	    //点击关注按钮
	    focusShop(){

	      	if(this.focus=='关注'){
	      		let params = {
						type:'focus',
				        seller_id:this.user_id
	      		};
                shopFocus(params).then(response => {
					if(response.code==200){
						this.showSuccess = true;
				    	this.toastText='关注成功'
				    	this.focus='已关注'
					}
				})
				.catch(error => {
				    console.log(error);
				});
	      	}else{
	      		this.focusUser = true;
	      	}
	      	
	    },
	    user_focusShopList(){
	    	let _this = this;  
	    	_this.page += 1; 
		    _this.user_id = this.$route.params.user_id ;
		    let params = {
		    		page: this.page,
          			pagenum:this.pagenum,
          			type:'user'
		    };

		    user_focusShopList(params).then(function (response) { 
		        if(response.code==200){
		           _this.focusShops = response.data.list;
		           _this.total=response.data.total
		           	if(_this.focusShops.isCompany=='true'){
			          	_this.isCompany='已认证'
			        }else{
			          	_this.isCompany='未认证'
			        }
		        }
		    })
		    .catch(function (error) {
		        console.log(error);
		    });
	    },
	    created() {
		    window.addEventListener("scroll", this.scrollHandler);
		},

		destroyed() {
		    window.removeEventListener("scroll", this.scrollHandler);
		},
		//注册scroll事件并监听 
	    scrollHandler() {
	      const st = document.documentElement.scrollTop || document.body.scrollTop;
	      const ch = this.$refs.ctn.clientHeight;
	      if (st + window.innerHeight >= ch) {
	        this.user_focusShopList();
	      }
	    }, 
  	},

  	 
  	mounted() {
    	this.storeInfo();
    	this.user_focusShopList();
  	},
};
</script>
<style>
	.fanssDetails{
		width: 100%;
		max-width: 750px;
		background-color: #ededef;
		position: relative;
	    box-sizing: border-box;
	    min-height: 150vh;
	    padding-bottom: 60px;
	}
	.fanssDetails .userHeader {
		position: relative;
		width: 100%;
		height: 168px;
		background-color: #FFF;
	}
	.fanssDetails .userHeader .avatar {
	    width: 118px;
	    height: 118px;
	    float: left;
	    margin: 25px 28px;
	    border-radius: 3px;
	    background-color: #FFF;
	    overflow: hidden;
	    background-repeat: no-repeat;
	    background-position: center;
	    background-size: cover;
	    cursor: pointer;
	}
	.fanssDetails .userHeader .avatar .img {
	    width: 118px;
	    height: 118px;
	    background-size: cover;
	    background-repeat: no-repeat;
	    background-position: center center;
	}
	.fanssDetails .userHeader .userinfo {
	  	height: 168px;
	}
	.fanssDetails .userInfo {
	    margin-top: 20px;
	    border-bottom: 0.013333rem solid #e5e5e5;
	}
	.fanssDetails .userHeader .userinfo .name {
	  	font-size: 28px;
	  	color: #333;
	  	padding-top: 40px;
	  	overflow: hidden;
	  	position: relative;
	  	margin-right: 0.96rem;
	  	max-width: 3.8rem;
	  	-o-text-overflow: ellipsis;
	    text-overflow: ellipsis;
	}
	.fanssDetails .userHeader .userinfo .desc {
	  	display: -webkit-box;
	  	display: -ms-flexbox;
	  	display: flex;
	 	display: -webkit-flex;
	  	height: 60px;
	  	font-size:24px;
	 	line-height:30px;
	  	color: #888;
	  	margin-top: 16px;
	 	position: relative;
	 	margin-right: 1.3rem;
	  	overflow: hidden;
	  	-o-text-overflow: ellipsis;
	    text-overflow: ellipsis;
	    display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.fanssDetails .userHeader .userinfo .name .buyerLevel {
	  	margin-right: 8px;
	}
	.fanssDetails .userHeader .shopButton {
	  	position: absolute;
	  	top: 40%;
	  	right: 26px;
	}
	.fanssDetails .userHeader .attention {
	  	float: right;
	  	width: 90px;
		height: 36px;
	  	line-height: 36px;
	  	border-radius: 2px;
	  	text-align: center;
	  	font-size:28px;
	  	color: #FFF;
	  	background-color: #9e2026;
	  	border: 1px solid #9e2026;
	  	cursor: pointer;
	  	padding: 7px 15px;
	  	border-radius:6%;
	}
	.fanssDetails .userHeader .cancel {
	    color: #fff;
	    background-color: #9e2026;
	    border: 1px solid #9e2026;
	    cursor: pointer;
	}
	.fanssDetails .userBuyer {
	  	width: 100%;
	  	background-color: #FFF;
	  	margin-top: 20px;
	  	border-bottom:1px solid #e5e5e5;
	}
	.fanssDetails .userBuyer .titleBanner {
	  	position: relative;
	  	height: 100px;
	  	margin-left: 32px;
	  	overflow: hidden;
	}
	.fanssDetails .userInfo .name:after, .fanssDetails .userInfo .tel:after, .page-buy-user .userInfo .weixin:after, .fanssDetails .userInfo .province:after {
	    position: absolute;
	    content: '';
	    bottom: 0%;
	    right: 0%;
	    width: 96%;
	    height: 4px;
	    background-color: #D9D9D9;
	    -ms-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	    -webkit-transform: scaleY(0.5);
	}
	.fanssDetails .userBuyer .titleBanner:after {
		position: absolute;
		content: '';
		bottom: 0;
		right: 0;
		width: 100%;
		height: 2px;
		background-color: #D9D9D9;
		-ms-transform: scaleY(0.5);
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
	}
	.fanssDetails .userBuyer .titleBanner .title {
	  	font-size: 28px;
	  	line-height: 100px;
	  	color: #333;
	 	float: left;
	  	width: 20%;
	  	text-align: left;
	  	height: 100px;
	  	margin-left: 0
	}
	.fanssDetails .userSeller .titleBanner .title,
	.fanssDetails .authenticate .titleBanner .title {
	  	text-align: left;
	}
	.fanssDetails .userBuyer .titleBanner .contents {
	  	height: 100px;
	  	line-height: 100px;
	  	float: left;
	}
	.fanssDetails .userBuyer .titleBanner .score {
	  	float: left;
	  	font-size: 24px;
	  	color: #999;
	  	position: relative;
	}
	.fanssDetails .memberLevelScores {
	  	margin-left:20px;
	}
	.fanssDetails .userBuyer .titleBanner .help {
	    float: left;
	    width: 29px;
	    height: 29px;
	    line-height: 100px;
	    cursor: pointer;
	    color: #999;
	    margin-left: 20px;
	}

	.fanssDetails .userBuyer .titleBanner .blackListButton {
		position: absolute;
		top: 7px;
		right: 4%;
		width: 32px;
		height: 32px;
		cursor: pointer;
		font-size: 28px;
		color: #333;
	}
	.fanssDetails .userBuyer .rate {
	     position: relative;
	    margin-left: 4%;
	}
	.fanssDetails .userBuyer .rate .buyerRate {
		width: 100%;
		height:100px;
		line-height: 100px;
		overflow: hidden;
	}
	.fanssDetails .userBuyer .rate .buyerRate:first-child{
		border-bottom:1px solid #e5e5e5;
	}
	.fanssDetails .buyerRate:first-child > .contents {
	    margin-left: -24px !important;
	}
	.fanssDetails .userBuyer .rate .buyerRate .title {
	    font-size: 28px;
	    color: #333;
	    float: left;
	    width: 24%;
	    margin-left: 0
	}
	.fanssDetails .userBuyer .rate .buyerRate .contents {
	    width: 100%;
	    font-size: 24px;
	    color: #f15511;
	    text-align: center;
	    margin-top: 12px;
	    margin-left: -22px;
	}
	.fanssDetails .userInfo .name,
	.fanssDetails .userInfo .tel,
	.fanssDetails .userInfo .weixin,
	.fanssDetails .userInfo .province {
	    position: relative;
	    background-color: #FFF;
	    width: 100%;
	    height: 100px;
	}
	.fanssDetails .userInfo .name:after,
	.fanssDetails .userInfo .tel:after,
	.fanssDetails .userInfo .weixin:after,
	.fanssDetails .userInfo .province:after {
	    position: absolute;
	    contents: '';
	    bottom: 0%;
	    right: 0%;
	    width: 96%;
	    height: 2px;
	    background-color: #D9D9D9;
	    -ms-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	    -webkit-transform: scaleY(0.5);
	}
	.fanssDetails .userInfo div:last-child:after {
	    height: 0px;
	}
	.fanssDetails .userInfo .name .title,
	.fanssDetails .userInfo .tel .title,
	.fanssDetails .userInfo .province .title,
	.fanssDetails .userInfo .weixin .title {
	    float: left;
	    width: 22%;
	    margin-left: 4%;
	    line-height: 100px;
	    font-size: 28px;
	    color: #333;
	}
	.fanssDetails .userInfo .name .contents,
	.fanssDetails .userInfo .tel .contents,
	.fanssDetails .userInfo .province .contents,
	.fanssDetails .userInfo .weixin .contents {
	    font-size: 28px;
	    line-height: 100px;
	    color: #999;
	    float: left;
	    position: relative;
	}
	.fanssDetails .userInfo .tel .call,
	.fanssDetails .userInfo .tel .message,
	.fanssDetails .userInfo .tel .black {
	  	display: -webkit-flex;
	    position: absolute;
	    right: 4%;
	    top: 50%;
	    -webkit-transform: translateY(-50%);
	    transform: translateY(-50%);
	}
	.fanssDetails .userInfo .tel.blackListButton i {
	  font-size: 20px;
	  color: #999;
	}
	.fanssDetails .userAttention {
	    width: 100%;
	    background-color: #FFF;
	    margin-top: 20px;
	}
	.fanssDetails .userAttention .titleBanner {
	    position: relative;
	    height: 80px;
	    width: 100%;
	    border: none !important;
	}
	.fanssDetails .userAttention .titleBanner:after {
	    position: absolute;
	    content: '';
	    bottom: 0%;
	    right: 0%;
	    width: 96%;
	    height: 2px;
	    background-color: #D9D9D9;
	    -ms-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	    -webkit-transform: scaleY(0.5);
	}
	.fanssDetails .userAttention .titleBanner .title {
	    font-size: 24px;
	    line-height: 80px;
	    color: #333;
	    float: left;
	    text-align: left;
	    overflow: hidden;
	    margin-left: 4%;
	    max-width: 85%;
	}

	.fanssDetails .userAttention .user {
	    width: 100%;
	    overflow: hidden;
	}
	.fanssDetails .userAttention .user .shopItem {
	    border-bottom: 1px solid #e5e5e5;
	    padding: 18px 0px;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    display: -webkit-flex;
	    margin-left: 4%;
	    width: 96%;
	}
	.fanssDetails .userAttention .user .shopItem .shopAvatar {
	    width: 109px;
	    height: 109px;
	    padding: 3px;
	    border: 1px solid #ececec;
	    margin-right: 30px;
	}
	.fanssDetails .userAttention .user .shopItem .shopAvatar img {
	    width: 109px;
	    height: 109px;
	}
	.fanssDetails .userAttention .user .shopItem .shopInfo {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	}
	.fanssDetails .userAttention .user .shopItem .username {
	  display: -webkit-box;
	  display: -ms-flexbox;
	  display: flex;
	  display: -webkit-flex;
	  padding-top: 19px;
	  margin-bottom: 20px;
	  height: 42px;
	}
	.fanssDetails .userAttention .user .shopItem .username .sellerLevel{
		margin-right:10px;
	    margin-bottom:10px;
	}
	.fanssDetails .userAttention .user .shopItem .username .name {
	    -webkit-box-flex: 2;
	    -webkit-flex: 2;
	    -ms-flex: 2;
	    flex: 2;
	    overflow: hidden;
	    white-space: nowrap;
	    max-width: 4rem;
	    -o-text-overflow: ellipsis;
	    text-overflow: ellipsis;
	    font-size: 28px;
	    color: #333;
	}
	.fanssDetails .userAttention .user .shopItem .username .fanss {
		text-align: right;
		padding-right: 30px;
		overflow: hidden;
		font-size: 24px;
		color: #999;
		flex:1;
	}

	.fanssDetails button {
	  width: 94%;
	  margin: 20px 3%;
	  padding: 0;
	  border: 1px solid #199c18;
	  background: #08BA06;
	  border-radius: 3px;
	  height: 42px;
	  line-height: 42px;
	  font-size: 18px;
	  color: #f7f7f7;
	  outline: none;
	  cursor: pointer;
	}
	.fanssDetails button.cancel {
	  background-color: #E95757;
	  border: 1px solid #E95757;
	  cursor: pointer;
	}
	.fanssDetails .adminMenu {
	  position: fixed;
	  top: 12px;
	  left: 12px;
	  width: 36px;
	  height: 36px;
	  line-height: 36px;
	  display: -webkit-box;
	  display: -ms-flexbox;
	  display: flex;
	  display: -webkit-flex;
	  font-size: 18px;
	  color: rgba(0, 0, 0, 0.2);
	}
	.fanssDetails .adminMenu span {
	  width: 36px;
	  height: 36px;
	  line-height: 36px;
	}
	.fanssDetails .wptMultiConfirm .btn-confirm.toggleBlackList {
	  color: #DF4040;
	}

	.fanssDetails .supportBanner a {
	  color: #F2B896!important;
	}
	.fanssDetails .iconfont{
		color: #999;
	}
	.fanssDetails .userinfo .name .sellerLevel {
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
	.fanssDetails .sellerLevel {
	    float: left;
	    width: 60px;
	    height: 30px;
	    background-size: cover;
	    background-repeat: no-repeat;
	    background-image: url(../../../assets/images/buyersRating.png);
	}
	.fanssDetails .user .sellerLevel {
	    float: left;
	    width: 60px;
	    height: 30px;
	    background-size: cover;
	    background-repeat: no-repeat;
	    background-image: url(../../../assets/images/sellerLevels.png);
	}
	.fanssDetails .weui-mask{
	    background: rgba(0, 0, 0, 0.4);
	}
	.fanssDetails  .weui-actionsheet__cell{
		height: 110px;
		line-height: 110px;
		padding:0;
		color: #333;
		font-size: 30px;
	}
	.fanssDetails  .weui-actionsheet__action{
		margin-top: 11px;
	}
	.fanssDetails .user .userattr {
	    width: 100%;
	    height: 50px;
	    margin-top: 10px;
	}

	.fanssDetails .user .userattr .item, .fanssDetails .user .userattr .item span {
	    float: left;
	}
	.fanssDetails .user .userattr .item {
	    margin-right: 20px;
	}
	.fanssDetails .user .userattr .txt {
	    display: inline-block;
	    color: #999;
	    font-size: 24px;
	    margin-left: 8px;
	}
	.fanssDetails .setup .icon-renzhengyonghu , .fanssDetails .setup .icon-anquanbaozhang{
		color: #ffac00;
		margin:0;
	}
	.fanssDetails .nosetup .icon-renzhengyonghu , .fanssDetails .nosetup .icon-anquanbaozhang {
		color: #999;
		margin:0;
	}
	.fanssDetails .saleInfo .likeIt .icon-xin3 , .fanssDetails .saleInfo .likeIt .icon-xin1{
		font-size: 32px;
		height: 72px;
	  	line-height: 69px;
	}
	.fanssDetails .icon-xingxing2 {
		color: #ffac00;
		margin:0;
	}
	.fanssDetails .user .iconfont{
		font-size:28px;
	}
</style>
