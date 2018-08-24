<template>
  <div class="storeHome" ref="ctn">
    <div class="page-shop-index">
    	<div class="header border horizonBottom">
    	 <router-link :to="{path:'/storeIntroduced/'+userMsg.sellerId}">
			<div class="avatar">
				<div class="headimg"  v-bind:style="{backgroundImage: 'url(' + userMsg.headimgurl + ')'}">
				</div>
			</div>
		</router-link>
			<div class="shopInfo">
				<div class="name">
					<a href="#" class="verified">{{userMsg.sellerName}}</a>
				</div>
				<div class="userattr">
						<div class="item">
							<span>
								<i class="iconfont  icon-xingxing2"></i>
							</span>
							<span class="txt text-one">{{userMsg.points}}分</span>
						</div>
						<!-- 实名认证判断 -->
						<div class="item realName">
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
							<div class="nosetup pay" v-if="userMsg.topicCash == 0">
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

					<div class="operation clearfix" v-show="!selfIs">
						<div class="attention" @click="focusShop()">
					        <span>{{focus}}</span>
					    </div>
					    <div class="private">
					    	<router-link :to="{path: userMsg.selfIs ? '/news' : '/news/' + userMsg.sellerId}">
					        	<span>私信</span>
					    	</router-link>
					    </div>
					</div>
					<div class="qrCode">
				    	<i @click="open()" class="iconfont icon-erweima"></i>
				    </div>
				</div>
	    	</div>
	    <div class="storeDes">
			<i class="iconfont  icon-notice"></i>
			{{userMsg.sellerdesc}}
		</div>	
		<div class="tabBox tabBoxFrame sticky" >
			<div class="tabListBox">
				<div class="tabBox">
					<div class="tab" v-for ="(list,index) in auctionType" :class="{ selected:changeRed == index}" @click="Red(index)" :key="list.id">
						{{list.text}}
					</div>
				</div>
			</div>
		</div>
    </div>
    <div class="popularitySaleMain">
        <!-- 优选轮播 -->
      <div v-if="youxuanListFlag">
        <div class="title">
          <div class="titleLeft">
            <i class="iconfont icon-youxuan"></i>
            <i  style="color:#333;">优选</i>
          </div>
          <div class="titleRight">
            <router-link  :to="{path: '/selective'}">
            <i style="color:#666;">全部</i>
            <i class="iconfont icon-right"></i>
            </router-link>
          </div>
        </div>
        <swiper dots-position="center" height="330px">
          <swiper-item v-for="(list, index) in youxuanList" :key="index">
            <router-link :to="{name: 'auction', params: {id: list.id }}">
              <div class="lotPic" v-bind:style ="{ backgroundImage: 'url(' + list.auction_img + ')'}"> 
                <i class="desc">{{list.auction_description}}</i>
                <div class="time" v-if="list.preview">
                  <div style="width:60px;position:absolute;left:0;right:0">距离开拍:</div>
                  <countDownCo style="position:absolute;top:0;right:5px" :endtime='parseFloat(list.preview_time)' :dayShow='false' :secShow='true'></countDownCo>
                </div>
                <div class="inpreview" v-if="list.preview">
                  {{list.lstate}}
                </div>
              </div>
            </router-link>
            <div class="saleInfo" >
              <div class="price">￥{{list.firstprice}}</div>
              <div class="bidNum">已有{{list.chujia_num}}人出价</div>
              <div class="popularity">
                <span>{{list.viewnum}}</span>
                <i class="iconfont icon-huo"></i>
              </div>
              <div class="stopClick like" v-show="list.like==true">
                <span class="stopClick">{{list.likenum}}</span>
                <i class="iconfont icon-xin"></i>
              </div>
              <div class="stopClick like step" @click="giveLike(list.id,index)" v-show="list.like==false">
                <span class="stopClick">{{list.likenum}}</span>
                <i class="iconfont icon-xin1"></i>
              </div>
            </div>
          </swiper-item>
          </swiper>
      </div>
      <div v-if="yuzhanListFlag">
        <div class="title">
            <div class="titleLeft">
              <i class="iconfont icon-youxuan"></i>
              <i  style="color:#333;">预展</i>
            </div>
            <div class="titleRight">
              <router-link  :to="{path: '/privateView',query:{user_id:user_id}}">
              <i style="color:#666;">全部</i>
              <i class="iconfont icon-right"></i>
              </router-link>
            </div>
          </div>
          <div class="singPic">   
                <div class="bacPic" :style="{backgroundImage: 'url(' + yuzhanList.auction_img + ')'}">
                    <div class="time"><span>距离开拍:{{tostahour}}时{{tostamin}}分{{tostasec}}</span> </div>
                </div>
                <div class="desc">
                    <div style="font-size: 14px;">{{yuzhanList.auction_description}}</div>
                    <div class="down">
                        <div class="price">￥{{yuzhanList.price}}起</div>
                        <div class="peop">已有<i style="color:black">{{yuzhanList.likenum}}</i>人围拍报名</div>
                    </div>
                </div>
            </div>
      </div>
      <div v-if="noData">
        <!-- 今日拍品头部 -->
        <div class="banner" v-if="isshow">
          <i class="iconfont  icon-rili"></i>
          <span class="banner_text">今日拍品</span>
        </div>
        <!-- 今日拍品 截拍 全部 -->
        <div class="saleList" :class="{current : auctionList.length > 0}">
            <ul>
              <li class="saleItem" v-for="(item,index) in auctionList" :key="index">
                <router-link :to="{path: '/auction/'+item.id}">
                <div class="categorySaleList" v-bind:style="{backgroundImage:'url(' + item.auction_img + ')'}"></div>
                <!-- 距离截拍 -->
                <div class="countDowns" v-show="upcoming">
                  <i class="iconfont  icon-shizhong"></i>
                  <div class="countDownText">距截拍</div>
                  <div class="countDownTime">
                    <div class="timeBox"><countDownCo style="position:absolute" :endtime='parseFloat(item.end_time)' :dayShow='false' :secShow='true'></countDownCo></div>
                  </div>
                </div>
                <div class="saleContent">
                  <div class="desc">{{item.auction_description}}</div>
                  <div class="saleInfo">
                    <!-- <div class="price">￥{{item.leadingprice == '0' ? item.firstprice : (item.leadingprice>item.firstprice?item.leadingprice:'') }}</div> -->
                    <div class="price">￥{{isPrice(item.leadingprice) ? item.leadingprice : item.firstprice}} <span v-if="!isPrice(item.leadingprice)">起</span> </div>
                    <div class="popularityIcon">
                      <i class="iconfont icon-huo"></i>
                    </div>
                    <div class="popularity">{{item.viewnum}}</div>
                  </div>
                </div>
                </router-link>
          <div class="label" v-if="type == 'total'">
            <span>{{dataStatus(item.state)}}</span>
          </div>
              </li>
            </ul>
        </div>
      </div>
      <div v-else class="imgBox"><img src="../../assets/images/beat.png" alt=""></div>
    </div>
    <!-- 二维码图片 -->
    <div class = "imageMask" v-if="isImagePreview" @click.stop="isImagePreview = !isImagePreview">
      <div class = "imagePreviews">
        <img :src="previewImg[0]" alt="">
      </div>
    </div>
    <actionsheet v-model="focusUser" :menus="menus1" @on-click-menu-menu4="click" show-cancel></actionsheet>
		<toast v-model="showSuccess" :text="toastText" type="text"  :time="1000" is-show-mask></toast>
  </div>
</template>
<script>
import countDown from "../common/countDown";
import countDownCo from "../common/countDownCo";
import { Swiper, Actionsheet, Toast, SwiperItem } from "vux";
import {
  useinfo,
  auctionFocus,
  cancelFocus,
  ShopTwoDimensionalCode,
  storeyuzhan
} from "../../api/api";
import { ImagePreview } from "vant"; //图片预览
export default {
  components: {
    Actionsheet,
    Toast,
    Swiper,
    SwiperItem,
    countDown,
    countDownCo
  },
  data() {
    return {
      isshow: true, //今日拍品头部是否展示
      auctionList: [],
      userMsg: [],
      auctionType: [
        {
          text: "店铺首页",
          type: "new"
        },
        {
          text: "即将截拍",
          type: "upcoming"
        },
        {
          text: "全部拍品",
          type: "total"
        }
      ],
      pagenum: 15,
      page: 0,
      changeRed: 0,
      type: "new",
      user_id: "",
      menus1: {
        menu3: "关注该店铺",
        menu4: "关注"
      },
      showSuccess: false,
      focusUser: false,
      focus: "关注",
      toastText: "",
      selfIs: "",
      toendhours: "00",
      toendminite: "00",
      toendsecond: "00",
      upcoming: false,
      youxuanList: [],
      youxuanListFlag: true,
      yuzhanListFlag: true,
      previewImg: [],
      yuzhanList: {},
      tostahour: "00",
      tostamin: "00",
      tostasec: "00",
      datashow: true,
      starttimer: "", //定时器
      status: {
        //字典
        auctioning: "竞拍中",
        preview: "预展中",
        sectional: "已截拍",
        abortive: "已流拍"
      },
      flagArr: [], //数据获取节流阀
      noData: true, //是否展示没有数据图片
      newList: [], //今日拍品
      upcomingList: [], //即将截拍
      totalList: [], //全部拍品
      isImagePreview : false,//二维码图片是否展示
    };
  },
  created() {
    window.addEventListener("scroll", this.scrollHandler);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  methods: {
    //判断当前的type值 渲染相对应的数组
    isType() {
      let list = [];
      if (this.type == "new") {
        list = this.newList;
      } else if (this.type == "upcoming") {
        list = this.upcomingList;
      } else if (this.type == "total") {
        list = this.totalList;
      }
      return list;
    },
    //判断价格 有没有出过价
    isPrice(price) {
      if (price > "0") {
        return true;
      } else {
        return false;
      }
    },
    //字典
    dataStatus(state) {
      return this.status[state];
    },
    //获取数据列表
    getDataList() {
      this.user_id = this.$route.params.user_id;
      let params = {
        type: "one"
      };
      storeyuzhan(this.user_id, params)
        .then(res => {
          this.usermsg(res);
          this.storeyouxuan(res);
          this.storeyuzhan(res);
        })
        .catch(err => {
          this.yuzhanListFlag = false;
        });
    },
    //二维码预览
    open() {
      ShopTwoDimensionalCode(this.user_id)
        .then(res => {
          this.previewImg = [res.data.url];
          this.isImagePreview = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //关注或者取消
    click(key) {
      if (this.focus == "关注") {
        let seller_id = this.user_id;
        cancelFocus(seller_id, "focus")
          .then(res => {
            if (res.code == 200) {
              this.showSuccess = true;
              this.toastText = "关注成功";
              this.focus = "已关注";
              this.menus1.menu3 = "取消关注将无法看到该店铺的拍品";
              this.menus1.menu4 = "取消关注";
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (this.focus == "已关注") {
        let seller_id = this.user_id;
        cancelFocus(seller_id, "cancel")
          .then(res => {
            if (res.code == 200) {
              this.showSuccess = true;
              this.toastText = "取消关注成功";
              this.focus = "关注";
              this.menus1.menu3 = "关注该店铺";
              this.menus1.menu4 = "关注";
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //注册scroll事件并监听
    scrollHandler() {
      const st = document.documentElement.scrollTop || document.body.scrollTop;
      const ch = this.$refs.ctn.clientHeight;
      if (st + window.innerHeight >= ch) {
        let list = this.isType();
        this.useinfo(list);
      }
    },
    usermsg(res) {
      let _this = this;
      //   _this.user_id = this.$route.params.user_id;
      //   storehomeusermsg(_this.user_id)
      //     .then(function(res) {
      _this.goShares(res.data.share);
      _this.userMsg = res.data.top;
      let data = res.data.top;
      _this.focus = data.isAttention;
      _this.selfIs = data.selfIs;
      document.title = data.sellerName + "的店铺";
      if (_this.focus == true) {
        _this.focus = "已关注";
        _this.menus1.menu3 = "取消关注将无法看到该店铺的拍品";
        _this.menus1.menu4 = "取消关注";
      } else {
        _this.focus = "关注";
      }
      // })
      // .catch(function(error) {
      //   console.log(error);
      // });
    },
    useinfo(list) {
      list = list ? list : this.newList;
      let flag = this.flagArr.indexOf(this.type);
      if (flag > -1) {
        return;
      }
      this.page += 1;
      if (this.type == "upcoming") {
        this.upcoming = true;
      } else {
        this.upcoming = false;
      }
      let _this = this;
      _this.user_id = this.$route.params.user_id;
      let params = {
        page: _this.page,
        pagenum: _this.pagenum,
        type: _this.type
      };
      useinfo(params, _this.user_id)
        .then(res => {
          list.push(...res.data);
          _this.auctionList = list;
          _this.auctionList.length > 0 &&
            _this.auctionList.forEach(function(item) {
              _this.timetoend(item.end_time);
            });
        })
        .catch(error => {
          console.log(error);
          this.flagArr.push(this.type);
          if (_this.auctionList.length == 0) {
            this.noData = false;
          }
        });
    },
    //预展
    storeyuzhan(res) {
      if (res.data.preview == false) {
        this.yuzhanListFlag = false;
      } else {
        this.yuzhanList = res.data.preview;
        this.Kaitimetoend(this.yuzhanList.time);
      }
    },
    //开拍倒计时
    Kaitimetoend(starttime) {
      let self = this;
      clearInterval(this.starttimer);
      this.starttimer = setInterval(function() {
        let nowTime = new Date();
        let t = starttime - Math.floor(nowTime.getTime() / 1000);
        if (t > 0) {
          let stahour = Math.floor(t / 3600);
          let stamin = Math.floor((t / 60) % 60);
          let stasec = Math.floor(t % 60);
          stahour = stahour < 10 ? "0" + stahour : stahour;
          stamin = stamin < 10 ? "0" + stamin : stamin;
          stasec = stasec < 10 ? "0" + stasec : stasec;
          if (stahour <= 0) {
            self.tostahour = "00";
          }
          if (stahour <= 0 && stamin <= 0) {
            self.tostahour = "00";
          }
          if (stamin <= 0) {
            self.tostamin = "00";
          }
          self.tostahour = stahour;
          self.tostamin = stamin;
          self.tostasec = stasec;
        } else {
          clearInterval(this.starttimer);
          self.tostahour = "00";
          self.tostamin = "00";
          self.tostasec = "00";
        }
      }, 1000);
    },
    // 优选数据
    storeyouxuan(res) {
      let _this = this;
      //   _this.user_id = this.$route.params.user_id;
      //   storeyouxuan(_this.user_id)
      //     .then(res => {
      if (res.data.preferenceIs === false || res.data.preference === false) {
        this.youxuanListFlag = false;
        return;
      }
      _this.youxuanList = _this.youxuanList.concat(res.data.preference);
      // })
      // .catch(function(error) {
      //   console.log(error);
      // });
    },
    Red(index) {
      this.page = 0; //分页值归零
      this.auctionList = []; //渲染数组置空
      this.changeRed = index;
      this.type = this.auctionType[index].type; //发送请求的type值更新
      this.flagArr = []; //节流阀数组置空
      this.noData = true; //暂无数据图片初始化
      //渲染今日拍品 截拍 全部的数组清空
      this.newList = [];
      this.upcomingList = [];
      this.totalList = [];
      if (this.type == "upcoming") {
        this.upcoming = true;
      } else {
        this.upcoming = false;
      }
      if (index == 0) {
        this.isshow = true;
        if (this.youxuanList.length != 0) {
          this.youxuanListFlag = true;
        } else {
          this.youxuanListFlag = false;
        }
        if (this.yuzhanList.time) {
          this.yuzhanListFlag = true;
        } else {
          this.yuzhanListFlag = false;
        }
      } else {
        this.isshow = false;
        this.youxuanListFlag = false;
        this.yuzhanListFlag = false;
      }
      let list = this.isType();
      this.useinfo(list);
    },
    //点击关注按钮
    focusShop() {
      this.focusUser = true;
    },
    //点赞
    giveLike(uri, index) {
      let _this = this;
      _this.article_id = uri;
      auctionFocus(_this.article_id)
        .then(res => {
          this.youxuanList[index].like = true;
          this.youxuanList[index].likenum++;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //进行倒计时
    timetoend(endtime) {
      let self = this;
      let timer = setInterval(function() {
        let nowTime = new Date();
        let enddTime = new Date(endtime * 1000);
        let t = endtime - Math.floor(nowTime.getTime() / 1000);
        let month = enddTime.getMonth() + 1;
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

        if (t > 0) {
          let hour = Math.floor(t / 3600);
          let min = Math.floor((t / 60) % 60);
          let sec = Math.floor(t % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          if (hour <= 0) {
            self.toendhours = "00";
          }
          if (min <= 0) {
            self.toendminite = "00";
          }
          if (t <= 300) {
            self.show = true;
          }
          self.toendhours = hour;
          self.toendminite = min;
          self.toendsecond = sec;
        } else {
          clearInterval(timer);
          self.toendhours = "00";
          self.toendminite = "00";
          self.toendsecond = "00";
          self.haveend = false;
          self.havepaimaiend = true;
        }
      }, 1000);
    }
  },
  mounted() {
    this.getDataList();
    // let name = localStorage.getItem("name");
    // document.title = name + "的店铺";
    window.scrollTo(0, 0);
    let list = this.isType();
    this.useinfo(list);
    if (
      this.auctionList.length == "0" &&
      this.yuzhanListFlag == false &&
      this.youxuanListFlag == false
    ) {
      this.data = false;
    }
  }
};
</script>
<style>
/* .van-image-preview__image {
	max-width : 80%;
} */
/* 清除浮动的代码 */
.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}
.clearfix {
  zoom: 1;
}
.storeHome {
  font-family: PingFang-SC-Medium;
}
.storeHome .imageMask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  z-index: 999;
}
.storeHome .imageMask .imagePreviews {
  width: 80%;
  height: 100%;
  position: absolute;
  top : 50%;
  left : 50%;
  transform: translate(-50%,-50%);
}
.storeHome .imageMask .imagePreviews img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top : 50%;
  transform : translateY(-50%);
}
.storeHome .label {
  width: 110px;
  height: 38px;
  background-color: rgba(0, 0, 0, 0.37);
  border-radius: 18px;
  text-align: center;
  line-height: 38px;
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.storeHome .label span {
  font-size: 21px;
}
.storeHome .singPic {
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  background: white;
}
.storeHome .singPic .bacPic {
  height: 6.533333rem;
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.storeHome .singPic .bacPic .time,
.storeHome .vux-slider .lotPic .time {
  width: 260px;
  height: 37px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 18px;
  color: white;
  text-align: center;
  line-height: 37px;
  position: absolute;
  left: 20px;
  top: 20px;
}
.storeHome .singPic .bacPic .time span {
  color: #fff;
  font-size: 20px;
}

.storeHome .singPic .desc {
  height: 80px;
  padding: 20px 20px;
}
.storeHome .singPic .desc .down {
  overflow: hidden;
}
.storeHome .singPic .desc .down .price {
  float: left;
  font-size: 34px;
  color: #9e2026;
  margin-top: 10px;
}
.storeHome .singPic .desc .down .peop {
  float: right;
  color: #999999;
  font-size: 24px;
  margin-top: 20px;
}
.storeHome .iconfont {
  color: #999;
  font-size: 0.49333rem;
}
.storeHome {
  background-color: #f4f4f4;
  max-width: 750px;
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
}
.storeHome .page-shop-index .header {
  width: 100%;
  position: relative;
  height: 188px;
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
}
.storeHome .page-shop-index .header .avatar {
  margin: 26px 26px 30px 30px;
  height: 127px;
  padding: 3px;
  border: 2px solid #ececec;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}
.storeHome .page-shop-index .header .shopInfo {
  height: 188px;
  -ms-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
}

.storeHome .border.horizonBottom:after {
  left: 0;
  bottom: 0;
}
.storeHome .border.horizonTop:after,
.border.horizonBottom:after {
  width: 100%;
  height: 2px;
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}
.storeHome .border:after {
  position: absolute;
  content: "";
  background-color: #d9d9d9;
}
.storeHome .page-shop-index .header .avatar .headimg {
  width: 127px;
  height: 127px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.storeHome .page-shop-index .header .shopInfo .name {
  padding-top: 30px;
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  color: #000;
  overflow: hidden;
  font-size: 30px;
  color: #f15511;
}
.storeHome .page-shop-index .header .shopInfo .userattr {
  width: 100%;
  /* height: 60px; */
  margin-top: 10px;
}
.storeHome .page-shop-index .shopInfo .name .sellerLevel {
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
.storeHome .sellerLevel {
  float: left;
  width: 60px;
  height: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(../../assets/images/sellerLevels.png);
}
.storeHome .page-shop-index .header .shopInfo .name a {
  float: left;
  display: block;
  overflow: hidden;
  max-width: 3.8rem;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  font-weight: 700;
  width: 100%;
  height: 100%;
  text-align: left;
}
.storeHome .page-shop-index .qrCode {
  width: 37px;
  height: 37px;
  position: absolute;
  top: 30%;
  right: 30px;
}
.storeHome .storeDes {
  height: 92px;
  line-height: 80px;
  font-size: 24px;
  color: #333;
  background-color: #fff;
}
.storeHome .storeDes .icon-notice {
  color: #666;
  margin: 0;
  font-size: 38px;
  margin-left: 40px;
}
.storeHome .operation {
  width: 100%;
  overflow: hidden;
}
.storeHome .operation .attention {
  width: 100px;
  height: 34px;
  line-height: 34px;
  border-radius: 4px;
  border: 1px solid #f15511;
  text-align: center;
  float: left;
  margin-right: 20px;
}
.storeHome .operation .attention span {
  width: 39px;
  font-size: 20px;
  color: #f15511;
}
.storeHome .operation .private {
  width: 100px;
  height: 34px;
  line-height: 34px;
  border-radius: 4px;
  border: solid 1px #13b0fd;
  text-align: center;
  float: left;
}
.storeHome .operation .private span {
  width: 39px;
  font-family: PingFang-SC-Medium;
  font-size: 20px;
  color: #13b0fd;
}

.storeHome .page-shop-index .sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.storeHome .page-shop-index .tabBox {
  width: 100%;
  z-index: 999;
  margin-top: 20px;
}
.storeHome .page-shop-index .tabListBox {
  width: 100%;
  max-width: 750px;
  display: flex;
  background-color: #fff;
  margin-bottom: 20px;
  z-index: 999;
}
.storeHome .page-shop-index .tabListBox .selected {
  color: #9e2026;
}
.storeHome .page-shop-index .tabListBox .tabBox {
  float: left;
  height: 100px;
  color: #999;
  cursor: pointer;
  display: flex;
}

.storeHome .page-shop-index .tabListBox .tabBox .tab {
  height: 36px;
  width: 33.3%;
  line-height: 36px;
  margin-top: 37px;
  font-size: 28px;
  text-align: center;
  border-left: 1px solid #e5e5e5;
}
.storeHome .popularitySaleMain .title {
  height: 100px;
  line-height: 100px;
  background-color: #fff;
  box-sizing: border-box;
  margin-left: 0;
  padding-left: 0.4rem;
}
.storeHome .popularitySaleMain .title .titleLeft {
  float: left;
  margin-left: 25px;
  color: #333;
}
.storeHome .popularitySaleMain .title .titleRight {
  float: right;
  color: #999;
  margin-right: 25px;
}
.storeHome .popularitySaleMain .title .icon-youxuan {
  color: #f15511;
  margin: 0;
  font-size: 30px;
}
.storeHome .popularitySaleMain .title .icon-right {
  color: #999;
  font-size: 28px;
  margin: 0;
}
.storeHome .vux-slider {
  width: 100%;
}
.storeHome .popularitySaleMain .icon-rili {
  display: inline;
  color: #13b0fd;
}

.storeHome .popularitySaleMain .banner {
  height: 100px;
  text-indent: 4px;
  line-height: 110px;
  background-color: #fff;
}
.storeHome .banner .banner_text {
  vertical-align: top;
  font-size: 28px;
  color: #333;
}
.storeHome .saleList {
  overflow: hidden;
  position: relative;
  padding: 5px 20px 15px 20px;
  padding-bottom: 1.333rem;
}
.storeHome .current {
  background-color: #fff;
}
.storeHome .saleList .saleItem {
  position: relative;
  width: 4.6rem;
  float: left;
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 11px;
}
.storeHome .saleItem:nth-of-type(odd) {
  margin-right: 0.25rem;
}
.storeHome .saleList .saleItem .categorySaleList {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 428px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.storeHome .saleList .saleItem .saleContent {
  width: 100%;
  margin: 3px 0 7px;
  overflow: hidden;
}
.storeHome .saleList .saleItem .saleContent .desc {
  width: 95%;
  margin: 4px auto;
  font-size: 24px;
  height: 36px;
  line-height: 36px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.storeHome .saleList .saleItem .saleContent .saleInfo {
  position: relative;
  width: 95%;
  height: 36px;
  margin: 5px auto;
  line-height: 36px;
  color: #999;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
}
.storeHome .saleList .saleItem .saleContent .saleInfo .price {
  -ms-flex: 1;
  flex: 1;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  color: #962125;
  font-size: 28px;
}
.storeHome .saleList .saleItem .saleContent .saleInfo .price i {
  font-size: 28px;
  padding-left: 2px;
}

.storeHome .saleList .saleItem .saleContent .saleInfo .popularityIcon {
  height: 36px;
  color: #a3a3a3;
  font-size: 32px;
  cursor: default;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
}
.storeHome
  .saleList
  .saleItem
  .saleContent
  .saleInfo
  .popularityIcon
  .icon-huo {
  margin: 0;
}
.storeHome .saleList .saleItem .saleContent .saleInfo .popularity {
  font-size: 28px;
  line-height: 36px;
}
.storeHome .header .shopInfo .userattr {
  width: 100%;
  height: 50px;
  /* margin-top: 10px; */
}
.storeHome .header .shopInfo .userattr .item,
.storeHome .header .shopInfo .userattr .item span {
  float: left;
  line-height: 0.6rem;
}
.storeHome .header .shopInfo .userattr .item span:last-child {
  line-height: 0.6rem;
}
.storeHome .header .shopInfo .userattr .item {
  margin-right: 20px;
  vertical-align: middle;
  line-height: 0.6rem;
}
.storeHome .header .shopInfo .userattr .realName {
  padding-top: 0.03rem;
}
.storeHome .header .shopInfo .userattr .pay {
  padding-top: 0.04rem;
}
.storeHome .header .shopInfo .userattr .text-one {
  padding-top: 0.03rem;
}
.storeHome .header .shopInfo .userattr .txt {
  display: inline-block;
  color: #999;
  font-size: 24px;
  margin-left: 8px;
}
.storeHome .setup .icon-renzhengyonghu,
.storeHome .setup .icon-anquanbaozhang {
  color: #ffac00;
  margin: 0;
  font-size: 0.4rem;
}
.storeHome .nosetup .icon-renzhengyonghu,
.storeHome .nosetup .icon-anquanbaozhang {
  color: #999;
  margin: 0;
  font-size: 28px;
}
.storeHome .saleInfo .likeIt .icon-xin3,
.storeHome .saleInfo .likeIt .icon-xin1 {
  font-size: 32px;
  height: 72px;
  line-height: 69px;
}
.storeHome .icon-xingxing2 {
  color: #ffac00;
  margin: 0;
  font-size: 28px;
}
.storeHome .step .icon-xin1 {
  color: #999;
  margin: 0;
}
.storeHome .weui-mask {
  background: rgba(0, 0, 0, 0.4);
}
.storeHome .weui-actionsheet__cell {
  height: 110px;
  line-height: 110px;
  padding: 0;
  color: #333;
  font-size: 30px;
}
.storeHome .weui-actionsheet__action {
  margin-top: 11px;
}
.storeHome .user .userattr {
  width: 100%;
  height: 50px;
  margin-top: 10px;
}

.storeHome .saleList .countDowns {
  position: absolute;
  left: 0;
  bottom: 95px;
  width: 100%;
  height: 64px;
  line-height: 64px;
  color: #fff;
  font-size: 22px;
  /* opacity: 0.45; */
  background-color: rgba(0, 0, 0, 0.45);
}
.storeHome .saleList .icon-shizhong {
  color: #fff;
  font-size: 28px;
  float: left;
  margin: 0 10px 0 30px;
}
.storeHome .saleList .countDownText {
  float: left;
  margin-right: 10px;
  font-size: 22px;
}
.countDownTime {
  float: left;
}
.storeHome .saleList .countDownTime .timeBox {
  float: left;
}
.storeHome .saleList .timeSep {
  float: left;
  margin: 0 6px;
}
/*优选轮播图样式*/
.storeHome .vux-slider > .vux-indicator-center {
  right: 50%;
  position: absolute;
}
.storeHome .vux-slider > .vux-indicator > a > .vux-icon-dot.active,
.vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
  background-color: #9e2026;
}
.storeHome .vux-slider > .vux-indicator > a > .vux-icon-dot,
.vux-slider .vux-indicator-right > a > .vux-icon-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.storeHome .vux-slider > .vux-indicator,
.vux-slider .vux-indicator-right {
  bottom: 0.2rem;
}
.storeHome .vux-slider > .vux-swiper > .vux-swiper-item > a {
  height: 80%;
}
.storeHome .vux-slider .lotPic .inpreview {
  width: 1.466667rem;
  height: 0.56rem;
  background-color: #52b1e1;
  font-size: 14px;
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  text-align: center;
  line-height: 0.56rem;
  border-radius: 0.266667rem;
}

.storeHome .vux-slider .lotPic .desc {
  padding: 20px;
  box-sizing: border-box;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.4);
  background-image: none;
  font-size: 28px;
  white-space: normal;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.storeHome .vux-swiper-item .lotPic {
  width: 100%;
  float: left;
  height: 490px;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.storeHome .saleInfo {
  width: 92%;
  background-color: #fff;
  height: 104px;
  line-height: 1.04rem;
  color: #999;
  padding: 0 4%;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
}
.storeHome .saleInfo .price {
  font-size: 34px;
  color: #9e2026;
  font-family: MicrosoftYaHei;
}
.storeHome .saleInfo .bidNum {
  padding-left: 0.5em;
  text-align: left;
  font-size: 24px;
  -ms-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
}
.storeHome .saleInfo .popularity,
.storeHome .saleInfo .like {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
  display: -webkit-flex;
}
.storeHome .saleInfo .like {
  padding-left: 0.2rem;
}
.storeHome .saleInfo .stopClick {
  position: relative;
  z-index: 999;
}
.storeHome .saleInfo .popularity span,
.storeHome .saleInfo .like span {
  font-size: 28px;
  display: inline-block;
}
.storeHome .slider .sliderBox .sliderImg .saleInfo .bidNum {
  padding-left: 0.5em;
  text-align: left;
  font-size: 26px;
  line-height: 1.1rem;
  -ms-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
}
.storeHome .icon-xin,
.storeHome .icon-huo {
  color: #f15511;
  margin: 0;
  font-size: 30px;
}

.storeHome .icon-untitled44 {
  color: #f15511;
  margin: 0;
  font-size: 30px;
}

.imgBox img {
  width: 507px;
  height: 278px;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>