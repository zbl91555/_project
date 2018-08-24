<template>
  <div class="agreeReturnMoney">
    <div v-if="isshow">
      <div class="headInfo">
          拍品信息
      </div>
      <div class="buy-info">
        <div class="goods-info" v-bind:style="{backgroundImage: 'url(' + info.img + ')'}"></div>
        <p class="goods-intr">{{info.desc}}</p>
        <ul class="buyer-detail">
          <li>买家：{{info.sellerName}}</li>
          <li>实际付款金额：￥{{info.truePrice}}元</li>
          <li>确认截止：{{timestampToTimeYMDHM(parseFloat(info.endTime))}}</li>
        </ul>
      </div>  
      <div class="gray"></div>
      <div class="returnReason">
          <div>申请退货理由</div>
          <div>{{info.reason}}</div>
      </div>
      <div class="gray"></div>
      <div class="returnmsg">
          <div class="returnheadmsg">退货信息</div>
          <div class="acceptman" v-if="addressNew" @click="addesssSelet">
              <div class="acceptw">收货人:</div>
              <div>
                  <p>{{addressNew.name}}</p>
                  <p class="adress">{{addressNew.province}}{{addressNew.city}}{{addressNew.country}}{{addressNew.address}}</p>
              </div>
              <div>{{addressNew.tele}}</div>
              <div class="icon-right iconfont"></div>
          </div>
           <div @click="addesssSelet" class="noaddesss" v-else>
              点击添加地址
              <div class="icon-right iconfont"></div>
            </div>
      </div>
      <div class="gray"></div>
      <div class="login-btn">
        <input @click="openAgree()" value="同意退货" class="icon-btn" type="button">
      </div>
    </div>
    <addressInformation :orderId="orderId" :whichP='agreeReturnSale' @getAddress="get" v-if="addressshow"> </addressInformation>
      <!--弹出同意退货-->
      <div id="fixednumMain" v-if="agree==true ">
        <div @click="closeAgree()" class="fixednumMask" style="opacity: 0.38;">
        </div>
        <div class="sharesomething">
          <div class="popHeightone">
              <div>同意后,请等待买家退货</div>
              <div>请在收到买家退货后再确认退款</div>
          </div>
          <div class="popHeight red" @click="orderReturnGoodsSubmit">同意退货</div>
          <div class="gray"></div>
          <div @click="closeAgree()" class="popHeight">取消</div>
        </div>
      </div>
  </div>
</template>
<script>
import {Toast} from "vant"
import addressInformation from  '../addressInformation'
import {orderReturnGoods,orderReturnGoodsSubmit} from '../../../api/api';
export default {
  components:{
        addressInformation,
  },
  data() {
    return {
      agreeReturnSale:'agreeReturnSale',
      info: {},
      address:{},
      agree:false,
      orderId:'',
      addressshow:false, //地址页面
      isshow:true,//同意退货页面
      addressNew:'',//地址信息
      order_address:'0',//地址id
    };
  },
  methods: {
      get(item){
        console.log(item)
          this.addressUpdate();
          this.addressNew = item;
          this.order_address = item.id
      },
      addesssSelet(){
          this.addressshow=true;
          this.isshow=false;
      },
      addressUpdate(){
          this.addressshow=false;
          this.isshow=true;
      },
      openAgree(){
          this.agree=true
      },
      closeAgree(){
          this.agree=false
      },
      //页面
      orderReturnGoods: function() {
        orderReturnGoods(this.orderId).then(res=>{
           this.info = res.data;
           console.log(this.info)
           this.addressNew = res.data.orderReturnAddress;
           this.order_address = res.data.orderReturnAddress.id;
        }).catch(function(err) {
          console.log(err);
        })
      },
      //提交
      orderReturnGoodsSubmit(){
        let params = {
           address_id:this.order_address,
        };
        orderReturnGoodsSubmit(params,this.orderId).then(res=> {
          this.agree=false
          this.$router.push('/orderDetail/'+this.orderId)
        }).catch(err=> {
          Toast('地址不能为空')
        })
      },
  },
   mounted() {
      this.orderId = this.$route.params.order_id
      if(this.$route.params.nowpage != undefined){
        this.isshow = false
      }
      if(this.$route.params.adresspage != undefined){
        this.addressshow = true
      }
      this.orderReturnGoods();
   },
};
</script>

<style scoped>
    .buy-info {
        height: 220px;
        background-color: white;
        padding: 27px 30px;
        box-sizing: border-box;
        position: relative
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
          position: absolute;
          width: 73%;
          bottom: 27px;
          left: 220px;
  }
  .buy-info .buyer-detail li {
          height: 25px;
          line-height: 25px;
          background-color: transparent;
          padding: 0;
          color: #999;
          margin-top: 10px
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
        padding:0px 30px;
        margin-top: 200px;
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
    border-bottom: 1px solid #e5e5e5
  }
  .red{
    color: red;
    font-size: 36px
  }
  .noaddesss{
    text-align: center;
    height: 100px;
    line-height: 100px;
    position: relative;
  }
  .noaddesss .icon-right{
   position: absolute;
   right:30px;
   top:15px;
  }
</style>
