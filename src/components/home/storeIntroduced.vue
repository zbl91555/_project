<template>
  <div class="userifon">
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
					{{storeInfos.province}}&nbsp;{{storeInfos.city}}
				</div>
			</div>
		</div>
		<div class="userBuyer">
			<div class="titleBanner msg">
				<div class="title">
					店铺信息
				</div>
				<div class="contents">
					<div class="score">
						积分 {{storeInfos.spoints}}
					</div>
					<router-link :to="'/storeHome/'+storeInfos.id">
						<div @click="toStoreH(storeInfos.nickname)" class="baguette">
							<i>进店</i>
							<i class="iconfont icon-right"></i>
						</div>
					</router-link>
				</div>
			</div>
		</div>
		<div class="userBuyer">
			<div class="rate">
				<div class="buyerRate">
					<span class="title">拍品评分</span>
					<div class="contents detailed">{{storeInfos.pingfen}}分</div>
				</div>
				<div class="buyerRate">
					<span class="title">违约比例</span>
					<div class="contents detailed">{{storeInfos. seller_weiyue}}%</div>
				</div>
				<div class="buyerRate">
					<span class="title">实名认证</span>
					<div class="contents" id="contentss">{{is_company}}</div>
				</div>
			</div>
		</div>
		<div class="userInfo">
			<div class="province">
				<div class="title">消保金</div>
				<div class="contents">{{gold}}</div>
			</div>
			<div class="province">
				<div class="title">粉丝数量</div>
				<div class="contents">{{storeInfos.fans}}</div>
			</div>
		</div>
		<div class="userInfo" v-if="!storeInfos.me">
			<div class="province">
				<div class="title">联系商家</div>
				<div class="contents"></div>
				<router-link :to="{name:'letter',params:{user_id:storeInfos.id,user_name:storeInfos.nickname}}">
					<div class="black">
						<i class="iconfont icon-xiaoxi3"></i>
					</div>
				</router-link>
			</div>
		</div>
		<div class="userInfo">
			<div class="province">
				<div class="title">店铺介绍</div>
				<div class="contents">{{storeInfos.signature}}</div>
			</div>
			<div class="province share">
				<div class="title ">分享店铺</div>
				<div class="contents"></div>
				<div class="black">
					<i class="iconfont icon-right"></i>
				</div>
			</div>
		</div>
		<div class="userInfo" v-if="!storeInfos.me">
			<div class="tel blackListButton" @click="shieldingBtn()" >
				<div class="title">屏蔽用户</div>
				<div class="contents"></div>
				<div class="black">
					<i class="iconfont icon-right"></i>
				</div>
			</div>
		</div>
		<actionsheet v-model="shield" :menus="menus2" @on-click-menu-menu1="shielduser" @on-click-menu-menu2="viewshielduser" show-cancel></actionsheet>
		<toast v-model="showSuccess" :text="toastText" type="text" width="15em" :time="1000" is-show-mask></toast>
	</div>
</template>
<script>
import { Actionsheet, Toast } from 'vux'
import { storeInfo, shielduser, cancelshielduser } from '../../api/api'
export default {
  components: {
    Actionsheet,
    Toast
  },
  data () {
    return {
      storeInfos: [],
      pagenum: 10,
      page: 1,
      user_id: '',
      is_company: '',
      gold: '',
      level: '',
      shield: false,
      menus2: {
        menu1: '屏蔽该用户',
        menu2: '查看屏蔽用户'
      },
      showSuccess: false,
      toastText: '',
      is_pingbi: '',
      isshow: '',
      pingbi_count: ''
    }
  },
  methods: {
    storeInfo () {
      this.user_id = this.$route.params.seller_id
      storeInfo(this.user_id)
        .then(res => {
          if (res.code == 200) {
            if (res.data.me == true) {
              this.menus2 = {
                menu2: '查看屏蔽用户'
              }
            } else {
              if (res.data.is_pingbi == '0') {
                this.menus2 = {
                  menu1: '屏蔽该用户',
                  menu2: '查看屏蔽用户'
                }
              } else if (res.data.is_pingbi == '1') {
                this.menus2 = {
                  menu1: '取消屏蔽该用户',
                  menu2: '查看屏蔽用户'
                }
              }
            }
            this.storeInfos = res.data
            this.pingbi_count = res.data.pingbi_count

            this.is_pingbi = res.data.is_pingbi
            //   localStorage.setItem('name',this.storeInfos.nickname)
            document.title = this.storeInfos.nickname + '的店铺信息'
            this.level = res.data.user_id
            if (res.data.is_company == true) {
              this.is_company = '已实名认证'
            } else {
              this.is_company = '未实名认证'
            }

            if (res.data.xiaobaojin == '1') {
              let pric = res.data.xiaobaojin_price
              this.gold = '已缴纳' + pric + '元'
            } else {
              this.gold = '未缴纳'
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击屏蔽按钮
    shieldingBtn () {
      this.shield = true
    },
    shielduser () {
      console.log(this.user_id)
      // 0 未屏蔽 1 已屏蔽  2自己
      if (this.is_pingbi == '0') {
        let params = {
          type: 'add'
        }
        shielduser(this.user_id, params)
          .then(res => {
            //   this.showSuccess = true;
            // this.toastText='屏蔽成功'
            this.storeInfo()
            this.menus2.menu1 = '取消屏蔽该用户'
            this.$router.push('/shieldingUsers')
          })
          .catch(err => {
            console.log(err)
          })
      } else if (this.is_pingbi == '1') {
        let params = {
          type: 'cancel'
        }
        shielduser(this.user_id, params)
          .then(res => {
            this.showSuccess = true
            this.toastText = '取消屏蔽用户成功'
            this.menus2.menu1 = '屏蔽该用户'
            this.storeInfo()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.showSuccess = true
        this.toastText = '无法屏蔽自己'
      }
    },
    // 查看屏蔽用户
    viewshielduser () {
      // 屏蔽为空时，不跳转屏蔽列表
      if (this.pingbi_count == '0') {
        this.showSuccess = true
        this.toastText = '您没有屏蔽的用户'
      } else {
        this.$router.push({ path: '/shieldingUsers' })
      }
    }
  },

  mounted () {
    this.storeInfo()
  }
}
</script>
<style>
.userifon {
  width: 100%;
  max-width: 750px;
  background-color: #ededef;
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: 60px;
  overflow: scroll;
  padding-bottom: 110px;
}
.userifon .userHeader {
  position: relative;
  width: 100%;
  height: 168px;
  background-color: #fff;
}
.userifon .userHeader .avatar {
  width: 118px;
  height: 118px;
  float: left;
  margin: 25px 28px;
  border-radius: 3px;
  background-color: #fff;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
}
.userifon .userHeader .avatar .img {
  width: 118px;
  height: 118px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.userifon .userHeader .userinfo {
  height: 168px;
}
.userifon .userInfo {
  margin-top: 20px;
  border-bottom: 0.013333rem solid #e5e5e5;
}
.userifon .userHeader .userinfo .name {
  height: 36px;
  line-height: 36px;
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
.userifon .userHeader .userinfo .desc {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  height: 60px;
  font-size: 24px;
  line-height: 30px;
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
.userifon .userHeader .userinfo .name .buyerLevel {
  margin-right: 8px;
}
.userifon .userHeader .shopButton {
  position: absolute;
  top: 40%;
  right: 26px;
}
.userifon .userHeader .attention {
  float: right;
  width: 77px;
  height: 36px;
  line-height: 36px;
  border-radius: 2px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  background-color: #9e2026;
  border: 1px solid #9e2026;
  cursor: pointer;
  padding: 7px 15px;
  border-radius: 6%;
}
.userifon .userHeader .cancel {
  color: #fff;
  background-color: #9e2026;
  border: 1px solid #9e2026;
  cursor: pointer;
}
.userifon .userBuyer {
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
  border-bottom: 1px solid #e5e5e5;
}
.userifon .userBuyer .titleBanner {
  position: relative;
  height: 100px;
  margin-left: 32px;
}

.userifon .userBuyer .titleBanner .title {
  font-size: 28px;
  line-height: 100px;
  color: #333;
  float: left;
  width: 24%;
  text-align: left;
  height: 100px;
  margin-left: 0;
}
.userifon .userSeller .titleBanner .title,
.userifon .authenticate .titleBanner .title {
  text-align: left;
}
.userifon .userBuyer .titleBanner .contents {
  height: 100px;
  line-height: 100px;
}
.userifon .userBuyer .titleBanner .score {
  float: left;
  font-size: 26px;
  color: #999;
  position: relative;
}
.userifon .memberLevelScores {
  margin-left: 20px;
}
.userifon .userBuyer .titleBanner .help {
  float: left;
  width: 29px;
  height: 29px;
  line-height: 100px;
  cursor: pointer;
  color: #999;
  margin-left: 20px;
}

.userifon .userBuyer .titleBanner .blackListButton {
  position: absolute;
  top: 7px;
  right: 4%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 28px;
  color: #333;
}
.userifon .userHeader .userinfo .name .sellerLevel {
  margin-right: 10px;
  margin-bottom: 10px;
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
.userifon .userBuyer .rate {
  position: relative;
  margin-left: 4%;
}
.userifon .userBuyer .rate .buyerRate {
  width: 100%;
  height: 100px;
  line-height: 100px;
}
.userifon .userBuyer .rate .buyerRate {
  border-bottom: 1px solid #e5e5e5;
}
.userifon .userBuyer .rate .buyerRate:last-child {
  border: none;
}
.userifon .buyerRate:first-child > .contents {
  margin-left: -24px !important;
}
.userifon .userBuyer .rate .buyerRate #contentss {
  color: #999;
}
.userifon .userBuyer .rate .buyerRate .title {
  font-size: 28px;
  color: #333;
  float: left;
  width: 24%;
  margin-left: 0 !important;
}
.userifon .userBuyer .rate .buyerRate .contents {
  font-size: 26px;
  color: #f15511;
}
.userifon .userInfo .name,
.userifon .userInfo .tel,
.userifon .userInfo .weixin,
.userifon .userInfo .province {
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 100px;
}
.userifon .userInfo .name:after,
.userifon .userInfo .tel:after,
.userifon .userInfo .weixin:after,
.userifon .userInfo .province:after {
  position: absolute;
  content: "";
  bottom: 0%;
  right: 0%;
  width: 96%;
  height: 2px;
  background-color: #d9d9d9;
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}
.userifon .userInfo div:last-child:after {
  height: 0px;
}
.userifon .userInfo .name .title,
.userifon .userInfo .tel .title,
.userifon .userInfo .province .title,
.userifon .userInfo .weixin .title {
  float: left;
  width: 22%;
  margin-left: 4%;
  line-height: 100px;
  font-size: 28px;
  color: #333;
}
.userifon .userInfo .name .contents,
.userifon .userInfo .tel .contents,
.userifon .userInfo .province .contents,
.userifon .userInfo .weixin .contents {
  font-size: 26px;
  line-height: 100px;
  color: #999;
  max-width: 67%;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.userifon .userInfo .tel .call,
.userifon .userInfo .tel .message,
.userifon .userInfo .tel .black {
  display: -webkit-flex;
  position: absolute;
  right: 4%;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.userifon .userInfo .tel.blackListButton i,
.userifon .userInfo .share i,
.userifon .userBuyer .titleBanner.msg i {
  font-size: 26px;
  color: #999;
}

.fi-stack .icon-xingxing,
.fi-stack .icon-renzhengyonghu {
  color: #ffac00;
}
.userifon button {
  width: 94%;
  margin: 20px 3%;
  padding: 0;
  border: 1px solid #199c18;
  background: #08ba06;
  border-radius: 3px;
  height: 42px;
  line-height: 42px;
  font-size: 18px;
  color: #f7f7f7;
  outline: none;
  cursor: pointer;
}
.userifon button.cancel {
  background-color: #e95757;
  border: 1px solid #e95757;
  cursor: pointer;
}
.userifon .adminMenu {
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
.userifon .adminMenu span {
  width: 36px;
  height: 36px;
  line-height: 36px;
}
.userifon .wptMultiConfirm .btn-confirm.toggleBlackList {
  color: #df4040;
}

.userifon .supportBanner a {
  color: #f2b896 !important;
}
.black {
  display: -webkit-flex;
  position: absolute;
  right: 4%;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #999;
}
.baguette {
  float: right;
  font-size: 24px;
  color: #999;
  position: relative;
  right: 4%;
}
.userifon .userHeader .userinfo .name .sellerLevel {
  margin-right: 10px;
}
.sellerLevel.lv4,
.lv4 {
  background-position: 0 0px;
}
.sellerLevel {
  float: left;
  width: 60px;
  height: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(../../assets/images/sellerLevels.png);
}

.userifon .weui-mask {
  background: rgba(0, 0, 0, 0.4);
}
.userifon .weui-actionsheet__cell {
  height: 110px;
  line-height: 110px;
  padding: 0;
  color: #333;
  font-size: 30px;
}
.userifon .weui-actionsheet__action {
  margin-top: 11px;
}
</style>
