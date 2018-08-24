<template>
  <div class="moreUpload">
    <div class="topBanner">
    	<div class="btn draft" onclick="javascript:history.go(-1);">取消</div>
    	<div class="btn next"  @click="nextstep(1)">下一步</div>
    </div>
    <div class="optionalTitle">可选设置</div>
	<div class="optionalSettings">
		<group class="border horizonTop">
	    	<x-switch title="7天包退" v-model="value1" prevent-default @on-click="onClick"></x-switch>
	  	</group>
	  	<group  class="border horizonTop">
	    	<x-switch title="包邮" v-model="value2" prevent-default @on-click="onClickes"></x-switch>
	  	</group>
		
		<div class="cert " @click="securityDeposit()">
			<div class="lihead">
				保证金
			</div>
			<div class="numInput"><span class="">0</span></div>
			<div class="verifyIcon">
			<i class="iconfont icon-iconfontzhizuobiaozhun023106"></i>
		</div>
		</div>
		<div class="bidBzjList" v-show="securitymoney">
			<div class="bzjItem" role="presentation">
				0
			</div>
			<div class="bzjItem" role="presentation">
				10
			</div>
			<div class="bzjItem" role="presentation">
				30
			</div>
			<div class="bzjItem" role="presentation">
				50
			</div>
			<div class="bzjItem" role="presentation">
				100
			</div>
			<div class="bzjItem" role="presentation">
				200
			</div>
			<div class="bzjItem" role="presentation">
				500
			</div>
			<div class="bzjItem" role="presentation">
				1000
			</div>
			<div class="bzjItem" role="presentation">
				2000
			</div>
		</div>
	</div>
	<div class="optionalTitle">高级设置</div>
	<div class="cert more" @click="shooting()">
		<div class="lihead">
			开拍时间
		</div>
		<div class="openTimeInput"><span>立即开拍</span></div>
		<div class="verifyIcon">
			未实名认证
			<i class="iconfont icon-renzhengyonghu"></i>
		</div>
	</div>
	<div v-show="authorized==true">1111</div>
	<div class="tip openTime">截拍时间：02月26日（今天）17：00</div>
	<div class="cert more ">
		<div class="lihead">
			一口价
		</div>
		<div class="numInput"><span class="">0</span></div>
	</div>
	<div class="tip">出价达到或超过此价格立即成交（无一口价请设0元）</div>
	<div class="cert more ">
		<div class="lihead">
			参考价
		</div>
		<div class="numInput"><span class="">0</span></div>
	</div>
	<div class="tip">提供此拍品的参考价格（无参考价请设0元）</div>
	<actionsheet v-model="goauthorized" :menus="menus2"  @on-click-menu-menu2="goauthorizedes" show-cancel></actionsheet>
	<actionsheet v-model="deposit" :menus="menus1"  @on-click-menu-menu2="security" show-cancel></actionsheet>

  </div>
</template>
<script>
import { XSwitch, Group, Actionsheet } from 'vux'

export default {
  components: {
    XSwitch,
    Group,
    Actionsheet
  },
  data () {
    return {
      	value1: true, //7天包退
      	value2:false, //包邮
      	authorized:false, //是否可以立即开拍
      	securitymoney:false, //选择缴纳保证金
      	deposit:false, //同意缴纳保证金弹窗
      	menus1: {
        	menu1: '买卖双方都缴纳保证金,如一方发生违约,将赔付给对方',
        	menu2: '同意',
      	},
      	goauthorized: false, //去认证弹窗
      	menus2: {
        	menu1: '设置开拍时间,需要开通实名认证',
        	menu2: '去实名认证',
      	},
      	open:true,//可以开启同意弹窗
    }
  },
  methods: {
  	//缴纳保证金
    securityDeposit(){
    	if (this.open== true) {
    		this.deposit = true;  //显示同意弹窗
    	}else{
    		this.deposit = false;  //不在显示同意弹窗
    		this.securitymoney = !this.securitymoney
    	} 	
    },
    security(){  //同意缴纳保证金
		this.securitymoney = true;
		this.open = false   //同意之后不在显示弹窗
	},
    //需实名认证方可设置开拍时间
    shooting(){
    	if(this.authorized==false){
    		this.goauthorized = true;
    	}else{
    		console.log(222)
    	}
    	
    },
    // 去实名认证
  	goauthorizedes () {
      this.$router.push({ path: '/sellerCenter/realnameApplication' })
    },
    onClick (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.value1 = newVal 
    },
    onClickes (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.value2 = newVal 
    },
    nextstep(e){
    this.$router.push({
	    path: '/upload', 
	    query: {
	     	id: e
	    }
	  })	
    }
  }
}
</script>
<style>

	.moreUpload{
		background-color: #eee;
	    min-height: 1234px;
	    overflow: hidden;
	}
	.moreUpload .topBanner{
		width: 100%;
		background-color: #fff;
	    display: table;
	}
	.moreUpload .topBanner .btn{
	    float: right;
	    color: #9e2026;
	    line-height: 50px;
	    font-size: 32px;
	    cursor: pointer;
	    text-align: right;
	    padding: 13px 35px;
	    text-shadow: 0 0 0 #FFF;
	}
	.moreUpload .topBanner .draft, .topBanner .back{
	    float: left;
	    color: #999;
	    text-align: left;
	}
	
	.moreUpload .optionalSettings{
		background-color: #fff;
		color: #333;
		margin-bottom: 8px;
	}
	.moreUpload .optionalTitle {
	    width: 92%;
	    color: #666;
	    font-size: 24px;
	    padding: 18px 4% 18px;
	   
	}
	.moreUpload .tip {
	    color: #999;
	    margin: 0 30px;
	    line-height: 54px;
	    font-size: 25px;
	}
	.moreUpload .cert,.title {
	    position: relative;
	    margin-left: 30px;
	    font-size: 28px;
	    cursor: pointer;
	    height: 100px;
	    line-height: 100px;
	}
	.moreUpload  .lihead {
	    line-height: 100px;
	    font-size: 32px;
	    float: left;
	    width: 150px;
	    color: #424242;
	}
	.moreUpload  .numInput, .moreUpload  .bidBzjInput, .moreUpload .multiWinsInput {
	    float: left;
	    font-family: "Helvetica neue", Verdana, Geneva, sans-serif;
	    height: 100px;
	    line-height: 100px;
	}

	.moreUpload  .numInput span,  .moreUpload .bidBzjInput span, .moreUpload .multiWinsInput span{
		line-height: 46px;
    	font-size: 30px;
    	color: #666;
    	margin: 0 10px;
	}
	.moreUpload .lihead .certIcon {
	    float: right;
	    height:100px;
	    line-height: 100px;
	    color: #6388D4;
	    font-size: 28px;
	    margin-right: 15px;
	}
	.moreUpload .more{
		background-color: #fff;
		margin-left: 0;
		padding-left: 30px;
	}
	.moreUpload .icon-kaiguan4{
		color: #d32838;
		font-size: 80px;
	}
	.moreUpload .openTimeInput{
		float: left;
	    height: 100px;
	    color: #999;
	    font-size: 28px;
	}
	.moreUpload .verifyIcon{
	    float: right;
	    display: block;
	    margin-right: 35px;
	    color: #999;
	}
	.moreUpload .verifyIcon .icon-renzhengyonghu{
		margin: 0;
		color: #999;
		font-size: 34px;
	}



	/*XSwitch样式*/
.moreUpload .weui-cells .vux-no-group-title{
  margin:0;
}
.moreUpload .weui-cells{
  height: 100px;
  margin-top: 0;
}
 .weui-cells:before{
	display:none;
	height: 0
}
.weui-cells:after{
	display:none;
	height: 0
}
.moreUpload .vux-x-switch.weui-cell_switch{
  padding:0 30px;
}
.moreUpload .weui-cell_switch{
  padding:0 ;
  height: 100px;
}
.moreUpload .weui-cell__ft .weui-switch{
  width: 92px;
  height: 52px;
  border-radius: 35px;
}
.weui-label{
  color: #333;
  font-size: 28px;
}
.moreUpload .weui-switch:before, .weui-switch-cp__box:before{
  width: 90px;
  height: 50px;
  border-radius: 34px;
}
.moreUpload .weui-switch:after, .weui-switch-cp__box:after{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.moreUpload .weui-switch:checked:after, .weui-switch-cp__input:checked ~ .weui-switch-cp__box:after{
  -webkit-transform: translateX(0.556667rem);
  transform: translateX(0.556667rem); 
}
.moreUpload .weui-switch:checked{
  border-color: #d32838;
  background-color: #d32838;
}

/*Actionsheet样式*/
.moreUpload .weui-mask{
    background: rgba(0, 0, 0, 0.4);
}
.moreUpload .weui-actionsheet__cell{
	height: 110px;
	line-height: 110px;
	padding:0;
	color: #9e2026;
	font-size: 30px;
}
.moreUpload .weui-actionsheet__cell:first-child{
	color: #333;
}

.moreUpload .weui-actionsheet__action .weui-actionsheet__cell{
	color: #999;
}
.moreUpload .weui-actionsheet__action{
	margin-top: 11px;
}


/*保证金选择*/
.moreUpload  .bidBzjList {
    -webkit-transition: height .15s;
    -o-transition: height .15s;
    transition: height .15s;
    height: 240px;
}

.moreUpload .bidBzjList .bzjItem {
    float: left;
    width: 33%;
    height: 80px;
    display: block;
    color: #576B95;
    font-size: 24px;
    cursor: pointer;
    line-height: 80px;
    text-align: center;
}
</style>