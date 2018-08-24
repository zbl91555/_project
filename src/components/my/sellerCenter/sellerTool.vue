<template>
  <div class="sellerTool">
   	<div class="menuTitle">营销工具</div>
   	<div class="menuMain">
		<dl>
			<router-link to="/sellerCenter/sellerTool/luckyBag">		
				<dd class="window ">
					<span class="icon">
						<span class="wptFM fi-stack">
							<i class="iconfont icon-wodehongbao"></i>
						</span>
					</span>
					<div>
						福袋
					</div>
				</dd>
			</router-link>
			<router-link to="/sellerCenter/sellerTool/luckyBag">	
				<dd class="cheap">
					<span class="icon">
						<span class="wptFM fi-stack">
							<i class="iconfont icon-zhekou"></i>
						</span>
					</span>
					<div>
						折扣
					</div>
				</dd>
			</router-link>
			<router-link to="/sellerCenter/sellerTool/luckyBag">	
				<dd class="invitegift ">
					<span class="icon">
						<span class="wptFM fi-stack">
							<i class="iconfont icon-xuexishuben"></i>
						</span>
					</span>
					<div>
						新手推广
					</div>
				</dd>
			</router-link>
		</dl>
	</div>
	<div class="menuTitle">推广中心</div>
   	<div class="menuMain">
		<dl>
			<router-link to="/lotSorting">	
				<dd class="window ">
					<span class="icon">
						<span class="wptFM fi-stack">
							<i class="iconfont icon-paixu-"></i>
						</span>
					</span>
					<div>
						拍品排序
					</div>
				</dd>
			</router-link>
			<router-link to="selective">	
				<dd class="cheap ">
					<span class="icon">
						<span class="wptFM fi-stack">
							<i class="iconfont icon-xuanzhong"></i>
						</span>
					</span>
					<div>
						优选店铺
					</div>
				</dd>
			</router-link>
			<router-link to="promotionGift">	
				<dd class="invitegift ">
					<span class="icon">
						<span class="wptFM fi-stack">
							<i class="iconfont icon-weibiaoti2fuzhi04"></i>
						</span>
					</span>
					<div>
						推广有礼
					</div>
				</dd>
			</router-link>
		</dl>
	</div>
  </div>
</template>
<style>
	.sellerTool{
		max-width: 750px;
		min-height: 100vh;
		background-color: #ededef;
		padding-top: 20px;
	}
	.sellerTool .menuTitle {
	    color: #666;
	    font-size: 28px;
	    padding: 37px 0 37px 30px;
	    background-color: #fff;
	}
	.sellerTool .menuTitle:nth-child(3){
		margin-top: 20px;
	}
	.sellerTool .menuMain {
	    margin: 0;
	    width: 100%;
	    display: table;
	    overflow: hidden;
	    background-color: #FFF;
	    border-bottom: 1px solid #e5e5e5;

	}
	.sellerTool .iconfont{
		font-size: 58px;
	}
	.sellerTool .icon-wodehongbao{
		color: #fc8f26;
	}
	.sellerTool .icon-zhekou{
		color: #00b25d;
	}
	.sellerTool .icon-xuexishuben{
		color: #fe668a;
	}
	.sellerTool .icon-paixu-{
		color: #eb3e3e;
	}
	.sellerTool .icon-xuanzhong{
		color:#379fd8;
	}
	.sellerTool .icon-weibiaoti2fuzhi04{
		color:#ffcc00;
	}
	.sellerTool .menuMain dl dd {
	    position: relative;
	    float: left;
	    width: 33.33%;
	    color: #424242;
	    font-size: 15px;
	    cursor: pointer;
	    padding-top: 30px;
	    text-align: center;
	    padding-bottom: 40px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	}
	.sellerTool .menuMain dl dd:nth-child(1):before {
	    height: 0;
	}
	.sellerTool .menuMain dl dd:not(:nth-child(3n)):after {
	    position: absolute;
	    content: '';
	    top: 0;
	    left: 100%;
	    width: 2px;
	    height: 100%;
	    -ms-transform: scaleX(0.5);
	    transform: scaleX(0.5);
	    background-color: #e5e5e5;
	    -webkit-transform: scaleX(0.5);
	}
	.sellerTool .menuMain dl dd:nth-child(3n + 1):before {
	    position: absolute;
	    content: '';
	    top: 0;
	    left: 0;
	    width: 301%;
	    height: 2px;
	    -ms-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	    background-color: #e5e5e5;
	    -webkit-transform: scaleY(0.5);
	}

	.sellerTool .menuMain dl dd .icon {
	    width: 50px;
	    display: block;
	    font-size: 20px;
	    margin: 20px auto;
	}
	.sellerTool .menuMain dl dd div {
	    height: 36px;
	    line-height:36px;
	    font-size: 28px;
	    color: #333;
	}
	.sellerTool .menuMain dl dd .icon .fi-stack {
	    width: 50px;
	}
	.fi-stack {
	    position: relative;
	    display: inline-block;
	    width: 2em;
	    height: 2em;
	    line-height: 2em;
	    vertical-align: middle;
	}
	.iconfont{
		margin: 0;
	}
</style>

