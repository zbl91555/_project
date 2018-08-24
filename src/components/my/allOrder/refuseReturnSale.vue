<template>
  <div class="agreeReturnMoney">
      <div class="headInfo">
          name
      </div>
      <div class="buy-info">
        <div class="goods-info"></div>
        <p class="goods-intr">auction_description</p>
        <ul class="buyer-detail">
          <li>成交金额：￥price元</li>
          <li>截拍时间：47时59分40秒</li>
        </ul>
      </div>      
      <div class="gray"></div>
      <div class="applyBackReason">
          <div>申请退货理由</div>
          <div class="icon-jiantouxiangshang iconfont" @click="up" v-if="hide"></div>
          <div class="icon-jiantouxiangxia iconfont" @click="down" v-if="show"></div>
          <div>请选择理由</div>
      </div>
      <div class="reasons" v-if="allreasons">
          <div>理由1</div>
          <div>理由2</div>
      </div>
      <div class="thesame borde">理由不符</div>
      <div class="thesame">其他</div>
      
      <div class="login-btn">
        <input @click="refuseReturnSale()" value="拒绝退货" class="icon-btn" type="button">
        <table>
          <tr>
              <th>事件</th>
              <th>理由</th>
              <th>时间</th>
          </tr>
          <tr>
              <td>买家-申请退货</td>
              <td>其他</td>
              <td>01-30 13:05</td>
          </tr>
        </table>
      </div>
      <!--弹出同意退货-->
      <div id="fixednumMain" v-if="agree==true ">
        <div @click="closeAgree()" class="fixednumMask" style="opacity: 0.38;">
        </div>
        <div class="sharesomething">
          <div class="popHeightone">
              <div>您确认以“其他”的理由,拒绝退货？</div>
          </div>
          <div class="popHeight red">确定</div>
          <div class="gray"></div>
          <div @click="closeAgree()" class="popHeight">取消</div>
        </div>
      </div>
  </div>
</template>

<script>
import {orderAgreeRefund,orderAgreeRefundSubmit} from '../../../api/api';
export default {
  
  data() {
    return {
      agree:false,
      show:true,
      hide:false,
      allreasons:false
    };
  },

  mounted() {
    this.getRefuseMsg()
  },

  methods: {
      down(){
          this.allreasons=true;
          this.show=false;
          this.hide=true
      },
      up(){
          this.allreasons=false;
          this.show=true;
          this.hide=false
      },
      openAgree(){
          this.agree=true
      },
      closeAgree(){
          this.agree=false
      },
      refuseReturnSale(){
        this.agree=true
      },
      //页面
      getRefuseMsg(){
        let order_id = this.$route.query.order_id;
        let params = {
            order_id: order_id,
          };
        orderAgreeRefund(params).then(res=>{
           this.info = res.data;
        }).catch(function(err) {
          console.log(err);
        })
      },
      //提交
      agreeRefuse(){
        let params = {
           order_id:'787',
        };
        orderAgreeRefundSubmit(params).then(res=> {
          console.log(res.data);
        }).catch(err=> {
          console.log(err.response.data.message);
        })
      }
  }
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
          margin-top: 30px;
  }
  .buy-info .buyer-detail li {
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
        padding:100px 30px 0px 30px;
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
  }
  .red{
    color: red;
    font-size: 36px
  }
  .fastCompany{
    overflow: hidden;
    height:140px;
  }
  .fastCompany div:nth-child(1){
      float: left;
      line-height: 140px;
      margin-left: 40px;
  }
  .fastCompany div:nth-child(2){
      float: right;
      line-height: 140px;
      margin: 0 20px 0 40px;
      color: #a7a6a4;
  }
  .fastCompany div:nth-child(3){
     float: right;
     line-height: 140px;
  }
  .applyBackReason{
    overflow: hidden;
    height: 130px;
    border-bottom: 1px solid #e5e5e5;
    margin-left: 40px
  }
  .applyBackReason div:nth-child(1){
    float:left;
    line-height: 130px;
  }
  .applyBackReason div:nth-child(2){
    float: right;
    line-height: 130px;
    margin:0 20px 0 30px;
    font-size: 24px;
    color: #acaba8
  }
  .applyBackReason div:nth-child(3){
    float: right;
    line-height: 130px;
  }
  .thesame{
    height: 130px;
    margin-left: 40px;
    line-height: 130px;
  }
  .borde{
    border-bottom: 1px solid #e5e5e5;
  }
  table{
    width: 100%;
    background: white;
    height:150px;
    padding: 0 30px;
    margin-top: 40px;
  }
  table tr th{
    text-align: left;
  }
  table tr th:nth-child(1){
    width: 35%
  }
  table tr th:nth-child(2){
    width: 35%
  }
  table tr th:nth-child(3){
    width: 30%
  }
  table tr td{
    text-align: left;
    border-top: 1px solid #ededef
  }
  .reasons div{
    height: 50px;
    border-bottom: 1px solid #ededef;
    padding: 10px 20px;
    line-height: 50px;
    margin: 0 30px;
  }
</style>
