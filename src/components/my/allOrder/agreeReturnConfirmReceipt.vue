<template>
  <div class="agreeReturnMoney">
      <div class="headInfo">
          拍品信息
      </div>
      <div class="buy-info">
        <div class="goods-info" v-bind:style="{backgroundImage: 'url(' + info.auction.auctionImg + ')'}"></div>
        <p class="goods-intr">{{info.auction.auctionDesc}}</p>
        <ul class="buyer-detail">
         <!--  <li>买家：{{info.sellerName}}</li> -->
          <li>实际付款金额：￥{{info.truePrice}}元</li>
          <li>截止时间：{{timestampToTime(info.addTime)}}</li>
        </ul>
      </div>  
      <div class="gray"></div>
      <div class="returnReason">
          <div>申请退货理由</div>
          <div>{{info.orderReason}}</div>
      </div>
      <div class="gray"></div>
      <div class="returnmsg" >
          <div class="returnheadmsg">退货信息</div>
          <div class="acceptman">
              <div class="acceptw">收货人:</div>
              <div>
                  <p>{{address.name}}</p>
                  <p class="adress">{{address.province}}{{address.city}}{{address.country}}{{address.address}}</p>
              </div>
              <div>{{address.tele}}</div>
              <!-- <router-link :to="{path: '/member/addressInformation', query: {type:addressId,order_id:orderid}}">
                  <div class="icon-right iconfont"></div>
              </router-link> -->
          </div>
      </div>
      <div class="login-btn">
        <input @click="openAgree()" value="确认退货" class="icon-btn" type="button">
      </div>
      <!--弹出同意退货-->
      <div id="fixednumMain" v-if="agree==true ">
        <div @click="closeAgree()" class="fixednumMask" style="opacity: 0.38;">
        </div>
        <div class="sharesomething">
          <div class="popHeightone">
              <div>确认退货，拍品钱款退还给买家</div>
          </div>
          <div class="popHeight red" @click="confirmReceiptSubmit">确认收货</div>
          <div class="gray"></div>
          <div @click="closeAgree()" class="popHeight">取消</div>
        </div>
      </div>
  </div>
</template>
<script>
import {confirmReceipt,confirmReceiptSubmit} from '../../../api/api';
export default {
  data() {
    return {
      info: {},
      address:{},
      agree:false,
      orderId:'',
      addressId:'',
    };
  },
  methods: {
      openAgree(){
          this.agree=true
      },
      closeAgree(){
          this.agree=false
      },
      //页面
      confirmReceipt: function() {
        confirmReceipt(this.orderId).then(res=>{
           this.info = res.data;
           this.address = res.data.orderReturnAddress;
           this.addressId = res.data.orderReturnAddress.id;
        }).catch(function(err) {
          console.log(err);
        })
      },
      //提交
      confirmReceiptSubmit(){
        confirmReceiptSubmit(this.orderId).then(res=> {
          this.agree=false
          this.$router.push('/orderDetail/'+this.orderId)
        }).catch(err=> {
          console.log(err.response.data.message);
        })
      },
  },
   mounted() {
      this.orderId = this.$route.params.order_id
      this.confirmReceipt();
   },
};
</script>

<style scoped>
   .agreeReturnMoney{
     height:1350px;
   }
    .buy-info {
        height: 220px;
        background-color: white;
        padding: 27px 30px;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
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
         /* margin-right: 20px;*/
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
          left: 220px;
  }
  .buy-info .buyer-detail li {
          height: 25px;
          line-height: 25px;
          background-color: transparent;
          padding: 0;
          color: #999;
          margin-top:10px;
  }
  .headInfo{
      height:80px;
      margin-left: 28px;
      line-height: 80px;
      border-bottom: 1px solid #e5e5e5;
  }
  .returnReason{
    height:122px;
    overflow: hidden;
    padding:0px 30px;
  }
  .returnReason div:nth-child(1){
     float: left;
     line-height: 122px;
  }
  .returnReason div:nth-child(2){
     float: right;
     color: #999999;
     line-height: 122px;
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
      width: 65%;
      padding: 0 5px;
      color: #999999;
  }
  .acceptman div:nth-child(3){
     color: #999999;
     margin-left: -100px;
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
        font-size: 28px;
        -webkit-appearance: none; 
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
    border-bottom: 1px solid #e5e5e5
  }
  .red{
    color: red;
    font-size: 36px
  }
</style>
