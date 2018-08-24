<template>
  <div class="certification">
  	<div class="verifyMain">
	    <div class="verifyBox userInfo ">
			<div class="avatar">
				<div class="img" style="background-image: url(&quot;https://cdn.weipaitang.com/mmopen/20171128d01aa1a1-d5d1-4e7e-a84d-5ca1482f1960/w/0&quot;);">
				</div>
			</div>
			<div class="verifyInfo">
				<div class="userName">
					女神
				</div>
				<p>
					立即实名认证享更多特权服务
				</p>
			</div>
			<div class="verifyState ">
				<p class="">
				</p>
				<div class="arrow">
					<i class="wptFM icon-fm-arrowright"></i>
				</div>
			</div>
		</div>
		<!-- <div class="unverified">
			<div class="verifyBox apply">
				<div class="title border horizonBottom">
					申请认证
				</div>
				<div class="applyOptionList">
					<div class="applyItem ">
						<div class="individual">
							<div class="applyIcon finished">
								<span class="fi-stack">
									<i class="iconfont icon-yuancircle46"></i>
									<i class="iconfont icon-yonghudianji"></i></span>
							</div>
							<p>
								个人实名认证
							</p>
							<div class="applyBtn ">
								申请
							</div>
						</div>
					</div>
					<div class="applyItem ">
						<div class="business">
							<div class="applyIcon finished">
								<span class="wptFM fi-stack">
									<i class="iconfont icon-yuancircle46"></i>
									<i class="iconfont icon-qiye "></i></span>
							</div>
							<p>
								企业实名认证
							</p>
							<div class="applyBtn ">
								申请
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> -->
		<div class="verifysBox">
		    <div class="title">认证特权</div>
		    <div class="powerList">
		        <div class="powerItem shake">
		        	<i class="iconfont icon-liwu"></i>
		        	参与平台活动
		    	</div>
		        <div class="powerItem black">
		        	<i class="iconfont icon-jinzhi"></i>
		    		黑名单数量增加到300
		    	</div>
		        <div class="powerItem distill">
			        <i class="iconfont icon-tixian1"></i>
			    	提现次数增加到2次/天
			    </div>
		        <div class="powerItem sign">
		        	<i class="iconfont icon-iconfontzhizuobiaozhun023106"></i>
		        	店铺当中增加认证标记
		    	</div>
		        <div class="powerItem grade">
		        	<i class="iconfont icon-xinyi"></i>
		        	增加点赞次数
		        </div>
		        <div class="powerItem template">
		        	<i class="iconfont icon-aaa"></i>
			        每日上拍件数不限
			    </div>
		        <div class="powerItem yuan">
		        	<i class="iconfont icon-huangguan"></i>
		        	增加店铺权重
		    </div>
		    </div>
		</div>
	</div>
  </div>
</template>

<style scoped>
.certification{
	position: relative;
	box-sizing: border-box;
	min-height: 100vh;
	background-color: #f4f4f4;
	max-width: 750px;
}
.certification .verifyMain .verifyBox {
    width: 97%;
    display: inline-block;
    padding: 37px 0 40px 3%;
    background-color: #FFF;
}

.certification .verifyMain .verifyBox .avatar, .certification .verifyMain .verifyBox .logo {
    float: left;
    width: 107px;
    height: 107px;
    overflow: hidden;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 3px #e5e5e5 solid;
}
.certification .verifyMain .verifyBox .avatar .img, .certification .verifyMain .verifyBox .logo .img {
    width: 105px;
    margin: 1px;
    height:105px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.certification .verifyMain .verifyBox .verifyInfo {
    height: 120px;
    float: left;
    margin-left: 30px;
    width: 58%;
}
.certification .verifyMain .verifyBox .verifyInfo .userName, .certification .verifyMain .verifyBox .verifyInfo .shopName {
    display: -webkit-box;
    overflow: hidden;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: #333;
    font-size: 28px;
    margin-top: 8px;
}
.certification .verifyMain .verifyBox .verifyInfo p {
    font-size: 24px;
    color: #999;
    margin-top: 20px;
}
.certification .verifyMain .verifyBox .verifyState {
    width: 100px;
    height:110px;
    float: right;
    margin-right: 3%;
}
.certification .verifyMain .verifyBox .verifyState p {
    position: relative;
    right: 4px;
}
.certification .verifyMain .verifyBox .verifyState p:after {
    content: '\672A\8BA4\8BC1';
    display: table;
    height: 110px;
    line-height: 110px;
    font-size: 24px;
    color: #999;
    text-align: center;
}
/*.certification .verifyMain .verifyBox .verifyState .arrow, .certification .verifyMain .verifyBox .shopInfo .arrow {
    position: absolute;
    top: 50%;
    right: 0;
    height: 46px;
    display: none;
    color: #C8C8C8;
    font-size: 18px;
    margin-top: -24px;
    line-height: 46px;
}

.certification .verifyMain .verifyBox .title {
    padding-bottom: 13px;
    font-size: 34px;
    color: #333;
}
.border.horizonBottom:after {
    left: 0;
    bottom: 0;
}
.border.horizonTop:after, .border.horizonBottom:after {
    width: 100%;
    height:2px;
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
}
.border:after {
    position: absolute;
    content: '';
    background-color: #D9D9D9;
}
.certification .verifyMain .verifyBox .applyItem {
    width: 48.5%;
    float: left;
}

.verifyMain*/ .verifysBox {
    width: 97%;
    display: table;
    padding: 5px 0 5px 3%;
    margin-top: 15px;
    background-color: #FFF;
    border-top: solid 1px #E0E0E0;
    border-bottom: solid 1px #E0E0E0;
}
.verifyMain .verifysBox .title {
	margin: 34px 0;
    font-size: 34px;
    color: #333;
}
.verifyMain .verifysBox .powerList {
    width: 97%;
    display: table;
    margin: 15px 3% 5px 0;
}
.verifyMain .verifysBox .powerList .powerItem {
    width: 50%;
    height:80px;
    float: left;
    margin: 8px 0;
    line-height: 80px;
    font-size: 24px;
    color: #666;
}
</style>