<template>
	<div class="returnRequest">
    <div class="moneys">
        <div>余额充值</div>
    </div>
    <div style="border-top: 1px solid #e5e5e5;margin-left: 15px"></div>
    <div class="moneys">
        <div>需要支付:<i style="color:#f15511"> ￥{{price}}</i></div>
    </div>
    <div style="border-top: 1px solid #e5e5e5;margin-left: 15px"></div>
    <ul>
      <li class="op">
        <div class="con">
          <span><i class="iconfont icon-duihao2" :class="active"></i></span>
          <div class="img">
            <img src="../../../assets/images/travel.png" alt="" />
          </div>
          <div class="msg2">
            <h1>微信支付</h1>
            <p>使用微信支付，简单方便</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="btn">
      <button @click="wxPay()">安全支付</button>
    </div>
  </div>
</template>

<script>
// var wx =require('weixin-js-sdk')
import wx from 'weixin-js-sdk'
import {getSign, wxPay} from '../../../api/api'
import assign from '../../../assets/js/assign.js'// 混入式方法
export default {
  mixins: [assign],
  data () {
    return {
      config: {},
      payConfig: {},
      active: false,
      price: ''
    }
  },
  mounted () {
    this.price = this.$route.params.price
  },
  methods: {
    $blur: function () {
      this.active = true
      if (this.num == '') {
        this.active = false
      }
    },
    wxPay () {
      let params = {
        channel: 'wx_pub',
        type: 'ch',
        price: this.price
      }
      wxPay(params).then(response => {
        console.log(response.data)
        this.weixinPay(response.data)
      }).catch(error => {

      })
    },
    getSign () {
      let params = {
        uri: window.location.href
      }
      getSign(params).then(response => {
        this.config = response.data
        this.config.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'chooseWXPay']
      }).catch(error => {
        console.log(error.data)
      })
    },
    reload () {
      this.getSign()
      wx.config(this.config)
      wx.checkJsApi({
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          console.log(res)
        }
      })
    },
    weixinPay (data) {
      var vm = this
      if (typeof WeixinJSBridge == 'undefined') { // 微信浏览器内置对象。参考微信官方文档
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data))
          document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data))
        }
      } else {
        vm.onBridgeReady(data)
      }
    },
    onBridgeReady (data) {
      var vm = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', data,
        function (res) {
          if (res.err_msg == 'get_brand_wcpay_request:cancel') {
            console.log('11')
          } else {
            window.location.reload = '/balanceIndex'
          }
        }
      )
    }
  }
}
</script>

<style scoped lang="less">
@border-color: #e5e5e5;
  .returnRequest{
    min-height: 1334px;
  }
	.buyer-tool {
        height: 76px;
        line-height: 76px;
        padding: 0 30px;
        position: relative;
        a {
          display: inline-block;
          line-height: 76px;
          float: left;
          position: relative;
          padding-right: 40px;
        }
      }
    .buy-info {
        height: 220px;
        background-color: #f7f7f7;
        padding: 27px 30px;
        box-sizing: border-box;
        .goods-info {
          height: 166px;
          width: 166px;
          float: left;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          margin-right: 20px;
        }
        .goods-intr {
          float: left;
          width: 70%;
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
        .buyer-detail {
          float: left;
          width: 70%;
          margin-top:40px;
          background: #f7f7f7
        }
        .buyer-detail li {
          height: 25px;
          line-height: 25px;
          background-color: transparent;
          padding: 0;
          color: #999;
          i{
            color:#9e2026;
          }
        }
      }
      .complaintTitle{
        height: 87px;
        line-height: 87px;
        margin:20px 30px 0px 30px;
        font-size: 24px;
        color: #999;
        overflow: hidden;
      }
      .complaintTitle i:nth-child(1){
        font-size: 30px;
        color:black;
        float: left;
      }
      .complaintTitle i:nth-child(2){
        color:#f15511;
      }
      .icon-jiantouxiangxia{
        margin: 0
      }
      .icon-jiantouxiangshang{
        margin: 0
      }
    #J_login_form{
        border-bottom:2px solid #e5e5e5;
    }
    .login-frame{
        background-color: #fff;
    }
    .login-frame li{
        position: relative;
        display: flex;
        height: 110px;
        line-height:110px;
        margin-left: 30px;
        padding-right: 30px;
        border-bottom:2px solid #e5e5e5;
    }
    .login-frame li p{
        font-size: 28px;
        color: #666;
        width: 70%;
    }

    .arrow{
        position: absolute;
        left: 4%;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .arrow{
        color: #9e2026;
    }
    .login-frame li:last-child{
        border: none;
    }
    .login-btn {
        padding:0 30px;
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
        margin-top: 135px;
        outline: none;
        -webkit-appearance: none;
    }
    .address{
      overflow: hidden;
      padding: 10px 10px;
      position: relative;
    }
    .noaddesss{
      line-height: 100px;
      text-align: center;
      float: left;
      margin-left: 200px;
      font-size: 36px;
    }
    .address .icon-icon-test{
        float: left;
        line-height: 100px;
    }
    .address .addressman{
      float: left;
      margin-left: 150px;
    }
    .address .icon-right{
        float: right;
        line-height: 100px;
        margin: 0 20px;
    }
    .address .icon-icon-test{
        float: left;
        margin: 0 5px;
    }
    .addresses{
      overflow: hidden;
      padding:10px 0px;
    }
    .addresses div:nth-child(1){
      float: left;
    }
    .addresses div:nth-child(2){
      float: right;
    }
    .moneys{
      overflow: hidden;
      padding: 30px 0px 30px 30px;
      background: white;
    }
    .moneys div{
      float: left;
      color: black
    }
    .moneys div:nth-child(2){
      margin-left: 50px;
    }
    .mnyAndcp{
      height: 140px;
      padding-left:40px;
    }
    .salmoney{
      overflow: hidden;
    }
    .line{
      border: 1px solid #999999;
    }
    .salmoney{
          padding:20px 40px 20px 0px;
    }
    .salmoney div:nth-child(1){
      float:left;
    }
    .salmoney div:nth-child(2){
      float:right;
      color:#999999;
    }
    ul {
      background-color: #fff;
    }
    ul li {
      color: #333;
      font-size: 28px;
      width: 100%;
    }
    .list {
      height: 100px;
    }
    .op {
      height: 130px;
    }
    .list,
    .op {
      padding-left: 30px;
      box-sizing: border-box;
    }
    .list .con {
      line-height: 100px;
    }
    .list .con span {
      margin-left: 25px;
      color: #f15511;
    }
    .list .con,
    .op .con {
      height: 100%;
      width: 100%;
      border-bottom: 1px solid @border-color;
    }
    .op:nth-last-of-type(1) .con{
      border-bottom: none;
    }
    .op .con {
      span {
        display: block;
        width: 40px;
        height: 40px;
        border: 2px solid @border-color;
        box-sizing: border-box;
        border-radius: 50%;
        float: left;
        margin-top: 45px;
      }
      .img {
        height: 100%;
        width: 70px;
        padding: 30px 0;
        box-sizing: border-box;
        float: left;
        img {
          margin-left: 35px;
          width: 100%;
        }
      }
      .msg {
        height: 100%;
        padding: 30px 0;
        box-sizing: border-box;
        width:75%;
        float: right;
        h1 {
          font-size: 28px;
          color: #333;
          line-height: 1.5;
        }
        p {
          font-size: 24px;
          color: #999;
        }
      }
    }
    .op .con span i {
      color: #9e2026;
      font-size: 40px;
    }
    .op.active .con span {
      border: none;
      i {
        display: block;
      }
    }
    .btn {
      width: 100%;
      padding: 165px 30px 0 30px;
      box-sizing: border-box;
      text-align: center;
      button {
        background-color: #9e2026;
        display: block;
        width: 100%;
        height: 88px;
        outline: none;
        border: none;
        border-radius: 5px;
        color: #fff;
        font-size: 28px;
        text-align: center;
      }
    }
    .icon-wodeqianbao1{
      font-size: 70px;
      background: #019fe8;
      color: white;
      border-radius:10px;
      margin-left: 35px;
      margin-top: 30px;
    }
    .icon-duihao2{
       margin: 0;
    }
    .pay{
      width: 10%;
      float: right;
      padding: 45px 0;
      color: #f15511
    }
    .msg2 {
        height: 100%;
        padding: 30px 0;
        box-sizing: border-box;
        width: 75%;
        float: right;
        h1 {
          font-size: 28px;
          color: #333;
          line-height: 1.5;
        }
        p {
          font-size: 24px;
          color: #999;
        }
      }
      .floatleft{
        float: left;
        text-align: center;
        line-height: 100px;
        width: 90%;
        font-size: 30px;
      }
      .icon-zuojiantou{
        line-height: 100px;
        float: left;
        margin: 0;
        width: 7%;
        padding-left:3%;
        font-size: 36px;
        color: #c9c9c9;
      }
      .passhead{
        background: white;
        height:100px;
        border-bottom: 1px solid #e5e5e5
      }
      .sixpasswords{
        height:166px;
        background: white;
        padding: 60px 14px;
      }
      .padding-bottom{
        margin-bottom: 20px
      }
      .sixpasswords div{
        float: left;
        width: 116px;
        height: 90px;
        border-left:1px solid #bfbfbf;
        border-top:1px solid #bfbfbf;
        border-bottom:1px solid #bfbfbf;
        line-height: 90px;
        text-align: center;
      }
      .sixpasswords div span{
        font-size: 48px;
        display: inline-block;
        margin-top: 10px;
      }
      .sixpasswords div:nth-child(6){
        border-right:1px solid #bfbfbf;
      }
       .wrongPass{
          position: fixed;
          width: 750px;
          opacity: 0.38;
          top: 0;
          bottom: 0;
          background-color: #000;
          z-index: 2999;
      }
      .enterwrong{
        width: 584px;
        height: 242px;
        background: #ffffff;
        z-index: 3900;
        position: fixed;
        left: 10%;
        top: 40%;
        border-radius: 20px;
      }
      .enterwrong-h{
        height: 138px;
        line-height: 138px;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
        font-size: 36px;
      }
      .twobtn{
        overflow: hidden;
      }
      .twobtn div{
        color: #9e2026;
        float: left;
        width: 49%;
        line-height:96px;
        height:96px;
        text-align: center;
        font-size: 32px;
      }
      .twobtn div:nth-child(1){
        border-right: 1px solid #e5e5e5;
      }
</style>
