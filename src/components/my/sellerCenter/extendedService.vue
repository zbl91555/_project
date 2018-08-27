<template>
  <div class="extendedService">
    <div class="menuTitle">扩展服务</div>
    <div class="menuMain">
		<dl>
			<router-link  to="/sellerReport">
				<dd class="window ">
					<span class="icon">
						<span class="wptFM fi-stack">
							<i class="iconfont icon-icon"></i>
						</span>
					</span>
					<div>
						店铺报表
					</div>
				</dd>
			</router-link>
			<router-link  to="/statements">
				<dd class="cheap ">
					<span class="icon">
						<span class="wptFM fi-stack">
							<i class="iconfont icon-wodezhangdan"></i>
						</span>
					</span>
					<div>
						对账单
					</div>
				</dd>
			</router-link>
			<router-link  to="/upload/?active=thanka" v-if="activityShow">
				<dd class="cheap ">
					<span class="icon">
						<span class="wptFM fi-stack">
							<i class="iconfont icon-shenpiyidongpaizhaokaoqin"></i>
						</span>
					</span>
					<div>
						唐卡活动发布
					</div>
				</dd>
			</router-link>
		</dl>
	</div>
  </div>
</template>

<script>
import { isOpenRelease } from '../../../api/api'
export default {
  name: 'extendedService',
  data () {
    return {
      activityShow: false
    }
  },
  methods: {
    // 活动发布入口
    isOpenRelease () {
      isOpenRelease()
        .then(res => {
          this.activityShow = res.data.thanka
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.isOpenRelease()
  }
}
</script>

<style>
.extendedService {
  max-width: 750px;
  min-height: 100vh;
  background-color: #ededef;
  padding-top: 20px;
}
.extendedService .icon-shenpiyidongpaizhaokaoqin {
	color : #ff3202;
}
.extendedService .menuTitle {
  color: #666;
  font-size: 28px;
  padding: 37px 0 37px 30px;
  background-color: #fff;
}
.extendedService .menuTitle:nth-child(3) {
  margin-top: 20px;
}
.extendedService .menuMain {
  margin: 0;
  width: 100%;
  display: table;
  overflow: hidden;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
}
.extendedService .iconfont {
  font-size: 58px;
}
.extendedService .icon-icon {
  color: #8dc63f;
}
.extendedService .icon-wodezhangdan {
  color: #fe8483;
}
.extendedService .menuMain dl dd {
  position: relative;
  float: left;
  width: 33.33%;
  color: #424242;
  font-size: 15px;
  cursor: pointer;
  padding-top: 15px;
  text-align: center;
  padding-bottom: 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.extendedService .menuMain dl dd:nth-child(1):before {
  height: 0;
}
.extendedService .menuMain dl dd:not(:nth-child(3n)):after {
  position: absolute;
  content: "";
  top: 0;
  left: 100%;
  width: 2px;
  height: 100%;
  -ms-transform: scaleX(0.5);
  transform: scaleX(0.5);
  background-color: #e5e5e5;
  -webkit-transform: scaleX(0.5);
}
.extendedService .menuMain dl dd:nth-child(3n + 1):before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 301%;
  height: 2px;
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #e5e5e5;
  -webkit-transform: scaleY(0.5);
}

.extendedService .menuMain dl dd .icon {
  width: 50px;
  display: block;
  font-size: 20px;
  margin: 50px auto;
}
.extendedService .menuMain dl dd div {
  height: 36px;
  line-height: 36px;
  font-size: 28px;
  color: #333;
}
.extendedService .menuMain dl dd .icon .fi-stack {
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
</style>
