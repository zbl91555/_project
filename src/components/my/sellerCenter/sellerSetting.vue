<template>
  <div class="sellerSetting">
    <div class="userInfobox">
    <router-link  to="/member/setData">
    	<div class=" userInfoitem basic  unverified ">
    		<div class="avatar">
    			<div class="img" v-bind:style="{backgroundImage: 'url(' + sellerInfo.avatar + ')'}"></div>
    		</div>
    		<div class="detailInfo">
    			<div class="nickname">{{sellerInfo.nickname}}</div>
    			<div class="introduce">{{sellerInfo.is_company=='已'?'头像、地区每月可修改一次':'资料设置一周可修改一次'}}</div>
    			<div class="setting">
	    			<div class="arrow">
	    				<i class="iconfont icon-right"></i>
	    			</div>
	    				<div class="desc">设置</div>
    			</div>
    		</div>
    	</div><!-- /member/addressInformation -->
    </router-link>
    	<router-link  :to="'/member/receiveAddress/'+this.type">
    	<div class=" userInfoitem border address return" style="min-height: 80px;">
    		<div class="titleSetting" style="line-height: 80px;">退货地址</div>
    		<div class="info" style="line-height: 80px;">
    			<div style="height: 80px;">
	    			<span style="margin-top: 20px;font-size: 16px;">{{sellerInfo.address.name}} {{sellerInfo.address.tele}}</span>
	    			{{sellerInfo.address.province }} {{sellerInfo.address.city}} {{sellerInfo.address.country}} {{sellerInfo.address.address}}
    			</div>
    		</div>
    		<div class="arrow">
    			<i class="iconfont icon-right"></i>
    		</div>
    	</div>
    	</router-link>
    </div>
    <div class="label">资质信息</div>
    <div class="userInfobox qualify right">
		<router-link  to="/sellerCenter/realnameApplication">
		<div class="userInfoitem">
			<div class="titleSetting">
				实名认证
			</div>
			<div class="info">
				<i class="iconfont icon-duihao2" v-show="isShow"></i>
				<i>{{sellerInfo.is_company+sellerInfo.is_company_type}}认证</i>
				<div class="arrow">
					<i class="iconfont icon-right"></i>
				</div>
			</div>
		</div>
		</router-link>
		<router-link  to="/member/consumerSecurity">
			<div class="userInfoitem border">
				<div class="titleSetting">
					消保金
				</div>
				<div class="info">
					{{sellerInfo.deposit}}
					<div class="arrow">
						<i class="iconfont icon-right"></i>
					</div>
				</div>
			</div>
		</router-link>
	</div>
	<div class="label">店铺设置</div>
	<div class="userInfobox sellerSettings right">
		<router-link  :to="'/bidConditions/'+sellerInfo.sellersetting">
			<div class="userInfoitem">
				<div class="titleSetting">
					买家出价条件设置
				</div>
				<div class="info">
					{{sellerInfo.sellersetting}}
					<div class="arrow">
						<i class="iconfont icon-right"></i>
					</div>
				</div>
			</div>
		</router-link>
	</div>
	<div class="label">用户设置</div>
	<div class="userInfobox right">
	<router-link  to="/fans">
		<div class="userInfoitem">
			<div class="titleSetting">
				粉丝
			</div>
			<div class="info">
				{{sellerInfo.fans}}
				<div class="arrow">
					<i class="iconfont icon-right"></i>
				</div>
			</div>
		</div>
	</router-link>
	<div class="userInfoitem border" @click="shieldingBtn()">
		<div class="titleSetting">
				屏蔽用户
		</div>
		<div class="info">
			{{sellerInfo.pingbi}}
			<div class="arrow">
				<i class="iconfont icon-right"></i>
			</div>
		</div>
	</div>
</div>
<div class="label">高级设置</div>
<div class="userInfobox advanceSettings">
	<div class="userInfoitem">
		<div class="titleSetting">
			固定『我的』为卖家中心
		</div>
		<div class="info">
			<div class="switchBtn" @click="switchBtn()">
				<input v-model="switchBoolen" class="switch" type="checkbox" value="on">
			</div>   
		</div>
	</div>
</div>
<toast v-model="showSuccess" :text="toastText" type="text" width="15em" :time="1000" is-show-mask></toast>
  </div>
</template>
<script>
import { Toast } from "vux";
import { getSellerUserInfo, switchBtn } from "../../../api/api";
import assign from "../../../assets/js/assign.js"; //混入式方法
export default {
  components: {
    Toast
  },
  mixins: [assign],
  data() {
    return {
      sellerInfo: {address : {}},
      isShow: false,
      mylink: "0",
      pingbi: "",
      showSuccess: false,
      toastText: "",
      type: "",
      switchBoolen: false
    };
  },
  methods: {
    sellerInfos() {
      getSellerUserInfo()
        .then(res => {
          if (res.code == 200) {
            this.type = res.data.type;
            this.sellerInfo = res.data;
            this.mylink = res.data.mylink;
            this.pingbi = res.data.pingbi;
            if (this.sellerInfo.is_company == true) {
              this.sellerInfo.is_company = "已";
              this.isShow = !this.isShow;
              if (this.sellerInfo.is_company_type == "individual") {
                this.sellerInfo.is_company_type = "个人";
              } else {
                this.sellerInfo.is_company_type = "企业";
              }
            } else {
              this.sellerInfo.is_company = "未";
              this.sellerInfo.is_company_type = "";
            }

            if (this.sellerInfo.deposit == "1") {
              this.sellerInfo.deposit = "已缴纳";
            } else {
              this.sellerInfo.deposit = "未缴纳";
            }
            if (this.sellerInfo.sellersetting == "1") {
              this.sellerInfo.sellersetting = "已开启";
            } else {
              this.sellerInfo.sellersetting = "未开启";
            }
            if (this.mylink == "1") {
              this.switchBoolen = true;
            } else {
              this.switchBoolen = false;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    switchBtn() {
      let type;
      if (this.mylink == "0") {
        type = "seller";
      } else if (this.mylink == "1") {
        type = "user";
      }
      let params = {
        type: type
      };
      switchBtn(params)
        .then(res => {
          if (type == 'seller') {//卖家
            localStorage.setItem("mylink", true);
          } else {//买家
            localStorage.setItem("mylink", false);
          }
        })
        .catch(err => {
          console.log(error);
        });
    },
    //屏蔽用户
    shieldingBtn() {
      if (this.pingbi == "0") {
        this.showSuccess = true;
        this.toastText = "您没有屏蔽的用户";
      } else {
        this.$router.push({ path: "/shieldingUsers" });
      }
    }
  },
  mounted() {
    this.sellerInfos();
  }
};
</script>
<style scoped>
.icon-right {
  font-size: 24px;
  color: #999;
}
.sellerSetting {
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: 160px;
  padding-top: 0.2rem;
  background-color: #ededef;
  max-width: 750px;
}
.sellerSetting .userInfobox:first-child {
  margin-top: 0;
}
.sellerSetting .userInfobox {
  width: 100%;
  background-color: #fff;
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
}
.sellerSetting .userInfobox .userInfoitem {
  width: 96%;
  min-height: 100px;
  margin-left: 4%;
  position: relative;
  color: #999;
  font-size: 0.28rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.sellerSetting .userInfobox .userInfoitem.basic {
  height: 168px;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.sellerSetting .address {
  height: 120px;
  line-height: 120px;
}
.sellerSetting .userInfobox .userInfoitem:last-child {
  cursor: default;
}
.sellerSetting .userInfobox .userInfoitem.basic .avatar {
  width: 113px;
  height: 113px;
  float: left;
  margin: 26px 0;
  border: 0.02rem solid #eee;
  padding: 0.02rem;
}
.sellerSetting .userInfobox .userInfoitem.basic .detailInfo {
  margin: 0 0 0 0.2rem;
  overflow: hidden;
}
.sellerSetting .userInfobox .userInfoitem.basic .avatar .img {
  width: 111px;
  height: 111px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 0.02rem;
}
.sellerSetting .userInfobox .userInfoitem.basic .detailInfo .nickname {
  font-size: 30px;
  color: #333;
  line-height: 1.2;
  margin: 0.64rem 1rem 0.23rem 0;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.sellerSetting .userInfobox .userInfoitem.basic .detailInfo .introduce {
  font-size: 24px;
  color: #999;
  float: left;
  padding-right: 0.12rem;
}
.sellerSetting .userInfobox .userInfoitem.basic .setting {
  height: 100%;
  position: absolute;
  top: 0;
  right: 4%;
  color: #666;
  font-size: 24px;
}

.sellerSetting .userInfobox .userInfoitem.basic .setting .arrow {
  position: relative;
  top: 0;
  float: right;
  font-size: 0.28rem;
  display: block;
  width: 0.24rem;
  height: 1.8rem;
  color: #999;
  margin-left: 0.16rem;
  line-height: 1.8rem;
  margin-top: 0;
  right: 0;
}
.sellerSetting .userInfobox .userInfoitem.basic .setting .desc {
  float: right;
  height: 1.8rem;
  right: 10%;
  line-height: 1.95rem;
  display: block;
  color: #888;
  font-size: 0.32rem;
  padding-left: 0.4rem;
}

.sellerSetting .userInfobox .userInfoitem.address.return .titleSetting {
  width: 23%;
  display: block;
}
.sellerSetting .userInfobox .userInfoitem .titleSetting {
  width: 45%;
  color: #333;
  font-size: 28px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.sellerSetting .advanceSettings .userInfoitem .titleSetting {
  width: 70%;
}
.sellerSetting .userInfobox .userInfoitem.address.return .info {
  width: 66%;
  margin: 0 2rem 0 0;
  white-space: normal;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.sellerSetting .userInfobox .userInfoitem .info .icon-duihao2 {
  color: #fd8f01;
  font-size: 26px;
  margin-right: 4px;
}
.sellerSetting .userInfobox .userInfoitem.address .info {
  text-align: left;
  line-height: 1;
  margin-bottom: 0.2rem;
}

.sellerSetting .userInfobox .userInfoitem .address .return .info div {
  width: 100%;
}
.sellerSetting .userInfobox .userInfoitem .info {
  width: 44%;
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  color: #999;
  margin-right: 4%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.sellerSetting .userInfobox .userInfoitem.address.return .arrow {
  position: absolute;
  right: 4%;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.sellerSetting .userInfobox .userInfoitem .arrow {
  color: #c8c8c8;
}
.sellerSetting .border:after {
  width: 100%;
  height: 0.02rem;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  background-color: #d9d9d9;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.border:after {
  position: absolute;
  content: "";
  background-color: #d9d9d9;
}
.sellerSetting .label {
  font-size: 0.28rem;
  text-indent: 4%;
  color: #888;
}
.sellerSetting .userInfobox {
  width: 100%;
  background-color: #fff;
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
}

.sellerSetting .userInfobox.right .userInfoitem .info {
  text-align: right;
}

.sellerSetting .userInfobox.advanceSettings .switchBtn {
  overflow: hidden;
  margin: auto 8% auto 35%;
}
input.switch {
  position: relative;
  width: 104px;
  height: 64px;
  outline: none;
  display: block;
  margin: 0;
  border-radius: 35px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  border: solid 2px #dfdfdf;
  background-color: #dfdfdf;
  cursor: pointer;
}
input.switch:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100px;
  height: 60px;
  border-radius: 34px;
  background-color: #fff;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  -o-transition: transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}
input.switch:after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  -o-transition: transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
input.switch:checked {
  background-color: #d32838;
  border: solid 1px #d32838;
}
input.switch:checked:before {
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}
input.switch:checked:after {
  -webkit-transform: translateX(40px);
  -ms-transform: translateX(40px);
  transform: translateX(40px);
}
.sellerSetting .userInfobox .userInfoitem.address .info div {
  line-height: 1.4;
}
.sellerSetting .userInfobox .userInfoitem .info span {
  white-space: normal;
  word-break: break-all;
}
.sellerSetting .userInfobox .userInfoitem .info span {
  margin: 0rem 0 0.15rem;
  display: block;
}
</style>