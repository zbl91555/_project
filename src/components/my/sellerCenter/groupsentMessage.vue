<template>
  <div class="groupsentMessage" ref="grp">
    <div class = "cover" v-if="show" @click.stop="isShow">
      <div class = "promptMessage">拍品信息进入群发队列，稍后进行发送</div>
      <div class = "confirm" @click.stop="isShow">知道了</div>
    </div>
      <div class="topBanner border horizonBottom">
        <div class="send btn" @click.stop="massHair">群&nbsp;&nbsp;发</div>
      </div>
      <div class="saleMsgMain">
        <div class="saleMsgHead border">
          <div class="saleMsgStatic">
            <span>今日剩余群发消息：<i class="saleMsgNum">{{num}}</i></span>
          </div>
          <div class="saleMsgTips">
            <div class="iconfont icon-yiwen"></div>
            <div>如何群发消息</div>
          </div>
        </div>
        <div class="saleList">
          <div class="saleList_group" v-for="(item,index) in data" :key="item.auction_id" v-if="item">
            <div class="saleItem border horizonTop">
              <div class="goodsImg" :style="{background: 'url('+ item.auction_img +')',backgroundSize : '100%'} ">
              </div>
              <div class="saleContent">
                <div class="desc" :class="item.is_share?'isClass':''">
                  {{item.auction_desc}}
                </div>
                <div class="saleContentBottom">
                  <div class="endTime" :class="item.is_share?'isClass':''">
                    {{timestampToTime(item.end_time)}}
                  </div>
                </div>
              </div>
              <div class="selected">
                <i v-if="item.is_share" class="iconfont" :class="item.selected?'icon-duihao2' : 'icon-yuancircle46'" @click.stop="select(item.auction_id,index)"></i>
              </div>
            </div>
            <div class="shareMask" v-if="!item.is_share">
              <p>分享拍品后才能群发</p>
              <div class="button" @click.stop="immediateSharing(item.auction_id)">
                立即分享
              </div>
            </div>
          </div>
        </div>
      </div>
  <div v-if="hide" class = "tidingsSetting" ></div>
</div>
</template>

<script>
import { groupsentMessage, messageGroup } from '../../../api/api'
import { Toast } from 'vant'
export default {
  name: 'groupsentMessage',
  data () {
    return {
      data: [], // 渲染列表
      selectArr: [], // 选中的数据
      isShare: '', // 分享后的数据
      show: false, // 弹出层
      page: 1,
      pageNum: 6,
      flag: false, // 节流阀
      num: 0, // 发送次数
      dataLength: 0, // 每次获取数据的条数
      indexs: [], // 选中的数据下
      hide: false,
      isMassHair: false
    }
  },
  methods: {
    // 判断是否是移动端
    // browserRedirect() {
    //   var sUserAgent = navigator.userAgent.toLowerCase();
    //   var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    //   var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    //   var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    //   var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    //   var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    //   var bIsAndroid = sUserAgent.match(/android/i) == "android";
    //   var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    //   var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    //   if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {  n
    //     return true;
    //   } else {
    //     return false;
    //     }
    // },
    // 注册scroll事件并监听
    scrollHandler () {
      const st = document.documentElement.scrollTop || document.body.scrollTop
      const ch = this.$refs.grp.clientHeight
      if (st + window.innerHeight >= ch) {
        this.getMessage()
      }
    },
    // 弹出层
    isShow () {
      this.show = false
    },
    // 数据获取
    getMessage () {
      if (this.dataLength < this.pageNum) {
        return
      }
      if (this.flag) {
        return
      };
      this.flag = true
      let params = {
        page: this.page,
        pagenum: this.pageNum
      }
      groupsentMessage(params).then(res => {
        if (this.page == 1 && res.data.list.length == 0) {
          this.hide = true
        }
        this.page++
        console.log(res)
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].selected = false
        };
        // 匹配已经分享过的数据
        this.data = this.data.concat(res.data.list)
        this.flag = false
        this.num = res.data.qunfa_num
        this.dataLength = res.data.list.length
      }).catch(err => {
        console.log(err)
      })
    },
    // 群发
    massHair () {
      // let mobile = this.browserRedirect();
      let ua = window.navigator.userAgent.toLowerCase()
      let environment = (ua.match(/MicroMessenger/i) == 'micromessenger')
      if (!environment) {
        Toast('请到微信分享')
        return
      };
      if (this.num == 0) {
        Toast('一天只能群发消息三次')
        return
      };
      if (this.isMassHair) {
        return
      };
      this.isMassHair = true
      if (this.selectArr.length > 0) {
        messageGroup(this.selectArr).then(res => {
          for (let i = 0; i < this.indexs.length; i++) {
            this.data[+this.indexs[i]] = ''
          };
          this.show = true
          this.indexs = []
          this.selectArr = []
          this.num--
          this.isMassHair = false
        }).catch(err => {
          this.isMassHair = false
          Toast(err.data.message)
        })
      } else {
        Toast('请先分享拍品')
      }
    },
    // 分享
    immediateSharing (id) {
      this.$router.push('/auction/' + id)
    },
    // 选中的数组
    select (id, index) {
      let flag = this.data[index].selected
      let num = this.selectArr.indexOf(id)
      if (num > -1) {
        this.data[index].selected = !flag
        this.selectArr.splice(num, 1)
        this.indexs.splice(num, 1)
      } else {
        if (this.selectArr.length >= 7) {
          Toast('多选不能超过7条')
          return false
        };
        this.data[index].selected = !flag
        this.selectArr.push(id)
        this.indexs.push(index)
      };
    }
  },
  created () {
    this.dataLength = this.pageNum
    // this.isShare = JSON.parse(localStorage.getItem('share') || "[]");
    this.getMessage()
    window.addEventListener('scroll', this.scrollHandler)
  }
}
</script>

<style scoped>
  .tidingsSetting {
    width : 506px;
    height : 278px;
    position: fixed;
    top : 50%;
    left : 50%;
    transform : translate(-50%,-50%);
    background : url('../../../assets/images/beat.png');
    background-size : 100% 100%;
  }
.groupsentMessage .isClass {
  color : #d2d2d2!important;
}
.groupsentMessage .iconfont {
  font-size : 41px;
}
.cover {
  width : 100%;
  height : 100%;
  position: fixed;
  background-color : rgba(0,0,0,.5);
  z-index : 991;
}
.cover .promptMessage {
  width : 100%;
  height : 1.4666rem;
  background-color : #fff;
  color : #d2d2d2;
  text-align : center;
  line-height : 1.4666rem;
  position: absolute;
  bottom : 1.0444rem;
  z-index : 992;
  border-bottom : 1px solid #ededef;
}
.cover .confirm {
  width : 100%;
  height : 1.0444rem;
  background-color : #fff;
  color : rgb(181, 84, 89);
  text-align : center;
  line-height : 1.0444rem;
  position: absolute;
  bottom : 0;
  z-index : 992;
}
.groupsentMessage .icon-duihao2 {
  color : #9e2026;
}
.groupsentMessage {
  max-width: 750px;
  /* min-height: 100vh; */
  background-color: #f4f4f4;
  margin-bottom : 1.33334rem;
}
.groupsentMessage .topBanner {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 8;
  display: table;
  background-color: #fff;
}
.border.horizonBottom:after {
    left: 0;
    bottom: 0;
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
.groupsentMessage .topBanner .btn {
  float: right;
  color: #f15511;
  font-size: 28px;
  cursor: pointer;
  text-align: right;
  line-height: 26px;
  padding: 29px 30px 29px 30px;
  text-shadow: 0 0 0 #FFF;
}
.groupsentMessage .saleMsgMain {
  width: 100%;
  display: table;
  padding-top: 80px;
}
.groupsentMessage .saleMsgMain .saleMsgHead {
  width: 100%;
  height: 184px;
  display: table;
}
.groupsentMessage .saleMsgMain .saleMsgHead .saleMsgStatic {
  width: 94%;
  margin: 0 3%;
  height: 56px;
  line-height: 56px;
  padding-top: 30px;
}
.groupsentMessage .saleMsgMain .saleMsgHead .saleMsgStatic span {
  font-size: 34px;
  margin-right: 20px;
  color: #333;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}
.groupsentMessage .saleMsgMain .saleMsgHead .saleMsgStatic span i {
  color: #f15511;
}
.groupsentMessage .saleMsgMain .saleMsgHead .saleMsgTips {
  width: 94%;
  margin: 0 3%;
  height: 30px;
  line-height: 30px;
  margin-top: 30px;
  font-size: 28px;
  color: #666;
}
.groupsentMessage .saleMsgMain .saleMsgHead .saleMsgTips div{
  float:left;
}
.groupsentMessage .saleMsgMain .saleMsgHead .saleMsgTips div:nth-child(2){
  margin-left: 20px;
}
.icon-yiwen{
	color: #13b0fd;
	font-size: 28px;
	margin-right: 10px;
}
.groupsentMessage .saleMsgMain .saleMsgHead .saleMsgTips .icon {
  float: left;
  font-size: 10px;
  margin-left: -4px;
  line-height: 24px;
}
.saleList_group{
	margin-bottom: 10px;
	background-color: #fff;
	width: 97%;
  padding-left: 3%;
  display: flex;
  flex-wrap : wrap;
}
.groupsentMessage .saleMsgMain .saleList .saleItem {
	border-bottom: 1px solid #e5e5e5;
    position: relative;
    width: 100%;
    padding: 30px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
      -ms-flex-flow: row;
          flex-flow: row;
    -webkit-flex-flow: row;
    cursor: pointer;
}
.groupsentMessage .saleMsgMain .saleList .saleItem  .selected{
	width: 60px;
	height: 124px;
	line-height: 124px;
  margin-right : 64px;
}
.groupsentMessage .saleMsgMain .saleList .saleItem  .selected .icon-chenggong{
	color: #9e2026
}
.groupsentMessage .saleMsgMain .saleList .saleItem .saleContent {
   display: -webkit-box;
   display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  display: -webkit-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
.groupsentMessage .saleMsgMain .saleList .saleItem .saleContentBottom {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row;
          flex-flow: row;
  -webkit-flex-flow: row;
}
.groupsentMessage .saleMsgMain .saleList .saleItem.border.horizonTop:first-child:after {
  height: 0;
}
.groupsentMessage .saleMsgMain .saleList .saleItem .goodsImg {
  width: 124px;
  height:124px;
  margin: 1px 25px 1px 1px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 3px;
}
.groupsentMessage .saleMsgMain .saleList .saleItem .desc {
	color: #333;
  font-size: 28px;
  line-height: 37px;
  margin-top: -2px;
  word-break: break-all;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  padding-right: 60px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.groupsentMessage .saleMsgMain .saleList .saleItem .endTime {
	color: #999;
	font-size: 24px;
  margin-top: 24px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: 29px;
  line-height: 29px;
}
.groupsentMessage .saleMsgMain .saleList  .shareMask {
  width : 100%;
	height: 97px;
	line-height: 97px;
	position: relative;
}
.groupsentMessage .saleMsgMain .saleList  .shareMask p{
	font-size: 24px;
	color: #333;
  float: left;
}
.groupsentMessage .saleMsgMain .saleList  .shareMask .button{
	width: 154px;
	height: 58px;
	line-height: 58px;
	text-align: center;
  color: #fff;
  background-color: #9e2026;
  font-size: 28px;
  border-radius: 5px;
  float: right;
  margin-right: 36px;
  margin-top: 20px;
}
.iconfont{
  margin: 0
}
</style>
