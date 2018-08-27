<template>
	<div class="returnRequest">
  <div v-if="persShow">
    <div class="applyMan">
        <div class="iconfont icon-wendang"></div>
        <div>申请人：{{info.name}}</div>
        <div>{{info.mobile}}</div>
    </div>
    <div class="textwords">支付认证费用后享受特权服务</div>
    <div class="apply">申请资质:企业认证</div>
    <div class="apply">支付金额:<i style="color:#f15511">￥{{info.price}}元</i></div>
    <ul>
      <li class="op" @click="paymentType('balance',0)" :class="{active: sw == 0}">
        <div class="con">
          <span><i class="iconfont icon-duihao2"></i></span>
          <div class="icon-wodeqianbao1 iconfont">
          </div>
          <router-link :to="{path: '/newRecharge',query : {enterprise_certification : 'true'}}" v-if='wallet'>
            <div class="pay" v-if="chargeMoney">
              充值
            </div>
          </router-link>
          <router-link to="/dredgeBlancePaid/enterCertiPay" v-else>
                <div class="pay">
                  开通
                </div>
              </router-link>
          <div class="msg">
            <h1>余额支付</h1>
            <p>可用余额:￥{{info.balance}}元</p>
          </div>
        </div>
      </li>
      <li class="op" @click="paymentType('wx_pub',1)" :class="{active: sw == 1}">
        <div class="con">
          <span><i class="iconfont icon-duihao2"></i></span>
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
      <button @click="paymentSafe">安全支付</button>
    </div>
  </div>
  <certificationPaySucces v-if="finishPage" :msg="msg"></certificationPaySucces>
    <!-- 自定义键盘 -->
      <div id="fixednumMain" v-if=" bid==true ">
        <div class="fixednumMask" style="opacity: 0.38;"></div>
        <div class="fixednumMain flip-up">
          <div class="padding-bottom">
            <div class="passhead">

              <div class="iconfont icon-zuojiantou"  @click="closekeyBoard()"></div>
              <div class="floatleft">
                请输入您的支付密码
              </div>
            </div>
            <div class="sixpasswords">
                  <div v-for="i in items" :key="i"><span v-if="password[i]">*</span></div></div>
          </div>
          <div class="numkey">
            <ul>
              <li @touchstart='oneClick()' data-touch="touchEffect" class="num">
              <div class="number">
                1
              </div>
              <div class="letter">
              </div>
              </li>
              <li @click='twoClick()' data-touch="touchEffect" class="num">
              <div class="number">
                2
              </div>
              <div class="letter">
                ABC
              </div>
              </li>
              <li @click='threeClick()' data-touch="touchEffect" class="num">
              <div class="number">
                3
              </div>
              <div class="letter">
                DEF
              </div>
              </li>
              <li @click='fourClick()' data-touch="touchEffect" class="num">
              <div class="number">
                4
              </div>
              <div class="letter">
                GHI
              </div>
              </li>
              <li @click='fiveClick()' data-touch="touchEffect" class="num">
              <div class="number">
                5
              </div>
              <div class="letter">
                JKL
              </div>
              </li>
              <li @click='sixClick()' data-touch="touchEffect" class="num">
              <div class="number">
                6
              </div>
              <div class="letter">
                MNO
              </div>
              </li>
              <li @click='sevenClick()' data-touch="touchEffect" class="num">
              <div class="number">
                7
              </div>
              <div class="letter">
                PQRS
              </div>
              </li>
              <li @click='eightClick()' data-touch="touchEffect" class="num">
              <div class="number">
                8
              </div>
              <div class="letter">
                TUV
              </div>
              </li>
              <li @click='nineClick()' data-touch="touchEffect" class="num">
              <div class="number">
                9
              </div>
              <div class="letter">
                WXYZ
              </div>
              </li>
              <li @click='dblzeroClick()' data-touch="touchEffect" class="num othernum" style="line-height: 50px;margin-bottom:6px">.</li>
              <li @click='zeroClick()' data-touch="touchEffect" class="num" style="line-height: 50px;margin-bottom:6px">0</li>
              <li @click='del()' data-touch="touchEffect" class="delete" style="line-height: 50px;margin-bottom:6px"></li>
            </ul>
          </div>
        </div>
        <!-- 支付密码输入错入,请重试 -->
            <div class="wrongPass" v-if="wrongPass==true ">
            </div>
            <div class="enterwrong" v-if="wrongPass==true ">
                <div class="enterwrong-h">支付密码输入错误,请重试</div>
                <div class="twobtn">
                      <div>忘记密码</div>
                      <div>重新输入</div>
                </div>
            </div>
      </div>
    <!-- 余额开通 -->
    <div id="fixednumMain" v-if="showshowlists">
      <div @click="closeshowlists" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="sharesomething">
        <div style="border-bottom:1px solid #e5e5e5;">  您还未开通余额，不能使用“余额支付”与“微信支付”功能，快去开通吧！</div>
        <div @click="closeshowlists" style="border-right: 1px solid #e5e5e5;">取消</div>
        <div @click="openRecharge" style="color:red;" class="bordertop">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
import certificationPaySucces from '../sellerCenter/certificationPaySucces'
import md5 from 'md5'
import { Toast } from 'vant'
import wx from 'weixin-js-sdk'
import {
  orderPayment,
  payment,
  notify,
  getSign,
  wxPay,
  companySelect,
  companyDelete
} from '../../../api/api'
import assign from '../../../assets/js/assign.js' // 混入式方法
export default {
  mixins: [assign],
  components: {
    certificationPaySucces: certificationPaySucces
  },
  data () {
    return {
      payPrice: '',
      info: {},
      bid: false,
      items: [0, 1, 2, 3, 4, 5],
      password: [],
      lastpassword: '', // 传给后台的6位数密码
      wrongPass: false,
      config: {},
      payConfig: {},
      sw: 0,
      price: '0', // 价格
      paymentTimeVal: 'balance',
      type: 'company', // 类型
      body: '',
      persShow: true, // 当前页显示
      finishPage: false, // 支付完成页
      msg: [
        { scrib: '企业认证费用已支付成功' },
        { money: '' },
        { link: '/sellerCenter/realnameApplication' },
        { boleen: true }
      ],
      showshowlists: false,
      wallet: '',
      chargeMoney: false,
      flag: false
    }
  },
  methods: {
    // 开启loading效果
    openLoading () {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '正在支付'
      })
    },
    openRecharge () {
      this.$router.push({ path: '/dredgeBlancePaid/enterCertiPay' })
    },
    closeshowlists () {
      this.showshowlists = false
    },
    showkeyBoard () {
      this.bid = true
    },
    closekeyBoard () {
      this.bid = false
      this.password = []
    },
    paymentType: function (i, index) {
      this.paymentTimeVal = i
      this.sw = index
    },
    // 获取资料
    companySelect () {
      companySelect()
        .then(res => {
          console.log(res)
          this.info = res.data
          this.msg[1].money = res.data.price
          this.wallet = res.data.wallet
          if (parseFloat(res.data.balance) > parseFloat(res.data.price)) {
            this.chargeMoney = false
          } else {
            this.chargeMoney = true
          }
          if (this.wallet) {
            this.showshowlists = false
          } else {
            this.showshowlists = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 安全支付
    paymentSafe () {
      let _this = this
      if (!_this.wallet) {
        _this.showshowlists = true
        return
      }
      let params = {
        channel: _this.paymentTimeVal,
        type: _this.type,
        price: _this.price
      }
      if (_this.paymentTimeVal == 'balance') {
        payment(params)
          .then(res => {
            _this.showkeyBoard() // 发起支付
            _this.order_no = res.data.order_no
            _this.body = res.data.body
            _this.type = res.data.attach
          })
          .catch(err => {
            Toast(err.data.message)
            // console.log(err.response.data.message);
          })
      }
      if (_this.paymentTimeVal == 'wx_pub') {
        if (this.flag) {
          return
        };
        this.flag = true
        this.openLoading()
        this.wxPay(params)
      }
      if (_this.paymentTimeVal == 'atm') {
        // atm支付
      }
    },

    // 余额支付 安全支付回调
    notify () {
      let _this = this
      let paymentType = _this.paymentTimeVal
      let params = {
        order_no: _this.order_no,
        attach: _this.type,
        paypasswd: md5(_this.lastpassword),
        body: _this.body
      }
      notify(paymentType, params)
        .then(res => {
          console.log('121212')
          this.persShow = false
          this.finishPage = true
          this.bid = false
        })
        .catch(err => {
          alert(err.data.message)
        })
    },

    // *****微信支付开始*****
    reload () {
      this.getSign()
      wx.config(this.config)
      wx.checkJsApi({
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'chooseImage',
          'chooseWXPay'
        ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          console.log(res)
        }
      })
    },
    wxReady () {
      wx.ready(function () {})
    },
    getSign () {
      let params = {
        uri: window.location.href
      }
      getSign(params)
        .then(response => {
          this.config = response.data
          this.config.jsApiList = [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'chooseImage',
            'chooseWXPay'
          ]
        })
        .catch(error => {
          console.log(error.data)
        })
    },
    // 微信支付
    wxPay (params) {
      wxPay(params)
        .then(response => {
          console.log(response)
          this.weixinPay(response.data)
        })
        .catch(error => {})
    },
    weixinPay (data) {
      var vm = this
      if (typeof WeixinJSBridge == 'undefined') {
        // 微信浏览器内置对象。参考微信官方文档
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            vm.onBridgeReady(data),
            false
          )
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
      WeixinJSBridge.invoke('getBrandWCPayRequest', data, function (res) {
        if (res.err_msg == 'get_brand_wcpay_request:cancel') {
          vm.flag = false
          Toast.clear()
        } else {
          setTimeout(_ => {
            vm.flag = false
            Toast.clear()
            window.location.href = '/reservedBerth'
          }, 100)
        }
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        // if(res.err_msg == "get_brand_wcpay_request：ok" ){
        //   vm.$router.push("/reservedBerth");
        // }else{
        //   alert("支付失败,请跳转页面"+res.err_msg);
        // }
      })
    },
    // *****微信支付结束*****

    // 删除
    del () {
      this.password.pop()
      this.lastpassword = this.password.join('')
    },
    // 按数字1
    oneClick () {
      console.log(this.password)
      if (this.password.length < 6) {
        this.password.push(1)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字2
    twoClick () {
      if (this.password.length < 6) {
        this.password.push(2)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字3
    threeClick () {
      if (this.password.length < 6) {
        this.password.push(3)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字4
    fourClick () {
      if (this.password.length < 6) {
        this.password.push(4)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字5
    fiveClick () {
      if (this.password.length < 6) {
        this.password.push(5)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字6
    sixClick () {
      if (this.password.length < 6) {
        this.password.push(6)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字7
    sevenClick () {
      if (this.password.length < 6) {
        this.password.push(7)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字8
    eightClick () {
      if (this.password.length < 6) {
        this.password.push(8)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字9
    nineClick () {
      if (this.password.length < 6) {
        this.password.push(9)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字.
    dblzeroClick () {
      if (this.password.length < 6) {
        this.password.push('.')
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字0
    zeroClick () {
      // if(this.lastpassword!=''){
      if (this.password.length < 6) {
        this.password.push('0')
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
      // }
    }
  },
  mounted () {
    this.companySelect()
  }
}
</script>

<style scoped lang="less">
@border-color: #e5e5e5;
.sharesomething {
  position: fixed;
  left: 0;
  top: 30%;
  z-index: 1100;
  width: 80%;
  height: 400px;
  background: white;
  text-align: center;
  border-radius: 10px;
  margin-left: 10%;
}
.sharesomething div:nth-child(1) {
  height: 200px;
  font-size: 30px;
  padding-top: 100px;
  text-align: left;
  padding-left: 60px;
  text-indent: 60px;
  padding-right: 60px;
  line-height: 50px;
}
.sharesomething div:nth-child(2),
.sharesomething div:nth-child(3) {
  height: 95px;
  line-height: 90px;
  font-size: 30px;
  width: 49%;
  float: left;
  font-size: 32px;
}
.returnRequest {
  min-height: 1234px;
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
.op:nth-last-of-type(1) .con {
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
    width: 65%;
    float: left;
    margin-left: 25px;
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
  display: none;
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
.icon-wodeqianbao1 {
  font-size: 70px;
  background: #019fe8;
  color: white;
  border-radius: 10px;
  margin-left: 35px;
  margin-top: 30px;
  float: left;
}
.icon-duihao2 {
  margin: 0;
}
.pay {
  width: 10%;
  float: right;
  padding: 45px 0;
  color: #f15511;
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
.floatleft {
  float: left;
  text-align: center;
  line-height: 100px;
  width: 90%;
  font-size: 30px;
}
.icon-zuojiantou {
  line-height: 100px;
  float: left;
  margin: 0;
  width: 7%;
  padding-left: 3%;
  font-size: 36px;
  color: #c9c9c9;
}
.passhead {
  background: white;
  height: 100px;
  border-bottom: 1px solid #e5e5e5;
}
.sixpasswords {
  height: 166px;
  background: white;
  padding: 60px 14px;
}
.padding-bottom {
  margin-bottom: 20px;
}
.sixpasswords div {
  float: left;
  width: 116px;
  height: 90px;
  border-left: 1px solid #bfbfbf;
  border-top: 1px solid #bfbfbf;
  border-bottom: 1px solid #bfbfbf;
  line-height: 90px;
  text-align: center;
}
.sixpasswords div span {
  font-size: 48px;
  display: inline-block;
  margin-top: 10px;
}
.sixpasswords div:nth-child(6) {
  border-right: 1px solid #bfbfbf;
}
.wrongPass {
  position: fixed;
  width: 750px;
  opacity: 0.38;
  top: 0;
  bottom: 0;
  background-color: #000;
  z-index: 2999;
}
.enterwrong {
  width: 584px;
  height: 242px;
  background: #ffffff;
  z-index: 3900;
  position: fixed;
  left: 10%;
  top: 40%;
  border-radius: 20px;
}
.enterwrong-h {
  height: 138px;
  line-height: 138px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
  font-size: 36px;
}
.twobtn {
  overflow: hidden;
}
.twobtn div {
  color: #9e2026;
  float: left;
  width: 49%;
  line-height: 96px;
  height: 96px;
  text-align: center;
  font-size: 32px;
}
.twobtn div:nth-child(1) {
  border-right: 1px solid #e5e5e5;
}
.applyMan {
  height: 110px;
  overflow: hidden;
  padding: 0 20px;
  font-size: 26px;
}
.applyMan .icon-wendang {
  margin: 0;
}
.applyMan div:nth-child(1),
.applyMan div:nth-child(2) {
  float: left;
  line-height: 110px;
}
.applyMan div:nth-child(2) {
  margin-left: 10px;
}
.applyMan div:nth-child(3) {
  float: right;
  line-height: 110px;
}
.textwords {
  height: 98px;
  background: #f4f4f4;
  color: #9f9f9f;
  line-height: 98px;
  padding-left: 20px;
}
.apply {
  height: 98px;
  line-height: 98px;
  margin-left: 20px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 26px;
}
</style>
