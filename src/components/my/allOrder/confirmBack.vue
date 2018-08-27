<template>
  <div class="agreeReturnMoney" ref="agreeReturnMoney">
      <div class="headInfo">
          拍品信息
      </div>
      <div class="buy-info">
        <div class="goods-info" v-bind:style="{backgroundImage: 'url(' + info.auctionImg + ')'}"></div>
        <p class="goods-intr">{{info.auctionDesc}}</p>
        <ul class="buyer-detail">
          <li>成交金额:{{info.price}}</li>
          <li>同意退货:{{timestampToTime(parseFloat(info.tuihuoTime))}}</li>
        </ul>
      </div>
      <div class="gray"></div>
      <div class="returnmsg">
          <div class="returnheadmsg">卖家退货地址</div>
          <div class="acceptman">
              <div class="acceptw">收货人:</div>
              <div>
                  <p>{{info.name}}</p>
                  <p class="adress">{{info.province}}{{info.city}}{{info.country}}{{info.address}}</p>
              </div>
              <div>{{info.tele}}</div>
          </div>
      </div>
      <div class="gray"></div>
      <div class="sendTodoor">
          <div class="sendToClass" @click="unGet">
              <div class="titleClass">未收到货</div>
              <!-- :disabled='ReciveDisabled'  :disabled='GetDisabled' -->
              <div class="iconClass"><i v-if="unGetshow" class="iconfont icon-finish"></i></div>
          </div>
          <div class="sendToClass" @click="refuseGet">
              <div class="titleClass">拒收</div>
              <div class="iconClass"><i v-if="refuseGetshow" class="iconfont icon-finish"></i></div>
          </div>
      </div>
      <div class="fastCompany" v-if="show" @click="down">
            <div>快递公司</div>
            <div class="icon-jiantouxiangshang iconfont" v-if="shanghide"></div>
            <div class="icon-jiantouxiangxia iconfont" v-if="xiashow"></div>
            <div>{{CmoName}}</div>
      </div>
      <div class="allFastCompany" v-if="allFastCompany">
          <div :class="nowindex == index ? 'selected' : ''" v-for="(Cmp,index) in info.express" :key="Cmp" @click="select(index)">{{Cmp.name}}</div>
          <router-link :to="'/sortTest/'+Id+'/confirmBack'">
              <div>更多</div>
          </router-link>
      </div>
      <div v-if="show">
          <div class="orderNumb">
              <div>运单号</div>
              <div class="icon-saoyisao iconfont"></div>
              <div><input class="txt" placeholder="手输或扫描运单号" type="text" v-model="tuihuoExpresscode" ></div>
          </div>
      </div>
      <div class="login-btn" v-if="btnoneShow">
        <input @click="openAgree()" value="确认退货" class="icon-btn" type="button">
      </div>
      <div class="login-btn" v-if="btntwoShow">
        <input @click="tuihuo()" value="确认" class="icon-btn" type="button">
      </div>
      <!--弹出确认发货-->
      <div id="fixednumMain" v-if="agree==true ">
        <div @click="closeAgree()" class="fixednumMask" style="opacity: 0.38;">
        </div>
        <div class="sharesomething">
          <div class="popHeightone">
              <div>确认退货?</div>
          </div>
          <div class="popHeight red" @click="tuihuo">退货</div>
          <div class="gray"></div>
          <div @click="closeAgree()" class="popHeight">取消</div>
        </div>
      </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import {orderReturnGoodsNow, orderReturnGoodsNowSubmit} from '../../../api/api'
export default {
  data () {
    return {
      btnoneShow: true,
      btntwoShow: false,
      agree: false,
      info: {},
      order_id: '',
      hide: false,
      allFastCompany: false,
      show: true,
      xiashow: true,
      shanghide: false,
      nowindex: 0,
      CmoId: '',
      tuihuoExpresscode: '',
      unGetshow: false,
      refuseGetshow: false,
      CmoName: '请选择快递公司',
      Id: '',
      CompId: ''
    }
  },
  methods: {
    select (index) {
      this.nowindex = index
      this.CmoId = this.info.express[index].type
      this.allFastCompany = false
      this.xiashow = true
      this.shanghide = false
      this.CmoName = this.info.express[index].name
    },
    unGet () {
      this.unGetshow = !this.unGetshow
      this.refuseGetshow = false
      if (this.unGetshow) {
        this.show = false
        this.btnoneShow = false
        this.btntwoShow = true
        this.allFastCompany = false
      } else {
        this.show = true
        this.btnoneShow = true
        this.btntwoShow = false
      }
    },
    refuseGet () {
      this.refuseGetshow = !this.refuseGetshow
      this.unGetshow = false
      if (this.refuseGetshow) {
        this.show = false
        this.btnoneShow = false
        this.btntwoShow = true
        this.allFastCompany = false
      } else {
        this.show = true
        this.btnoneShow = true
        this.btntwoShow = false
      }
    },
    down () {
      this.allFastCompany = true
      this.xiashow = false
      this.shanghide = true
    },
    openAgree () {
      this.agree = true
    },
    closeAgree () {
      this.agree = false
    },
    // 页面
    orderReturnGoodsNow () {
      let order_id = this.$route.params.order_id
      orderReturnGoodsNow(order_id).then(
        res => {
          this.info = res.data
        }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    // 确认退货
    tuihuo () {
      let order_id = this.$route.params.order_id
      let params
      if (this.unGetshow == true) {
        params = {
          type: 'nogoods'
        }
      }
      if (this.refuseGetshow == true) {
        params = {
          type: 'reject'
        }
      }
      if (this.unGetshow == false && this.refuseGetshow == false) {
        if (this.CmoId == '') {
          Toast('请选择快递公司')
        }
        if (this.tuihuoExpresscode == '') {
          Toast('请填写快递单号')
        }
        params = {
          type: 'normal',
          express: this.CmoId,
          tuihuo_expresscode: this.tuihuoExpresscode
        }
      }
      orderReturnGoodsNowSubmit(order_id, params).then(
        res => {
          this.$router.push('/orderDetail/' + order_id)
          this.info = res.data
          this.refs.agreeReturnMoney.scrollTop = 0
        }).catch(err => {
        console.log(err.response.data.message)
      })
    }
  },
  mounted () {
    this.CmoName = this.$route.params.name
    this.CmoId = this.$route.params.type
    this.Id = this.$route.params.order_id
    this.orderReturnGoodsNow()
  }
}
</script>

<style scoped>
   .agreeReturnMoney{
     height:1350px;
     overflow-x:hidden
   }
   .icon-finish{
    margin: 0;
    width: 35px;
    font-size: 24px;
   }
   .titleClass{
     margin-left: 10px;
   }
   .iconClass{
     width: 5px;
     border: 2px solid #a7a6a4;
     height: 25px;
     line-height: 25px;
     margin-top: 37px;
   }
    .buy-info {
        height: 220px;
        background-color: white;
        padding: 27px 30px;
        box-sizing: border-box;
        position:relative;
  }
  .gray{
    background:#f7f7f7;
    height:20px;
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
  }
  .buy-info .buyer-detail {
          width: 73%;
          position: absolute;
          bottom: 27px;
          left:220px;
  }
  .buy-info .buyer-detail li {
        margin-top:10px;
        height: 25px;
        line-height: 25px;
        background-color: transparent;
        padding: 0;
        color: #999;
  }
  .headInfo{
      height:80px;
      margin-left: 28px;
      line-height: 80px;
      border-bottom: 1px solid #e5e5e5;
  }
  .returnmsg{
      height:220px;
  }
  .returnheadmsg,.sendmethod{
     height:68px;
     border-bottom: 1px solid #e5e5e5;
     line-height: 68px;
     margin-left:30px;
  }
  .acceptman{
    overflow: hidden;
    padding:30px 36px 30px 30px;
  }
  .acceptman div{
      float: left;
  }
  .acceptman div:nth-child(2){
      float: left;
      width: 60%;
      padding: 0 5px;
      color: black;
  }
  .acceptman div:nth-child(3){
     color: black;
  }
  .adress{
    margin-top: 18px;
  }
  .acceptw{
    color: #999999;
  }
  .yuantong{
    height:128px;
    line-height: 128px;
    font-size: 36px;
    padding-left: 30px;
  }
  .login-btn {
        padding:200px 30px 20px 30px;
        height:366px;
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
  .bottom{
    height:112px;
    line-height: 112px;
    padding: 0px 240px;
    overflow: hidden;
  }
  .bottom div{
    line-height: 112px;
    float: left;
  }
  .bottom div:nth-child(2){
    color: #ffac00
  }
  .icon-right{
    margin-left: 50px;
    font-size: 18px;
    line-height: 56px
  }
  .sharesomething{
    position: fixed;
    left:0;
    bottom: 0;
    z-index: 1100;
    width: 100%;
    height:320px;
    background: white;
    text-align: center;
  }
  .popHeight{
    height:100px;
    line-height: 100px;
  }
  .popHeightone{
    height:60px;
    padding:20px 0px;
    color: #999999;
    border-bottom: 1px solid #e5e5e5;
    line-height: 60px;
    text-align: center;
  }
  .red{
    color: red;
    font-size: 36px
  }
  .orderNumb{
    overflow: hidden;
    height:140px;
  }
  .orderNumb div:nth-child(1){
      float: left;
      line-height: 140px;
      margin-left: 40px;
  }
  .orderNumb div:nth-child(2){
      float: right;
      line-height: 140px;
      margin: 0 20px 0 40px;
      color: #a7a6a4;
      font-size:40px;
  }
  .orderNumb div:nth-child(3){
     float: right;
     line-height: 140px;
  }
  .sendTodoor{
     height: 104px;
     background-color: #ededef;
     line-height: 104px;
     overflow: hidden;
  }
  .sendTodoor div{
      float:right;
      padding-right:20px;
  }
  .checkbox{
    display:block;
    width: 36px;
    height:36px;
    border: 1px solid #bfbfbf;
    margin-top: 33px;
  }
  .fastCompany{
     height: 106px;
     line-height: 106px;
     overflow: hidden;
     padding-right: 20px;
     padding-left: 40px;
  }
  .fastCompany div:nth-child(1){
      float: left;
      line-height: 106px;
  }
  .fastCompany div:nth-child(2){
      float: right;
      line-height: 106px;
      margin: 0;
      color: #d2d2d2;
      font-size: 16px;
      margin-left:40px;
  }
  .fastCompany div:nth-child(3){
      float: right;
      line-height: 106px;
      margin: 0;
      color: #d2d2d2;
      font-size: 16px;
      margin-left:40px;
  }
  .fastCompany div:nth-child(3){
      float: right;
      line-height: 106px;
      color: #747474;
  }
  .allFastCompany{
    overflow: hidden;
    width: 100%;
  }
  .allFastCompany div{
    height: 60px;
    width: 26%;
    float: left;
    border: 2px solid #999999;
    margin-left:5%;
    margin-bottom:20px;
    line-height: 60px;
    text-align: center;
    border-radius:15px;
  }
  .selected{
    background: #9e2026;
    color:white;
  }
  .txt{
    border: 0;
    color: #666666;
    text-align: right;
    font-size:28px;
    background: #f4f4f4;
  }
  input::-webkit-input-placeholder{text-align: right;}
</style>
