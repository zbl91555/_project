<template>
  <div class="agreeReturnMoney">
      <div class="headInfo">
          拍品信息
      </div>
      <div class="buy-info">
        <div class="goods-info" v-bind:style="{backgroundImage: 'url(' + info.img + ')'}"></div>
        <p class="goods-intr">{{info.desc}}</p>
        <ul class="buyer-detail">
          <li>买家：{{info.sellerName}}</li>
          <li>实际付款金额：￥{{info.truePrice}}元</li>
          <li>付款截止：{{timestampToTime(info.endTime)}}</li>
        </ul>
      </div>  
      <div class="gray"></div>
      <div class="returnReason">
          <div>申请退款理由</div>
          <div>{{info.reason}}</div>
      </div>
      <div class="gray"></div>
    
      <div class="login-btn">
        <input value="同意退款" @click="orderAgreeRefundSubmit" class="icon-btn" type="button">
      </div>
      <div class="bottom">
        <div>由</div>
        <div>淘拍堂</div>
        <div>免费技术支持</div>
      </div>
  </div>
</template>

<script>

import {orderAgreeRefund,orderAgreeRefundSubmit} from '../../../api/api';
export default {
  data() {
    return {
      info: {},
      orderId:''
    };
  },
  methods: {
      //页面
      orderAgreeRefund: function() {
        let _this = this;
        orderAgreeRefund(this.orderId).then(res=>{
           _this.info = res.data;
        }).catch(function(err) {
          console.log(err);
        })
      },
      //提交
      orderAgreeRefundSubmit(){
        orderAgreeRefundSubmit(this.orderId).then(res=> {
          this.$router.push('/orderDetail/'+this.orderId)
          console.log(res.data);
        }).catch(err=> {
          console.log(err.response.data.message);
        })
      },
  },
   mounted() {
      this.orderId = this.$route.params.order_id
      this.orderAgreeRefund();
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
          float: right;
          width: 73%;
          position: absolute;
          left:220px;
          bottom: 30px;
  }
  .buy-info .buyer-detail li {
          height: 25px;
          line-height: 25px;
          background-color: transparent;
          padding: 0;
          color: #999;
          margin-top: 10px;
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
      height:196px;
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
        padding:200px 30px 420px 30px;
        height:166px;
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
</style>
