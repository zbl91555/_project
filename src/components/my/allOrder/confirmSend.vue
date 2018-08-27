<template>
  <div class="agreeReturnMoney">
      <div class="headInfo">
          拍品信息
      </div>
      <div class="buy-info">
        <div class="goods-info" v-bind:style="{backgroundImage: 'url(' + info.auctionImg + ')'}"></div>
        <p class="goods-intr">{{info.auctionDesc}}</p>
        <ul class="buyer-detail">
          <!-- <li>运费:{{info.freeship}}</li> -->
          <li>成交金额:{{info.true_price}}</li>
          <li>付款时间:{{timestampToTime(parseFloat(info.payment_time))}}</li>
        </ul>
      </div>
      <div class="gray"></div>
      <div class="returnmsg">
          <div class="returnheadmsg">收货信息</div>
          <div class="acceptman">
              <div class="acceptw">收货人:</div>
              <div>
                  <p>{{info.address_name}}</p>
                  <p class="adress">{{info.address_province}}{{info.address_city}}{{info.address_country}}{{info.address_address}}</p>
              </div>
              <div>{{info.address_tele}}</div>
          </div>
      </div>
      <div class="gray"></div>
      <div class="sendTodoor">
          <!-- <div>送货上门</div> -->
          <!-- <div><input @click="sendToDoor" class="checkbox" type="checkbox" v-model="toDoor"></div> @click="unGet"-->
          <div class="sendToClass" @click="sendToDoor">
              <div class="titleClass">送货上门</div>
              <!-- :disabled='ReciveDisabled'  :disabled='GetDisabled' -->
              <div class="iconClass"><i v-if="unGetshow" class="iconfont icon-finish"></i></div>
          </div>
      </div>
      <div class="fastCompany" v-if="orderNumbShow" @click="chooseCompany()">
            <div style="font-size: 14px">快递公司</div>
            <div >{{name}}</div>
            <div class="icon-jiantouxiangshang iconfont" v-if="show"></div>
            <div class="icon-jiantouxiangxia iconfont" v-else></div>
            <!-- <div v-if="allSelCompany">请选择快递公司</div> -->
      </div>
      <div class="allFastCompany" v-if="allFastCompany">
          <div :class="nowindex == index ? 'selected' :''" v-for="(Cpy,index) in info.express" :key="Cpy" @click="select(index)">{{Cpy.name}}</div>
          <router-link :to="'/sortTest/'+Id">
             <div @click="select">更多</div>
          </router-link>
      </div>
      <div v-if="orderNumbShow">
          <div class="orderNumb">
              <div style="font-size: 14px">运单号</div>
              <div class="icon-saoyisao iconfont" @click="scan"></div>
              <div class="txtClass"><input class="txt" placeholder="手输或扫描运单号" type="text" v-model="orderNb"></div>
          </div>
      </div>
      <div class="login-btn">
        <input @click="openAgree()" value="确认发货" class="icon-btn" type="button">
      </div>
      <!--弹出确认发货-->
      <div id="fixednumMain" v-if="agree==true ">
        <div @click="closeAgree()" class="fixednumMask" style="opacity: 0.38;">
        </div>
        <div class="sharesomething">
          <div class="popHeightone">
              <div>确认发货?</div>
          </div>
          <div class="popHeight red" @click="faHuo">发货</div>
          <div class="gray"></div>
          <div @click="closeAgree()" class="popHeight">取消</div>
        </div>
      </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import wx from 'weixin-js-sdk'
import assign from '../../../assets/js/assign.js' // 混入式方法
import { orderDeliverGoods, orderDeliverGoodsSubmit } from '../../../api/api'
export default {
  mixins: [assign],

  data () {
    return {
      agree: false,
      info: {},
      order_id: '',
      allFastCompany: false,
      show: true,
      toDoor: false,
      orderNumbShow: true,
      nowindex: 0,
      orderNb: '',
      CompId: '',
      name: '请选择快递公司',
      allSelCompany: true,
      Id: '',
      unGetshow: false
    }
  },

  methods: {
    select (index) {
      this.nowindex = index
      this.CompId = this.info.express[index].type
      this.name = this.info.express[index].name
      this.allFastCompany = false
      this.show = true
      this.hide = false
      this.allSelCompany = false
    },
    sendToDoor () {
      this.unGetshow = !this.unGetshow
      if (this.unGetshow) {
        this.orderNumbShow = false
        this.allFastCompany = false
      } else {
        this.orderNumbShow = true
      }
    },
    scan () {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          let orderNb = res.resultStr // 当needResult 为 1 时，扫码返回的结果
          let bool = orderNb.indexOf(',')
          if (bool == '-1') {
            this.orderNb = orderNb
          } else {
            let arr = orderNb.split(',')
            this.orderNb = arr[1]
          }
        }
      })
    },
    // down(){
    //     this.allFastCompany=true;
    //     this.show=false;
    //     this.hide=true
    // },
    chooseCompany () {
      if (this.show) {
        this.allFastCompany = true
        this.show = false
      } else {
        this.allFastCompany = false
        this.show = true
      }
    },
    // up(){
    //     this.allFastCompany=false;
    //     this.show=true;
    //     this.hide=false
    // },
    openAgree () {
      this.agree = true
    },
    closeAgree () {
      this.agree = false
    },
    orderDeliverGoods () {
      let order_id = this.$route.params.order_id
      this.order_id = order_id
      orderDeliverGoods(this.order_id)
        .then(res => {
          this.info = res.data
        })
        .catch(err => {
          console.log(err.data.message)
        })
    },
    faHuo () {
      let order_id = this.$route.params.order_id
      let params
      if (this.unGetshow) {
        params = {
          is_express: 2 // 1普通发货 2 送货上门
        }
      } else {
        params = {
          is_express: 1, // 1普通发货 2 送货上门
          code: this.orderNb,
          express: this.CompId
        }
      }
      orderDeliverGoodsSubmit(order_id, params)
        .then(res => {
          sessionStorage.setItem('deliverGoods', 'true')
          this.$router.push('/orderDetail/' + order_id)
          // console.log(res.data);
          // this.agree=false;
        })
        .catch(err => {
          if (err.data.code == '400') {
            Toast(err.data.message)
          }
        })
    }
  },
  mounted () {
    this.Id = this.$route.params.order_id
    this.name = this.$route.params.name
    this.CompId = this.$route.params.type
    this.orderDeliverGoods()
  }
}
</script>

<style scoped>
.icon-finish {
  margin: 0;
  width: 35px;
  font-size: 24px !important;
}
.titleClass {
  margin-left: 10px;
}
.iconfont {
  font-size: 48px;
}
.iconClass {
  width: 5px;
  border: 2px solid #a7a6a4;
  height: 25px;
  line-height: 25px;
  margin-top: 37px;
}
.agreeReturnMoney {
  height: 1250px;
}
.buy-info {
  height: 220px;
  background-color: white;
  padding: 27px 30px;
  box-sizing: border-box;
  position: relative;
}
.gray {
  background: #f7f7f7;
  height: 20px;
}
.buy-info .goods-info {
  height: 166px;
  width: 166px;
  float: left;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-right: 20px;
}
.buy-info .goods-intr {
  float: right;
  width: 73%;
  height: 60px;
  line-height: 30px;
  margin-bottom: 10px;
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color: #333;
  font-size: 28px;
}
.buy-info .buyer-detail {
  position: absolute;
  bottom: 27px;
  left: 220px;
}
.buy-info .buyer-detail li {
  height: 25px;
  line-height: 25px;
  background-color: transparent;
  padding: 0;
  color: #999;
  margin-top: 5px;
}
.headInfo {
  height: 80px;
  padding-left: 0.5333rem;
  line-height: 80px;
  background-color : #fff;
  position: relative;
}
.headInfo::after {
  content : '';
  display : block;
  width : 9.4777rem;
  border-bottom : 1px solid #e5e5e5;
  height : 2px;
  position: absolute;
  left : 0.5233rem;
  bottom : 0;
  box-sizing : border-box;
}
.returnmsg {
  height: 220px;
  background-color : #fff;
}
.returnheadmsg,
.sendmethod {
  height: 68px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 68px;
  margin-left: 30px;
}
.acceptman {
  overflow: hidden;
  padding: 30px 36px 30px 30px;
}
.acceptman div {
  float: left;
}
.acceptman div:nth-child(2) {
  float: left;
  width: 60%;
  padding: 0 5px;
  color: #999999;
}
.acceptman div:nth-child(3) {
  color: #999999;
}
.adress {
  margin-top: 18px;
}
.acceptw {
  color: #999999;
}
.yuantong {
  height: 128px;
  line-height: 128px;
  font-size: 36px;
  padding-left: 30px;
}
.login-btn {
  padding: 200px 30px 20px 30px;
  height: 166px;
  background: #ededef;
}
.login-btn .icon-btn {
  display: block;
  border: none;
  height: 82px;
  line-height: 82px;
  background: #9e2026;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  width: 100%;
  outline: none;
  -webkit-appearance: none;
  font-size: 28px;
}
.bottom {
  height: 112px;
  line-height: 112px;
  padding: 0px 240px;
  overflow: hidden;
}
.bottom div {
  line-height: 112px;
  float: left;
}
.bottom div:nth-child(2) {
  color: #ffac00;
}
.icon-right {
  margin-left: 50px;
  font-size: 18px;
  line-height: 56px;
}
.sharesomething {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1100;
  width: 100%;
  height: 320px;
  background: white;
  text-align: center;
}
.popHeight {
  height: 100px;
  line-height: 100px;
}
.popHeightone {
  height: 60px;
  padding: 20px 0px;
  color: #999999;
  border-bottom: 1px solid #e5e5e5;
  line-height: 60px;
  text-align: center;
}
.red {
  color: red;
  font-size: 36px;
}
.orderNumb {
  overflow: hidden;
  height: 140px;
  background-color : #fff;
  position: relative;
}
.orderNumb::after {
  content : '';
  display : block;
  width : 9.4777rem;
  border-top : 1px solid #e5e5e5;
  height : 1px;
  position: absolute;
  left : 0.5233rem;
  box-sizing : border-box;
}
.orderNumb div:nth-child(1) {
  float: left;
  line-height: 140px;
  margin-left: 40px;
}
.orderNumb div:nth-child(2) {
  float: right;
  line-height: 140px;
  margin: 0 20px 0 40px;
  color: #a7a6a4;
}
.orderNumb div:nth-child(3) {
  float: right;
  line-height: 140px;
}
.sendTodoor {
  height: 104px;
  background-color: #ededef;
  line-height: 104px;
  overflow: hidden;
  background-color : #fff;
}
.sendTodoor div {
  float: right;
  padding-right: 20px;
}
.checkbox {
  display: block;
  width: 36px;
  height: 36px;
  border: 1px solid #bfbfbf;
  margin-top: 33px;
}
.fastCompany {
  height: 106px;
  line-height: 106px;
  overflow: hidden;
  padding-right: 20px;
  padding-left: 40px;
  position: relative;
  background-color : #fff;
}
.fastCompany div:nth-child(1),
.fastCompany div:nth-child(2) {
  float: left;
  line-height: 106px;
}
.fastCompany div:nth-child(2) {
  position: absolute;
  right: 100px;
  top: 0;
  color: #666666;
  font-size: 28px;
}
.fastCompany div:nth-child(3) {
  float: right;
  line-height: 106px;
  margin: 0;
  color: #d2d2d2;
  font-size: 32px;
  margin-left: 40px;
}
.fastCompany div:nth-child(4) {
  float: right;
  line-height: 106px;
  margin: 0;
  color: #d2d2d2;
  font-size: 28px;
  margin-left: 40px;
}
.fastCompany div:nth-child(4) {
  float: right;
  line-height: 106px;
  color: #747474;
}
.allFastCompany {
  overflow: hidden;
  width: 100%;
}
.allFastCompany div {
  height: 60px;
  width: 26%;
  float: left;
  border: 2px solid #999999;
  margin-left: 5%;
  margin-bottom: 20px;
  line-height: 60px;
  text-align: center;
  border-radius: 15px;
}
.selected {
  background: #9e2026;
  color: white;
}
.txtClass {
  position: relative;
  width: 250px;
}
.txt {
  border: 0;
  color: #666666;
  height: 45px;
  position: absolute;
  top: 50px;
  right: 0;
  line-height: 35px;
  width: 320px;
  text-align: right;
  font-size: 28px;
}
input::-webkit-input-placeholder {
  text-align: right;
}
</style>
