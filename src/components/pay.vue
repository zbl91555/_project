<template>
  <div @click="wxPay()">pay</div>
</template>

<script>
var wx =require('weixin-js-sdk')
import {getSign,wxPay} from '../api/api'
export default {
  data() {
    return {
      config:{},
      payConfig:{},
      
    
    };
  },
  mounted(){
    this.reload()
  },
  methods:{
    reload(){
      this.getSign()
      wx.config(this.config);
      wx.checkJsApi({
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','chooseImage','chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        console.log(res)
        }
      });
    },
    wxReady(){
      wx.ready(function(){

      })
    },
    getSign(){
      let params = {
        uri:window.location.href
      };
      getSign(params).then(response=>{
        this.config = response.data
        this.config.jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage','chooseImage','chooseWXPay']
      }).catch(error=>{
        console.log(error.data)
      })
    },
    wxPay(){
      let params = {
        price:1,//根据业务 参数不同
      };
      wxPay(params).then(response=>{
        this.weixinPay(response.data)
      }).catch(error=>{

      })
      
    },
    weixinPay(data){
      var vm= this;
        if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
            document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(data));
          }
        }else{
          vm.onBridgeReady(data);
        }
    },
    onBridgeReady(data){
      var  vm = this;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',{
            "appId":data.appId,     //公众号名称，由商户传入
            "timeStamp":data.timeStamp, //时间戳，自1970年以来的秒数
            "nonceStr":data.nonceStr, //随机串
            "package":data.package,
            "signType":data.signType, //微信签名方式：
            "paySign":data.paySign //微信签名
          },
          function(res){
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            if(res.err_msg == "get_brand_wcpay_request：ok" ){
              vm.$router.push("/reservedBerth");
            }else{
              alert("支付失败,请跳转页面"+res.err_msg);
            }
          }
        )
    }
    
  }
  
}
</script>

